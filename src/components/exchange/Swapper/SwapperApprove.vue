<template>
  <!-- Approve disabled -->
  <transition tag="div" name="approve-btn" class="inline-block absolute right-20">
    <div v-if="state == 'disabled'" class="flex items-center border dark:border-gray-600 border-gray-300 space-x-1 p-2 pl-3 rounded-full group dark:bg-gray-700 bg-gray-200 select-none">
      <p class="text-sm text-gray-300 dark:text-gray-600">Approve</p>
      <i class="las la-times-circle text-xl text-gray-300 dark:text-gray-600"></i>
    </div>
  </transition>

  <!-- Approve Ready -->
  <transition tag="div" name="approve-btn" class="inline-block absolute right-20">
    <div v-if="state == 'ready'" class="flex items-center group border border-oswapGreen-dark dark:hover:bg-oswapGreen hover:bg-oswapGreen space-x-1 p-2 pl-3 rounded-full group dark:bg-gray-700 bg-gray-200 cursor-pointer">
      <p class="text-sm text-oswapGreen-dark group-hover:text-gray-50 dark:group-hover:text-oswapDark-gray">Approve</p>
      <i class="las la-pen-alt text-xl text-oswapGreen-dark group-hover:text-gray-50 dark:group-hover:text-oswapDark-gray"></i>
    </div>
  </transition>

  <!-- Approve Executing -->
  <transition tag="div" name="approve-btn" class="inline-block absolute right-20">
    <div v-if="state == 'executing'" class="flex items-center border border-oswapGreen-dark space-x-1 p-2 pl-3 rounded-full group dark:bg-gray-700 bg-gray-200 cursor-wait">
      <p class="text-sm text-oswapGreen-dark">Approve</p>
      <i class="las la-sync text-xl animate-spin text-oswapGreen-dark"></i>
    </div>
  </transition>

  <!-- Approve Executed -->
  <transition tag="div" name="approve-btn" class="inline-block absolute right-20">
    <div v-if="state == 'executed'" class="flex items-center border border-oswapGreen glow-oswapGreen-light-md space-x-1 p-2 pl-3 rounded-full dark:bg-oswapDark-gray bg-gray-100 cursor-default">
      <p class="text-sm text-oswapGreen">Approve</p>
      <i class="las la-check-circle text-xl text-oswapGreen"></i>
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