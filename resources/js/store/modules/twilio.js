import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'
const Chat = require('twilio-chat')

const TWILIO_TOKEN_URL = 'https://outdo.test/api/token'

// state
export const state = {
  messages: [],
  channels: [],
  joinedChannels: [],
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
  UPDATE_CHANNELS_LIST (state, channels) {
    state.channels = channels
  },
  ADD_CHANNEL (state, channel) {
    state.channels.push(channel)
  },
  LISTENING_JOINED_CHANNEL (state, channel) {
    state.joinedChannels.push(channel.uniqueName)
  },
  SET_GLOBAL_CHANNEL (state, currentChatChannel) {
    state.currentChatChannel = currentChatChannel
  },
  SET_INITIAL_CHAT_CHANNEL_MESSAGES (state, messages) {
    state.messages = messages
  },
  ADD_MESSAGE (state, message) {
    state.messages.push(message)
  }
}

// actions
export const actions = {

  async setup ({ state, dispatch }, user) {
    // Call twilio API only if token is null - caching on next call
    const { username } = user
    await dispatch('fetchToken', username)
    // Create twilio API only if client is null - caching on next call
    await dispatch('initChat', username)
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

  async initChat ({ commit, dispatch, state }, username) {
    let client = await Chat.Client.create(state.twilioJWTToken)
    commit('SET_CHAT_CLIENT', client)
    dispatch('getPublicChannels')
    dispatch('getUserChannels', username)
    dispatch('addOnInviteListener')
  },

  async getPublicChannels ({ commit, state }) {
    console.log('ENTERED getPublicChannels')
    await state.twilioClient.getPublicChannelDescriptors().then(channels => {
      if (channels.state.items.length > 0) {
        commit('UPDATE_CHANNELS_LIST', channels.state.items)
      }
    })
    console.log('EXITED getPublicChannels')
  },

  async getUserChannels ({ commit, state, dispatch }, username) {
    console.log('ENTERED getUserChannels')
    await state.twilioClient.getUserChannelDescriptors().then(channels => {
      if (channels.state.items.length > 0) {
        commit('UPDATE_CHANNELS_LIST', channels.state.items)
      } else {
        const channelData = { uniqueName: uuidv4(), friendlyName: `${username}_outdo` }
        dispatch('createNewChannel', channelData)
      }
    })
    console.log('EXITED getUserChannels')
  },

  async addOnInviteListener ({ commit, state }) {
    state.twilioClient.on('channelInvited', function (channel) {
      commit('ADD_CHANNEL', channel.state)
      channel.join()
    })
  },

  async openChannel ({ commit, state }, channelUniqueName) {
    state.twilioClient.getChannelByUniqueName(channelUniqueName).then(channel => {
      commit('SET_GLOBAL_CHANNEL', channel)
      /**
       * Adding listener to listen for new messages and add them in it's channel
       */
      if (!state.joinedChannels.includes(channelUniqueName)) {
        state.currentChatChannel.on('messageAdded', message => {
          commit('ADD_MESSAGE', message)
        })
        commit('LISTENING_JOINED_CHANNEL', channelUniqueName)
      }
      /**
       * Load prev. messages of this channel
       */
      if (!state.joinedChannels.includes(channelUniqueName)) {
        state.currentChatChannel.getMessages().then(messages => {
          commit('SET_INITIAL_CHAT_CHANNEL_MESSAGES', messages.items)
        })
        commit('LISTENING_JOINED_CHANNEL', channelUniqueName)
      }
    })
  },

  async createNewChannel ({ state }, channelData) {
    state.twilioClient.createChannel({
      uniqueName: channelData.uniqueName,
      friendlyName: channelData.friendlyName,
      isPrivate: true
    }).then(channel => {
      channel.join()
    })
  },

  sendMessage ({ state }, encryptedMessage) {
    state.currentChatChannel.sendMessage(encryptedMessage)
  }
}

// getters
export const getters = {
  conversationItems: (state) => {
    let channels = []
    state.channels.map((channel) => {
      const botUser = (channel.friendlyName.includes('_outdo'))
      const icon = (botUser) ? 'robot' : 'user'
      const name = (botUser) ? 'outdo' : channel.friendlyName
      const route = `/conversations/${channel.uniqueName}`
      channels.push({
        name: name,
        route: route,
        icon: icon,
        iconSize: '18px',
        iconColor: 'white',
        iconStyle: 'solid'
      })
    })
    return channels
  },
  messages: (state) => {
    let messages = []
    state.messages.map((message) => {
      messages.push(message.state)
    })
    return messages
  }
}
