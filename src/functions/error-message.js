// Importation du plugin Dialog de Quasar
import { Dialog } from 'quasar'

// Exporte notre fonction
export function showErrorMessage (message, errors, defaultMessage = 'Unknown error. Please check your network connection.') {
  // Si un tableau d'erreurs est envoyé, crée une liste <ul> avec les erreurs
  if (Array.isArray(errors)) {
    message += '<ul><li>'
    if (errors.length) {
      message += errors.join('</li><li>')
    } else {
      message += defaultMessage
    }
    message += '</li></ul>'
  }
  // Crée et affiche la boite de dialogue
  Dialog.create({
    title: 'Error', // Titre de la dialog
    message, // Message de la dialog
    html: true // Html utilisable dans le message
  })
}
