<template>
  <div class="helpList">
    <div class="top_nav flex_r_s_b">
    	<div class="back" @click="back"></div>
    	<div class="nav_title">随机</div>
    </div>
    <div class="helpListCnt">
      <ul>
        <li class="flex_r_s_b" v-for="item in [1,2,3,4,5,6,7,8,9]">
          <span>少时诵诗书所所</span>
          <img src="../../assets/icon/right_sjx.png" alt="">
        </li>
      </ul>
    </div>
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
      },
    }
  }
</script>

<style lang="scss">
  .helpList{
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
    .helpListCnt{
      ul{
        padding:0 20px;
      }
      li{
        border-bottom:1px solid #e8e8e8;/*no*/
        padding:30px 10px;
        box-sizing:border-box;
        img{
          width:14px;
        }
        span{
          font-size:26px;
          color:#000;
        }
      }
    }
  }
</style>
