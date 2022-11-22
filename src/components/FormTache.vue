<template>
  <q-card>
    <q-card-section class="row">
      <div class="text-h6"><slot></slot></div>
      <q-space/>
      <q-btn dense flat round icon="close" v-close-popup/>
    </q-card-section>

    <q-form @submit="submitForm">
      <q-card-section class="q-pt-none">
        <q-input v-model="task.name" outlined label="Name" autofocus clearable
                 :rules="[val => !!val || 'Task name is required !']"/>
        <q-input
          outlined
          clearable
          readonly
          :value="endDateDMY"
          label="End Date"
          class="q-mt-sm"
        >
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                <q-date
                  v-model="task.endDate"
                  mask="YYYY-MM-DD"
                  @input="() => $refs.qDateProxy.hide()" />
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
        <q-input
          v-if="task.endDate !== ''"
          outlined
          clearable
          v-model="task.endTime"
          label="Time"
          class="q-mt-sm"
        >
          <template v-slot:append>
            <q-icon name="access_time" class="cursor-pointer">
              <q-popup-proxy @before-show="tempTime = task.endTime" transition-show="scale" transition-hide="scale">
                <q-time v-model="tempTime" format24h>
                  <div class="row items-center justify-end q-gutter-sm">
                    <q-btn label="Cancel" color="primary" flat v-close-popup/>
                    <q-btn label="OK" color="primary" flat @click="task.endTime = tempTime" v-close-popup/>
                  </div>
                </q-time>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn type="submit" :label="button" color="primary" flat />
      </q-card-actions>
    </q-form>
  </q-card>
</template>

<script>
import { mapActions } from 'vuex'
import { date } from 'quasar'

export default {
  name: 'FormTache',
  props: {
    button: {
      type: String,
      default: 'OK'
    },
    taskToUpdate: {
      type: Object
    }
  },
  mounted () {
    if (this.taskToUpdate) {
      this.task = Object.assign({}, this.taskToUpdate)
    }
  },
  data () {
    return {
      task: {
        id: '',
        name: '',
        endDate: '',
        endTime: '',
        completed: false
      },
      tempTime: ''
    }
  },
  methods: {
    ...mapActions('tasks', ['AC_AddTask', 'AC_UpdateTask']),
    submitForm () {
      if (this.task.id) { // If the current task has an id
        // Update the task
        this.AC_UpdateTask(this.task)
      } else {
        // Else create a new task
        this.AC_AddTask(this.task)
      }
      this.$emit('closeDialog')
    }
  },
  computed: {
    endDateDMY () {
      const newDate = new Date(this.task.endDate)
      return date.formatDate(newDate, 'DD.MM.YY')
    }
  }
}
</script>

<style scoped>

</style>
