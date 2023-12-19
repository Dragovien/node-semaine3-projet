<template>
  <q-page class="flex flex-center">
    <q-card v-if="createAccount" class="createAccountCard">
      <q-card-section>
        <div class="text-h5 text-center">Créer un compte</div>
      </q-card-section>
      <q-card-section>
        <q-form @submit="onCreateSubmit">

          <q-input class="createAccountInput" ref="firstName" filled v-model="firstName" type="text" label="Prénom" lazy-rules
            :rules="[val => val && val.length > 0 || 'Veuillez remplir le champ']" />

          <q-input class="createAccountInput" ref="lastName" filled v-model="lastName" type="text" label="Nom" lazy-rules
            :rules="[val => val && val.length > 0 || 'Veuillez remplir le champ']" />

          <q-input class="createAccountInput" ref="email" filled v-model="email" type="email" label="Email" lazy-rules
            :rules="[val => val && val.length > 0 || 'Veuillez remplir le champ']" />

          <q-input class="createAccountInput" ref="login" filled v-model="login" type="text" label="Login" lazy-rules
            :rules="[val => val && val.length > 0 || 'Veuillez remplir le champ']" />

          <q-input class="createAccountInput" ref="password" filled v-model="password" :type="isPwd ? 'password' : 'text'"
            label="Mot de passe" lazy-rules
            :rules="[val => val && val.length > 3 || 'Le mot de passe doit faire au moins 4 caractères']">
            <template v-slot:append>
              <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="isPwd = !isPwd" />
            </template>
          </q-input>

          <q-input class="createAccountInput" ref="confirmPassword" filled v-model="confirmPassword" :type="isConfirmPwd ? 'password' : 'text'"
            label="Confirmer le mot de passe" lazy-rules
            :rules="[val => val && val.length > 3 || 'Le mot de passe doit faire au moins 4 caractères']">
            <template v-slot:append>
              <q-icon :name="isConfirmPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer"
                @click="isConfirmPwd = !isConfirmPwd" />
            </template>
          </q-input>

          <q-checkbox class="isAdminCheckbox" v-model="isAdmin" label="Utilisateur admin ?" />

          <div class="formActions">
            <q-btn label="Créer le compte" type="submit" color="primary" />
            <q-btn label="Retour au login" type="button" color="primary" @click="createAccount = false" />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
    <q-card v-else class="loginCard">
      <q-card-section>
        <div class="text-h5 text-center">Se connecter</div>
      </q-card-section>
      <q-card-section>
        <q-form @submit="onLoginSubmit">
          <q-input class="loginInput" ref="login" filled v-model="login" label="Login" lazy-rules
            :rules="[val => val && val.length > 0 || 'Veuillez remplir le champ']" />
            <q-input class="loginInput" ref="password" filled v-model="password" :type="isPwd ? 'password' : 'text'"
            label="Mot de passe" lazy-rules
            :rules="[val => val && val.length > 3 || 'Le mot de passe doit faire au moins 4 caractères']">
            <template v-slot:append>
              <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="isPwd = !isPwd" />
            </template>
          </q-input>

          <div class="formActions">
            <q-btn label="Se connecter" type="submit" color="primary" />

            <q-btn label="Créer un compte" type="button" color="primary" @click="createAccount = true" />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import userService from 'src/services/user.service.js';

export default defineComponent({
  name: 'LoginPage',
  data() {
    return {
      login: null,
      password: null,
      confirmPassword: null,
      firstName: null,
      lastName: null,
      email: null,
      createAccount: false,
      isAdmin: false,
      isPwd: true,
      isConfirmPwd: true,
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

    async onLoginSubmit() {
      try {
        let response = await userService.login({ login: this.login, password: this.password })

        if (response.status === 200) {
          this.$q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'cloud_done',
            message: 'Connexion autorisée',
            position: 'top'
          })

          this.$router.push('/dashboard')
        }
      } catch (error) {

      }
    }
  }
})
</script>

<style lang="sass" scoped>

.loginCard, .createAccountCard 
  width: 50%

.loginInput, .createAccountInput, .isAdminCheckbox
  margin-bottom: 1rem

.formActions
  display: flex
  justify-content: space-between
  align-items: center

</style>
