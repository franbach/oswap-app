import MasterChef from "openswap-core/build/contracts/MasterChef.json";
import { ethers } from "ethers";
import { mapGetters } from 'vuex';
const { Fetcher, ChainId } = require("openswap-sdk");
const { Pools } = require("../store/modules/farm/pools.js");

export default {
  created: function () {},
  computed: {

  },
  methods: {
    ...mapGetters('wallet', ['getUserSignedIn', 'getUserSignedOut', 'getUserAddress', 'getWallet']),
    ...mapGetters('addressConstants', ['oSWAPMAKER', 'oSWAPCHEF']),
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
    getAllRewards: async function () {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const address = this.getUserAddress();
      console.log("addr : " + address)
      if (address != "0x0000000000000000000000000000000000000003") {
        var i = 0, n;
        var totalUnclaimedRewards = ethers.BigNumber.from("0");

        const abi = MasterChef.abi;
        const masterChef = this.oSWAPCHEF();
        const contract = new ethers.Contract(masterChef, abi, provider);

        for (n in Pools) {

          //what does this do? 
          // I was stupid enough to fuck up a Farm with an invalid address so it skips it.
          if (i == 8) {
            i++;
          }

          const pending = await contract
            .pendingSushi(i, address);
          console.log(pending);
          const pendingsushi = ethers.BigNumber.from(pending);
          totalUnclaimedRewards =
            totalUnclaimedRewards.add(pendingsushi);

          i++;
        }
        this.unclaimedTotal = ethers.utils.formatUnits(totalUnclaimedRewards.toString(), 18).toString();

        await this.getSingleRewards();
      }

    },
    getSingleRewards: async function(){
      var totalUnclaimedRewards = 0;
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const address = this.getUserAddress();
      const abi = MasterChef.abi;
      const masterChef = this.oSWAPCHEF();
      const contract = new ethers.Contract(masterChef, abi, provider);
      const i = 11;
      const pending = await contract.pendingSushi(i, address);
      const pendingsushi = ethers.BigNumber.from(pending);
      totalUnclaimedRewards = totalUnclaimedRewards.add(pendingsushi);
    },
    collectAll: async function () {
      var i = 0,
        n;
      //await this.collectSingles();
      const abi = MasterChef.abi;
      const address = this.getUserAddress();
      const masterChef = this.oSWAPCHEF();
      const wallet = this.getWallet();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(masterChef, abi, provider);
      for (n in Pools) {
        if (i == 8) {
          i++;
        }

        const pending = await contract
        .pendingSushi(i, address);

          const pendingsushi = ethers.BigNumber.from(pending);
        if (pendingsushi > 0) {
         // const withdraw = await contract.withdraw(i, "0");

            // .send({
            //   from: address,
            //   gasPrice: "1000000000",
            //   gas: "200000"
            // })
            // .on("error", (error, receipt) => {
            //   // receipt example
            //   console.log(error);

            //   console.log(receipt);
            //   this.txhash = receipt.transactionHash;
            //   //this.txlink = store.state.explorer + this.txhash;
            //   this.tradesuccesful = false;
            // })
            // .catch(err => {
            //   console.log(err);
            // });
        }

        i++;
      }

      this.getAllRewards();
      return n;
    }
  }
};