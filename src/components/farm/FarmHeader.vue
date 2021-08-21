<template>
  <div class="flex w-full h-auto ss:mt-3 ss:mb-6 xs:mt-8 xs:mb-12">
    <div class="flex flex-col ss:w-full xs:w-auto mdd:flex-row bg-gradient-to-l from-slightGray dark:from-slightDark to-transparent p-3 rounded-3xl">

      <div class="flex flex-1 items-center">
        <Chart :poolName="data.chartData.name" :liquidity="data.chartData.liquidity" />
        <Total :TVL="data.TVL" :TAPR="data.APRs.tAPR" />
      </div>

      <div class="flex items-center mdd:divide-x mdd:divide-oswapGreen">
        <div class="mdd:flex hidden"></div>
        <Personal :TVL="data.PVL" :PAPR="data.APRs.pAPR" :REWARDS="data.rewardsPending" />
      </div>

    </div>
  </div>
</template>

<script>
  import Chart from "@/components/farm/FarmHeader/Chart";
  import Total from "@/components/farm/FarmHeader/Total";
  import Personal from "@/components/farm/FarmHeader/Personal";

  export default {
    name: 'FarmHeader',
    components: {
      Chart,
      Total,
      Personal
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