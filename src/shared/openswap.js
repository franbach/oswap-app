import store from "../store/modules/wallet.js";
import MasterChef from "openswap-core/build/contracts/MasterChef.json";
import { ethers } from "ethers";

const { Fetcher, ChainId } = require("openswap-sdk");
const { Pools } = require("../store/modules/farm/pools.js");

export default {
    created: function () { 
    },
    methods:{     
        getOswapPrice: async function() {
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
            this.oswapPrice = pair.token1Price.toSignificant(2);
        },
        getSingleRewards: async function(){
            var totalUnclaimedRewards = 0;
            const abi = MasterChef.abi;
            const wallet = store.state.wallet;
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const masterChef = store.state.MasterChef;
            const contract = new ethers.Contract(masterChef, abi, provider);
            const i = 11;
    
              const pending = await contract
                .pendingSushi(i, store.state.address[0])
                .call();
              const pendingsushi = wallet.utils.fromWei(pending, "ether");
              totalUnclaimedRewards =
                totalUnclaimedRewards + parseFloat((pendingsushi / 1).toFixed(4));
              this.unclaimedTotal = this.unclaimedTotal + totalUnclaimedRewards
        },
        collectSingles:async function(){
          const abi = MasterChef.abi;
          const wallet = store.state.wallet;
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const masterChef = store.state.MasterChef;
          const contract = new ethers.Contract(masterChef, abi, provider);
          const i = 11
          const pending = await contract
              .pendingSushi(i, store.state.address[0])
              .call();
            const pendingsushi = wallet.utils.fromWei(pending, "ether");
            if ((pendingsushi / 1).toFixed(4) > 0) {
              contract
                .withdraw(i, "0")
                .send({
                  from: store.state.address[0],
                  gasPrice: "1000000000",
                  gas: "200000"
                })
                .on("error", (error, receipt) => {
                  // receipt example
                  console.log(error);
                  console.log(receipt);
    
                })
                .catch(err => {
                  console.log(err);
                });
            }
    
        }, 
        getAllRewards: async function() {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const address = store.state.address[0];
          if(provider && address != "0x0000000000000000000000000000000000000003"){
              var i = 0,
            n;
          var totalUnclaimedRewards = 0;
    
          const abi = MasterChef.abi;
          const wallet = store.state.wallet;
          const masterChef = store.state.MasterChef;
          const contract = new ethers.Contract(masterChef, abi, provider);
          var i = 1;
    
          for (n in Pools) {
            
            //what does this do?
            if (i == 8) {
              i++;
            }
    
            const pending = await contract
              .pendingSushi(i, address);
            const pendingsushi = wallet.utils.fromWei(pending, "ether");
            totalUnclaimedRewards =
              totalUnclaimedRewards + parseFloat((pendingsushi / 1).toFixed(4));
    
            i++;
          }
          this.unclaimedTotal = totalUnclaimedRewards;
    
          await this.getSingleRewards();
          return n;
          }
          
        },
        collectAll: async function() {
          var i = 0,
            n;
          await this.collectSingles();
          const abi = MasterChef.abi;
          const wallet = store.state.wallet;
          const masterChef = store.state.MasterChef;
          const provider = new ethers.providers.Web3Provider(window.ethereum);
    
          for (n in Pools) {
            const contract = new ethers.Contract(masterChef, abi, provider);
            if (i == 8) {
              i++;
            }
    
            const pending = await contract
              .pendingSushi(i, store.state.address[0])
              .call();
            const pendingsushi = wallet.utils.fromWei(pending, "ether");
            if ((pendingsushi / 1).toFixed(4) > 0) {
              contract
                .withdraw(i, "0")
                .send({
                  from: store.state.address[0],
                  gasPrice: "1000000000",
                  gas: "200000"
                })
                .on("error", (error, receipt) => {
                  // receipt example
                  console.log(error);
    
                  console.log(receipt);
                  this.txhash = receipt.transactionHash;
                  this.txlink = store.state.explorer + this.txhash;
                  this.tradesuccesful = false;
                })
                .catch(err => {
                  console.log(err);
                });
            }
    
            i++;
          }
    
          this.getAllRewards();
          return n;
        }
  }
};