<template>
  <q-page padding>
    <h1>ToDo</h1>

    <q-list bordered>
      <TacheComponent v-for="task in tasks" :key="task.id" :task="task"/>
    </q-list>

    <q-page-sticky position="bottom" class="q-mb-lg">
      <q-btn fab icon="add" color="primary" @click="showTaskForm = true"/>
      <q-dialog v-model="showTaskForm" persistent>
        <FormTache @closeDialog="showTaskForm = false"/>
      </q-dialog>
    </q-page-sticky>
  </q-page>
</template>

<script>
import { mapGetters } from 'vuex'
import TacheComponent from 'components/Tache'
import FormTache from 'components/FormTache'

export default {
  name: 'PageTaches',
  components: { FormTache, TacheComponent },
  data () {
    return {
      showTaskForm: false
    }
  },
  computed: {
    ...mapGetters('tasks', ['tasks'])
  }
}
</script>

<style scoped>
.text-barre {
  text-decoration: line-through;
}
.q-card {
  width: 480px;
  max-width: 80vw;
}
</style>
