<template>
  <div class="grid grid-cols-3 st5 w-full ss:mt-3 ss:mb-6 xs:mt-8 xs:mb-12">
    <div class="flex col-span-2 bg-slightGray dark:bg-slightDark p-3 rounded-3xl shadow-2xl">
      <Chart :poolName="data.chartData.name" :liquidity="data.chartData.liquidity" />
      <div class="flex w-full ml-3 items-center divide-x divide-oswapGreen">
        <Total :TVL="data.TVL" :TAPR="data.APRs.tAPR" />
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