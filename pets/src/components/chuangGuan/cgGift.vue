<template>
  <div class="cgGiftWarp">
    <div class="top_nav flex_r_s_b">
      <div class="back" @click="back"></div>
      <div class="nav_title">萌宠闯关</div>
    </div>
    <div class="cgGiftTitle">
      答题完成<br>闯关成功
    </div>
    <div class="shopName">
      恭喜您获得由 <br> <span>{{companyName}}</span><br>提供的惊喜大礼包一份
    </div>
    <div class="imgBox"><img :src="imgUrl" alt=""></div>
    <div class="cName">{{name}} <br>天猫价：￥{{price}}元 <br>(限24小时内领取有效)</div>
    <div class="cgGiftBtn flex_r_s_c" @click="downLink">下载骨米宠物APP立即领取</div>
    <div class="cgGiftTip">
      <span>领取说明</span> <br>1、下载骨米宠物APP <br>2、登录后在【我的】-【我的订单】-【骨豆订单】即可领取。
    </div>
  </div>
</template>

<script>
  import wxapi from '../common/wxapi.js'
  import Api from '../common/apj.js'
  export default{
    data(){
      return{

        userName:'',
        userId:'',
        imgUrl:'',
        price:'',
        companyName:'',
        name:''
      }
    },
    mounted() {
      if (JSON.parse(localStorage.getItem('user')) != null) {
      	this.userId = JSON.parse(localStorage.getItem('user')).userId;
        this.userName = JSON.parse(localStorage.getItem('user')).userName;
        this.imgUrl = this.$route.query.imgUrl;
        this.price = this.$route.query.price;
        this.companyName = this.$route.query.companyName;
        this.name = this.$route.query.name;
        this.wxShare();
        this.getSus();
      }else{
        this.$router.push({
          name:'cgIndex'
        })
      }
    },
    methods:{
      back() {
      	this.$router.go(-1); //返回上一层
      },
      downLink(){
        this.$router.push({
          name:'appShowBtn'
        })
      },

    }
  }
</script>

<style lang="scss" scoped="scoped">
  .cgGiftWarp{
    height:100%;
    background:#FE8F70;
    position:relative;
    overflow:auto;
    .top_nav {
    	padding: 0 20px;
    	height: 88px;
    	box-sizing: border-box;
    	position: fixed;
    	z-index: 100;
      position: relative;
    	.back {
    		width: 26px;
    		height: 42px;
    		background: url(../../assets/icon/back@2x.png) no-repeat center 0;
    		background-size: cover;
    	}

    	.nav_title {
    		font-size: 30px;
    		color: #fff;
    		position: absolute;
        text-align: center;
    		left: 50%;
    		top: 50%;
    		transform: translate(-50%, -50%);
        width:500px;
        overflow: hidden;/*超出部分隐藏*/
        text-overflow:ellipsis;/* 超出部分显示省略号 */
        white-space: nowrap;/*规定段落中的文本不进行换行 */
    	}

    }
    .cgGiftTitle{
      font-size:80px;
      font-family:HappyZcool-2016;
      text-shadow:0px 8px 0px rgba(186,20,0,0.3);
      color:#fff;
      line-height:100px;
      text-align:center;
      padding-top:20px;
    }
    .shopName{
      font-size:30px;
      color:#fff;
      line-height:48px;
      text-align:center;
      padding-top:30px;
      span{
        color:#FEF01C;
      }
    }
    .cName{
      font-size:30px;
      color:#fff;
      line-height:48px;
      text-align:center;
      padding:30px 30px 0 30px;
    }
    .imgBox{
      width:200px;
      height:200px;
      border-radius:10px;
      background:#fff;
      margin:30px auto 0 auto;
      img{
        width:100%;
        height:100%;
        object-fit: cover;
        border-radius:10px;
        display:block;
      }
    }
    .cgGiftBtn{
      width:419px;
      height:70px;
      background:rgba(255,255,255,1);
      border-radius:35px;
      font-size:28px;
      color:#F34040;
      margin:40px auto 0 auto;
    }
    .cgGiftTip{
      padding:30px 30px 28px 30px;
      line-height:40px;
      font-size:24px;
      color:#fff;
      span{
        font-weight:bold;
      }
    }
  }
</style>
