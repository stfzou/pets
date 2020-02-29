<template>
  <div class="exChangeXq">
    <div class="top_nav flex_r_s_b">
    	<div class="back" @click="back"></div>
    	<div class="nav_title">商品详情</div>

    </div>
    <div class="banner">
        <cube-slide ref="slide" :data="bannerImg" :options="hOption">
          <cube-slide-item v-for="(item, index) in bannerImg" :key="index" @click.native="clickHandler(item, index)">

            <img :src="item">

          </cube-slide-item>
        </cube-slide>
    </div>
    <div class="cntWarp">
      <div class="goodsInfoBox flex_r_s_b" :class="{active:isStart!==1}">
        <div class="goodsInfo_l flex_r_f_s">
          <div class="xsPic"></div>
          <div class="price">
            <div class="newPrice">¥<b>{{price}}</b></div>
            <div class="oldPrice">¥{{oldPrice}}</div>
          </div>
        </div>
        <div class="goodsInfo_r">
          <div v-if="isStart===1">
            <div class="progressBox flex_r_s_b">
              <div class="progress">
                <div :style="{width:sellRate+'%'}"></div>
              </div>
              <span>已售{{sellRate.toFixed(1)}}0%</span>

            </div>
            <div class="endTime">据结束<span>{{hou}} : {{min}} : {{sec}}</span></div>
          </div>
          <div v-else class="starTime">{{starTime[1]}}月{{starTime[2]}}日10:00 <br>准时开抢</div>
        </div>
      </div>
      <div class="goodsName">{{goodsName}}</div>
      <div class="line"></div>
      <div class="normsBox flex_r_s_b"  @click="showPicker">
        <div class="norms_l">
          <div v-if="normsName!=''">
            已选<span>{{normsName}}</span>
          </div>
          <div v-else>请选择规格</div>
        </div>
        <div class="norms_r">
          <i class="cubeic-arrow"></i>
        </div>
      </div>
      <div class="line"></div>
      <div class="goodsXqImg" v-html="descImg">
        <!-- <img src="../../assets/active_bg.png" alt=""> -->
      </div>
      <div class="duihuanBtn flex_r_s_c" @click="showBtn('请下载骨米宠物APP开始兑换')">立即抢购</div>
    </div>
  </div>
</template>

