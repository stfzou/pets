<template>
  <div class="appShow">
      <img v-if="isAnd" src="../../assets/androidShow.png" alt="">
      <img v-else src="../../assets/iosShow.png" alt="">
  </div>
</template>

<script>
  export default{
    data(){
      return{
        isAnd:true
      }

    },
    mounted() {
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
      }
    }
  }
</script>

<style lang="scss">
  .appShow{
    height:100%;
    img{
     width:100%;
     height:100%;
     display:block;
    }
  }
</style>
