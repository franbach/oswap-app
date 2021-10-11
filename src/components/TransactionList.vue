<template>
  <div class="flex flex-col">
    <div class="grid grid-cols-6 w-full gap-3 h-12">
      <div class="flex h-12 col-span-4">
        <Divider title="Transactions" class="w-full" />
      </div>
      <!-- search field -->
      <div class="flex h-12 col-span-2 item">
        <div class="flex w-full relative st5-all focus-within:text-oswapGreen-dark dark:focus-within:text-oswapGreen">
          <i class="las la-search text-lg center-y-component pl-3"></i>
          <input type="text" v-model="find" @input="findTx" class="flex w-full rounded-full items-center ring-black st-5 ring-opacity-10 focus:ring-oswapGreen ring-1 focus:outline-none bg-slightGray dark:bg-slightDark pl-10" placeholder="find by | type, token, date, amount or tx | ...">
        </div>
      </div>
    </div>
    
    <!-- transaction item -->
    <transition-group as="template" name="vertical" appear>
      <TransactionItem v-for="(tx, index) in items" :key="index" :tx="tx" />
    </transition-group>

    <!-- observer for infinite scroll -->
    <Observer @intersect="intersected"/>
    
    <!-- loading animation -->
    <div v-if="this.loadingChunk" class="flex w-full py-16 items-center justify-center">
      <svg class="animate-spin h-8 w-8 text-oswapGreen" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    </div>
  </div>
</template>

