<template>
  <!-- Approve disabled -->
  <transition tag="div" name="approve-btn" class="inline-block absolute">
    <div v-if="this.getBtnState({approve: 'disabled'})" class="flex w-28 st5 justify-between items-center border dark:border-gray-600 border-gray-300 space-x-1 p-2 pl-3 rounded-full group dark:bg-gray-700 bg-gray-200 select-none">
      <div class="flex flex-1 items-center justify-center">
        <p class="text-sm text-gray-300 dark:text-gray-600">Approve</p>
      </div>
      <i class="las la-times-circle text-xl text-gray-300 dark:text-gray-600"></i>
    </div>
  </transition>

  <!-- Ready to Approve -->
  <transition tag="div" name="approve-btn" class="inline-block absolute">
    <div @click="approve()" v-if="this.getBtnState({approve: 'approve'})" class="flex w-28 group">
      <div class="grab-attention-glowing"></div>
      <div class="grab-attention cursor-pointer st5">
        <div class="flex flex-1 items-center justify-center">
          <p class="text-sm text-oswapGreen-dark dark:text-oswapGreen group-hover:text-gray-50 dark:group-hover:text-oswapDark-gray">Approve</p>
        </div>
        <i class="las la-pen-alt text-xl text-oswapGreen-dark dark:text-oswapGreen group-hover:text-gray-50 dark:group-hover:text-oswapDark-gray"></i>
      </div>
    </div>
  </transition>

  <!-- Approving -->
  <transition tag="div" name="approve-btn" class="inline-block absolute">
    <div v-if="this.getBtnState({approve: 'approving'})" class="flex w-28 group">
      <div class="grab-attention-glowing"></div>
      <div class="grab-attention cursor-wait st5">
        <div class="flex flex-1 items-center justify-center">
          <p class="text-sm text-oswapGreen-dark dark:text-oswapGreen group-hover:text-gray-50 dark:group-hover:text-oswapDark-gray">Approving</p>
        </div>
        <i class="las la-sync text-xl animate-spin text-oswapGreen-dark dark:text-oswapGreen group-hover:text-gray-50 dark:group-hover:text-oswapDark-gray"></i>
      </div>
    </div>
  </transition>

  <!-- Approved -->
  <transition tag="div" name="approve-btn" class="inline-block absolute">
    <div v-if="this.getBtnState({approve: 'approved'})" class="flex st5 w-28 justify-between items-center border border-oswapGreen glow-oswapGreen-light-md space-x-1 p-2 pl-3 rounded-full dark:bg-oswapDark-gray bg-gray-100 cursor-default">
      <div class="flex flex-1 items-center justify-center">
        <p class="text-sm text-oswapGreen">Approved</p>
      </div>
      <i class="las la-check-circle text-xl text-oswapGreen"></i>
    </div> 
  </transition>
</template>

<script>

  import { mapGetters, mapActions } from 'vuex'
  import openswap from "@/shared/openswap.js"
  import { toastMe } from '@/components/toaster/toaster.js';
  export default {
    name: 'LiquidityApproveButton',
    mixins: [openswap],
    props: {
      amount: String,
      token0Approved: Boolean,
      token: Object
    },
    mounted: async function() {
      if (this.token.oneZeroxAddress == this.WONE(this.getChainID())) {
        this.setBtnState({approve: 'approved'});
        this.setBtnState({remove: 'remove'});
        this.$emit("set0approved", true);
        
      } else {
        this.setBtnState({approve: 'approving'});
        this.setBtnState({add: 'disabled'});
        this.setBtnState({remove: 'disabled'});
        let routerAddr = this.UNIROUTERV2(this.getChainID());
        console.log(routerAddr)
        let parsedInput = this.getUnits(this.amount, this.token);
        let allowance = await this.checkAllowance(this.token, routerAddr);
        let isAllowanceSufficient = parsedInput.lt(allowance);

        if (isAllowanceSufficient) {
          
          this.setBtnState({approve: 'approved'});
          this.setBtnState({remove: 'remove'});
          
          this.$emit("set0approved", true);

        } else {
          // Ready to approve (Pen Icon)
          this.setBtnState({add: 'disabled'});
          this.setBtnState({remove: 'disabled'});
          this.setBtnState({approve: 'approve'});
        }

        

      }
      if(this.token0Approved || this.getBtnState({approve: 'approved'})){   
            this.setBtnState({add: 'add'})
            this.setBtnState({remove: 'remove'});  
      }
      if(this.getBtnState({approve: 'approve'})){
          this.setBtnState({add: 'disabled'})
          this.setBtnState({remove: 'disabled'});
      }
    },
    
    computed: {
      ...mapGetters('liquidity/buttons', ['getBtnState']),
      ...mapGetters('addressConstants', ['UNIROUTERV2', 'WONE']),
    },
    
    methods: {   
    ...mapGetters('wallet', ['getChainID']),  
      ...mapActions('liquidity/buttons', ['setBtnState']),
      ...mapGetters('liquidity/buttons', ['getBtnState']),
       ...mapGetters('liquidity/amounts', ['getToken0Amount','getToken1Amount']),
      
      approve: async function(){
        let routerAddr = this.UNIROUTERV2(this.getChainID());
        this.setBtnState({approve: 'approving'})

        await this.approveSpending(this.token, routerAddr).catch(error => {
          this.setBtnState({approve: 'approve'})
        })
       
        this.setBtnState({approve: 'approved'})
        if(this.token0Approved || this.getBtnState({approve: 'approved'})){   
            this.setBtnState({add: 'add'})   
            this.setBtnState({remove: 'remove'}); 
      }
        this.$emit("set0approved", true);

      }
    }
  }
</script>