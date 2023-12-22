<template>
    <q-card class="loginCard">
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
    };
  },
  methods: {
    async onLoginSubmit() {
      try {
        let response = await userService.login({ login: this.login, password: this.password });
        if (response.status === 200) {
          this.$q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'cloud_done',
            message: 'Connexion autorisée',
            position: 'top'
          });
          this.$router.push('/dashboard');
        }
      }
      catch (error) {
      }
    }
  },
})
</script>

<style lang="sass" scoped>

.loginCard
  width: 50%

.loginInput
  margin-bottom: 1rem

.formActions
  display: flex
  justify-content: space-between
  align-items: center

</style>
