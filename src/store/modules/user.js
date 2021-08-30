export default {
  namespaced: true,

  state: {
		colorTheme: null,
		isScrolled: false
  },
	getters: {
		getColorTheme: (state) => {
			return state.colorTheme;
		},
		getIsScrolled: (state) => {
			return state.isScrolled;
		},
		getDarkMode: (state) => {
			if (state.colorTheme == 'dark') {
				return true;
			} else { 
				return false
			}
		}
	},
	actions: {
		setTheme({ commit }, value) {
			commit('_setTheme', value);
		},
		setIsScrolled({ commit }, value) {
			commit('_setIsScrolled', value);
		},
		switchTheme({ commit }) {
			commit('_switchTheme');
		}
	},
  mutations: {
		_setTheme(state, value) {
			state.colorTheme = value;
		},
		_switchTheme(state) {
			if (state.colorTheme == 'dark') { 
				state.colorTheme = 'light' 
				localStorage.setItem("oSwap\_theme", state.colorTheme);
			} else if (state.colorTheme == 'light') { 
				state.colorTheme = 'dark' 
				localStorage.setItem("oSwap\_theme", state.colorTheme);
			};
		},
		_setIsScrolled(state, value) {
			state.isScrolled = value;
		}
  },
};