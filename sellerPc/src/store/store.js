import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
 
export default new Vuex.Store({
  state:{
	nav:{
		navNum:'',
		subNum:'',
		subData:[]
	}
  },
  mutations:{
		initialNav(state,n){ //初始化nav
			state.nav.navNum = n.navNum;
			state.nav.subNum = n.subNum;
			state.nav.subData = n.subData;
		},
		changeIndexNav(state,num){//改变nav的值
			state.nav.navNum = num;
			// state.nav.subNum = subNum;
		},
		changeSubIndex(state,num){//改变subIndex的值
			state.nav.subNum = num;
		},
		setChangeSubData(state,subData){//设置subData的值
			state.nav.subData = subData
		}
  }
})