<script>
  import Divider from '@/components/Divider'
  import TransactionItem from '@/components/TransactionItem'
  import Observer from '@/components/Observer'

  export default {
    name: 'TransactionList',
    components: {
      Divider,
      TransactionItem,
      Observer
    },
    data() {
      return {
        find: '',
        loadingChunk: false,
        items: [],
        // Dummy data
        txs: [
          {
            Symbol: 'eMATIC',
            tx: '0xe874d185e7c49a89887ac382de87daa9d78b97774d8b26223fdba978dac73285',
            total: '4097.12345',
            totalWorth: '6,499.12',
            type: 'Sent'
          },
          {
            Symbol: 'bADA',
            tx: '0xe874d185e7c49a89887ac382de87daa9d78b97774d8b26223fdba978dac73285',
            total: '1112.34567',
            totalWorth: '3,132.45',
            type: 'Received'
          },
          {
            Symbol: 'eWBTC',
            tx: '0xe874d185e7c49a89887ac382de87daa9d78b97774d8b26223fdba978dac73285',
            total: '1.09712345',
            totalWorth: '42,300.12',
            type: 'Received'
          },
          {
            Symbol: 'bUSDC/oSWAP',
            tx: '0xe874d185e7c49a89887ac382de87daa9d78b97774d8b26223fdba978dac73285',
            total: '2097.12345',
            totalWorth: '2,097.12',
            type: 'Swapped'
          },
          {
            Symbol: 'ONE',
            tx: '0xe874d185e7c49a89887ac382de87daa9d78b97774d8b26223fdba978dac73285',
            total: '10097.12345',
            totalWorth: '1,599.12',
            type: 'Sent'
          },
          {
            Symbol: 'ONE/oSWAP',
            tx: '0xe874d185e7c49a89887ac382de87daa9d78b97774d8b26223fdba978dac73285',
            total: '23097.12345678',
            totalWorth: '1,400.12',
            type: 'Swapped'
          },
          {
            Symbol: 'eMATIC',
            tx: '0xe874d185e7c49a89887ac382de87daa9d78b97774d8b26223fdba978dac73285',
            total: '4097.12345',
            totalWorth: '6,499.12',
            type: 'Sent'
          },
          {
            Symbol: 'bADA',
            tx: '0xe874d185e7c49a89887ac382de87daa9d78b97774d8b26223fdba978dac73285',
            total: '1112.34567',
            totalWorth: '3,132.45',
            type: 'Received'
          },
          {
            Symbol: 'eWBTC',
            tx: '0xe874d185e7c49a89887ac382de87daa9d78b97774d8b26223fdba978dac73285',
            total: '1.09712345',
            totalWorth: '42,300.12',
            type: 'Received'
          },
          {
            Symbol: 'bUSDC/oSWAP',
            tx: '0xe874d185e7c49a89887ac382de87daa9d78b97774d8b26223fdba978dac73285',
            total: '2097.12345',
            totalWorth: '2,097.12',
            type: 'Swapped'
          },
          {
            Symbol: 'ONE',
            tx: '0xe874d185e7c49a89887ac382de87daa9d78b97774d8b26223fdba978dac73285',
            total: '10097.12345',
            totalWorth: '1,599.12',
            type: 'Sent'
          },
          {
            Symbol: 'ONE/oSWAP',
            tx: '0xe874d185e7c49a89887ac382de87daa9d78b97774d8b26223fdba978dac73285',
            total: '23097.12345678',
            totalWorth: '1,400.12',
            type: 'Swapped'
          },
          {
            Symbol: 'eMATIC',
            tx: '0xe874d185e7c49a89887ac382de87daa9d78b97774d8b26223fdba978dac73285',
            total: '4097.12345',
            totalWorth: '6,499.12',
            type: 'Sent'
          },
          {
            Symbol: 'bADA',
            tx: '0xe874d185e7c49a89887ac382de87daa9d78b97774d8b26223fdba978dac73285',
            total: '1112.34567',
            totalWorth: '3,132.45',
            type: 'Received'
          },
          {
            Symbol: 'eWBTC',
            tx: '0xe874d185e7c49a89887ac382de87daa9d78b97774d8b26223fdba978dac73285',
            total: '1.09712345',
            totalWorth: '42,300.12',
            type: 'Received'
          },
          {
            Symbol: 'bUSDC/oSWAP',
            tx: '0xe874d185e7c49a89887ac382de87daa9d78b97774d8b26223fdba978dac73285',
            total: '2097.12345',
            totalWorth: '2,097.12',
            type: 'Swapped'
          },
          {
            Symbol: 'ONE',
            tx: '0xe874d185e7c49a89887ac382de87daa9d78b97774d8b26223fdba978dac73285',
            total: '10097.12345',
            totalWorth: '1,599.12',
            type: 'Sent'
          },
          {
            Symbol: 'ONE/oSWAP',
            tx: '0xe874d185e7c49a89887ac382de87daa9d78b97774d8b26223fdba978dac73285',
            total: '23097.12345678',
            totalWorth: '1,400.12',
            type: 'Swapped'
          },
          {
            Symbol: 'eMATIC',
            tx: '0xe874d185e7c49a89887ac382de87daa9d78b97774d8b26223fdba978dac73285',
            total: '4097.12345',
            totalWorth: '6,499.12',
            type: 'Sent'
          },
          {
            Symbol: 'bADA',
            tx: '0xe874d185e7c49a89887ac382de87daa9d78b97774d8b26223fdba978dac73285',
            total: '1112.34567',
            totalWorth: '3,132.45',
            type: 'Received'
          },
          {
            Symbol: 'eWBTC',
            tx: '0xe874d185e7c49a89887ac382de87daa9d78b97774d8b26223fdba978dac73285',
            total: '1.09712345',
            totalWorth: '42,300.12',
            type: 'Received'
          },
          {
            Symbol: 'bUSDC/oSWAP',
            tx: '0xe874d185e7c49a89887ac382de87daa9d78b97774d8b26223fdba978dac73285',
            total: '2097.12345',
            totalWorth: '2,097.12',
            type: 'Swapped'
          },
          {
            Symbol: 'ONE',
            tx: '0xe874d185e7c49a89887ac382de87daa9d78b97774d8b26223fdba978dac73285',
            total: '10097.12345',
            totalWorth: '1,599.12',
            type: 'Sent'
          },
          {
            Symbol: 'ONE/oSWAP',
            tx: '0xe874d185e7c49a89887ac382de87daa9d78b97774d8b26223fdba978dac73285',
            total: '23097.12345678',
            totalWorth: '1,400.12',
            type: 'Swapped'
          }
        ]
      }
    },
    mounted() {
      this.items = this.txs.slice(0, 6)
    },
    methods: {
      async intersected() { 
        let prevChunk = this.items.length;
        let newChunk = this.txs.slice(prevChunk, prevChunk * 2)

        if (this.items.length < this.txs.length) {
          this.loadingChunk = true;
          await this.sleep(1000);
          this.loadingChunk = false;
          this.items = [...this.items, ...newChunk];
        }

      },
      sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }
    }
  }
</script>