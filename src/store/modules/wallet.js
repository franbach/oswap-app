export default {
  namespaced: true,

  state: {
    signedIn: false,
    signedOut: true,
    address: "0x0000000000000000000000000000000000000003",
    wallet: null,
    walletType: null,
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
    },
    _setWalletType(state, walletType) {
      state.walletType = walletType;
    }
  },
  getters:{
  	getUserSignedIn: (state) => {
  		return state.signedIn;
  	},
    getWalletType: (state) => {
      return state.walletType;
    },
  	getUserSignedOut: (state) => {
  		return state.signedOut;
  	},
  	getUserAddress: (state) => {
  		return state.address
  	},
  	getWallet: (state) => {
  		return state.wallet;
  	}

  },
  actions: {
    setWalletType({ commit }, value){
      commit('_setWalletType', value);
    },
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