import Cookies from 'js-cookie'
import { Bitbucket } from 'bitbucket'

const BASE_URL = 'https://api.bitbucket.org/2.0'

// state
export const state = {
  client: null,
  user: null,
  repositories: [],
  files: []
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
  },
  SET_FILES (state, files) {
    state.files = files
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
    let workspace = `{${user.uuid}}`
    await state.client.repositories.list({
      workspace: workspace,
      pagelen: 100
    })
      .then(({ data }) => commit('SET_REPOSITORIES', data.values))
      .catch((err) => console.error(err))
  },

  async files ({ state, commit }, request) {
    console.log(request)
    await state.client.repositories.readSrcRoot({
      repo_slug: request.slug,
      workspace: request.workspace,
      pagelen: 100
    })
      .then(({ data }) => commit('SET_FILES', data.values))
      .catch((err) => console.error(err))
  }
}
