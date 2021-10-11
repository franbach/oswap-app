import {bsctokens as mainnet_bsc} from "./hmy_mainnet/bscTokens.js"
import {ethtokens as mainnet_eth} from "./hmy_mainnet/ethTokens.js"
import {hmytokens as mainnet_hmy} from "./hmy_mainnet/hmyTokens.js"
import {polytokens as mainnet_poly} from "./hmy_mainnet/polyTokens.js"
import {terratokens as mainnet_terra} from "./hmy_mainnet/terraTokens.js"

import {bsctokens as testnet_bsc} from "./hmy_testnet/bscTokens.js"
import {ethtokens as testnet_eth} from "./hmy_testnet/ethTokens.js"
import {hmytokens as testnet_hmy} from "./hmy_testnet/hmyTokens.js"

import {bsctokens as local_bsc} from "./hmy_local/bscTokens.js"
import {ethtokens as local_eth} from "./hmy_local/ethTokens.js"
import {hmytokens as local_hmy} from "./hmy_local/hmyTokens.js"

export const tokens = {
	bsctokens: {
		1: {},
		56: {},
		1666600000: mainnet_bsc,
		1666700000:testnet_bsc,
		1337: local_bsc
	},
	ethtokens: {
		1: {},
		56: {},
		1666600000:mainnet_eth,
		1666700000: testnet_eth,
		1337:local_eth
	},
	hmytokens: {
		1: {},
		56: {},
		1666600000:mainnet_hmy,
		1666700000: testnet_hmy,
		1337: local_hmy
	},
	terratokens: {
		1: {},
		56: {},
		1666600000: mainnet_terra,
		1666700000:{},
		1337:{}
	},
	polytokens: {
		1: {},
		56: {},
		1666600000: mainnet_poly,
		1666700000:{},
		1337:{}
	}
  
};