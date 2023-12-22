<template>
  <div class="q-pa-md dashboardWrapper">
    <p class="text-h3 text-center">Dashboard</p>
    <q-btn class="addStatBtn" color="blue" label="Ajouter des statistiques">
      <q-menu>
        <q-list>
          <q-item :clickable="!menuOptionsDisabled[0]" :disabled="menuOptionsDisabled[0]" ripple class="addStatOption"
            @click="getFurnitureTypeChart">
            Meubles par type de meuble
          </q-item>
          <q-item :clickable="!menuOptionsDisabled[1]" :disabled="menuOptionsDisabled[1]" ripple class="addStatOption"
            @click="getMaterialCategoryChart">
            Meubles par catégorie de matériaux
          </q-item>
          <q-item :clickable="!menuOptionsDisabled[2]" :disabled="menuOptionsDisabled[2]" ripple class="addStatOption"
            @click="getMaterialTypeChart">
            Meubles par type de matériaux
          </q-item>

          <!-- possible d'en rajouter d'autre -->

          <!-- <q-item :clickable="!menuOptionsDisabled[3]" :disabled="menuOptionsDisabled[3]" ripple class="addStatOption">
            Meubles par prix
          </q-item> -->
        </q-list>
      </q-menu>
    </q-btn>
    <div class="statCardWrapper">

      <q-card class="basicStatCard" bordered>
        <q-card-section horizontal>
          <q-card-section class="halfCard">
            <p class="sectionTitle text-center">Utilisateurs</p>

            <p class="text">Nombre: {{ products.length }}</p>
            <q-btn color="primary" @click="$router.push('/dashboard/manageAccounts')">Voir les utilisateurs</q-btn>

          </q-card-section>

          <q-separator vertical />

          <q-card-section class="halfCard">
            <p class="sectionTitle text-center">Produits</p>

            <p class="text">Nombre: {{ users.length }}</p>
            <q-btn color="primary" @click="$router.push('/dashboard/products')">Voir les produits</q-btn>

          </q-card-section>
        </q-card-section>

      </q-card>

      <q-card class="chartCard" bordered v-for="chart in activeCharts" charts :key="chart">
        <q-card-section class="furnitureChartSection" v-if="chart.chart === 'furnitureType'">
          <q-btn class="chartCloseBtn" color="red" size="10px" icon="close" @click="deleteChart('furnitureType')"></q-btn>
          <PieChart :options="chart.options" :data="chart.data" />
        </q-card-section>

        <q-card-section class="furnitureChartSection" v-if="chart.chart === 'materialCategory'">
          <q-btn class="chartCloseBtn" color="red" size="10px" icon="close" @click="deleteChart('materialCategory')"></q-btn>
          <BarChart :options="chart.options" :data="chart.data" />
        </q-card-section>

        <q-card-section class="furnitureChartSection" v-if="chart.chart === 'materialType'">
          <q-btn class="chartCloseBtn" color="red" size="10px" icon="close" @click="deleteChart('materialType')"></q-btn>
          <BarChart :options="chart.options" :data="chart.data" />
        </q-card-section>
      </q-card>

    </div>


  </div>
</template>

<script>
import { defineComponent } from 'vue'
import userService from 'src/services/user.service.js';
import productService from 'src/services/product.service';
import PieChart from 'src/components/charts/PieChart.vue';
import BarChart from 'src/components/charts/BarChart.vue';
import { useGlobalStore } from 'src/stores/globalStore.js';
const globalStore = useGlobalStore()

