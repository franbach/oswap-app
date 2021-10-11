import { ethers } from "ethers";

export default {
  namespaced: true,

  state: {
    signedIn: false,
    signedOut: true,
    address: "0x0000000000000000000000000000000000000009",
    wallet: null,
    walletType: 'metamask',
    explorer: "https://explorer.harmony.one/#/tx/",
    chainID: 1666600000,
    networks: {
      1:{
        rpcURL: '',
        provider: '',
        name: ""
      },
      56: {
        rpcURL: '',
        provider: '',
        name: ""
      },
      1666600000: {
        rpcURL: 'https://api.harmony.one',
        provider: new ethers.providers.JsonRpcProvider('https://api.harmony.one', {chainId: 1666600000, name: "Harmony Mainnet S0"}),
        name: "mainnet harmony"
      },
      1666700000: {
        rpcURL: 'https://api.s0.b.hmny.io',
        provider: new ethers.providers.JsonRpcProvider('https://api.s0.b.hmny.io', {chainId: 1666700000, name: "Harmony Testnet S0"}),
        name: "testnet"
      },
      1337:{
        rpcURL: 'http://localhost:7545',
        provider: new ethers.providers.JsonRpcProvider('http://localhost:7545', {chainId: 1337, name: "localhost"}),
        name: "local"
      }
    }
  },
  getters:{
  	getUserSignedIn: (state) => {
  		return state.signedIn;
  	},
    getChainID: (state) => {
      return state.chainID;
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
    getStateProvider: (state) => (id) => {
      return state.networks[id];
    }
  },
  actions: {
    switchWalletType({ commit }) {
      commit('_switchWalletType')
    },
    setWalletType({ commit }, value){
      commit('_setWalletType', value);
    },
    setChainID({ commit }, value){
      commit('_setChainID', value);
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
    _setChainID(state, id) {
      state.chainID = id;
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