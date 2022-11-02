<template>
  <q-item v-ripple :class="task.completed ? 'bg-orange-1' : 'bg-green-1'"
          clickable @click="AC_ToggleTaskState(task)">
    <q-item-section side>
      <q-checkbox class="no-pointer-events" :model-value="task.completed"/>
    </q-item-section>

    <q-item-section>
      <q-item-label :class="{'text-barre': task.completed}">{{ task.name }}</q-item-label>
    </q-item-section>

    <q-item-section v-if="task.endDate" side>
      <div class="row">
        <div class="column justify-center">
          <q-icon name="event" class="q-mr-xs" size="18px"/>
        </div>
        <div class="column">
          <q-item-label class="text-right" caption>{{ task.endDate }}</q-item-label>
          <q-item-label class="text-right" caption>{{ task.endTime }}</q-item-label>
        </div>
      </div>
    </q-item-section>

    <q-item-section side>
      <q-btn icon="edit" dense color="primary"
             @click.stop="showUpdateForm = true"/>
    </q-item-section>
    <q-item-section side>
      <q-btn icon="delete" dense color="negative"
             @click.stop="requestDelete(task.id)"/>
    </q-item-section>

    <q-separator/>
    <q-dialog
      v-model="showUpdateForm"
      persistent
    >
      <FormTache @closeDialog="showUpdateForm=false" @fermer="showUpdateForm = false"
                 :task-to-update="task" button="Update">Update task</FormTache>
    </q-dialog>
  </q-item>
</template>

<script>
import { mapActions } from 'vuex'
import FormTache from 'components/FormTache'

export default {
  name: 'TacheComponent',
  components: { FormTache },
  props: {
    task: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      showUpdateForm: false
    }
  },
  methods: {
    ...mapActions('tasks', ['AC_ToggleTaskState', 'AC_DeleteTask']),
    requestDelete (taskId) {
      this.$q.dialog({
        title: 'Confirm deletion',
        message: 'Are you sure you want to delete this task ?',
        cancel: true,
        ok: 'Delete',
        persistent: true
      }).onOk(() => {
        this.deleteTask(taskId)
      })
    },
    deleteTask (taskId) {
      this.AC_DeleteTask(taskId)
    }
  }
}
</script>

<style scoped>

</style>
