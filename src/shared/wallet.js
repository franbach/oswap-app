import { mapGetters, mapActions } from 'vuex';
import { ethers } from "ethers";
import { toastMe } from '@/components/toaster/toaster.js';
//import WalletConnectProvider from "@walletconnect/web3-provider";
export default {
    mounted: function () {
      
    },
    computed: {
        ...mapGetters('wallet', ['getUserSignedIn', 'getUserSignedOut', 'getUserAddress']),
    },
    methods: {
        ...mapActions('wallet', ['setSignedIn', 'setSignedOut', 'setUserAddress', 'setUserWallet']),
  
        connectWallet: async function() {
          console.log("connecting wallet")

          if (window.ethereum !== undefined){
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            await provider.send("eth_requestAccounts", []);
            const signer = await provider.getSigner();
            const network = await provider.getNetwork();
            const chainID = await network.chainId;
            if (chainID != 1666600000) {
              toastMe('warning', {
                title: 'Wrong Network',
                msg: `Please Use Harmony Network`,
                link: false,
              })
              this.disconnectWallet();
              return false
            }
            
              const accounts = await signer.getAddress();
              console.log(accounts)
              this.setUserAddress(accounts);
              
              this.setSignedIn( true );
              this.setUserWallet( provider );
              toastMe('success', {
                title: 'Wallet :',
                msg: `Succesfully connected to : ` + accounts,
                link: false,
              })
              this.walletConnected = true;
              return true;
          }else{
                
                toastMe('warning', {
                  title: 'Wallet :',
                  msg: "It seems you don't have Metamask installed !",
                  link: false,
                })
                return false
              }    
          
        },
        disconnectWallet: function() {
            this.setSignedIn( false );
            this.setdefaultWallet()
            this.walletConnected = false;
            return false;
        },
        setdefaultWallet: function(){
          const provider =  new ethers.providers.JsonRpcProvider("https://api.s0.t.hmny.io", {chainId: 1666600000, name: "Harmony"})
            this.setUserWallet( provider );
            this.setUserAddress("0x0000000000000000000000000000000000000003");

        }
    }
};