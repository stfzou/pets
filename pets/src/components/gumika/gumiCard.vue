<template>
  <div class="guimiCard">
    <div class="guDialog flex_r_s_c" @click.stop="dailongHide" v-show="isDialong">
      <div class="dialongCnt" @click.stop>
        <div class="inputBox">
          <div class="itemList flex_r_f_s">
            <p>手机号码</p>
            <input type="number" v-model="phone" @blur.prevent="inputLoseFocus" placeholder="请输入手机号码" />
          </div>
          <div class="itemList flex_r_f_s vcode_box">
            <p>验证码</p>
           <input type="password" v-model="vCode" @blur.prevent="inputLoseFocus" placeholder="请输入验证码" />
           <div class="v_code" v-if="show">
           	<span @click="getCode">获取验证码</span>
           </div>
           <div class="v_code active_vcode" v-else>
           	<span>{{count}}</span>
           </div>
          </div>
        </div>
        <div class="btnBox flex_r_s_b">
          <div class="cancelBtn flex_r_s_c" @click="dailongHide">取消</div>
          <div class="okBtn flex_r_s_c" @click="vCodeLogin">确定</div>
        </div>
      </div>
    </div>
    <div class="headPost">
      <div class="top_nav flex_r_s_b">
      	<div class="back" @click="back"></div>
      	<div class="nav_title">骨米卡特权权益</div>
      	<div class="share" @click="share"></div>
      </div>
    </div>
    <div class="cardCnt">
      <div class="vipCard">
       <!-- <div class="open flex_r_s_c">立即开通</div> -->
        <div class="barCode">
            <img src="../../assets/barCode.png" alt="">
            <div class="numCode">1234  1234  1234  1234</div>
        </div>
        <div class="validity">有效期至  2019/8/27</div>
      </div>
    </div>
    <div class="interestsInfoBox">
      <div class="interestsInfo flex_r_s_b">
        <div class="cnt_l">已使用权益<b>2</b>次</div>
        <div class="cnt_r">累计节省<b>￥18.60</b></div>
      </div>
    </div>
    <div class="navShow flex_r_s_b">
      <img src="../../assets/icon_gu08@2x.png" alt="">
      <img src="../../assets/icon_gu09@2x.png" alt="">
      <img src="../../assets/icon_gu10@2x.png" alt="">
      <img src="../../assets/icon_gu11@2x.png" alt="">
      <img src="../../assets/icon_gu12@2x.png" alt="">
      <img src="../../assets/icon_gu13@2x.png" alt="">
      <img src="../../assets/icon_gu14@2x.png" alt="">
      <img src="../../assets/icon_gu15@2x.png" alt="">
    </div>
    <div class="interestsBox">
      <div class="interests">
        <img src="../../assets/icon_gu02@3x.png" alt="">
      </div>
      <div class="interests">
        <img src="../../assets/icon_gu03@3x.png" alt="">
      </div>
      <div class="interests">
        <img src="../../assets/icon_gu04@3x.png" alt="">
      </div>
      <div class="interests">
        <img src="../../assets/icon_gu05@3x.png" alt="">
      </div>
      <div class="interests">
        <img src="../../assets/icon_gu06@3x.png" alt="">
      </div>
      <div class="interests">
        <img src="../../assets/icon_gu07@3x.png" alt="">
      </div>
    </div>
    <div class="gufoot" @click="dailongShow">
      <img src="../../assets/pay.png" alt="">
    </div>
  </div>
</template>

