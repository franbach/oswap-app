<template>
  <div class="flex flex-1 justify-between">
    <!-- from network -->
    <From :key="token"/>
    <!-- switch network -->
    <Switch @updateBalances="updateBalances" />
    <!-- to network button -->
    <To/>
  </div>
</template>

<script>
  import From from '@/components/bridge/BridgeNetwork/From';
  import Switch from '@/components/bridge/BridgeNetwork/Switch';
  import To from '@/components/bridge/BridgeNetwork/To';

  export default {
    name: 'BridgeNetworkSelect',
    components: {
      From,
      Switch,
      To
    },
    props: {
      token: Object
    },
    methods: {
      updateBalances(){
        this.$emit('updateBalances')
      }
    }

  }
</script>