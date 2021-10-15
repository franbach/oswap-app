import {pools as local_pools} from "./hmy_local/pools.js"
import {SoloPools as local_spools} from "./hmy_local/pools.js"
import {pools as mainnet_pools} from "./hmy_mainnet/pools.js"
import {SoloPools as mainnet_spools} from "./hmy_mainnet/pools.js"
import {pools as testnet_pools} from "./hmy_testnet/pools.js"
import {SoloPools as testnet_spools} from "./hmy_testnet/pools.js"

export const pools = {
    1: {},
    56: {},
    1666600000: { 
        pools: mainnet_pools,
        SoloPools: mainnet_spools
    },
    1666700000:{ 
        pools: testnet_pools,
        SoloPools: testnet_spools
    },
    1337: { 
        pools: local_pools,
        SoloPools: local_spools
    }
  
};
