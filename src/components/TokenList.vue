<template>
  <div class="flex flex-col w-full divide-y dark:divide-slightDark divide-gray-300">
    <TokenItem  v-for="(item, index) in list" :key="index" :token="item" />
  </div>
</template>

<script>
  import TokenItem from '@/components/TokenItem'

  export default {
    name: 'TokenList',
    components: {
      TokenItem
    },
    props: {
      list: Object
    }
  }
</script>

<style lang="scss" scoped>

</style>