export default {
  namespaced: true,
  state: {
    UniswapV2Factory: {
      1:"",
      56:"",
      1666600000: "0xBdEBd3af1723BBB33A8aDB68e3e77d65D7266F59",
      1666700000: "0xc829d96D7454D06c61c47F9c15090956193f18dF",
      1337:"0x316730Ba39D32a44D0CfB7e872D49cC7F5d4d2d5"
    },
    bBUSD: {
      1:"",
      56:"",
      1666600000: "0x0aB43550A6915F9f67d0c454C2E90385E6497EaA",//
      1666700000: "0xE6a72FeE7e34768661805DE2b621a8CDBe0DBc81",
      1337:"0xa792af75af5fb3Ddc713BEEcB8868dAaA9fa2387"
    },
    
    UniswapV2Router02: {
      1:"",
      56:"",
      1666600000: "0xE6a72FeE7e34768661805DE2b621a8CDBe0DBc81",
      1666700000: "0x2AE5DfAc9b6239215a5C360C73d847026124b59C",
      1337:"0x368CB2a517967cA38C5570c1186cB36aE0f968f4"
    },
    WONE: {
      1:"",
      56:"",
      1666600000: "0xcF664087a5bB0237a0BAd6742852ec6c8d69A27a",
      1666700000: "0x7466d7d0c21fa05f32f5a0fa27e12bdc06348ce2",
      1337:"0xA30858833c1Da05A3c80F92f1dE234895B1cF29A"
    },
    oSWAPToken: {
      1:"",
      56:"",
      1666600000: "0xc0431Ddcc0D213Bf27EcEcA8C2362c0d0208c6DC",
      1666700000: "0x93e07A8226b646d1C93314AB9f3b87fAfC753906",
      1337:"0x40124A95B9BCC73D023b5a431e09F66407f66a4a"
    },
    oSWAPMaker: {
      1:"",
      56:"",
      1666600000: "0x7954dA0b4A81019A9313403FCDe072B93Aa41d36",
      1666700000: "0x9ca2f7f7f7BC49da9a337F6bcA2a7884179abd7A",
      1337:"0x514196CdA081505a6A3A94b94eCfF9Ed666901Df"
    },

    eBUSD: {
      1:"",
      56:"",
      1666600000: "0xE176EBE47d621b984a73036B9DA5d834411ef734",//
      1666700000: "0x4F6A55A131071c69f643E8B3c0A1911d04EC18CC",
      1337:"0xbff039Da81301348A1a9d218a45EC2b533298C99"//
    },
    bUSDC: {
      1:"",
      56:"",
      1666600000: "0x44cED87b9F1492Bf2DCf5c16004832569f7f6cBa",//
      1666700000: "0xaC71B617a58B3CC136D1f6A118252f331faB44fC",
      1337:"0x38C4d81374Fae21D0436249fa462D813AE1a53D2"
    },
    eUSDC: {
      1:"",
      56:"",
      1666600000: "0x985458E523dB3d53125813eD68c274899e9DfAb4",//
      1666700000: "0x9cE19be5a7aEA084213e7cCaA5bC6c96F5bB9a77",
      1337:"0x3DF18C5b6e4A8071a13d011e97891232edEcDD60"//
    },
    oSWAPChef: {
      1:"",
      56:"",
      1666600000: "0xaC71B617a58B3CC136D1f6A118252f331faB44fC",
      1666700000: "0xa1799195C8051BFD94fE9EeCb1C47Ce1d112c0DA",
      1337:"0xde09e44246B8644C64c890b708df8B8d1b85d850"
    },
	  harmonyMulticall : {
      1:"",
      56:"",
      1666600000: "0x34b415f4d3b332515e66f70595ace1dcf36254c5",
      1666700000: "0xd078799c53396616844e2fa97f0dd2b4c145a685",
      1337:"0xf215AE004071276e14cC11d3E995A6410D4273F7"
    },
	  harmonyRPC: {
      1:"",
      56:"",
      1666600000: "https://api.harmony.one",
      1666700000: "https://api.s0.b.hmny.io",
      1337:"http://localhost:7545"
    },
    lockedAddress: {
      1:"",
      56:"",
      1666600000: "0x8c4245b6096EE6e3C7266f4289233E93B24f0b2d",
      1666700000: "0x1D32388D509Fe398679B4dEEb873a96348900f2d",
      1337:"0xc37ea794aB7E82e3fe7465AE7674EeD7e7eE39C3"
    },
  },
  mutations: {},
  getters:{
  	oSWAPTOKEN: (state) => (id) => {
  		return state.oSWAPToken[id];
  	},
    lockedAddress: (state) => (id) => {
      return state.lockedAddress[id];
    },
  	WONE: (state) => (id) => {
  		return state.WONE[id];
  	},
    bBUSD: (state) => (id) => {
      return state.bBUSD[id];
    },
    eBUSD: (state) => (id) => {
      return state.eBUSD[id];
    },
    bUSDC: (state) => (id) => {
      return state.bUSDC[id];
    },
    eUSDC: (state) => (id) => {
      return state.eUSDC[id];
    },
  	oSWAPMAKER: (state) => (id) => {
		return state.oSWAPMaker[id];
  	},
  	oSWAPCHEF: (state) => (id) => {
		return state.oSWAPChef[id];
  	},
  	UNIROUTERV2: (state) => (id) => {
  		return state.UniswapV2Router02[id];
  	},
  	UNIFACTORY: (state) => (id) => {
  		return state.UniswapV2Factory[id];
  	},
	hMULTICALL: (state) => (id) => {
		return state.harmonyMulticall[id];
	},
	hRPC:(state) => (id) => {
		return state.harmonyRPC[id];
	}
  },
  actions: {},
  modules: {}
};