import axios from 'axios'

// state
export const state = {
  workflows: [],
  screens: [],
  active: {
    workflow: null,
    screen: null,
    canvasState: null
  }
}

// getters
export const getters = {

}

// mutations
export const mutations = {
  SET_ACTIVE_WORKFLOW (state, workflow) {
    state.active.workflow = workflow
  },
  LOAD_WORKFLOWS (state, workflows) {
    state.workflows = workflows
  },
  LOAD_SCREENS (state, screens) {
    state.screens = screens
    // state.screens.push({
    //   'id': 'd854c618-e321-44f8-870f-a7f5df0836d4',
    //   'src': 'https://outdo.test/screen/CAaQWw6tKvY7CfyluPJByOMycNioiVbi8dZifKlp.png',
    //   'response': {
    //     'id': 'd854c618-e321-44f8-870f-a7f5df0836d4',
    //     'path': 'screen/CAaQWw6tKvY7CfyluPJByOMycNioiVbi8dZifKlp.png',
    //     'size': '139235',
    //     'name': '3.png',
    //     'width': 1920,
    //     'height': 861,
    //     'type': 'screen',
    //     'additional_data': null,
    //     'workflow_id': null,
    //     'user_id': 1,
    //     'created_by': 'shankarsapple',
    //     'created_at': '2020-07-18T09:59:43.000000Z',
    //     'updated_at': '2020-07-18T09:59:43.000000Z',
    //     'url': '/storage/screen/CAaQWw6tKvY7CfyluPJByOMycNioiVbi8dZifKlp.png',
    //     'uploaded_time': '1 second ago',
    //     'size_in_kb': 135.97
    //   }
    // })
    if (Object.is(state.active.screen, null)) {
      let [ activeScreen ] = state.screens
      state.active.screen = activeScreen
    }
  },
  PUSH_SCREEN (state, screen) {
    state.screens.push(screen)
  },
  SET_ACTIVE_SCREEN (state, activescreen) {
    let [ activeScreen ] = state.screens
    state.screens.map((screen) => {
      if (screen.id === activescreen.id) {
        activeScreen = screen
      }
    })
    state.active.screen = activeScreen
  },
  SET_CURRENT_CANVAS_STATE (state, canvasState) {
    state.active.canvasState = canvasState
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
      commit('SET_ACTIVE_WORKFLOW', response.data.data)
    } catch (e) {
      console.log('Unable to fetch workflow screens')
    }
  }

}
