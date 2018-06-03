# NiceHash Profit Calculator for Buyers v2

A JavaScript program to estimate the profitability of buying hashing power on [NiceHash](https://www.nicehash.com/?refby=258346). Feel free to [make an issue](https://github.com/GarboMuffin/nicehash-calculator/issues/new) if you need help using this.

**This project is not affiliated with NiceHash. I am not responsible for any losses that may come as a result of this project.**

## Web Version

### [You can find the statistics output by this in a simple website without having to setup anything!](https://nicehash.garbomuffin.com/)

## Installing / Downloading

### Requirements

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en/) (8, 9, or 10)

### Downloading

<!-- TODO: use github releases instead? -->

```
git clone -b rewrite https://github.com/GarboMuffin/nicehash-calculator/
cd nicehash-calculator
```

### Setup

```bash
npm install --only=production
npm run build
```

## Usage

```
node index.js [arguments or coins]
```

### Arguments

| Argument | Description |
|--------------|----------------|--------------|
| `--experimental-fees` | Enables calculations to include a 3% fee. (experimental) |
| `--no-color` | Disables color |
| `--no-header` | Disables the large message printed at the start |
| `--no-warnings` | Disables warnings |
| `--output=thing` | Changes the format of the output. Valid values for `thing` are `pretty` (default), `json`, and `delayed-json` |
| `--prices=thing` | Changes the prices used in calculations. Valid values for `thing` are `average` (default), `minimum`, and `minimum-with-speed` |
| `--sleep-time=number` | Changes the time waited between each coin in milliseconds. Default is 1000. Replace `number` with some other number |
| `--list-coins` | List enabled coin |
| `--debug` | Makes it really verbose |

### Coins

By default it will run on all coins. This is probably not the behavior you want. To only run on a few coins, you can specify a list of coins for the program. It's probably easiest to understand usage by example:

```bash
# Everything is case insensitive. bItCoIn and bitcoin both have the same effect

# You can specify names of coins to enable only those
# To run on only bitcoin, litecoin, and ethereum you could do:
node index bitcoin litecoin ethereum

# A coin's ticker also works in most cases:
node index btc ltc eth

# Or you can enable entire algorithms:
node index scrypt

# And you can mix coins and algorithms:
node index scrypt bitcoin

# You can prepend a single `-` to disable that coin instead of enabling it.
# Run on all coins except bitcoin:
node index -bitcoin

# Run on all scrypt coins except litecoin:
node index scrypt -litecoin

# And you can use `-` on algorithms as well
# Run on all coins except scrypt coins:
node index -scrypt

# Perhaps this example will explain it best:
# Run on all scrypt coins except litecoin and also run on bitcoin
node index scrypt -litecoin bitcoin
```

### Supported coins

As coins are added to What To Mine they should automatically be supported if they use an algorithm on NiceHash. As coins become inactive they will disappear.

