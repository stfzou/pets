<template>
  <div class="bargainGoodsWarp">
    <div class="top_nav flex_r_s_b">
    	<div class="back" @click="back"></div>
    	<div class="nav_title">砍价免费拿</div>
     <!-- <div class="text" @click="showAlert">兑换须知</div> -->
    </div>
    <div class="banner">
        <cube-slide ref="slide" :data="bannerImg" :options="hOption">
          <cube-slide-item v-for="(item, index) in bannerImg" :key="index">

            <img :src="item">

          </cube-slide-item>
        </cube-slide>
    </div>
    <div class="cntWarp">
      <div class="bargainGoodsInfo">
        <div class="bargainNumBox flex_r_f_s">
          <span class="bargainNum">{{sellNum}}人已免费拿</span>
          <span class="price">¥价值{{price}}</span>
        </div>
        <div class="bargainGoodsName">{{goodsName}}</div>
      </div>
      <div class="bargainSusBox" v-if="susList.length>0">
        <div class="bargainSusNum flex_r_s_b">
          <span>{{sellNum}}人砍价成功</span>
          <span @click="showBtn('下载骨米宠物APP,查看更多有趣内容')">查看更多></span>
         </div>
         <ul class="bargainSusList">
            <li v-for="item in susList" class="flex_r_s_b">
              <div class="susGoodsImg" v-bind:style="{'background-image':'url('+item.commodityImage+')'}">

              </div>
              <div class="susGoodsInfo">
                <div class="goodsName">{{item.commodityName}}</div>
                <div class="userInfo flex_r_f_s">
                  <div class="userHeadImg flex_r_f_s">
                    <div class="headPic" v-bind:style="{'background-image':'url('+item.userHeadImg+')'}"></div>
                    <div class="userName">{{item.userName}}</div>
                  </div>
                  <div class="susTip">已免费拿</div>
                </div>
              </div>
            </li>
         </ul>
      </div>
      <div class="line"></div>
      <div class="goodsXqImg" v-html="descImg">
        <!-- <img src="../../assets/active_bg.png" alt=""> -->
      </div>
      <div class="duihuanBtn flex_r_s_c" @click="showBtn('请下载骨米宠物APP参加免费拿活动')">砍价免费拿</div>
    </div>
  </div>
</template>

<script>
  import Api from '../common/apj.js'
  export default{
    data(){
      return{
        price:0,
        goodsName:'',
        sellNum:0,
        susList:[],
        bannerImg:[],
        descImg:'',
        commodityId:'',
        environment:'',
        appUrl:'',
        hOption:{
          eventPassthrough: 'vertical'
        },

      }
    },
    mounted() {
      this.commodityId = this.$route.query.commodityId;
      this.getData();
      this.getEnvironment();
      this.getAppUrl();
    },

    methods:{
      back() {
      	this.$router.go(-1); //返回上一层
      },
      getData(){
        let self = this;
        self.axios.get(Api.userApi+'/bargain/selectBargainCommodityDetails',{
          params: {
            commodityId:self.commodityId,
            bargainRecordId:'',
            orderStatus:2,
            rows:2
          }
        },{
        	headers: {
        		'Content-Type': 'application/x-www-form-urlencoded'
        	}
        }).then((res)=>{
          if(res.data.code==1){
            self.bannerImg = res.data.data.commodityImage.split(',');
            self.descImg = res.data.data.desc;
            self.goodsName = res.data.data.commodityName;
            self.susList = res.data.data.list;
            self.sellNum = res.data.data.sellNum;
            self.price = res.data.data.price;
            //console.log(res)
          }
        })
      },
      clickHandler(item, index) {
          console.log(item, index)
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
      isAnOrIos() {
        //alert(1)

      	var u = navigator.userAgent,
      	app = navigator.appVersion;

      	var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
      	var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      	if (isAndroid) {
      		//这个是安卓操作系统
          //alert(1)
          if(this.environment=='-1'){
            this.$router.push({name:'wxWhitePage'})
          }else{
            window.location.href = this.appUrl;
          }
      		//alert('这个是安卓操作系统')
      	}
      	if (isIOS) {
      		//这个是ios操作系统

      		window.location.href = 'https://itunes.apple.com/cn/app/id1437699756'
      	}
      },
      getEnvironment() { //静默授权初始化
        var ua = window.navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == 'micromessenger') {
          this.environment = '-1';

        } else {
          this.environment = '1';
        }
      },
      showBtn(cnt) {
            let self = this;
            this.$createDialog({
              type: 'confirm',
              title: '提示',
              content:cnt,
              confirmBtn: {
                text: '去下载',
                active: true,
                disabled: false,
                href: 'javascript:;'
              },
              cancelBtn: {
                text: '取消',
                active: false,
                disabled: false,
                href: 'javascript:;'
              },
              onConfirm: () => {
                self.isAnOrIos();
              },
              onCancel: () => {

              }
            }).show()
      },

    }
  }
