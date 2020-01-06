<template>
  <div class="bargainWarp">
    <div class="top_nav flex_r_s_b">
    	<div class="back" @click="back"></div>
    	<div class="nav_title flex_r_s_c">砍价免费拿</div>
    	<div class="share" @click="showRuler">规则</div>
    </div>
    <div class="bargainCnt">
      <div class="bargainGoods">
        <div class="title">我发现一件好货，快来一起砍价0元拿吧</div>
        <div class="goodsInfo flex_r_s_b">
          <div class="goodsPic" v-bind:style="{'background-image':'url('+goodsImg+')'}"></div>
          <div class="goodsNameBox">
            <div class="goodsName">{{goodsName}}</div>
            <div class="price">¥{{price.toFixed(2)}}</div>
            <div class="people">已有{{sellNum}}人0元拿</div>
          </div>

        </div>
        <div class="bargainTip">已砍<b>{{alreadyBargainPrice.toFixed(2)}}</b>元,还差<b>{{unfinishedBargainPrice.toFixed(2)}}</b>元</div>
        <div class="progressBox">
          <el-progress :text-inside="true" :show-text="false" :color="'#f9a56d'" :stroke-width="13" :percentage="progress"></el-progress>
        </div>
        <div class="bargainBtn flex_r_s_c" @click="getEnvironment">帮TA砍一刀</div>
      </div>
      <div class="bargainFriends">
        <div class="title"><img src="../../assets/icon_gu155.png" alt=""></div>
        <ul class="friendsList">
          <li class="flex_r_s_b" v-for="item in friendsList">
            <div class="headBox flex_r_f_s">
              <div class="headPic" v-bind:style="{'background-image':'url('+item.userHeadImg+')'}"></div>
              <div class="userName">{{item.userName}}</div>
            </div>
            <div class="bargainPrice">砍掉<span>{{item.bargainPrice.toFixed(2)}}</span>元</div>
          </li>
        </ul>
      </div>
    </div>
    
  </div>
</template>

<script>
  import Api from '../common/apj.js'
  export default{
    data(){
      return{
        appUrl:'',
        gId:'',
        goodsImg:'',
        price:0,
        goodsName:'',
        sellNum:0,
        alreadyBargainPrice:0,
        unfinishedBargainPrice:0,
        friendsList:[],
        progress:0
      }
    },
    mounted() {
      this.gId = this.getUrlKey('gId');
      this.getAppUrl();
      this.getBargainGoods();
    },
    methods:{
      getBargainGoods(){
        let self = this;
        self.axios.get(Api.trendApi + '/bargain/selectContinueBargainOrder', {
        	params: {
        		bargainRecordId:self.gId,
            userId:-1
        	}
        }, {
        	headers: {
        		'Content-Type': 'application/x-www-form-urlencoded'
        	}
        }).then(res=>{
          if(res.data.code==1){
            //console.log(res)
            self.goodsImg = res.data.data.commodityImage;
            self.price = res.data.data.price;
            self.goodsName = res.data.data.commodityName;
            self.sellNum = res.data.data.sellNum
            self.unfinishedBargainPrice = res.data.data.unfinishedBargainPrice;
            self.alreadyBargainPrice = res.data.data.alreadyBargainPrice;
            self.friendsList = res.data.data.list;
            self.progress = res.data.data.alreadyBargainPrice/res.data.data.price*100;
            //console.log(self.progress)
          }else{
            alert(res.data.msg)
          }
        })
      },
      back() {
      	this.$router.go(-1); //返回上一层
      },
      getUrlKey(name){
          return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[1].replace(/\+/g, '%20')) || null
      },
      showRuler() {
         this.$router.push({
           name:'bargainRule'
         })
      },
      showToastType() {
        const toast = this.$createToast({
          txt: '请点击右上角用浏览器打开进行操作',
          type: 'warn'
        })
        toast.show()
      },
      getAppUrl(){
        let self = this;
        self.axios.post(Api.userApi+'/version/selectNewestVersionInfo',{
        	headers: {
        		'Content-Type': 'application/x-www-form-urlencoded'
        	}
        }).then((res)=>{
          if(res.data.code==1){
            self.appUrl = res.data.data.address;

          }
        })
      },
      getEnvironment() { //判断是否在微信环境
        var ua = window.navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == 'micromessenger') {
          this.showToastType();

        } else {
          this.clickDownload();
        }
      },
      clickDownload() {
        let self = this;
          if (navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)) {
              var loadDateTime = new Date();
              window.location = "gumipet://"+self.gId;//schema链接或者universal link
              window.setTimeout(function() { //如果没有安装app,便会执行setTimeout跳转下载页
                  var timeOutDateTime = new Date();
                  if (timeOutDateTime - loadDateTime < 5000) {
                      window.location = "https://itunes.apple.com/cn/app/id1437699756"; //ios下载地址
                  } else {
                      window.close();
                  }
              }, 500);

          } else if (navigator.userAgent.match(/android/i)) {
              var state = null;
              try {
                  window.location = 'freedogs://helpkj/'+self.gId; //schema链接或者universal link
                  window.setTimeout(function() {
                      window.location = self.appUrl; //android下载地址
                  }, 500);
              } catch (e) {}
          }
      },
    }
  }
