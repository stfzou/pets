<template>
  <div class="cgConduct">

    <img class="bg" src="../../assets/cg_01.png" alt="">
    <img class="bg" src="../../assets/cg_02.png" alt="">
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
          我要来挑战>
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
        userName:''
      }
    },
    mounted() {
      if (JSON.parse(localStorage.getItem('user')) != null) {
      	
        this.userName = JSON.parse(localStorage.getItem('user')).userName;
        
      }
      this.wxShare();
    },
    methods:{
      wxShare(){
        let self = this
        let option = {
          title: '萌宠闯关挑战你的大脑IQ', // 分享标题, 请自行替换
          desc:'我是'+self.userName+'我在骨米宠物参加萌宠闯关大赛，答题得奖励，养宠真有趣。快来试一下，让你脑洞大开！',
          link: window.location.href, // 分享链接，根据自身项目决定是否需要split
          imgUrl:'https://gutouzu.oss-cn-shenzhen.aliyuncs.com/static/gumilogo_1024.png', // 分享图标, 请自行替换，需要绝对路径
          success: () => {

          },
          error: () => {

          }
        }
        wxapi.wxRegister(option)
      },
      downLink(){
        this.$router.push({
          name:'cgIndex'
        })
      },
    }
  }
</script>

<style lang="scss">
  .cgConduct{
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
          background:linear-gradient(90deg,#a270fd,#fe71e5,#fe8071);
          line-height:36px;
          font-size:24px;
          text-align:center;
          line-height:72px;
          font-size:30px;
        }
      }
    }
  }
</style>
