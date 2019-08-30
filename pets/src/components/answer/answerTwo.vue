<template>
  <div class="answerTwo">
    <div class="top_nav flex_r_s_b">
    	<div class="back" @click="back"></div>
    	<div class="nav_title">趣味测试</div>
    </div>
    <div class="questionBox">
      <div class="questionCnt">
        <div class="answerImg">
          <img class="Aimg" src="../../assets/A.png" alt="">
        </div>

        <div class="res">
            {{result}}
        </div>
        <img @click="share" class="shareBg" src="../../assets/shareImg.png" alt="">
        <img @click="share" class="shareBg" src="../../assets/shareImg2.png" alt="">
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
  import wxapi from '../common/wxapi.js'
  import Api from '../common/apj.js'
  export default{
    data(){
      return{
        qId:'',
        option:'',
        result:'',
        postArr:[],
        isPost:true,
      }
    },

    mounted() {
      wxapi.wxRegister(this.wxRegCallback)
      this.qId = this.getUrlData().qId;
      this.option = this.getUrlData().option;
      this.getAnswer();
    },
    methods:{
      back(){

      },
      wxRegCallback () {
        // 用于微信JS-SDK回调
        this.wxShareTimeline()
        this.wxShareAppMessage()
      },
      wxShareTimeline () {
        // 微信自定义分享到朋友圈

        let option = {
          title: '限时团购周 挑战最低价', // 分享标题, 请自行替换
          link: window.location.href.split('#')[0], // 分享链接，根据自身项目决定是否需要split
          //imgUrl: 'logo.png', // 分享图标, 请自行替换，需要绝对路径
          success: () => {
            alert('分享成功')
          },
          error: () => {
            alert('已取消分享')
          }
        }
        // 将配置注入通用方法
        wxapi.ShareTimeline(option)
      },
      wxShareAppMessage () {
        // 微信自定义分享给朋友
        let option = {
          title: '限时团购周 挑战最低价', // 分享标题, 请自行替换
          desc: '限时团购周 挑战最低价', // 分享描述, 请自行替换
          link:window.location.href.split('#')[0], // 分享链接，根据自身项目决定是否需要split
          //imgUrl: 'logo.png', // 分享图标, 请自行替换，需要绝对路径
          success: () => {
            alert('分享成功')
          },
          error: () => {
            alert('已取消分享')
          }
        }
        // 将配置注入通用方法
        wxapi.ShareAppMessage(option)
      },
      qqShareMsg(){
        //分享给QQ好友
        let option = {
          title: '限时团购周 挑战最低价', // 分享标题, 请自行替换
          desc: '限时团购周 挑战最低价', // 分享描述, 请自行替换
          link:window.location.href.split('#')[0], // 分享链接，根据自身项目决定是否需要split
          //imgUrl: 'logo.png', // 分享图标, 请自行替换，需要绝对路径
          success: () => {
            alert('分享成功')
          },
          error: () => {
            alert('已取消分享')
          }
        }
        // 将配置注入通用方法
        wxapi.ShareQQMessage(option)
        
      },
      share(){
      	let toast = this.$createToast({
      		txt: '点击顶部右上角进行分享',
      		type: 'warn'
      	  })
      	toast.show()
      },
      closePost(){
        this.isPost = false;
      },
      getAnswer(){
        let self = this;
        this.axios.get(Api.userApi + '/tasteTest/selectTestResult?questionId='+this.qId+'&option='+this.option, {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          }).then(function(res) {
            if(res.data.code==1){

              self.postArr = res.data.data.adDos;
              self.result = res.data.data.result;
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

               if(e.indexOf('&')>-1){

                 e.split('&').forEach((j)=>{
                    if(j.split('=')){
                      returnArr[j.split('=')[0]] = j.split('=')[1];
                    }

                 })

               }

           })
         }
         return returnArr
        /*输出日志*/

        console.log(returnArr)
       },
    }
  }
</script>

<style lang="scss">
  .answerTwo{
    height:100%;
    overflow:auto;
    background:url('../../assets/asbg_02.png') no-repeat 0 center;
    background-size:cover;
    padding-top:88px;
    box-sizing:border-box;
    .top_nav {
    	padding: 0 20px;
    	height: 88px;
    	box-sizing: border-box;
    	z-index: 100;
      position: fixed;
      background:#363636;
      left: 0;
      top: 0;
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
        height:870px;
        background:url('../../assets/answer_02.png') no-repeat 0 center;
        background-size:100%;
        .answerImg{
          padding:120px 0 0 83px;
        }
        .Aimg{
          width:80px;
          display:block;
        }
        .res{
          padding:30px 60px 0 83px;
          line-height:46px;
          font-size:26px;
          color:#333;
        }
        .shareBg{
          display:block;
          margin:50px auto 0 auto;
          width:520px;

        }
      }
    }
    .bannerPost{
      position:fixed;
      left:50%;
      bottom:30px;
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
