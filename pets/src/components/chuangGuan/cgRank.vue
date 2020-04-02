<template>
  <div class="cgRankWarp">
    <div class="top_nav flex_r_s_b">
    	<div class="back" @click="back"></div>
    	<div class="nav_title">萌宠闯关</div>
    </div>
    <div class="bntBox">
      <div class="title">请选择闯关级别</div>
      <div v-for="item in rankData" class="btn flex_r_s_c" @click="cgLink(item)">{{item.name}}</div>

    </div>
    <div class="cgRankBg">
      <img src="../../assets/icon_she82@2x.png" alt="">
    </div>
  </div>
</template>

<script>
  import Api from '../common/apj.js'
  export default{
    data(){
      return{
        userId:'',
        rankData:[]
      }
    },
    mounted() {
      if (JSON.parse(localStorage.getItem('user')) != null) {
      	this.userId = JSON.parse(localStorage.getItem('user')).userId;
        this.getRank();
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
      getRank(){
        let self = this;
        this.axios.get(Api.userApi+'/answerGame/selectGateLevel',{
          params:{
            userId:80
          }

        }).then(function(res) {

              if(res.data.code==1){
                self.rankData = res.data.data

              }else{
                alert(res.data.msg)
                setTimeout(e=>{
                  self.$router.push({
                    name:'cgIndex'
                  })
                },500)
                
              }
        	}).catch(function(err) {
              alert(err)

        	});
      },
      cgLink(item){
        this.$router.push({
          name:'cgQuestion',
          query:{
            qNum:item.questionNum,
            lvId:item.id,
            prizeType:item.prizeType,
            prizeNum:item.prizeNum
          }
        })
      }
    }
  }
</script>

<style lang="scss">
  .cgRankWarp{
    height:100%;
    background:#FE8F70;
    position:relative;
    .bntBox{
      padding:120px 150px 0 150px;
      .btn{
        height:90px;
        font-size:36px;
        color:#ff523d;
        background:rgba(255,255,255,1);
        box-shadow:0px 10px 18px 0px rgba(217,23,0,0.2);
        border-radius:45px;
        margin-top:140px;
        z-index:1000;
      }
      .btn:first-child{
        margin-top:80px;
      }
      .title{
        text-align:center;
        font-size:30px;
        color:#fff;
      }
    }
    .cgRankBg{
      position:absolute;
      left:0;
      bottom:62px;

      img{
        width:465px;
      }
    }
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
  }
</style>
