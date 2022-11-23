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
  SET_USER (state, user) {
    state.user = user
  },
  SET_TOKEN (state, token) {
    state.token = token
  }
}

/*
Actions : méthodes du magasin qui font appel aux mutations.
Elles peuvent être asynchrones !
 */
const actions = {
  AC_SignUpUser (context, user) {
    Loading.show()
    api.post('/register', user)
      .then(function (response) {
        context.dispatch('AC_SetUser', response.data)
      })
      .catch(function (error) {
        Loading.hide()
        // Passer en paramètre error.response.data si existant, sinon un objet vide
        showErrorMessage('Sign up failed !', Object.values(error?.response?.data ?? {}))
        throw error
      })
  },
  AC_SignInUser (context, user) {
    Loading.show()
    api.post('/login', user)
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
  AC_SetUser (context, user) {
    // Set user data
    context.commit('SET_USER', user.user)
    context.commit('SET_TOKEN', user.access_token)
    LocalStorage.set('user', user.user)
    LocalStorage.set('token', user.access_token)

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
