import axios from 'axios'
const Chat = require('twilio-chat')

const TWILIO_TOKEN_URL = 'https://outdo.test/api/token'

// state
export const state = {
  twilioClient: null,
  twilioJWTToken: null,
  channels: []
}

// mutations
export const mutations = {
  SET_CHAT_CLIENT (state, client) {
    state.twilioClient = client
  },
  SET_TWILIO_TOKEN (state, jwtToken) {
    state.twilioJWTToken = jwtToken
  },
  SET_INITIAL_CHANNEL_ITEMS (state, channels) {
    state.channels = channels
  }
}

// actions
export const actions = {

  async fetchAccessToken ({ commit, dispatch }, user) {
    const { username } = user
    await axios.post(`${TWILIO_TOKEN_URL}`, {
      identity: username,
      device: 'browser'
    }).then(function (response) {
      commit('SET_TWILIO_TOKEN', response.data.token)
      dispatch('initChat')
    }).catch(function (error) {
      console.log(error)
    })
  },

  async initChat ({ commit, dispatch, state }) {
    await Chat.Client.create(state.twilioJWTToken).then(client => {
      commit('SET_CHAT_CLIENT', client)
      dispatch('getPublicChannels')
      // dispatch('GET_USER_CHANNELS')
      // dispatch('ADD_ON_INVITE_HANDLER')
      // dispatch('FINISH_LOADING_CHANNELS')
    })
  },

  async getPublicChannels ({ commit, state }) {
    await state.twilioClient.getPublicChannelDescriptors().then(channels => {
      commit('SET_INITIAL_CHANNEL_ITEMS', channels.state.items)
    })
  }
}

// getters
export const getters = {}
