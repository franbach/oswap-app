<template>
  <div class="flex w-full h-auto ss:mt-3 ss:mb-6 xs:mt-8 xs:mb-12">
    <div class="grid grid-cols-3 gap-3 w-full">

      <div class="flex flex-1 items-start">
        <Total :TVL="data.TVL" :TAPR="data.APRs.tAPR" />
      </div>

      <div class="flex flex-1 items-start">
        <Personal :TVL="data.PVL" :PAPR="data.APRs.pAPR" :REWARDS="data.rewardsPending" />
      </div>

      <div class="flex flex-1 items-start">
        <StakingInfo />
      </div>

    </div>
  </div>
</template>

<script>
  import Chart from "@/components/farm/FarmHeader/Chart";
  import Total from "@/components/farm/FarmHeader/Total";
  import Personal from "@/components/farm/FarmHeader/Personal";
  import StakingInfo from "@/components/farm/FarmHeader/StakingInfo"

  export default {
    name: 'FarmHeader',
    components: {
      Chart,
      Total,
      Personal,
      StakingInfo
    },
    props: {
      data: Object,
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