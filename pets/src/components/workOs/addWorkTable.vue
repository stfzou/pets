<template>
  <div class="addWorkTable">
   <div class="login_nav">
   	<div class="back" @click="back"></div>
   	<div class="title">添加工作报表</div>
   </div>
   <div class="cntList">
     <ul>
       <li class="list1">
         <h3>本周工作总结:</h3>
         <textarea v-model="val"></textarea>
       </li>
       <li>
         <h3>下周工作安排:</h3>
         <textarea v-model="val"></textarea>
       </li>
       <li>
         <h3>需协助工作内容及建议:</h3>
         <textarea v-model="val"></textarea>
       </li>
     </ul>
   </div>
   <div class="cmiBtn">提交</div>
  </div>
</template>

<script>
  export default{
    data(){
      return{
        val:''
      }
    },
    methods:{
      back(){
      	this.$router.push({
      		name:'workOsInfoList'
      	});
      },
    }
  }
</script>

<style lang="scss">
  .addWorkTable{
    .login_nav{
    	height: 42px;
    	padding: 22px 0;
    	position: relative;
    	border-bottom: 1px solid #e8e8e8;
    	.back{
    		background: url("../../assets/icon/backColory.png") no-repeat center 0;
    		background-size: cover;
    		width: 24px;
    		height: 40px;
    		position: absolute;
    		left: 20px;
    		top: 50%;
    		margin-top: -21px;
    	}
    	.title{
    		font-size: 30px;
    		color: #333;
    		line-height: 42px;
    		text-align: center;
    	}
    }
    .cntList{
      li{

        padding: 0 20px;
        padding-top: 20px;
        h3{
          font-size: 28px;
          color: #333;
          margin-bottom: 10px;
        }
        textarea{
          width: 100%;
          height: 200px;
          box-sizing: border-box;
          outline: none;
        }
      }
      .list1{
        textarea{
          height: 300px;
        }

      }

    }
    .cmiBtn{
      width: 100px;
      height: 50px;
      background: #ff523d;
      color: #fff;
      line-height: 50px;
      text-align: center;
      font-size: 26px;
      margin: 30px auto 0 auto;
      border-radius: 5px;
    }
  }
</style>
