import store from '~/store'

export default async (to, from, next) => {
  if (store.getters['twilio/client'] === null) {
    const user = store.getters['auth/user']
    await store.dispatch('twilio/setup', user)
  }

  next()
}
