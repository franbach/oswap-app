import { mapGetters, mapActions } from 'vuex';
import { ethers } from "ethers";

export default {
    created: function () { 
    },
    computed: {
        ...mapGetters('wallet', ['getUserSignedIn', 'getUserSignedOut', 'getUserAddress']),
    },
    methods: {
        ...mapActions('wallet', ['setSignedIn', 'setSignedOut', 'setUserAddress', 'setUserWallet']),
  
        connectWallet: async function() {
          console.log("connecting wallet")
          if(this.getUserSignedIn == true){
            this.disconnectWallet();
            return;
          }
          if (typeof window.ethereum !== undefined) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            await provider.send("eth_requestAccounts", []);
            const signer = await provider.getSigner();
            const network = await provider.getNetwork();
            const chainID = await network.chainId;
            
            const accounts = await signer.getAddress();
            console.log(accounts)
            this.setUserAddress(accounts);
            if (network.chainId != 1666600000) {
              this.wrongChain = true; //this need to pop up a modal that changes chain if in metamask if chainID set incorrectly
              return;
            }
            this.setSignedIn( true );
            this.setUserWallet({ signer });
            if (this.getUserSignedIn == true) {
              this.walletConnected = !this.walletConnected;
            }
            return;
          }
          
        },
        disconnectWallet: async function() {
            await this.setdefaultWallet();
  
            this.setSignedIn( true );
            this.walletConnected = !this.walletConnected;
            return;
        },
        setdefaultWallet: async function(){
          //if user not signed in set default empty RPC wallet to fetch data as if wallet was connected
          if (!this.getUserSignedIn) {
           // const Web3 = require("web3");
            const HMY_RPC_URL = "https://api.s0.t.hmny.io";
            //const web3 = new Web3(HMY_RPC_URL);
            //this.setUserWallet({ web3 });
            this.setUserAddress(["0x0000000000000000000000000000000000000003"]);
            
          }
        }
    }
};