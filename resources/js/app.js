import Vue from 'vue'
import Va from 'vue-atlas'
import store from '~/store'
import router from '~/router'
import i18n from '~/plugins/i18n'
import App from '~/components/App'
import VueChatScroll from 'vue-chat-scroll'

import '~/plugins'
import '~/components'

Vue.config.productionTip = false
Vue.use(VueChatScroll)
/**
 * Some components are pre-wired for i18n.
 * 'en', 'es' and 'fr' are available at the moment.
 */
Vue.use(Va, 'en')

/* eslint-disable no-new */
new Vue({
  i18n,
  store,
  router,
  ...App
})
