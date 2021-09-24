<template>
  <div class="grid grid-cols-12 gap-4 mt-8">
    <div class="flex col-span-3 space-x-2">
      <div class="flex w-10 h-10 rounded-xl shadow-xl bg-slightGray dark:bg-slightDark items-center justify-center">
        <i v-if="tx.type == 'Sent'" class="las la-arrow-up text-2xl text-yellow-500"></i>
        <i v-if="tx.type == 'Received'" class="las la-arrow-down text-2xl text-oswapGreen"></i>
        <i v-if="tx.type == 'Swapped'" class="las la-sync font-extrabold text-2xl text-oswapBlue-light"></i>
      </div>
      <div class="flex flex-col">
        <p class="text-base font-bold">{{tx.type}} {{tx.Symbol}}</p>
        <p class="text-sm text-gray-400">22 Sept. 2021</p>
      </div>
    </div>

    <div class="flex flex-col col-span-3">
      <p class="text-base font-bold">{{tx.total}} {{tx.Symbol}}</p>
      <p class="text-sm">{{tx.type == 'Received' || tx.type == 'Swapped' ? '+' : '-' }} $ {{tx.totalWorth}}</p>
    </div>

    <div class="flex flex-col col-span-6">
      <p class="text-base font-bold">Transaction ID</p>
      <div class="flex items-center space-x-2">
        <p class="text-sm text-el">{{tx.tx}}</p>
        <button>
          <i class="las la-search text-2xl text-oswapGreen"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'TransactionItem',
    props: {
      tx: Object
    }
  }
</script>