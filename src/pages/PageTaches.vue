<template>
  <q-page padding>
    <q-icon v-if="user === null" name="person_off" size="5em" class="absolute-center" @click="$router.push('/signIn')">
      <q-tooltip>Please log in</q-tooltip>
    </q-icon>
    <q-list v-else-if="tasks.length && tasksLoaded" bordered>
      <TacheComponent v-for="task in tasks" :key="task.id" :task="task"/>
    </q-list>
    <q-spinner-radio v-else class="absolute-center" color="primary" size="5em" />

    <q-page-sticky position="bottom" class="q-mb-lg">
      <q-btn fab icon="add" color="primary" @click="showTaskForm = true"/>
      <q-dialog v-model="showTaskForm" persistent>
        <FormTache @closeDialog="showTaskForm = false" button="Add">Add a task</FormTache>
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
    ...mapGetters('tasks', ['tasks', 'tasksLoaded']),
    ...mapGetters('auth', ['user'])
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
