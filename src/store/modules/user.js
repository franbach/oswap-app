export default {
  namespaced: true,

  state: {
    isNew: true,
    signedOut: true,
    address: "0x0000000000000000000000000000000000000003",
    
  },
  mutations: {
    _setIsNew(state, isNewUser) {
      state.isNew = isNewUser;
    },
    _setUserAddress(state, address) {
      state.address = address;
    },
    _setUserWallet(state, wallet) {
      state.wallet = wallet;
    }
  },
  getters:{
  	getIsNew: (state) => {
  		return state.isNew;
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
  	setIsNew({ commit }, value){
  		commit('_setIsNew', value);
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