<template>
  <div class="activityEnter">
    <div class="top_nav flex_r_s_b">
      <div class="back" @click="back"></div>
      <div class="nav_title">报名名单</div>
    </div>
    <div class="joinList">
      <ul>
        <li>
          <div class="title">姓名<span>*</span></div>
          <input type="text" @blur.prevent="inputLoseFocus" v-model="userName" maxlength="10" placeholder="请输入您的姓名" />
        </li>
        <li>
          <div class="title">昵称</div>
          <input type="text" @blur.prevent="inputLoseFocus" maxlength="10" v-model="nickName" placeholder="请输入您的昵称" />
        </li>
        <li>
          <div class="title">电话<span>*</span></div>
          <input type="text" @blur.prevent="inputLoseFocus" v-model="phone" placeholder="请输入您的电话" />
        </li>
        <li>
          <div class="title">邮箱<span>*</span></div>
          <input type="text" @blur.prevent="inputLoseFocus" v-model="eMail" placeholder="请输入您的邮箱" />
        </li>
      </ul>
    </div>
    <div class="upTitle">上传图片</div>
    <div class="upActiveImg flex_r_f_s">

      <div v-show="fileUrl.length>0" class="img-box" v-for="(item,index) in fileUrl">
        <img :src="item.imgUrl" alt="">
        <i class="cubeic-wrong" @click="removeImg(index)"></i>
      </div>


      <div class="uploadBox">
        <!--  -->
        <el-upload class="avatar-uploader"  :http-request="uploadIMG" ref="uploadGoodsMain"
        action="http://192.168.0.109:8084/updateImg" :limit="1" list-type="picture" name="Img">
        	<div class="upload-text flex_r_s_c">
        		<i class="el-icon-plus"></i>
        	</div>
        </el-upload>

      </div>

    </div>
    <div class="couponBtn flex_r_s_c" @click="joinActivity">确定报名</div>
  </div>
</template>

