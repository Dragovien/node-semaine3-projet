<template>
  <div class="q-pa-md productPage">
    <q-tabs v-model="tab" dense class="text-grey" active-color="primary" indicator-color="primary" align="justify">
      <q-tab class="outerTab" name="products" label="Produits"
        :disable="admin && $route.name === 'AdminProductPage' ? null : true" />
      <q-tab class="outerTab" name="addProduct" label="Ajouter un produit"
        v-if="admin && $route.name === 'AdminProductPage'" />
    </q-tabs>

    <q-separator />

    <q-tab-panels v-model="tab" animated class="tabPanels">

      <q-tab-panel name="products" class="q-pa-none">

        <q-splitter v-model="splitterModel" class="splitter">

          <template v-slot:before>
            <q-tabs v-model="innerTab" vertical class="innerTabs text-teal">
              <q-tab name="wardrobes" icon="mdi-wardrobe-outline" label="Armoire" />
              <q-tab name="shelves" icon="mdi-bookshelf" label="Étagères" />
            </q-tabs>
          </template>

          <template v-slot:after>
            <q-tab-panels class="innerTabPanels" v-model="innerTab" animated transition-prev="slide-down"
              transition-next="slide-up">
              <q-tab-panel class="innerTabPanel" name="wardrobes">
                <div class="text-h4 text-center q-mb-lg">Armoires</div>
                <div class="itemCardWrapper" v-if="wardrobes.length > 0">
                  <q-card class="itemCard" v-for="wardrobe in wardrobes" :key="wardrobe">
                    <q-card-section class="closeCard">
                      <q-btn push color="red" size="10px" round icon="close" @click="deleteProduct(wardrobe)"
                        v-if="admin && $route.name === 'AdminProductPage'"></q-btn>
                    </q-card-section>
                    <q-card-section>
                      <p class="text-center text-h6">Nom: {{ wardrobe.name }}</p>
                    </q-card-section>
                    <q-card-section>
                      <div class="materials itemProperty">
                        Matériau(x):
                        <div>
                          <q-chip clickable ripple v-for="material in wardrobe.Materials" :key="material">{{ material.name
                          }}</q-chip>
                        </div>
                      </div>
                      <div class="itemProperty">
                        Prix: {{ wardrobe.price }} €
                      </div>
                    </q-card-section>
                  </q-card>
                </div>
                <p v-else class="noItem">Pas encore d'armoire à montrer</p>
              </q-tab-panel>

              <q-tab-panel class="innerTabPanel" name="shelves">
                <div class="text-h4 text-center q-mb-lg">Étagères</div>
                <div class="itemCardWrapper" v-if="wardrobes.length > 0">
                  <q-card class="itemCard" v-for="shelve in shelves" :key="shelve">
                    <q-card-section class="closeCard">
                      <q-btn push color="red" size="10px" round icon="close" @click="deleteProduct(shelve)"
                        v-if="admin && $route.name === 'AdminProductPage'"></q-btn>
                    </q-card-section>
                    <q-card-section>
                      <p class="text-center text-h6">Nom: {{ shelve.name }}</p>
                    </q-card-section>
                    <q-card-section>
                      <div class="materials itemProperty">
                        Matériau(x):
                        <div>
                          <q-chip v-for="material in shelve.Materials" :key="material">{{ material.name }}</q-chip>
                        </div>

                      </div>
                      <div class="itemProperty">
                        Prix: {{ shelve.price }} €
                      </div>
                    </q-card-section>
                  </q-card>
                </div>
                <p v-else class="noItem">Pas encore d'étagère à montrer</p>
              </q-tab-panel>

            </q-tab-panels>
          </template>

        </q-splitter>
      </q-tab-panel>

      <q-tab-panel name="addProduct" v-if="admin && $route.name === 'AdminProductPage'">

        <q-form @submit="createProduct">

          <p class="text-h5 text-center">Définir le produit</p>

          <q-input class="nameInput" type="text" standout v-model="name" label="Nom du produit" lazy-rules
            :rules="[val => val && val.length > 0 || 'Veuillez remplir ce champ']" ref="nameInput" />

          <q-select class="categorySelect" standout v-model="category" :options="categoryOptions"
            label="Catégorie du produit" />

          <q-input class="priceInput" mask="#.##" fill-mask="#" reverse-fill-mask standout v-model="price"
            label="Prix du produit" lazy-rules :rules="[val => val && val.length > 0 && !isNaN(val) || 'Veuillez remplir ce champ']"
            ref="priceInput">
            <template v-slot:append>
              <div>
                <q-icon name="euro"></q-icon>
              </div>
            </template>
          </q-input>

          <div>
            <p class="text-h6 text-center q-my-md">Composition du meuble</p>
            <div class="q-pa-md row q-col-gutter-sm">
              <q-tree class="col-12 col-sm-6" :nodes="simple" v-model:ticked="ticked" v-model:expanded="expanded"
                node-key="label" tick-strategy="leaf" default-expand-all />
              <div class="col-12 col-sm-6">

                <div class="text-h6 text-center q-my-md">Matériau(x) du meuble</div>
                <div class="flex column flex-center">
                  <div v-for="tick in ticked" :key="`ticked-${tick}`">
                    {{ tick }}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <q-btn class="productFormBtn" type="submit" label="Créer le produit"></q-btn>
        </q-form>
      </q-tab-panel>

    </q-tab-panels>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import productService from 'src/services/product.service.js'

