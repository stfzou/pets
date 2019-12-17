<template>
  <div class="appShow">
      <img v-if="isAnd" src="../../assets/androidShow.png" alt="">
      <img v-else src="../../assets/iosShow.png" alt="">
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
          title:'骨米宠物——宠物生活社交平台！', // 分享标题, 请自行替换
          desc:'显示附近3公里商圈内的宠物商户优惠信息，分享养宠趣事、参与宠物活动，养宠更有趣！',
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
  .appShow{
    height:100%;
    overflow:hidden;
    img{
     max-width:100%;
     display:block;
    }
  }
</style>
