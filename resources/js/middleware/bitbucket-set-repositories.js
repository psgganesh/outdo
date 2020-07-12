import store from '~/store'

export default async (to, from, next) => {
  const user = store.state.auth.user
  const workspace = (to.params.workspace)
    ? to.params.workspace
    : user.username
  const params = { workspace: workspace }
  store.dispatch('START_AUI_LOADING')
  await store.dispatch('bitbucket/repositories', params).then(() => {
    store.dispatch('STOP_AUI_LOADING')
  })

  next()
}
