<template>
  <div class="grid grid-cols-3 gap-3 w-full ss:pt-0 xs:pt-6 pb-12">
    <FarmDetails :details="farmDetails" />

    <OtherDetails :details="otherDetails" />

    <RewardsDetails :details="unclaimedTotal" />
  </div>
</template>

<script>
  import openswap from "@/shared/openswap.js";
  import FarmDetails from "@/components/farm/FarmHeader/FarmDetails";
  import OtherDetails from "@/components/farm/FarmHeader/OtherDetails";
  import RewardsDetails from "@/components/farm/FarmHeader/RewardsDetails";

  export default {
    name: 'FarmHeader',
    components: {
      FarmDetails,
      OtherDetails,
      RewardsDetails
    },
    mixins: [openswap],
    props: {
      totalRewards: Number
    },
    data() {
      return {
        unclaimedTotal: '0.0',
      }
    },
    mounted: function() {
     this.getAmounts();
    },
    methods: {
      getAmounts: async function (){
       await setTimeout(async function (){
         this.unclaimedTotal = this.totalRewards
          await setInterval(
            async function() {
              this.unclaimedTotal = this.totalRewards
            }.bind(this),
            10000
          );
        }.bind(this), 2500);
      }
    }
  }
</script>