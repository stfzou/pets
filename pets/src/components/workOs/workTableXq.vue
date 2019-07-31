<template>
  <div class="workTableXq">
      <div class="login_nav">
        <div class="back" @click="back"></div>
        <div class="title">工作报表详情</div>
      </div>
       <div class="cntList">
        <ul>
          <li class="list1">
            <h3>本周工作总结:</h3>
            <div id="nowWeek"></div>
          </li>
          <li>
            <h3>下周工作安排:</h3>
            <div id="nextWeek"></div>
          </li>
          <li>
            <h3>需协助工作内容及建议:</h3>
            <div id="proposal"></div>
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
    mounted() {
      // console.log(this.$route.params)
      let nowWeek = document.getElementById('nowWeek');
      nowWeek.innerHTML = this.$route.params.tbInfo.thisWeekContent;
      let nextWeek = document.getElementById('nextWeek');
      nextWeek.innerHTML = this.$route.params.tbInfo.nextWeekContent;
      let proposal = document.getElementById('proposal');
      proposal.innerHTML = this.$route.params.tbInfo.suggest;

    },
    methods:{
      back(){
      	 this.$router.go(-1)
      },
    }
  }
</script>

<style lang="scss">
   .workTableXq{
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
          margin-bottom: 30px;
          padding-top: 20px;
          h3{
            font-size: 28px;
            color: #333;
            margin-bottom: 20px;
          }
          div{
            font-size: 26px;
            color: #000;
            line-height: 30px;
            border: 1px solid #999;/*no*/
            padding: 10px;
          }
        }

      }
   }
</style>
