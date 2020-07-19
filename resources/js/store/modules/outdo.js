import axios from 'axios'

// state
export const state = {
  workflows: [],
  screens: [],
  active: {
    workflow: null,
    screen: null
  },
  putData: []
}

// getters
export const getters = {
  hotspots: (state) => {
    if ((!Object.is(state.active.screen, null)) && (!Object.is(state.active.screen.canvasState, null))) {
      let canvasObjects = null
      if (state.active.screen.canvasState.constructor === Object) {
        canvasObjects = state.active.screen.canvasState
      }
      if (state.active.screen.canvasState.constructor === String) {
        canvasObjects = JSON.parse(state.active.screen.canvasState)
      }
      if (!Object.is(canvasObjects, null)) {
        if ((!Object.is(canvasObjects.objects, null)) && (canvasObjects.objects.length > 0)) {
          return canvasObjects.objects
        }
      }
    }
    return []
  }
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
    screens.map((screen) => {
      screen.canvasState = (!Object.is(screen.additional_data, null))
        ? JSON.stringify(screen.additional_data)
        : null
    })
    state.screens = screens
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
    console.log('setting canvas state')
    state.active.screen.canvasState = canvasState
  },
  PREPARE_PUT_DATA (state) {
    state.screens.map((canvasScreens) => {
      state.putData.push({
        id: canvasScreens.id,
        additional_data: canvasScreens.canvasState
      })
    })
  },
  RESET_PUT_DATA (state) {
    state.putData = []
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
      console.log('about to send put')
      const { data } = await axios.put(`/api/workflows/${id}`, {
        screens: state.putData
      })
      console.log(data)
      commit('RESET_PUT_DATA')
    } catch (e) {
      console.log('Unable to save workflow')
    }
  }

}
