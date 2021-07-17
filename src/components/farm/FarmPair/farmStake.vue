 <template>

 <transition tag="div" name="swap-btn" class="inline-block absolute">
    <div v-if="this.getBtnState({stake: 'disabled'})" class="flex w-28 justify-between items-center border dark:border-gray-600 border-gray-300 space-x-1 p-2 pl-3 rounded-full group dark:bg-gray-700 bg-gray-200 select-none">
      <div class="flex flex-1 items-center justify-center">
        <p class="text-sm text-gray-300 dark:text-gray-600">Stake</p>
      </div>
      <i class="las la-times-circle text-xl text-gray-300 dark:text-gray-600"></i>
    </div>
  </transition>

  <!-- Swap -->
  <transition tag="div" name="approve-btn" class="inline-block absolute">
    <div @click="this.stakeLP(this.pool, this.amount)" v-if="this.getBtnState({stake: 'active'})" class="flex w-22">
      <div class="grab-attention-glowing"></div>
      <div class="grab-attention cursor-pointer">
        <div class="flex items-center justify-center">
          <p class="text-sm ml-5 text-oswapGreen-dark dark:text-oswapGreen group-hover:text-gray-50 dark:group-hover:text-oswapDark-gray">Stake</p>
        </div>
        <i class="las la-upload text-xl pr-5 text-oswapGreen-dark dark:text-oswapGreen group-hover:text-gray-50 dark:group-hover:text-oswapDark-gray"></i>
      </div>
    </div>
  </transition>

  <!-- Swapping -->
  <transition tag="div" name="swap-btn" class="inline-block absolute">
    <div v-if="this.getBtnState({stake: 'executing'})" class="flex w-22">
      <div class="grab-attention-glowing"></div>
      <div class="grab-attention cursor-wait">
        <div class="flex flex-1 items-center justify-center">
          <p class="text-sm text-oswapGreen-dark dark:text-oswapGreen group-hover:text-gray-50 dark:group-hover:text-oswapDark-gray">Staking</p>
        </div>
        <i class="las la-sync text-xl animate-spin text-oswapGreen-dark dark:text-oswapGreen group-hover:text-gray-50 dark:group-hover:text-oswapDark-gray"></i>
      </div>
    </div>
  </transition>

  <!-- Swapped -->
  <transition tag="div" name="approve-btn" class="inline-block absolute">
    <div v-if="this.getBtnState({stake: 'finished'})" class="flex w-28 justify-between items-center border border-oswapGreen glow-oswapGreen-light-md space-x-1 p-2 pl-3 rounded-full dark:bg-oswapDark-gray bg-gray-100 cursor-default">
      <div class="flex flex-1 items-center justify-center">
        <p class="text-sm text-oswapGreen">Staked</p>
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
    name: 'farmStake',
    mixins: [openswap],
    props: {
      amount: String,
      pool: Object,
    },
    computed: {
      ...mapGetters('exchange/farm', ['getBtnState'])
    },
    mounted: async function() {
        
      
      
        this.setBtnState({stake: 'executing'});
      
    },
    methods: {
      ...mapGetters('exchange', ['getToken']),
      ...mapGetters('addressConstants', ['oSWAPCHEF', 'WONE']),
      ...mapActions('exchange/farm', ['setBtnState', 'resetButton']),
    }
  }
</script>