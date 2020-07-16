import axios from 'axios'

// state
export const state = {
  projects: []
}

// getters
export const getters = {

}

// mutations
export const mutations = {
  LOAD_PROJECTS (state, projects) {
    state.projects = projects
  }
}

// actions
export const actions = {
  async projects ({ commit }, user) {
    try {
      const { data } = await axios.get('/api/projects', {
        user: user.id
      })
      commit('LOAD_PROJECTS', data)
    } catch (e) {
      console.log('Unable to fetch projecst')
    }
  }
}