</script>

<style lang="scss" scoped="scoped">
  .cube-dialog-main{
    width:350px;
  }
  .bargainWarp{
    height:100%;
    background:url('../../assets/icon_gu163.png') no-repeat;
    background-size:cover;
    padding-bottom:20px;
    box-sizing:border-box;
    .top_nav {
    	padding: 0 20px;
    	height: 88px;
    	box-sizing: border-box;

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
        width:500px;
        height:50px;
        text-align: center;
        overflow: hidden;/*超出部分隐藏*/
        text-overflow:ellipsis;/* 超出部分显示省略号 */
        white-space: nowrap;/*规定段落中的文本不进行换行 */
    	}
    	.share{
        color:#fff;
        font-size: 26px;
    	}
    }
    .bargainCnt{
      padding: 20px 20px 0 20px;
      .bargainGoods{
        padding:40px 20px;
        height:520px;
        background:rgba(255,255,255,1);
        box-shadow:0px 0px 16px 0px rgba(51,51,51,0.1);
        border-radius:10px;
        .title{
          text-align:center;
          color:#666666;
          font-size:24px;
        }
        .goodsInfo{
          padding-top:30px;
          align-items:flex-start;
          .goodsPic{
              width:220px;
              height:220px;
              border-radius:10px;
              background-size: cover;
              background-repeat: no-repeat;
              background-position: 50%;
              cursor: pointer;
              background-image: url('http://gutouzu.oss-cn-shenzhen.aliyuncs.com/manager/1577440584987.png');

          }
          .goodsNameBox{
            width:350px;
            .goodsName{
              font-size:26px;
              color:#333;
              line-height:36px;
            }
            .price{
              font-size:36px;
              color:#ff523d;
              padding-top:20px;
            }
            .people{
              font-size:24px;
              color:#FF8060;
              padding-top:60px;
            }
          }

        }
        .bargainTip{
          text-align:center;
          font-size:26px;
          padding-top:30px;
          b{
            color:#ff523d;
          }
        }
        .progressBox{
          padding-top:20px;
          padding-bottom:54px;
        }
        .bargainBtn{
          font-size:28px;
          color:#fff;
          height:89px;
          background:linear-gradient(0deg,#ff4b4e,#ffbb68);
          box-shadow:0px 0px 16px 0px rgba(255,77,78,0.1);
          border-radius:45px;
        }
      }
      .bargainFriends{
        height:480px;
        background:#fff;
        border-radius:10px;
        padding:20px;
        margin-top:30px;
        .title{
          padding-top:20px;
          img{
            display:block;
            width:400px;
            margin:0 auto;
          }
        }
        .friendsList{
          li{
            padding-top:30px;
            .headBox{
              width:300px;
              .headPic{
                width:68px;
                height:68px;
                border-radius:50%;
                background-size: cover;
                background-repeat: no-repeat;
                background-position: 50%;
                cursor: pointer;
                background-image: url('https://ci.xiaohongshu.com/39005cc6-b39b-34a6-840b-3317967cfca9?imageView2/2/w/200/h/200/q/75/format/webp');

              }
              .userName{
                font-size:24px;
                color:#666;
                margin-left:30px;
              }
            }
            .bargainPrice{
              font-size:24px;
              color:#666;
              span{
                color:#ff523d;
              }
            }
          }
        }
      }
    }
  }
</style>
