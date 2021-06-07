<template>

    <div class="flex flex-col p-4 bg-gray-200 dark:bg-gray-700 w-96 rounded-2xl shadow-lg ring-1 ring-black ring-opacity-5">
      
      <div class="flex mb-3">
        <p class="text-sm dark:text-gray-400">Rewards</p>
      </div>
      <div class="flex justify-between">
        <p class="text-sm dark:text-gray-400 p-3">Current Rewards {{unclaimedTotal}}         
        </p>
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md shadow" @click="this.getAllRewards()">Collect</button>
      </div>
       
               
    </div>

</template>

<script>
  import openswap from "../../../shared/openswap.js";

  export default {
    name: 'Collect',
    components: {
    },
    mixins: [openswap],
    mounted: async function (){
      this.getAllRewards();
      await setInterval(
        async function() {
          this.getAllRewards();
        }.bind(this),
        10000
      );
    },
    data() {
      return {
        unclaimedTotal: 0
      }
    },
    methods: {
    }
  }
</script>