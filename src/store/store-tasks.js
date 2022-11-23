// State : données du magasin
import { api } from 'boot/axios'
import { showErrorMessage } from 'src/functions/error-message'
import { Loading } from 'quasar'

const state = {
  tasks: [],
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

    const config = {
      headers: { Authorization: 'Bearer ' + context.rootState.auth.token }
    }
    api.post('/taches', methods.adaptTaskToApi(payload), config)
      .then(function (response) {
        context.commit('ADD_TASK', methods.adaptTaskToApp(response.data))
      })
      .catch(function (error) {
        showErrorMessage('Cannot create task !', error?.response?.data ?? {})
        throw error
      })
      .finally(Loading.hide())
  },
  AC_UpdateTask (context, payload) {
    const config = {
      headers: { Authorization: 'Bearer ' + context.rootState.auth.token }
    }
    api.put('/taches/' + payload.id, methods.adaptTaskToApi(payload), config)
      .then(function (response) {
        const index = state.tasks.findIndex(el => el.id === payload.id)
        if (index !== -1) {
          context.commit('UPDATE_TASK', { index, updatedTask: methods.adaptTaskToApp(response.data) })
        }
      })
      .catch(function (error) {
        showErrorMessage('Cannot update task !', error?.response?.data ?? {})
        throw error
      })
      .finally(Loading.hide())
  },
  AC_GetTasksAPI (context) {
    context.commit('SET_TASKS_LOADED', false)
    const config = {
      headers: { Authorization: 'Bearer ' + context.rootState.auth.token }
    }
    api.get('/taches', config)
      .then(function (response) {
        const tasks = []
        for (const taskKey in response.data) {
          const task = response.data[taskKey]
          tasks.push(methods.adaptTaskToApp(task))
        }
        context.commit('SET_TASKS', tasks)
        context.commit('SET_TASKS_LOADED', true)
      })
      .catch(function (error) {
        showErrorMessage('An error occurred and your tasks could not be loaded.', error?.response?.data ?? {})
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

const methods = {
  adaptTaskToApi: function (task) {
    return {
      nom: task.name,
      dateFin: task.endDate,
      heureFin: task.endTime,
      terminee: task.completed ? 1 : 0
    }
  },
  adaptTaskToApp: function (task) {
    return {
      id: task.id,
      name: task.nom,
      endDate: task.dateFin,
      endTime: task.heureFin,
      completed: !!task.terminee
    }
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