<script>
  import Api from '../common/apj.js'
  import imgPreview from '../../data/compress.js'
  export default {
    data() {
      return {
        userName: '',
        nickName: '',
        phone: '',
        eMail: '',
        files: [],
        fileUrl:[],
        url:'',
        action: {
          target: '//jsonplaceholder.typicode.com/photos/'
        }
      }
    },
    methods: {
      back() {
        this.$router.go(-1); //返回上一层
      },
      inputLoseFocus() {
        setTimeout(() => {
          const scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0;
          window.scrollTo(0, Math.max(scrollHeight - 1, 0));
        }, 100);

      },
      FreeJoin(cAOrderId) {

        let self = this;
        this.axios.post(Api.userApi + '/ca/freeJoinCommunityActivity', this.qs.stringify({
          cAOrderId: cAOrderId,
          cAId: JSON.parse(sessionStorage.getItem('id')),
          userId: JSON.parse(sessionStorage.getItem('user')).userId
        }), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then((res) => {
          if (res.data.code == 1) {
            let toast = this.$createToast({
              txt: '加入活动成功',
              type: 'cubeic-right'
            })
            toast.show();

            setTimeout(() => {
              self.$router.push({
                name: 'activity',
                parmas: {
                  id: JSON.parse(sessionStorage.getItem('id')),
                }
              })
            }, 500)

          } else {
            alert(res.data.msg)
          }
        })

      },
      joinActivity() {
        let reg = /^1[3456789]\d{9}$/;
        let regEmail = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
        if (this.userName == '') {
          let toast = this.$createToast({
            txt: '姓名不能为空',
            type: 'error'
          })
          toast.show()
          return false;
        } else if (this.phone == '') {
          let toast = this.$createToast({
            txt: '电话号码不能为空',
            type: 'error'
          })
          toast.show()
          return false;
        } else if (!reg.test(this.phone)) {
          let toast = this.$createToast({
            txt: '手机号码格式错误',
            type: 'error'
          })
          toast.show()
          return false;
        } else if (this.eMail == '') {
          let toast = this.$createToast({
            txt: '邮箱不能为空',
            type: 'error'
          })
          toast.show()
          return false;
        } else if (!regEmail.test(this.eMail)) {
          let toast = this.$createToast({
            txt: '邮箱格式错误',
            type: 'error'
          })
          toast.show()
          return false;
        } else {
          // alert(1)

          let self = this;
          self.axios.post(Api.userApi + '/ca/settlementCommunityActivityOrder', self.qs.stringify({
            cAId: JSON.parse(sessionStorage.getItem('id')),
            userId: JSON.parse(sessionStorage.getItem('user')).userId,
            ticketId: self.$store.state.activityInfo.ticketId,
            ticketNum: self.$store.state.activityInfo.ticketNum,
            name: self.userName,
            nickname: self.nickName,
            phone: self.phone,
            mailbox: self.eMail
          }), {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          }).then((res) => {
            if (res.data.code == 1) {
              if (self.$store.state.activityInfo.ticketType == 0) {
                self.FreeJoin(res.data.data.cAOrderId);
              } else {
                let toast = self.$createToast({
                  txt: '提交成功',
                  type: 'correct'
                })
                toast.show()
                setTimeout(() => {
                  self.$store.commit('setCAorderId', res.data.data.cAOrderId)
                  self.$router.push({
                    name: 'activityOrder'
                  })

                }, 1000)
              }

            } else {
              let toast = self.$createToast({
                txt: res.data.msg,
                type: 'error'
              })
              toast.show()
            }
          })
        }
      },
      // 压缩图片
      uploadIMG(e) {
        // this.picavalue = e.file;
        let self = this;
        if (e.file.size / 1024 > 10000) {
      	this.$message({
      	  message: "图片大小不能超过10M",
      	  type: "warning"
      	});
        } else {
          imgPreview(e.file,function(imgFile){
            // console.log(imgFile)
            self.fileUrl.push(imgFile)
            console.log(self.fileUrl)
          });
        }
      },
    }
  }
</script>

<style lang="scss">
  // @import '../../style/common.scss';
  // @import '../../style/mixin.scss';

  .activityEnter {
    height: 100%;
    box-sizing: border-box;
    padding-top: 88px;
    padding-bottom: 96px;
    background: #fff;

    .top_nav {
      padding: 0 20px;
      height: 88px;
      box-sizing: border-box;
      position: fixed;
      border-bottom: 1px solid #FF523D;
      background: #fff;
      left: 0;
      top: 0;
      z-index: 100;

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

      }

    }

    .joinList {
      ul {
        overflow: hidden;
        padding: 0 60px;

        li {
          margin-top: 40px;

          .title {
            font-size: 28px;
            color: #000;
            padding-left: 20px;

            span {
              color: #FF523D;
            }
          }

          input {
            width: 100%;
            padding: 18px;
            box-sizing: border-box;
            border: 1px solid #e8e8e8;
            /*no*/
            border-radius: 45px;
            margin-top: 20px;
            font-size: 26px;
          }
        }
      }
    }

    .couponBtn {
      height: 96px;
      position: fixed;
      left: 0;
      bottom: 0;
      background: #FF523D;
      color: #fff;
      font-size: 30px;
    }

    .upTitle {
      font-size: 26px;
      color: #000;
      padding: 40px 60px 0 80px;
    }

    .upActiveImg {
      padding: 50px 60px 0 60px;
      box-sizing: border-box;
      flex-wrap: wrap;
      .el-upload-list{
        display: none;
      }
      .upload-text{
        height: 140px;
        width: 140px;
        box-sizing: border-box;
        border: 1px dashed #999;
        .el-icon-plus{
          font-size: 60px;
          color: #999;
        }
      }

      .img-box {
        width: 140px;
        height: 140px;
        margin-right: 30px;
        margin-bottom: 20px;
        box-sizing: border-box;
        background-color: #fff;
        box-shadow: 0 0 6px 2px rgba(0, 0, 0, .08);
        border-radius: 2px;
        position: relative;

        .cubeic-wrong {
          position: absolute;
          top: -10px;
          right: -10px;
          font-size: 36px;
          color: #000;
        }

        img {
          width: 100%;
          height: 100%;

        }
      }

    }
  }
</style>
<template>
</template>

<script>
</script>

<style>
</style>
