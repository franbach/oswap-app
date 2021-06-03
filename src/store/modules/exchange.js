const { ethtokens } = require("./exchange_tokens/ethTokens.js");
const { hmytokens } = require("./exchange_tokens/hmyTokens.js");
const { bsctokens } = require("./exchange_tokens/bscTokens.js");

export default {
  namespaced: true,

  state: {
    swap: {},

    allTokens: [ 
      { 
        name: 'Harmony Native Tokens',
        icon: 'https://openfi.dev/tokens/default/ONE.png',
        tokens:  hmytokens
      }, 
      { 
        name: 'Ethereum Bridged Tokens', 
        icon: 'https://openfi.dev/tokens/default/ETH.png',
        tokens: ethtokens 
      }, 
      { 
        name: 'Binance Smart Chain Tokens', 
        icon: 'https://s2.coinmarketcap.com/static/img/coins/128x128/1839.png',
        tokens: bsctokens 
      }
    ]
  },

  getters: {
    // Retrieves All tokens or by user input
    retrieveTokens: (state) => (search) => {
      let filtered = [];
  
      state.allTokens.forEach(network => {
        Object.fromEntries(
          Object.entries(network.tokens).filter(([k, v]) => {
            if (k.match(new RegExp(`^${search}$`, 'i'))) {
              filtered.push(
                { 
                  name: network.name, 
                  icon: network.icon, 
                  tokens: { token: network.tokens[k] } 
                }
              )
            }      
          })
        )
      });
      if (search !== '') { 
        return filtered
      } else { 
        return state.allTokens 
      }
    },

    // It retrieves the current state of token selection
    getToken: (state) => {
      return state.swap
    }
  },
  
  actions: {
    // Triggers the 'twin' method in the mutations to
    // change the state.swap
    setToken({ commit }, value) {
      commit('_setToken', value)
    },

    // Switch Tokens before executing the swap
    switchTokens({ commit }) {
      commit('_switchTokens')
    },

    // Resets the token selection
    resetTokens({ commit }) {
      commit('_resetTokens')
    }

  },

  mutations: {
    _setToken: (state, value) => {
      state.swap[value.tokenRef] = value.token
    },

    _switchTokens: (state) => {
      [state.swap.token1, state.swap.token2] = [state.swap.token2, state.swap.token1]
    },

    _resetTokens: (state) => {
      state.swap = {}
    }
  }

}