<template>
  <header class="max-w-screen-xl mx-auto flex justify-between h-14 py-9 xl:px-0 px-3 items-center">
    <img alt="OpenSwap" src="../assets/oswap_logo.png" class="h-12">
    <!-- Navigation Start -->
    <div class="flex items-center space-x-2 text-gray-500">

      <router-link to="/" class="flex items-center space-x-2 p-2 px-3 rounded-lg group focus:outline-none focus:ring-1 focus:ring-black focus:ring-opacity-20">
        <i class="las la-random text-xl group-hover:text-oswapGreen dark:text-oswapGreen"></i>
        <p class="text-sm group-hover:text-oswapBlue-light dark:text-oswapGreen">Exchange</p>
      </router-link>

      <router-link to="/liquidity" class="flex items-center space-x-2 p-2 px-3 rounded-lg group focus:outline-none focus:ring-1 focus:ring-black focus:ring-opacity-20">
        <i class="las la-tint text-xl group-hover:text-oswapGreen dark:text-oswapGreen"></i>
        <p class="text-sm group-hover:text-oswapBlue-light dark:text-oswapGreen">Liquidity</p>
      </router-link>

      <router-link to="/farm" class="flex items-center space-x-2 p-2 px-3 rounded-lg group focus:outline-none focus:ring-1 focus:ring-black focus:ring-opacity-20">
        <i class="las la-tractor text-xl group-hover:text-oswapGreen dark:text-oswapGreen"></i>
        <p class="text-sm group-hover:text-oswapBlue-light dark:text-oswapGreen">Farm</p>
      </router-link>

      <!-- Menu 'More' (dropdown) -->
      <MoreButton />

      <!-- Oswap token info -->
      <div class="flex items-center space-x-2 p-2 px-3 rounded-lg cursor-pointer focus:outline-none focus:ring-1 focus:ring-black">
        <img alt="Oswap Info" src="../assets/oswap_asset.png" class="h-6">
        <p class="text-xs dark:text-oswapGreen">${{oswapPrice}}</p>
      </div>

      <!-- Wallet Button  -->
      <Wallet @click="connectWallet()" :connected="walletConnected"/>

    </div>
    <!-- Navigation End -->
  </header>
</template>

<script>
  import Wallet from '@/components/header/Wallet'
  import MoreButton from '@/components/header/MoreButton'
  import { mapGetters, mapActions } from 'vuex'
  import Web3 from "web3";

  const { Fetcher, ChainId } = require("openswap-sdk");

  export default {
    name: 'Header',
    components: {
      Wallet,
      MoreButton
    },
    data() {
      return {
        walletConnected: false,
        oswapPrice: 0.00
      }
    },
    mounted: async function() {
      await this.getOswapPrice();
    },
    computed: {
      ...mapGetters('wallet', ['getUserSignedIn', 'getUserSignedOut', 'getUserAddress']),
    },
    methods: {
      ...mapActions('wallet', ['setSignedIn', 'setSignedOut', 'setUserAddress', 'setUserWallet']),

      connectWallet: async function() {
        if(this.getUserSignedIn == true){
          this.disconnectWallet();
          return;
        }
        if (typeof window.ethereum !== undefined) {
          const web3 = new Web3(Web3.givenProvider);
          await window.ethereum.enable();
          const accounts = await web3.eth.getAccounts();
          this.setUserAddress({accounts})
          const chainID = await web3.eth.getChainId();
          if (chainID != 1666600000) {
            this.wrongChain = true; //this need to pop up a modal that changes chain if in metamask if chainID set incorrectly
            return;
          }

          this.setUserWallet({ web3 });
          this.setSignedIn( true )
          if (this.getUserSignedIn == true) {
            this.walletConnected = !this.walletConnected;
          }
          return;
        }
        
      },
      disconnectWallet: async function() {
          await this.setdefaultWallet()

          this.setSignedIn( true )
          this.walletConnected = !this.walletConnected;
          return;
      },
      setdefaultWallet: async function(){
        //if user not signed in set default empty RPC wallet to fetch data as if wallet was connected
        if (!this.getUserSignedIn) {
          const Web3 = require("web3");
          const HMY_RPC_URL = "https://api.s0.t.hmny.io";
          const web3 = new Web3(HMY_RPC_URL);
          this.setUserWallet({ web3 });
          this.setUserAddress(["0x0000000000000000000000000000000000000003"])
          
        }
      },
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
    }
  }
</script>