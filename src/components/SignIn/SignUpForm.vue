<template>
  <q-form @submit.prevent="submitForm">
    <q-input
      outlined
      v-model="form.name"
      label="Name"
      class="q-my-md"
      :rules="[ val => val.length >= 3 || 'At least 3 characters']"
      lazy-rules
    />

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

    <q-input
      outlined
      v-model="form.password_confirmation"
      label="Confirm password"
      class="q-my-md"
      :rules="[val => val === form.password || 'Must be the same as password']"
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
  name: 'SignUpForm',
  data () {
    return {
      form: {
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
      }
    }
  },
  methods: {
    ...mapActions('auth', ['AC_SignUpUser']),
    submitForm () {
      this.AC_SignUpUser(this.form)
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
