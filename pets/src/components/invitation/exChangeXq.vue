<template>
  <div class="exChangeXq">
    <div class="top_nav flex_r_s_b">
    	<div class="back" @click="back"></div>
    	<div class="nav_title">店铺详情</div>
      <div class="text" @click="showAlert">兑换须知</div>
    </div>
    <div class="banner">
        <cube-slide ref="slide" :data="bannerImg" :options="hOption">
          <cube-slide-item v-for="(item, index) in bannerImg" :key="index" @click.native="clickHandler(item, index)">

            <img :src="item">

          </cube-slide-item>
        </cube-slide>
    </div>
    <div class="cntWarp">
      <div class="goodsInfoBox">
        <div class="gudouPrice flex_r_f_s">
          <span class="new">￥<b>{{boneBeanPrice|moneyFilter}}</b></span>
          <span class="old">原价<span>￥{{price|moneyFilter}}</span></span>
        </div>
        <div class="gudouDeductionBox flex_r_s_b">
          <div class="flex_r_f_s leftBox">
            <div class="gudouDeduction flex_r_s_c">
              骨豆直抵￥<span v-if="deduction>=boneBeanPrice">{{boneBeanPrice|moneyFilter}}</span><span v-else>{{deduction|moneyFilter}}</span>
            </div>
            <div class="tip">100粒骨豆可以抵扣1.00元</div>
          </div>

          <div class="getBon" @click="showBtn('请下载骨米宠物APP赚取骨豆')">去赚骨豆</div>
        </div>
        <div class="goodsName">{{goodsName}}</div>
        <div class="duihuanBox flex_r_f_s">
          <div class="num">已有{{sumSellNum}}人兑换</div>
          <div class="sxdTip flex_r_s_c" v-if="deduction>=boneBeanPrice">随心兑</div>
        </div>



      </div>
      <div class="line"></div>
      <div class="goodsXqImg" v-html="descImg">
        <!-- <img src="../../assets/active_bg.png" alt=""> -->
      </div>
      <div class="duihuanBtn flex_r_s_c" @click="showBtn('请下载骨米宠物APP开始兑换')">立即兑换</div>
    </div>
  </div>
</template>

<script>
  import Api from '../common/apj.js'
  export default{
    data(){
      return{
        boneBean:0,
        bannerImg:[],
        deduction:'',
        goodsName:'',
        sumSellNum:'',
        price:'',
        boneBeanPrice:'',
        descImg:'',
        cId:'',
        environment:'',
        appUrl:'',
        hOption:{
          preventDefault:false
        },

      }
    },
    mounted() {
      this.getEnvironment();
      this.getAppUrl();
      this.cId = this.$route.query.cId;
      if(this.$route.query.boneBean!=null){
        this.boneBean = this.$route.query.boneBean;
      }

      this.getData()
    },
    filters:{
      moneyFilter(value,num){
         

        // num = num > 0 && num <= 20 ? num : 2;
        num = 1;
        value = parseFloat((value + "").replace(/[^\d\.-]/g, "")).toFixed(num) + ""; //将金额转成比如 123.45的字符串

        var valueArr = value.split(".")[0].split("") //将字符串的数变成数组

        const valueFloat = value.split(".")[1]; // 取到 小数点后的值

        let valueString = "";

        for (let i = 0; i < valueArr.length; i++) {

        valueString += valueArr[i] + ((i + 1) % 3 == 0 && (i + 1) != valueArr.length ? "," : ""); //循环 取数值并在每三位加个','

        }

        const money = valueString.split("").join("") + "." + valueFloat; //拼接上小数位

        return money


      }
    },
    methods:{
      back() {
      	this.$router.go(-1); //返回上一层
      },
      clickHandler(item, index) {
          console.log(item, index)
      },
      showAlert() {
          this.$createDialog({
            type: 'alert',
            title: '兑换说明',
            content: '1、用户登录骨米宠物平台所获取/兑换得到的骨豆[虚拟资产]均可以抵扣骨豆商城相应的商品金额<br>'+
                     '2、我们鼓励用户通过积极参与骨米平台各种互动活动[详见骨豆详情页]，免费获取平台赠送的骨豆奖励<br>'+
                     '3、当用户骨豆数量不足于抵扣商品全额款时，可以选择使用账户余额、骨币、支付宝、微信支付余额<br>'+
                     '4、所有兑换商品用户都需要额外支付商品运费，兑换商品无质量问题均不接受退换<br>',
            icon: ''
          }).show()
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
      getData(){
        let self = this;
        this.axios.get(Api.userApi+'/boneBeanShop/selectCommodityDescById',{
          params:{
            cId:self.cId
          }

        }).then(function(res) {
              //console.log(res)
              if(res.data.code==1){
                self.bannerImg = res.data.data.image.split(',')
                self.deduction = self.boneBean/100
                self.goodsName = res.data.data.name
                self.sumSellNum = res.data.data.sumSellNum
                self.price = res.data.data.price
                self.boneBeanPrice = res.data.data.boneBeanPrice
                self.descImg = res.data.data.desc

                //console.log(self.bannerImg)
              }else{

              }
        	}).catch(function(err) {
              alert(err)

        	});
      }
    }
  }
</script>

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
      .goodsInfoBox{
        padding: 10px 20px 0 20px;
        position: relative;
        .getBon{
          // margin-left:30px;
          color:#ff523d;
        }
        .goodsName{
          font-size:26px;
          font-weight:bold;
          color:rgba(0,0,0,1);
          line-height:40px;
          padding-top:20px;
        }
        .duihuanBox{
          padding:20px 0;
          .num{
            font-size:22px;
            color:rgba(102,102,102,1);
            line-height:30px;
          }
          .sxdTip{
            width:90px;
            height:28px;
            font-size:20px;
            background:#64A9F8;
            border-radius:20px;
            color:#fff;
            margin-left:30px;
          }
        }
        .gudouDeductionBox{
          padding-top:20px;
          .leftBox{
            width:500px;
          }
          .tip{
            color:#666;
            margin-left:30px;
          }
        }
        .gudouDeduction{

          width:180px;
          height:40px;
          background:#FFB109;
          border-radius:20px;
          font-size:24px;
          color:#fff;
        }
        .gudouPrice{
          font-size:26px;
          line-height:48px;
          padding:20px 0 0 0;
          .new{
            color:#ff523d;
            margin-right:20px;
            b{
             font-size:40px;
             font-weight:bold;

            }
          }
          .old{

            font-size:28px;

            color:#999999;
            span{
              text-decoration:line-through;
              margin-left:5px;
            }
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