export default defineComponent({
  name: 'ProductPage',
  props: ['admin'],
  data() {
    return {
      // penser à remettre à products
      tab: 'products',
      innerTab: 'wardrobes',
      splitterModel: 20,
      name: null,
      category: [],
      price: null,
      categoryOptions: ['Armoire', 'Étagère'],
      ticked: [],
      expanded: [],
      simple: [
        {
          label: 'Matériaux',
          children: [
            {
              label: 'Bois',
              children: [
                { label: 'Frêne', company: 'BBois' },
                { label: 'Chêne', company: 'BBois' },
                { label: 'Noyer', company: 'BBois' },
              ]
            },
            {
              label: 'Fer',
              children: [
                { label: 'Acier', company: 'MetaLo' },
                { label: 'Inox', company: 'MetaLo' },
                { label: 'Aluminium', company: 'MetaLo' },
              ]
            },
            {
              label: 'Plastique',
              company: 'pPlastique'
            }
          ]
        }
      ],
      products: [],
      shelves: [],
      wardrobes: []
    }
  },
  methods: {
    async createProduct() {
      try {
        if (this.category.length === 0) {
          return this.$q.notify({
            textColor: 'white',
            color: 'negative',
            message: 'Aucune catégorie sélectionnée',
            icon: 'report_problem',
            position: 'top'
          })
        }

        if (this.ticked.length === 0) {
          return this.$q.notify({
            textColor: 'white',
            color: 'negative',
            message: 'Aucun matériau sélectionné',
            icon: 'report_problem',
            position: 'top'
          })
        }

        let response = await productService.create({ name: this.name, category: this.category, material: this.ticked, price: this.price })

        if (response.status === 200) {
          this.ticked = []
          this.category = []
          this.name = null,
          this.price = null,
          this.$refs.nameInput.resetValidation()
          this.$refs.priceInput.resetValidation()
          this.getProducts()

          this.$q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'cloud_done',
            message: 'Produit ajouté',
            position: 'top'
          })
        }

      } catch (error) {
        console.log(error)
        this.$q.notify({
          textColor: 'white',
          color: 'negative',
          message: 'Erreur lors de l\'ajout du produit',
          icon: 'report_problem',
          position: 'top'
        })
      }
    },

    async deleteProduct(product) {
      try {

        let response = await productService.delete({ id: product.id })

        if (response.status === 200) {

          this.getProducts()

          this.$q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'cloud_done',
            message: 'Produit supprimé',
            position: 'top'
          })
        }

      } catch (error) {
        console.log(error)
        this.$q.notify({
          textColor: 'white',
          color: 'negative',
          message: 'Erreur lors de la suppression du produit',
          icon: 'report_problem',
          position: 'top'
        })
      }
    },

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
    }
  },
  async created() {
    this.getProducts()
  }
})
</script>

<style lang="sass" scoped>
.productPage
  min-width: 800px
  width: 100%
  max-width: 90%
  overflow: auto

:deep(.outerTab .q-tab__label)
  font-size: 2rem

.tabPanels
  width: 100%
  height: 100%
.splitter
  height: 75vh

:deep(.innerTabs .q-tabs__content)
  display: flex !important
  flex-direction: column

:deep(.q-tab)
  flex: 1

.nameInput, .categorySelect, .priceInput
  margin-top: 1rem

.productFormBtn
  display: block
  margin: 0 auto

.innerTabPanels 
  height: 100%

.innerTabPanel 
  display: flex
  flex-direction: column
  // justify-content: center
  // align-items: center
  height: 100%

.itemCardWrapper
  display: flex
  justify-content: center
  column-gap: 2rem
  row-gap: 2rem
  flex-wrap: wrap
  padding-bottom: 2rem


.itemCard
  width: 40%
  max-width: 300px
  border-radius: 20px 

.noItem 
  align-self: center

.materials
  display: flex
  align-items: center
  column-gap: 1rem
  flex-wrap: wrap

.itemProperty
  margin-bottom: 1rem
  

.categorySelect
  margin-bottom: 2rem

.closeCard
  display: flex
  justify-content: flex-end
  padding-bottom: 0


</style>