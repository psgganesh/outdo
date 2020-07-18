import axios from 'axios'

// state
export const state = {
  workflows: [],
  screens: [],
  active: {
    workflow: null,
    screen: null
  }
}

// getters
export const getters = {

}

// mutations
export const mutations = {
  SET_ACTIVE_WORKFLOW (state, workflow) {
    state.active.workflow = workflow.data
  },
  LOAD_WORKFLOWS (state, workflows) {
    state.workflows = workflows
  },
  LOAD_SCREENS (state, screens) {
    state.screens = screens
    if ((!Object.is(screens, null)) && (Object.is(state.active.screen, null))) {
      let [ activeScreen ] = state.screens
      state.active.screen = activeScreen
    }
  },
  PUSH_SCREEN (state, screen) {
    screen.canvasState = null
    state.screens.push(screen)
  },
  SET_ACTIVE_SCREEN (state, activescreen) {
    state.screens.map((screen) => {
      if (screen.id === activescreen.id) {
        state.active.screen = screen
      }
    })
  },
  SET_CURRENT_CANVAS_STATE (state, canvasState) {
    state.active.screen.canvasState = canvasState
  },
  PREPARE_PUT_DATA (state) {
    state.screens.map((canvasScreens) => {
      canvasScreens.additional_data = canvasScreens.canvasState
      delete canvasScreens.canvasState
    })
  }
}

// actions
export const actions = {
  async workflows ({ commit }, workspace) {
    try {
      const response = await axios.get('/api/workflows', {
        params: {
          workspace: workspace
        }
      })
      commit('LOAD_WORKFLOWS', response.data.data)
    } catch (e) {
      console.log('Unable to fetch workflows')
    }
  },

  async screens ({ commit }, id) {
    try {
      const response = await axios.get(`/api/workflows/${id}`)
      const { screens } = response.data.data
      delete response.data.data.screens
      commit('LOAD_SCREENS', screens)
      commit('SET_ACTIVE_WORKFLOW', response.data)
    } catch (e) {
      console.log('Unable to fetch workflow screens')
    }
  },

  async save ({ commit, state }, id) {
    try {
      commit('PREPARE_PUT_DATA')
      const { data } = await axios.put(`/api/workflows/${id}`, {
        screens: state.screens
      })
      console.log(data)
    } catch (e) {
      console.log('Unable to save workflow')
    }
  }

}
