<template>
  <q-layout view="hHh lpr fFf">
    <q-header elevated>
      <q-toolbar>

        <q-toolbar-title class="absolute-center">
          ToDo
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      class="bg-primary"
      show-if-above
      bordered
      breakpoint="767"
    >
        <q-list dark>
          <q-item-label
            header
            class="text-white"
          >
            Menu de navigation
          </q-item-label>
          <q-item v-for="link in linkList" clickable :key="link.id" :to="link.path" exact class="text-grey-4">
            <q-item-section avatar>
              <q-icon :name="link.icon" />
            </q-item-section>

            <q-item-section>
              <q-item-label>{{ link.text }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer elevated>
      <q-tabs>
        <q-route-tab v-for="link in linkList" :key="link.id"
          :to="link.path"
          :icon="link.icon"
          :label="link.text"
          exact
        />
      </q-tabs>
    </q-footer>
  </q-layout>
</template>

<script>

export default {
  name: 'MainLayout',
  data () {
    return {
      linkList: [
        {
          id: 0,
          text: 'Tâches',
          icon: 'list',
          path: '/'
        },
        {
          id: 1,
          text: 'Parmètres',
          icon: 'settings',
          path: '/params'
        }
      ]
    }
  }
}
</script>

<style lang="scss">
  /* Applique les règles de ce bloc uniquement aux écrans >= 768px */
  @media screen and (min-width: 768px) {
    /* Cache les éléments avec la classe CSS q-footer */
    .q-footer {
      display: none;
    }
  }

  q-drawer {
    width: 250px;
    .q-router-link--exact-active {
    color: white !important;
    }
  }
</style>
