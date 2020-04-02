<template>
  <div class="cgQuestionWarp">
    <div class="top_nav flex_r_s_b">
    	<div class="back" @click="back"></div>
    	<div class="nav_title">萌宠闯关</div>
    </div>
    <div class="questionCnt">
       <div class="questionBox">
         <img class="topBg" src="../../assets/icon_she83@2x.png" alt="">
         <img class="bottomBg" src="../../assets/icon_she84@2x.png" alt="">
         <div class="title">question  {{qPage}}</div>
         <div class="questionText">{{problem}}？</div>
       </div>
    </div>
    <div class="selectList">
      <ul>
        <li class="flex_r_f_s" @click="selectQuestion(item,index)" v-bind:style="item.styleObject"  v-for="(item,index) in answers">

          <div class="status flex_r_s_c">
            <div class="correct" v-if="(item.isSelect&&(index+1)==correctAnswer)"></div>
            <i v-if="((index+1)!=correctAnswer&&item.isSelect)" class="cubeic-close"></i>
          </div>
          <div class="text">
            <span>{{index|selectFilter}}</span>{{item.name}}
          </div>
        </li>
      </ul>
    </div>
    <div class="bottomCnt">
      <div class="questionNum" v-if="isQNum">
        <span>第{{qPage}}题</span>共{{qNum}}道题
      </div>
      <div class="nextBtn flex_r_s_c" v-if="isNext" @click="netQuestion">下一题</div>
      <div class="incorrect" v-if="isFail">
        <div class="tip">正确答案{{computCorrectItem}}</div>
        <div class="btn flex_r_s_c" @click="failtAnswe">确定</div>
      </div>
    </div>
  </div>
</template>

