<template>
  <!-- Approve disabled -->
  <transition tag="div" name="approve-btn" class="inline-block absolute">
    <div v-if="this.getBtnState({approve: 'disabled'})" class="flex w-28 justify-between items-center border dark:border-gray-600 border-gray-300 space-x-1 p-2 pl-3 rounded-full group dark:bg-gray-700 bg-gray-200 select-none">
      <div class="flex flex-1 items-center justify-center">
        <p class="text-sm text-gray-300 dark:text-gray-600">Approve</p>
      </div>
      <i class="las la-times-circle text-xl text-gray-300 dark:text-gray-600"></i>
    </div>
  </transition>

  <!-- Ready to Approve -->
  <transition tag="div" name="approve-btn" class="inline-block absolute">
    <div @click="approve()" v-if="this.getBtnState({approve: 'approve'})" class="flex w-28">
      <div class="grab-attention-glowing"></div>
      <div class="grab-attention cursor-pointer">
        <div class="flex flex-1 items-center justify-center">
          <p class="text-sm text-oswapGreen-dark dark:text-oswapGreen group-hover:text-gray-50 dark:group-hover:text-oswapDark-gray">Approve</p>
        </div>
        <i class="las la-pen-alt text-xl text-oswapGreen-dark dark:text-oswapGreen group-hover:text-gray-50 dark:group-hover:text-oswapDark-gray"></i>
      </div>
    </div>
  </transition>

  <!-- Approving -->
  <transition tag="div" name="approve-btn" class="inline-block absolute">
    <div v-if="this.getBtnState({approve: 'approving'})" class="flex w-28">
      <div class="grab-attention-glowing"></div>
      <div class="grab-attention cursor-wait">
        <div class="flex flex-1 items-center justify-center">
          <p class="text-sm text-oswapGreen-dark dark:text-oswapGreen group-hover:text-gray-50 dark:group-hover:text-oswapDark-gray">Approving</p>
        </div>
        <i class="las la-sync text-xl animate-spin text-oswapGreen-dark dark:text-oswapGreen group-hover:text-gray-50 dark:group-hover:text-oswapDark-gray"></i>
      </div>
    </div>
  </transition>

  <!-- Approved -->
  <transition tag="div" name="approve-btn" class="inline-block absolute">
    <div v-if="this.getBtnState({approve: 'approved'})" class="flex w-28 justify-between items-center border border-oswapGreen glow-oswapGreen-light-md space-x-1 p-2 pl-3 rounded-full dark:bg-oswapDark-gray bg-gray-100 cursor-default">
      <div class="flex flex-1 items-center justify-center">
        <p class="text-sm text-oswapGreen">Approved</p>
      </div>
      <i class="las la-check-circle text-xl text-oswapGreen"></i>
    </div> 
  </transition>
</template>

<script>

  import openswap from "@/shared/openswap.js";
  import { mapGetters, mapActions } from 'vuex';
  import { toastMe } from '@/components/toaster/toaster.js'

  export default {
    name: 'SwapperApprove',
    mixins: [openswap],
    props: {
      amount: String,
    },
    computed: {
      ...mapGetters('exchange/swapper', ['getBtnState'])
    },
    mounted: async function() {
      this.token1 = this.getToken()['token1'];

      if (this.token1.oneZeroxAddress == this.WONE()) {
        this.setBtnState({approve: 'approved'});
        this.setBtnState({swap: 'swap'});
      } else {
        this.setBtnState({approve: 'approving'});
        let routerAddr = this.UNIROUTERV2();
        let parsedInput = this.getUnits(this.amount, this.token1);
        let allowance = await this.checkAllowance(this.token1, this.amount, routerAddr);
        let isAllowanceSufficient = parsedInput.lt(allowance);

        if (isAllowanceSufficient) {
          this.setBtnState({approve: 'approved'});
          this.setBtnState({swap: 'swap'});
        } else {
          // Ready to approve (Pen Icon)
          this.setBtnState({approve: 'approve'});
          this.setBtnState({swap: 'disabled'});
        }
      }
    },
    methods: {
      ...mapGetters('exchange', ['getToken']),
      ...mapGetters('addressConstants', ['UNIROUTERV2', 'WONE']),
      ...mapActions('exchange/swapper', ['setBtnState', 'resetButton']),

      approve: async function(){
        this.token1 = this.getToken()['token1'];
        let routerAddr = this.UNIROUTERV2();
        this.setBtnState({approve: 'approving'})

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
          title: 'Tx Successful',
          msg: "Explore : " + transaction,
          link: true,
          href: `${explorer}${transaction}`
        })
        this.setBtnState({approve: 'approved'})
        this.setBtnState({swap: 'swap'});
      }

    }
  }
</script>