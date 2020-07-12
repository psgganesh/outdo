import store from '~/store'

export default async (to, from, next) => {
  if (store.getters['bitbucket/currentRepository'] === null) {
    const user = store.state.auth.user
    const oauthToken = store.state.auth.oauthToken
    const params = {
      user: user,
      oauthToken: oauthToken
    }
    await store.dispatch('bitbucket/repositories', params)
  }

  next()
}
