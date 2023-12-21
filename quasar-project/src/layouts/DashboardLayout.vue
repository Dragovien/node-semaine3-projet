<template>
  <q-layout view="lHh Lpr lff">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          Quasar App
        </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      bordered
      v-model="leftDrawerOpen"
      show-if-above
    >
      <q-list>
        <q-item-label
          header
        >
          Dashboard
        </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <q-page class="flex page">
        <router-view />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent} from 'vue'
import EssentialLink from 'components/EssentialLink.vue'

export default defineComponent({
  name: 'DashboardLayout',
  data() {
    return {
      essentialLinks: [
      {
        title: 'Produits',
        icon: 'inventory',
        link: '/dashboard/products'
      },
      {
        title: 'Login',
        icon: 'login',
        link: '/login'
      },
      {
        title: 'Dashboard',
        icon: 'dashboard',
        link: '/dashboard'
      },
    ],
    leftDrawerOpen: false
    }
  },
  components: {
    EssentialLink
  },
  methods: {
    toggleLeftDrawer() {
        this.leftDrawerOpen = !this.leftDrawerOpen
      }
  },
})
</script>

<style lang="sass" scoped>
.page
  flex-direction: column
  align-items: center
  width: 100%
  height: 100%
</style>
