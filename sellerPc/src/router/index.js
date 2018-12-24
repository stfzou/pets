import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/login/Login'
import Home from '@/components/home'
import DataReady from '@/components/dataReady'
import SellerCondition from '@/components/sellerCondition'
import SellerInfo from '@/components/sellerInfo'

Vue.use(Router)

export default new Router({
	mode: 'history',
  routes: [
		{
			path:'/HelloWorld',
			component:HelloWorld
		},
    {
      path: '/login',
      name: 'login',
      component: Login
    },
		{
			path:'',
			redirect:'/home'
		},
		{
			path:'/home',
			name:'home',
			component:Home
		},
		{
			path:'/dataReady',
			name:'dataReady',
			component:DataReady
		},
		{
			path:'/sellerCondition',
			name:'sellerCondition',
			component:SellerCondition,
			children:[
				{
					path:'sellerInfo',
					name:'sellerInfo',
					component:SellerInfo
				}
			]
		}
		
  ]
})
