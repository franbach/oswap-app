<template>
  <!-- Approve disabled -->
  <transition tag="div" name="approve-btn" class="inline-block absolute">
    <div v-if="this.btnApprove == 'disabled'" class="flex w-28 h-9 justify-between items-center border dark:border-gray-600 border-gray-300 space-x-1 p-2 pl-3 rounded-full group dark:bg-gray-700 bg-gray-200 select-none">
      <div class="flex flex-1 items-center justify-center">
        <p class="text-sm text-gray-300 dark:text-gray-600">Approve</p>
      </div>
      <i class="las la-times-circle text-xl text-gray-300 dark:text-gray-600"></i>
    </div>
  </transition>

  <!-- Ready to Approve -->
  <transition tag="div" name="approve-btn" class="inline-block absolute">
    <div @click="approve()" v-if="this.btnApprove == 'approve'" class="flex w-28">
      <div class="grab-attention-glowing"></div>
      <div class="grab-attention cursor-pointer">
        <div class="flex flex-1 items-center justify-center">
          <p class="text-sm text-oswapGreen-dark dark:text-oswapGreen group-hover:text-gray-50 dark:group-hover:text-oswapDark-gray">Approve</p>
        </div>
        <i class="las la-pen-alt text-xl text-oswapGreen-dark dark:text-oswapGreen group-hover:text-gray-50  dark:group-hover:text-oswapDark-gray"></i>
      </div>
    </div>
  </transition> 

  <!-- Approving -->
  <transition tag="div" name="approve-btn" class="inline-block absolute">
    <div v-if="this.btnApprove == 'approving'" class="flex w-28">
      <div class="grab-attention-glowing"></div>
      <div class="grab-attention cursor-wait">
        <div class="flex flex-1 items-center justify-center">
          <p class="text-sm text-oswapGreen-dark dark:text-oswapGreen hover:text-white dark:group-hover:text-oswapDark-gray">Approving</p>
        </div>
        <i class="las la-sync text-xl animate-spin text-oswapGreen-dark dark:text-oswapGreen group-hover:text-gray-50 dark:group-hover:text-oswapDark-gray"></i>
      </div>
    </div>
  </transition>

  <!-- Approved -->
  <transition tag="div" name="approve-btn" class="inline-block absolute">
    <div v-if="this.btnApprove == 'approved'" class="flex w-28 justify-between items-center border border-oswapGreen glow-oswapGreen-light-md space-x-1 p-2 pl-3 rounded-full dark:bg-oswapDark-gray bg-gray-100 cursor-default">
      <div class="flex flex-1 items-center justify-center">
        <p class="text-sm text-oswapGreen ">Approved</p>
      </div>
      <i class="las la-check-circle text-xl text-oswapGreen"></i>
    </div> 
  </transition>
</template>

<script>

  import openswap from "@/shared/openswap.js";
  import { mapGetters } from 'vuex';
  import { toastMe } from '@/components/toaster/toaster.js'

  export default {
    name: 'farmApprove',
    mixins: [openswap],
    emits: ['tellStake'],
    props: {
      amount: String,
      pool: Object,
    },
    data() {
      return {
        btnApprove: 'disabled'
      }
    },
    mounted: async function() {
      var lpToken = {oneZeroxAddress: this.pool.pairaddress, Decimals: 18}
    
      this.btnApprove = 'approving';
      this.$emit('tellStake', 'executing');
      
      let masterchefAddr = this.oSWAPCHEF();
      console.log(masterchefAddr)
      let parsedInput = this.getUnits(this.amount, lpToken);
      console.log(parsedInput)
      let allowance = await this.checkAllowance(lpToken, masterchefAddr);
      let isAllowanceSufficient = parsedInput.lt(allowance);
      if (isAllowanceSufficient) {
        this.btnApprove = 'approved';
        this.$emit('tellStake', 'active');
      } else {
        // Ready to approve (Pen Icon)
        this.btnApprove = 'approve';
        this.$emit('tellStake', 'disabled');
      }
    },
    methods: {
      ...mapGetters('exchange', ['getToken']),
      ...mapGetters('addressConstants', ['oSWAPCHEF', 'WONE']),

      approve: async function(){
        var lpToken = {oneZeroxAddress: this.pool.pairaddress, Decimals: 18}
        let masterchefAddr = this.oSWAPCHEF();
        this.btnApprove = 'approving';

        let tx = await this.approveSpending(lpToken, masterchefAddr);
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
          title: 'Tx Successful',
          msg: "Explore : " + transaction,
          link: true,
          href: `${explorer}${transaction}`
        })
        this.btnApprove = 'approved';
        this.$emit('tellStake', 'active');
      }
    }
  }
</script>