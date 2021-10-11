<template>
  <div class="flex flex-col space-y-3 bg-red-200">
    <p>Staking Info</p>
  </div>
</template>

<script>
  export default {
    name: 'StakingInfo',
    data() {
      return {
        infoValidator: 'data'
      }
    },
    async mounted() {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          "jsonrpc": "2.0",
          "id": 1,
          "method": "hmyv2_getValidatorInformation",
          "params": [
              "one1j35d0vd4uzwffeawjjfukn8t9wjt8csungj0z0"   
          ]
        }),
      };

      const response = await fetch("https://rpc.s0.t.hmny.io", requestOptions);
      const data = await response.json();
      this.infoValidator = data
    }
  }
</script>

<style lang="scss" scoped>

</style>