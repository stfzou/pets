// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'lib-flexible/flexible.js'
import '@/style/style.scss'
import axios from "axios"
import Qs from 'qs'
import Cube from 'cube-ui'
import store from './store/store.js'

Vue.use(Cube)
Vue.prototype.axios = axios;
Vue.prototype.qs = Qs;
Vue.config.productionTip = false
axios.defaults.baseURL = 'http://192.168.0.109:8084'
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
