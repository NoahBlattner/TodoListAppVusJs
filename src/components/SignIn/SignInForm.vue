<template>
  <q-form @submit.prevent="submitForm">
    <q-input
      outlined
      v-model="form.email"
      label="E-mail"
      class="q-my-md"
      :rules="[val => validateEmail(val) || 'Invalid e-mail']"
      lazy-rules
    />

    <q-input
      type="password"
      outlined
      v-model="form.password"
      label="Password"
      class="q-my-md"
      :rules="[ val => val.length >= 4 || 'At least 4 characters']"
      lazy-rules
    />

    <q-btn
      type="submit"
      color="primary"
      label="Sign in"
    />
  </q-form>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'SignInForm',
  data () {
    return {
      form: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    ...mapActions('auth', ['AC_SignInUser']),
    submitForm () {
      this.AC_SignInUser(this.form)
    },
    validateEmail (email) {
      // Source : https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(String(email).toLowerCase())
    }
  }
}
</script>

<style>

</style>
