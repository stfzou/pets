import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
 
export default new Vuex.Store({
  state:{
    inhabitantsData:{sellerInfo:false,aptitudeInfo:false} //商家入驻信息提交状态
  },
  mutations:{
	sellerInfoSuccess(state){ //商家信息提交成功
		state.inhabitantsData.sellerInfo = true;
	},
    aptitudeInfoSuccess(state){ //资质信息提交成功
		state.inhabitantsData.aptitudeInfo = true;
	}
  }
})