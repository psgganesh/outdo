import store from '~/store'

export default async (to, from, next) => {
  store.dispatch('START_AUI_LOADING')
  const space = {
    workspace: to.params.workspace,
    repository: to.params.repository
  }
  await store.dispatch('bitbucket/setActiveSpace', space)
  await store.dispatch('bitbucket/issues').then(() => {
    store.dispatch('STOP_AUI_LOADING')
  })

  next()
}
