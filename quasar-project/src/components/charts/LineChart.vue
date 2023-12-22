<template>
  <div>
    <!-- <LineChartJs class="lineChart" :data="lineChartData" :options="lineOptions" :plugins="linePlugins"/> -->
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'

// import ChartDataLabels from 'chartjs-plugin-datalabels'
import { Line as LineChartJs } from 'vue-chartjs'

export default defineComponent({
  name: 'LineChart',
  props: ['options', 'data'],
})
</script>

<style lang="sass" scoped>

</style>