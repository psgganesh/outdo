import store from '~/store'

export default async (to, from, next) => {
  const workspace = to.params.workspace
  await store.dispatch('outdo/workflows', workspace)
  next()
}
