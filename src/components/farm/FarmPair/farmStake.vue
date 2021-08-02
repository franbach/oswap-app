 <template>
  <transition tag="div" name="swap-btn" class="inline-block absolute">
    <div v-if="buttonState == 'disabled'" class="flex w-28 justify-between items-center border dark:border-gray-600 border-gray-300 space-x-1 p-2 pl-3 rounded-full group-scope dark:bg-gray-700 bg-gray-200 select-none">
      <div class="flex flex-1 items-center justify-center">
        <p class="text-sm text-gray-300 dark:text-gray-600">Stake</p>
      </div>
      <i class="las la-times-circle text-xl text-gray-300 dark:text-gray-600"></i>
    </div>
  </transition>

  <!-- Stake -->
  <transition tag="div" name="approve-btn" class="inline-block absolute">
    <div @click="stake()" v-if="buttonState == 'active'" class="flex w-22 group-scope">
      <div class="grab-attention-glowing"></div>
      <div class="grab-attention cursor-pointer">
        <div class="flex items-center justify-center">
          <p class="text-sm ml-5 text-oswapGreen-dark dark:text-oswapGreen group-scope-hover:text-gray-50 dark:group-scope-hover:text-oswapDark-gray">Stake</p>
        </div>
        <i class="las la-upload text-xl pr-5 text-oswapGreen-dark dark:text-oswapGreen group-scope-hover:text-gray-50 dark:group-scope-hover:text-oswapDark-gray"></i>
      </div>
    </div>
  </transition>

  <!-- Staking -->
  <transition tag="div" name="swap-btn" class="inline-block absolute">
    <div v-if="buttonState == 'executing'" class="flex w-22 group-scope">
      <div class="grab-attention-glowing"></div>
      <div class="grab-attention cursor-wait">
        <div class="flex flex-1 items-center justify-center">
          <p class="text-sm text-oswapGreen-dark dark:text-oswapGreen group-scope-hover:text-gray-50 dark:group-scope-hover:text-oswapDark-gray">Staking</p>
        </div>
        <i class="las la-sync text-xl animate-spin text-oswapGreen-dark dark:text-oswapGreen group-scope-hover:text-gray-50 dark:group-scope-hover:text-oswapDark-gray"></i>
      </div>
    </div>
  </transition>

  <!-- Staked -->
  <transition tag="div" name="approve-btn" class="inline-block absolute">
    <div v-if="buttonState == 'finished'" class="flex w-28 justify-between items-center border border-oswapGreen glow-oswapGreen-light-md space-x-1 p-2 pl-3 rounded-full dark:bg-oswapDark-gray bg-gray-100 cursor-default">
      <div class="flex flex-1 items-center justify-center">
        <p class="text-sm text-oswapGreen">Staked</p>
      </div>
      <i class="las la-check-circle text-xl text-oswapGreen"></i>
    </div> 
  </transition>
</template>

<script>

  import openswap from "@/shared/openswap.js";
  import { mapGetters } from 'vuex';

  export default {
    name: 'farmStake',
    mixins: [openswap],
    props: {
      amount: String,
      pool: Object,
      btnState: String
    },
    data() {
      return {
        buttonState: 'disabled'
      }
    },
    watch: {
      btnState() {
        this.buttonState = this.btnState;
      }
    },
    mounted: async function() {},
    methods: {
      ...mapGetters('exchange', ['getToken']),
      
      stake() {
        this.stakeLP(this.pool, this.amount);
      }
    }
  }
</script>