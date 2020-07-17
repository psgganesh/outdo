import store from '~/store'

export default async (to, from, next) => {
  // const user = store.state.auth.user
  // const project = to.params.project
  // const params = {
  //   user: user,
  //   project: project
  // }
  // store.dispatch('START_AUI_LOADING')
  // await store.dispatch('outdo/screens', params).then(() => {
  //   store.dispatch('STOP_AUI_LOADING')
  // })

  next()
}
