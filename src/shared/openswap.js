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
      var totalUnclaimedRewards = ethers.BigNumber.from("0");
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
            const signer = provider.getSigner()
            //const address = this.getUserAddress();
//
            const contract = new ethers.Contract("0xd7723Ce2A90E552d264876e4AF72c6D960c58d5B", abi, signer);
            contract
            .collectAll()
 
            this.getAllRewards();
    },
  }
};