<script>
  import Api from '../common/apj.js'
  export default{
    data(){
      return{
        phone:'',
        vCode:'',
        show: true,
        count: '',
        timer: null,
        isDialong:false,
        reg: /^1[3456789]\d{9}$/,
      }
    },
    methods: {
      share(){

      },
      getCode() {
      	//获取验证码
      	if (this.phone) {
      		let _this = this;
      		const TIME_COUNT = 60;
      		if (!this.timer) {
      			this.count = TIME_COUNT;
      			this.show = false;
      			if(!this.forgetState){
      				this.axios.get(Api.userApi+'/sms_login_code?phone=' + this.phone, {
      						headers: {
      							'Content-Type': 'application/x-www-form-urlencoded'
      						}
      					})
      					.then(function(response) {
      						console.log(response);
      					})
      					.catch(function(error) {
      						console.log(error);
      					});
      			}else{
      				this.axios.get('/sms_getpwd?phone=' + this.phone, {
      						headers: {
      							'Content-Type': 'application/x-www-form-urlencoded'
      						}
      					})
      					.then(function(response) {
      						console.log(response);
      					})
      					.catch(function(error) {
      						console.log(error);
      					});
      			}

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
      	}

      },
      back() {
      	this.$router.go(-1);//返回上一层
      },
      dailongShow(){
        this.isDialong = true;
      },
      dailongHide(){
        this.isDialong = false;
      },
      inputLoseFocus() {
      	setTimeout(() => {
      	  window.scrollTo(0,0);
      	},100);

      },
      vCodeLogin(){
      	let self = this;

      	if(this.phone==''){

      		alert('请填写手机号码')
      		return false;
      	}else if (!this.reg.test(this.phone)) {

          alert('手机号码格式错误')
					return false;
				}
        else if(this.vCode == ''){
      		alert('请填写验证码')
      		return false;
      	}else{
      		this.axios.post(Api.userApi+'/user_sms_login', this.qs.stringify({
      			phone: this.phone,
      			vcode: this.vCode
      		}), {
      			headers: {
      				'Content-Type': 'application/x-www-form-urlencoded'
      			}
      		}).then(function(res) {

      			if (res.data.code === 1) {
      				console.log(res)
      				var userEntity = {
      					userName: res.data.user.userName,
      					userId: res.data.user.userId,
      					userPhone: res.data.user.phone,
      					token:res.data.token

      				};
      				// self.$store.commit('setUserInfo',userEntity);
      				sessionStorage.setItem('user', JSON.stringify(userEntity));
      			} else {
      				console.log(res)
              alert(res.data.msg)
      			}

      		}).catch(function(err) {
      			console.log(err)
      		})
      	}

      }
    },
  }
</script>

<style lang="scss">
  .guimiCard{
    background: #f5f5f5;
    .guDialog{
      position: fixed;
      height: 100%;
      width: 100%;
      left: 0;
      top: 0;
      z-index: 1000;
      background: rgba(0,0,0,0.6);
      .dialongCnt{
        width: 600px;
        background: #fff;
        padding-top: 20px;
        .itemList{
          padding: 20px ;
          input{
          	background: none;
          	outline: none;
            border-radius: 4px;
          	font-size: 26px;
          	color: #333;
            text-align: center;
            height: 50px;
            line-height: 50px;
          	width: 300px;
            margin-left: 30px;
            border: 1px solid #e8e8e8;
          }
          p{
            width: 110px;
            text-align: justify;
            text-align-last: justify;
            font-size: 26px;
          }

        }
        .vcode_box{
          input{
            width: 180px;
          }
        	.v_code{
        		margin-left: 30px;
        		span{
        			display: inline-block;
        			padding: 8px;
        			border-radius: 6px;
        			background: #ff523d;
        			color: #fff;
        			font-size: 24px;
        		}
        	}
        	.active_vcode{
        		span{
        			width: 60px;
        			text-align: center;
        		}
        	}
        }
        .btnBox{
          border-top: 1px solid #e8e8e8;/*no*/
          box-sizing: border-box;
          margin-top: 20px;
          div{
            width: 50%;
            height: 70px;
            font-size: 30px;
            box-sizing: border-box;
          }
          .cancelBtn{
            border-right: 1px solid #e8e8e8;/*no*/
          }
        }
      }
    }
    .headPost{
      height: 300px;
      background: url('../../assets/icon_she200@3x.png') no-repeat 0 center;
      background-size: 100%;
      .top_nav {
      	padding: 0 20px;
      	height: 88px;
      	box-sizing: border-box;
      	position: fixed;
      	z-index: 100;
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

      	}
      	.share{
      		width: 50px;
      		height: 40px;
      		background: url('../../assets/icon/share@2x.png') no-repeat center 0;
      		background-size: 100%;
      	}
      }
    }
    .interestsInfoBox{
      padding: 40px 26px 0 26px;
      .interestsInfo{
        height: 60px;
        box-sizing: border-box;
        border-radius:20px;
        background: #6B6969;
        padding: 0 30px;
        .cnt_l{
          color: #fff;
          font-size: 26px;
          line-height: 60px;
          b{
            color: #FFB109;
            font-size: 40px;
            margin: 0 10px;
          }
        }
        .cnt_r{
          color: #fff;
          font-size: 26px;
          line-height: 60px;
          b{
            color: #FFB109;
            font-size: 40px;
            margin-left: 10px;
          }
        }
      }
    }
    .cardCnt{
      .vipCard{
        width: 660px;
        height: 360px;
        position: relative;
        background: url('../../assets/card_bg.png') no-repeat 0 0;
        background-size: cover;
        margin: -180px auto 0 auto;
      }
      .open{
        width:240px;
        height:70px;
        background:#fff;
        border-radius:35px;
        color: #ff523d;
        font-size: 26px;
        position: absolute;
        left: 60px;
        bottom: 58px;
      }
      .barCode{
        width: 454px;
        position: absolute;
        left: 50%;
        margin-left: -227px;
        bottom:65px;
        .numCode{
          text-align: center;
          font-size: 26px;
          color: #fff;
          padding-top: 10px;
        }
        img{
          width: 454px;
        }
      }
      .validity{
        font-size: 24px;
        color: #fff;
        position: absolute;
        right: 60px;
        bottom: 16px;
      }
    }
    .navShow{
      overflow: hidden;
      padding: 0 26px;
      box-sizing: border-box;
      flex-wrap: wrap;
      img{
        width: 150px;
        margin-top: 30px;
      }
    }
    .interestsBox{
      padding: 0 26px;
      padding-bottom: 40px;
      .interests{
        padding-top: 40px;

        img{
          width: 100%;
        }
      }
    }
    .gufoot{
      width: 100%;
      height: 96px;
      img{
        width: 100%;
        height: 96px;
        display: block;
      }
    }
  }
</style>
