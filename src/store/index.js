import { createStore } from 'vuex';
import exchange from './modules/exchange'

export default createStore({
  modules: {
    // State Management Exchange
    exchange
  }
});