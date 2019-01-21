import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
 
export default new Vuex.Store({
  state:{
	nav:{
		navNum:1,
		subNum:0
	}
  },
  mutations:{
	initialNav(state,n){ //初始化nav
		state.nav.navNum = n.navNum;
		state.nav.subNum = n.subNum;
	}
  }
})