<template>
  <div id="app">
    <DownApp v-on:closeDown="closeDown" v-show="isDown"></DownApp>
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
import DownApp from './components/common/downApp.vue'
import {mapState} from 'vuex'
export default {
	name: 'App',
	created(){
    //this.isDown = true;
    // console.log(11)
    if(this.$route.name=='agreement'||this.$route.name=='paySus'||this.$route.name=='advertisement'||this.$route.name=='payRes'||this.$route.name=='wxWhitePage'){
      this.isDown = false;
    }
    // console.log()
	},
  watch: {
    $route: {
      handler: function(val, oldVal){

        if(val.name=='agreement'||val.name=='paySus'||val.name=='advertisement'||val.name=='payRes'||val.name=='wxWhitePage'){
          this.isDown = false;

        }else{
          this.isDown = true;

        }
      },
      // 深度观察监听
      deep: true
    }
  },
  components:{
  	DownApp
  },
  data(){
    return{
      isDown:true
    }
  },
  methods:{
    closeDown(){
    	this.isDown = false;
    }
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
.cube-pullup-wrapper .before-trigger{
  font-size: 28px;
}
.cube-pulldown-wrapper .after-trigger .cube-pulldown-loaded{
  font-size: 28px;
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
