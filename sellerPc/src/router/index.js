import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/login/Login'
import Home from '@/components/home'
import DataReady from '@/components/dataReady'
import SellerCondition from '@/components/sellerCondition'
import SellerInfo from '@/components/sellerInfo'
import QualificationsInfo from '@/components/qualificationsInfo'
import StoreSuccess from '@/components/storeSuccess'
import AddGoods from '@/components/addGoods'
import Sell from '@/components/selling'
import GoodsEdit from '@/components/goodsEdit'
import Upload from '@/components/upload'
import PublishActivity from '@/components/activity/publishActivity'
import Ticket from '@/components/activity/ticket'

Vue.use(Router)

export default new Router({
	mode: 'history',
	routes: [{
			path: '/HelloWorld',
			component: HelloWorld
		},
		{
			path: '/login',
			name: 'login',
			component: Login
		},
		{
			path: '/upload',
			name: 'upload',
			component: Upload
		},
		{
			path: '',
			redirect: '/home/addGoods'
		},
		{
			path: '/home',
			name: 'home',
			component: Home,
			children:[{
				path:'addGoods',
				name:'addGoods',
				component:AddGoods
			},{
				path:'sell',
				name:'sell',
				component:Sell
			},{
				path:'goodsEdit',
				name:'goodsEdit',
				component:GoodsEdit
			},{
				path:'publishActivity',
				name:'publishActivity',
				component:PublishActivity,
				meta:{
					keepAlive:true // 需要要缓存
				}
			},{
				path:'ticket',
				name:'ticket',
				component:Ticket
			}]
		},
		{
			path: '/dataReady',
			name: 'dataReady',
			component: DataReady
		},
		{
			path: '/sellerCondition',
			name: 'sellerCondition',
			component: SellerCondition,
			children: [{
					path: 'sellerInfo',
					name: 'sellerInfo',
					component: SellerInfo
				},
				{
					path: 'qualificationsInfo',
					name: 'qualificationsInfo',
					component: QualificationsInfo
				},
				{
					path: 'storeSuccess',
					name: 'storeSuccess',
					component: StoreSuccess
				}
			]
		}

	]
})
