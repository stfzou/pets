<template>
  <div class="helpHome">
    <div class="guDialog flex_r_s_c" @click.stop="loginDailongHide" v-show="isLoginDialong">
      <div class="dialongCnt" @click.stop>
        <div class="inputBox">
          <div class="itemList flex_r_f_s">
            <p>手机号码</p>
            <input type="number" v-model="phone" placeholder="请输入手机号码" />
          </div>
          <div class="itemList flex_r_f_s vcode_box">
            <p>验证码</p>
            <input type="number" v-model="vCode" placeholder="请输入验证码" />
            <div class="v_code" v-if="show">
              <span @click="getvCode">获取验证码</span>
            </div>
            <div class="v_code active_vcode" v-else>
              <span>{{count}}</span>
            </div>
          </div>
        </div>
        <div class="btnBox flex_r_s_b">
          <div class="cancelBtn flex_r_s_c" @click="loginDailongHide">取消</div>
          <div class="okBtn flex_r_s_c" @click="vCodeLogin">确定</div>
        </div>
      </div>

    </div>
      <div class="top_nav flex_r_s_b">
      	<div class="back" @click="back"></div>
      	<div class="nav_title">帮助与反馈</div>

      </div>
      <div class="helpHomeCnt">
        <div class="title"><span>问题类型</span></div>
        <ul class="cntList">
          <li class="flex_r_s_b" @click="goTypeList(1,'关于账号')">
            <div class="list_l flex_r_f_s">
              <img src="../../assets/icon_she34.png" alt="">
              <span>关于账号</span>
            </div>
            <div class="list_r">
              <img src="../../assets/icon/right_sjx.png" alt="">
            </div>
          </li>
          <li class="flex_r_s_b" @click="goTypeList(2,'信息认证')">
            <div class="list_l flex_r_f_s">
              <img src="../../assets/icon_she41.png" alt="">
              <span>信息认证</span>
            </div>
            <div class="list_r">
              <img src="../../assets/icon/right_sjx.png" alt="">
            </div>
          </li>
          <li class="flex_r_s_b" @click="goTypeList(3,'动态发布')">
            <div class="list_l flex_r_f_s">
              <img src="../../assets/icon_she143.png" alt="">
              <span>动态发布</span>
            </div>
            <div class="list_r">
              <img src="../../assets/icon/right_sjx.png" alt="">
            </div>
          </li>
          <li class="flex_r_s_b" @click="goTypeList(4,'关于活动')">
            <div class="list_l flex_r_f_s">
              <img src="../../assets/icon_she36.png" alt="">
              <span>关于活动</span>
            </div>
            <div class="list_r">
              <img src="../../assets/icon/right_sjx.png" alt="">
            </div>
          </li>
          <li class="flex_r_s_b" @click="goTypeList(6,'商家帮助')">
            <div class="list_l flex_r_f_s">
              <img src="../../assets/icon_gu145.png" alt="">
              <span>商家帮助</span>
            </div>
            <div class="list_r">
              <img src="../../assets/icon/right_sjx.png" alt="">
            </div>
          </li>
          <li class="flex_r_s_b" style="border: none;" @click="goTypeList(5,'其他')">
            <div class="list_l flex_r_f_s">
              <img src="../../assets/icon_she144.png" alt="">
              <span>其他</span>
            </div>
            <div class="list_r">
              <img src="../../assets/icon/right_sjx.png" alt="">
            </div>
          </li>
        </ul>
        <div class="helpLine"></div>
        <div class="title"><span>意见反馈</span></div>
        <div class="inputBox">
          <cube-textarea v-model="value" :maxlength="100" placeholder="我们需要您最真诚的意见和反馈，让我们做得更好！"></cube-textarea>
        </div>

      </div>
      <div class="commit flex_r_s_c" @click="commit">提交</div>
  </div>
</template>

