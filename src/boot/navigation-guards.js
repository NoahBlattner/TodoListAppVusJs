import { LocalStorage } from 'quasar'
import { showErrorMessage } from 'src/functions/error-message'

// Récupère l'objet router représentant Vue router
export default ({ router }) => {
  // Avant de rediriger le visiteur
  router.beforeEach((to, from, next) => {
    // Récupère
    const user = LocalStorage.getItem('user')
    // Si PAS connecté et ne vas par vers /connexion on force la redirection
    if (!user && to.path !== '/signIn') {
      // Affiche un message d'erreur uniquement si utilisateur tente d'accéder
      // à une autre page après avoir été redirigé vers la connexion une 1re
      // fois.
      if (from.path === '/signIn') {
        showErrorMessage('Access unauthorized ! Please sign in to access this page.')
      }
      next('/connexion') // Redirige vers /connexion
    } else {
      next() // Continue la navigation normalement
    }
  })
}
