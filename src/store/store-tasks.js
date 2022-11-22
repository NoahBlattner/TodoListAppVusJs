// State : données du magasin
import { api } from 'boot/axios'
import { showErrorMessage } from 'src/functions/error-message'
import { Loading } from 'quasar'

const state = {
  tasks: [
    {
      id: 1,
      name: 'Acheter des oranges',
      completed: false,
      endDate: '06.06.2020',
      endTime: '12:00'
    },
    {
      id: 2,
      name: 'Manger des oranges',
      completed: false,
      endDate: '15.06.2020',
      endTime: '22:00'
    },
    {
      id: 3,
      name: 'Digérer des oranges',
      completed: false,
      endDate: '16.06.2020',
      endTime: '14:00'
    }
  ],
  tasksLoaded: false
}

/*
Mutations : méthode qui manipulent les données
Les mutations ne peuvent pas être asynchrones !!!
 */
const mutations = {
  TOGGLE_TASK_STATE (state, { index, newState }) {
    state.tasks[index].completed = newState
  },
  DELETE_TASK (state, payload) {
    state.tasks = state.tasks.filter(el => el.id !== payload)
  },
  ADD_TASK (state, payload) {
    state.tasks.push(payload)
  },
  UPDATE_TASK (state, payload) {
    state.tasks[payload.index] = payload.updatedTask
  },
  SET_TASKS (state, payload) {
    state.tasks = payload
  },
  SET_TASKS_LOADED (state, payload) {
    state.tasksLoaded = payload
  },
  CLEAR_TASKS (state) {
    state.tasks = []
  }
}
/*
Actions : méthodes du magasin qui font appel aux mutations
Elles peuvent être asynchrones !
 */
const actions = {
  // Changer l'état de completion de la tâche
  AC_ToggleTaskState (context, payload) {
    const index = state.tasks.findIndex(el => el.id === payload.id)
    if (index !== -1) {
      context.commit('TOGGLE_TASK_STATE', { index, newState: !state.tasks[index].completed })
    }
  },
  AC_DeleteTask (context, payload) {
    context.commit('DELETE_TASK', payload)
  },
  AC_AddTask (context, payload) {
    Loading.show()

    // Adapt datatypes
    payload.completed = payload.completed ? 1 : 0

    const config = {
      headers: { Authorization: 'Bearer ' + context.rootState.auth.token }
    }
    api.post('/taches', payload, config)
      .then(function (response) {
        context.commit('ADD_TASK', response.data)
      })
      .catch(function (error) {
        showErrorMessage('Cannot create task !', typeof error.response.data === 'string' ? error.response.data : Object.values(error.response.data))
        console.log(error.response.data)
        throw error
      })
    Loading.hide()
  },
  AC_UpdateTask (context, payload) {
    const index = state.tasks.findIndex(el => el.id === payload.id)
    if (index !== -1) {
      context.commit('UPDATE_TASK', { index, updatedTask: payload })
    }
  },
  AC_GetTasksAPI (context, payload) {
    context.commit('SET_TASKS_LOADED', false)
    const config = {
      headers: { Authorization: 'Bearer ' + context.rootState.auth.token }
    }
    api.get('/taches', config)
      .then(function (response) {
        for (const task in response.data) {
          task.completed = !!task.completed
        }
        context.commit('SET_TASKS', response.data)
        context.commit('SET_TASKS_LOADED', true)
      })
      .catch(function (error) {
        showErrorMessage('An error occurred and your tasks could not be loaded.', Object.values(error?.response?.data ?? {}))
        throw error
      })
  },
  AC_ClearTasks (context) {
    context.commit('CLEAR_TASKS')
    context.commit('SET_TASKS_LOADED', false)
  }
}

/*
Getters : retourne les données du magasin
Fonctionne comme les propriétés calculées
Sert à calculer, trier, filtrer ou formater les donneés
 */
const getters = {
  tasks: function (state) {
    return state.tasks
  },
  tasksLoaded: function (state) {
    return state.tasksLoaded
  }
}

/*
Exporte les constantes, variables du fichier
On pourra ainsi les récupérer, les importer dans un autre fichier JS.

namespace: true, ajoute un namespace l'objet retourné.
 */
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
