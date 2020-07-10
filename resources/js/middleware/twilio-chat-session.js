import store from '~/store'

export default async (to, from, next) => {
  if (to.params.hasOwnProperty('channel')) {
    store.dispatch('twilio/openChannel', to.params.channel)
  }

  next()
}
