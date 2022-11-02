// State : données du magasin
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
  ]
}

/*
Mutations : méthode qui manipulent les données
Les mutations ne peuvent pas être asynchrones !!!
 */
const mutations = {
  TOGGLE_TASK_STATE (state, payload) {
    state.tasks[payload.index].completed = payload.updates.newState
  },
  DELETE_TASK (state, payload) {
    state.tasks = state.tasks.filter(el => el.id !== payload)
  },
  ADD_TASK (state, payload) {
    state.tasks.push(payload)
  }
}
/*
Actions : méthodes du magasin qui font appel aux mutations
Elles peuvent être asynchrones !
 */
const actions = {
  AC_ToggleTaskState (context, payload) {
    const index = state.tasks.findIndex(el => el.id === payload.id)
    if (index !== -1) {
      context.commit('TOGGLE_TASK_STATE', { index, updates: { newState: !state.tasks[index].completed } })
    }
  },
  AC_DeleteTask (context, payload) {
    context.commit('DELETE_TASK', payload)
  },
  AC_AddTask (context, payload) {
    let uId = -1
    if (state.tasks.length) {
      uId = Math.max(...state.tasks.map(task => task.id)) + 1
    }
    payload.id = uId
    context.commit('ADD_TASK', payload)
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
