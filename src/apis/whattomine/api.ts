import * as request from "request-promise";

import * as WhatToMine from ".";
import { debug } from "../../debug";

interface IBaseCoin {
  id: number;
  tag: string;
  algorithm: string;
  lagging: boolean;
  status: string;
}

///
/// for https://whattomine.com/calculators.json
///
interface IAPICalculator extends IBaseCoin {
  // There's more properties that aren't one here
  listed: boolean;
  testing: boolean;

  // Not actually part of the response, just something this program needs to function
  name: string;
}

interface IAPICalculators {
  coins: {
    [s: string]: IAPICalculator;
  };
}

///
/// for https://whattomine.com/coins.json and https://whattomine.com/coins/1.json
///

interface IAPICoin extends IBaseCoin {
  name: string;
  block_time: string;
  block_reward: number;
  block_reward24: number;
  block_reward3: number;
  block_reward7: number;
  last_block: number;
  difficulty: number;
  difficulty24: number;
  difficulty3: number;
  difficulty7: number;
  nethash: number;
  exchange_rate: number;
  exchange_rate24: number;
  exchange_rate3: number;
  exchange_rate7: number;
  exchange_rate_vol: number;
  exchange_rate_curr: string;
  market_cap: string;
  pool_fee: string;
  estimated_rewards: string;
  btc_revenue: string;
  revenue: string;
  cost: string;
  profit: string;
  timestamp: number;
}

interface IAPICoins {
  coins: {
    [s: string]: IAPICoin;
  };
}

interface ICoinRevenueCacheEntry {
  hashrate: number;
  revenue: number;
  timestamp: number;
  coin: IAPICoin;
}

// Related to the API wrapper methods
// getRevenue(), etc.
export interface IRevenueResponse {
  fromCache: boolean;
  revenue: number;
  timestamp: number;
}

export class API {
  public USER_AGENT: string = "";
  private coinRevenueCache: ICoinRevenueCacheEntry[] = [];

  // Raw requests
  private async request(url: string): Promise<any> {
    const rq = await request(url, {
      headers: {
        "User-Agent": this.USER_AGENT,
      },
    });
    return rq;
  }

  private async getRawCoins(): Promise<IAPICoins> {
    const raw = await this.request("https://whattomine.com/coins.json");
    const data = JSON.parse(raw) as IAPICoins;
    return data;
  }

  private async getRawCalculators(): Promise<IAPICalculators> {
    const raw = await this.request("https://whattomine.com/calculators.json");
    const data = JSON.parse(raw) as IAPICalculators;
    return data;
  }

  private async getRawCoin(id: number, hashrate: number): Promise<IAPICoin> {
    // https://whattomine.com/coins/1.json?cost=0
    const raw = await this.request(`https://whattomine.com/coins/${id}.json?hr=${hashrate}&cost=0`);
    const data = JSON.parse(raw) as IAPICoin;
    return data;
  }

  // Wrappers

  // Returns WhatToMine's list of calculators in a more usable format
  public async getCalculators(): Promise<IAPICalculator[]> {
    // Get the raw data
    const data = (await this.getRawCalculators()).coins;

    // Convert to an array
    const coins = [];
    for (const key of Object.keys(data)) {
      const value = data[key];
      // Ignore Nicehash coins
      if (value.tag === "NICEHASH") {
        continue;
      }
      // Remove coins that aren't active (profitability calculating won't work)
      if (value.status !== "Active") {
        continue;
      }
      // Set the name property
      value.name = key;
      coins.push(value);
    }

    return coins;
  }

  // Returns BTC revenue of mining coin id with hashrate hashrate
  public async getRevenue(id: number, hashrate: number, allowCache: boolean = true): Promise<IRevenueResponse> {
    // If a coin is present in the cache then return it from there
    if (allowCache && this.coinRevenueCache[id]) {
      const item = this.coinRevenueCache[id];
      const revenue = item.revenue * (hashrate / item.hashrate);
      return {
        fromCache: true,
        timestamp: item.timestamp,
        revenue,
      };
    } else {
      const data = await this.getRawCoin(id, hashrate);
      const revenue = Number(data.btc_revenue);
      return {
        fromCache: false,
        timestamp: data.timestamp * 1000,
        revenue,
      };
    }
  }

  public async populateCoinRevenueCache(): Promise<void> {
    const data = await this.getRawCoins();
    const cache = [];
    for (const key of Object.keys(data.coins)) {
      const coin = data.coins[key];

      // get properties from response
      const timestamp = coin.timestamp * 1000;
      const revenue = Number(coin.btc_revenue);

      // if the data is more than an hour old then skip it
      const currentDate = new Date();
      const age = (new Date()).getTime() - timestamp;
      if (age >= 1000 * 60 * 60) {
        debug(`skipping cache data for ${coin.id} (${coin.algorithm}): too old (${age / 1000} sec)`);
        continue;
      }

      // get algorithm
      const algorithm = (WhatToMine.Algorithm as any)[coin.algorithm];
      if (!algorithm) {
        debug(`skipping cache data for ${coin.id} (${coin.algorithm}): no matching algo`);
        continue;
      }
      const hashrate = algorithm.defaultSpeed;

      // create the entry object
      const entry: ICoinRevenueCacheEntry = {
        revenue,
        hashrate,
        coin,
        timestamp,
      };
      cache[coin.id] = entry;
    }
    this.coinRevenueCache = cache;
  }
}