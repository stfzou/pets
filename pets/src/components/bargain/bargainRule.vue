<template>
  <div class="bargainRule">
    <div class="top_nav flex_r_s_b">
    	<div class="back" @click="back"></div>
    	<div class="nav_title flex_r_s_c">砍价规则</div>
    </div>
    <p>
      1、砍价免费拿专场商品是由骨米宠物平台官方提供，为养宠用户提供免费领取宠物商品的福利活动，消费者通过参与砍价免费拿活动不涉及任何支付行为，请广大养宠用户放心参与。<br>
      2、选择您心仪的商品后，邀请好友一起砍价，在24小时内砍价金额砍到0元并填写好地址后，我们将会对部分商品进行订单审核。审核成功后即可发货，无须承担任何商品成本及邮费。若发现异常砍价订单（包括并不仅于恶意刷单、非正常手段砍成），砍价活动运营方有权取消订单。<br>
      3、必须在砍价前提供收货地址，没有收货地址砍到0元也是砍价失败，将无法为您发货。<br>
      4、砍价活动需要好友共同参与，每次砍价以页面显示金额为准，参与好友超多越容易成功。<br>
      5、您每天最多能帮助3个骨米用户砍价，对于同一个砍价商品，只能帮助砍价1次。<br>
      6、同一个砍价商品库存有限，若砍价商品库存被其他用户优先领完，其他同一个砍价商品将自动失效。
    </p>

  </div>
</template>

<script>
  export default{
    data(){
      return{

      }
    },
    methods:{
      back() {
       
      	this.$router.go(-1); //返回上一层
      }
    }
  }
</script>

<style lang="scss" scoped="scoped">
  .bargainRule{
    .top_nav {
    	padding: 0 20px;
    	height: 88px;
    	box-sizing: border-box;

    	.back {
    		width: 26px;
    		height: 42px;
    		background: url(../../assets/icon/backColory.png) no-repeat center 0;
    		background-size: cover;
    	}

    	.nav_title {
    		font-size: 30px;
    		color: #000;
    		position: absolute;
    		left: 50%;
    		top: 50%;
    		transform: translate(-50%, -50%);
        width:500px;
        height:50px;
        text-align: center;
        overflow: hidden;/*超出部分隐藏*/
        text-overflow:ellipsis;/* 超出部分显示省略号 */
        white-space: nowrap;/*规定段落中的文本不进行换行 */
    	}

    }
    .title{
      font-size:32px;
      color:#000;
      font-weight:bold;
      text-align:center;
      padding-bottom:30px;
    }
    p{
      font-size:30px;
      color:#333;
      line-height:48px;
      padding:0 20px;
    }
  }
</style>
