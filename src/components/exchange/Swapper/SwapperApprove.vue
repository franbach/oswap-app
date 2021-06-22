<template>
  <!-- Approve Ready -->
  <transition tag="div" name="approve-btn" class="absolute right-0">
    <div v-if="approveState == 'active'" @click="approve()" class="flex items-center border group dark:hover:bg-oswapGreen hover:bg-oswapGreen border-oswapGreen glow-oswapGreen-light-md space-x-1 p-2 pl-3 rounded-full group dark:bg-oswapDark-gray bg-gray-100 cursor-pointer">
      <p class="text-sm text-oswapGreen group-hover:text-gray-50 dark:group-hover:text-oswapDark-gray">Click to Approve</p>
      <i class="las la-check-circle text-xl text-oswapGreen group-hover:text-gray-50 dark:group-hover:text-oswapDark-gray"></i>
    </div> 
  </transition>

  <!-- Approve Loading -->
  <transition tag="div" name="approve-btn" class="absolute right-0">
    <div v-if="approveState == 'loading'" class="flex items-center border border-oswapGreen-dark space-x-1 p-2 pl-3 rounded-full group dark:bg-gray-700 bg-gray-200 cursor-wait">
      <p class="text-sm text-oswapGreen-dark">Approving</p>
      <i class="las la-sync text-xl animate-spin text-oswapGreen-dark"></i>
    </div>
  </transition>

  <!-- Approve disabled -->
  <transition tag="div" name="approve-btn" class="absolute right-0">
    <div v-if="approveState == 'disabled'" class="flex items-center border dark:border-gray-600 border-gray-600 space-x-1 p-2 pl-3 rounded-full group dark:bg-gray-700 bg-gray-200 select-none">
      <p class="text-sm text-gray-600 dark:text-gray-900">Approved</p>
      <i class="las la-check-circle text-xl text-gray-900 dark:text-gray-900"></i>
    </div>
  </transition>
</template>

<script>

  import openswap from "@/shared/openswap.js";
  import { mapGetters } from 'vuex';
  import { toastMe } from '@/components/toaster/toaster.js'

  export default {
    name: 'SwapperApprove',
    mixins: [openswap],
    props: {
      amount: String,
    },
    data() {
      return {
        approveState: 'disabled'
      }
    },
    mounted: async function() {
      this.token1 = this.getToken()['token1'];
      if (this.token1.oneZeroxAddress == this.WONE()) {
        this.approveState = 'disabled'
      }else {
        this.approveState = 'loading'
        let routerAddr = this.UNIROUTERV2();
        let parsedInput = this.getUnits(this.amount, this.token1)
        let allowance = await this.checkAllowance(this.token1, this.amount, routerAddr);
        let isAllowanceSufficient = parsedInput.lt(allowance);
        if(isAllowanceSufficient){
          this.approveState = 'disabled'
        }else{
          this.approveState = 'active'
        }
      }
    },
    methods: {
      ...mapGetters('exchange', ['getToken']),
      ...mapGetters('addressConstants', ['UNIROUTERV2', 'WONE']),

      approve: async function(){
        this.token1 = this.getToken()['token1'];
        let routerAddr = this.UNIROUTERV2();
        this.approveState = 'loading'

        let tx = await this.approveSpending(this.token1, routerAddr);
        let explorer = 'https://explorer.harmony.one/#/tx/'
        let transaction = tx.hash

        toastMe('info', {
            title: 'Transaction Sent',
            msg: "Approval Sent to network. Waiting for confirmation",
            link: false,
            href: `${explorer}${transaction}`
          })
        await tx.wait(1)
        toastMe('success', {
            title: 'Tx Succesfull',
            msg: "Explore : " + transaction,
            link: true,
            href: `${explorer}${transaction}`
          })
        this.approveState = 'disabled'

      }
    }
  }
</script>