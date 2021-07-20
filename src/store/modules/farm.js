export default {
  namespaced: true,

  state: {
    buttons: {
      approve: {
        disabled: true,
        active: false,
        finished: false,
        executing: false 
      },
      stake: {
        disabled: true,
        active: false,
        finished: false,
        executing: false 
      },
      unstake: {
        disabled: true,
        active: false,
        finished: false,
        executing: false 
      }
    }
  },

  getters: {
    getBtnState: (state) => (value) => {
      // Grabs the button name passed in as argument
      let btn = Object.keys(value)[0];
      // Grabs the desired button state passed in as argument
      let btnState = value[btn];

      return state.buttons[btn][btnState];
    },
  },

  actions: {
    setBtnState({ commit }, value) {
      commit('_setBtnState', value)
    },

    resetButton({ commit }, value) {
      commit('_resetButton', value)
    }
  },

  mutations: {
    _resetButton: (state, button) => {
      Object.keys(state.buttons[button]).forEach((s) => {
        s == 'disabled' ? 
          state.buttons[button][s] = true :
          state.buttons[button][s] = false
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
      Object.keys(state.buttons[btn]).forEach((s) => {
        s == String(btnState) ? 
          state.buttons[btn][s] = true :
          state.buttons[btn][s] = false
      })
    }
  }
}