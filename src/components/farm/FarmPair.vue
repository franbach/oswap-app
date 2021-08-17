<template>
  <div class="flex flex-col p-3 st5 st5-all bg-gray-200 hover:bg-slightGray group dark:hover:bg-slightDark dark:bg-gray-700 rounded-3xl shadow-lg ring-1 ring-black ring-opacity-5">
    <!-- Header -->
    <PoolHeader  :pool="pool" @updateAPR="updateAPR" :poolData="poolData"/>
    <!-- Body -->
    <div class="flex flex-col h-full mt-3 relative">
      <!-- Show this when pool details is closed -->
      <PoolStatsClosed @setPool="setPool" @updateTVL="updateTVL"  :poolData="poolData" :pool="pool"  :isOpen="poolStatsOff" />

      <!-- <div v-if="isOpen" class="fixed inset-0 bg-gray-700 bg-opacity-30"></div> -->
      <!-- Show this when pool details is opened -->
      <PoolStatsInfo  :isOpen="poolStatsOn" :poolData="poolData" :pool="pool" @setPool="setPool" />

      <!-- Show this when the pool is opened and clicked on Stake -->
      <PoolStake :isOpen="poolStakeOn" :maxAmount="poolData.lpBalance" :pool="pool" @setPool="setPool"  @updateData="updateData" />

      <!-- Show this when the pool is opened and clicked on Unstake -->
      <PoolUnstake   :isOpen="poolUnstakeOn" :maxAmount="poolData.lpBalanceStaked" :pool="pool" @setPool="setPool"  @updateData="updateData" />
    </div>
  </div>
</template>

<script>
  import openswap from "@/shared/openswap.js";

  import PoolHeader from "@/components/farm/FarmPair/PoolHeader";
  import PoolStatsClosed from "@/components/farm/FarmPair/PoolStatsClosed";
  import PoolStatsInfo from "@/components/farm/FarmPair/PoolStatsInfo";
  import PoolStake from "@/components/farm/FarmPair/PoolStake";
  import PoolUnstake from "@/components/farm/FarmPair/PoolUnstake";

  export default {
    name: 'FarmPair',
    props: {
      pool: Object,
      poolData: Object,
    },
    components: {
      PoolHeader,
      PoolStatsClosed,
      PoolStatsInfo,
      PoolStake,
      PoolUnstake
    },
    mixins: [openswap],
    mounted: async function() {},
    data() {
      return {
        poolStatsOff: true,
        poolStatsOn: false,
        poolStakeOn: false,
        poolUnstakeOn: false,
      }
    },
    methods: {
      updateData(){
        this.$emit("updateData")
      },
      updateTVL(value){
        this.$emit("updateTVL", value)
      },
      updateAPR(value){
        this.$emit("updateAPR", value)
      },
      setPool(value) {
        if (value == 'open') {
          this.$el.classList.remove('ring-1', 'ring-black', 'ring-opacity-5');
          this.$el.classList.add('row-span-3', 'ensure-height', 'ring-2', 'ring-inset', 'ring-oswapGreen');
          this.poolStatsOff = false
          this.poolStatsOn = true
        }

        if (value == 'close') {
          this.$el.classList.remove('row-span-3', 'ensure-height', 'ring-2', 'ring-inset', 'ring-oswapGreen');
          this.$el.classList.add('ring-1', 'ring-black', 'ring-opacity-5');
          this.poolStatsOn = false
          this.poolStatsOff = true
        }

        if (value == 'stake') {
          this.poolStatsOn = false
          this.poolStakeOn = true
        }

        if (value == 'stats') {
          this.poolStakeOn = false
          this.poolUnstakeOn = false
          this.poolStatsOn = true
        }

        if (value == 'unstake') {
          this.poolStatsOn = false
          this.poolUnstakeOn = true
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .ensure-height {
    height: 420px;
  }
</style>