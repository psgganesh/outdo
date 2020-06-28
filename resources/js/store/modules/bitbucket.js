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

  async repositories ({ state, commit }) {
    // await state.client.users.getAuthedUser({ })
    //   .then(({ data }) => console.log(data.values))
    //   .catch((err) => console.error(err))
    await state.client.teams.listRepositoriesForUser({ username: 'psgganesh@gmail.com' })
      .then(({ data }) => console.log(data.values))
      .catch((err) => console.error(err))
  }
}
