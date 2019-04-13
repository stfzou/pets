// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'lib-flexible/flexible.js'
import '@/style/style.scss'
import axios from "axios"
import http from "axios"
import Qs from 'qs'
import Cube from 'cube-ui'
import store from './store/store.js'
import AMap from 'vue-amap'


Vue.use(Cube)
Vue.use(AMap)
Vue.prototype.axios = axios;
Vue.prototype.http = http;
Vue.prototype.qs = Qs;
Vue.config.productionTip = false
// axios.defaults.baseURL = 'http://192.168.0.109:8084'
// axios.defaults.headers.common['token'] = "B99FE190CB62097255E01FE911A271D4"

// http.defaults.baseURL = 'http://192.168.0.109:8082'

AMap.initAMapApiLoader({
	key: 'fe2312e4704c6f8f7787c7864ecebae6',
	plugin: ['AMap.Icon', 'AMap.Geocoder', 'AMap.Geolocation', 'AMap.CitySearch', 'AMap.Autocomplete',
		'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor',
		'AMap.CircleEditor'
	],
	// 默认高德 sdk 版本为 1.4.4
	v: '1.4.4'
})
/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	store,
	components: {
		App
	},
	template: '<App/>'

})
