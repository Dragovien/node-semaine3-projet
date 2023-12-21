<template>
  <q-layout view="lHh Lpr lff">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          Quasar App
        </q-toolbar-title>

        <q-avatar class="avatar" color="black" text-color="white" icon="account_circle">
          <q-menu>
            <q-list>
              <q-item class="menuOption" clickable v-close-popup @click="logout">Se déconnecter</q-item>
            </q-list>
          </q-menu>
        </q-avatar>
      </q-toolbar>
    </q-header>

    <q-drawer bordered v-model="leftDrawerOpen" show-if-above>
      <q-list>
        <q-item-label header>
          Dashboard
        </q-item-label>

        <EssentialLink v-for="link in essentialLinks" :key="link.title" v-bind="link" />
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
import { defineComponent } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'
import userService from 'src/services/user.service.js'

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
          title: 'Dashboard',
          icon: 'dashboard',
          link: '/dashboard'
        },
        {
          title: 'Gestion des utilisateurs',
          icon: 'manage_accounts',
          link: '/dashboard/manageAccounts'
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
    },

    async logout() {
      try {
        let response = await userService.logout()
        if (response.status === 200) {
          this.$router.push('/login')
          this.$q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'cloud_done',
            message: 'Déconnexion réussie',
            position: 'top'
          })
        }
      } catch (error) {
        console.log(error)
        this.$q.notify({
          textColor: 'white',
          color: 'negative',
          message: 'Erreur lors de la déconnexion',
          icon: 'report_problem',
          position: 'top'
        })
      }

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

.avatar
  cursor: pointer

.menuOption
  display: flex
  align-items: center
  justify-content: center
</style>
