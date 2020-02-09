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
    this.browserRedirect();
    if(this.$route.name=='mobileActivity'||this.$route.name=='mobileShopCoupon'||this.$route.name=='mobileCoupon'||this.$route.name=='mobileIndex'||this.$route.name=='appShowBtn'||this.$route.name=='bargainRule'||this.$route.name=='bargain'||this.$route.name=='shopShow'||this.$route.name=='appShow'||this.$route.name=='agreement'||this.$route.name=='cgShare'||this.$route.name=='paySus'||this.$route.name=='advertisement'||this.$route.name=='payRes'||this.$route.name=='wxWhitePage'){
      this.isDown = false;
    }
	},
  watch: {
    $route: {
      handler: function(val, oldVal){

        if(val.name=='mobileActivity'||val.name=='mobileShopCoupon'||val.name=='mobileCoupon'||val.name=='mobileIndex'||val.name=='appShowBtn'||val.name=='bargainRule'||val.name=='bargain'||val.name=='shopShow'||val.name=='appShow'||val.name=='agreement'||val.name=='paySus'||val.name=='advertisement'||val.name=='payRes'||val.name=='wxWhitePage'||val.name=='cgShare'){
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
    },
    browserRedirect() {
      var sUserAgent = navigator.userAgent.toLowerCase();
      if (/ipad|iphone|midp|rv:1.2.3.4|ucweb|android|windows ce|windows mobile/.test(sUserAgent)) {
        //跳转移动端页面
        // window.location.href = "http://192.168.0.104:8081/#/mobileHome/mobileIndex"

      } else {
        //跳转pc端页面
        window.location.href = "http://www.gumipet.com"

      }
    }
  }

}
</script>

<style lang="scss">
	@import './style/common.scss';
  @import 'font/font.css';
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
