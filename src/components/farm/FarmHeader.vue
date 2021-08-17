<template>
  <div class="grid grid-cols-3 st5 st5-all ss:divide-y ss:divide-x-0 md:divide-y-0 md:divide-x divide-gray-300 dark:divide-oswapDark-gray w-full ss:mt-6 ss:mb-6 xs:mt-12 xs:mb-12 rounded-3xl shadow-2xl bg-gray-100 dark:bg-slightDark">
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