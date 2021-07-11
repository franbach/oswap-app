import MasterChef from "openswap-core/build/contracts/MasterChef.json";
import IUniswapV2Router02 from "openswap-core/build/contracts/IUniswapV2Router02.json";
import SushiMaker from "openswap-core/build/contracts/SushiMaker.json";
import IERC20 from "openswap-core/build/contracts/IERC20.json";

import { ethers } from "ethers";
import { mapGetters } from 'vuex';
const { Fetcher, ChainId, Trade, TokenAmount, TradeType, Percent} = require("openswap-sdk");
const { Pools } = require("../store/modules/farm/pools.js");

import { toastMe } from '@/components/toaster/toaster.js'

export default {
  created: function () {},
  computed: {

  },
  methods: {
    ...mapGetters('wallet', ['getUserSignedIn', 'getUserSignedOut', 'getUserAddress', 'getWallet']),
    ...mapGetters('addressConstants', ['oSWAPMAKER', 'oSWAPCHEF', 'WONE', 'UNIROUTERV2','oSWAPTOKEN']),
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
            const tx = await contract
            .collectAll();
            
            this.getAllRewards();
            return tx;
    },
    approveSpending: async function(token1, contractAddr){
      //biggest wei denomination
      const wei =
        ethers.BigNumber.from("115792089237316195423570985008687907853269984665640564039457584007913129639935");

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const address = this.getUserAddress();
      const abi = IERC20.abi;

      const contract = new ethers.Contract(token1.oneZeroxAddress, abi, signer);

      const tx = await contract.approve(contractAddr, wei)
      return tx;
    },
    checkAllowance: async function(token1, amount, contractAddr){
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const address = this.getUserAddress();
      const abi = IERC20.abi;
      const contract = new ethers.Contract(token1.oneZeroxAddress, abi, provider);
      let allowance = contract.allowance(address, contractAddr)
      return allowance;
    },
    burnAll: async function(){
      var i = 0,
        n;
       let token0arr = []
       let token1arr = []
      for (n in Pools) {
        
        token0arr.push(Pools[n].token0address)
        token1arr.push(Pools[n].token1address)
        i++
      }

      const abi = SushiMaker.abi;
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(this.oSWAPMAKER(), abi, signer);

      

      const tx = await contract.convertMultiple(token0arr, token1arr).catch(err => {
        toastMe('error', {
          title: 'Error :',
          msg: err.data.message,
          link: false
        })
        return
      })

      let explorer = 'https://explorer.harmony.one/#/tx/'
      let transaction = tx.hash

      toastMe('info', {
        title: 'Transaction Sent',
        msg: "Burn request sent to network. Waiting for confirmation",
        link: false,
        href: `${explorer}${transaction}`
      })
      await tx.wait(1)
      toastMe('success', {
        title: 'Tx Successful',
        msg: "Explore : " + transaction,
        link: true,
        href: `${explorer}${transaction}`
      })
      return
        
      
    },
    burnPool: async function(pool){
  
      const abi = SushiMaker.abi;
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(this.oSWAPMAKER(), abi, signer);

      

      const tx = await contract.convert(pool.token0address, pool.token1address).catch(err => {
        var message;
        if(!err.data?.message){
          message = err.message
        }else{
          message = err.data.message
        }
        toastMe('error', {
          title: 'Error :',
          msg: message,
          link: false
        })
        return
      })

      let explorer = 'https://explorer.harmony.one/#/tx/'
      let transaction = tx.hash

      toastMe('info', {
        title: 'Transaction Sent',
        msg: "Burn request sent to network. Waiting for confirmation",
        link: false,
        href: `${explorer}${transaction}`
      })
      await tx.wait(1)
      toastMe('success', {
        title: 'Tx Successful',
        msg: "Explore : " + transaction,
        link: true,
        href: `${explorer}${transaction}`
      })
      return

        
      
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
    });
    return pair;
    },
    getRate: function(pair, token1) {
      let rate = [];
      if (
        pair["tokenAmounts"][0].currency.address != token1.oneZeroxAddress
      ) {
        rate = pair.token1Price.toFixed(5);
      } else {
        rate = pair.token0Price.toFixed(5);
      }

      return rate;
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
    getLiquidityValue: async function(pool, tt0s, tt1s){
      let is0Stable = this.isStablecoin(pool.token0address)
      let is1Stable = this.isStablecoin(pool.token1address)
 
      if(is0Stable == true ){
        return ethers.utils.commify(parseFloat(tt0s).toFixed(2) * 2);
      }
       
      if(is1Stable == true){
        return ethers.utils.commify(parseFloat(tt1s).toFixed(2) * 2);
      }else{
        var Token0 = {oneZeroxAddress: pool.token0address} 
        let Token1 = {oneZeroxAddress: "0x0aB43550A6915F9f67d0c454C2E90385E6497EaA"}
        let wei = ethers.utils.parseUnits('1', 18)
        var route = await this.getBestRoute(wei, Token0, Token1);
        
        
        return  ethers.utils.commify(parseFloat(route.route.midPrice.toFixed(4)  * tt0s).toFixed())
      }
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

      return bestRoute[0]
    },
    getPath: function(bestRoute){
      var i = 0;
      var path = [];
      while(bestRoute.route.path.length > i){
        console.log(i)
        path.push(bestRoute.route.path[i].address)
        i++
      }
      return path;
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
    getRewardValue: async function(pool, poolWeight) {
      //onst BN = require("bn.js");
      const token0 = await Fetcher.fetchTokenData(
        ChainId.MAINNET,
        this.oSWAPTOKEN()
      );
      const token1 = await Fetcher.fetchTokenData(
        ChainId.MAINNET,
        "0x0aB43550A6915F9f67d0c454C2E90385E6497EaA" //BUSD
      );
      const pair = await Fetcher.fetchPairData(token0, token1);
      const price = parseFloat(pair.token1Price.toFixed(4));
      
      const aWeekly = 8851;
      const aMonthly = 35404;

    
      var weekly = ((price * aWeekly * poolWeight) / 100).toFixed(4);
      var monthly = ((price * aMonthly * poolWeight) / 100).toFixed(4);

      if (pool.pid == "0" || pool.pid == "1" || pool.pid == "13"  || pool.pid == "14" || pool.pid == "15") {
        weekly = weekly * 3;
        monthly = monthly * 3;
      }
      if (pool.pid == "12" ) {
        weekly = weekly * 2;
        monthly = monthly * 2;
      }

      return [parseFloat(weekly).toFixed(6), parseFloat(monthly).toFixed(6)];
    },
    getTokenAmounts: async function(pool, LPsupply, staked, totalStaked) {
      

      let tempToken = {decimals: 18};

      const token0 = await Fetcher.fetchTokenData(ChainId.MAINNET, pool.token0address);
      const token1 = await Fetcher.fetchTokenData(ChainId.MAINNET, pool.token1address);
      const tokenLP = await Fetcher.fetchTokenData(
        ChainId.MAINNET,
        pool.pairaddress
      );
      
      const supply = new TokenAmount(tokenLP, this.getUnits(LPsupply, tempToken));
      const liquidity = new TokenAmount(tokenLP, this.getUnits(staked, tempToken));
      const Tliquidity = new TokenAmount(
        tokenLP,
        this.getUnits(totalStaked, tempToken)
      );
     

      const pair = await Fetcher.fetchPairData(token0, token1);
      const value0 = await pair.getLiquidityValue(token0, supply, liquidity);
      const token0Pstaked = ethers.utils.commify(value0.toFixed(4));
      const value1 = await pair.getLiquidityValue(token1, supply, liquidity);
      const token1Pstaked = ethers.utils.commify(value1.toFixed(4));
      
      
      const tvalue0 = await pair.getLiquidityValue(token0, supply, Tliquidity);
      const token0Tstaked = ethers.utils.commify(tvalue0.toFixed(4));
      const tvalue1 = await pair.getLiquidityValue(token1, supply, Tliquidity);
      const token1Tstaked = ethers.utils.commify(tvalue1.toFixed(4));


      return [token0Pstaked, token1Pstaked, token0Tstaked, token1Tstaked, tvalue0, tvalue1]
    },
    //----------------------------------------Swap-------------------------------------------
    swapETHForExactTokens: async function(amountIn, amountOutMin, path, token1){
      
      let deadline = this.getDeadline()
      let valueOveride = {
        value: ethers.utils.parseEther(amountIn)
      }

      let amountOutParsed = this.getUnits(amountOutMin, token1)

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const address = this.getUserAddress();
      const abi = IUniswapV2Router02.abi;

      const contract = new ethers.Contract(this.UNIROUTERV2(), abi, signer);
      const tx = await contract.swapETHForExactTokens(amountOutParsed, path, address, deadline, valueOveride)

      let explorer = 'https://explorer.harmony.one/#/tx/'
      let transaction = tx.hash
      toastMe('info', {
        title: 'Transaction Sent',
        msg: "Swap sent to network. Waiting for confirmation",
        link: false,
        href: `${explorer}${transactionswapETHForExactTokens}`
      })
      await tx.wait(1)
      toastMe('success', {
        title: 'Tx Successful',
        msg: "Explore : " + transaction,
        link: true,
        href: `${explorer}${transaction}`
      })

    },
    swapTokensForExactETH: async function(amountIn, amountOutMin, path, token0){
      let deadline = this.getDeadline()
      let amoutInParsed = this.getUnits(amountIn, token0)
      let amountOutParsed = ethers.utils.parseEther(amountOutMin)

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const address = this.getUserAddress();
      const abi = IUniswapV2Router02.abi;
      const contract = new ethers.Contract(this.UNIROUTERV2(), abi, signer);

      const tx = await contract.swapTokensForExactETH(amountOutParsed, amoutInParsed, path, address, deadline)

      let explorer = 'https://explorer.harmony.one/#/tx/'
      let transaction = tx.hash
      toastMe('info', {
        title: 'Transaction Sent',
        msg: "Swap sent to network. Waiting for confirmation",
        link: false,
        href: `${explorer}${transaction}`
      })
      await tx.wait(1)
      toastMe('success', {
        title: 'Tx Successful',
        msg: "Explore : " + transaction,
        link: true,
        href: `${explorer}${transaction}`
      })

    },
    swapExactTokensForTokens: async function(amountIn, amountOutMin, path, token0, token1){
      let deadline = this.getDeadline()
      let amoutInParsed = this.getUnits(amountIn, token0)
      let amountOutParsed = this.getUnits(amountOutMin, token1)

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const address = this.getUserAddress();
      const abi = IUniswapV2Router02.abi;
      const contract = new ethers.Contract(this.UNIROUTERV2(), abi, signer);

      const tx = await contract.swapExactTokensForTokens(amoutInParsed, amountOutParsed, path, address, deadline)
      
      let explorer = 'https://explorer.harmony.one/#/tx/'
      let transaction = tx.hash
      toastMe('info', {
        title: 'Transaction Sent',
        msg: "Swap sent to network. Waiting for confirmation",
        link: false,
        href: `${explorer}${transaction}`
      })
      await tx.wait(1)
      toastMe('success', {
        title: 'Tx Successful',
        msg: "Explore : " + transaction,
        link: true,
        href: `${explorer}${transaction}`
      })
    },
    //----------------------------------------Utils------------------------------------------
    getDeadline: function(){
      var deadline = new Date();
      deadline = parseInt(deadline / 1000) + 480;
      return deadline;
    },
    getStakeWeight: function(staked, totalStaked) {
      if (staked != 0) {
        var poolWeight = ((staked / totalStaked) * 100).toFixed(4);
      } else {
        var poolWeight = 0;
      }
      return poolWeight
    },
    isStablecoin: function(tokenAddress){
      var stablecoins = [
        "0x0aB43550A6915F9f67d0c454C2E90385E6497EaA", //bBUSD
        "0x9A89d0e1b051640C6704Dde4dF881f73ADFEf39a", //bUSDT
        "0x44cED87b9F1492Bf2DCf5c16004832569f7f6cBa", //bUSDC
        "0xE176EBE47d621b984a73036B9DA5d834411ef734", //eBUSD
        "0x985458E523dB3d53125813eD68c274899e9DfAb4", //eUSDC
        "0x3C2B8Be99c50593081EAA2A724F0B8285F5aba8f" //eUSDT
      ]
      for(let i in stablecoins){
        if(stablecoins[i] == tokenAddress){
          return true;
        }
      }
      return false;
    },
    getAmountOutWithSlippage: async function(amount, bestRoute, slippageRate, token1, token2){

      let parsedAmount = this.getUnits(amount, token1);
      let Token0 = await Fetcher.fetchTokenData(
        ChainId.MAINNET,
        token1.oneZeroxAddress
        )
      const trade = new Trade(
        bestRoute.route,
        new TokenAmount(Token0, parsedAmount),
        TradeType.EXACT_INPUT
      );

      let slippageTolerence = new Percent(String(parseFloat(slippageRate)*10), "1000");
      let amountOut = trade
                      .minimumAmountOut(slippageTolerence)
                      .toSignificant(token2.decimals);
      
      return amountOut;

    },
    getUnits: function(amount, token){
      let parsedunits = ethers.utils.parseUnits(amount, token.decimals);
      return parsedunits;
    }
  }
};