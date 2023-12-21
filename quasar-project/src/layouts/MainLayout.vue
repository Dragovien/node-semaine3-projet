<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          Au beaux meubles
        </q-toolbar-title>

        <q-btn size="sm" round color="black" text-color="white" icon="login" @click="$router.push('/login')">
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" bordered>
      <q-list>
        <q-item-label header>
          Navigation
        </q-item-label>

        <EssentialLink v-for="link in essentialLinks" :key="link.title" v-bind="link" />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent} from 'vue'
import EssentialLink from 'src/components/EssentialLink.vue'

export default defineComponent({
  name: 'MainLayout',
  data() {
    return {
      essentialLinks: [
      {
        title: 'Produits',
        icon: 'inventory',
        link: '/'
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
