import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Lazyload from 'vue-lazyload'
import 'babel-polyfill'

Vue.use(router)
Vue.use(Lazyload, {
  loading: require('./components/m-head/logo@2x.png')
})

import './common/css/index.scss'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