<script>
  import Api from '../common/apj.js'
  export default{
    data(){
      return{
        qNum:0,
        userId:'',
        susNum:0,
        isSelect:false,
        problem:'',
        correctAnswer:-1,
        answers:[],
        qPage:1,
        lvId:'',
        prizeType:'',
        prizeNum:'',
        isFail:false,
        isNext:false,
        isQNum:false
      }
    },
    computed:{
      computCorrectItem(){
        if(this.correctAnswer=='1'){
          return 'A'
        }else if(this.correctAnswer=='2'){
          return 'B'
        }else if(this.correctAnswer=='3'){
          return 'C'
        }else if(this.correctAnswer=='4'){
          return 'D'
        }
      }
    },
    filters:{
      selectFilter(val){
        if(val==0){
          return 'A'
        }else if(val==1){
          return 'B'
        }else if(val==2){
          return 'C'
        }else if(val==3){
          return 'D'
        }
      }
    },
    mounted() {
      if (JSON.parse(localStorage.getItem('user')) != null) {
      	this.userId = JSON.parse(localStorage.getItem('user')).userId;
        this.getQuestion();

      }else{
        this.$router.push({
          name:'cgIndex'
        })
      }
      if(this.$route.query.qNum!=null){
        this.qNum = this.$route.query.qNum
        this.lvId = this.$route.query.lvId
        this.prizeType = this.$route.query.prizeType
        this.prizeNum = this.$route.query.prizeNum
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
      getSus(){
        let self = this;
        this.axios.post(Api.userApi+'/answerGame/answerSuccess', this.qs.stringify({
        		userId:self.userId,
            gateLevelId:self.lvId,
            prizeType:self.prizeType,
            prizeNum:self.prizeNum
        	}), {
        		headers: {
        			'Content-Type': 'application/x-www-form-urlencoded'
        		}
        }).then(res=>{
        	if(res.data.code==1){
            if(res.data.data.isSurprise==1){
              self.$router.push({
                name:'cgGift',
                query:{
                  imgUrl:res.data.data.image,
                  price:res.data.data.price,
                  companyName:res.data.data.companyName,
                  name:res.data.data.name
                }
              })
            }else{
              self.$router.push({
                name:'cgRes',
                query:{
                  status:'sus',
                  lvId:self.lvId,
                  prizeType:self.prizeType,
                  prizeNum:self.prizeNum
                }
              })
            }

        	}else{
        		alert(res.data.msg)
        	}
        })
      },
      failtAnswe(){
        let self = this;
        this.$router.push({
          name:'cgRes',
          query:{
            status:'fail',
            susNum:self.susNum
          }
        })
      },
      netQuestion(){
        let self = this;
        this.axios.get(Api.userApi+'/answerGame/selectQuestion',{
          params:{
            userId:self.userId
          }

        }).then(function(res) {

              if(res.data.code==1){
                let answers = [];
                self.qPage++
                res.data.data.answers.forEach(e=>{
                  answers.push({
                    name:e,
                    isSelect:false,
                    styleObject:{
                      background:'#fff',
                      color:'#333'
                    }
                  })
                })
                self.problem = res.data.data.problem;
                self.correctAnswer = res.data.data.correctAnswer;
                self.answers = answers;
                self.isNext = false;
                self.isFail = false,
                self.isQNum = true;
                self.isSelect = false;
              }else{
                alert(res.data.msg)

              }
        	}).catch(function(err) {
              alert(err)

        	});
      },
      selectQuestion(item,index){
        // this.correctAnswer = this.qInfo.correctAnswer;
        let self = this;
        if(!this.isSelect){
          if(index==this.correctAnswer){
            this.susNum+=1
            this.answers[index].styleObject = {
              background:'#1DCE74',
              color:'#fff'
            }
            if(this.qPage == this.qNum){
              this.getSus();
            }else{
              this.isNext = true;
              this.isFail = false,
              this.isQNum = false;

            }
          }else{
            this.answers[index].styleObject = {
              background:'#FF6F5D',
              color:'#fff'
            }
            this.isNext = false;
            this.isFail = true,
            this.isQNum = false;
          }
          this.answers[index].isSelect = true;
          this.isSelect = true;
        }

      },
      getQuestion(){
        let self = this;
        this.axios.get(Api.userApi+'/answerGame/selectFirstQuestion',{
          params:{
            userId:self.userId
          }

        }).then(function(res) {

              if(res.data.code==1){
                let answers = [];
                res.data.data.answers.forEach(e=>{
                  answers.push({
                    name:e,
                    isSelect:false,
                    styleObject:{
                      background:'#fff',
                      color:'#333'
                    }
                  })
                })
                self.problem = res.data.data.problem;
                self.correctAnswer = res.data.data.correctAnswer;
                self.answers = answers;
                self.isQNum = true;
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
      }
    }
  }
</script>

<style lang="scss" scoped="scoped">
  .cgQuestionWarp{
    height:100%;
    background:#FE8F70;
    position:relative;
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
    .questionCnt{
      padding:60px 40px 0 40px;
      .questionBox{

        position:relative;
        padding:50px 40px 80px 40px;
        box-sizing:border-box;
        .title{
          font-size:24px;
          color:#fff;
          font-family:HappyZcool-2016;
        }
        .topBg{
          position:absolute;
          top:0;
          left:0;
          width:80px;
        }
        .bottomBg{
          position:absolute;
          bottom:0;
          right:0;
          width:45px;
        }
        .questionText{
          color:#fff;
          font-family:HappyZcool-2016;
          font-size:48px;
          line-height:60px;
          padding-top:30px;
        }
      }
    }
    .selectList{
      padding:40px 30px 0 30px;
      ul{
        padding:50px;
        background:#fff;
        border-radius:40px;
        li{
          height:60px;
          border-radius:10px;
          font-size:26px;
          color:#333;
          border-radius:10px;
          margin-top:30px;
          padding-left:20px;

          .text{
            span{
              margin-right:10px;
            }
          }
          .status{
            width:40px;
            height:40px;
            margin-right:10px;
            .correct{
              width:20px;
              height:20px;
              border:3px solid rgba(255,255,255,1);
              border-radius:50%;
            }
            .cubeic-close{
              color:#fff;
              font-size:30px;
            }
          }
        }
        li:first-child{
          margin-top:0;
        }
        .sus{
          background:#1DCE74;
          color:#fff;
        }
        .fail{
          background:#FF6F5D;
          color:#fff;
        }
      }
    }
    .bottomCnt{
      padding-top:120px;
      .questionNum{
        font-size:30px;
        font-family:HappyZcool-2016;
        color:#fff;
        text-align:center;
        span{
          margin-right:20px;
        }
      }
      .nextBtn{
        height:90px;
        font-size:36px;
        color:#ff523d;
        width:420px;
        margin:0 auto;
        background:rgba(255,254,254,1);
        border-radius:45px;
      }
      .incorrect{
        width:420px;
        margin:0 auto;
        .tip{
          font-size:26px;
          color:#fff;
          text-align:center;
          padding-bottom:10px;
        }
        .btn{
          height:90px;
          font-size:36px;
          color:#ff523d;
          width:420px;
          background:rgba(255,254,254,1);
          border-radius:45px;
        }
      }
    }
  }
</style>
