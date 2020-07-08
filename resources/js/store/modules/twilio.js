import axios from 'axios'
const Chat = require('twilio-chat')

const TWILIO_TOKEN_URL = 'https://outdo.test/api/token'

// state
export const state = {
  twilioClient: null,
  twilioJWTToken: null,
  currentChatChannel: null
}

// mutations
export const mutations = {
  SET_CHAT_CLIENT (state, client) {
    state.twilioClient = client
  },
  SET_TWILIO_TOKEN (state, jwtToken) {
    state.twilioJWTToken = jwtToken
  },
  SET_GLOBAL_CHANNEL (state, currentChatChannel) {
    state.currentChatChannel = currentChatChannel
  }
}

// actions
export const actions = {

  async setup ({ state, dispatch }, user) {
    // Call twilio API only if token is null - caching on next call
    const { username } = user
    if (Object.is(state.twilioJWTToken, null)) {
      await dispatch('fetchToken', username)
    }
    // Create twilio API only if client is null - caching on next call
    if (Object.is(state.twilioClient, null)) {
      await dispatch('initChat')
    }
  },

  async fetchToken ({ commit }, username) {
    await axios.post(`${TWILIO_TOKEN_URL}`, {
      identity: username,
      device: 'browser'
    }).then(function (response) {
      commit('SET_TWILIO_TOKEN', response.data.token)
    }).catch(function (error) {
      console.log(error)
    })
  },

  async initChat ({ commit, dispatch, state }) {
    await Chat.Client.create(state.twilioJWTToken).then(client => {
      commit('SET_CHAT_CLIENT', client)
      dispatch('getPublicChannels')
      dispatch('getUserChannels')
      dispatch('addOnInviteListener')
    })
  },

  async getPublicChannels ({ commit, state }) {
    await state.twilioClient.getPublicChannelDescriptors().then(channels => {
      if (channels.length > 0) {
        commit('UPDATE_CHANNELS_LIST', channels.state.items, { root: true })
      }
    })
  },

  async getUserChannels ({ commit, state, dispatch }) {
    await state.twilioClient.getUserChannelDescriptors().then(channels => {
      if (channels.length > 0) {
        commit('UPDATE_CHANNELS_LIST', channels.state.items, { root: true })
      } else {
        console.log('Time to create a new outdo_username channel for this user!')
        const channelData = {
          uniqueCode: 1001,
          contact: 'test'
        }
        dispatch('createNewChannel', channelData)
      }
    })
  },

  async addOnInviteListener ({ commit, state }) {
    state.twilioClient.on('channelInvited', function (channel) {
      console.log('Invited to channel ' + channel.friendlyName)
      commit('ADD_CHANNEL', channel.state, { root: true })
      channel.join()
    })
  },

  async joinChannel ({ commit, state }, channel) {
    await state.twilioClient.getChannelByUniqueName(channel.uniqueName).then(channel => {
      channel.join().then(channel => {
        commit('SET_GLOBAL_CHANNEL', channel) // Set it global
        // dispatch('OPEN_CHANNEL', channel)
      }).catch(() => {
        commit('SET_GLOBAL_CHANNEL', channel) // Set it global
        // dispatch('OPEN_CHANNEL', channel)
      })
    }).catch(e => {
      console.log('error!')
    })
  },

  async createNewChannel ({ commit, state, dispatch }, channelData) {
    state.twilioClient
      .createChannel({
        uniqueName: channelData.uniqueCode,
        friendlyName: channelData.contact,
        isPrivate: true
      })
      .then(channel => {
        channel.join().then(channel => {
          commit('SET_GLOBAL_CHANNEL', channel) // Set it global
          // dispatch('INVITE_PERSON', channel)
        })
        commit('ADD_CHANNEL', channel.state, { root: true })
      })
  }
}

// getters
export const getters = {}
