<template>
  <transition as="template" name="vertical" appear>
    <div class="flex flex-col w-full">
      <div class="flex w-full space-x-4 h-60 mb-12">
        <div class="grid grid-cols-6 gap-4 w-full">
          <!-- Cards -->
          <CardWallet class="from-oswapGreen to-oswapBlue-light" :styleData="cardDataHarmony.style" :balanceData="cardDataHarmony.balance">
            <svg class="h-10 w-10 fill-current" width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M16 0c8.837 0 16 7.163 16 16s-7.163 16-16 16S0 24.837 0 16 7.163 0 16 0zm5.143 7c-2.124 0-3.857 1.738-3.913 3.869v4.317c-.392 0-.783.056-1.23.056-.447 0-.839 0-1.23.056v-4.43c0-2.13-1.789-3.868-3.969-3.812-2.068 0-3.745 1.738-3.801 3.813v10.317c.056 2.13 1.789 3.869 3.969 3.813 2.124-.056 3.801-1.738 3.801-3.813v-4.318c.391 0 .783-.056 1.23-.056.447 0 .838 0 1.23-.056v4.374c.056 2.13 1.789 3.869 3.969 3.813C23.323 24.887 25 23.204 25 21.13V10.869C25 8.739 23.267 7 21.143 7zM13.26 17.093l-.056 4.093a2.27 2.27 0 01-2.292 2.299 2.27 2.27 0 01-2.292-2.3v-1.008c0-.897.727-1.795 1.957-2.3.838-.392 1.733-.616 2.683-.784zm10.174-2.187v6.28a2.306 2.306 0 01-2.292 2.299 2.27 2.27 0 01-2.292-2.3v-4.54a13.844 13.844 0 003.298-.954c.447-.224.894-.449 1.286-.785zM10.913 8.57a2.27 2.27 0 012.292 2.299v4.542a13.845 13.845 0 00-3.298.953c-.447.224-.895.448-1.286.785v-6.28c0-1.234 1.006-2.299 2.292-2.299zm10.174 0a2.27 2.27 0 012.292 2.299v1.01c.056.952-.671 1.793-1.9 2.354-.84.393-1.734.617-2.684.785v-4.15a2.27 2.27 0 012.292-2.298z"/></svg>
          </CardWallet>

          <CardWallet class="from-indigo-400 to-indigo-600" :styleData="cardDataEthereum.style" :balanceData="cardDataEthereum.balance">
            <svg class="h-10 w-10 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><g fill-rule="evenodd"><path d="M16 32C7.163 32 0 24.837 0 16S7.163 0 16 0s16 7.163 16 16-7.163 16-16 16zm7.994-15.781L16.498 4 9 16.22l7.498 4.353 7.496-4.354zM24 17.616l-7.502 4.351L9 17.617l7.498 10.378L24 17.616z"/><g fill-rule="nonzero"><path fill-opacity=".298" d="M16.498 4v8.87l7.497 3.35zm0 17.968v6.027L24 17.616z"/><path fill-opacity=".801" d="M16.498 20.573l7.497-4.353-7.497-3.348z"/><path fill-opacity=".298" d="M9 16.22l7.498 4.353v-7.701z"/></g></g></svg>
          </CardWallet>

          <CardWallet class="from-yellow-400 to-yellow-600" :styleData="cardDataBinance.style" :balanceData="cardDataBinance.balance">
            <svg class="h-10 w-10 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="M16 32C7.163 32 0 24.837 0 16S7.163 0 16 0s16 7.163 16 16-7.163 16-16 16zm-3.884-17.596L16 10.52l3.886 3.886 2.26-2.26L16 6l-6.144 6.144 2.26 2.26zM6 16l2.26 2.26L10.52 16l-2.26-2.26L6 16zm6.116 1.596l-2.263 2.257.003.003L16 26l6.146-6.146v-.001l-2.26-2.26L16 21.48l-3.884-3.884zM21.48 16l2.26 2.26L26 16l-2.26-2.26L21.48 16zm-3.188-.002h.001L16 13.706 14.305 15.4l-.195.195-.401.402-.004.003.004.003 2.29 2.291 2.294-2.293.001-.001-.002-.001z"/></svg>
          </CardWallet>
        </div>
      </div>

      <div class="flex w-full mb-8">
        <div class="grid grid-cols-6 gap-4 w-full">
          <div class="flex items-center col-span-2">
            <div class="flex w-14 h-14 rounded-xl mr-3 items-center justify-center dark:text-slightGray text-slightDark bg-slightGray dark:bg-slightDark">
              <i class="las la-dollar-sign text-4xl"></i>
            </div>
            <div class="flex flex-col">
              <p class="text-2xl font-bold">$ 14,500.39</p>
              <p class="text-base text-gray-400">Total balance</p>
            </div>
          </div>
          <div class="flex items-center col-span-2">
            <div class="flex w-14 h-14 rounded-xl mr-3 items-center justify-center text-slightDark dark:text-slightGray dark:bg-slightDark bg-slightGray">
              <i class="las la-layer-group text-4xl"></i>
            </div>
            <div class="flex flex-col">
              <p class="text-2xl font-bold">$ 1,500.39</p>
              <p class="text-base text-gray-400">Total Staking</p>
            </div>
          </div>
          <div class="flex items-center col-span-2">
            <div class="flex w-14 h-14 rounded-xl mr-3 items-center justify-center text-slightDark dark:text-slightGray dark:bg-slightDark bg-slightGray">
              <i class="las la-coins text-4xl"></i>
            </div>
            <div class="flex flex-col">
              <p class="text-2xl font-bold">17</p>
              <p class="text-base text-gray-400">Total Assets</p>
            </div>
          </div>
        </div>
      </div>

      <TransactionList />

    </div>
  </transition>
