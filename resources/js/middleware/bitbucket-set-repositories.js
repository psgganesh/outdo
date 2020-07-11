import store from '~/store'

export default async (to, from, next) => {
  if (store.getters['bitbucket/currentRepository'] === null) {
    const user = store.state.auth.user
    await store.dispatch('bitbucket/repositories', user)
  }

  next()
}
