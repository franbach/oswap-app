
export default {
  namespaced: true,

  state: {
    signedIn: false,
    signedOut: false,
    address: "0x0000000000000000000000000000000000000003",
    wallet: [],
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