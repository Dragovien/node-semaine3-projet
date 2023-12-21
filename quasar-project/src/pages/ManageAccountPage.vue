<template>
  <div class="q-pa-md manageAccountPage">
    <q-card class="userListCard">
      <q-card-section>
        <p class="text-h5 text-center">Liste des utilisateurs</p>
      </q-card-section>
      <q-card-section>
        <q-list class="column">
          <q-item class="user" v-for="user in users" :key="user">
            <q-item-section side class="closeBtnWrapper">
              <q-btn push color="blue" size="7px" round icon="settings" @click="modifyUser(user)"></q-btn>
              <q-btn push color="red" size="7px" round icon="close" @click="deleteUser(user)"></q-btn>
            </q-item-section>
            <q-item-section>
              <q-item-label class="itemLabel" overline v-if="user.isAdmin">
                <q-chip color="blue" text-color="white">Admin</q-chip>
              </q-item-label>
              <q-item-label class="itemLabel">Login: {{ user.login }}</q-item-label>
              <q-item-label class="itemLabel">Prénom: {{ user.first_name }}</q-item-label>
              <q-item-label class="itemLabel">Nom: {{ user.last_name }}</q-item-label>
              <q-item-label class="itemLabel">Email: {{ user.email }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-btn color="blue" icon="add" @click="user = null, createAccount = true">Ajouter un utilisateur</q-btn>
        </q-list>
      </q-card-section>
    </q-card>

    <CreateAccountCard v-if="createAccount" :user="sendUser" @create-user="getUsers()"
    @modify-user="getUsers()"/>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import userService from 'src/services/user.service.js';
import CreateAccountCard from 'src/components/CreateAccountCard.vue';

export default defineComponent({
  name: 'ManageAccountPage',
  components: { CreateAccountCard },
  data() {
    return {
      login: null,
      password: null,
      confirmPassword: null,
      firstName: null,
      lastName: null,
      email: null,
      isAdmin: false,
      isPwd: true,
      isConfirmPwd: true,
      createAccount: false,
      users: [],
      user: null
    }
  },
  computed: {
    sendUser() {
      return this.user
    }
  },
  methods: {
    async onCreateSubmit() {
      try {
        if (this.password !== this.confirmPassword) return console.log('pas même mdp')
        console.log(this.isAdmin)

        let response = await userService.createAccount({ login: this.login, password: this.password, firstName: this.firstName, lastName: this.lastName, email: this.email, isAdmin: this.isAdmin })

        if (response.status === 200) {
          this.login = null,
            this.password = null,
            this.confirmPassword = null,
            this.firstName = null,
            this.lastName = null,
            this.email = null,
            this.isAdmin = false,
            this.createAccount = false,

            this.$refs.login.resetValidation()
          this.$refs.password.resetValidation()
          this.$refs.confirmPassword.resetValidation()
          this.$refs.firstName.resetValidation()
          this.$refs.lastName.resetValidation()
          this.$refs.email.resetValidation()

          this.$q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'cloud_done',
            message: 'Utilisateur ajouté',
            position: 'top'
          })
        }
      } catch (error) {
        if (error.response?.status === 409) {
          this.$q.notify({
            textColor: 'white',
            color: 'negative',
            message: 'Utilisateur déjà existant',
            icon: 'report_problem',
            position: 'top'
          })
        } else {
          this.$q.notify({
            textColor: 'white',
            color: 'negative',
            message: 'Erreur système',
            icon: 'report_problem',
            position: 'top'
          })
        }
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
    async modifyUser(user) {
      this.user = user
      this.createAccount = true
    },
    async deleteUser(user) {
      try {

        let response = await userService.deleteAccount({ id: user.id })

        if (response.status === 200) {

          this.getUsers()

          this.$q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'cloud_done',
            message: 'Utilisateur supprimé',
            position: 'top'
          })
        }

      } catch (error) {
        console.log(error)
        this.$q.notify({
          textColor: 'white',
          color: 'negative',
          message: 'Erreur lors de la suppression de l\'utilisateur',
          icon: 'report_problem',
          position: 'top'
        })
      }
    },
  },
  async created() {
    this.getUsers()
  }
})
</script>

<style lang="sass" scoped>
.manageAccountPage
  width: 100%
  display: flex
  column-gap: 1rem
  justify-content: center

.userListCard
  width: 50%

.user
  flex-direction: column
  background-color: beige
  margin-bottom: 1rem
  border-radius: 10px

.createAccountCard 
  width: 50%

.closeBtnWrapper
  flex-direction: row
  justify-content: flex-end
  column-gap: 1rem
  padding-right: 0

.createAccountInput, .isAdminCheckbox
  margin-bottom: 1rem

.formActions
  display: flex
  justify-content: space-between
  align-items: center

.itemLabel
  margin-bottom: 1rem

</style>
