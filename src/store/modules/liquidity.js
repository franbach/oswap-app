export default {
  namespaced: true,
  state: {},
  getters: {},
  actions: {},
  mutations: {},

  modules: {
    // Buttons State management for liquidity
    buttons: {
      namespaced: true,
      state: {
        step: {
          settokens: true,
          selectmodal: false,
          addremoveliquidity: false
        },
        approve: {
          disabled: true,
          approve: false,
          approved: false,
          approving: false,
        },
        add: {
          disabled: true,
          add: false,
          added: false,
          adding: false 
        },
        remove: {
          disabled: true,
          remove: false,
          removed: false,
          removing: false 
        },
      },
      getters: {
        // get current step state
        getStepState: (state) => (step) => {
          return state.step[step]
        },

        getBtnState: (state) => (value) => {
          // Grabs the button name passed in as argument
          let btn = Object.keys(value)[0];
          // Grabs the desired button state passed in as argument
          let btnState = value[btn];

          return state[btn][btnState];
        }
      },
      actions: {
        // Navigate through Liquidity feature
        goTo({ commit }, value) {
          commit('_goTo', value)
        },

        setBtnState({ commit }, value) {
          commit('_setBtnState', value)
        },

        resetButton({ commit }, value) {
          commit('_resetButton', value)
        }
      },
      mutations: {
        _goTo: (state, value) => {
          Object.keys(state.step).forEach((s) => {
            s == String(value) ? state.step[s] = true : state.step[s] = false
          })
        },
        _setBtnState: (state, value) => {
          // Grabs the button name passed in as argument
          let btn = Object.keys(value)[0];
          // Grabs the desired button state passed in as argument
          let btnState = value[btn];
          
          // Iterates over the desired button state and check
          // if the state argument matches so it can be changed to true.
          // All other button states should be false, we cannot have more than
          // one true state per button.
          Object.keys(state[btn]).forEach((s) => {
            s == String(btnState) ? 
              state[btn][s] = true :
              state[btn][s] = false
          })
        },
        _resetButton: (state, button) => {
          Object.keys(state[button]).forEach((s) => {
            s == 'disabled' ? 
              state[button][s] = true :
              state[button][s] = false
          })
        },
      }
    }
  }

}