</script>

<style lang="scss">
  .bargainGoodsWarp{
    padding-bottom:60px;
    padding-top:88px;
    background:#fff;
    .line{

      height:10px;
      background:rgba(232,232,232,1);
    }
    .top_nav {
    	padding: 0 20px;
    	height: 88px;
    	box-sizing: border-box;
    	z-index: 100;
      position:fixed;
      left:0;
      top:0;
      background:#fff;
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
    		font-weight:400;
    	}
      .text{
        color:#ff523d;
        font-size:30px;
      }
    }
    .banner{
      height:720px;
      width:720px;
      .cube-slide-dots>span{
        width:22px;
        height:22px;
        background:#FFFFFF;
        border-radius:50%;
        margin:0 5px;
      }
      .cube-slide-dots>span.active{
        background:#ff523d;
      }
      .cube-slide-dots{
        margin-bottom:10px;
      }
      img{
        height:720px;
        width:720px;
        object-fit: cover;
      }

    }
    .cntWarp{
      .bargainGoodsInfo{
        padding:30px 20px;
        .bargainNumBox{
          .bargainNum{
            color:#FF523D;
            font-size:36px;
            margin-right:60px;
          }
          .price{
            font-size:24px;
            color:#999;
          }
        }
        .bargainGoodsName{
          font-size:26px;
          color:#333;
          line-height:36px;
          padding-top:26px;

        }
      }
      .bargainSusBox{
        padding:30px 20px;
        .bargainSusNum{
          font-size:24px;
          color:#ff523d;
        }
        .bargainSusList{
          padding-top:30px;
          li{
            box-shadow:0px 0px 16px 0px rgba(51,51,51,0.1);
            border-radius:10px;
            padding:30px;
            box-sizing:border-box;
            align-items:flex-start;
            margin-top:30px;
          }
          .susGoodsImg{
            width:120px;
            height:120px;
            border-radius:10px;
            background-color:#f5f5f5;
            background-size: cover;
            background-repeat: no-repeat;
            background-position: 50%;
            cursor: pointer;
          }
          .susGoodsInfo{
            width:470px;

            .goodsName{
              overflow: hidden;
              text-overflow:ellipsis;
              white-space: nowrap;
              font-size:26px;
              color:#333;
            }
            .userInfo{
              padding-top:40px;
              .userHeadImg{
                width:300px;
                .headPic{
                  width:32px;
                  height:32px;
                  border-radius:50px;
                  background-color:#f5f5f5;
                  background-size: cover;
                  background-repeat: no-repeat;
                  background-position: 50%;
                  cursor: pointer;
                  margin-right:10px;
                }
                .userName{
                  font-size:24px;
                  color:#666;
                  width:200px;
                  overflow: hidden;
                  text-overflow:ellipsis;
                  white-space: nowrap;
                }

              }
              .susTip{
                width:100px;
                font-size:24px;
                color:#FF8060;
              }
            }

          }
          li:first-child{
            margin:0;
          }
        }
      }
      .goodsXqImg{
        padding-top:20px;
        img{
          width:100%;
          display:block;
        }
      }
      .duihuanBtn{
        height:96px;
        background:#FF523D;
        position: fixed;
        left:0;
        bottom:0;
        width:100%;
        font-size:28px;
        color:#fff;
      }
    }
  }
</style>
