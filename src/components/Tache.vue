<template>
  <q-item v-ripple :class="tache.terminee ? 'bg-orange-1' : 'bg-green-1'"
          clickable @click="toggleTaskState(tache)">
    <q-item-section side>
      <q-checkbox class="no-pointer-events" :model-value="tache.terminee"/>
    </q-item-section>

    <q-item-section>
      <q-item-label :class="{'text-barre': tache.terminee}">{{ tache.nom }}</q-item-label>
    </q-item-section>

    <q-item-section side>
      <div class="row">
        <div class="column justify-center">
          <q-icon name="event" class="q-mr-xs" size="18px"/>
        </div>
        <div class="column">
          <q-item-label class="text-right" caption>{{ tache.dateFin }}</q-item-label>
          <q-item-label class="text-right" caption>{{ tache.heureFin }}</q-item-label>
        </div>
      </div>
    </q-item-section>

    <q-item-section side>
      <q-btn icon="delete" dense color="negative" @click="confirmerSuprresion(tache.id)"/>
    </q-item-section>

    <q-separator/>
  </q-item>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'TacheComponent',
  props: {
    tache: {
      type: Object,
      required: true
    }
  },
  methods: {
    ...mapActions('taches', ['toggleTaskState']),
    confirmerSuppresion (taskId) {

    }
  }
}
</script>

<style scoped>

</style>
