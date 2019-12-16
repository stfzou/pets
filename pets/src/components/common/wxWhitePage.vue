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

      this.getAppUrl()

    },
    methods:{
      getEnvironment(url) { //静默授权初始化
        var ua = window.navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == 'micromessenger') {
          console.log('这是微信内浏览器')
        } else {
          //这个是安卓操作系统
          //alert(1)
           window.location.href = url;
          //alert('这个是安卓操作系统')
         
        }
      },
      getAppUrl(){
        let self = this;
        self.axios.post(Api.userApi+'/version/selectNewestVersionInfo',{
        	headers: {
        		'Content-Type': 'application/x-www-form-urlencoded'
        	}
        }).then((res)=>{
          if(res.data.code==1){
            self.getEnvironment(res.data.data.address)
          }else{
            alert(res.data.msg)
          }
        })
      }
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
