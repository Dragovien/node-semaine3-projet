<template>
  <div>
    <Bar class="barChart" :data="data" :options="options"/>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
// import ChartDataLabels from 'chartjs-plugin-datalabels'
import { Bar } from 'vue-chartjs'
ChartJS.register(Tooltip, Legend, Title, BarElement, CategoryScale, LinearScale)

export default defineComponent({
  name: 'BarChart',
  props: ['options', 'data'],
  components: {
    Bar
  },
})
</script>

<style lang="sass" scoped>
.barChart
  height: 100%
</style>