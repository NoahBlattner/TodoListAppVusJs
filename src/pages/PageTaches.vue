<template>
  <q-page padding>
    <h1>ToDo</h1>

    <q-list bordered>
      <q-item v-for="tache in taches" :key="tache.id"
              v-ripple :class="tache.terminee ? 'bg-orange-1' : 'bg-green-1'"
              clickable @click="tache.terminee = !tache.terminee">
        <q-item-section side>
          <q-checkbox v-model="tache.terminee" />
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

        <q-separator/>
      </q-item>
    </q-list>

  </q-page>
</template>

<script>
export default {
  name: 'PageTaches',
  data () {
    return {
      taches: [
        {
          id: 1,
          nom: 'Acheter des oranges',
          terminee: false,
          dateFin: '06.06.2020',
          heureFin: '12:00'
        },
        {
          id: 2,
          nom: 'Manger des oranges',
          terminee: false,
          dateFin: '15.06.2020',
          heureFin: '22:00'
        },
        {
          id: 3,
          nom: 'Digérer des oranges',
          terminee: false,
          dateFin: '16.06.2020',
          heureFin: '14:00'
        }
      ]
    }
  }
}
</script>

<style scoped>
.text-barre {
  text-decoration: line-through;
}
</style>
