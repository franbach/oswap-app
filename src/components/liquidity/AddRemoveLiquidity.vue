<template>
  <div class="flex flex-col">
    <div class="flex flex-col p-4 bg-gray-200 dark:bg-gray-700 w-96 rounded-3xl shadow-lg ring-1 ring-black ring-opacity-5 h-auto">
      <div class="flex items-center space-x-2 mb-3">
        <i class="las la-tint text-xl dark:text-gray-400"></i>
        <p class="text-sm dark:text-gray-400">Liquidity</p>
      </div>
      <div class="flex flex-col space-y-1 dark:bg-gray-600 bg-gray-100 rounded-2xl">
        <div class="flex shadow-lg flex-col space-y-3 dark:bg-oswapDark-gray p-3 rounded-2xl">
          <LiquidityPair />
        </div>
        <LiquidityInfo />
      </div>
      <div class="grid grid-cols-2 pt-4">
        <button @click="toggleAdd" :class="addLiquidity ? 'bg-gray-100 dark:bg-gray-600 shadow-lg z-30' : 'bg-slightGray dark:bg-slightDark dark:hover:bg-gray-600 hover:bg-gray-100 z-10'" class="flex flex-1 items-center justify-center p-3 space-x-2 rounded-t-xl text-oswapGreen focus:outline-none">
          <p class="text-sm">Add Liquidity</p>
          <i class="las la-level-down-alt"></i>
        </button>
        <button @click="toggleRemove" :class="removeLiquidity ? 'bg-gray-100 dark:bg-gray-600 shadow-lg z-30' : 'bg-slightGray dark:bg-slightDark dark:hover:bg-gray-600 hover:bg-gray-100 z-10'" class="flex flex-1 items-center justify-center p-3 space-x-2 rounded-t-xl text-red-400 focus:outline-none">
          <p class="text-sm">Remove Liquidity</p>
          <i class="las la-level-up-alt"></i>
        </button>
      </div>

      <div v-if="addLiquidity"><AddLiquidity /></div>
      <div v-if="removeLiquidity"><RemoveLiquidity /></div>

      <div class="flex pt-4">
        <div class="flex w-full h-10 items-center">
          <LiquidityBackButton />
            <div class="flex flex-1 h-full space-x-2 justify-end">
              <div class="flex items-center w-28 h-full relative">
                <LiquidityApproveButton />
              </div>
              <div v-if="addLiquidity" class="flex items-center w-28 h-full relative">
                <LiquidityAddButton />
              </div>
              <div v-if="removeLiquidity" class="flex items-center w-28 h-full relative">
                <LiquidityRemoveButton />
              </div>
            </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import LiquidityPair from '@/components/liquidity/LiquidityPair';
  import LiquidityInfo from '@/components/liquidity/LiquidityInfo';
  import AddLiquidity from '@/components/liquidity/AddLiquidity';
  import RemoveLiquidity from '@/components/liquidity/RemoveLiquidity';
  import LiquidityBackButton from '@/components/liquidity/buttons/LiquidityBackButton';
  import LiquidityApproveButton from '@/components/liquidity/buttons/LiquidityApproveButton';
  import LiquidityAddButton from '@/components/liquidity/buttons/LiquidityAddButton';
  import LiquidityRemoveButton from '@/components/liquidity/buttons/LiquidityRemoveButton';

  import { mapGetters, mapActions } from 'vuex'

  export default {
    name: 'AddRemoveLiquidity',
    components: {
      LiquidityPair,
      LiquidityInfo,
      AddLiquidity,
      RemoveLiquidity,
      LiquidityBackButton,
      LiquidityApproveButton,
      LiquidityAddButton,
      LiquidityRemoveButton
    },
    data() {
      return {
        amount: '1',
        slippageRate: '0.5',
        warnings: {},
        addLiquidity: true,
        removeLiquidity: false
      }
    },
    mounted: async function() {},
    computed: {},
    methods: {
      ...mapGetters('exchange', ['getToken']),

      toggleAdd() {
        this.addLiquidity = !this.addLiquidity;
        this.removeLiquidity = false;
      },

      toggleRemove() {
        this.removeLiquidity = !this.removeLiquidity;
        this.addLiquidity = false;
      },

      setAmountOut(value){},

      setPriceImpact(value){
        this.priceImpact = value;
        if (this.priceImpact > 3) { 
          this.warnings['impact'] = 'Price impact high. Check reserves. Continue only if you know what you are doing.'
        } else { delete this.warnings['impact'] }
      },

      setAmount(value) {
        this.amount = value;
        if (this.amount !== '' && this.getBtnState({approve: 'approved'})) {
          //this.setBtnState({swap: 'swap'})
        }
      },

      setPath(value){
        this.path = value;
      },

      setSlippageRate(value){
        this.slippageRate = value;
      },
    }
  }
</script>