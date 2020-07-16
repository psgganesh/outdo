import axios from 'axios'

// state
export const state = {
  projects: [],
  screens: []
}

// getters
export const getters = {

}

// mutations
export const mutations = {
  LOAD_PROJECTS (state, projects) {
    state.projects = projects
  },
  LOAD_SCREENS (state, screens) {
    state.screens = screens
  }
}

// actions
export const actions = {
  async projects ({ commit }, user) {
    try {
      const response = await axios.get('/api/projects', {
        user: user.id
      })
      console.log(response)
      commit('LOAD_PROJECTS', response.data.data)
    } catch (e) {
      console.log('Unable to fetch projects')
    }
  },

  async screens ({ commit }, params) {
    const user = params.user
    const project = params.project
    try {
      const response = await axios.get('/api/project', {
        user: user.id,
        project: project
      })
      console.log(response)
      commit('LOAD_SCREENS', response.data.data)
    } catch (e) {
      console.log('Unable to fetch project screens')
    }
  }

}
