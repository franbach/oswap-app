export const pools = {
  oSWAPWONE: {
    pair: "OPENSWAP/ONE",
    pairaddress: "0xD1bC0791a37c90a93A48f17B06087F8C97d6c2A5",//0x40124A95B9BCC73D023b5a431e09F66407f66a4a And 0xA30858833c1Da05A3c80F92f1dE234895B1cF29A
    token0address: "0x40124A95B9BCC73D023b5a431e09F66407f66a4a",
    token1address: "0xA30858833c1Da05A3c80F92f1dE234895B1cF29A",
    imgtoken0: "https://openfi.dev/tokens/default/oSWAP.png",
    imgtoken1: "https://openfi.dev/tokens/default/ONE.png",
    name: ["OPENSWAP", "ONE"],
    decimals: [18, 18],
    pid: "0",
    rewards: "3X",
    i: 0
  },
  oSWAPbBUSD: {
    pair: "bBUSD/OPENSWAP",
    pairaddress: "0x0d3aa4F73C7cA416512C252bcD30A0822075bBA8", //0xa792af75af5fb3Ddc713BEEcB8868dAaA9fa2387 And 0x40124A95B9BCC73D023b5a431e09F66407f66a4a
    token0address: "0xa792af75af5fb3Ddc713BEEcB8868dAaA9fa2387",
    token1address: "0x40124A95B9BCC73D023b5a431e09F66407f66a4a",
    imgtoken0: "https://openfi.dev/tokens/default/BUSD.png",
    imgtoken1: "https://openfi.dev/tokens/default/oSWAP.png",
    name: ["bBUSD","OPENSWAP"],
    decimals: [18, 18],
    pid: "1",
    rewards: "3X",
    i: 1
  },
  bBUSDWONE: {
    pair: "bBUSD/ONE",
    pairaddress: "0xb3A4aC4f832bd4cC1C1C57e1Cf059A342FA6e99F",//0xa792af75af5fb3Ddc713BEEcB8868dAaA9fa2387 And 0xA30858833c1Da05A3c80F92f1dE234895B1cF29A
    token0address: "0xa792af75af5fb3Ddc713BEEcB8868dAaA9fa2387",
    token1address: "0xA30858833c1Da05A3c80F92f1dE234895B1cF29A",
    imgtoken0: "https://openfi.dev/tokens/default/BUSD.png",
    imgtoken1: "https://openfi.dev/tokens/default/ONE.png",
    name: ["bBUSD","ONE"],
    decimals: [18, 18],
    pid: "2",
    rewards: "1X",
    i: 2
  },
  WBTCWONE: {
    pair: "eWBTC/ONE",
    pairaddress: "0x100565dcbCcC4e38699d913Dd1F8987253426380", //0x5b71f6DE142C337102649Ed9D957A9Ec0187341E And 0xA30858833c1Da05A3c80F92f1dE234895B1cF29A
    token0address: "0x5b71f6DE142C337102649Ed9D957A9Ec0187341E",
    token1address: "0xA30858833c1Da05A3c80F92f1dE234895B1cF29A",
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
    pairaddress: "0x4554047c2B5536B005F9EDCBD4514D090cbF0576",
    token1address: "0xa792af75af5fb3Ddc713BEEcB8868dAaA9fa2387",//0xa792af75af5fb3Ddc713BEEcB8868dAaA9fa2387 And 0x5b71f6DE142C337102649Ed9D957A9Ec0187341E
    token0address: "0x5b71f6DE142C337102649Ed9D957A9Ec0187341E",
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
    pairaddress: "0x1450B3D9408913897e8A1e1104b02E8dCF35581c", //0x5b71f6DE142C337102649Ed9D957A9Ec0187341E And 0xbff039Da81301348A1a9d218a45EC2b533298C99
    token0address: "0x5b71f6DE142C337102649Ed9D957A9Ec0187341E",
    token1address: "0xbff039Da81301348A1a9d218a45EC2b533298C99",
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
    pairaddress: "0xAA82F9913A2355D02f5E87a08c3D3eD49E88Bf73",

    token0address: "0xA30858833c1Da05A3c80F92f1dE234895B1cF29A",
    token1address: "0xbff039Da81301348A1a9d218a45EC2b533298C99",
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
    pairaddress: "0xCCA350B0Fa265102ccF1cbaeCd7615C4F84B57a1", 

    token0address: "0x1a3519694F1a0c65D1fA8E5f52c85884B2d2E319",
    token1address: "0xbff039Da81301348A1a9d218a45EC2b533298C99",
    imgtoken0: "https://openfi.dev/tokens/default/ETH.png",
    imgtoken1: "https://openfi.dev/tokens/default/BUSD.png",
    name: ["eETH", "eBUSD"],
    decimals: [18, 18],
    pid: "7",
    rewards: "1X",
    i: 7
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
    pairaddress: "0x207Fa275edFaaB6f7e2903Bf70869A60Aa186899",
    token1address: "0xEfe21ae5aafdcCc7AF035412CCC62973d15c1AC7",
    token0address: "0xA30858833c1Da05A3c80F92f1dE234895B1cF29A",
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
    pairaddress: "0x35eD88F91c4349A6c3Fa1a07aee44b3a7cA5528A",
    token0address: "0x3DF18C5b6e4A8071a13d011e97891232edEcDD60",
    token1address: "0xA30858833c1Da05A3c80F92f1dE234895B1cF29A",
    imgtoken0: "https://openfi.dev/tokens/default/USDC.png",
    imgtoken1: "https://openfi.dev/tokens/default/ONE.png",
    name: ["eUSDC", "ONE"],
    decimals: [6, 18],
    pid: "9",
    rewards: "1X",
    i: 9
  },//**************************************************************************
  oSWAPbMATIC: {
    pair: "bMATIC/OPENSWAP",
    pairaddress: "0x5DC8bFF97a80d91D7F38d8e366ea09a3763341Eb",
    token1address: "0xf8B4F5231F1a604A41533720c1677F37b8665b04",
    token0address: "0x40124A95B9BCC73D023b5a431e09F66407f66a4a",
    imgtoken1: "https://openfi.dev/tokens/default/MATIC.png",
    imgtoken0: "https://openfi.dev/tokens/default/oSWAP.png",
    name: [ "bMATIC", "OPENSWAP"],
    decimals: [18, 18],
    pid: "10",
    rewards: "3X",
    i: 10
  },
    oSWAPbBNB: {
    pair: "bBNB/OPENSWAP",
    pairaddress: "0x4b76Faf2BB56048a456d19cc932110E404872550",
    token1address: "0xEfe21ae5aafdcCc7AF035412CCC62973d15c1AC7",
    token0address: "0x40124A95B9BCC73D023b5a431e09F66407f66a4a",
    imgtoken1: "https://s2.coinmarketcap.com/static/img/coins/128x128/1839.png",
    imgtoken0: "https://openfi.dev/tokens/default/oSWAP.png",
    name: ["bBNB","OPENSWAP"],
    decimals: [18, 18],
    pid: "11",
    rewards: "3X",
    i: 11
  },

    oSWAPbADA: {
    pair: "bADA/OPENSWAP",
    pairaddress: "0x5de4291fe5AEfF0f8ed6fe9A430ac3CdA3fFdA43",
    token1address: "0x807e68ce2a6564156Dc1f4f3cbf29572298d9Faa",
    token0address: "0x40124A95B9BCC73D023b5a431e09F66407f66a4a",
    imgtoken1: "https://s2.coinmarketcap.com/static/img/coins/128x128/2010.png",
    imgtoken0: "https://openfi.dev/tokens/default/oSWAP.png",
    name: ["bADA","OPENSWAP"],
    decimals: [18, 18],
    pid: "12",
    rewards: "3X",
    i: 12
  },
  ONEeETH: {
    pair: "eETH/ONE",
    pairaddress: "0x29918c75EC4414D061BBD0742B7d3c744BD1D68E",
    token0address: "0x1a3519694F1a0c65D1fA8E5f52c85884B2d2E319",
    token1address: "0xA30858833c1Da05A3c80F92f1dE234895B1cF29A",
    imgtoken0: "https://openfi.dev/tokens/default/ETH.png",
    imgtoken1: "https://openfi.dev/tokens/default/ONE.png",
    name: ["eETH","ONE"],
    decimals: [18, 18],
    pid: "13",
    rewards: "1X",
    i: 13
  },
  oSWAPWONEs: {
    pair: "OPENSWAP/WONE VENOM-LP",
    pairaddress: "0x4719eDF7Cd1e66B2c49ee6B0F8b704F083e701E5",
    token0address: "0xbff039Da81301348A1a9d218a45EC2b533298C99",
    token1address: "0xa792af75af5fb3Ddc713BEEcB8868dAaA9fa2387",
    imgtoken0: "https://openfi.dev/tokens/default/oSWAP.png",
    imgtoken1: "https://openfi.dev/tokens/default/ONE.png",
    name: ["OPENSWAP", "ONE"],
    decimals: [18, 18],
    pid: "14",
    rewards: "2X",
    i: 14
  },
  eBUSDbBUSD: {
    pair: "eBUSD/bBUSD",
    pairaddress: "0xE52EF416BF900ad763B02bf23B0DE72B88B1EB2A",
    token0address: "0x3DF18C5b6e4A8071a13d011e97891232edEcDD60",
    token1address: "0x38C4d81374Fae21D0436249fa462D813AE1a53D2",
    imgtoken0: "https://openfi.dev/tokens/default/BUSD.png",
    imgtoken1: "https://openfi.dev/tokens/default/BUSD.png",
    name: ["bBUSD","eBUSD"],
    decimals: [18, 18],
    pid: "15",
    rewards: "1X",
    i: 15
  },
  eUSDCbUSDC: {
    pair: "eUSDC/bUSDC",
    pairaddress: "0xDDFD356523b0B4Cd472c7fb5575b9a35291b5fFF",
    token0address: "0xa792af75af5fb3Ddc713BEEcB8868dAaA9fa2387",
    token1address: "0x3DF18C5b6e4A8071a13d011e97891232edEcDD60",
    imgtoken0: "https://openfi.dev/tokens/default/USDC.png",
    imgtoken1: "https://openfi.dev/tokens/default/USDC.png",
    name: ["eUSDC","bUSDC"],
    decimals: [6, 18],
    pid: "16",
    rewards: "1X",
    i: 16
  }
  //PID 20 == VALIDATOR TOKEN
};
export const SoloPools = {

}