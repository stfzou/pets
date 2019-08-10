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
          <input type="number" @blur.prevent="inputLoseFocus" v-model="phone" placeholder="请输入您的电话" />
        </li>
        <li>
          <div class="title">邮箱<span>*</span></div>
          <input type="text" @blur.prevent="inputLoseFocus" v-model="eMail" placeholder="请输入您的邮箱" />
        </li>
      </ul>
    </div>
    <div class="upTitle">上传图片</div>
    <div class="upActiveImg flex_r_f_s">

      <div class="img-box" v-for="(item,index) in imgArr">
        <img :src="item" alt="" @click="handleImgsClick(index)">
        <i class="cubeic-wrong" @click="removeImg(index)"></i>
      </div>


      <div class="uploadBox">
        <!--  -->
        <cube-upload v-if="fileUrl.length<3"  @file-submitted="fileSubmitted" @file-success="addedHandler" :process-file="processFile"  :max="100" ref="upload" :action="action"  />

      </div>

    </div>
    <div class="couponBtn flex_r_s_c" @click="joinActivity">确定报名</div>
  </div>
</template>

<script>
  import Api from '../common/apj.js'
  import compress from '../../data/image'
  export default {
    data() {
      return {
        userName: '',
        nickName: '',
        phone: '',
        eMail: '',
        fileUrl:[],
        imgArr:[],
        initialIndex:0,
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
          let formData = new FormData();
          formData.append("cAId",JSON.parse(sessionStorage.getItem('id')))
          formData.append("userId",JSON.parse(sessionStorage.getItem('user')).userId)
          formData.append("ticketId",self.$store.state.activityInfo.ticketId)
          formData.append("ticketNum",self.$store.state.activityInfo.ticketNum)
          formData.append("name",self.userName)
          formData.append("nickname",self.nickName)
          formData.append("phone",self.phone)
          formData.append("mailbox",self.eMail)
          if(self.fileUrl.length>0){

          	self.fileUrl.forEach((e)=>{
          		formData.append('descriptionImgs',e.imgData,e.name)
          	})
          }
          self.axios.post(Api.userApi + '/ca/settlementCommunityActivityOrder',formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
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
                  // self.$router.push({
                  //   name: 'activityOrder'
                  // })

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
      addedHandler(file) {},
      errHandler(file) {
        // const msg = file.response.message
        this.$createToast({
          type: 'warn',
          txt: 'Upload fail',
          time: 1000
        }).show()
      },
      handleImgsClick(index) {
        this.initialIndex = index
        const params = {
          $props: {
            imgs: this.imgArr,
            initialIndex: 'initialIndex', // 响应式数据的key名
            loop: false
          },
          $events: {
            change: (i) => {
              // 必须更新 initialIndex
              this.initialIndex = i
            }
          }
        }
        this.$createImagePreview({ ...params }).show()
      },
      fileSubmitted(file) {
        // this.fileArr.base64Value = file.file.base64
        console.log(file)
      },
      processFile(file,next) {

        let self = this;
        compress(file, {
          compress: {
            width: 800,
            height: 800,
            quality: 0.5
          }
        },function(){
            console.log(file)
            // self.url = file.base64
            let blob = self.dataURItoBlob(file.base64)

            self.fileUrl.push({name:file.name,imgData:blob,url:file.base64})
            self.imgArr.push(file.base64)
            //self.fileUrl.push(1)

            console.log(self.fileUrl)
        })
      },
      removeImg(index){
        let self = this;
        this.$createDialog({
        	type: 'confirm',
        	icon: 'cubeic-alert',
        	title: '删除',
        	content: '是否确定删除该图片？',
        	confirmBtn: {
        		text: '确定',
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
        		self.fileUrl.splice(index,1);
            self.imgArr.splice(index,1);
        	},
        	onCancel: () => {

        	}
        }).show()
      },
      // base64转成bolb对象
      dataURItoBlob(base64Data) {
      	var byteString;
      	if (base64Data.split(",")[0].indexOf("base64") >= 0)
      		byteString = atob(base64Data.split(",")[1]);
      	else byteString = unescape(base64Data.split(",")[1]);
      	var mimeString = base64Data
      		.split(",")[0]
      		.split(":")[1]
      		.split(";")[0];
      	var ia = new Uint8Array(byteString.length);
      	for (var i = 0; i < byteString.length; i++) {
      		ia[i] = byteString.charCodeAt(i);
      	}
      	return new Blob([ia], {
      		type: mimeString
      	});
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

      .cube-upload-file-def {
        display: none;
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
          object-fit: cover;
        }
      }

      .uploadBox {
        margin-bottom: 20px;

        .cube-upload-input {
          width: 100%;
          height: 100%
        }

        .cube-upload-btn-def {
          width: 140px;
          height: 140px;

        }

        .cube-upload-def .cube-upload-btn,
        .cube-upload-def .cube-upload-file {
          margin: 0;
        }

        .cube-upload {
          width: 140px;
          height: 140px;
          // overflow: auto;
        }

        p {
          text-align: center;
          padding-top: 10px;

          div {
            text-align: center;
            font-size: 28px;
            color: 999;

          }
        }
      }
    }
  }
</style>