<details>
  <summary>All supported coins as of 5/25/2018 (Click to reveal)</summary>

  ```sh
  $ node index --list-coins
  ...

  Enabled coins:
   * Bitcoin (BTC) (SHA-256)
   * Litecoin (LTC) (Scrypt)
   * Vertcoin (VTC) (Lyra2REv2)
   * Dogecoin (DOGE) (Scrypt)
   * Feathercoin (FTC) (NeoScrypt)
   * Einsteinium (EMC2) (Scrypt)
   * DGC-Scrypt (DGC) (Scrypt)
   * DGB-Scrypt (DGB) (Scrypt)
   * Worldcoin (WDC) (Scrypt)
   * Myriad-Scrypt (XMY) (Scrypt)
   * Dash (DASH) (X11)
   * AUR-Scrypt (AUR) (Scrypt)
   * Québecoin (QBC) (X11)
   * Peercoin (PPC) (SHA-256)
   * Zetacoin (ZET) (SHA-256)
   * Unobtanium (UNO) (SHA-256)
   * Myriad-SHA (XMY) (SHA-256)
   * Gulden (NLG) (Scrypt)
   * Maza (MZC) (SHA-256)
   * Phoenixcoin (PXC) (NeoScrypt)
   * Orbitcoin (ORB) (NeoScrypt)
   * Maxcoin (MAX) (Keccak)
   * Monero (XMR) (CryptoNightV7)
   * Bytecoin (BCN) (CryptoNight)
   * DigitalNote (XDN) (CryptoNight)
   * Viacoin (VIA) (Scrypt)
   * DGB-SHA (DGB) (SHA-256)
   * DGB-Qubit (DGB) (Qubit)
   * Mooncoin (MOON) (Scrypt)
   * Halcyon (HAL) (NeoScrypt)
   * DGC-SHA (DGC) (SHA-256)
   * Startcoin (START) (X11)
   * Quark (QRK) (Quark)
   * MonetaryUnit (MUE) (X11)
   * Bata (BTA) (Scrypt)
   * GameCredits (GAME) (Scrypt)
   * Monacoin (MONA) (Lyra2REv2)
   * Influxcoin (INFX) (X11)
   * Verge-Scrypt (XVG) (Scrypt)
   * Ethereum (ETH) (DaggerHashimoto)
   * Decred (DCR) (Decred)
   * Expanse (EXP) (DaggerHashimoto)
   * Adzcoin (ADZ) (X11)
   * Sia (SC) (Sia)
   * Ethereum Classic (ETC) (DaggerHashimoto)
   * LBRY (LBC) (LBRY)
   * Crown (CRW) (SHA-256)
   * Zcash (ZEC) (Equihash)
   * Zclassic (ZCL) (Equihash)
   * Hush (HUSH) (Equihash)
   * Sibcoin (SIB) (X11Gost)
   * Pascalcoin (PASC) (Pascal)
   * Ubiq (UBQ) (DaggerHashimoto)
   * Komodo (KMD) (Equihash)
   * Karbo (KRB) (CryptoNight)
   * PascalLite (PASL) (Pascal)
   * Musicoin (MUSIC) (DaggerHashimoto)
   * Deutsche eMark (DEM) (SHA-256)
   * Zencash (ZEN) (Equihash)
   * Cannabiscoin (CANN) (X11)
   * Prime-XI (PXI) (X11)
   * Bitcoin Cash (BCH) (SHA-256)
   * Onix (ONX) (X11)
   * Linx (LINX) (Scrypt)
   * SmartCash (SMART) (Keccak)
   * Vivo (VIVO) (NeoScrypt)
   * Monoeci (XMCC) (X11)
   * Creamcoin (CRM) (X11)
   * BitcoinZ (BTCZ) (Equihash)
   * Metaverse (ETP) (DaggerHashimoto)
   * Pirl (PIRL) (DaggerHashimoto)
   * Electroneum (ETN) (CryptoNight)
   * Bitcoin Gold (BTG) (Equihash)
   * Trezarcoin (TZC) (NeoScrypt)
   * DeepOnion (ONION) (X13)
   * Verge-Lyra2REv2 (XVG) (Lyra2REv2)
   * Verge-Blake (2s) (XVG) (Blake (2s))
   * Ellaism (ELLA) (DaggerHashimoto)
   * Florin (FLO) (Scrypt)
   * Universal (UNIT) (SHA-256)
   * Bulwark (BWK) (Nist5)
   * GoByte (GBX) (NeoScrypt)
   * Crowdcoin (CRC) (NeoScrypt)
   * Dinastycoin (DCY) (CryptoNight)
   * AUR-SHA (AUR) (SHA-256)
   * Innova (INN) (NeoScrypt)
   * Bitcoin Private (BTCP) (Equihash)
   * LitecoinCash (LCC) (SHA-256)
   * Galactrum (ORE) (Lyra2REv2)
   * Rupee (RUP) (Lyra2REv2)
   * Dinero (DIN) (NeoScrypt)
   * MoneroOriginal (XMO) (CryptoNight)
   * Paccoin ($PAC) (X11)
   * Straks (STAK) (Lyra2REv2)
   * Bitcoin Interest (BCI) (Equihash)
  ```
</details>

## Donations?

Any donations are appreciated:

```
BTC (bech32): bc1qkuz9a4trzgvdq9sru800jtxfz0ld0vtwrqu0nq
BTC: 1GarboYPsadWuEi8B2Pv1SvwAsBHVn1ABZ
BCH: qzjtsdg8uskpa8q5lgt7rxvxm7gv27vk0qrwgyy0nz
LTC: LNTXpx86L2ADQPMC3t78jNvramJ1xMS2F4
ETH: 0xE9eDFAB6565695C01c1978B9782ad1FE22b3E5AC
DOGE: DS7aiQgXqFrmwG3bRK3kzC78Hb114y7Y1R
```
