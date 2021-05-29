<template>
  <div id="exchangeBodyRight" class="flex flex-1 flex-col">
    <transition-group tag="div" name="token-list">
      <SwapTokensNetworks v-for="(network, i) in networks" 
        :network="network"
        :index="i" 
        :key="i"
        :open="network.open"
        @toggle="toggleOpen"
        class="mb-2"
      />
    </transition-group>
  </div>
</template>

<script>
  import SwapTokensNetworks from '@/components/exchange/SwapTokensNetworks'

  export default {
    name: 'SwapTokens',
    components: {
      SwapTokensNetworks
    },
    data() {
      return {
        networks: [
          {
            open: true,
            name: "Harmony Native Tokens",
            icon: "https://openfi.dev/tokens/default/ONE.png",
            assets: [
              {
                ticker: 'ONE',
                icon: "https://openfi.dev/tokens/default/ONE.png"
              },
              {
                ticker: 'oSWAP',
                icon: "https://openfi.dev/tokens/default/oSWAP.png"
              },
              {
                ticker: 'VIPER',
                icon: 'https://miro.medium.com/fit/c/56/56/1*6X4n2JzQweFbOjpneSWiOw.png'
              }
            ]
          },
          {
            open: false,
            name: "Ethereum Bridged Tokens",
            icon: "https://openfi.dev/tokens/default/ETH.png",
            assets: [
              {
                ticker: 'eETH',
                icon: "https://openfi.dev/tokens/default/ETH.png"
              },
              {
                ticker: 'eBUSD',
                icon: "https://openfi.dev/tokens/default/BUSD.png"
              },
              {
                ticker: 'eWBTC',
                icon: 'https://openfi.dev/tokens/default/WBTC.png'
              }
            ]
          },
          {
            open: false,
            name: "BSC Bridged Tokens",
            icon: "https://bscscan.com/images/svg/brands/bnb.svg?v=1.3",
            assets: [
              {
                ticker: 'bBNB',
                icon: "https://bscscan.com/images/svg/brands/bnb.svg?v=1.3"
              },
              {
                ticker: 'bBUSD',
                icon: "https://openfi.dev/tokens/default/BUSD.png"
              },
              {
                ticker: 'bETH',
                icon: 'https://openfi.dev/tokens/default/ETH.png'
              }
            ]
          }
        ]
      }
    },
    methods: {
      toggleOpen(index) {
        this.networks = this.networks.map((n, i) => {
          if (index === i) {
            n.open = !n.open;
          } else {
            n.open = false;
          }
          return n;
        });
      }
    }
  }
</script>