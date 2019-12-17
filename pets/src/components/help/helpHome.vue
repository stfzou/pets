<template>
  <div class="helpHome">
      <div class="top_nav flex_r_s_b">
      	<div class="back" @click="back"></div>
      	<div class="nav_title">帮助与反馈</div>

      </div>
      <div class="helpHomeCnt">
        <div class="title"><span>问题类型</span></div>
        <ul class="cntList">
          <li class="flex_r_s_b">
            <div class="list_l flex_r_f_s">
              <img src="../../assets/icon_she34.png" alt="">
              <span>关于账号</span>
            </div>
            <div class="list_r">
              <img src="../../assets/icon/right_sjx.png" alt="">
            </div>
          </li>
          <li class="flex_r_s_b">
            <div class="list_l flex_r_f_s">
              <img src="../../assets/icon_she41.png" alt="">
              <span>信息认证</span>
            </div>
            <div class="list_r">
              <img src="../../assets/icon/right_sjx.png" alt="">
            </div>
          </li>
          <li class="flex_r_s_b">
            <div class="list_l flex_r_f_s">
              <img src="../../assets/icon_she143.png" alt="">
              <span>动态发布</span>
            </div>
            <div class="list_r">
              <img src="../../assets/icon/right_sjx.png" alt="">
            </div>
          </li>
          <li class="flex_r_s_b">
            <div class="list_l flex_r_f_s">
              <img src="../../assets/icon_she36.png" alt="">
              <span>关于账号</span>
            </div>
            <div class="list_r">
              <img src="../../assets/icon/right_sjx.png" alt="">
            </div>
          </li>
          <li class="flex_r_s_b" style="border: none;">
            <div class="list_l flex_r_f_s">
              <img src="../../assets/icon_she144.png" alt="">
              <span>关于账号</span>
            </div>
            <div class="list_r">
              <img src="../../assets/icon/right_sjx.png" alt="">
            </div>
          </li>
        </ul>
        <div class="helpLine"></div>
        <div class="title"><span>意见反馈</span></div>
        <div class="inputBox">
          <cube-textarea v-model="value" maxlength="100" placeholder="我们需要您最真诚的意见和反馈，让我们做得更好！"></cube-textarea>
        </div>

      </div>
      <div class="commit flex_r_s_c">提交</div>
  </div>
</template>

<script>
  export default{
    data(){
      return{
        value:''
      }
    },
    methods:{
      back() {
      	this.$router.go(-1); //返回上一层
      },
    }
  }
</script>

<style lang="scss">
  .helpHome{
    height:100%;
    position: relative;
    .top_nav {
    	padding: 0 20px;
    	height: 88px;
    	box-sizing: border-box;
    	z-index: 100;
      border-bottom:1px solid #ff523d;/*no*/
      // background: #fdb366;
    	.back {
    		width: 26px;
    		height: 42px;
    		background: url(../../assets/icon/backColory.png) no-repeat center 0;
    		background-size: cover;
    	}
    	.nav_title {
    		font-size: 30px;
    		color: #333;
    		position: absolute;
    		left: 50%;
    		top: 50%;
    		transform: translate(-50%, -50%);
    		font-weight:400;
    	}

    }
    .helpHomeCnt{
      .title{
        padding:20px;
        span{
          padding-left:10px;
          border-left:4px solid #ff523d;/*no*/
          display:inline-block;
          font-size:28px;
          color:#000;
        }
      }
      .cntList{
        padding:0 20px;
        li{
          border-bottom:1px solid #e8e8e8;/*no*/
          padding:22px 0;
          .list_l{
            img{
              width:30px;
              margin-right:10px;
            }
            span{
              font-size:28px;
              color:#000;
            }
          }
          .list_r{
            img{
              width:14px;
            }
          }
        }
      }
      .helpLine{
        height:10px;/*no*/
        background:#e8e8e8;
      }
      .inputBox{
        padding:0 20px;
        .cube-textarea-wrapper {
          margin-top: 20px;
          height:260px;
        }
      }
    }
    .commit{
      height:96px;
      background:#ff523d;
      color:#fff;
      font-size:30px;
      position: absolute;
      bottom:0;
      left:0;
    }
  }
</style>
