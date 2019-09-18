<template>
  <div class="invitationZc">
      <div class="navBox flex_r_f_s">
        <img class="back" src="../../assets/icon/backColory.png" alt="">
        <div class="nav flex_r_s_b">
          <a href="###">
            <div>骨米卡超级推广员</div>
            <div class="colorLine"></div>
          </a>
          <a href="###" class="tuiguang">
            <div>邀请好友注册得奖励</div>
            <div class="colorLine"></div>
          </a>
        </div>
      </div>
      <div class="cntImg">
        <img src="../../assets/icon_gu50@2x.jpg" alt="">
      </div>
      <div class="tyBtn flex_r_s_c">同意推广协议</div>
      <div class="footBtn flex_r_s_c">
          查看我的业绩
      </div>
  </div>
</template>

<script>
  import Api from '../common/apj.js'
  export default{
    data(){
      return{

      }
    }
  }
</script>

<style lang="scss">
  .invitationZc{
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
        width:380px;
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
      margin-top:50px;
    }
    .footBtn{
      box-shadow:0px 0px 16px 2px rgba(255,118,96,0.16);
      background:#fff;
      width:320px;
      height:70px;
      border-radius:35px;
      font-size:30px;
      margin:0 auto;
      margin-top:66px;
    }
  }
</style>
