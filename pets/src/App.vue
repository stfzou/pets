<template>
  <div id="app">
    
		<!-- <transition name="fade"> -->
			<keep-alive>
				<router-view v-if="$route.meta.keepAlive"></router-view>
			</keep-alive>
		<!-- </transition> -->
		
		<!-- <transition name="fade"> -->
			<router-view v-if="!$route.meta.keepAlive"></router-view>
		<!-- </transition> -->
		
  </div>
</template>

<script>

import {mapState} from 'vuex'
export default {
	name: 'App',
	created() {
		
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
  height: 100%;
  
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
