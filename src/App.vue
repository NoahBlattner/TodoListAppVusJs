<template>
  <router-view />
</template>

<script>
import { defineComponent } from 'vue'
import { mapActions } from 'vuex'

export default defineComponent({
  name: 'App',
  methods: {
    ...mapActions('auth', ['AC_SetUser'])
  },
  mounted () {
    const user = this.$q.localStorage.getItem('user')
    // Disable camelcase rule because of variable 'access_token'
    /* eslint-disable camelcase */
    const access_token = this.$q.localStorage.getItem('token')

    if (user && access_token) {
      this.AC_SetUser({ user, access_token })
    }
    /* eslint-enable camelcase */
  }
})
</script>
