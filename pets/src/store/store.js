import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state:{
			loginInfo:{
				userName:'',
				userId:'',
				token:'',
				shopId:'',
				routerName:'',
				productId:''
			},
			
  },
  mutations:{
		setUserInfo(state,payload){//保存登录时的状态
			state.loginInfo.userId = payload.userId;
			state.loginInfo.userName = payload.userName;
			state.loginInfo.token = payload.token;
		},
		setShopId(state,shopId){//保存商家id
			state.loginInfo.shopId = shopId;
		},
		setProductId(state,productId){//保存商品id
			state.loginInfo.productId = productId;
		},
		setRouterName(state,name){//保存routerName
			state.loginInfo.routerName = name;
		}
  },
  
})
	
