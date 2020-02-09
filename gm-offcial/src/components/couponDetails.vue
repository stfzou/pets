<template>
  <div class="couponDetails">
      <div class="loginMask" v-show="isLogin">
        <div class="loginMaskCnt">
          <div class="title">请输入验证码后进行购买</div>
          <ul>
          	<li class="flex_r_f_s">
          		<img class="mr-30" src="../assets/icon-person@2x.png" alt="" />
          		<el-input class="phoneInput" v-model="phone" size="mini" placeholder="请输入手机号码"></el-input>
          	</li>
          	<li class="flex_r_f_s">
          		<img class="mr-30" src="../assets/icon_yanzheng@2x.png" alt="" />
          		<el-input class="yzInput" v-model="vCode" size="mini" placeholder="请输入验证码"></el-input>
          		<div class="v_code pointer" @click="getCode" v-if="show">获取验证码</div>
              <div class="v_code pointer" v-else>{{count}}</div>
          	</li>
          	<li class="registerBtn pointer flex_r_s_b">
          		 <el-button size="mini" @click="loginHide">取消</el-button>
          		 <el-button size="mini" type="primary" @click="vCodeLogin">确定</el-button>
          	</li>
          </ul>
        </div>
      </div>
      <div class="couponDetailsCnt">
        <div class="couponDetailsPost flex_r_s_b">
          <div class="activityCoverBox">
            <div class="activityCover" v-bind:style="{'background-image':'url('+couponIcanImg+')'}">
              <img v-if="couponType===3" class="privilege" src="../assets/icon_gu30@3x.png" alt="">
              <img v-if="couponType===2" class="privilege" src="../assets/icon_gu32@3x.png" alt="">
              <img v-if="couponType===1" class="privilege" src="../assets/icon_gu33@3x.png" alt="">
            </div>
            <div class="activityCoverList flex_r_s_b">

                <i class="el-icon-arrow-left leftBtn pointer" :class="{activeI:couponIndex==0}" @click="leftClick"></i>
                <ul class="flex_r_f_s pointer">
                  <li @click="imgClick(item,index)" v-for="(item,index) in couponIcan" :class="{activeLi:couponIndex==index}" v-bind:style="{'background-image':'url('+item+')'}">

                  </li>

                </ul>
                <i class="el-icon-arrow-right rightBtn pointer" :class="{activeI:couponIndex==couponIcan.length-1}" @click="rightClick"></i>
            </div>
          </div>
            <div class="activityInfo">
              <div class="activityTitle">{{couponName}}</div>
               <div class="conditionBox flex_r_f_s">
                 <!-- <b>¥{{couponPrice.toFixed(2)}}</b>
                 <span>满{{conditionPrice.toFixed(2)}}元使用</span> -->
                 <div class="sale">
                    <span v-if="couponType==2">￥{{conditionPrice}}</span>
                    <span v-if="couponType==3&&isCard==1">￥{{conditionPrice}}</span>
                    <span v-if="couponType==3&&isCard!=1">￥{{originalPrice}}</span>
                   <span v-if="couponType===1">￥{{couponPrice}}</span>
                 </div>
                 <div class="condition">
                   <span v-if="conditionPrice!==0&&couponType===1">满<span>{{conditionPrice.toFixed(1)}}</span>元使用</span>
                   <span v-if="couponType!=1">原价:<span class="through">{{couponPrice.toFixed(1)}}</span></span>
                   <span v-if="conditionPrice==0&&couponType===1">无门槛使用</span>
                 </div>

               </div>
              <ul>
                <li class="flex_r_f_s">
                  <div class="list_l">领取数</div>
                  <div class="list_r">已领取{{receiveNum}}张</div>
                </li>
                <li class="flex_r_f_s">
                  <div class="list_l">有效期</div>
                  <div class="list_r">{{couponStartTime}}~{{couponEndTime}}</div>
                </li>

                <li class="flex_r_f_s">
                  <div class="list_l">使用门店</div>
                  <div class="list_r">
                    <div class="shopName pointer" @click="shopLink">{{shopName}}</div>
                    <div class="addr"><i class="el-icon-location"></i>{{shopAddress}}</div>
                  </div>
                </li>
                <li class="flex_r_f_s">
                  <div class="list_l"></div>
                  <div class="list_r">
                    <div v-if="couponType!=1" class="joinBtn pointer" @click="receive">立即购买</div>
                    <div class="joinBtn pointer" @click="notMoneyPeceive" v-else>立即领取</div>
                  </div>
                </li>
              </ul>

            </div>
        </div>
        <div class="explain">
          <div class="title">使用说明</div>
          <p v-html="couponDesc"></p>
        </div>
        <div class="shopMoreCoupon">
          <div class="title">商家更多福利</div>
          <div class="shopCouponList">
            <ul class="flex_r_f_s">
              <li class="pointer" v-for="item in shopCoupons" @click="couponXq(item)">
                 <div class="imgBox" v-bind:style="{'background-image':'url('+item.couponIcan+')'}">
                   <img v-if="item.couponType===3" class="privilege" src="../assets/icon_gu30@3x.png" alt="">
                   <img v-if="item.couponType===2" class="privilege" src="../assets/icon_gu32@3x.png" alt="">
                   <img v-if="item.couponType===1" class="privilege" src="../assets/icon_gu33@3x.png" alt="">
                 </div>
                 <div class="couponName">{{item.couponName|descFilter}}</div>
                 <div class="priceBox flex_r_f_s">
                   <div class="sale">

                     <span v-if="item.couponType==2">￥{{item.conditionPrice}}</span>
                     <span v-if="item.couponType==3&&isCard==1">￥{{item.conditionPrice}}</span>
                     <span v-if="item.couponType==3&&isCard!=1">￥{{item.originalPrice}}</span>
                     <span v-if="item.couponType===1">￥{{item.couponPrice}}</span>

                   </div>
                   <div class="condition">

                     <span v-if="item.conditionPrice!==0&&item.couponType===1">满<span>{{item.conditionPrice.toFixed(1)}}</span>元使用</span>
                     <span v-if="item.couponType!=1">原价:<span class="through">{{item.couponPrice.toFixed(1)}}</span></span>
                   	<span v-if="item.conditionPrice==0&&item.couponType===1">无门槛使用</span>
                   </div>
                 </div>
              </li>
            </ul>
            <div class="more pointer" @click="maskShow">查看更多</div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
  import Api from '../api/api.js'
  export default{
    data(){
      return{
        isCard:0,
        lng:0,
        lat:0,
        shopImg:'',
        couponIcan:[],
        couponDesc:'',
        shopAddress:'',
        couponName:'',
        couponPrice:0,
        conditionPrice:0,
        couponType:'',
        shopName:'',
        receiveNum:0,
        originalPrice:0,
        couponStartTime:'',
        couponEndTime:'',
        shopAddress:'',
        couponIcanImg:'',
        couponIndex:0,
        shopId:'',
        couponId:'',
        userId:'',
        vCode: '',
        show: true,
        count: '',
        reg: /^1[3456789]\d{9}$/,
        timer: null,
        phone:'',
        isLogin:false,
        shopCoupons:[]
      }
    },
    filters:{
      descFilter(val){
        if(val.length>22){
          return val.substr(0,22)+'...'
        }else{
          return val
        }
      },
    },
    mounted() {
      //localStorage.removeItem('user')
      this.couponId = this.$route.query.couponId;
      if(JSON.parse(localStorage.getItem('user')) != null){
        this.userId = JSON.parse(localStorage.getItem('user')).userId;
      }

      if(JSON.parse(localStorage.getItem('isCard')) != null){
        this.isCard = JSON.parse(localStorage.getItem('isCard'));
      }
      console.log(JSON.parse(localStorage.getItem('isCard')))
      this.getShopCouponList();
    },
    watch:{
      $route( to , from ){
          this.couponId = to.query.couponId;
          this.$router.go(0);
      }
    },

    methods:{
      maskShow(){
        this.$popup();
      },
      loginHide(){
        this.isLogin=false;
      },
      notMoneyPeceive(){
        let self = this;
        self.axios.post(Api.httpApi + '/coupon/addUserCoupon', self.qs.stringify({
        	userId: self.userId,
        	couponId:self.couponId,
        }), {
        	headers: {
        		'Content-Type': 'application/x-www-form-urlencoded'
        	}
        }).then((res)=>{
        	if(res.data.code == 1){
        		self.$message({
              message: '领取成功',
              type: 'success'
        		});
        	}else{
        		alert(res.data.msg)
        	}
        })
      },
      receive(){//立即购买
        let self = this;
        if(this.userId==''||this.userId==null){
          this.isLogin=true;
        }else{
          let price = 0;
          if(this.isCard==1&&this.couponType==3){
            
            price = this.originalPrice
          }else{
            price = this.conditionPrice
          }
          this.$router.push({
            name:'cashier',
            query:{
              price:price,
              couponId:self.couponId
            }
          })
        }
      },
      vCodeLogin() {
        let self = this;

        if (this.phone == '') {

          alert('请填写手机号码')

        } else if (!this.reg.test(this.phone)) {

          alert('手机号码格式错误')

        } else if (this.vCode == '') {
          alert('请填写验证码')

        } else {
          this.axios.post(Api.httpApi + '/user_sms_login', this.qs.stringify({
            phone: this.phone,
            vcode: this.vCode
          }), {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          }).then(function(res) {

            if (res.data.code === 1) {
              //console.log(res)
              var userEntity = {
                userName: res.data.user.userName,
                userId: res.data.user.userId,
                userPhone: res.data.user.phone,
                token: res.data.token
              };
              self.userId = res.data.user.userId;
              self.$message({
                message: '验证成功',
                type: 'success'
              });
              setTimeout(()=>{
                self.isLogin = false;
              },500)
              self.isLogin = false;
              localStorage.setItem('user', JSON.stringify(userEntity));

              self.axios.post(Api.httpApi + '/boneMika/selectUserBoneMikaStatus', self.qs.stringify({//查询骨米卡状态
                userId: self.userId
              }), {
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded'
                }
              }).then((re) => {

                if(re.data.code===1){

                  if(re.data.data===1){
                    localStorage.setItem('isCard',1)
                    self.isCard = 1;
                  }else{
                    localStorage.setItem('isCard',0)
                    self.isCard = 0;
                  }
                }else{
                  alert(re.data.msg)
                }

              })
            }

          })
        }

      },
      getCode() {
        //获取验证码
        if (this.phone == '') {

          alert('请填写手机号码')
          return false;
        } else if (!this.reg.test(this.phone)) {

          alert('手机号码格式错误')
          return false;
        }

          let _this = this;
          const TIME_COUNT = 60;
          if (!this.timer) {
            this.count = TIME_COUNT;
            this.show = false;
            this.axios.get(Api.httpApi + '/sms_login_code?phone=' + this.phone, {
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded'
                }
              })
              .then(function(response) {

              })
              .catch(function(error) {
                console.log(error);
              });
            this.timer = setInterval(() => {
              if (this.count > 0 && this.count <= TIME_COUNT) {
                this.count--;
              } else {
                this.show = true;
                clearInterval(this.timer);
                this.timer = null;
              }
            }, 1000)
          }


      },
      shopLink(){
        let self = this;
        this.$router.push({
          name:'shopCoupon',
          query:{
            shopId:self.shopId
          }
        })
      },
      couponXq(item){

        this.$router.push({
          name:'couponDetails',
          query:{
            couponId:item.couponId
          }
        })
      },
      leftClick(){
        if(this.couponIndex <=0 ){
          this.couponIndex = 0
        }else{
          this.couponIndex--;
          this.couponIcanImg = this.couponIcan[this.couponIndex];
        }
      },
      rightClick(){

        if(this.couponIndex == this.couponIcan.length-1 ){
          this.couponIndex = this.couponIcan.length-1
        }else{
          this.couponIndex++;
          this.couponIcanImg = this.couponIcan[this.couponIndex];
        }
      },
      imgClick(item,index){
        this.couponIcanImg = item;
        this.couponIndex = index;
      },
      getShopCouponList(){
      	let self = this;
      	self.axios.post(Api.httpApi + '/coupon/selectCouponDetailsAndShopsInfo', self.qs.stringify({
      		userId: -1,
      		couponId: self.couponId,
      		latitude: 0,
      		longitude: 0
      	}), {
      		headers: {
      			'Content-Type': 'application/x-www-form-urlencoded'
      		}
      	}).then((res)=>{
      		if(res.data.code == 1){
            //console.log(res.data.data)
            self.shopId = res.data.data.shopId;
            self.getShopCoupon();
            self.couponName = res.data.data.couponName;
            self.couponPrice = res.data.data.couponPrice;
            self.conditionPrice = res.data.data.conditionPrice;
            self.originalPrice = res.data.data.originalPrice;
            self.couponType = res.data.data.couponType;
            self.receiveNum = res.data.data.receiveNum;
            self.couponIcanImg = res.data.data.couponIcan;
            self.couponIcan.push(res.data.data.couponIcan)
            if(res.data.data.couponIcanA!=''){
              self.couponIcan.push(res.data.data.couponIcanA)
            }
            if(res.data.data.couponIcanB!=''){
              self.couponIcan.push(res.data.data.couponIcanB)
            }
      			self.shopAddress = res.data.data.shopAddress;
      			self.couponDesc = res.data.data.couponDesc.replace(/(\r\n)|(\n)/g,'<br>');
            //console.log(self.couponDesc)
            self.shopName = res.data.data.shopName;
            self.couponStartTime = res.data.data.couponStartTime;
            self.couponEndTime = res.data.data.couponEndTime;
            self.shopAddress = res.data.data.province+res.data.data.city+res.data.data.area+res.data.data.shopAddress;
      		}else{
      			alert(res.data.msg)
      		}

      	})
      },
      getShopCoupon(){
        let self = this;
        self.axios.post(Api.httpApi + '/coupon/selectShopsCoupon', self.qs.stringify({
        	userId: -1,
        	shopId:self.shopId,
        	latitude: 0,
        	longitude: 0
        }), {
        	headers: {
        		'Content-Type': 'application/x-www-form-urlencoded'
        	}
        }).then(res=>{
          if(res.data.code==1){

            if(res.data.data.shopCoupons.length>6){
              self.shopCoupons = res.data.data.shopCoupons.slice(0,6);
            }else{
              self.shopCoupons = res.data.data.shopCoupons;
            }
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped="scoped">
  .couponDetails{
    padding-top:108px;
    .loginMask{
      height:100%;
      width:100%;
      position: fixed;
      left:0;
      top:0;
      background:rgba(0,0,0,0.6);
      z-index:10000;
      .loginMaskCnt{
        width:500px;
        height:250px;
        background:#fff;
        position: absolute;
        left:50%;
        top:50%;
        margin-left:-250px;
        margin-top:-125px;
        border-radius:10px;
        .title{
          font-size:18px;
          color:#333;
          padding-top:20px;
        }
        ul{
          padding:20px 40px 20px 40px;
        }
        li{
          padding-bottom:30px;
          box-sizing:border-box;
          .mr-30{
            margin-right:30px;
          }
          .phoneInput{
            width:200px;

          }
          .yzInput{
            width:130px;
            margin-right:20px;
          }
          .v_code{
            background:#ff523d;
            color:#fff;
            padding:5px;
            // height:24px;
            text-align:center;
            border-radius:4px;
          }

        }
        .registerBtn{
          padding:10px 80px 0 80px;
        }
      }
    }
    .through{
      text-decoration:line-through;
    }
    .couponDetailsCnt{
      width:1100px;
      margin:0 auto;
      .couponDetailsPost{
        align-items:flex-start;
        text-align:left;
        .activityCover{
          width:420px;
          height:420px;
          background-size: contain;
          background-repeat: no-repeat;
          background-position: 50%;
          border-radius:10px;
          position:relative;
          img{
            position: absolute;
            left: 0;
            top: 10px;
            width: 120px;
          }
        }
        .activityCoverList{
          padding-top:20px;

          i{
            font-size:32px;
            font-weight:bold;
            color:#333;
          }
          .activeI{
            color:#999;
          }
          ul{
            width:340px;
            li{
              background-size:cover;
              background-repeat: no-repeat;
              width:70px;
              height:70px;
              border-radius:10px;
              margin-right:20px;
              box-sizing:border-box;
            }
            .activeLi{
              border:1px solid red;
            }
          }

        }
        .activityInfo{
          width:600px;
          .activityTitle{
            font-size:20px;
            line-height:36px;
          }
          .conditionBox{
            padding-top:20px;
            .sale{
              font-size:30px;
              color:#ff523d;
              font-weight:bold;
              margin-right:10px;
            }
            .condition{
              color:#999;
            }
          }

          ul{

            li{
              color:#666;
              padding-top:20px;
              align-items:flex-start;
              .list_l{
                width:100px;
                padding-top:3px;
              }
              .list_r{
                width:550px;
                line-height:20px;
                .joinBtn{
                  width:180px;
                  height:40px;
                  background:#ff523d;
                  text-align:center;
                  line-height:40px;
                  border-radius:10px;
                  font-size:20px;
                  color:#fff;
                  margin-top:30px;
                }
                .addr{
                  padding-top:10px;
                  i{
                    color:#ff523d;
                    font-size:20px;
                  }
                }
              }
            }
          }
        }
      }
    }
    .explain{
      text-align:left;
      padding-top:60px;
      .title{
        padding-left:10px;
        border-left:3px solid #ff523d;
        font-size:18px;
        color:#333;
      }
      p{
        padding-top:30px;
        line-height:20px;
        color:#999999;
        line-height:30px;
      }
    }
    .shopMoreCoupon{
      padding-top:30px;
       text-align:left;
      .title{
        padding-left:10px;
        border-left:3px solid #ff523d;
        font-size:18px;
        color:#333;
      }
      .shopCouponList{
        padding-top:30px;
        ul{
          align-items:flex-start;
          li{
            width:160px;
            margin-right:20px;
            .imgBox{
              background-size: contain;
              background-repeat: no-repeat;
              background-position: 50%;
              width:160px;
              height:160px;
              border-radius:20px;
              position:relative;
              img{
                position: absolute;
                left: 0;
                top: 10px;
                width: 120px;

              }
            }
            .couponName{
              padding-top:10px;
              line-height:20px;
              color:#666;
            }
            .priceBox {
              padding-top:10px;
              .sale{
                font-size:18px;
                color:#ff523d;
                margin-right:10px;
              }
              .condition{
                color:#999;
              }
            }
          }
        }
        .more{
          color:#ff523d;
          font-size:16px;
          padding-top:20px;
        }
      }
    }

  }
</style>