<script>
  import Api from '../common/apj.js'
  export default{
    data(){
      return{
        isStart:0,
        goodsName:'',
        hou:'00',
        min:'00',
        sec:'00',
        bannerImg:[],
        goodsName:'',
        sellRate:0,
        endTime:'',
        starTime:'',
        price:'',
        oldPrice:'',
        descImg:'',
        cId:'',
        environment:'',
        appUrl:'',
        commodityId:'',
        activityId:'',
        hOption:{
          eventPassthrough:'vertical'
        },
        norms:[],
        normsName:''
      }
    },
    mounted() {
      this.getEnvironment();
      this.getAppUrl();
      //this.cId = this.$route.query.cId;

      this.activityId = this.getUrlKey('activityId');
      this.commodityId = this.getUrlKey('commodityId');
      this.getData()
    },
    methods:{
      back() {
      	this.$router.go(-1); //返回上一层
      },
      showPicker() {
            let self = this;
            if (!this.picker) {
              this.picker = this.$createPicker({
                title: '规格',
                data: [self.norms],
                onSelect: function(selectedVal, selectedIndex, selectedText){
                   // console.log(selectedVal)
                   self.normsName = selectedText[0]
                },
                onCancel: function(){

                }
              })
            }
            this.picker.show()
      },
      getUrlKey(name){
          return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[1].replace(/\+/g, '%20')) || null
      },
      timeFormat(param) {
        return param < 10 ? '0' + param : param;
      },
      countDown(it) {
        var interval = setInterval(() => {
          // 获取当前时间，同时得到活动结束时间数组
          let newTime = new Date().getTime();
          // 对结束时间进行处理渲染到页面
          // let endTime = new Date(this.endTime).getTime();
          let endTime = new Date(this.endTime.replace(/-/g, "/")).getTime();
          let obj = null;
          // 如果活动未结束，对时间进行处理
          if (endTime - newTime > 0) {
            let time = (endTime - newTime) / 1000;
            // 获取天、时、分、秒
            let day = parseInt(time / (60 * 60 * 24));
            let hou = parseInt(time % (60 * 60 * 24) / 3600);
            let min = parseInt(time % (60 * 60 * 24) % 3600 / 60);
            let sec = parseInt(time % (60 * 60 * 24) % 3600 % 60);
            obj = {
              day: this.timeFormat(day),
              hou: this.timeFormat(hou),
              min: this.timeFormat(min),
              sec: this.timeFormat(sec)
            };
          } else { // 活动已结束，全部设置为'00'
            obj = {
              day: '00',
              hou: '00',
              min: '00',
              sec: '00'
            };
            clearInterval(interval);
          }
          // this.countDownList = obj.day + '天' + obj.hou + '时' + obj.min + '分' + obj.sec + '秒';
          if(obj.day>=1){
            this.hou = (obj.day*24)+obj.hou;
          }else{
            this.hou = obj.hou;
          }

          this.min = obj.min;
          this.sec = obj.sec
        }, 1000);
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
      showBtn() {
            let self = this;
            this.$createDialog({
              type: 'confirm',
              title: '提示',
              content:'请下载骨米宠物APP进行抢购',
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
      getData(){
        let self = this;
        this.axios.get(Api.userApi+'/flash/sale/selectFlashSaleCommodityDesc',{
          params:{
            commodityId:self.commodityId,
            activityId:self.activityId
          }

        }).then(function(res) {
              //console.log(res)
              if(res.data.code==1){
                self.descImg = res.data.data.desc;
                self.bannerImg = res.data.data.commodityImage.split(',');
                self.goodsName = res.data.data.commodityName;
                self.endTime = res.data.data.endTime;
                self.starTime = res.data.data.startTime.split(' ')[0].split('-');
                self.isStart = res.data.data.isStart;
                if(res.data.data.isStart===1){
                  self.countDown();
                }
                self.price = res.data.data.activityPrice;
                self.oldPrice = res.data.data.originalPrice;
                self.sellRate = (res.data.data.sellNum/res.data.data.totalNum)*100;
                res.data.data.list.forEach(e=>{

                  if(e.attrValue==''){
                    e.text = '默认';
                  }else{
                    e.text = e.attrValue;
                  }
                   e.value = e.skuId;
                })
                self.norms = res.data.data.list;
              }else{
                alert(res.data.msg);
              }
        	}).catch(function(err) {
              alert(err)

        	});
      }
    }
  }
</script>
.
<style lang="scss">
  .exChangeXq{
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
      .goodsName{
        font-size:28px;
        line-height:48px;
        color:#333;
        padding:20px;
      }
      .normsBox{
        font-size:26px;
        color:#666666;
        padding:20px;
        box-sizing:border-box;
        span{
          color:#333;
          margin-left:30px;
        }
      }
      .goodsInfoBox{
        height:120px;
        padding:0 20px;
        box-sizing:border-box;
        background: linear-gradient(90deg, #fbb154, #ffaf60, #fe8071, #ff7660);
        .goodsInfo_l{
          width:350px;
          .xsPic{
            width:100px;
            height:100px;
            background:url('../../assets/xsqg_02.png') no-repeat;
            background-size:cover;
            border-radius:10px;
            margin-right:29px;
          }
          .price{
            color:#fff;
            font-size:30px;
            b{
              font-size:48px;
            }
            .oldPrice{
              font-size:22px;
              text-decoration:line-through;
              padding-top:10px;
            }
          }
        }
        .goodsInfo_r{
          width:280px;
          .starTime{
            font-size:22px;
            color:#fff;
            text-align:center;
            line-height:36px;
          }
          .progressBox {
            width: 280px;
            span {
              font-size: 20px;
              color: #fff;
              width:130px;
            }
            .progress {
              position: relative;
              width: 100px;
              height: 14px;
              background: #eee;
              border-radius: 10px;

              div {
                width: 50%;
                height: 100%;
                background: #ff523d;
                border-radius: 10px;
              }
            }
          }
          .endTime{
            font-size:22px;
            color:#fff;
            padding-top:30px;
            span{
              margin-left:10px;
            }
          }
        }
      }
      .active{
        background:#986AFF;
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
