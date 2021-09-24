<template>
  <div class="flex flex-col">
    <TransactionItem v-for="(tx, index) in txs" :key="index" :tx="tx" />
  </div>
</template>

<script>
  import TransactionItem from '@/components/TransactionItem'

  export default {
    name: 'TransactionList',
    components: {
      TransactionItem
    },
    props: {
      txs: Object
    }
  }
</script>