export const pools = {
  oSWAPWONE: {
    pair: "OPENSWAP/ONE",
    pairaddress: "0x41D6852832e968d02A1AAa9Dd85F477708047a4e",
    token0address: "0x93e07A8226b646d1C93314AB9f3b87fAfC753906",
    token1address: "0x7466d7d0C21Fa05F32F5a0Fa27e12bdC06348Ce2",
    imgtoken0: "https://openfi.dev/tokens/default/oSWAP.png",
    imgtoken1: "https://openfi.dev/tokens/default/ONE.png",
    name: ["OPENSWAP", "ONE"],
    decimals: [18, 18],
    pid: "1",
    rewards: "3X",
    i: 0
  },
  oSWAPbBUSD: {
    pair: "bBUSD/OPENSWAP",
    pairaddress: "0x6D31De7b1E4364E2e95919e5dD95cacE915239e4",
    token0address: "0xE6a72FeE7e34768661805DE2b621a8CDBe0DBc81",
    token1address: "0x93e07A8226b646d1C93314AB9f3b87fAfC753906",
    imgtoken0: "https://openfi.dev/tokens/default/BUSD.png",
    imgtoken1: "https://openfi.dev/tokens/default/oSWAP.png",
    name: ["bBUSD","OPENSWAP"],
    decimals: [18, 18],
    pid: "2",
    rewards: "3X",
    i: 1
  },
  bBUSDWONE: {
    pair: "bBUSD/ONE",
    pairaddress: "0x32A6C1fF9bebbbc3a7De1e38e2069A53c50C7442",
    token0address: "0xE6a72FeE7e34768661805DE2b621a8CDBe0DBc81",
    token1address: "0x7466d7d0C21Fa05F32F5a0Fa27e12bdC06348Ce2",
    imgtoken0: "https://openfi.dev/tokens/default/BUSD.png",
    imgtoken1: "https://openfi.dev/tokens/default/ONE.png",
    name: ["bBUSD","ONE"],
    decimals: [18, 18],
    pid: "17",
    rewards: "1X",
    i: 2
  },
  WBTCWONE: {
    pair: "eWBTC/ONE",
    pairaddress: "0x02F14E73462783f63D0A6bBD6Ca25f01d69FaA5C", 
    token0address: "0x0Fe2849434dDCB859c0e9e089FcE7966a04EA4c6",
    token1address: "0x7466d7d0C21Fa05F32F5a0Fa27e12bdC06348Ce2",
    imgtoken0: "https://openfi.dev/tokens/default/WBTC.png",
    imgtoken1: "https://openfi.dev/tokens/default/ONE.png",
    name: ["eWBTC", "ONE"],
    decimals: [8, 18],
    pid: "3",
    rewards: "1X",
    i: 3
  },
  bBUSDeWBTC: {
    pair: "bBUSD/eWBTC",
    pairaddress: "0xbF2E33C3f992bEcEFE41e9969197EC8E5c6c830A",//
    token1address: "0xE6a72FeE7e34768661805DE2b621a8CDBe0DBc81",
    token0address: "0x3095c7557bCb296ccc6e363DE01b760bA031F2d9",
    imgtoken1: "https://openfi.dev/tokens/default/BUSD.png",
    imgtoken0: "https://openfi.dev/tokens/default/WBTC.png",
    name: ["bBUSD", "eWBTC"],
    decimals: [8, 18],
    pid: "4",
    rewards: "1X",
    i: 4
  },
  eBUSDeWBTC: {
    pair: "eWBTC/eBUSD",
    pairaddress: "0x5FAF138e71BCaf1c24f2616abFB1A3eE059E78c4", //
    token1address: "0x3095c7557bCb296ccc6e363DE01b760bA031F2d9",
    token0address: "0x0Fe2849434dDCB859c0e9e089FcE7966a04EA4c6",
    imgtoken0: "https://openfi.dev/tokens/default/WBTC.png",
    imgtoken1: "https://openfi.dev/tokens/default/BUSD.png",
    name: ["eWBTC", "eBUSD" ],
    decimals: [8, 18],
    pid: "5",
    rewards: "1X",
    i: 5
  },
  eBUSDWONE: {
    pair: "ONE/eBUSD",
    pairaddress: "0xF61a92fB945dddc10729f8Cd0942De20Fd0282ea",//
    token0address: "0x0Fe2849434dDCB859c0e9e089FcE7966a04EA4c6",
    token1address: "0x4F6A55A131071c69f643E8B3c0A1911d04EC18CC",
    imgtoken0: "https://openfi.dev/tokens/default/ONE.png",
    imgtoken1: "https://openfi.dev/tokens/default/BUSD.png",
    name: ["ONE","eBUSD"],
    decimals: [18, 18],
    pid: "6",
    rewards: "1X",
    i: 6
  },
  eETHeBUSD: {
    pair: "eETH/eBUSD",
    pairaddress: "0xC876490A741F671b3b81c5B78a61E017B262e352", //
    token0address: "0x7466d7d0C21Fa05F32F5a0Fa27e12bdC06348Ce2",
    token1address: "0x4F6A55A131071c69f643E8B3c0A1911d04EC18CC",
    imgtoken0: "https://openfi.dev/tokens/default/ETH.png",
    imgtoken1: "https://openfi.dev/tokens/default/BUSD.png",
    name: ["eETH", "eBUSD"],
    decimals: [18, 18],
    pid: "7",
    rewards: "1X",
    i: 7
  },
  BNBONE: {
    pair: "bBNB/ONE",
    pairaddress: "0xDB0641864B198fEA3E85473A608D43e7a92071e3",
    token1address: "0x01C6d5a307f36EDa4C1Ded36C9139618ff22ed0D",
    token0address: "0x4F6A55A131071c69f643E8B3c0A1911d04EC18CC",
    imgtoken1: "https://s2.coinmarketcap.com/static/img/coins/128x128/1839.png",
    imgtoken0: "https://openfi.dev/tokens/default/ONE.png",
    name: ["bBNB", "ONE"],
    decimals: [18, 18],
    pid: "8",
    rewards: "1X",
    i: 8
  },
  eUSDCONE: {
    pair: "eUSDC/ONE",
    pairaddress: "0x5100231D8cc27845C5c07B2870c1408E8d463491",
    token1address: "0x8c4245b6096EE6e3C7266f4289233E93B24f0b2d",
    token0address: "0x7466d7d0C21Fa05F32F5a0Fa27e12bdC06348Ce2",
    imgtoken1: "https://openfi.dev/tokens/default/USDC.png",
    imgtoken0: "https://openfi.dev/tokens/default/ONE.png",
    name: ["eUSDC", "ONE"],
    decimals: [18, 6],
    pid: "9",
    rewards: "1X",
    i: 9
  },//**************************************************************************
  oSWAPbMATIC: {
    pair: "bMATIC/OPENSWAP",
    pairaddress: "0x151d296aAa2e7CcA43BcEF836f9F33217Ea181D7",
    token0address: "0xc0431Ddcc0D213Bf27EcEcA8C2362c0d0208c6DC",
    token1address: "0x93e07A8226b646d1C93314AB9f3b87fAfC753906",
    imgtoken0: "https://openfi.dev/tokens/default/MATIC.png",
    imgtoken1: "https://openfi.dev/tokens/default/oSWAP.png",
    name: [ "bMATIC", "OPENSWAP"],
    decimals: [18, 18],
    pid: "10",
    rewards: "3X",
    i: 10
  },
    oSWAPbBNB: {
    pair: "bBNB/OPENSWAP",
    pairaddress: "0x94531a0f5aC0646b7a0CAf397208B7651498A61e",
    token0address: "0x8c4245b6096EE6e3C7266f4289233E93B24f0b2d",
    token1address: "0x93e07A8226b646d1C93314AB9f3b87fAfC753906",
    imgtoken0: "https://s2.coinmarketcap.com/static/img/coins/128x128/1839.png",
    imgtoken1: "https://openfi.dev/tokens/default/oSWAP.png",
    name: ["bBNB","OPENSWAP"],
    decimals: [18, 18],
    pid: "11",
    rewards: "3X",
    i: 11
  },

    oSWAPbADA: {
    pair: "bADA/OPENSWAP",
    pairaddress: "0x2e771a0ebF58B7B286b99620899E17d0Ca901A37",
    token0address: "0x7954dA0b4A81019A9313403FCDe072B93Aa41d36",
    token1address: "0x93e07A8226b646d1C93314AB9f3b87fAfC753906",
    imgtoken0: "https://s2.coinmarketcap.com/static/img/coins/128x128/2010.png",
    imgtoken1: "https://openfi.dev/tokens/default/oSWAP.png",
    name: ["bADA","OPENSWAP"],
    decimals: [18, 18],
    pid: "12",
    rewards: "3X",
    i: 12
  },
  ONEeETH: {
    pair: "eETH/ONE",
    pairaddress: "0x6F7B46eF820F61cb67189aE2838e8F66E66284BB",
    token0address: "0x01C6d5a307f36EDa4C1Ded36C9139618ff22ed0D",
    token1address: "0x7466d7d0C21Fa05F32F5a0Fa27e12bdC06348Ce2",
    imgtoken0: "https://openfi.dev/tokens/default/ETH.png",
    imgtoken1: "https://openfi.dev/tokens/default/ONE.png",
    name: ["eETH","ONE"],
    decimals: [18, 18],
    pid: "13",
    rewards: "1X",
    i: 13
  },
  oSWAPWONEs: {
    pair: "eBUSD/bBUSD",
    pairaddress: "0x4B6D92E42418417728260e95Cb2Ce515e23f64B4",
    token0address: "0x4F6A55A131071c69f643E8B3c0A1911d04EC18CC",
    token1address: "0xE6a72FeE7e34768661805DE2b621a8CDBe0DBc81",
    imgtoken0: "https://openfi.dev/tokens/default/BUSD.png",
    imgtoken1: "https://openfi.dev/tokens/default/BUSD.png",
    name: ["eBUSD", "bBUSD"],
    decimals: [18, 18],
    pid: "14",
    rewards: "2X",
    i: 14
  },
  eBUSDbBUSD: {
    pair: "eUSDC/bUSDC",
    pairaddress: "0x4D8578a413EA7e25EE6Ca62E3aeaE3a5a38DAd32",
    token0address: "0x9cE19be5a7aEA084213e7cCaA5bC6c96F5bB9a77",
    token1address: "0xaC71B617a58B3CC136D1f6A118252f331faB44fC",
    imgtoken0: "https://openfi.dev/tokens/default/USDC.png",
    imgtoken1: "https://openfi.dev/tokens/default/USDC.png",
    name: ["bBUSD","eBUSD"],
    decimals: [6, 18],
    pid: "15",
    rewards: "1X",
    i: 15
  },
  eUSDCbUSDC: {
    pair: "bBUSD/eUSDC",
    pairaddress: "0x156d2759405CaCD89746590e92FdbddA5AAF6A6f",
    token0address: "0xE6a72FeE7e34768661805DE2b621a8CDBe0DBc81",
    token1address: "0x9cE19be5a7aEA084213e7cCaA5bC6c96F5bB9a77",
    imgtoken0: "https://openfi.dev/tokens/default/BUSD.png",
    imgtoken1: "https://openfi.dev/tokens/default/USDC.png",
    name: ["bUSDC","eUSDC"],
    decimals: [6, 18],
    pid: "16",
    rewards: "1X",
    i: 16
  }
};
export const SoloPools = {}

