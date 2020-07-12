import store from '~/store'

export default async (to, from, next) => {
  const channel = `${to.params.channel}`

  store.dispatch('twilio/resetChannel')
  store.dispatch('twilio/openChannel', channel)
  next()
}
