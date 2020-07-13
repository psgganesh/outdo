import axios from 'axios'
import Cookies from 'js-cookie'
import * as types from '../mutation-types'

// state
export const state = {
  user: null,
  refreshToken: null,
  oauthToken: Cookies.get('oauthToken'),
  token: Cookies.get('token')
}

// getters
export const getters = {
  user: state => state.user,
  token: state => state.token,
  check: state => state.user !== null
}

// mutations
export const mutations = {
  [types.SAVE_TOKEN] (state, { token, oauthToken, refreshToken }) {
    const oauthcookieExpiry = new Date(new Date().getTime() + 1 * 60 * 60 * 1000)
    state.token = token
    state.oauthToken = oauthToken
    state.refreshToken = refreshToken
    Cookies.set('token', token, { expires: null })
    Cookies.set('refreshToken', refreshToken, { expires: null })
    Cookies.set('oauthToken', oauthToken, { expires: oauthcookieExpiry })
  },

  [types.SAVE_REFRESHED_TOKEN] (state, { oauthToken }) {
    const oauthcookieExpiry = new Date(new Date().getTime() + 1 * 60 * 60 * 1000)
    state.oauthToken = oauthToken
    Cookies.set('oauthToken', oauthToken, { expires: oauthcookieExpiry })
  },

  [types.FETCH_USER_SUCCESS] (state, { user }) {
    state.user = user
  },

  [types.FETCH_USER_FAILURE] (state) {
    state.token = null
    state.oauthToken = null
    Cookies.remove('token')
    Cookies.remove('oauthToken')
    Cookies.remove('refreshToken')
  },

  [types.LOGOUT] (state) {
    state.user = null
    state.token = null
    state.oauthToken = null
    Cookies.remove('token')
    Cookies.remove('oauthToken')
    Cookies.remove('refreshToken')
  },

  [types.UPDATE_USER] (state, { user }) {
    state.user = user
  }

}

// actions
export const actions = {
  saveToken ({ commit }, payload) {
    commit(types.SAVE_TOKEN, payload)
  },

  saveRefreshedToken ({ commit }, payload) {
    commit(types.SAVE_REFRESHED_TOKEN, payload)
  },

  async fetchUser ({ commit }) {
    try {
      const { data } = await axios.get('/api/user')

      commit(types.FETCH_USER_SUCCESS, { user: data })
    } catch (e) {
      commit(types.FETCH_USER_FAILURE)
    }
  },

  updateUser ({ commit }, payload) {
    commit(types.UPDATE_USER, payload)
  },

  async logout ({ commit }) {
    try {
      await axios.post('/api/logout')
    } catch (e) { }

    commit(types.LOGOUT)
  },

  async fetchOauthUrl (ctx, { provider }) {
    const { data } = await axios.post(`/api/oauth/${provider}`)

    return data.url
  }
}
