<template>
  <div class="grid grid-cols-3 gap-3 w-full ss:pt-0 xs:pt-6 pb-12">
    <FarmDetails :details="farmDetails" />

    <OtherDetails :details="otherDetails" />

    <RewardsDetails :details="totalRewards" />
  </div>
</template>

<script>
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
    props: {
      totalRewards: Number
    },
    mounted: function() {
      setInterval(
        async function() {
          this.$emit("updateData")
        }.bind(this), 5000
      )
    }
  }
</script>