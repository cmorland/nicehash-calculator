import { Hash } from "../../hash";
import { Algorithms } from "../../algorithms";

export var coin = {
  name: "Dogecoin",
  names: [
    "doge", "scrypt",
  ],
  NiceHash: {
    hashrate: Hash.TERA,
    id: Algorithms.Scrypt,
  },
  WhatToMine: {
    hashrate: 1000 * 1000,
    id: 6,
  },
  enabled: false,
};
