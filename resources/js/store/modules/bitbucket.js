import Cookies from 'js-cookie'
import { Bitbucket } from 'bitbucket'

const BASE_URL = 'https://api.bitbucket.org/2.0'

// state
export const state = {
  bitbucketClient: null
}

// getters
export const getters = {

}

// mutations
export const mutations = {
  SET_BITBUCKET_CLIENT (state, bitbucketClient) {
    state.bitbucketClient = bitbucketClient
  }
}

// actions
export const actions = {
  setup ({ commit }) {
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
    const bitbucketClient = new Bitbucket(clientOptions)
    if (bitbucketClient) {
      commit('SET_BITBUCKET_CLIENT', bitbucketClient)
    }
  }
}
