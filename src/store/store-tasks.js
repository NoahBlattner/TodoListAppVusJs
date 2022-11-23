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
  DELETE_TASK (state, taskId) {
    state.tasks = state.tasks.filter(el => el.id !== taskId)
  },
  ADD_TASK (state, newTask) {
    state.tasks.push(newTask)
  },
  UPDATE_TASK (state, taskToUpdate) {
    state.tasks[taskToUpdate.index] = taskToUpdate.updatedTask
  },
  SET_TASKS (state, task) {
    state.tasks = task
  },
  SET_TASKS_LOADED (state, newLoadedState) {
    state.tasksLoaded = newLoadedState
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
  AC_ToggleTaskState (context, taskToToggle) {
    const index = state.tasks.findIndex(el => el.id === taskToToggle.id)
    if (index !== -1) {
      context.commit('TOGGLE_TASK_STATE', { index, newState: !state.tasks[index].completed })
    }
  },
  AC_DeleteTask (context, taskId) {
    Loading.show()
    const config = {
      headers: { Authorization: 'Bearer ' + context.rootState.auth.token }
    }
    api.delete('/taches/' + taskId, config)
      .then(function (response) {
        context.commit('DELETE_TASK', taskId)
      })
      .catch(function (error) {
        showErrorMessage('Could not delete task !', error?.response?.data ?? {})
        throw error
      })
      .finally(Loading.hide())
  },
  AC_AddTask (context, newTask) {
    Loading.show()

    const config = {
      headers: { Authorization: 'Bearer ' + context.rootState.auth.token }
    }
    api.post('/taches', methods.adaptTaskToApi(newTask), config)
      .then(function (response) {
        context.commit('ADD_TASK', methods.adaptTaskToApp(response.data))
      })
      .catch(function (error) {
        showErrorMessage('Cannot create task !', error?.response?.data ?? {})
        throw error
      })
      .finally(Loading.hide())
  },
  AC_UpdateTask (context, taskToUpdate) {
    const config = {
      headers: { Authorization: 'Bearer ' + context.rootState.auth.token }
    }
    api.put('/taches/' + taskToUpdate.id, methods.adaptTaskToApi(taskToUpdate), config)
      .then(function (response) {
        const index = state.tasks.findIndex(el => el.id === taskToUpdate.id)
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
    console.log(config)
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
