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
import Activity from '@/components/activity/activity'
import ActivityMap from '@/components/activity/activityMap'
import SelectCoupon from '@/components/activity/selectCoupon'
import ActivityEnter from '@/components/activity/activityEnter'
import ActivityOrder from '@/components/activity/activityOrder'
import Trend from '@/components/activity/trend'
import Praise from '@/components/activity/praise'
import DynamicHome from '@/components/activity/dynamicHome'
import Dynamic from '@/components/activity/dynamic'
import AuthorActivity from '@/components/activity/authorActivity'
import AuthorPets from '@/components/activity/authorPets'
import Answer from '@/components/answer/answer'
import AnswerOne from '@/components/answer/answerOne'
import CouponList from '@/components/shareCoupon/couponList'
import ShopCoupon from '@/components/shareCoupon/shopCoupon'
import CouponXq from '@/components/shareCoupon/couponXq'
import GumiCard from '@/components/gumika/gumiCard'


/*workOs*/
import WorkOsLogin from '@/components/workOs/workOsLogin'
import WorkOsInfoList from '@/components/workOs/workOsInfoList'
import WorkOsCustomer from '@/components/workOs/workOsCustomer'
import WorkOsMap from '@/components/workOs/workOsMap'
import WorkOsPcMap from '@/components/workOs/workOsPcMap'
import AddCustomer from '@/components/workOs/AddCustomer'
import EditCustomer from '@/components/workOs/editCustomer'
import WorkOsChangePw from '@/components/workOs/workOsChangePw'
import StaffInfo from '@/components/workOs/staffInfo'
import AddStaff from '@/components/workOs/addStaff'
import EditStaff from '@/components/workOs/editStaff'
import VisitRecords from '@/components/workOs/visitRecords'
import ShopNameVisit from '@/components/workOs/shopNameVisit'
import AddVisitInfo from '@/components/workOs/addVisitInfo'
import VisitInfoList from '@/components/workOs/visitInfoList'
import WorkTable from '@/components/workOs/workTable'
import AddWorkTable from '@/components/workOs/addWorkTable'
import WorkTableXq from '@/components/workOs/workTableXq'

Vue.use(Router)
export default new Router({
	mode: 'history',
    routes:[
		{
		  path:'',
		  redirect:'/workOsInfoList'
		},
		{
			path:'/vLogin',
			name:'vLogin',
			component:vLogin,
		},
		{
			path:'/answer',
			name:'answer',
			component:Answer,
			children:[
				{
					path:'answerOne',
					component:AnswerOne,
					name:'answerOne'
				}

			]
		},
    {
      path:'/gumiCard',
      name:'gumiCard',
      component:GumiCard
    },
		{
			path:'/couponList',
			name:'couponList',
			component:CouponList,
		},
		{
			path:'/shopCoupon',
			name:'shopCoupon',
			component:ShopCoupon,
		},
		{
			path:'/couponXq',
			name:'couponXq',
			component:CouponXq,
		},
		{
			path:'/workOsLogin',
			name:'workOsLogin',
			component:WorkOsLogin,
		},
		{
			path:'/staffInfo',
			name:'staffInfo',
			component:StaffInfo,
		},
		{
			path:'/addStaff',
			name:'addStaff',
			component:AddStaff,
		},
		{
			path:'/editStaff',
			name:'editStaff',
			component:EditStaff
		},
		{
			path:'/workOsChangePw',
			name:'workOsChangePw',
			component:WorkOsChangePw,
		},
    {
      path:'/visitRecords',
      name:'visitRecords',
      component:VisitRecords,
    },
    {
      path:'/shopNameVisit',
      name:'shopNameVisit',
      component:ShopNameVisit,

    },
    {
      path:'/addVisitInfo',
      name:'addVisitInfo',
      component:AddVisitInfo,
    },
    {
      path:'/visitInfoList',
      name:'visitInfoList',
      component:VisitInfoList,
    },
    {
      path:'/workTable',
      name:'workTable',
      component:WorkTable,
      meta:{
        keepAlive:true
      }
    },
    {
      path:'/workTableXq',
      name:'workTableXq',
      component:WorkTableXq
    },
    {
      path:'/addWorkTable',
      name:'addWorkTable',
      component:AddWorkTable,
    },
		{
			path:'/workOsInfoList',
			name:'workOsInfoList',
			component:WorkOsInfoList,

		},
		{
			path:'/addCustomer',
			name:'addCustomer',
			component:AddCustomer
		},
		{
			path:'/editCustomer',
			name:'editCustomer',
			component:EditCustomer
		},
		{
			path:'/workOsCustomer',
			name:'workOsCustomer',
			component:WorkOsCustomer

		},
		{
			path:'/workOsMap',
			name:'workOsMap',
			component:WorkOsMap,

		},
		{
			path:'/workOsPcMap',
			name:'workOsPcMap',
			component:WorkOsPcMap,
		},
		{
			path:'/dynamicHome',
			name:'dynamicHome',
			component:DynamicHome,
			children:[
				{
					path:'dynamic',
					component:Dynamic,
					name:'dynamic'
				},
				{
					path:'authorActivity',
					component:AuthorActivity,
					name:'authorActivity'
				},
				{
					path:'authorPets',
					component:AuthorPets,
					name:'authorPets'
				}
			]
		},
		{
			path:'/activity',
			name:'activity',
			component:Activity
		},
		{
			path:'/praise',
			name:'praise',
			component:Praise
		},
		{
			path:'/activityEnter',
			name:'activityEnter',
			component:ActivityEnter
		},
		{
			path:'/trend',
			name:'trend',
			component:Trend
		},
		{
			path:'/activityOrder',
			name:'activityOrder',
			component:ActivityOrder
		},
		{
			path:'/activityMap',
			name:'activityMap',
			component:ActivityMap
		},
		{
			path:'/selectCoupon',
			name:'selectCoupon',
			component:SelectCoupon
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
