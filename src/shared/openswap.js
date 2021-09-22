import MasterChef from "openswap-core/build/contracts/MasterChef.json";
import IUniswapV2Router02 from "openswap-core/build/contracts/IUniswapV2Router02.json";
import SushiMaker from "openswap-core/build/contracts/SushiMaker.json";
import IERC20 from "openswap-core/build/contracts/IERC20.json";

import { ethers } from "ethers";

import { Harmony } from '@harmony-js/core';
import { ChainType } from '@harmony-js/utils'
import oneWallet from './OneWallet.js'

const hmy = new Harmony(
  // let's assume we deploy smart contract to this end-point URL
  'https://api.s0.t.hmny.io',
  {
    chainType: ChainType.Harmony,
    chainId: 1,
  },
);
import { mapGetters, mapActions } from 'vuex';
const { Route, Price, Token, Fetcher, ChainId, Trade, TokenAmount, TradeType, Percent} = require("openswap-sdk");
const { Pools } = require("../store/modules/farm/pools.js");

import { toastMe } from '@/components/toaster/toaster.js';

export default {
  created: function () {},
  computed: {

  },
  methods: {
    ...mapGetters('wallet', ['getUserSignedIn', 'getUserSignedOut', 'getUserAddress', 'getWallet', 'getWalletType']),
    ...mapGetters('addressConstants', ['oSWAPMAKER', 'oSWAPCHEF', 'WONE', 'UNIROUTERV2','oSWAPTOKEN']),
    ...mapActions('exchange/swapper', ['setBtnState']),
    ...mapActions('liquidity/buttons', ['setBtnState']),
    getProvider: function(call){
      if(this.getUserSignedIn() == true && this.getWalletType() == 'metamask' && call == undefined){
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        return provider
      }
      if(call){
        const provider = new ethers.providers.JsonRpcProvider("https://api.harmony.one", {chainId: 1666600000, name: "Harmony"})
        return provider
      }
      else{
        const provider =  new ethers.providers.JsonRpcProvider("https://api.harmony.one", {chainId: 1666600000, name: "Harmony"})
        return provider
      }
    },
    addTokenToMetamask: async function(token) {
      const tokenAddress = token.oneZeroxAddress;
      var tokenSymbol = token.Symbol;
      if(tokenAddress == this.WONE()){
        tokenSymbol = "WONE";
      }
      
      const tokenDecimals = token.decimals;
      const tokenImage = token.imgSrc;

      const res = await window.ethereum.request({
        method: "wallet_watchAsset",
        params: {
          type: "ERC20", // Initially only supports ERC20, but eventually more!
          options: {
            address: tokenAddress, // The address that the token is at.
            symbol: tokenSymbol, // A ticker symbol or shorthand, up to 5 chars.
            decimals: tokenDecimals, // The number of decimals in the token
            image: tokenImage // A string url of the token logo
          }
        }
      });
      console.log(res);
      },
    getOswapPrice: async function () {
        this.balances = [];
        const Oswap = new Token(
          ChainId.MAINNET,
          "0xc0431Ddcc0D213Bf27EcEcA8C2362c0d0208c6DC",
          18
        );
        const Busd = new Token(
          ChainId.MAINNET,
          "0x0aB43550A6915F9f67d0c454C2E90385E6497EaA",
          18
        );

        const pair = await Fetcher.fetchPairData(Oswap, Busd).catch(error => {
          console.log(error);
          this.error = 1;
          this.errormessage = "Pool Doesn't Exist";
        });
        return pair.token1Price.toSignificant(4);

    },
    getOneBalance: async function(){
        const provider = this.getProvider(true)
        const userAddress = this.getUserAddress();
        const balance = await provider.getBalance(userAddress);
        return balance
    },
    getETHTokenBalance: async function(token, address){
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
      const provider = new ethers.providers.InfuraProvider('mainnet',
      '998f0142cce3485ba1cb3c4e9d9990ab')
      const userAddress = address

      if (token.ethAddress == "0x00eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee") {
        const balance = await provider.getBalance(userAddress);

        let formatedbalance = ethers.utils.formatUnits(balance.toString(), token.decimals).toString();
        

        return formatedbalance;
      } else {
        const contract = new ethers.Contract(token.ethAddress, abi, provider)
        const balance = await contract
            .balanceOf(userAddress)
        let formatedbalance = ethers.utils.formatUnits(balance.toString(), token.decimals).toString();
        

        return formatedbalance;
      }
    

    },
    getBSCTokenBalance: async function(token, address){
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
      const provider = new ethers.providers.JsonRpcProvider("https://bsc-dataseed.binance.org/", {chainId: 56, name: "Binance"})
      const userAddress = address
      
      if (token.bscAddress == "0x00eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee") {
        const balance = await provider.getBalance(userAddress);

        let formatedbalance = ethers.utils.formatUnits(balance.toString(), token.decimals).toString();
        

        return formatedbalance;
      } else {
        const contract = new ethers.Contract(token.bscAddress, abi, provider)
        const balance = await contract
            .balanceOf(userAddress)
        let formatedbalance = ethers.utils.formatUnits(balance.toString(), token.decimals).toString();
        

        return formatedbalance;
      }
    

    },
    getHMYTokenBalance: async function(token){
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
      const provider = new ethers.providers.JsonRpcProvider("https://api.s0.t.hmny.io", {chainId: 1666600000, name: "Binance"})
      const userAddress = this.getUserAddress();

      if (token.oneZeroxAddress == this.WONE()) {
        const balance = await provider.getBalance(userAddress);

        let formatedbalance = ethers.utils.formatUnits(balance.toString(), token.decimals).toString();
        

        return formatedbalance;
      } else {
        const contract = new ethers.Contract(token.oneZeroxAddress, abi, provider)
        const balance = await contract
            .balanceOf(userAddress)
        let formatedbalance = ethers.utils.formatUnits(balance.toString(), token.decimals).toString();
        

        return formatedbalance;
      }
    

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
      const provider = this.getProvider(true)
      const userAddress = this.getUserAddress();

      if (token.oneZeroxAddress == this.WONE()) {
        const balance = await provider.getBalance(userAddress);

        let formatedbalance = ethers.utils.formatUnits(balance.toString(), token.decimals).toString();
        

        return formatedbalance;
      } else {
        const contract = new ethers.Contract(token.oneZeroxAddress, abi, provider)
        const balance = await contract
            .balanceOf(userAddress)
        let formatedbalance = ethers.utils.formatUnits(balance.toString(), token.decimals).toString();
        

        return formatedbalance;
      }
    

    },
    getAllRewards: async function () {
      const provider = this.getProvider(true)
      const address = this.getUserAddress();
      if (address != "0x0000000000000000000000000000000000000003") {
        var i = 0, n;
        var totalUnclaimedRewards = ethers.BigNumber.from("0");

        const abi = MasterChef.abi;
        const masterChef = this.oSWAPCHEF();
        const contract = new ethers.Contract(masterChef, abi, provider);

        for (n in Pools) {
          const pending = await contract
            .pendingSushi(parseInt(Pools[n].pid), address).catch(error => {
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
      let unclaimedFormatted = ethers.utils.formatUnits(this.unclaimedTotal.toString()).toString();
      return unclaimedFormatted;
      
    },
    getSingleRewards: async function(){
      var totalUnclaimedRewards = ethers.BigNumber.from("0");
      const provider = this.getProvider(true)
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
      this.unclaimedTotal = totalUnclaimedRewards.add(pendingsushi);
    },
    collectAll: async function(){
      
        let isDefaultWallet = this.checkSignedIn()
            if (isDefaultWallet){
              toastMe('error', {
                title: 'ERROR',
                msg: `Not Signed In`,
                link: false,
                href: ''
                })
              return 1
        }
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


          if(this.getWalletType() == 'metamask'){
            
              
              
            
            const provider = this.getProvider()
            const signer = provider.getSigner();
            // This is the collector contract that call the extWithdraw in masterchef. loops through and collects all pools
            const contract = new ethers.Contract("0xb1aD583BE88365B8031C7B4aA630411C59638d9A", abi, signer);
            const tx = await contract.collectAll().catch(err => {

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
            let transaction = tx.hash
            let explorer = 'https://explorer.harmony.one/#/tx/'
              toastMe('info', {
                title: 'Transaction Sent',
                msg: "Collect All Sent to network. waiting for confirmation",
                link: false,
                href: `${explorer}${transaction}`
              })
              
              await tx.wait(1)
              toastMe('success', {
                title: 'Tx Succesfull',
                msg: "Explore : " + transaction,
                link: true,
                href: `${explorer}${transaction}`
              })
          }
          if(this.getWalletType() == 'oneWallet'){
            let options = { gasPrice: "0x3B9ACA00" };
            const unattachedContract = hmy.contracts.createContract(abi,"0xd7723Ce2A90E552d264876e4AF72c6D960c58d5B");
            let wallet = new oneWallet()
            await wallet.signin()
            let contract = wallet.attachToContract(unattachedContract)
            //const gas = await contract.methods.collectAll().estimateGas(options).catch();
            //console.log(gas)
            options = {
              gasPrice: 1000000000,
              gasLimit: 2000000
              };
            var tx = await contract.methods.collectAll().send(options)
            if(tx.transaction.txStatus == 'CONFIRMED'){
              let transaction = tx.transaction.id
            let explorer = 'https://explorer.harmony.one/#/tx/'
               toastMe('success', {
                title: 'Tx Succesfull',
                msg: "Explore : " + transaction,
                link: true,
                href: `${explorer}${transaction}`
              })
            }
            
          }
          this.getAllRewards();

          return tx;
    },
    collectOSWAP: async function(pool){
      let isDefaultWallet = this.checkSignedIn()
      if (isDefaultWallet){
        toastMe('error', {
          title: 'ERROR',
          msg: `Not Signed In`,
          link: false,
          href: ''
          })
        return 1
      }
      const abi = MasterChef.abi
      const masterChef = this.oSWAPCHEF();
      const pid = parseInt(pool.pid)

      if(this.getWalletType() == 'metamask'){
        const provider = this.getProvider()
        const signer = provider.getSigner();
        const contract = new ethers.Contract(masterChef, abi, signer);
        
        const tx = await contract.withdraw(pid, '0').catch(err => {

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
          msg: "Collect request sent to network. Waiting for confirmation",
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
      }
      if(this.getWalletType() == 'oneWallet'){
            let options = { gasPrice: "0x3B9ACA00" };
            const unattachedContract = hmy.contracts.createContract(abi, masterChef);
            let wallet = new oneWallet()
            await wallet.signin()
            let contract = wallet.attachToContract(unattachedContract)
            //const gas = await contract.methods.withdraw(pid, '0').estimateGas(options).catch();
            //console.log(gas)
            options = {
              gasPrice: 1000000000,
              gasLimit: 700000
              };
            var tx = await contract.methods.withdraw(pid, '0').send(options)
            if(tx.transaction.txStatus == 'CONFIRMED'){
              let transaction = tx.transaction.id
            let explorer = 'https://explorer.harmony.one/#/tx/'
               toastMe('success', {
                title: 'Tx Succesfull',
                msg: "Explore : " + transaction,
                link: true,
                href: `${explorer}${transaction}`
              })
            }
            
          
      }

    },
    unstakeLP: async function(pool, amount){
      let isDefaultWallet = this.checkSignedIn()
      if (isDefaultWallet){
        toastMe('error', {
          title: 'ERROR',
          msg: `Not Signed In`,
          link: false,
          href: ''
          })
        return 1
      }
      const abi = MasterChef.abi
      const masterChef = this.oSWAPCHEF();
      const pid = parseInt(pool.pid)
      let tempToken = {decimals: 18};
      amount = this.getUnits(amount, tempToken)


      if(this.getWalletType() == 'metamask'){
      const provider = this.getProvider()
      const signer = provider.getSigner();
      const contract = new ethers.Contract(masterChef, abi, signer);
      const tx = await contract.withdraw(pid, amount).catch(err => {

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
        msg: "Collect request sent to network. Waiting for confirmation",
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
    }
      if(this.getWalletType() == 'oneWallet'){
            let options = { gasPrice: "0x3B9ACA00" };
            const unattachedContract = hmy.contracts.createContract(abi, masterChef);
            let wallet = new oneWallet()
            await wallet.signin()
            let contract = wallet.attachToContract(unattachedContract)
            //const gas = await contract.methods.withdraw(pid, '0').estimateGas(options).catch();
            //console.log(gas)
            options = {
              gasPrice: 1000000000,
              gasLimit: 700000
              };
            var tx = await contract.methods.withdraw(pid, amount.toString()).send(options)
            if(tx.transaction.txStatus == 'CONFIRMED'){
              let transaction = tx.transaction.id
            let explorer = 'https://explorer.harmony.one/#/tx/'
               toastMe('success', {
                title: 'Tx Succesfull',
                msg: "Explore : " + transaction,
                link: true,
                href: `${explorer}${transaction}`
              })
            }
          }

    },
    approveSpending: async function(token1, contractAddr){
      let isDefaultWallet = this.checkSignedIn()
      if (isDefaultWallet){
        toastMe('error', {
          title: 'ERROR',
          msg: `Not Signed In`,
          link: false,
          href: ''
          })
        return 1
      }
      //biggest wei denomination
      const wei =
          ethers.BigNumber.from("115792089237316195423570985008687907853269984665640564039457584007913129639935");
      const abi = IERC20.abi;
      if(this.getWalletType() == 'metamask'){
        
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const address = this.getUserAddress();
        

        const contract = new ethers.Contract(token1.oneZeroxAddress, abi, signer);

        const tx = await contract.approve(contractAddr, wei).catch( error => {
          throw error
        })
        let explorer = 'https://explorer.harmony.one/#/tx/'
        let transaction = tx.hash

        toastMe('info', {
          title: 'Transaction Sent',
          msg: "Approval Sent to network. Waiting for confirmation",
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
      }
      if(this.getWalletType() == 'oneWallet'){
            let options = { gasPrice: "0x3B9ACA00" };
            const unattachedContract = hmy.contracts.createContract(abi, token1.oneZeroxAddress);
            let wallet = new oneWallet()
            await wallet.signin()
            let contract = wallet.attachToContract(unattachedContract)
            //const gas = await contract.methods.withdraw(pid, '0').estimateGas(options).catch();
            //console.log(gas)
            options = {
              gasPrice: 1000000000,
              gasLimit: 700000
              };
            var tx = await contract.methods.approve(contractAddr, wei.toString()).send(options)
            if(tx.transaction.txStatus == 'CONFIRMED'){
              let transaction = tx.transaction.id
            let explorer = 'https://explorer.harmony.one/#/tx/'
               toastMe('success', {
                title: 'Tx Succesfull',
                msg: "Explore : " + transaction,
                link: true,
                href: `${explorer}${transaction}`
              })
            
              
            }
          
      }
    },
    checkAllowance: async function(token1, contractAddr){
      const provider = this.getProvider(true)
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
    burnPool: async function(pool){
      
      const abi = SushiMaker.abi;
      if(this.getWalletType() == 'metamask'){
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
      
      }
      if(this.getWalletType() == 'oneWallet'){
        let options = { gasPrice: "0x3B9ACA00" };
        const unattachedContract = hmy.contracts.createContract(abi, this.oSWAPMAKER());
        let wallet = new oneWallet()
        await wallet.signin()
        let contract = wallet.attachToContract(unattachedContract)
        //const gas = await contract.methods.withdraw(pid, '0').estimateGas(options).catch();
        //console.log(gas)
        options = {
          gasPrice: 1000000000,
          gasLimit: 700000
          };
        var tx = await contract.methods.convert(pool.token0address, pool.token1address).send(options)
        if(tx.transaction.txStatus == 'CONFIRMED'){
          let transaction = tx.transaction.id
          let explorer = 'https://explorer.harmony.one/#/tx/'
           toastMe('success', {
            title: 'Tx Succesfull',
            msg: "Explore : " + transaction,
            link: true,
            href: `${explorer}${transaction}`
          })
        }
      }
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
      throw error 
    });
    return pair;
    },
    getPairAsToken: async function(token0, token1){
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

    let token = {}
    token.oneZeroxAddress = pair["liquidityToken"].address
    token.decimals = 18
    return token;
    },
    getRate: function(pair, token1) {
      let rate = [];
      if (
        pair["tokenAmounts"][0].currency.address != token1.oneZeroxAddress
      ) {
        rate = pair.token1Price.toFixed(8);
      } else {
        rate = pair.token0Price.toFixed(8);
      }

      return rate;
    },
    getReserves: function(pair, token1) {
      let reserves = [];
      if (
        pair["tokenAmounts"][0].currency.address != token1.oneZeroxAddress
      ) {
        reserves[1] = ethers.utils.commify(pair.reserve0.toFixed(6));
        reserves[0] = ethers.utils.commify(pair.reserve1.toFixed(6));
      } else {
        reserves[0] = ethers.utils.commify(pair.reserve0.toFixed(6));
        reserves[1] = ethers.utils.commify(pair.reserve1.toFixed(6));
      }
      return reserves;
    },
    getLiquidityValueSolo: async function(pool, staked){
      let token0 = {oneZeroxAddress : pool.token0address} 
      let token1 = {oneZeroxAddress : "0x0aB43550A6915F9f67d0c454C2E90385E6497EaA"} //BUSD
      const pair = await this.getPair(token1, token0)
      let rate = this.getRate(pair, token0)
      return parseFloat(rate * this.getEthUnits(staked.toString())).toFixed(5)
    },
    
      getLiquidityValue: async function(pool, tt0sBN, tt1sBN){
      let is0Stable = this.isStablecoin(pool.token0address)
      let is1Stable = this.isStablecoin(pool.token1address)
      
      let tt0s = parseFloat(this.getFormatedUnitsDecimals(tt0sBN.toString(), pool.decimals[0]))
      let tt1s = parseFloat(this.getFormatedUnitsDecimals(tt1sBN.toString(), pool.decimals[1]))
      if(is0Stable == true ){
        return [ethers.utils.commify(parseFloat(tt0s).toFixed(2) * 2), parseFloat(tt0s).toFixed(2) *2];
      }
       
      if(is1Stable == true){
        return [ethers.utils.commify(parseFloat(tt1s).toFixed(2) * 2), parseFloat(tt1s).toFixed(2) * 2];
      }else{
        var Token0 = {oneZeroxAddress: pool.token0address} 
        let Token1 = {oneZeroxAddress: "0x0aB43550A6915F9f67d0c454C2E90385E6497EaA"}
        let wei = ethers.utils.parseUnits('1', 18)
        var route = await this.getBestRouteFarms(wei, Token0, Token1);
        
        
        return  [ethers.utils.commify(parseFloat(route.route.midPrice.toFixed(8)  * tt0s * 2).toFixed(2)) ,
          parseFloat(route.route.midPrice.toFixed(8)  * tt0s).toFixed(8) * 2]
      }
    },
    getBestRoute: async function(parsedAmount, token0, token1) {

      const [
      Token0,
      Token1,
      TokenX,
      TokenY,
      TokenZ,
      EUSDC,
      BUSDC] = await Promise.all([
        Fetcher.fetchTokenData(
                ChainId.MAINNET,
                token0.oneZeroxAddress
                ),
        Fetcher.fetchTokenData(
                ChainId.MAINNET,
                token1.oneZeroxAddress
                ),
        new Token(
                ChainId.MAINNET,
                "0xcF664087a5bB0237a0BAd6742852ec6c8d69A27a",
                18
                ),
        new Token(
                ChainId.MAINNET,
                "0xc0431Ddcc0D213Bf27EcEcA8C2362c0d0208c6DC",
                18
                ),
        new Token(
                ChainId.MAINNET,
                "0xE176EBE47d621b984a73036B9DA5d834411ef734",
                18
                ),
        new Token(
                ChainId.MAINNET,
                "0x985458E523dB3d53125813eD68c274899e9DfAb4", //eusdc
                6
                ),
        new Token(
                ChainId.MAINNET,
                "0x44cED87b9F1492Bf2DCf5c16004832569f7f6cBa", //busdc
                18
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
             pairef,
             pairfg,
             pairgh,pairij
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
              }),
              Fetcher.fetchPairData(Token1, EUSDC).catch(() => {
                      return pairTHATEXISTS
              }),
              Fetcher.fetchPairData(BUSDC, EUSDC).catch(() => {
                      return pairTHATEXISTS
              }),
              Fetcher.fetchPairData(EUSDC, BUSDC).catch(() => {
                      return pairTHATEXISTS
              })
            ]);

      const bestRoute = await Trade.bestTradeExactIn([paira,pairab,pairc,paircd,paire,pairef, pairgh, pairij,pairfg,pair01, pairTHATEXISTS],new TokenAmount(Token0, parsedAmount), Token1)

      return bestRoute[0]
    },
    getBestRouteFarms: async function(parsedAmount, token0, token1) {

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
        new Token(
                ChainId.MAINNET,
                "0xcF664087a5bB0237a0BAd6742852ec6c8d69A27a",
                18
                ),
        new Token(
                ChainId.MAINNET,
                "0xc0431Ddcc0D213Bf27EcEcA8C2362c0d0208c6DC",
                18
                ),
        new Token(
                ChainId.MAINNET,
                "0xE176EBE47d621b984a73036B9DA5d834411ef734",
                18
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
    getOswapPerBlock: async function(){
      const provider = this.getProvider(true)
      const abi = MasterChef.abi;
      const contract = new ethers.Contract(this.oSWAPCHEF(), abi, provider);

      const oswapPerBlock = await contract.sushiPerBlock();
      const allocPoints = await contract.totalAllocPoint();

      const blocksPerWeek = ethers.BigNumber.from(String(604800 / 2))
      let rewardsPerWeek = oswapPerBlock.div(allocPoints).mul(blocksPerWeek)
      
      return ethers.utils.formatUnits(rewardsPerWeek.toString(), 18).toString()

    },
    
    getRewardValue: async function(pool, poolWeight) {
      //onst BN = require("bn.js");
      const token0 = new Token(
        ChainId.MAINNET,
        this.oSWAPTOKEN(),
        18
      );
      const token1 = new Token(
        ChainId.MAINNET,
        "0x0aB43550A6915F9f67d0c454C2E90385E6497EaA", //BUSD
        18
      );

      
      const pair = await Fetcher.fetchPairData(token0, token1);
      const price = parseFloat(pair.token1Price.toFixed(4));
      
      const aWeekly = await this.getOswapPerBlock();
      const aMonthly = aWeekly * 4;

    
      var weekly = ((price * aWeekly * poolWeight) / 100).toFixed(2)
      var monthly = ((price * aMonthly * poolWeight) / 100).toFixed(2)
  
      if (pool.pid == "0" || pool.pid == "1" || pool.pid == "13"  || pool.pid == "14" || pool.pid == "15") {
        weekly = String(weekly * 3);
        monthly = String(monthly * 3);
      }
      if (pool.pid == "12" ) {
        weekly = String(weekly * 2);
        monthly = String(monthly * 2);
      }
     
      return [weekly.substring(0, 10), monthly.substring(0, 10)];
    },
    getTokenAmounts: async function(pool, LPsupply, staked, totalStaked) {
      
      const [
        token0,
        token1,
        tokenLP,
       ] = await Promise.all([
         Fetcher.fetchTokenData(ChainId.MAINNET, pool.token0address),
         Fetcher.fetchTokenData(ChainId.MAINNET, pool.token1address),
         Fetcher.fetchTokenData(ChainId.MAINNET, pool.pairaddress)
       ]);

      

      const supply = new TokenAmount(tokenLP, LPsupply);
      const liquidity = new TokenAmount(tokenLP, staked);
      const Tliquidity = new TokenAmount(
        tokenLP,
        totalStaked
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


      return [token0Pstaked, token1Pstaked, token0Tstaked, token1Tstaked, value0, value1, tvalue0, tvalue1]
    },
    getAmountsLiquidity: async function(pair, token0, token1, amount){
      
      const Token0 = await Fetcher.fetchTokenData(
        ChainId.MAINNET,
        token0.oneZeroxAddress
      );
      const route = new Route([pair], Token0);
      const price = Price.fromRoute(route);
      const amountin = ethers.BigNumber.from(this.getUnits(amount, token0))

      const amountOut = price
        .quote(new TokenAmount(Token0, amountin.toString()))
        .toFixed(token1.decimals);
        return amountOut


    },
    //----------------------------------------Swap-------------------------------------------
    swapETHForExactTokens: async function(amountIn, amountOutMin, path, token1){
      let isDefaultWallet = this.checkSignedIn()
      if (isDefaultWallet){
        toastMe('error', {
          title: 'ERROR',
          msg: `Not Signed In`,
          link: false,
          href: ''
          })
        return 1
      }
      const value = ethers.utils.parseEther(amountIn)
      const deadline = this.getDeadline()
      const amountOutParsed = this.getUnits(amountOutMin, token1)
      const address = this.getUserAddress();
      const abi = IUniswapV2Router02.abi;


      if(this.getWalletType() == 'metamask'){
      let valueOveride = {
        value: value
      }

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(this.UNIROUTERV2(), abi, signer);
      const tx = await contract.swapETHForExactTokens(amountOutParsed, path, address, deadline, valueOveride).catch(err => {

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
        this.setBtnState({swap: 'swap'});
        return
      })


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
      }
      if(this.getWalletType() == 'oneWallet'){
        let options = { gasPrice: "0x3B9ACA00" };
        const unattachedContract = hmy.contracts.createContract(abi, this.UNIROUTERV2());
        let wallet = new oneWallet()
        await wallet.signin()
        let contract = wallet.attachToContract(unattachedContract)
        //const gas = await contract.methods.withdraw(pid, '0').estimateGas(options).catch();
        //console.log(gas)
        options = {
          gasPrice: 1000000000,
          gasLimit: 3000000,
          value: String(value)
          };
        var tx = await contract.methods.swapETHForExactTokens(amountOutParsed.toString(), path, address, deadline).send(options)
        if(tx.transaction.txStatus == 'CONFIRMED'){
          let transaction = tx.transaction.id
          let explorer = 'https://explorer.harmony.one/#/tx/'
           toastMe('success', {
            title: 'Tx Succesfull',
            msg: "Explore : " + transaction,
            link: true,
            href: `${explorer}${transaction}`
          })
        }
      }

    },
    swapTokensForExactETH: async function(amountIn, amountOutMin, path, token0){
      let isDefaultWallet = this.checkSignedIn()
      if (isDefaultWallet){
        toastMe('error', {
          title: 'ERROR',
          msg: `Not Signed In`,
          link: false,
          href: ''
          })
        return 1
      }
      let deadline = this.getDeadline()
      let amoutInParsed = this.getUnits(amountIn, token0)
      let amountOutParsed = ethers.utils.parseEther(amountOutMin)
      const address = this.getUserAddress();
      const abi = IUniswapV2Router02.abi;

      if(this.getWalletType() == 'metamask'){
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(this.UNIROUTERV2(), abi, signer);
      const tx = await contract.swapTokensForExactETH(amountOutParsed, amoutInParsed, path, address, deadline).catch(err => {

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
        this.setBtnState({swap: 'swap'});
        return
      })


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
      }
      if(this.getWalletType() == 'oneWallet'){
        let options = { gasPrice: "0x3B9ACA00" };
        const unattachedContract = hmy.contracts.createContract(abi, this.UNIROUTERV2());
        let wallet = new oneWallet()
        await wallet.signin()
        let contract = wallet.attachToContract(unattachedContract)
        //const gas = await contract.methods.withdraw(pid, '0').estimateGas(options).catch();
        //console.log(gas)
        options = {
          gasPrice: 1000000000,
          gasLimit: 3000000
          };
        var tx = await contract.methods.swapTokensForExactETH(amountOutParsed.toString(), amoutInParsed.toString(), path, address, deadline).send(options)
        if(tx.transaction.txStatus == 'CONFIRMED'){
          let transaction = tx.transaction.id
          let explorer = 'https://explorer.harmony.one/#/tx/'
           toastMe('success', {
            title: 'Tx Succesfull',
            msg: "Explore : " + transaction,
            link: true,
            href: `${explorer}${transaction}`
          })
        }
      }

    },
    swapExactTokensForTokens: async function(amountIn, amountOutMin, path, token0, token1){
      let isDefaultWallet = this.checkSignedIn()
      if (isDefaultWallet){
        toastMe('error', {
          title: 'ERROR',
          msg: `Not Signed In`,
          link: false,
          href: ''
          })
        return 1
      }
      let deadline = this.getDeadline()
      let amoutInParsed = this.getUnits(amountIn, token0)
      let amountOutParsed = this.getUnits(amountOutMin, token1)
      const address = this.getUserAddress();
      const abi = IUniswapV2Router02.abi;

      if(this.getWalletType() == 'metamask'){

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      const contract = new ethers.Contract(this.UNIROUTERV2(), abi, signer);

      const tx = await contract.swapExactTokensForTokens(amoutInParsed, amountOutParsed, path, address, deadline).catch(err => {

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
        this.setBtnState({swap: 'swap'});
        return
      })

      
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
      }
      if(this.getWalletType() == 'oneWallet'){
        let options = { gasPrice: "0x3B9ACA00" };
        const unattachedContract = hmy.contracts.createContract(abi, this.UNIROUTERV2());
        let wallet = new oneWallet()
        await wallet.signin()
        let contract = wallet.attachToContract(unattachedContract)
        //const gas = await contract.methods.withdraw(pid, '0').estimateGas(options).catch();
        //console.log(gas)
        options = {
          gasPrice: 1000000000,
          gasLimit: 3000000
          };
        var tx = await contract.methods.swapExactTokensForTokens(amoutInParsed.toString(), amountOutParsed.toString(), path, address, deadline).send(options)
        if(tx.transaction.txStatus == 'CONFIRMED'){
          let transaction = tx.transaction.id
          let explorer = 'https://explorer.harmony.one/#/tx/'
           toastMe('success', {
            title: 'Tx Succesfull',
            msg: "Explore : " + transaction,
            link: true,
            href: `${explorer}${transaction}`
          })
        }
      }
    },
    stakeLP: async function(pool,amount){
      let isDefaultWallet = this.checkSignedIn()
      if (isDefaultWallet){
        toastMe('error', {
          title: 'ERROR',
          msg: `Not Signed In`,
          link: false,
          href: ''
          })
        return 1
      }
      const abi = MasterChef.abi
      const masterChef = this.oSWAPCHEF();
      const pid = parseInt(pool.pid)
      let tempToken = {decimals: 18};
      amount = this.getUnits(amount, tempToken)

      if(this.getWalletType() == 'metamask'){
      
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(masterChef, abi, signer);
      const tx = await contract.deposit(pid, amount).catch(err => {
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
        msg: "Stake request sent to network. Waiting for confirmation",
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
      }
      if(this.getWalletType() == 'oneWallet'){
        let options = { gasPrice: "0x3B9ACA00" };
        const unattachedContract = hmy.contracts.createContract(abi, masterChef);
        let wallet = new oneWallet()
        await wallet.signin()
        let contract = wallet.attachToContract(unattachedContract)
        //const gas = await contract.methods.withdraw(pid, '0').estimateGas(options).catch();
        //console.log(gas)
        options = {
          gasPrice: 1000000000,
          gasLimit: 3000000
          };
        var tx = await contract.methods.deposit(pid, amount.toString()).send(options)
        if(tx.transaction.txStatus == 'CONFIRMED'){
          let transaction = tx.transaction.id
          let explorer = 'https://explorer.harmony.one/#/tx/'
           toastMe('success', {
            title: 'Tx Succesfull',
            msg: "Explore : " + transaction,
            link: true,
            href: `${explorer}${transaction}`
          })
        }
      }
      
    },
    //----------------------------------------Liquidity--------------------------------------
    removeLiquidityParse: async function(token0, token1, amount0, slippage){
      if(token0.Symbol == 'ONE'){
        await this.removeLiquidityETH(token1, amount0)
      }
      if(token1.Symbol == 'ONE'){
        await this.removeLiquidityETH(token0, amount0)
      }
      if(token1.Symbol != 'ONE' && token0.Symbol != 'ONE'){
        await this.removeLiquidityToken(token0, token1, amount0);
      }
    },
    removeLiquidityETH: async function(token0, amount){
      let isDefaultWallet = this.checkSignedIn()
      if (isDefaultWallet){
        toastMe('error', {
          title: 'ERROR',
          msg: `Not Signed In`,
          link: false,
          href: ''
          })
        return 1
      }
      let tempToken = {decimals: 18};
      let deadline = this.getDeadline();
      amount = this.getUnits(amount, tempToken)
      const address = this.getUserAddress();
      const abi = IUniswapV2Router02.abi;

      if(this.getWalletType() == 'metamask'){
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(this.UNIROUTERV2(), abi, signer);
      let tx = await contract.removeLiquidityETH(
        token0.oneZeroxAddress,
        amount,
        '10',
        '10', 
        address,
        deadline
      ).catch(err => {
        this.setBtnState({remove: 'remove'})

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
    if(tx !== undefined){
      let explorer = 'https://explorer.harmony.one/#/tx/'
      let transaction = tx.hash

      toastMe('info', {
        title: 'Transaction Sent',
        msg: "Remove Liquidity request sent to network. Waiting for confirmation",
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
      this.setBtnState({remove: 'removed'})
    }
    }
    if(this.getWalletType() == 'oneWallet'){
        let options = { gasPrice: "0x3B9ACA00" };
        const unattachedContract = hmy.contracts.createContract(abi, this.UNIROUTERV2());
        let wallet = new oneWallet()
        await wallet.signin()
        let contract = wallet.attachToContract(unattachedContract)
        //const gas = await contract.methods.withdraw(pid, '0').estimateGas(options).catch();
        //console.log(gas)
        options = {
          gasPrice: 1000000000,
          gasLimit: 3000000
          };
        var tx = await contract.methods.removeLiquidityETH(
                token0.oneZeroxAddress,
                amount.toString(),
                '10',
                '10', 
                address,
                deadline
              ).send(options)
        if(tx.transaction.txStatus == 'CONFIRMED'){
          let transaction = tx.transaction.id
          this.setBtnState({remove: 'removed'})
          let explorer = 'https://explorer.harmony.one/#/tx/'
           toastMe('success', {
            title: 'Tx Succesfull',
            msg: "Explore : " + transaction,
            link: true,
            href: `${explorer}${transaction}`
          })
        }
      }


    },
    removeLiquidityToken: async function(token0, token1, amount){
      let isDefaultWallet = this.checkSignedIn()
      if (isDefaultWallet){
        toastMe('error', {
          title: 'ERROR',
          msg: `Not Signed In`,
          link: false,
          href: ''
          })
        return 1
      }
      const address = this.getUserAddress();
      const abi = IUniswapV2Router02.abi;
      let tempToken = {decimals: 18};
      amount = this.getUnits(amount, tempToken)
      let deadline = this.getDeadline();


      if(this.getWalletType() == 'metamask'){
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(this.UNIROUTERV2(), abi, signer);
      let tx = await contract
      .removeLiquidity(
        token0.oneZeroxAddress,
        token1.oneZeroxAddress,
        amount,
        '10',
        '10',
        address,
        deadline).catch(err => {

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
          this.setBtnState({remove: 'remove'})
          return
        })
        console.log(tx)
        if(tx != undefined){
        let explorer = 'https://explorer.harmony.one/#/tx/'
        let transaction = tx.hash
  
        toastMe('info', {
          title: 'Transaction Sent',
          msg: "Remove liquidity request sent to network. Waiting for confirmation",
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
        this.setBtnState({remove: 'removed'})
      }
      }
      if(this.getWalletType() == 'oneWallet'){
        let options = { gasPrice: "0x3B9ACA00" };
        const unattachedContract = hmy.contracts.createContract(abi, this.UNIROUTERV2());
        let wallet = new oneWallet()
        await wallet.signin()
        let contract = wallet.attachToContract(unattachedContract)
        //const gas = await contract.methods.withdraw(pid, '0').estimateGas(options).catch();
        //console.log(gas)
        options = {
          gasPrice: 1000000000,
          gasLimit: 3000000
          };
        var tx = await contract.methods.removeLiquidity(
        token0.oneZeroxAddress,
        token1.oneZeroxAddress,
        amount.toString(),
        '10',
        '10',
        address,
        deadline).send(options)
        if(tx.transaction.txStatus == 'CONFIRMED'){
          let transaction = tx.transaction.id
          this.setBtnState({remove: 'removed'})
          let explorer = 'https://explorer.harmony.one/#/tx/'
           toastMe('success', {
            title: 'Tx Succesfull',
            msg: "Explore : " + transaction,
            link: true,
            href: `${explorer}${transaction}`
          })
        }
      }
    },

    addLiquidityParse: async function(token0, token1, amount0, amount1, slippage){
      if(token0.Symbol == 'ONE'){
       await this.addLiquidityETH(token0, token1, amount0, amount1, slippage)
      }
      if(token1.Symbol == 'ONE'){
        await this.addLiquidityETH(token1, token0, amount1,  amount0, slippage)
      }
      if(token1.Symbol != 'ONE' && token0.Symbol != 'ONE'){
        await this.addLiquidityToken(token0, token1, amount0, amount1, slippage);
      }
    },


    addLiquidityETH: async function(token0, token1, amount0, amount1, slippage){
      let isDefaultWallet = this.checkSignedIn()
      if (isDefaultWallet){
        toastMe('error', {
          title: 'ERROR',
          msg: `Not Signed In`,
          link: false,
          href: ''
          })
        return 1
      }
      let amountA = this.getUnits(amount0, token0)
      let valueOveride = {value: amountA}
      const address = this.getUserAddress();
      const abi = IUniswapV2Router02.abi;
      let amountB = this.getUnits(amount1, token1)
      let amountAmin = await this.calculateSlippage(amountA, '90');
      let amountBmin = await this.calculateSlippage(amountB, '90')
      let deadline = this.getDeadline();

      if(this.getWalletType() == 'metamask'){
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(this.UNIROUTERV2(), abi, signer);
      

      const tx = await contract
          .addLiquidityETH(
            token1.oneZeroxAddress,
            amountB,
            amountAmin,
            amountBmin,
            address,
            deadline,
            valueOveride
          ).catch(err => {

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
            this.setBtnState({add: 'add'})
            return
          })
      if(tx != undefined){
      let explorer = 'https://explorer.harmony.one/#/tx/'
      let transaction = tx.hash

      toastMe('info', {
        title: 'Transaction Sent',
        msg: "Collect request sent to network. Waiting for confirmation",
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
      this.setBtnState({add: 'added'})
      }
      }
      if(this.getWalletType() == 'oneWallet'){
        let options = { gasPrice: "0x3B9ACA00" };
        const unattachedContract = hmy.contracts.createContract(abi, this.UNIROUTERV2());
        let wallet = new oneWallet()
        await wallet.signin()
        let contract = wallet.attachToContract(unattachedContract)
        //const gas = await contract.methods.withdraw(pid, '0').estimateGas(options).catch();
        //console.log(gas)
        options = {
          gasPrice: 1000000000,
          gasLimit: 3000000,
          value: amountA.toString()
          };
        var tx = await contract.methods.addLiquidityETH(
            token1.oneZeroxAddress,
            amountB.toString(),
            amountAmin.toString(),
            amountBmin.toString(),
            address,
            deadline).send(options)
        if(tx.transaction.txStatus == 'CONFIRMED'){
          this.setBtnState({add: 'added'})
          let transaction = tx.transaction.id
          this.setBtnState({remove: 'removed'})
          let explorer = 'https://explorer.harmony.one/#/tx/'
           toastMe('success', {
            title: 'Tx Succesfull',
            msg: "Explore : " + transaction,
            link: true,
            href: `${explorer}${transaction}`
          })
        }
      }
    },
    addLiquidityToken: async function(token0, token1, amount0, amount1, slippage){
      let isDefaultWallet = this.checkSignedIn()
      if (isDefaultWallet){
        toastMe('error', {
          title: 'ERROR',
          msg: `Not Signed In`,
          link: false,
          href: ''
          })
        return 1
      }
      const address = this.getUserAddress();
      const abi = IUniswapV2Router02.abi;
      let amountA = this.getUnits(amount0, token0)
      let amountB = this.getUnits(amount1, token1)
      let amountAmin = await this.calculateSlippage(amountA, '90');
      let amountBmin = await this.calculateSlippage(amountB, '90');
      let deadline = this.getDeadline();
      if(this.getWalletType() == 'metamask'){
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(this.UNIROUTERV2(), abi, signer);
      const tx = await contract
        .addLiquidity(
          token0.oneZeroxAddress,
          token1.oneZeroxAddress,
          amountA,
          amountB,
          amountAmin,
          amountBmin,
          address,
          deadline
        ).catch(err => {

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
          this.setBtnState({add: 'add'})
          return
        })
      if(tx !== undefined){
      let explorer = 'https://explorer.harmony.one/#/tx/'
      let transaction = tx.hash

      toastMe('info', {
        title: 'Transaction Sent',
        msg: "Collect request sent to network. Waiting for confirmation",
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
      this.setBtnState({add: 'added'})
      }
      }
      if(this.getWalletType() == 'oneWallet'){
        let options = { gasPrice: "0x3B9ACA00" };
        const unattachedContract = hmy.contracts.createContract(abi, this.UNIROUTERV2());
        let wallet = new oneWallet()
        await wallet.signin()
        let contract = wallet.attachToContract(unattachedContract)
        //const gas = await contract.methods.withdraw(pid, '0').estimateGas(options).catch();
        //console.log(gas)
        options = {
          gasPrice: 1000000000,
          gasLimit: 3000000
          };
        var tx = await contract.methods.addLiquidity(
          token0.oneZeroxAddress,
          token1.oneZeroxAddress,
          amountA.toString(),
          amountB.toString(),
          amountAmin.toString(),
          amountBmin.toString(),
          address,
          deadline).send(options)
        if(tx.transaction.txStatus == 'CONFIRMED'){
          this.setBtnState({add: 'added'})
          let transaction = tx.transaction.id
          this.setBtnState({remove: 'removed'})
          let explorer = 'https://explorer.harmony.one/#/tx/'
           toastMe('success', {
            title: 'Tx Succesfull',
            msg: "Explore : " + transaction,
            link: true,
            href: `${explorer}${transaction}`
          })
        }
      }
    
    },
    calculateSlippage: async function(amount, slippage) {
      slippage = ethers.BigNumber.from(String(parseFloat(slippage) * 10));
      const divider = ethers.BigNumber.from("1000");

      const value = amount.div(divider).mul(slippage);
      const value2 = amount.sub(value);
      return value2;
    },

    //----------------------------------------Utils------------------------------------------
    getDeadline: function(){
      var deadline = new Date();
      deadline = parseInt(deadline / 1000) + 480;
      return deadline;
    },
    checkSignedIn: function(){
      if(this.getUserAddress() == '0x0000000000000000000000000000000000000009'){
        return true
      }else{
        return false;
      }
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
        "0x3C2B8Be99c50593081EAA2A724F0B8285F5aba8f", //eUSDT
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
                      .toFixed(token2.Decimals);
      
      return amountOut;

    },
    getAmountInWithSlippage: async function(amount, bestRoute, token1, token2){

      let parsedAmount = this.getUnits(amount, token1);
      const provider = this.getProvider(true)
      const address = this.getUserAddress();
      let path = this.getPath(bestRoute)
      const abi = IUniswapV2Router02.abi;
      console.log(path)
      const contract = new ethers.Contract(this.UNIROUTERV2(), abi, provider);
      let allowance = await contract.getAmountsIn(parsedAmount, path)
      console.log(allowance.toString())
      let amountIn = this.getFormatedUnits(allowance[0].toString(), token2)
      return amountIn;


    },
    getBN: function(amount){
      const bn = ethers.BigNumber.from(amount);
      return bn
    },
    getUnits: function(amount, token){
      let parsedunits = ethers.utils.parseUnits(amount, token.decimals);
      return parsedunits;
    },
    getUnitsD: function(amount, decimals){
      let parsedunits = ethers.utils.parseUnits(String(amount), decimals);
      return parsedunits;
    },
    getFormatedUnits: function(amount, token){
      let parsedunits = ethers.utils.formatUnits(amount, token.decimals);
      return parsedunits;
    },
    getFormatedUnitsDecimals: function(amount, decimals){
      let parsedunits = ethers.utils.formatUnits(amount, decimals);
      return parsedunits;
    },
    getEthUnits: function(amount){
      let parsedunits = ethers.utils.formatEther(amount);
      return parsedunits;
    },
    getBurnAndTotalSupply: async function() {
      
      const oSWAPToken = this.oSWAPTOKEN();
      const burnAddress = "0xdEad000000000000000000000000000000000000";
      const lockedAddress = "0x8c4245b6096EE6e3C7266f4289233E93B24f0b2d";

      const abi = [
         // balanceOf
         {
          constant: true,
          inputs: [{ name: "_owner", type: "address" }],
          name: "balanceOf",
          outputs: [{ name: "balance", type: "uint256" }],
          type: "function"
        },
        //Total supply
        {
          constant: true,
          inputs: [],
          name: "totalSupply",
          outputs: [{ name: "", type: "uint256" }],
          type: "function"
        }
      ];
      
      const provider = new ethers.getDefaultProvider('https://api.harmony.one');
      const contract = new ethers.Contract(oSWAPToken, abi, provider);

      //Get Burned Balance
      let burnBalance = await contract
        .balanceOf(burnAddress);
      let burnBalanceUnformated = ethers.utils.formatUnits(burnBalance.toString()).toString();
      let burnBalanceFormated = (burnBalanceUnformated / 1).toFixed(2);

      //Get Supply Balance
      let lockedBalance = await contract
      .balanceOf(lockedAddress);

       //Get Total Supply
       let totalSupply = await contract.totalSupply();

       let circSupply = totalSupply
       circSupply = circSupply.sub(lockedBalance).sub(burnBalance);
     
       circSupply = ethers.utils.formatUnits(circSupply.toString()).toString();
       let circSupplyFormated = (circSupply / 1).toFixed(2);

       totalSupply = ethers.utils.formatUnits(totalSupply.toString()).toString();
       totalSupply = (totalSupply / 1).toFixed(2);
       let devLock = parseFloat(ethers.utils.formatUnits(lockedBalance.toString()).toString()).toFixed(2);

       return {
         circSupply: circSupplyFormated,
         totalSupply: totalSupply,
         devLocked: devLock,
         burnedAmount: burnBalanceFormated
       }

    }
  }
};