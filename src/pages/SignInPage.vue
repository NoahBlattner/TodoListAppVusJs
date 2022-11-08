<template>
  <q-page padding>
    <q-card class="sign-in">
      <q-tabs
        v-model="tab"
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="justify"
        narrow-indicator
      >
        <q-tab name="signIn" label="Sign in" />
        <q-tab name="signUp" label="Sign up" />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="connexion">
          <div class="text-h6">Sign in</div>
          <sign-in-form/>
        </q-tab-panel>

        <q-tab-panel name="enregistrement">
          <div class="text-h6">Créer un compte</div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </q-page>
</template>

<script>
import SignInForm from "../components/SignIn/SignInForm";
export default {
  name: 'SignInPage',
  components: {SignInForm},
  data () {
    return {
      tab: 'signIn'
    }
  }
}
</script>

<style scoped>
.sign-in {
  max-width: 500px;
  width: auto;
  margin: 0 auto;
}
</style>
