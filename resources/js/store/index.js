import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// Load store modules dynamically.
const requireContext = require.context('./modules', false, /.*\.js$/)

const modules = requireContext.keys()
  .map(file =>
    [file.replace(/(^.\/)|(\.js$)/g, ''), requireContext(file)]
  )
  .reduce((modules, [name, module]) => {
    if (module.namespaced === undefined) {
      module.namespaced = true
    }

    return { ...modules, [name]: module }
  }, {})

export default new Vuex.Store({
  modules,
  state: {
    loading: false,
    channels: []
  },
  mutations: {
    COMMIT_LOADING_STATE (state, value) {
      state.loading = value
    },
    UPDATE_CHANNELS_LIST (state, channels) {
      state.channels = channels
    }
  },
  actions: {
    START_AUI_LOADING ({ commit }) {
      commit('COMMIT_LOADING_STATE', true)
    },
    STOP_AUI_LOADING ({ commit }) {
      commit('COMMIT_LOADING_STATE', false)
    }
  },
  getters: {
    conversationItems: (state) => {
      let channels = [
        {
          name: 'outdobot',
          route: '/conversations/outdobot',
          icon: 'robot',
          iconSize: '18px',
          iconColor: 'white',
          iconStyle: 'solid'
        }
      ]
      state.channels.map((channel) => {
        channels.push(channel)
      })
      return channels
    }
  }
})
