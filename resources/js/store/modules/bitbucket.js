import Cookies from 'js-cookie'
import { Bitbucket } from 'bitbucket'

const BASE_URL = 'https://api.bitbucket.org/2.0'

// state
export const state = {
  client: null,
  user: null,
  repositories: []
}

// getters
export const getters = {

}

// mutations
export const mutations = {
  SET_BITBUCKET_CLIENT (state, client) {
    state.client = client
  },
  SET_REPOSITORIES (state, repositories) {
    state.repositories = repositories
  }
}

// actions
export const actions = {
  // ISSUE
  async setup ({ commit, dispatch }) {
    const token = Cookies.get('token')
    const clientOptions = {
      baseUrl: BASE_URL,
      request: {
        timeout: 10
      },
      auth: {
        token: token
      }
    }
    const client = new Bitbucket(clientOptions)
    commit('SET_BITBUCKET_CLIENT', client)
  },

  async repositories ({ state, commit }, user) {
    let workspace = '{eeea9a97-faab-40b4-93a2-e421b3549b3a}'
    await state.client.repositories.list({
      workspace: workspace,
      pagelen: 100
    })
      .then(({ data }) => commit('SET_REPOSITORIES', data.values))
      .catch((err) => console.error(err))
  }
}
