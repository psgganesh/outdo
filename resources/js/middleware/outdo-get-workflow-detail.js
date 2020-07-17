import store from '~/store'

export default async (to, from, next) => {
  const workflowId = to.params.id
  store.dispatch('START_AUI_LOADING')
  await store.dispatch('outdo/screens', workflowId).then(() => {
    store.dispatch('STOP_AUI_LOADING')
  })
  next()
}
