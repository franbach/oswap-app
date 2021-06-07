
export default {
  namespaced: true,

  state: {
    signedIn: false,
    signedOut: false,
    address: ["0x0000000000000000000000000000000000000003"],
    wallet: [],

    UniswapV2Factory: "0xBdEBd3af1723BBB33A8aDB68e3e77d65D7266F59",
    UniswapV2Router02: "0xE6a72FeE7e34768661805DE2b621a8CDBe0DBc81",
    WONE: "0xcF664087a5bB0237a0BAd6742852ec6c8d69A27a",

    SushiToken: "0xc0431Ddcc0D213Bf27EcEcA8C2362c0d0208c6DC",
    SushiMaker: "0x7954dA0b4A81019A9313403FCDe072B93Aa41d36",
    MasterChef: "0xaC71B617a58B3CC136D1f6A118252f331faB44fC",

    explorer: "https://explorer.harmony.one/#/tx/"
  },
  mutations: {
    _hasSignedIn(state, hasSignedIn) {
      state.signedIn = hasSignedIn;
    },
    _hasSignedOut(state, hasSignedOut) {
      state.signedOut = hasSignedOut;
    },
    _setUserAddress(state, address) {
      state.address = address;
    },
    _setUserWallet(state, wallet) {
      state.wallet = wallet;
    }
  },
  getters:{
  	getUserSignedIn: (state) => {
  		return state.signedIn;
  	},
  	getUserSignedOut: (state) => {
  		return state.signedOut;
  	},
  	getUserAddress: (state) => {
  		if(state.signedIn == true){
  			return state.address;
  		}else{
  			return;
  		}
  		
  	},
  	getWallet: (state) => {
  		return state.wallet;
  	}

  },
  actions: {
  	setSignedIn({ commit }, value){
  		commit('_hasSignedIn', value);
  	},
  	setSignedOut({ commit }, value){
  		commit('_hasSignedOut', value);
  	},
  	setUserAddress({ commit }, value){
  		commit('_setUserAddress', value);
  	},
  	setUserWallet({ commit }, value){
  		commit('_setUserWallet', value);
  	}
  },
  modules: {}
};