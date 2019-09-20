<template>
  <div class="invitationGu">
      <div class="navBox flex_r_f_s">
        <img class="back" src="../../assets/icon/backColory.png" alt="">
        <div class="nav flex_r_s_b">
          <a href="###" class="tuiguang">
            <div>骨米卡超级推广员</div>
            <div class="colorLine"></div>
          </a>
          <a href="###">
            <div>邀请好友注册得奖励</div>
            <div class="colorLine"></div>
          </a>
        </div>
      </div>
      <div class="cntImg">
        <img src="../../assets/icon_gu49@2x.jpg" alt="">
      </div>
      <div class="readXy">
        <cube-checkbox v-model="checked">
          点击阅读骨米特权卡用户推广协议
        </cube-checkbox>
      </div>
      <div class="tyBtn flex_r_s_c">同意推广协议</div>
      <div class="footBtn flex_r_s_b">
        <div class="flex_r_s_c">获取推广海报</div>
        <div class="flex_r_s_c">查看我的业绩</div>
      </div>
  </div>
</template>

<script>
  import Api from '../common/apj.js'
  export default{
    data(){
      return{
        checked:false
      }
    }
  }
</script>

<style lang="scss">
  .invitationGu{
    padding-bottom:20px;
    .navBox{
      padding:20px 60px;
      box-sizing: border-box;
      .back{
        width:24px;
        position: absolute;
        left:20px;
        top:15px;

      }
      a{
        display:block;
        font-size:32px;
        color:#333;
        .colorLine{
          height:3px;
          width:150px;
          margin:0 auto;
          margin-top:10px;
          background:#fff;
        }
      }
      .tuiguang{
        color:#ff523d;
        .colorLine{
          height:3px;
          width:150px;
          margin:0 auto;
          margin-top:10px;
          background:#ff523d;
        }
      }
    }
    .cntImg{
      img{
        width:100%;
      }

    }
    .readXy{
      .cube-checkbox{
        width:400px;
        margin:0 auto;
      }
      .cube-checkbox-label{
        font-size:24px;
        color:#666;
      }
    }
    .tyBtn{
      width:320px;
      height:70px;
      background:linear-gradient(0deg,#f34e24,#f56540,#ec4d2e,#e22e2e);
      box-shadow:0px 6px 8px 0px rgba(255,118,96,0.16);
      border-radius:35px;
      font-size:30px;
      color:#fff;
      margin:0 auto;
      margin-top:10px;
    }
    .footBtn{
      padding:0 40px;
      padding-top:60px;
      box-sizing:border-box;
      div{
        width:280px;
        height:70px;
        background:#fff;
        box-shadow:0px 0px 16px 2px rgba(255,118,96,0.16);
        border-radius:35px;
        font-size:30px;
        color:#333;
      }
    }
  }
</style>
