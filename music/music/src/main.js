import Vue from 'vue'
import App from './App'
import router from './router'
import 'babel-polyfill'

Vue.use(router)

import './common/css/index.scss'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
