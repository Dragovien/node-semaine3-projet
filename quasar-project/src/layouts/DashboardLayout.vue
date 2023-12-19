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
      <router-view />
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
        icon: 'school',
        link: '/'
      },
      {
        title: 'Login',
        icon: 'code',
        link: '/login'
      },
      {
        title: 'Dashboard',
        icon: 'code',
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
