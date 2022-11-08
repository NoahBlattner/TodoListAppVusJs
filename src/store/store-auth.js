import { api } from 'boot/axios'
import { showErrorMessage } from 'src/functions/error-message'
import { Loading } from 'quasar'
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
  AC_SignUpUser ({ context, dispatch }, payload) {
    console.log(payload)
    Loading.show()
    api.post('/register', payload)
      .then(function (response) {
        console.log(response)
        dispatch('AC_SetUser', response)
      })
      .catch(function (error) {
        Loading.hide()
        showErrorMessage('Sign up failed !', Object.values(error.response.data))
        throw error
      })
  },
  AC_SignInUser ({ context, dispatch }, payload) {
    Loading.show()
    api.post('/login', payload)
      .then(function (response) {
        console.log(response)
        dispatch('AC_SetUser', response)
      })
      .catch(function (error) {
        Loading.hide()
        showErrorMessage('Login failed !', Object.values((error)))
        throw error
      })
  },
  AC_SetUser (context, payload) {
    context.commit('SET_USER', payload.user)
    context.commit('SET_TOKEN', payload.access_token)
    this.$router.push('/')
    Loading.hide()
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
