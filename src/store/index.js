import { createStore } from 'vuex';
import exchange from './modules/exchange'
import wallet from './modules/wallet'
import addressConstants from './modules/addressConstants'

export default createStore({
  modules: {
    // State Management Exchange
    exchange,
    wallet,
    addressConstants
  }
});