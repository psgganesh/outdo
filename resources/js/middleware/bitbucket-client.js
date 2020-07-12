import store from '~/store'
import swal from 'sweetalert2'
import i18n from '~/plugins/i18n'

export default async (to, from, next) => {
  const bbClient = store.getters['bitbucket/client']
  if (bbClient === null) {
    await store.dispatch('bitbucket/setup')
  }

  /**
   * Need to handle 401
   */
  if (bbClient === null) {
    swal.fire({
      type: 'warning',
      title: i18n.t('token_expired_alert_title'),
      text: i18n.t('token_expired_alert_text'),
      reverseButtons: true,
      confirmButtonText: i18n.t('ok'),
      cancelButtonText: i18n.t('cancel')
    }).then(() => {
      store.commit('auth/LOGOUT')
      next({ name: 'welcome' })
    })
  }

  next()
}
