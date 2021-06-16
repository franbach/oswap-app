const { ethtokens } = require("./exchange_tokens/ethTokens.js");
const { hmytokens } = require("./exchange_tokens/hmyTokens.js");
const { bsctokens } = require("./exchange_tokens/bscTokens.js");

export default {
  // --------------------------------------------------------------------------
  // Everything Related to Swap Component -------------------------------------
  // to map this functions to components you must add:
  // ...mapGetters('exchange', ['functionName, ...'])
  // then to call the function in the component: this.functionName()
  // --------------------------------------------------------------------------
  namespaced: true,

  state: {
    step: {
      swap: true,
      swapmodal: false,
      swapper: false
    },

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
      let regex = RegExp(`\w?${search}`, 'i')
  
      state.allTokens.forEach(network => {
        let tokenFound = {}
        
        Object.entries(network.tokens).forEach(([k, v]) => {
          if (v.Symbol.match(regex)) {
            tokenFound[k] = v
          }
        });
        if (Object.keys(tokenFound).length > 0) {
          filtered.push({
            name: network.name,
            icon: network.icon,
            tokens: tokenFound
          })
        }
      });

      if (search !== '') { 
        return filtered
      } else { 
        return state.allTokens 
      }
    },

    // It retrieves the exact token requested
    findToken: (state) => (token) => { 
      let found
      state.allTokens.forEach(network => {        
        Object.entries(network.tokens).forEach(([k, v]) => {
          if (v.Symbol.match(token)) {
            found = v
          }
        });
      });
      return found
    },

    // It retrieves the current state of token selection
    getToken: (state) => {
      return state.swap
    },

    // get current step state
    getStepState: (state) => (step) => {
      return state.step[step]
    },
  },
  
  actions: {
    // Navigate through Swap feature
    goTo({ commit }, value) {
      commit('_goTo', value)
    },

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
    _goTo: (state, value) => {
      Object.keys(state.step).forEach((s) => {
        s == String(value) ? state.step[s] = true : state.step[s] = false
      });
    },

    _setToken: (state, value) => {
      state.swap[value.tokenRef] = value.token
    },

    _switchTokens: (state) => {
      [state.swap.token1, state.swap.token2] = [state.swap.token2, state.swap.token1]
    },

    _resetTokens: (state) => {
      state.swap = {}
    }
  },

  modules: {
    // ------------------------------------------------------------------------
    // Everything Related to Swapper Component --------------------------------
    // to map this functions to components you must add:
    // ...mapGetters('exchange/swapper', ['functionName, ...'])
    // then to call the function in the component: this.functionName()
    // ------------------------------------------------------------------------
    swapper: {
      namespaced: true,

      state: {},
  
      getters: {},

      actions: {},

      mutations: {}
    }
  }
}