<template>
  <q-page padding>
    <q-pull-to-refresh @refresh="refresh" class="absolute-full">
      <q-spinner-radio v-if="!tasksLoaded" color="primary" size="5em" class="absolute-center"/>
      <q-list v-else-if="tasks.length" bordered class="q-ma-lg">
        <TacheComponent v-for="task in tasks" :key="task.id" :task="task"/>
      </q-list>
      <q-icon v-else name="playlist_remove" size="5em" class="absolute-center">
        <q-tooltip>No task associated with this user</q-tooltip>
      </q-icon>
    </q-pull-to-refresh>

    <q-page-sticky position="bottom" class="q-mb-lg">
      <q-btn fab icon="add" color="primary" @click="showTaskForm = true"/>
      <q-dialog v-model="showTaskForm" persistent>
        <FormTache @closeDialog="showTaskForm = false" button="Add">Add a task</FormTache>
      </q-dialog>
    </q-page-sticky>
  </q-page>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
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
  methods: {
    ...mapActions('tasks', ['AC_GetTasksAPI']),
    refresh (done) {
      this.AC_GetTasksAPI()
      done()
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
