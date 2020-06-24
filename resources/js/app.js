import Vue from 'vue'
import store from '~/store'
import router from '~/router'
import i18n from '~/plugins/i18n'
import App from '~/components/App'
import Va from 'vue-atlas'
import 'vue-atlas/dist/vue-atlas.css'

import '~/plugins'
import '~/components'

Vue.config.productionTip = false
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