</template>

<script>
  import TokenList from '@/components/TokenList'
  import TransactionList from '@/components/TransactionList'
  import CardWallet from '@/components/wallet/CardWallet'
  import RadialChart from '@/components/wallet/RadialChart'

  export default {
    name: 'WalletHome',
    components: {
      TokenList,
      TransactionList,
      CardWallet,
      RadialChart
    },
    data() {
      return {
        testData: [
          { 
            amount: 20,
            from: '#3492eb',
            to: '#3492eb'
          },
          { 
            amount: 59,
            from: '#34eb89',
            to: '#34eb89'
          },
          { 
            amount: 11,
            from: '#eb4034',
            to: '#eb4034'
          },
          { 
            amount: 5,
            from: '#3492eb',
            to: '#3492eb'
          },
          { 
            amount: 5,
            from: '#34eb89',
            to: '#34eb89'
          },
        ],
        // DUMMY DATA - ERASE WHEN REAL DATA IS BEING FETCHED...
        cardDataHarmony: {
          style: {
            from: "#edeff2",
            to: "#edeff2",
            size: 90,
            stroke: 8
          },
          balance: {
            networkName: 'Harmony Chain Tokens',
            value: '9,145.39',
            valuePercentage: 59,
            assets: [
              {
                icon: "https://openfi.dev/tokens/default/ONE.png",
              },
              {
                icon: "https://openfi.dev/tokens/default/oSWAP.png",
              },
              {
                icon: "https://miro.medium.com/fit/c/56/56/1*6X4n2JzQweFbOjpneSWiOw.png",
              },
              {
                icon: "https://d1xrz6ki9z98vb.cloudfront.net/venomswap/tokens/VINCI.png",
              },
              {
                icon: "https://s3-us-west-1.amazonaws.com/tokens.mochiswap.io/images/hMOCHI-token-logo.png",
              },
              {
                icon: "https://swoop-exchange.s3-us-west-1.amazonaws.com/tokens/LMA.png",
              },
              {
                icon: "https://freyala.com/images/logo.png",
              },
              {
                icon: "https://swoop-exchange.s3-us-west-1.amazonaws.com/tokens/1SEED.png",
              },
              {
                icon: "https://swoop-exchange.s3-us-west-1.amazonaws.com/tokens/ARANK.png",
              },
              {
                icon: "https://swoop-exchange.s3-us-west-1.amazonaws.com/tokens/EUSK.png",
              },
              {
                icon: "https://swoop-exchange.s3-us-west-1.amazonaws.com/tokens/SEE.png",
              }
            ]
          }
        },
        cardDataEthereum: {
          style: {
            from: "#edeff2",
            to: "#edeff2",
            size: 90,
            stroke: 8
          },
          balance: {
            networkName: 'Ethereum Bridged Tokens',
            value: '1,145.39',
            valuePercentage: 11,
            assets: [
              {
                icon: "https://openfi.dev/tokens/default/WBTC.png",
              },
              {
                icon: "https://openfi.dev/tokens/default/USDC.png",
              },
            ]
          }
        },
        cardDataBinance: {
          style: {
            from: "#edeff2",
            to: "#edeff2",
            size: 90,
            stroke: 8
          },
          balance: {
            networkName: 'Binance Smart Chain Tokens',
            value: '4,145.39',
            valuePercentage: 30,
            assets: [
              {
                icon: "https://s2.coinmarketcap.com/static/img/coins/128x128/1839.png",
              },
              {
                icon: "https://openfi.dev/tokens/default/MATIC.png",
              },
              {
                icon: "https://s2.coinmarketcap.com/static/img/coins/128x128/2010.png",
              },
              {
                icon: "https://s2.coinmarketcap.com/static/img/coins/128x128/7186.png",
              },
            ]
          }
        }
      }
    }
  }
</script>