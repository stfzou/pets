<template>
  <div class="activityEnter">
    <div class="top_nav flex_r_s_b">
      <div class="back" @click="back"></div>
      <div class="nav_title">报名表单</div>
    </div>
    <div class="joinList">
      <ul>
        <li>
          <div class="title">姓名<span>*</span></div>
          <input type="text" @blur.prevent="inputLoseFocus" v-model="userName" maxlength="10" placeholder="请输入您的姓名" />
        </li>
        <li>
          <div class="title">宠物名称</div>
          <input type="text" @blur.prevent="inputLoseFocus" maxlength="10" v-model="nickName" placeholder="请输入宠物昵称或活动备注信息" />
        </li>
        <div class="nameTip">这里填写宠物名称或者活动主办方要求填写的其他文字信息</div>
        <li class="mt-20">
          <div class="title">电话<span>*</span></div>
          <input type="number" @blur.prevent="inputLoseFocus" v-model="phone" placeholder="请输入您的电话" />
        </li>
        <li>
          <div class="title">邮箱</div>
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
      <div class="picTip">上传活动主办方要求的图片资料或照片,可上传3张照片,支持jpg、bmp、png格式。</div>
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
        userId:'',
        fileUrl:[],
        imgArr:[],
        initialIndex:0,
        action: {
          target: '//jsonplaceholder.typicode.com/photos/'
        }
      }
    },
    mounted() {
      this.userId = JSON.parse(localStorage.getItem('user')).userId;
      this.queryOrderPayState();
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
      goLogin(msg) {
      	let self = this;
      	let url = window.location.href;
      	this.$store.commit('setLoginUrl', url);
      	this.$createDialog({
      		type: 'confirm',
      		icon: 'cubeic-warn',
      		title:msg,
      		confirmBtn: {
      			text: '去登录',
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
      			self.$router.push({
      				name: 'login'
      			})

      		},

      	}).show()

      },
      FreeJoin(cAOrderId) {

        let self = this;
        this.axios.post(Api.userApi + '/ca/freeJoinCommunityActivity', this.qs.stringify({
          cAOrderId: cAOrderId,
          cAId: JSON.parse(localStorage.getItem('id')),
          userId: JSON.parse(localStorage.getItem('user')).userId,
          payFrom:0
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
            //alert()

            setTimeout(()=>{
              self.$router.push({
                name:'activity',
                query:{
                  id:JSON.parse(localStorage.getItem('id'))

                }
              })
            },500)

          } else {
            alert(res.data.msg)
          }
        })

      },
      queryOrderPayState(){
         let self = this;
        this.axios.get(Api.userApi + '/ca/selectUserIsNoPayCommunityActivityOrder?userId='+self.userId, {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          }).then(function(response) {
            if(response.data.code==1){
              if(response.data.data==1){
                self.axios.get(Api.userApi + '/ca/selectUserNoPaySettlementCommunityActivityOrder?userId='+self.userId, {
                    headers: {
                      'Content-Type': 'application/x-www-form-urlencoded'
                    }
                  }).then(function(noPayres) {
                    if(noPayres.data.code==1){
                      self.$createDialog({
                      	type: 'confirm',
                      	icon: 'cubeic-alert',
                      	title: '您有未支付订单',
                      	content: '继续支付或者取消订单',
                      	confirmBtn: {
                      		text: '继续支付',
                      		active: true,
                      		disabled: false,
                      		href: 'javascript:;'
                      	},
                      	cancelBtn: {
                      		text: '取消订单',
                      		active: false,
                      		disabled: false,
                      		href: 'javascript:;'
                      	},
                      	onConfirm: () => {
                      		setTimeout(() => {
                      		  self.$store.commit('setCAorderId', noPayres.data.data.cAOrderId)
                      		  self.$router.push({
                      		    name: 'activityOrder'
                      		  })
                      		},500)
                      	},
                      	onCancel: () => {
                            self.axios.post(Api.userApi + '/ca/cancelActivityOrderByUserId', self.qs.stringify({
                              userId: JSON.parse(localStorage.getItem('user')).userId
                            }), {
                              headers: {
                                'Content-Type': 'application/x-www-form-urlencoded'
                              }
                            }).then((res) => {
                              if (res.data.code == 1) {
                                let toast = self.$createToast({
                                  txt: '取消订单',
                                  type: 'cubeic-right'
                                })
                                toast.show();
                                self.$store.commit('setCAorderId',null)
                                setTimeout(()=>{
                                  self.$router.push({
                                    name:'activity',
                                    query:{
                                      id:JSON.parse(localStorage.getItem('id'))
                                    }
                                  })
                                },200)

                              }else {
                                alert(res.data.msg)
                              }
                            })
                      	}
                      }).show()


                    }
                  }).catch(function(error) {
                    console.log(error);
                });

              }
            }
          }).catch(function(error) {
            console.log(error);
        });
      },
      joinActivity() {
        let self = this;
        let reg = /^1[3456789]\d{9}$/;
        let regEmail = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
        if (self.userName == '') {
          let toast = this.$createToast({
            txt: '姓名不能为空',
            type: 'error'
          })
          toast.show()
          return false;
        } else if (self.phone == '') {
          let toast = self.$createToast({
            txt: '电话号码不能为空',
            type: 'error'
          })
          toast.show()
          return false;
        } else if (!reg.test(self.phone)) {
          let toast = self.$createToast({
            txt: '手机号码格式错误',
            type: 'error'
          })
          toast.show()
          return false;
        }else {
          // alert(1)
          let formData = new FormData();
          formData.append("cAId",JSON.parse(localStorage.getItem('id')))
          formData.append("userId",JSON.parse(localStorage.getItem('user')).userId)
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
        .nameTip{
          font-size:24px;
          color:#666;
          padding:10px 60px 10px 18px;
          line-height:34px;
        }

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
        .mt-20{
          margin-top:20px;
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
      .picTip{
        font-size:24px;
        color:#666;

        line-height:34px;

      }

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
        border:1px solid #999;/*no*/
        .cube-upload-input {
          width: 100%;
          height: 100%
        }

        .cube-upload-btn-def {
          width: 140px;
          height: 140px;
          background:none;
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
