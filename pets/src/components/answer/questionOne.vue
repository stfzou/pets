<template>
  <div class="questionOne">
    <div class="top_nav flex_r_s_b">
    	<div class="back" @click="back"></div>
    	<div class="nav_title">趣味测试</div>
    </div>
    <div class="questionBox">
      <div class="questionCnt">
        <div class="titile">{{question}}</div>
        <img class="questionImg" :src="image" alt="">
        <div class="questionListBox">

            <ul class="questionList flex_r_s_b">
              <li class="flex_r_s_b" v-for="item in options" @click="selectOpt(item)">
                <div class="select">{{item.label}}</div>
                <div class="selectText">{{item.name}}</div>
              </li>

            </ul>

        </div>

      </div>
    </div>
    <div class="bannerPost" v-if="isPost">
        <div class="tip flex_r_f_e" @click="closePost"><span>广告</span><i class="cubeic-close"></i></div>
        <cube-slide ref="slide" :data="postArr">
          <cube-slide-item v-for="(item, index) in postArr" :key="index">
            <a :href="item.link">
              <img :src="item.imgAddr">
            </a>
          </cube-slide-item>
        </cube-slide>
    </div>
  </div>
</template>

<script>
  import Api from '../common/apj.js'
  export default{
    data(){
      return{
        qId:'',
        question:'',
        letterArr:['A','B','C','D','E','F','G','H','Y'],
        options:[],
        postArr:[],
        image:'',
        isPost:true
      }
    },
    mounted() {
      this.getUrlData();
      this.getQuesInfo();
    },
    methods:{
      back(){

      },
      closePost(){
        this.isPost = false;
      },
      selectOpt(item){
        let self = this;
        if(item.opTnum==='1'){
          this.$router.push({
            name:'answerOne',
            query:{
              qId:self.qId,
              option:item.res
            }
          })
        }else{
          this.axios.get(Api.userApi + '/tasteTest/selectNextQuestion?nextQuestionId=' + item.res, {
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
              }
            }).then(function(resp) {
              if(resp.data.code==1){
                console.log(resp)
                self.question = resp.data.data.question
                self.options = [];
                resp.data.data.options.forEach((e,index)=>{
                  self.options.push({
                    label:self.letterArr[index],
                    name:e.split('_')[0],
                    opTnum:e.split('_')[1],
                    res:e.split('_')[2]
                  })
                })

              }else{
                alert(resp.data.msg)
              }
            }).catch(function(error) {
              console.log(error);
            });

        }
      },
      getQuesInfo(){
        let self = this;
        this.axios.get(Api.userApi + '/tasteTest/selectQuestionById?questionId=' + this.qId, {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          }).then(function(res) {
            if(res.data.code==1){
              self.question = res.data.data.title
              res.data.data.options.forEach((e,index)=>{
                self.options.push({
                  label:self.letterArr[index],
                  name:e.split('_')[0],
                  opTnum:e.split('_')[1],
                  res:e.split('_')[2]
                })
              })
              self.postArr = res.data.data.ads;
              self.image = res.data.data.image;
            }
          }).catch(function(error) {
            console.log(error);
          });
      },
      getUrlData() {// 截取url中的数据

        let tempStr = window.location.href;
         /**
          * tempArr 是一个字符串数组 格式是["key=value", "key=value", ...]
          */
         let returnArr = {};
         let urlArr = tempStr.split('?');
         if(urlArr){
           urlArr.forEach((e)=>{

               if(e.indexOf('=')>-1){

                 returnArr[e.split('=')[0]] = e.split('=')[1];
               }

           })
         }
        /*输出日志*/
        this.qId = returnArr.qId;
        console.log(this.qId)
       },
    }
  }
</script>

<style lang="scss">
  .questionOne{
    height:100%;
    overflow:auto;
    background:url('../../assets/asbg_01.png') no-repeat 0 center;
    background-size:cover;
    padding-top:88px;
    box-sizing:border-box;
    .top_nav {
    	padding: 0 20px;
    	height: 88px;
    	box-sizing: border-box;
    	z-index: 100;
      position: fixed;
      background:#ffb80f;
      left: 0;
      top: 0;
    	.back {
    		width: 26px;
    		height: 42px;
    		background: url(../../assets/blankBack.png) no-repeat center 0;
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
    	.share{
    		width: 50px;
    		height: 40px;
    		background: url('../../assets/icon/share@2x.png') no-repeat center 0;
    		background-size: 100%;
    	}
    }
    .questionBox{
      padding:0 15px;
      .questionCnt{
        height:999px;
        background:url('../../assets/question_01.png') no-repeat 0 center;
        background-size:100%;
        .titile{
          padding:150px 50px 0 50px;
          text-align:center;
          font-weight:bold;
          font-size:30px;
          color:#333;
        }
        .questionImg{
          max-width:400px;
          max-height:200px;
          display:block;
          margin:60px auto 0 auto;
        }
        .questionListBox{

          height:500px;
        }
        .questionList{
          padding:50px 72px 0 72px;
          flex-wrap:wrap;
          box-sizing:border-box;
          li{
            background:#ffb80f;
            height:60px;
            border-radius:10px;
            margin-bottom:40px;
            overflow:hidden;
            width:35%;
            .select{
              width:30%;
              height:60px;
              line-height:60px;
              padding-left:20px;
              box-sizing:border-box;
              font-size:26px;
              color:#000;
            }
            .selectText{
              width:70%;
              height:60px;
              line-height:60px;
              background:#fff5dd;
              border-radius:10px;
              padding-left:20px;
              box-sizing:border-box;
              font-size:26px;
              color:#000;
            }
          }
        }
      }
    }
    .bannerPost{
      position:fixed;
      z-index:100;
      left:50%;
      bottom:10px;
      width:630px;
      height:230px;
      transform:translateX(-50%);
      .tip{
        position:absolute;
        top:10px;
        left:10px;
        width:100px;
        height:40px;
        background:rgba(0,0,0,0.6);
        z-index:100;
        font-size:24px;
        color:#fff;
      }
      img{
        width:100%;
        height:100%;

        object-fit: cover;
      }
    }
  }
</style>
