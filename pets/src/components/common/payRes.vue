<template>
  <div class="payResWarp">
      <div class="payCnt flex_r_s_c">
           <img src="../../assets/payLoad.gif" alt="">
           <p>正在等待支付结果，请稍后</p>
      </div>
  </div>
</template>

<script>
  import Api from '../common/apj.js'
  export default{
    data(){
      return{
        userId:'',
      }
    },
    methods:{

    }
  }
</script>

<style lang="scss">
    .payResWarp{
      height: 100%;
      width: 100%;
      .payCnt{
        height: 100%;
        width: 100%;
        flex-direction:column;
        p{
          padding-top: 50px;
          color: #333;
          font-size: 30px;
        }
      }
    }
</style>
