<template>
  <div class="downPage">
    <img src="../../assets/timg.png" alt="">
  </div>
</template>

<script>
  import Api from '../common/apj.js'
  export default{
    data(){
      return {

      }
    },
    mounted() {

      this.getEnvironment()

    },
    methods:{
      getEnvironment() { //静默授权初始化
        var ua = window.navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == 'micromessenger') {
          console.log('这是微信内浏览器')
        } else {
          window.location.href = 'http://gutouzu.oss-cn-shenzhen.aliyuncs.com/manager/app-v1.0.0.apk'
        }
      },
    }
  }
</script>

<style lang="scss">
  .downPage{
    height:100%;
    background:rgba(0,0,0,0.5);
    img{
      width:100%;

    }
  }
</style>
