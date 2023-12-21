<template>
  <div class="q-pa-md">
    <p class="text-h3 text-center">Dashboard</p>
    <q-btn color="blue">Ajouter des statistiques</q-btn>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import userService from 'src/services/user.service.js';
import productService from 'src/services/product.service';

export default defineComponent({
  name: 'DashboardPage',
  data() {
    return {
      products: [],
      wardrobes: [],
      shelves: [],
      users: []
    }
  },
  methods: {
    async getProducts() {
      let response = await productService.getAll()
      if (response.status === 200) {
        this.products = response.data
        this.wardrobes = response.data.filter(product => product.category === 'Armoire')
        this.shelves = response.data.filter(product => product.category === 'Étagère')
        console.log(this.wardrobes)
        console.log(this.shelves)
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
          console.log(this.users)
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
  },
  created() {
    this.getProducts()
    this.getUsers()
  },
  mounted() {
  
  }
})
</script>

<style lang="sass" scoped>

</style>