<script>
  import Api from '../common/apj.js'
  export default{
    data(){
      return{
        value:'',
        vCode: '',
        count: '',
        phone: '',
        show:true,
        timer: null,
        reg: /^1[3456789]\d{9}$/,
        isLoginDialong:false,
        userId:-1
      }
    },
    mounted() {
      //localStorage.removeItem('user')
      if(JSON.parse(localStorage.getItem('user')) == null){
      	// this.$store.commit('setRouterName','activity');
      	this.userId = -1;
      }else{
      	this.userId = JSON.parse(localStorage.getItem('user')).userId;
      }
    },
    methods:{
      back() {
      	this.$router.go(-1); //返回上一层
      },
      goTypeList(typeId,title){
        this.$router.push({
          name:'helpList',
          query:{
            typeId:typeId,
            title:title
          }
        })
      },
      commit(){
        if(this.userId==-1){
          this.isLoginDialong = true;
        }else if(this.value==''){
          let toast = this.$createToast({
          	txt: '请填写后再提交',
          	type: 'error'
            })
          toast.show()
        }else{
          let self = this;
          self.axios.post(Api.userApi + '/opinion/addOpinion', self.qs.stringify({//查询骨米卡状态
            userId: self.userId,
            content:self.value
          }), {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          }).then((res)=>{
            if(res.data.code==1){
              let toast = self.$createToast({
              	txt: '提交成功',
              	type: 'correct'
                })
              toast.show();
              self.value = '';
            }else{
              alert(res.data.msg)
            }
          })
        }
      },
      loginDailongHide(){
         this.isLoginDialong = false;
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
          this.axios.post(Api.userApi + '/user_sms_login', this.qs.stringify({
            phone: this.phone,
            vcode: this.vCode
          }), {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          }).then(function(res) {

            if (res.data.code === 1) {

              var userEntity = {
                userName: res.data.user.userName,
                userId: res.data.user.userId,
                userPhone: res.data.user.phone,
                token: res.data.token
              };
              self.userId = res.data.user.userId;
              localStorage.setItem('user', JSON.stringify(userEntity));
              self.isLoginDialong = false;
            } else {
              alert(res.data.msg)
            }

          }).catch(function(err) {
            console.log(err)
          })
        }

      },
      getvCode() {
        //获取验证码

        if (this.phone == '') {

          alert('请填写手机号码')
          return false;
        } else if (!this.reg.test(this.phone)) {

          alert('手机号码格式错误')
          return false;
        }
        if (this.phone) {
          let _this = this;
          const TIME_COUNT = 60;
          if (!this.timer) {
            this.count = TIME_COUNT;
            this.show = false;
            if (!this.forgetState) {
              this.axios.get(Api.userApi + '/sms_login_code?phone=' + this.phone, {
                  headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                  }
                })
                .then(function(response) {

                })
                .catch(function(error) {
                  console.log(error);
                });
            } else {
              this.axios.get('/sms_getpwd?phone=' + this.phone, {
                  headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                  }
                })
                .then(function(response) {

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
    }
  }
</script>

<style lang="scss">
  .helpHome{
    height:100%;
    position: relative;
    .guDialog{
      position:fixed;
      height:100%;
      width:100%;
      left:0;
      top:0;
      z-index:100000;
      background:rgba(0,0,0,0.6);
      .dialongCnt{
        width: 600px;
        background: #fff;
        padding-top: 20px;

        .itemList {
          padding: 30px 20px;
          box-sizing: border-box;

          input {
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

          p {
            width: 110px;
            text-align: justify;
            text-align-last: justify;
            font-size: 26px;
          }

        }

        .vcode_box {
          input {
            width: 180px;
          }

          .v_code {
            margin-left: 30px;

            span {
              display: inline-block;
              padding: 8px;
              border-radius: 6px;
              background: #ff523d;
              color: #fff;
              font-size: 24px;
            }
          }

          .active_vcode {
            span {
              width: 60px;
              text-align: center;
            }
          }
        }

        .btnBox {
          border-top: 1px solid #e8e8e8;
          /*no*/
          box-sizing: border-box;
          margin-top: 20px;

          div {
            width: 50%;
            height: 70px;
            font-size: 30px;
            box-sizing: border-box;
          }

          .cancelBtn {
            border-right: 1px solid #e8e8e8;
            /*no*/
          }
        }
      }
    }
    .top_nav {
    	padding: 0 20px;
    	height: 88px;
    	box-sizing: border-box;
    	z-index: 100;
      border-bottom:1px solid #ff523d;/*no*/
      background: #fff;
    	.back {
    		width: 26px;
    		height: 42px;
    		background: url(../../assets/icon/backColory.png) no-repeat center 0;
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

    }
    .helpHomeCnt{
      .title{
        padding:20px;
        span{
          padding-left:10px;
          border-left:4px solid #ff523d;/*no*/
          display:inline-block;
          font-size:28px;
          color:#000;
        }
      }
      .cntList{
        padding:0 20px;
        li{
          border-bottom:1px solid #e8e8e8;/*no*/
          padding:22px 0;
          .list_l{
            img{
              width:30px;
              margin-right:10px;
            }
            span{
              font-size:28px;
              color:#000;
            }
          }
          .list_r{
            img{
              width:14px;
            }
          }
        }
      }
      .helpLine{
        height:10px;/*no*/
        background:#e8e8e8;
      }
      .inputBox{
        padding:0 20px;
        .cube-textarea-wrapper {
          margin-top: 20px;
          height:260px;
        }
      }
    }
    .commit{
      height:96px;
      background:#ff523d;
      color:#fff;
      font-size:30px;
      position: absolute;
      bottom:0;
      left:0;
    }
  }
</style>
