import MasterChef from "openswap-core/build/contracts/MasterChef.json";
import { ethers } from "ethers";
import { mapGetters } from 'vuex';
const { Fetcher, ChainId, Trade, TokenAmount, TradeType } = require("openswap-sdk");
const { Pools } = require("../store/modules/farm/pools.js");

export default {
  created: function () {},
  computed: {

  },
  methods: {
    ...mapGetters('wallet', ['getUserSignedIn', 'getUserSignedOut', 'getUserAddress', 'getWallet']),
    ...mapGetters('addressConstants', ['oSWAPMAKER', 'oSWAPCHEF', 'WONE']),
    getOswapPrice: async function () {
        this.balances = [];
        const Oswap = await Fetcher.fetchTokenData(
          ChainId.MAINNET,
          "0xc0431Ddcc0D213Bf27EcEcA8C2362c0d0208c6DC"
        );
        const Busd = await Fetcher.fetchTokenData(
          ChainId.MAINNET,
          "0x0aB43550A6915F9f67d0c454C2E90385E6497EaA"
        );

        const pair = await Fetcher.fetchPairData(Oswap, Busd).catch(error => {
          console.log(error);
          this.error = 1;
          this.errormessage = "Pool Doesn't Exist";
        });
        return pair.token1Price.toSignificant(2);

    },
    getTokenBalance: async function(token){
      const abi = [
        // balanceOf
        {
          constant: true,
          inputs: [{ name: "_owner", type: "address" }],
          name: "balanceOf",
          outputs: [{ name: "balance", type: "uint256" }],
          type: "function"
        },
        // decimals
        {
          constant: true,
          inputs: [],
          name: "decimals",
          outputs: [{ name: "", type: "uint8" }],
          type: "function"
        }
      ];
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const userAddress = this.getUserAddress();

      if (token.oneZeroxAddress == this.WONE()) {
        const balance = await provider.getBalance(userAddress);

        let unformatedbalance = ethers.utils.formatUnits(balance.toString(), token.decimals).toString();
        let formatedbalance = (unformatedbalance / 1).toFixed(5)

        return formatedbalance;
      } else {
        const contract = new ethers.Contract(token.oneZeroxAddress, abi, provider)
        const balance = await contract
            .balanceOf(userAddress)
        let unformatedbalance = ethers.utils.formatUnits(balance.toString(), token.decimals).toString();
        let formatedbalance = (unformatedbalance / 1).toFixed(5)

        return formatedbalance;
      }
    

    },
    getAllRewards: async function () {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const address = this.getUserAddress();
      if (address != "0x0000000000000000000000000000000000000003") {
        var i = 0, n;
        var totalUnclaimedRewards = ethers.BigNumber.from("0");

        const abi = MasterChef.abi;
        const masterChef = this.oSWAPCHEF();
        const contract = new ethers.Contract(masterChef, abi, provider)

        for (n in Pools) {

          //what does this do? 
          // I was stupid enough to fuck up a Farm with an invalid address so it skips it.
          if (i == 8) {
            i++;
          }

          const pending = await contract
            .pendingSushi(i, address).catch(error => {
              console.log(error);
              this.error = 1;
              this.errormessage = "Error getting reward amount.";
            });
        
          const pendingsushi = ethers.BigNumber.from(pending);
          totalUnclaimedRewards =
            totalUnclaimedRewards.add(pendingsushi);

          i++;
        }
        this.unclaimedTotal = ethers.utils.formatUnits(totalUnclaimedRewards.toString(), 18).toString();
      }

      await this.getSingleRewards();
    },
    getSingleRewards: async function(){
      var totalUnclaimedRewards = ethers.BigNumber.from("0");
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const address = this.getUserAddress();
      const abi = MasterChef.abi;
      const masterChef = this.oSWAPCHEF();
      const contract = new ethers.Contract(masterChef, abi, provider);
      const i = 11;
      const pending = await contract.pendingSushi(i, address).catch(error => {
        console.log(error);
        this.error = 1;
        this.errormessage = "Error getting reward amount.";
      });;
      const pendingsushi = ethers.BigNumber.from(pending);
      totalUnclaimedRewards = totalUnclaimedRewards.add(pendingsushi);
    },
    collectAll: async function(){
      
        
        let abi = [
              {
                "inputs": [],
                "name": "masterchef",
                "outputs": [
                  {
                    "internalType": "contract IMASTERCHEF",
                    "name": "",
                    "type": "address"
                  }
                ],
                "stateMutability": "view",
                "type": "function",
                "constant": true
              },
              {
                "inputs": [],
                "name": "collectAll",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
              }
            ]



            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            // This is the collector contract that call the extWithdraw in masterchef. loops through and collects all pools
            const contract = new ethers.Contract("0xd7723Ce2A90E552d264876e4AF72c6D960c58d5B", abi, signer);
            contract
            .collectAll();
 
            this.getAllRewards();
    },
    //----------------------------------------SDK------------------------------------------
    getPair: async function(token0, token1){
      const Token0 = await Fetcher.fetchTokenData(
      ChainId.MAINNET,
      token0.oneZeroxAddress
    );
    const Token1 = await Fetcher.fetchTokenData(
      ChainId.MAINNET,
      token1.oneZeroxAddress
    );
    const pair = await Fetcher.fetchPairData(Token0, Token1).catch(error => {
      console.log(error);
      //do error stuffs if pair doesnt exist
      
    });
    return pair;
    },
    getReserves: function(pair, token1) {
      let reserves = [];
      if (
        pair["tokenAmounts"][0].currency.address != token1.oneZeroxAddress
      ) {
        reserves[1] = ethers.utils.commify(pair.reserve0.toFixed(2));
        reserves[0] = ethers.utils.commify(pair.reserve1.toFixed(2));
      } else {
        reserves[0] = ethers.utils.commify(pair.reserve0.toFixed(2));

        reserves[1] = ethers.utils.commify(pair.reserve1.toFixed(2));
      }

      return reserves;
    },
    getBestRoute: async function(parsedAmount, token0, token1) {

      const [
      Token0,
      Token1,
      TokenX,
      TokenY,
      TokenZ] = await Promise.all([
        Fetcher.fetchTokenData(
                ChainId.MAINNET,
                token0.oneZeroxAddress
                ),
        Fetcher.fetchTokenData(
                ChainId.MAINNET,
                token1.oneZeroxAddress
                ),
        Fetcher.fetchTokenData(
                ChainId.MAINNET,
                "0xcF664087a5bB0237a0BAd6742852ec6c8d69A27a"
                ),
        Fetcher.fetchTokenData(
                ChainId.MAINNET,
                "0xc0431Ddcc0D213Bf27EcEcA8C2362c0d0208c6DC"
                ),
        Fetcher.fetchTokenData(
                ChainId.MAINNET,
                "0xE176EBE47d621b984a73036B9DA5d834411ef734"
                )
      ]);

      const pairTHATEXISTS = await Fetcher.fetchPairData(TokenZ, TokenY)

      const [
             pair01,
             paira,
             pairab,
             pairc,
             paircd,
             paire,
             pairef
            ] = await Promise.all([
              Fetcher.fetchPairData(Token0, Token1).catch(() => {
                      return pairTHATEXISTS
              }), 
              Fetcher.fetchPairData(Token0, TokenX).catch(() => {
                      return pairTHATEXISTS
              }),
              Fetcher.fetchPairData(TokenX, Token1).catch(() => {
                      return pairTHATEXISTS
              }),
              Fetcher.fetchPairData(Token0, TokenY).catch(() => {
                      return pairTHATEXISTS
              }),
              Fetcher.fetchPairData(TokenY, Token1).catch(() => {
                      return pairTHATEXISTS
              }),
              Fetcher.fetchPairData(Token0, TokenZ).catch(() => {
                      return pairTHATEXISTS
              }),
              Fetcher.fetchPairData(TokenZ, Token1).catch(() => {
                      return pairTHATEXISTS
              })
            ]);

      const bestRoute = await Trade.bestTradeExactIn([paira,pairab,pairc,paircd,paire,pairef,pair01, pairTHATEXISTS],new TokenAmount(Token0, parsedAmount), Token1)

   
      console.log(bestRoute)
      var i = 0;
      var path = [];
      while(bestRoute[0].route.path.length > i){
        console.log(i)
        path.push(bestRoute[0].route.path[i].address)
        i++
      }
      console.log(path)
      //this.$emit("Path", path);
      console.log(bestRoute[0])
      return bestRoute[0]
      


    },
    getTrade: async function(route, amount, token0){
       const Token0 = await Fetcher.fetchTokenData(
        ChainId.MAINNET,
        token0.oneZeroxAddress
      );
      const trade = new Trade(
        route,
        new TokenAmount(Token0, amount),
        TradeType.EXACT_INPUT
      );
      return trade;
    },
    //----------------------------------------Utils------------------------------------------
    getUnits: function(amount, token){
      console.log(amount)
      let parsedunits = ethers.utils.parseUnits(amount, token.decimals);
      console.log(parsedunits)
      return parsedunits;
    }
  }
};