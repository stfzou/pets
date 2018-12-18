<template>
  <div id="app">
    
		<transition name="fade">
			<keep-alive>
				<router-view v-if="$route.meta.keepAlive"></router-view>
			</keep-alive>
		</transition>
		
		<transition name="fade">
			<router-view v-if="!$route.meta.keepAlive"></router-view>页面缓存效果 
		</transition>
		<Loading v-if="loading"></Loading>
		
  </div>
</template>

<script>
import Loading from './components/common/loading.vue'
import {mapState} from 'vuex'
export default {
  name: 'App',
	created() {
		this.$store.commit('showLoading');
		setTimeout(()=>{
			this.$store.commit("hideLoading");
		},1000)
	},
	components:{
		Loading
	},
	computed:{
		 ...mapState([
            'loading'
      ])
	}
}
</script>

<style lang="scss">
	@import './style/common.scss';
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
	
  
}

.div1{
	// @include font-dpr(16px);
	font-size: 16px;/*no*/
}
// .fade-enter {
//   opacity:0;
// }
// .fade-leave{
//   opacity:1;
// }
// .fade-enter-active{
//   transition:opacity .3s;
// }
// .fade-leave-active{
//   opacity:0;
//   transition:opacity .3s;
// }

.fade-enter-active, .fade-leave-active {
   transition: opacity .5s
}
.fade-enter, .fade-leave-active {
   opacity: 0
}
</style>
