import { createStore } from 'vuex';
import exchange from './modules/exchange';
import liquidity from './modules/liquidity';
import farm from './modules/farm';
import wallet from './modules/wallet';
import addressConstants from './modules/addressConstants';

export default createStore({
  modules: {
    exchange,
    liquidity,
    farm,
    wallet,
    addressConstants
  }
});