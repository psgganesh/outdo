import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'
import Twilio from 'twilio-video'
const Chat = require('twilio-chat')

// TODO: FIX URLS
const TWILIO_TOKEN_URL = 'https://outdo.app/api/token'

// state
export const state = {
  identity: null,
  twilioClient: null,
  twilioJWTToken: null,

  /**
   * Progammable Chat
   */
  messages: [],
  channels: [],
  joinedChannels: [],
  currentChatChannel: null,

  /**
   * Programmable Video Chat
   */
  rooms: [],
  activeRoom: null,
  roomName: null
}

// mutations
export const mutations = {
  SET_IDENTITY (state, username) {
    state.identity = username
  },
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
  },
  RESET_CHANNEL (state) {
    state.messages = []
    state.currentChatChannel = null
  },
  SET_CURRENT_VIDEO_ROOM (state, room) {
    state.activeRoom = room
  },
  SET_CURRENT_ROOM_NAME (state, roomName) {
    state.roomName = roomName
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

  resetChannel ({ commit }) {
    commit('RESET_CHANNEL')
  },

  async fetchToken ({ commit }, username) {
    commit('SET_IDENTITY', username)
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
    await state.twilioClient.getPublicChannelDescriptors().then(channels => {
      if (channels.state.items.length > 0) {
        commit('UPDATE_CHANNELS_LIST', channels.state.items)
      }
    })
  },

  async getUserChannels ({ commit, state, dispatch }, username) {
    await state.twilioClient.getUserChannelDescriptors().then(channels => {
      if (channels.state.items.length > 0) {
        commit('UPDATE_CHANNELS_LIST', channels.state.items)
      } else {
        const channelData = { uniqueName: uuidv4(), friendlyName: `${username}_outdo` }
        dispatch('createNewChannel', channelData)
      }
    })
  },

  async addOnInviteListener ({ commit, state }) {
    console.log('passing addOnInviteListener()')
    state.twilioClient.on('channelInvited', function (channel) {
      commit('ADD_CHANNEL', channel)
      channel.join()
    })
    console.log('passed addOnInviteListener()')
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

  async createNewChannel ({ commit, state, dispatch }, channelData) {
    state.twilioClient.createChannel({
      uniqueName: channelData.uniqueName,
      friendlyName: channelData.friendlyName,
      isPrivate: true
    }).then(channel => {
      channel.join().then(channel => {
        commit('SET_GLOBAL_CHANNEL', channel)
      })
    })
  },

  sendMessage ({ state }, encryptedMessage) {
    state.currentChatChannel.sendMessage(encryptedMessage)
  },

  async invitePerson ({ commit, state }, member) {
    state.currentChatChannel.invite(member.memberName)
      .then(() => {
        console.log('Invited')
      })
      .catch(function (e) {
        console.log('Other user not yet logged in on twilio.')
      })
  },

  joinMeeting ({ commit, state }, roomParams) {
    let roomName = roomParams.name
    let localTrack = roomParams.localTrack
    let remoteTrack = roomParams.remoteTrack

    Twilio.createLocalTracks({
      audio: true,
      video: { }
    }).then(localTracks => {
      const connectOptions = {
        name: roomName,
        tracks: localTracks
      }
      let localMediaContainer = document.getElementById(localTrack)
      localTracks.forEach(function (track) {
        localMediaContainer.appendChild(track.attach())
      })

      return Twilio.connect(state.twilioJWTToken, connectOptions)
    }).then(room => {
      commit('SET_CURRENT_VIDEO_ROOM', room)
      commit('SET_CURRENT_ROOM_NAME', roomName)

      const remoteDiv = document.getElementById(remoteTrack)

      // Attach the Participant's Media to a <div> element.
      room.on('participantConnected', participant => {
        console.log(`Participant "${participant.identity}" connected`)

        participant.tracks.forEach(publication => {
          if (publication.isSubscribed) {
            const track = publication.track
            remoteDiv.appendChild(track.attach())
          }
        })

        participant.on('trackSubscribed', track => {
          remoteDiv.appendChild(track.attach())
        })
      })

      room.participants.forEach(participant => {
        participant.tracks.forEach(publication => {
          if (publication.track) {
            remoteDiv.appendChild(publication.track.attach())
          }
        })

        participant.on('trackSubscribed', track => {
          remoteDiv.appendChild(track.attach())
        })
      })

      room.on('disconnected', room => {
        // Detach the local media elements
        room.localParticipant.tracks.forEach(publication => {
          const attachedElements = publication.track.detach()
          attachedElements.forEach(element => element.remove())
        })
      })
    })
  },

  leaveMeeting ({ state }) {
    Twilio.connect(state.twilioJWTToken, { name: state.activeRoom }).then(room => {
      room.disconnect()
    }, error => {
      console.error(`Unable to connect to Room: ${error.message}`)
    })
  }

}

// getters
export const getters = {
  client: state => state.twilioClient,
  conversationItems: (state) => {
    let channels = []
    state.channels.map((channel) => {
      const botUser = (channel.friendlyName.includes('_outdo'))
      const icon = (botUser) ? 'robot' : 'comment'
      const name = (botUser) ? '@outdo' : `@${channel.friendlyName}`
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
