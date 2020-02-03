<template>
  <div class="appShowBtn">
    <!-- <img class="appShowBtnBg" src="../../assets/appShowBg.png" alt=""> -->
     <div class="btnBox">
        <div class="btn flex_r_s_b ios" @click="iosDown">
          <div class="flex_r_s_c">
            <img src="../../assets/iOS.png" alt="">
            <span>iPhone下载</span>
          </div>

        </div>
        <div class="btn flex_r_s_b and" @click="andDown">
          <div class="flex_r_s_c">
            <img src="../../assets/Android.png" alt="">
            <span>Android下载</span>
          </div>

        </div>
     </div>
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

    },
    methods:{
      iosDown(){
        window.location.href = 'https://itunes.apple.com/cn/app/id1437699756';
      },
      andDown(){
        window.location.href = 'http://app.xiaomi.com/details?id=com.freedogs.freedogs';
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

<style lang="scss" scoped="scoped">
  .appShowBtn{
    height:100%;
    overflow:hidden;
    position:relative;
    background-image:url("../../assets/appShowBg.png");
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    .appShowBtnBg{
     max-width:100%;
     height:100%;
     display:block;
    }
    .btnBox{
      position: absolute;
      bottom:0;
      left:0;
      width:100%;
      .btn{
        width:490px;
        height:90px;
        background:#fff;
        margin:0 auto;
        border-radius:50px;
        font-size:28px;
        margin-bottom:60px;
        color:#333;
        img{
          width:40px;
          margin-right:10px;
        }
      }

    }
  }
</style>