export default defineComponent({
  name: 'DashboardPage',
  components: {
    PieChart,
    BarChart
  },
  data() {
    return {
      products: [],
      wardrobes: [],
      shelves: [],
      users: [],
      furniturePerMaterialCategory: {
        wood: [],
        iron: [],
        plastic: [],
      },
      furniturePerMaterialType: {
        oak: [],
        ash: [],
        walnut: [],
        steel: [],
        stainlessSteel: [],
        aluminium: [],
        plastic: []
      },
      activeCharts: [],
      menuOptionsDisabled: [null, null, null, null]
    }
  },
  methods: {
    async getProducts() {
      let response = await productService.getAll()
      if (response.status === 200) {
        this.products = response.data
        this.wardrobes = response.data.filter(product => product.category === 'Armoire')
        this.shelves = response.data.filter(product => product.category === 'Étagère')

        this.products.map((product) => {
          product.Materials.map((material) => {
            switch (material.category) {
              case 'Bois': {
                this.furniturePerMaterialCategory.wood.push(product)
                break
              }
              case 'Fer': {
                this.furniturePerMaterialCategory.iron.push(product)
                break
              }
              case 'Plastique': {
                this.furniturePerMaterialCategory.plastic.push(product)
                break
              }
            }

            switch (material.name) {
              case 'Chêne':
                this.furniturePerMaterialType.oak.push(product)
                break
              case 'Frêne':
                this.furniturePerMaterialType.ash.push(product)
                break
              case 'Noyer':
                this.furniturePerMaterialType.walnut.push(product)
                break
              case 'Acier':
                this.furniturePerMaterialType.steel.push(product)
                break
              case 'Inox':
                this.furniturePerMaterialType.stainlessSteel.push(product)
                break
              case 'Aluminium':
                this.furniturePerMaterialType.aluminium.push(product)
                break
              case 'Plastique':
                this.furniturePerMaterialType.plastic.push(product)
                break
            }
          })
        })

      } else {
        this.$q.notify({
          textColor: 'white',
          color: 'negative',
          message: 'Erreur lors de la récupération des produits',
          icon: 'report_problem',
          position: 'top'
        })
      }
    },

    async getUsers() {
      try {
        this.user = null
        let response = await userService.getAll()
        if (response.status === 200) {
          this.users = response.data
          console.log('users', this.users)
        }
      } catch (error) {
        console.log(error)
        this.$q.notify({
          textColor: 'white',
          color: 'negative',
          message: 'Erreur lors de la récupération des utilisateurs',
          icon: 'report_problem',
          position: 'top'
        })
      }
    },

    getFurnitureTypeChart() {
      this.activeCharts.push({
        chart: 'furnitureType',
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              text: 'Nombre de meubles selon leur type',
              font: {
                size: 20
              }
            }
          }
        },
        data: {
          labels: ['Armoires', 'Étagères'],
          datasets: [
            {
              backgroundColor: ['#8df7af', '#e696fa'],
              data: [this.wardrobes.length, this.shelves.length]
            }
          ]
        }
      })
      globalStore.activeCharts = this.activeCharts
      this.menuOptionsDisabled[0] = true
    },

    getMaterialCategoryChart() {
      const categoryCounts = Object.values(this.furniturePerMaterialCategory).map(category => category.length);

      this.activeCharts.push({
        chart: 'materialCategory',
        options: {
          responsive: true,
          maintainAspectRatio: true,
          plugins: {
            title: {
              display: true,
              text: 'Nombre de meubles par catégorie de matériaux',
              font: {
                size: 20
              }
            },
          }
        },
        data: {
          labels: ['Bois', 'Fer', 'Plastique'],
          datasets: [
            {
              label: 'Catégorie de matériaux',
              backgroundColor: ['#756653', '#c0c2c2', '#750627'],
              data: categoryCounts
            }
          ]
        }
      })
      globalStore.activeCharts = this.activeCharts
      this.menuOptionsDisabled[1] = true

    },

    getMaterialTypeChart() {
      const typeCounts = Object.values(this.furniturePerMaterialType).map(type => type.length);
      console.log(typeCounts)

      this.activeCharts.push({
        chart: 'materialCategory',
        options: {
          responsive: true,
          maintainAspectRatio: true,
          plugins: {
            title: {
              display: true,
              text: 'Nombre de meubles par type de matériaux',
              font: {
                size: 20
              }
            },
          }
        },
        data: {
          labels: ['Chêne', 'Frêne', 'Noyer', 'Acier', 'Inox', 'Aluminium', 'Plastique'],
          datasets: [
            {
              label: 'Type de matériaux',
              backgroundColor: ['#756653', '#755b3b', '#704816', '#c0c2c2', '#8d8f8f', '#575959', '#750627'],
              data: typeCounts
            }
          ]
        }
      })

      globalStore.activeCharts = this.activeCharts
      this.menuOptionsDisabled[2] = true
    },

    deleteChart(type) {
      const index = this.activeCharts.findIndex(chart => chart.chart === type);
      if (index !== -1) {
        // Remove the chart from the array using splice
        this.activeCharts.splice(index, 1);
        console.log(`${type} chart deleted.`);
      } else {
        console.log(`${type} chart not found.`);
      }
      globalStore.activeCharts = this.activeCharts
    }
  },
  created() {
    this.getProducts()
    this.getUsers()
    this.activeCharts = globalStore.activeCharts
    // globalStore.activeCharts = []
  },
  mounted() {
    console.log(globalStore.activeCharts)
  }
})
</script>

<style lang="sass" scoped>
.dashboardWrapper
  width: 100%
  flex: 1
  display: flex
  flex-direction: column
  justify-content: center
  row-gap: 2rem

.addStatOption
  align-items: center

.basicStatCard
  width: 40%
  height: fit-content

.addStatBtn
  max-width: 200px
  align-self: flex-end

.statCardWrapper
  display: flex
  flex: 1
  flex-wrap: wrap
  justify-content: space-between
  row-gap: 2rem

.halfCard
  width: 50%
  display: flex
  justify-content: center
  align-items: center
  flex-direction: column
  row-gap: 1rem

.sectionTitle
  font-size: 1.5rem

.text 
  font-size: 1.25rem

.chartCard
  height: 400px
  width: 48%

:nth-child(1 of .chartCard)
  flex: 1
  margin-left: 1rem


</style>
