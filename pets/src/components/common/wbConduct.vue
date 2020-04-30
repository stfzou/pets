<template>
  <div class="wbConduct">
    <img class="bg"  src="../../assets/wb_01.png" alt="">
    <img class="bg"  src="../../assets/wb_02.png" alt="">
    <div class="conductFoot">
      <div class="conductFootCnt flex_r_s_b">
        <div class="cnt_l flex_r_f_s">
           <img src="../../assets/gumipetlogo_256.png" alt="">
           <div class="conductTetx">
             <h3>骨米宠物</h3>
             <p>发现身边的养宠乐趣</p>
           </div>
        </div>
        <div class="conductBtn" @click="downLink">
          立即下载 <br><span>下载领取可提现红包</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import wxapi from './wxapi.js'
  export default{
    data(){
      return{

      }
    },
    mounted() {
      this.wxShare();
    },
    methods:{
      wxShare(){
        let self = this
        let option = {
          title: '一款遛狗就能得奖励的健身软件', // 分享标题, 请自行替换
          desc:'快来和附近的养宠小伙伴一起上骨米宠物遛狗吧，遛狗得奖励，开启遛狗新模式！',
          link: window.location.href, // 分享链接，根据自身项目决定是否需要split
          imgUrl:'https://gutouzu.oss-cn-shenzhen.aliyuncs.com/static/wangbu.png', // 分享图标, 请自行替换，需要绝对路径
          success: () => {

          },
          error: () => {

          }
        }
        wxapi.wxRegister(option)
      },
      downLink(){
        this.$router.push({
          name:'appShowBtn'
        })
      },
    }
  }
</script>

<style lang="scss">
  .wbConduct{
    .bg{
      width:100%;
      display:block;
    }
    .conductFoot{
      position:fixed;
      bottom:0;
      left:0;
      width:100%;

      box-sizing:border-box;
      .conductFootCnt{
        height:130px;
        background:#fff;
        padding:0 30px;

        box-sizing:border-box;
        .cnt_l{
          width:350px;
          img{
            width:90px;
            height:90px;
          }
          .conductTetx{
            margin-left:20px;
            h3{
              font-size:30px;
              color:#333;

            }
            p{
              font-size:24px;
              color:#999;
              padding-top:20px;
            }
          }
        }
        .conductBtn{
          width:230px;
          height:72px;
          border-radius:36px;
          color:#fff;
          background:#FF523D;
          line-height:36px;
          font-size:24px;
          text-align:center;
          span{
            font-size:20px;
          }
        }
      }
    }
  }
</style>
