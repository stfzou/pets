<template>
  <div class="cgIndexWarp">
    <div class="guDialog flex_r_s_c" @click.stop="loginDailongHide" v-show="isLoginDialong">
      <div class="dialongCnt" @click.stop>
        <div class="inputBox">
          <div class="itemList flex_r_f_s">
            <p>手机号码</p>
            <input type="number" v-model="phone"  placeholder="请输入手机号码" />
          </div>
          <div class="itemList flex_r_f_s vcode_box">
            <p>验证码</p>
            <input type="number" v-model="vCode"  placeholder="请输入验证码" />
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
    	<div class="nav_title">萌宠闯关</div>
    </div>
    <div class="cgBg">
      <img src="../../assets/icon_she81@2x.png" alt="">
    </div>
    <div class="cgBtnBox">
      <div class="cgNum" v-if="userId!=''">今日剩余{{num}}次闯关机会</div>
      <div class="cgBtn flex_r_s_c" @click="cgLink">开始萌宠闯关</div>
    </div>
    <div class="bottmBtn flex_r_s_b">
      <div class="flex_r_s_c" @click="recordLink">我的战绩</div>
      <div class="flex_r_s_c" @click="share">邀请好友参加</div>
    </div>
    <div class="ruleBtn flex_r_s_c" @click="ruleLink(12)">闯关规则</div>
  </div>
</template>

<script>
  import wxapi from '../common/wxapi.js'
  import Api from '../common/apj.js'
  export default{
    data(){
      return{
        phone: '',
        show:true,
        vCode: '',
        count: '',
        timer: null,
        reg: /^1[3456789]\d{9}$/,
        isLoginDialong:false,
        userId:'',
        userName:'',
        num:0
      }
    },
    mounted() {
      //localStorage.removeItem('user')
      // console.log(localStorage.getItem('user'))
      if (JSON.parse(localStorage.getItem('user')) != null) {
      	this.userId = JSON.parse(localStorage.getItem('user')).userId;
        this.userName = JSON.parse(localStorage.getItem('user')).userName;
        this.getNum();
      }

      this.wxShare();
    },
    methods:{
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
      loginDailongHide(){
         this.isLoginDialong = false;
      },
      vCodeLogin() {
        let self = this;

        if (this.phone == '') {

          alert('请填写手机号码')
          return false;
        } else if (!this.reg.test(this.phone)) {

          alert('手机号码格式错误')
          return false;
        } else if (this.vCode == '') {
          alert('请填写验证码')
          return false;
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
              self.getNum();
              self.isLoginDialong = false;
            } else {
              alert(res.data.msg)
            }

          }).catch(function(err) {
            console.log(err)
          })
        }

      },
      recordLink(){
        let self = this;
        if(this.userId!=''){
          this.$router.push({
            name:'cgRecord',
            query:{
              userId:self.userId
            }
          })
        }else{
          this.isLoginDialong = true;
        }
      },
      back() {
      	this.$router.go(-1); //返回上一层
      },
      share(){
      	let toast = this.$createToast({
      		txt: '点击顶部右上角进行分享',
      		type: 'warn'
      	  })
      	toast.show()
      },
      wxShare(){
        let self = this
        let option = {
          title: '萌宠闯关挑战你的大脑IQ', // 分享标题, 请自行替换
          desc:'我是'+self.userName+'我在骨米宠物参加萌宠闯关大赛，答题得奖励，养宠真有趣。快来试一下，让你脑洞大开！',
          link: 'https://h5.gumipet.com/index.html#/cgIndex', // 分享链接，根据自身项目决定是否需要split
          imgUrl:'https://gutouzu.oss-cn-shenzhen.aliyuncs.com/static/gumilogo_1024.png', // 分享图标, 请自行替换，需要绝对路径
          success: () => {

          },
          error: () => {

          }
        }
        wxapi.wxRegister(option)
      },
      ruleLink(id){
        this.$router.push({
          name:'agreement',
          query:{
            agreementId:id
          }
        })
      },
      cgLink(){

        if(this.userId!=''&&this.num>0){

          this.$router.push({
            name:'cgRank'
          })
        }else if(this.userId==''){
          this.isLoginDialong = true;
        }else if(this.num==0){
          let toast = this.$createToast({
          	txt: '今日答题次数已用完',
          	type: 'error'
            })
          toast.show()
        }

      },
      getNum(){
        let self = this;
        this.axios.get(Api.userApi+'/answerGame/selectAnswerInitData',{
          params:{
            userId:self.userId
          }

        }).then(function(res) {

              if(res.data.code==1){
                self.num = res.data.data

              }else{
                alert(res.data.msg)
              }
        	}).catch(function(err) {
              alert(err)

        	});
      }
    }
  }
</script>

<style lang="scss">
  .cgIndexWarp{
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
    .cgBg{
      padding-top:100px;
      img{
        width:640px;
        margin-left:20px;

      }
    }
    .ruleBtn{
      width:160px;
      height:50px;
      text-align:center;
      background:#fff;
      position:absolute;
      right:0;
      top:130px;
      border-top-left-radius: 25px;
      border-bottom-left-radius: 25px;
      color:#FF523D;
    }
    .cgBtnBox{
      position:absolute;
      bottom:280px;
      left:50%;
      width:390px;
      margin-left:-195px;
      .cgBtn{
        font-size:36px;
        color:#ff523d;
        border-radius:45px;
        height:90px;
        background:#fff;
        box-shadow:0px 10px 18px 0px rgba(217,23,0,0.2);
      }
      .cgNum{
        text-align:center;
        color:#fff;
        font-size:26px;
        padding-bottom:20px;
      }
    }
    .bottmBtn{
      position:absolute;
      bottom:100px;
      padding:0 80px;
      box-sizing:border-box;
      div{
        width:220px;
        height:50px;
        text-align:center;
        border-radius:25px;
        color:#FF523D;
        background:#fff;
        font-size:26px;
      }
    }
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
            height: 50px;
            line-height: 50px;
            width: 300px;
            margin-left: 30px;
            border: 1px solid #e8e8e8;
            padding-left:10px;
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
  }
</style>
