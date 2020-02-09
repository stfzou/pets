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
import CommunityActivity from '@/components/activity/communityActivity'
import CouponList from '@/components/shareCoupon/couponList'
import ShopCoupon from '@/components/shareCoupon/shopCoupon'
import CouponXq from '@/components/shareCoupon/couponXq'
import ShopStore from '@/components/shareCoupon/shopStore'
import GumiCard from '@/components/gumika/gumiCard'
import PayRes from '@/components/common/payRes'
import WxWhitePage from '@/components/common/wxWhitePage'
import AppShow from '@/components/common/appShow'
import AppShowBtn from '@/components/common/appShowBtn'
import ShopShow from '@/components/common/shopShow'
import Agreement from '@/components/common/agreement'
import PaySus from '@/components/common/paySus'
import Advertisement from '@/components/common/advertisement'
import QuestionOne from '@/components/answer/questionOne'
import QuestionTwo from '@/components/answer/questionTwo'
import AnswerOne from '@/components/answer/answerOne'
import AnswerTwo from '@/components/answer/answerTwo'
import AnswerWhite from '@/components/answer/answerWhite'
import PrizeHistory from '@/components/prizeHistory/prizeHistory'
import InvitationGu from '@/components/invitation/invitationGu'
import InvitationZc from '@/components/invitation/invitationZc'
import GudouShop from '@/components/invitation/gudouShop'
import ExChangeXq from '@/components/invitation/exChangeXq'
import PresentCenter from '@/components/invitation/presentCenter'
import PresentSearch from '@/components/invitation/presentSearch'
import WbShare from '@/components/wangbu/wbShare'
import CgShare from '@/components/chuangGuan/cgShare'
import CgRecord from '@/components/chuangGuan/cgRecord'
import NearbyActivity from '@/components/activity/nearbyActivity'
import NearbyCoupon from '@/components/shareCoupon/nearbyCoupon'
import HelpHome from '@/components/help/helpHome'
import HelpList from '@/components/help/helpList'
import HelpCnt from '@/components/help/helpCnt'
import BargainList from '@/components/bargain/bargainList'
import Bargain from '@/components/bargain/bargain'
import BargainGoods from '@/components/bargain/bargainGoods'
import BargainRule from '@/components/bargain/bargainRule'
import RushToBuyList from '@/components/rushToBuy/rushToBuyList'
import RushToBuyXq from '@/components/rushToBuy/rushToBuyXq'
import MobileHome from '@/components/mobileWebSite/mobileHome'
import MobileIndex from '@/components/mobileWebSite/mobileIndex'
import MobileCoupon from '@/components/mobileWebSite/mobileCoupon'
import MobileShopCoupon from '@/components/mobileWebSite/mobileShopCoupon'
import MobileActivity from '@/components/mobileWebSite/mobileActivity'

Vue.use(Router)
export default new Router({
  //history
	mode:'hash',
    routes:[
		{
		  path:'',
		  redirect:'/mobileHome/mobileIndex'
		},
		{
			path:'/vLogin',
			name:'vLogin',
			component:vLogin,
		},
    {
      path:'/mobileHome',
      name:'mobileHome',
      component:MobileHome,
      children:[
        {
          path:'mobileIndex',
          name:'mobileIndex',
          component:MobileIndex
        },
        {
          path:'mobileCoupon',
          name:'mobileCoupon',
          component:MobileCoupon
        },
        {
          path:'mobileShopCoupon',
          name:'mobileShopCoupon',
          component:MobileShopCoupon
        },
        {
          path:'mobileActivity',
          name:'mobileActivity',
          component:MobileActivity
        }
      ]
    },
    {
      path:'/rushToBuyList',
      name:'rushToBuyList',
      component:RushToBuyList
    },
    {
      path:'/rushToBuyXq',
      name:'rushToBuyXq',
      component:RushToBuyXq
    },
    {
      path:'/bargainGoods',
      name:'bargainGoods',
      component:BargainGoods
    },
    {
      path:'/bargain',
      name:'bargain',
      component:Bargain
    },
    {
      path:'/bargainRule',
      name:'bargainRule',
      component:BargainRule
    },
    {
      path:'/nearbyActivity',
      name:'nearbyActivity',
      component:NearbyActivity
    },
    {
      path:'/bargainList',
      name:'bargainList',
      component:BargainList
    },
    {
      path:'/nearbyCoupon',
      name:'nearbyCoupon',
      component:NearbyCoupon
    },
    {
      path:'/helpHome',
      name:'helpHome',
      component:HelpHome
    },
    {
      path:'/helpList',
      name:'helpList',
      component:HelpList
    },
    {
      path:'/helpCnt',
      name:'helpCnt',
      component:HelpCnt
    },
    {
      path:'/paySus',
      name:'paySus',
      component:PaySus,
    },
    {
      path:'/advertisement',
      name:'advertisement',
      component:Advertisement
    },
	{
		path:'/appShow',
		name:'appShow',
		component:AppShow
	},
  {
    path:'/appShowBtn',
    name:'appShowBtn',
    component:AppShowBtn
  },
  {
  	path:'/shopShow',
  	name:'shopShow',
  	component:ShopShow
  },
    {
    	path:'/cgShare',
    	name:'cgShare',
    	component:CgShare,
    },
    {
    	path:'/cgRecord',
    	name:'cgRecord',
    	component:CgRecord,
    },
    {
      path:'/prizeHistory',
      name:'prizeHistory',
      component:PrizeHistory,
    },
    {
      path:'/agreement',
      name:'agreement',
      component:Agreement,
    },
    {
      path:'/wbShare',
      name:'wbShare',
      component:WbShare,
    },
    {
      path:'/invitationGu',
      name:'invitationGu',
      component:InvitationGu,
    },
    {
      path:'/invitationZc',
      name:'invitationZc',
      component:InvitationZc,
    },
    {
      path:'/exChangeXq',
      name:'exChangeXq',
      component:ExChangeXq,
    },
    {
      path:'/presentCenter',
      name:'presentCenter',
      component:PresentCenter,
    },
    {
      path:'/gudouShop',
      name:'gudouShop',
      component:GudouShop,
    },
    {
      path:'/presentSearch',
      name:'presentSearch',
      component:PresentSearch,
      meta:{
      	keepAlive:true // 需要要缓存
      }
    },
    {
    	path:'/wxWhitePage',
    	name:'wxWhitePage',
    	component:WxWhitePage,
    },
    {
    	path:'/answerOne',
    	name:'answerOne',
    	component:AnswerOne,
    },
    {
    	path:'/answerTwo',
    	name:'answerTwo',
    	component:AnswerTwo,
    },
    {
      path:'/questionOne',
      name:'questionOne',
      component:QuestionOne,
    },
    {
      path:'/questionTwo',
      name:'questionTwo',
      component:QuestionTwo,
    },
    {
      path:'/answerWhite',
      name:'answerWhite',
      component:AnswerWhite,
    },
    {
      path:'/payRes',
      name:'payRes',
      component:PayRes,
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
    	path:'/shopStore',
    	name:'shopStore',
    	component:ShopStore,
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
      path:'/communityActivity',
      name:'communityActivity',
      component:CommunityActivity
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
	],


})
