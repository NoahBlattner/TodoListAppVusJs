import { api } from 'boot/axios'
import { showErrorMessage } from 'src/functions/error-message'
import { Loading, LocalStorage } from 'quasar'
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
    Loading.show()
    api.post('/register', payload)
      .then(function (response) {
        console.log(response)
        context.dispatch('AC_SetUser', response)
      })
      .catch(function (error) {
        Loading.hide()
        // Passer en paramètre error.response.data si existant, sinon un objet vide
        showErrorMessage('Sign up failed !', Object.values(error?.response?.data ?? {}))
        throw error
      })
  },
  AC_SignInUser (context, payload) {
    Loading.show()
    api.post('/login', payload)
      .then(function (response) {
        context.dispatch('AC_SetUser', response.data)
      })
      .catch(function (error) {
        Loading.hide()
        // Passer en paramètre error.response.data si existant, sinon un objet vide
        showErrorMessage('Login failed !', Object.values(error?.response?.data ?? {}))
        throw error
      })
  },
  AC_SetUser (context, payload) {
    // Set user data
    context.commit('SET_USER', payload.user)
    context.commit('SET_TOKEN', payload.access_token)
    LocalStorage.set('user', payload.user)
    LocalStorage.set('token', payload.access_token)

    // Get tasks
    context.dispatch('tasks/AC_GetTasksAPI', null, { root: true })

    // Reroute to main page
    this.$router.push('/')
    Loading.hide()
  },
  AC_DisconnectUser (context) {
    Loading.show()
    const config = {
      headers: { Authorization: 'Bearer ' + state.token }
    }
    api.post('/logout', {}, config)
      .catch(function (error) {
        showErrorMessage('An error occurred while login out.')
        throw error
      })
      .finally(function () {
        context.commit('SET_USER', null)
        context.commit('SET_TOKEN', null)
        LocalStorage.clear()
        context.dispatch('tasks/AC_ClearTasks', null, { root: true })
        Loading.hide()
      })
  }
}

/*
Getters : retourne les données du magasin
Fonctionne comme les propriétés calculées
Sert à calculer, trier, filtrer ou formater les données
 */
const getters = {
  user: function (state) {
    return state.user
  }
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
