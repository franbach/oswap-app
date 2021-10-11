import { mapGetters, mapActions } from 'vuex';
import { ethers } from "ethers";
import { toastMe } from '@/components/toaster/toaster.js';
import { fromBech32 } from '@harmony-js/crypto'
//import WalletConnectProvider from "@walletconnect/web3-provider";
export default {
    mounted: function () {

      
    },
    computed: {
        ...mapGetters('wallet', ['getUserSignedIn', 'getUserSignedOut', 'getUserAddress', 'getWalletType', 'getChainID']),
    },
    methods: {
        ...mapActions('wallet', ['setSignedIn', 'setSignedOut', 'setUserAddress', 'setUserWallet','setWalletType','setChainID']),
  
        connectOneWallet: async function() {
          console.log("connecting wallet")
          if(window.onewallet !== undefined){
            this.setWalletType('oneWallet');
            //const isOneWallet = window.onewallet && window.onewallet.isOneWallet;
            //await window.onewallet.forgetIdentity();
            //window.onewallet.signin()
            const onewallet = window.onewallet;
            const getAccount = await onewallet.getAccount();
            console.log(getAccount)
            this.setdefaultWallet()
            this.setUserAddress(fromBech32(getAccount.address));
              
              this.setSignedIn( true );
              localStorage.setItem("walletmode", '1');
              this.walletConnected = true;
              return true;
          }else if(window.ethereum == undefined && window.onewallet == undefined){
                
                toastMe('warning', {
                  title: 'Wallet :',
                  msg: "It seems you don't have Metamask or One Wallet installed!",
                  link: false,
                })
                return false
          }
          else{
                
                toastMe('warning', {
                  title: 'Wallet :',
                  msg: "It seems you don't have Harmony One Wallet installed! try switching Wallet Mode",
                  link: false,
                })
                return false
          }
        },
        connectMetamaskWallet: async function(){
          if (window.ethereum !== undefined){
            if(this.$route.name == 'Bridge'){
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                await provider.send("eth_requestAccounts", []);
                const signer = await provider.getSigner();
                const { chainId } = await provider.getNetwork()
                this.setChainID(chainId);
                const accounts = await signer.getAddress();
                this.setWalletType('metamask');
                console.log(accounts)
                this.setUserAddress(accounts);
                localStorage.setItem("walletmode", '0');
                this.setSignedIn( true );
                this.setUserWallet( provider );
                return true
            }
            window.ethereum.on('chainChanged', async function(){
              if(this.$route.name != 'Bridge'){
                window.location.reload(true);  
              }else{
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                await provider.send("eth_requestAccounts", []);
                const signer = await provider.getSigner();
                const { chainId } = await provider.getNetwork()
                this.setChainID(chainId);
                const accounts = await signer.getAddress();
                this.setWalletType('metamask');
                console.log(accounts)
                this.setUserAddress(accounts);
                localStorage.setItem("walletmode", '0');
                this.setSignedIn( true );
                this.setUserWallet( provider );
                return true
              }
              
            }.bind(this));
            window.ethereum.on('accountsChanged', async function(){
              window.location.reload(true);
            }.bind(this));
            console.log(this.$route)
            if(this.$route.name == 'Bridge'){
              return true
            }
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            await provider.send("eth_requestAccounts", []);
            const signer = await provider.getSigner();
            const { chainId } = await provider.getNetwork()
            this.setChainID(chainId);
            if (chainId != 1666600000 && chainId != 1666700000 && chainId != 1337) {
              toastMe('warning', {
                title: 'Wrong Network',
                msg: `Please Use Harmony Network`,
                link: false,
              })
              await this.disconnectWallet();
              return false
            }
            
              const accounts = await signer.getAddress();
              this.setWalletType('metamask');
              console.log(accounts)
              this.setUserAddress(accounts);
              localStorage.setItem("walletmode", '0');
              this.setSignedIn( true );
              this.setUserWallet( provider );
              toastMe('success', {
                title: 'Wallet :',
                msg: `Succesfully connected to : ` + accounts,
                link: false,
              })
              this.walletConnected = true;
              return true;
          }else if(window.ethereum == undefined && window.onewallet == undefined){
                
                toastMe('warning', {
                  title: 'Wallet :',
                  msg: "It seems you don't have Metamask or One Wallet installed!",
                  link: false,
                })
                return false
          }
          else if(window.ethereum == undefined){  
                toastMe('warning', {
                  title: 'Wallet :',
                  msg: "It seems you don't have Metamask installed! try switching Wallet Mode",
                  link: false,
                })
                return false
          }  
        },
        disconnectWallet: async function() {
            this.setSignedIn( false );
            this.setdefaultWallet()
      
            this.walletConnected = false;
            return false;
        },
        setdefaultWallet: function(){
          const provider =  new ethers.providers.JsonRpcProvider("https://api.s0.t.hmny.io", {chainId: 1666600000, name: "Harmony"})
          this.setUserAddress("0x0000000000000000000000000000000000000009")
          this.setUserWallet( provider );
        }
    }
};