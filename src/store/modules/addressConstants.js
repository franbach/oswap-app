export default {
  namespaced: true,
  state: {
    address: ["0x0000000000000000000000000000000000000003"],
    UniswapV2Factory: "0xBdEBd3af1723BBB33A8aDB68e3e77d65D7266F59",
    UniswapV2Router02: "0xE6a72FeE7e34768661805DE2b621a8CDBe0DBc81",
    WONE: "0xcF664087a5bB0237a0BAd6742852ec6c8d69A27a",
    oSWAPToken: "0xc0431Ddcc0D213Bf27EcEcA8C2362c0d0208c6DC",
    oSWAPMaker: "0x7954dA0b4A81019A9313403FCDe072B93Aa41d36",
    oSWAPChef: "0xaC71B617a58B3CC136D1f6A118252f331faB44fC",
  },
  mutations: {},
  getters:{
  	oSWAPTOKEN: (state) => {
  		return state.oSWAPToken;
  	},
  	WONE: (state) => {
  		return state.WONE;
  	},
  	oSWAPMAKER: (state) => {
		return state.openMaker;
  	},
  	oSWAPCHEF: (state) => {
		return state.oSWAPChef;
  	},
  	UNIROUTERV2: (state) => {
  		return state.UniswapV2Router02;
  	},
  	UNIFACTORY: (state) => {
  		return state.UniswapV2Factory;
  	}

  },
  actions: {},
  modules: {}
};