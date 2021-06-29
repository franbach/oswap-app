<template>
  <div class="flex flex-col p-3 group bg-gray-200 hover:bg-slightGray dark:hover:bg-slightDark dark:bg-gray-700 rounded-3xl shadow-lg ring-1 ring-black ring-opacity-5">
    <!-- Header -->
    <PoolHeader :pool="pool" />
    <!-- Body -->
    <div class="flex flex-col h-full mt-3 relative">
      <!-- Show this when pool details is closed -->
      <PoolStatsClosed @setPool="setPool" :isOpen="poolStatsOff" />

      <!-- Show this when pool details is opened -->
      <PoolStatsInfo :isOpen="poolStatsOn" :pool="pool" @setPool="setPool" />

      <!-- Show this when the pool is opened and clicked on Stake -->
      <PoolStake :isOpen="poolStakeOn" :pool="pool" @setPool="setPool" />

      <!-- Show this when the pool is opened and clicked on Unstake -->
      <PoolUnstake :isOpen="poolUnstakeOn" :pool="pool" @setPool="setPool" />
    </div>
  </div>
</template>

<script>
  import openswap from "@/shared/openswap.js";

  import PoolHeader from "@/components/farm/FarmPair/PoolHeader"
  import PoolStatsClosed from "@/components/farm/FarmPair/PoolStatsClosed"
  import PoolStatsInfo from "@/components/farm/FarmPair/PoolStatsInfo"
  import PoolStake from "@/components/farm/FarmPair/PoolStake"
  import PoolUnstake from "@/components/farm/FarmPair/PoolUnstake"

  export default {
    name: 'FarmPair',
    props: {
      pool: Object
    },
    components: {
      PoolHeader,
      PoolStatsClosed,
      PoolStatsInfo,
      PoolStake,
      PoolUnstake
    },
    mixins: [openswap],
    mounted: async function (){
      //this.token0 = this.pool;
      //this.token1 = this.pool.name;
    //   await this.getAllRewards();
    //   await setInterval(
    //     async function() {
    //       await this.getAllRewards();
    //     }.bind(this),
    //     10000
    //   );
    },
    data() {
      return {
        //pool: null,
        poolStatsOff: true,
        poolStatsOn: false,
        poolStakeOn: false,
        poolUnstakeOn: false,
        token0: null,
        token1: null,
        lpBalance: 0,
        sushiBalance: 0,
        pendingSushi: 0,
        selectedPool: null,
        //e1: 1,
        amount: "0",
        lpToken: {},
        //addLiquidity: false,
        staked: 0,
        poolWeight: 0,
        totalStaked: 0,
        txHash: "",
        tradeExecuted: false,
        tradeSuccesful: false,
        txLink: null,
        loading: false,
        totalLpSupply: 0,
        token0PStaked: 0,
        token1PStaked: 0,
        token0TStaked: 0,
        token1TStaked: 0,
        unclaimedTotal: 0,
        transactionExecuted: false,
        totalStakedUI: null,
        monthly: 0,
        weekly: 0,
       // pool: 0
      }
    },
    methods: {
      setPool(value) {
        if (value == 'open') {
          this.$el.classList.remove('ring-1', 'ring-black', 'ring-opacity-5');
          this.$el.classList.add('row-span-3')
          this.$el.classList.add('ring-2', 'ring-inset', 'ring-oswapGreen');
          this.poolStatsOff = false
          this.poolStatsOn = true

          if (this.$el.offsetHeight < 420) {
            this.$el.classList.add('ensure-height');
          }
        }

        if (value == 'close') {
          this.$el.classList.remove('row-span-3');
          this.$el.classList.remove('ensure-height');
          this.$el.classList.remove('ring-2', 'ring-inset', 'ring-oswapGreen');

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