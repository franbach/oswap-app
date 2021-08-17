<template>
  <!-- Remove disabled -->
  <transition tag="div" name="approve-btn" class="inline-block absolute">
    <div v-if="this.getBtnState({remove: 'disabled'})" class="flex w-28 st5 st5-all justify-between items-center border dark:border-gray-600 border-gray-300 space-x-1 p-2 pl-3 rounded-full group dark:bg-gray-700 bg-gray-200 select-none">
      <div class="flex flex-1 items-center justify-center">
        <p class="text-sm text-gray-300 dark:text-gray-600">Remove</p>
      </div>
      <i class="las la-times-circle text-xl text-gray-300 dark:text-gray-600"></i>
    </div>
  </transition>

  <!-- Ready to Remove -->
  <transition tag="div" name="approve-btn" class="inline-block absolute">
    <div @click="executeRemoveLiquidity" v-if="this.getBtnState({remove: 'remove'})" class="flex w-28 group">
      <div class="grab-attention-glowing"></div>
      <div class="grab-attention cursor-pointer st5">
        <div class="flex flex-1 items-center justify-center">
          <p class="text-sm text-oswapGreen-dark dark:text-oswapGreen group-hover:text-gray-50 dark:group-hover:text-oswapDark-gray">Remove</p>
        </div>
        <i class="las la-minus text-xl text-oswapGreen-dark dark:text-oswapGreen group-hover:text-gray-50 dark:group-hover:text-oswapDark-gray"></i>
      </div>
    </div>
  </transition>

  <!-- Removing -->
  <transition tag="div" name="approve-btn" class="inline-block absolute">
    <div v-if="this.getBtnState({remove: 'removing'})" class="flex w-28 group">
      <div class="grab-attention-glowing"></div>
      <div class="grab-attention cursor-wait st5">
        <div class="flex flex-1 items-center justify-center">
          <p class="text-sm text-oswapGreen-dark dark:text-oswapGreen group-hover:text-gray-50 dark:group-hover:text-oswapDark-gray">Removing</p>
        </div>
        <i class="las la-sync text-xl animate-spin text-oswapGreen-dark dark:text-oswapGreen group-hover:text-gray-50 dark:group-hover:text-oswapDark-gray"></i>
      </div>
    </div>
  </transition>

  <!-- Removed -->
  <transition tag="div" name="approve-btn" class="inline-block absolute">
    <div v-if="this.getBtnState({remove: 'removed'})" class="flex w-28 st5 justify-between items-center border border-oswapGreen glow-oswapGreen-light-md space-x-1 p-2 pl-3 rounded-full dark:bg-oswapDark-gray bg-gray-100 cursor-default">
      <div class="flex flex-1 items-center justify-center">
        <p class="text-sm text-oswapGreen">Removed</p>
      </div>
      <i class="las la-check-circle text-xl text-oswapGreen"></i>
    </div> 
  </transition>
</template>

<script>

  import { mapGetters, mapActions } from 'vuex'

  export default {
    name: 'LiquidityRemoveButton',
    props: {
      amount: String,
    },
    mounted: async function() {
      this.setBtnState({remove: 'remove'})
    },
    
    computed: {
      ...mapGetters('liquidity/buttons', ['getBtnState']),
    },
    
    methods: {
      ...mapGetters('exchange', ['getToken']),      
      ...mapActions('liquidity/buttons', ['setBtnState']),

      executeRemoveLiquidity: async function() {
        this.$emit('executeRemoveLiquidity')
      }
    }
  }
</script>