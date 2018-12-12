<template>
  <div id="app">
    
		<transition name="fade" mode="in-out">
			<keep-alive>
				<router-view v-if="$route.meta.keepAlive"></router-view>
			</keep-alive>
		</transition>
		
		<transition name="fade" mode="in-out">
			<router-view v-if="!$route.meta.keepAlive"></router-view>页面缓存效果 
		</transition>
	
		
  </div>
</template>

<script>
export default {
  name: 'App'
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
.fade-enter {
  opacity:0;
}
.fade-leave{
  opacity:1;
}
.fade-enter-active{
  transition:opacity .5s;
}
.fade-leave-active{
  opacity:0;
  transition:opacity .5s;
}
</style>
