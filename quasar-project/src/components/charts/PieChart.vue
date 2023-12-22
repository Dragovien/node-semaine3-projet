<template>
  <div>
    <Pie :data="data" :options="options" />
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js'
// import ChartDataLabels from 'chartjs-plugin-datalabels'
import { Pie } from 'vue-chartjs'
ChartJS.register(ArcElement, Tooltip, Legend, Title)

export default defineComponent({
  name: 'PieChart',
  props: ['options', 'data'],
  components: {
    Pie
  },
})
</script>

<style lang="sass" scoped>

</style>