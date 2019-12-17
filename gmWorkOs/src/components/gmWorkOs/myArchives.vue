<template>
  <div class="myArchives">
    <div class="login_nav">
      <div class="back" @click="back"></div>
      <div class="title">我的档案</div>
    </div>
    <div class="myArchivesCnt">
      <div class="staffInfo">
      {{name}}<b style="color:#ff523d" v-if="!isManger">[{{department}}]</b><b style="color:#ff523d" v-if="isManger">[网点管理员]</b>
      <b v-if="!isManger" style="color: #2fcfec;">[{{post}}]</b>
      <b v-if="status==1" style="color: #32e9b8;">[正常]</b><b v-else style="color:red;">[禁用]</b></div>
      <ul class="myArchivesList">
        <li>
          电话号码 : {{phone}}
        </li>
        <li>
          业务区域 : {{province}}-{{city}}-{{area}}
        </li>
        <li>
          商户数量 : <span>{{shopNum}}</span>
        </li>
        <li>
          用户数量 : <span>{{userNum}}</span>
        </li>
        <li>
          添加日期 : {{createdTime}}
        </li>
      </ul>
      <div class="businessCode flex_c_f_e">
        <div class="title">我的业务推荐码</div>
        <div class="code flex_r_s_c">{{code}}</div>
        <div class="copy flex_r_s_c tag-read" @click="copy" data-clipboard-action="copy" :data-clipboard-text="code">复制</div>
      </div>
      <div class="upCode flex_r_s_c">
        <div class="v_code" v-if="show">
          <span @click="getvCode">刷新推荐码</span>
        </div>
        <div class="v_code active_vcode" v-else>
          <span>{{count}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Clipboard from 'clipboard'
  import Api from '../common/apj.js'
  export default {
    data() {
      return {
        employeeId: '',
        name: '',
        province: '',
        city: '',
        area: '',
        code: '',
        phone: '',
        shopNum: 0,
        userNum: 0,
        createdTime: '',
        status:'',
        department: '',
        post: '',
        departmentOptions: [{
          value: 1,
          text: '办公室'
        }, {
          value: 2,
          text: '运营部'
        }, {
          value: 3,
          text: '客服部'
        }, {
          value: 4,
          text: '内勤部'
        }],
        postOptions: [{
          value: 1,
          text: '经理'
        }, {
          value: 2,
          text: '主管'
        }, {
          value: 3,
          text: '区长'
        }, {
          value: 4,
          text: '组长'
        }, {
          value: 5,
          text: '职员'
        }],
        show: true,
        count: '',
        timer: null,
        isManger:''

      }
    },
    mounted() {

      this.employeeId = JSON.parse(localStorage.getItem('userInfo')).employeeId;
      this.isManger = JSON.parse(localStorage.getItem('userInfo')).manager;
      this.getRecord();

    },
    methods: {
      back(){
      	this.$router.go(-1); //返回上一层
      },
      copy() {
        let self = this

        var clipboard = new Clipboard('.tag-read')

        clipboard.on('success', e => {

          self.susTip('复制成功')
          // 释放内存
          clipboard.destroy()
        })
        clipboard.on('error', e => {
          // 不支持复制
          alert('该浏览器不支持自动复制')
          // 释放内存
          clipboard.destroy()
        })
      },
      susTip(msg) {
        let toast = this.$createToast({
          txt: msg,
          type: 'correct'
        })
        toast.show()
      },
      getRecord() {
        let self = this;
        self.axios.get(Api.userApi + '/employee/system/selectEmployeeRecord', {
          params: {
            employeeId: self.employeeId
          }
        }, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then((res) => {
          if (res.data.code == 1) {
            
            self.name = res.data.data.name;
            self.phone = res.data.data.phone;
            self.province = res.data.data.province;
            self.city = res.data.data.city;
            self.area = res.data.data.area;
            self.shopNum = res.data.data.shopNum;
            self.userNum = res.data.data.userNum;
            self.code = res.data.data.code;
            self.createdTime = res.data.data.createdTime;
            self.status = res.data.data.status;
            self.departmentOptions.forEach((e) => {
              if (e.value == res.data.data.department) {
                this.department = e.text;
              }
            });
            self.postOptions.forEach((e) => {
              if (e.value == res.data.data.post) {
                this.post = e.text;
              }
            });
          } else {
            alert(res.data.msg)
          }
        })
      },
      getvCode() {
        //获取验证码

          let _this = this;
          const TIME_COUNT = 5;
          if (!this.timer) {
            this.count = TIME_COUNT;
            this.show = false;
            this.upCode();
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
      upCode(){
        let self = this;
        self.axios.get(Api.userApi + '/employee/system/refreshCode', {
          params: {
            employeeId: self.employeeId
          }
        }, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then((res)=>{
          if(res.data.code==1){
            self.code = res.data.data;

          }else{
            alert(res.data.msg);
          }
        })
      }
    }
  }
</script>

<style lang="scss">
  .myArchives {

    .login_nav {
      height: 42px;
      padding: 22px 0;
      position: relative;
      border-bottom: 1px solid #e8e8e8;

      .addStaffData {
        width: 40px;
        height: 40px;
        position: absolute;
        right: 20px;
        top: 50%;
        margin-top: -21px;

        img {
          width: 40px;
          height: 40px;
        }
      }

      .back {
        background: url("../../assets/icon/backColory.png") no-repeat center 0;
        background-size: cover;
        width: 24px;
        height: 40px;
        position: absolute;
        left: 20px;
        top: 50%;
        margin-top: -21px;
      }

      .title {
        font-size: 30px;
        color: #333;
        line-height: 42px;
        text-align: center;

        span {
          color: #ff523d;
        }
      }
    }

    .myArchivesCnt {
      padding: 0 22px;

      .staffInfo {
        font-size: 26px;
        color: #666;
        padding-top: 30px;

        b {
          font-weight: bold;
          margin-left: 10px;
        }
      }

      .myArchivesList {
        li {
          padding-top: 50px;

          span {
            color: #ff523d;
            font-size: 30px;
          }
        }
      }

      .businessCode {
        padding-top: 60px;

        .title {
          padding-bottom: 50px;
        }

        .code {
          width: 260px;
          background: #fdbb8a;
          color: #666;
          height: 80px;
          font-size: 60px;
          font-weight: bold;
        }

        .copy {
          height: 50px;
          width: 100px;
          border-radius: 25px;
          color: #fff;
          background: #ff523d;
          font-size: 26px;
          margin-top: 50px;
        }
      }
      .upCode{
        padding-top:30px;
        .v_code{

        	span{
        		display: inline-block;
        		padding: 8px;
        		border-radius: 6px;
            background:#ff523d;
        		color: #fff;
        		font-size: 24px;
        	}
        }
        .active_vcode{
        	span{
        		width: 60px;
        		text-align: center;
            background:gray;

        	}
        }
      }
    }
  }
</style>
