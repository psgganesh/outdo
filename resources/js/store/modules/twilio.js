import axios from 'axios'

const TWILIO_TOKEN_URL = 'https://outdo.test/api/token'

// state
export const state = {

}

// mutations
export const mutations = {

}

// actions
export const actions = {
  fetchAccessToken (user, handler) {
    const { username } = user
    // let vm = this
    axios.post(`${TWILIO_TOKEN_URL}`, {
      identity: username,
      device: 'browser'
    })
      .then(function (response) {
        // handler(response.data)
        // vm.username = ''
        console.log(response)
      })
      .catch(function (error) {
        console.log(error)
      })
  }
}

// getters
export const getters = {}
