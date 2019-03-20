import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state:{
			loginInfo:{
				shopId:'',
				routerName:'',
				productId:''
			},
			activityInfo:{
				cAId:'',
				userId:'',
				ticketId:'',
				ticketNum:'',
				ticketType:''
			}
			
  },
  mutations:{
		
		setShopId(state,shopId){//保存商家id
			state.loginInfo.shopId = shopId;
		},
		setProductId(state,productId){//保存商品id
			state.loginInfo.productId = productId;
		},
		setRouterName(state,name){//保存routerName
			state.loginInfo.routerName = name;
		},
		setTicket(state,el){//保存活动票券信息
			state.activityInfo.cAId = el.cAId;
			state.activityInfo.userId = el.userId;
			state.activityInfo.ticketId = el.ticketId;
			state.activityInfo.ticketType = el.ticketType;
			state.activityInfo.ticketNum = el.ticketNum;
		}
  },
  
})
	
