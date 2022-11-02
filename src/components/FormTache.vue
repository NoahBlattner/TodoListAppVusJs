<template>
  <q-card>
    <q-card-section class="row">
      <div class="text-h6">Add a task</div>
      <q-space/>
      <q-btn dense flat round icon="close" v-close-popup/>
    </q-card-section>

    <q-form @submit="submitForm">
      <q-card-section class="q-pt-none">
        <q-input v-model="newTask.name" outlined label="Name"
                 :rules="[val => !!val || 'Task name is required !']"/>
        <q-input
          outlined
          v-model="newTask.endDate"
          label="End Date"
          class="q-mt-sm"
        >
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                <q-date
                  v-model="newTask.endDate"
                  mask="D.M.YYYY"
                  @input="() => $refs.qDateProxy.hide()" />
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
        <q-input
          outlined
          v-model="newTask.endTime"
          label="Time"
          class="q-mt-sm"
        >
          <template v-slot:append>
            <q-icon name="access_time" class="cursor-pointer">
              <q-popup-proxy @before-show="tempTime = newTask.endTime" transition-show="scale" transition-hide="scale">
                <q-time v-model="tempTime" format24h>
                  <div class="row items-center justify-end q-gutter-sm">
                    <q-btn label="Cancel" color="primary" flat v-close-popup/>
                    <q-btn label="OK" color="primary" flat @click="newTask.endTime = tempTime" v-close-popup/>
                  </div>
                </q-time>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn type="submit" label="Add" color="primary" flat />
      </q-card-actions>
    </q-form>
  </q-card>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'FormTache',
  data () {
    return {
      newTask: {
        name: '',
        endDate: '',
        endTime: '',
        completed: false
      },
      tempTime: ''
    }
  },
  methods: {
    ...mapActions('tasks', ['AC_AddTask']),
    submitForm () {
      this.AC_AddTask(this.newTask)
      this.$emit('closeDialog')
    }
  }
}
</script>

<style scoped>

</style>
