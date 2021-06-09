<template>
  <transition name="swap" appear>
    <div class="flex flex-col p-4 bg-gray-200 dark:bg-gray-700 w-96 rounded-3xl shadow-lg ring-1 ring-black ring-opacity-5">
      <div class="flex mb-3">
        <p class="text-sm dark:text-gray-400">Swap</p>
      </div>
      <!-- Token1 Selection Button -->
      <SwapTokenSelect @click="selectToken('token1')" whichToken="token1" />
      <!-- Tokens Switch Button -->
      <SwapTokenSwitch />
      <!-- Token2 Selection Button -->
      <SwapTokenSelect @click="selectToken('token2')" whichToken="token2" />
      <!-- Reset tokens selection or Next -->
      <SwapTokenButtons />
    </div>
  </transition>
  <!-- Modal -->
  <SwapTokensModal :select="select" />
</template>

<script>
  import { mapGetters } from 'vuex';

  import SwapTokenSelect  from '@/components/exchange/Swap/SwapTokenSelect';
  import SwapTokenSwitch  from '@/components/exchange/Swap/SwapTokenSwitch';
  import SwapTokensModal  from '@/components/exchange/Swap/SwapTokensModal';
  import SwapTokenButtons from '@/components/exchange/Swap/SwapTokenButtons';

  export default {
    name: 'Swap',
    components: {
      SwapTokenSelect,
      SwapTokensModal,
      SwapTokenSwitch,
      SwapTokenButtons
    },
    data() {
      return {
        // Data to be sent to modal.
        select: {
          modal: false,
          token: ''
        }
      }
    },
    computed: {
      ...mapGetters('exchange', ['getStepState'])
    },
    methods: {
      // It opens the modal for token selection.
      // It sends info to the modal of which token is being
      // selected(token1 or token2) throug the :select binding.
      selectToken(token) {
        this.select.modal = !this.select.modal
        this.select.token = token
      }
    }
  }
</script>