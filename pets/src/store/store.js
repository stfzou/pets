import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state:{
      location:{
        lat:0,
        lng:0
      },
			loginInfo:{
				shopId:'',
				productId:''
			},
			activityInfo:{
        cAOrderId:'',
				cAId:'',
				userId:'',
				ticketId:'',
				ticketNum:'',
				ticketType:'',
				aId:''
			},
			loginUrl:'',
			addrInfo:{
				name:''
			},
      orderInfo:null,

			//员工管理系统
			staffNum:'',
			customerNum:''

  },
  mutations:{
    setLocation(state,mapInfo){
      state.location.lat = mapInfo.lat;
      state.location.lng = mapInfo.lng;
    },
    setCAorderId(state,CAorderId){
      state.activityInfo.CAorderId = CAorderId;
    },
		setShopId(state,shopId){//保存商家id
			state.loginInfo.shopId = shopId;
		},
		setProductId(state,productId){//保存商品id
			state.loginInfo.productId = productId;
		},
		setTicket(state,el){//保存活动票券信息
			state.activityInfo.cAId = el.cAId;
			state.activityInfo.userId = el.userId;
			state.activityInfo.ticketId = el.ticketId;
			state.activityInfo.ticketType = el.ticketType;
			state.activityInfo.ticketNum = el.ticketNum;
		},
		setAddrName(state,name){//设置地址选择后将要跳转的页面
			state.addrInfo.name = name;
		},
		setLoginUrl(state,url){//设置登录后需要跳转的页面
			state.loginUrl = url;
		},
    setOrderInfo(state,orderInfo){//设置支付订单信息
      state.orderInfo = orderInfo;
    },
		//员工管理系统
		setCustomerNum(state,num){
			state.customerNum = num
		},
		setStaffNum(state,num){
			state.staffNum = num;
		}

  },

})
