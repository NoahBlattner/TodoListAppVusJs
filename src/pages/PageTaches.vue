<template>
  <q-page padding>
    <h1>ToDo</h1>

    <q-list bordered>
      <TacheComponent v-for="tache in taches" :key="tache" :tache="tache"/>
    </q-list>

  </q-page>
</template>

<script>
import { mapGetters } from 'vuex'
import TacheComponent from 'components/Tache'

export default {
  name: 'PageTaches',
  components: { TacheComponent },
  computed: {
    ...mapGetters('taches', ['taches'])
  }
}
</script>

<style scoped>
.text-barre {
  text-decoration: line-through;
}
</style>
