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

          if (window.ethereum){
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
              await this.disconnectWallet();
              throw 'wrong chain'
            }else{
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
              return;
              }
            }

            //Wallet Connect needs implementation later
            /*
            else {
              const provider = new WalletConnectProvider({
                rpc: {
                  1666600000: "https://api.harmony.one"
                },
                qrcode: false,
                qrcodeModalOptions: {
                  mobileLinks: [
                    "math",
                    "metamask",
                    "argent",
                    "trust",
                    "imtoken",
                    "pillar",
                  ],
                }
              });  
              await provider.enable();
              //const provider = new ethers.providers.Web3Provider(preprovider);
              const signer = await provider.getSigner();
              const chainID = await web3.eth.getChainId();
              
              if (chainID != 1666600000) {
                  toastMe('warning', {
                    title: 'Wrong Network',
                    msg: `Please Use Harmony Network`,
                    link: false,
                  })
                  await this.disconnectWallet();
                  throw 'wrong chain'
              }else{
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
              return;
              }
              
            }*/
            
            
           
          
        },
        disconnectWallet: async function() {
            this.setSignedIn( false );
            this.walletConnected = false;
            return;
        },
        setdefaultWallet: async function(){
          const provider =  new ethers.providers.JsonRpcProvider("https://api.s0.t.hmny.io", {chainId: 1666600000, name: "Harmony"})
            this.setUserWallet( provider );
            this.setUserAddress("0x0000000000000000000000000000000000000003");

        }
    }
};