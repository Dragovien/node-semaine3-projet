<template>
  <q-card class="createAccountCard">
    <q-card-section>
      <div class="text-h5 text-center">{{ user ? 'Modifier le compte' : 'Créer le compte' }}</div>
    </q-card-section>
    <q-card-section>
      <q-form>

        <q-input class="createAccountInput" ref="firstName" filled v-model="firstName" type="text" label="Prénom"
          lazy-rules :rules="[val => val && val.length > 0 || 'Veuillez remplir le champ']" />

        <q-input class="createAccountInput" ref="lastName" filled v-model="lastName" type="text" label="Nom" lazy-rules
          :rules="[val => val && val.length > 0 || 'Veuillez remplir le champ']" />

        <q-input class="createAccountInput" ref="email" filled v-model="email" type="email" label="Email" lazy-rules
          :rules="[val => val && val.length > 0 || 'Veuillez remplir le champ']" />

        <q-input class="createAccountInput" ref="login" filled v-model="login" type="text" label="Login" lazy-rules
          :rules="[val => val && val.length > 0 || 'Veuillez remplir le champ']" />

        <q-input v-if="!user" class="createAccountInput" ref="password" filled v-model="password"
          :type="isPwd ? 'password' : 'text'" label="Mot de passe" lazy-rules
          :rules="[val => val && val.length > 3 || 'Le mot de passe doit faire au moins 4 caractères']">
          <template v-slot:append>
            <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="isPwd = !isPwd" />
          </template>
        </q-input>

        <q-input v-if="!user" class="createAccountInput" ref="confirmPassword" filled v-model="confirmPassword"
          :type="isConfirmPwd ? 'password' : 'text'" label="Confirmer le mot de passe" lazy-rules
          :rules="[val => val && val.length > 3 || 'Le mot de passe doit faire au moins 4 caractères']">
          <template v-slot:append>
            <q-icon :name="isConfirmPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer"
              @click="isConfirmPwd = !isConfirmPwd" />
          </template>
        </q-input>

        <!-- pour future creation de compte user non admin, pour l'instant obligé de cocher pour voir le dashboard -->
        <q-checkbox class="isAdminCheckbox" v-model="isAdmin" label="Utilisateur admin ?" />

        <div class="formActions">
          <q-btn v-if="user" label="Modifier le compte" color="primary" @click="onUpdateSubmit" />
          <q-btn v-else label="Créer le compte" color="primary" @click="onCreateSubmit" />
          <!-- v-if pour potentiel ajout du compo au niveau de la page de login-->
          <q-btn v-if="$route.name === 'LoginPage'" label="Retour au login" type="button" color="primary"
            @click="$emit('returnToLogin')" />

        </div>
      </q-form>
    </q-card-section>
  </q-card>
</template>

<script>
import { defineComponent } from 'vue'
import userService from 'src/services/user.service.js';

export default defineComponent({
  name: 'LoginPage',
  props: ['user'],
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
    }
  },
  methods: {
    async onCreateSubmit() {
      try {
        if (this.password !== this.confirmPassword) {
          this.$q.notify({
            textColor: 'white',
            color: 'negative',
            message: 'Mot de passe différent de la confirmation',
            icon: 'report_problem',
            position: 'top'
          })
          return
        }

        let response = await userService.createAccount({ login: this.login, password: this.password, firstName: this.firstName, lastName: this.lastName, email: this.email, isAdmin: this.isAdmin })

        if (response.status === 200) {
          this.login = null,
            this.password = null,
            this.confirmPassword = null,
            this.firstName = null,
            this.lastName = null,
            this.email = null,
            this.isAdmin = false,

            this.$refs.login.resetValidation()
          this.$refs.password.resetValidation()
          this.$refs.confirmPassword.resetValidation()
          this.$refs.firstName.resetValidation()
          this.$refs.lastName.resetValidation()
          this.$refs.email.resetValidation()

          this.$emit('createUser')

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

    async onUpdateSubmit() {
      try {
        let response = await userService.updateAccount({ login: this.login, firstName: this.firstName, lastName: this.lastName, email: this.email, isAdmin: this.isAdmin })

        if (response.status === 200) {
          this.login = null,
            this.firstName = null,
            this.lastName = null,
            this.email = null,
            this.isAdmin = false,

            this.$refs.login.resetValidation()
          this.$refs.firstName.resetValidation()
          this.$refs.lastName.resetValidation()
          this.$refs.email.resetValidation()

          this.$emit('modifyUser')

          this.$q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'cloud_done',
            message: 'Utilisateur modifié',
            position: 'top'
          })
        }
      } catch (error) {
        console.log(error)
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
  watch: {
    user: {
      handler(newValue, oldValue) {
        if (newValue !== null) {
          this.login = this.user.login
          this.firstName = this.user.first_name
          this.lastName = this.user.last_name
          this.email = this.user.email
          this.isAdmin = this.user.isAdmin
        } else {
          this.login = null
          this.firstName = null
          this.lastName = null
          this.email = null
          this.isAdmin = false
        }
      },
      deep: true
    }
  },
  mounted() {
    if (this.user) {
      this.login = this.user.login
      this.firstName = this.user.first_name
      this.lastName = this.user.last_name
      this.email = this.user.email
      this.isAdmin = this.user.isAdmin
    }
  }
})
</script>

<style lang="sass" scoped>

.createAccountCard 
  width: 50%

.createAccountInput, .isAdminCheckbox
  margin-bottom: 1rem

.formActions
  display: flex
  justify-content: space-between
  align-items: center

</style>
