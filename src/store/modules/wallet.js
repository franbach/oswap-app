export default {
  namespaced: true,

  state: {
    signedIn: false,
    signedOut: true,
    address: "0x0000000000000000000000000000000000000005",
    wallet: null,
    walletType: 'metamask',
    explorer: "https://explorer.harmony.one/#/tx/"
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
  	},
  },
  actions: {
    switchWalletType({ commit }) {
      commit('_switchWalletType')
    },
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
  mutations: {
    _switchWalletType(state) {
      if (state.walletType == 'metamask') {
        state.walletType = 'oneWallet';
      } else if (state.walletType == 'oneWallet') {
        state.walletType = 'metamask';
      }
      console.log(state.walletType)
    },
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
  modules: {}
};