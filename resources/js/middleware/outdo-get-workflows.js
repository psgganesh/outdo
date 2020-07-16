import store from '~/store'

export default async (to, from, next) => {
  const user = store.state.auth.user
  const params = { user: user }
  store.dispatch('START_AUI_LOADING')
  await store.dispatch('outdo/projects', params).then(() => {
    store.dispatch('STOP_AUI_LOADING')
  })

  next()
}
