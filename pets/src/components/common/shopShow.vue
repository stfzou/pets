<template>
  <div class="shopShow">
      <img v-if="isAnd" src="../../assets/shopAnd.png" alt="">
      <img v-else src="../../assets/shopIos.png" alt="">
  </div>
</template>

<script>
  import wxapi from '../common/wxapi.js'
  export default{
    data(){
      return{
        isAnd:true
      }

    },
    mounted() {
      this.wxShare();
      this.appTesting();
    },
    methods:{
      appTesting(){
        var u = navigator.userAgent,
        app = navigator.appVersion;

        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
        var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        if (isAndroid) {

        	this.isAnd = true;
        }
        if (isIOS) {
        	this.isAnd = false;
        }
      },
      wxShare(){
        let option = {
          title:'骨米宠物——宠物社交电商平台！', // 分享标题, 请自行替换
          desc:'骨米宠物，为宠物门店提供精准的流量入口和丰富的营销工具，助力宠物商家新零售！',
          link: window.location.href, // 分享链接，根据自身项目决定是否需要split
          imgUrl:'http://gutouzu.oss-cn-shenzhen.aliyuncs.com/static/gumilogo_1024.png', // 分享图标, 请自行替换，需要绝对路径
          success: () => {

          },
          error: () => {
            alert('已取消分享')
          }
        }
        wxapi.wxRegister(option)
      }
    }
  }
</script>

<style lang="scss">
  .shopShow{
    height:100%;
    overflow:hidden;
    img{
     max-width:100%;
     // max-height:100%;
     display:block;
    }
  }
</style>
