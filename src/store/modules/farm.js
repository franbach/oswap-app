import openswap from "@/shared/openswap.js";
export default {
  namespaced: true,
  modules: {
    farmData: {
      namespaced: true,
      state: {
        farmData: {},
        soloData: {},
        customData: {}
      },
      getters: {
        // get current step state
        getFarmData: (state) => {
          return state.farmData
        },
        getPoolData: (state, pid) => {
          return state.farmData[pid]
        },
        getSoloData: (state) => {
          return state.soloData
        }
      },
      actions: {
        setFarmDataState({ commit }, value) {
          commit('_setFarmDataState', value)
        },
        setSoloDataState({ commit }, value) {
          commit('_setSoloDataState', value)
        },
        setCustomDataState({ commit }, value) {
          commit('_setCustomDataState', value)
        },
        setPoolDataState({ commit }, value) {
          commit('_setPoolDataState', value)
        },
        setToken1Amount({ commit }, value) {
          commit('_setToken1Amount', value)
        }
      },
      mutations: {
        _setFarmDataState: (state, value) => {
          state.farmData = value
        },
        _setSoloDataState: (state, value) => {
          state.soloData = value
        },
        _setCustomDataState: (state, value) => {
          state.customData = value
        },
        _setPoolDataState: (state, value) => {
          state.farmData[value.i] = value.data
        },
        _setToken1Amount: (state, value) => {
          state.token1 = value
        }

      }
    }
  },
  mixins: [openswap]
}