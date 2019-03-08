import Vue from 'vue'
import Router from 'vue-router'
import Seller from '@/components/seller/seller'
import SellerGoods from '@/components/seller/sellerGoods.vue'
import SellerEval from '@/components/seller/sellerEvaluate.vue'
import SellerInfo from '@/components/seller/sellerInfo.vue'
import EvalContent from '@/components/seller/evalContent.vue'
import SellerActive from '@/components/seller/sellerActive.vue'
import SellerVipCt from '@/components/seller/sellerVipCt.vue'
import Tap from '@/components/seller/tap.vue'
import GoodsDetails from '@/components/seller/goodsDetails'
import GoodsComment from '@/components/seller/goodsComment'
import BusinSelectAddr from '@/components/seller/businSelectAddr'
import AddAddr from '@/components/seller/addAddr'
import ConfirmAddr from '@/components/seller/confirmAddr'
import UserAddr from '@/components/seller/userAddr'
import ShopCar from '@/components/seller/shopCar'
import OrderAccounts from '@/components/seller/orderAccounts'
import Login from '@/components/login/login'
import Register from '@/components/login/register'
import vLogin from '@/components/login/vLogin'
import ForgetPw from '@/components/login/forgetPw'
Vue.use(Router)
export default new Router({
	mode: 'history',
    routes:[
		{
		  path:'',
		  redirect:'seller/sellerGoods'
		},
		{
			path:'/vLogin',
			name:'vLogin',
			component:vLogin,
		},
		{
			path:'/forgetPw',
			name:'forgetPw',
			component:ForgetPw,
		},
		{
			path:'/tap',
			name:'tap',
			component:Tap,
		},
		{
			path:'/register',
			name:'register',
			component:Register,
		},
		{
			path:'/login',
			name:'login',
			component:Login,
		},
		{
			path:'/goodsDetails',
			name:'goodsDetails',
			component:GoodsDetails,
		},
		{
			path:'/shopCar',
			name:'shopCar',
			component:ShopCar,
		},
		{
			path:'/orderAccounts',
			name:'orderAccounts',
			component:OrderAccounts
		},
		{
			path:'/goodsComment',
			name:'goodsComment',
			component:GoodsComment,
		},
		{
			path:'/businSelectAddr',
			name:'businSelectAddr',
			component:BusinSelectAddr,
		},
		{
			path:'/confirmAddr',
			name:'confirmAddr',
			component:ConfirmAddr
		},
		{
			path:'/addAddr',
			name:'addAddr',
			component:AddAddr,
		},
		{
			path:'/userAddr',
			name:'userAddr',
			component:UserAddr,
		},
		{
		 path:'/sellerActive',
		 name:'sellerActive',
		 component:SellerActive,
			children:[
				{
					path:'sellerVipCt',
					component:SellerVipCt,
					name:'sellerVipCt'
				}
			]
		},
		{
			path:'/seller',
			component:Seller,
			children:[
				{
					name:'sellerGoods',
					path:'sellerGoods',
					component:SellerGoods
				},
				{
					name:"sellerEval",
					path:"sellerEval",
					redirect:'sellerEval/evalContent',
					component:SellerEval,
					children:[
						{	
							name:'evalConten',
							path:'evalContent',
							component:EvalContent
						}
					]
				},
				{
					name:'sellerInfo',
					path:'sellerInfo',
					component:SellerInfo
				}
			]
		}
	]
})
