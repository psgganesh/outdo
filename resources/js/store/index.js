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
    loading: false
  },
  mutations: {
    COMMIT_LOADING_STATE (state, value) {
      state.loading = value
    }
  },
  actions: {
    START_AUI_LOADING ({ commit }) {
      commit('COMMIT_LOADING_STATE', true)
    },
    STOP_AUI_LOADING ({ commit }) {
      commit('COMMIT_LOADING_STATE', false)
    }
  }
})
