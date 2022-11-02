// State : données du magasin
const state = {
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

/*
Mutations : méthode qui manipulent les données
Les mutations ne peuvent pas être asynchrones !!!
 */
const mutations = {
  TOGGLE_TASK_STATE (state, payload) {
    state.taches[payload.index].terminee = payload.updates.newState
  }
}
/*
Actions : méthodes du magasin qui font appel aux mutations
Elles peuvent être asynchrones !
 */
const actions = {
  toggleTaskState (context, payload) {
    const index = state.taches.findIndex(el => el.id === payload.id)
    if (index !== -1) {
      context.commit('TOGGLE_TASK_STATE', { index, updates: { newState: !state.taches[index].terminee } })
    }
  }
}

/*
Getters : retourne les données du magasin
Fonctionne comme les propriétés calculées
Sert à calculer, trier, filtrer ou formater les donneés
 */
const getters = {
  taches: function (state) {
    return state.taches
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
