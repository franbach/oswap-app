export const Pools = {
  oSWAPWONE: {
    pair: "OPENSWAP/ONE",
    pairaddress: "0x17c0396FbeBE7B011D9519F2B5D04215496d9653",
    token0address: "0xc0431Ddcc0D213Bf27EcEcA8C2362c0d0208c6DC",
    token1address: "0xcF664087a5bB0237a0BAd6742852ec6c8d69A27a",
    imgtoken0: "https://openfi.dev/tokens/default/oSWAP.png",
    imgtoken1: "https://openfi.dev/tokens/default/ONE.png",
    name: ["OPENSWAP", "ONE"],
    decimals: [18, 18],
    pid: "0",
    rewards: "3X"
  },
    oSWAPvONE: {
    pair: "OPENSWAP/ONE (VENOM LP)",
    pairaddress: "0xd302166217cd90d398ffd7ba75e51dd99fe66fde",
    token0address: "0xc0431Ddcc0D213Bf27EcEcA8C2362c0d0208c6DC",
    token1address: "0xcF664087a5bB0237a0BAd6742852ec6c8d69A27a",
    imgtoken0: "https://openfi.dev/tokens/default/oSWAP.png",
    imgtoken1: "https://openfi.dev/tokens/default/ONE.png",
    name: ["OPENSWAP", "ONE"],
    decimals: [18, 18],
    pid: "12",
    rewards: "2X"
  },
  oSWAPbBUSD: {
    pair: "OPENSWAP/bBUSD",
    pairaddress: "0x4BEc01D58cfdBB9D3b83dDa34Be950f936395D82",
    token0address: "0xc0431Ddcc0D213Bf27EcEcA8C2362c0d0208c6DC",
    token1address: "0x0aB43550A6915F9f67d0c454C2E90385E6497EaA",
    imgtoken0: "https://openfi.dev/tokens/default/oSWAP.png",
    imgtoken1: "https://openfi.dev/tokens/default/BUSD.png",
    name: ["OPENSWAP", "bBUSD"],
    decimals: [18, 18],
    pid: "1",
    rewards: "3X"
  },//**************************************************************************
  oSWAPbMATIC: {
    pair: "OPENSWAP/bMATIC",
    pairaddress: "0x670E114f3D4845BaB7CCb01fFC4033419050fCb3",
    token0address: "0xc0431Ddcc0D213Bf27EcEcA8C2362c0d0208c6DC",
    token1address: "0x6E7bE5B9B4C9953434CD83950D61408f1cCc3bee",
    imgtoken0: "https://openfi.dev/tokens/default/oSWAP.png",
    imgtoken1: "https://openfi.dev/tokens/default/MATIC.png",
    name: ["OPENSWAP", "bMATIC"],
    decimals: [18, 18],
    pid: "13",
    rewards: "3X"
  },
    oSWAPbBNB: {
    pair: "OPENSWAP/bBNB",
    pairaddress: "0x5D951e050247518abA916B7C0099FdCCa9aBCEFC",
    token0address: "0xc0431Ddcc0D213Bf27EcEcA8C2362c0d0208c6DC",
    token1address: "0xb1f6E61E1e113625593a22fa6aa94F8052bc39E0",
    imgtoken0: "https://openfi.dev/tokens/default/oSWAP.png",
    imgtoken1: "https://s2.coinmarketcap.com/static/img/coins/128x128/1839.png",
    name: ["OPENSWAP", "bBNB"],
    decimals: [18, 18],
    pid: "14",
    rewards: "3X"
  },

    oSWAPbADA: {
    pair: "OPENSWAP/bADA",
    pairaddress: "0x100C1bD0E5D5ac7A365545553B33878D8EF04Ee2",
    token0address: "0xc0431Ddcc0D213Bf27EcEcA8C2362c0d0208c6DC",
    token1address: "0x582617bD8Ca80d22D4432E63Fda52D74dcDCEe4c",
    imgtoken0: "https://openfi.dev/tokens/default/oSWAP.png",
    imgtoken1: "https://s2.coinmarketcap.com/static/img/coins/128x128/2010.png",
    name: ["OPENSWAP", "bADA"],
    decimals: [18, 18],
    pid: "15",
    rewards: "3X"
  },

//**************************************************************************
  bBUSDWONE: {
    pair: "ONE/bBUSD",
    pairaddress: "0xF880c5D048696d80425C183b3f77b8693d0B34D5",
    token0address: "0xcF664087a5bB0237a0BAd6742852ec6c8d69A27a",
    token1address: "0x0aB43550A6915F9f67d0c454C2E90385E6497EaA",
    imgtoken0: "https://openfi.dev/tokens/default/ONE.png",
    imgtoken1: "https://openfi.dev/tokens/default/BUSD.png",
    name: ["ONE", "bBUSD"],
    decimals: [18, 18],
    pid: "2",
    rewards: "1X"
  },

  WBTCWONE: {
    pair: "eWBTC/ONE",
    pairaddress: "0xBc309D31C937E4db0e9737244C5a2cF4Cc80251A", //
    token0address: "0x3095c7557bCb296ccc6e363DE01b760bA031F2d9",
    token1address: "0xcF664087a5bB0237a0BAd6742852ec6c8d69A27a",
    imgtoken0: "https://openfi.dev/tokens/default/WBTC.png",
    imgtoken1: "https://openfi.dev/tokens/default/ONE.png",
    name: ["eWBTC", "ONE"],
    decimals: [8, 18],
    pid: "3",
    rewards: "1X"
  },
  bBUSDeWBTC: {
    pair: "bBUSD/eWBTC",
    pairaddress: "0x4FaFE1965008aAe92299AFE8bBbA127d332525C2",
    token0address: "0x0aB43550A6915F9f67d0c454C2E90385E6497EaA",
    token1address: "0x3095c7557bCb296ccc6e363DE01b760bA031F2d9",
    imgtoken0: "https://openfi.dev/tokens/default/BUSD.png",
    imgtoken1: "https://openfi.dev/tokens/default/WBTC.png",
    name: ["bBUSD", "eWBTC"],
    decimals: [18, 8],
    pid: "4",
    rewards: "1X"
  },
  eBUSDeWBTC: {
    pair: "eBUSD/eWBTC",
    pairaddress: "0xde1CbB28b2319b61C82CCa34C66c4D8A2E4D0050", //
    token0address: "0xE176EBE47d621b984a73036B9DA5d834411ef734",
    token1address: "0x3095c7557bCb296ccc6e363DE01b760bA031F2d9",
    imgtoken0: "https://openfi.dev/tokens/default/BUSD.png",
    imgtoken1: "https://openfi.dev/tokens/default/WBTC.png",
    name: ["eBUSD", "eWBTC"],
    decimals: [18, 8],
    pid: "5",
    rewards: "1X"
  },
  eBUSDWONE: {
    pair: "eBUSD/ONE",
    pairaddress: "0xF47F0cc859B78805A2852c744Bc1fb6A676aF087",
    token0address: "0xE176EBE47d621b984a73036B9DA5d834411ef734",
    token1address: "0xcF664087a5bB0237a0BAd6742852ec6c8d69A27a",
    imgtoken0: "https://openfi.dev/tokens/default/BUSD.png",
    imgtoken1: "https://openfi.dev/tokens/default/ONE.png",
    name: ["eBUSD", "ONE"],
    decimals: [18, 18],
    pid: "6",
    rewards: "1X"
  },
  eETHeBUSD: {
    pair: "eETH/eBUSD",
    pairaddress: "0xaD47c003C58F421668B68538eaBc91feb1A2C890", //
    token0address: "0x6983D1E6DEf3690C4d616b13597A09e6193EA013",
    token1address: "0xE176EBE47d621b984a73036B9DA5d834411ef734",
    imgtoken0: "https://openfi.dev/tokens/default/ETH.png",
    imgtoken1: "https://openfi.dev/tokens/default/BUSD.png",
    name: ["eETH", "eBUSD"],
    decimals: [18, 18],
    pid: "7",
    rewards: "1X"
  } /*
    BNBONE: {
    pair: "bBNB/ONE",
    pairaddress: "0xfaADF659160f8c736f6D502Ac4fa8671b65312f0",
    token0address: "0xb1f6E61E1e113625593a22fa6aa94F8052bc39E0",
    token1address: "0xE176EBE47d621b984a73036B9DA5d834411ef734",
    imgtoken0: "https://s2.coinmarketcap.com/static/img/coins/128x128/1839.png",
    imgtoken1: "https://openfi.dev/tokens/default/BUSD.png",
    name: ["bBNB", "ONE"],
    pid: "8"
    
  }*/,
  BNBONE: {
    pair: "bBNB/ONE",
    pairaddress: "0xa6426246bc8b9DF94f197Dd139ffE2C041DB7DaC",
    token0address: "0xb1f6E61E1e113625593a22fa6aa94F8052bc39E0",
    token1address: "0xcF664087a5bB0237a0BAd6742852ec6c8d69A27a",
    imgtoken0: "https://s2.coinmarketcap.com/static/img/coins/128x128/1839.png",
    imgtoken1: "https://openfi.dev/tokens/default/ONE.png",
    name: ["bBNB", "ONE"],
    decimals: [18, 18],
    pid: "9",
    rewards: "1X"
  },
  eUSDCONE: {
    pair: "eUSDC/ONE",
    pairaddress: "0x9609B0A068806023A8b2e1bD9e741dB797092b6D",
    token0address: "0x985458E523dB3d53125813eD68c274899e9DfAb4",
    token1address: "0xcF664087a5bB0237a0BAd6742852ec6c8d69A27a",
    imgtoken0: "https://openfi.dev/tokens/default/USDC.png",
    imgtoken1: "https://openfi.dev/tokens/default/ONE.png",
    name: ["eUSDC", "ONE"],
    decimals: [6, 18],
    pid: "10",
    rewards: "1X"
  }
};
