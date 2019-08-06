// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import '@/style/style.css'
import 'element-ui/lib/theme-chalk/index.css'
import GeminiScrollbar from 'vue-gemini-scrollbar'
import AMap from "vue-amap";
import VDistpicker from 'v-distpicker'
import store from './store/store'
import axios from 'axios'
import Qs from 'qs'
import QRCode from 'qrcodejs2'


Vue.component('v-distpicker', VDistpicker)//全局注册省市选择器组件
Vue.use(ElementUI)
Vue.use(AMap)
Vue.use(GeminiScrollbar)//引用自定义滚动条组件
//Vue.use(QRCode)

// axios.defaults.baseURL = 'http://192.168.0.109:8084'
Vue.prototype.axios = axios;
Vue.prototype.qs = Qs;

/** 验证用户是否登录 **/
router.beforeEach((to,from,next) => {

	if(to.name == 'login'){
		next();
	}else if(sessionStorage.getItem('user')){

		next();

	}else{
		next('/login');
	}

})

AMap.initAMapApiLoader({
  key: 'fe2312e4704c6f8f7787c7864ecebae6',
  plugin: ['AMap.Geocoder','AMap.Geolocation','AMap.CitySearch','AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
  // 默认高德 sdk 版本为 1.4.4
  v: '1.4.4'
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
