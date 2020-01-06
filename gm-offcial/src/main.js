// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from "axios"
import Qs from 'qs'
import '@/style/style.css'
import Video from 'video.js'
import 'video.js/dist/video-js.css'

import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'


Vue.use(ElementUI);
Vue.use(VueQuillEditor);
Vue.prototype.axios = axios;
Vue.prototype.qs = Qs;
Vue.config.productionTip = false;
Vue.prototype.$video = Video;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
