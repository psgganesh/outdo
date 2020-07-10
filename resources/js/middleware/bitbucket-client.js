import store from '~/store'

export default async (to, from, next) => {
  if (store.getters['bitbucket/client'] === null) {
    await store.dispatch('bitbucket/setup')
  }

  next()
}
