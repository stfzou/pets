<template>
  <div id="app">
    <!-- <div class="demo1-video">

         <video
         muted
         autoplay="autoplay"
         loop="loop"
         preload="auto" class="my-video" src="//dc.xhscdn.com/a10d0710-80f1-11e9-9036-5948d2131083/new5.27.mp4">


         </video>
     </div> -->
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
  export default {
    name: 'App',
    mounted() {
      this.browserRedirect();
    },
    methods: {
      browserRedirect() {
        var sUserAgent = navigator.userAgent.toLowerCase();
        if (/ipad|iphone|midp|rv:1.2.3.4|ucweb|android|windows ce|windows mobile/.test(sUserAgent)) {
          //跳转移动端页面
          window.location.href = "https://h5.gumipet.com/index.html#/mobileHome/mobileIndex"

        } else {
          //跳转pc端页面


        }
      }

    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    height: 100%;
    position: relative;
    font-size: 14px;
    height: 100%;

  }

  .el-upload-list--picture .el-upload-list__item {
    display: none;
  }
</style>
