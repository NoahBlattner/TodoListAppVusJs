import { api } from 'boot/axios'
// State : données du magasin
const state = {
  user: null,
  token: null
}

/*
Mutations : méthodes qui manipulent les données
Les mutations ne peuvent pas être asynchrones !!!
 */
const mutations = {
  SET_USER (state, payload) {
    state.user = payload
  },
  SET_TOKEN (state, payload) {
    state.token = payload
  }
}

/*
Actions : méthodes du magasin qui font appel aux mutations.
Elles peuvent être asynchrones !
 */
const actions = {
  AC_SignUpUser (context, payload) {
    console.log(payload)
    api.post('/register', payload)
      .then(function (response) {
        context.commit('SET_USER', response.data.user)
        context.commit('SET_TOKEN', response.data.access_token)
        alert('almost done')
        this.$router.push('/')
        alert('done')
      })
      .catch(function (error) {
        console.log(error.response)
        alert(error.response)
      })
  },
  AC_SignInUser (context, payload) {
    api.post('/login', payload)
      .then(function (response) {
        context.commit('SET_USER', response.data.user)
        context.commit('SET_TOKEN', response.data.access_token)
        this.$router.push('/')
      })
      .catch(function (error) {
        console.log(error.response)
        alert(error.response)
      })
  }
}

/*
Getters : retourne les données du magasin
Fonctionne comme les propriétés calculées
Sert à calculer, trier, filtrer ou formater les données
 */
const getters = {

}

/*
Exporte les constantes, variables du fichier
On pourra ainsi les récupérer, les importer dans un autre fichier JS.

namespace: true, ajoute un namespace à notre objet retourné.
 */
export default {

  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
