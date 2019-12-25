<template>
	<div class="addMoneyDeclare">

		<div class="login_nav">
			<div class="back" @click="back"></div>
			<div class="title">添加费用申报</div>
		</div>
		<div class="addCustomer_list">
      <div class="searchGmNum flex_r_f_s">
        <span>骨米号查询:</span>
        <input v-model="gmSearchNum"  type="number" name="" id="">
        <div class="searchBtn flex_r_s_c" @click="search">查询</div>
      </div>
			<ul>
				<li class="flex_r_f_s">
					<div class="list_l"><b>*</b>骨米号:</div>
					<div class="list_r">
						<input type="number" style="background:#E9E9E9;" readonly="readonly" v-model="gmNum" />
					</div>
				</li>
        <li class="flex_r_f_s">
        	<div class="list_l"><b>*</b>用户昵称:</div>
        	<div class="list_r">
        		<input type="text" style="background:#E9E9E9;" readonly="readonly"  v-model="userName" />
        	</div>
        </li>
        <li class="flex_r_f_s">
        	<div class="list_l"><b>*</b>店铺名称:</div>
        	<div class="list_r">
        		<input type="text" style="background:#E9E9E9;" readonly="readonly" v-model="shopName" />
        	</div>
        </li>
        <li class="flex_r_f_s">
        	<div class="list_l"><b>*</b>类型:</div>
        	<div class="list_r staffStatus">
        		<input type="text" style="background:#E9E9E9;" readonly="readonly" v-model="typeName" />
        	</div>
        </li>
        <li class="flex_r_f_s">
        	<div class="list_l"><b>*</b>性质:</div>
        	<div class="list_r staffStatus">
        		<input type="text" style="background:#E9E9E9;" readonly="readonly" v-model="natureName" />
        	</div>
        </li>

        <li class="flex_r_f_s">
        	<div class="list_l"><b>*</b>电话:</div>
        	<div class="list_r">
        		<input type="number" style="background:#E9E9E9;" readonly="readonly" v-model.number="phone" />
        	</div>
        </li>
        <li class="flex_r_f_s">
        	<div class="list_l"><b>*</b>负责人:</div>
        	<div class="list_r">
        		<input type="text" style="background:#E9E9E9;" readonly="readonly" v-model="fzr" />
        	</div>
        </li>
				<li class="flex_r_f_s">
					<div class="list_l"><b>*</b>地址:</div>
					<div class="list_r">
						<input type="text" style="background:#E9E9E9;" readonly="readonly" v-model="addr" />
					</div>
				</li>
        <li class="flex_r_f_s">
        	<div class="list_l"><b>*</b>费用类型:</div>
        	<div class="list_r staffStatus">
        		<cube-select
        		  v-model="moneyVal"
        		  :options="moneyType">
        		</cube-select>
        	</div>
        </li>
        <li class="flex_r_f_s">
        	<div class="list_l"><b>*</b>请款说明:</div>
        	<div class="list_r">
        		<div class="remark">
        			<cube-textarea v-model="remark" placeholder="请输入请款说明" :maxlength="200"></cube-textarea>
        		</div>
        	</div>
        </li>
        <li class="flex_r_f_s">
        	<div class="list_l"><b>*</b>单证照片:</div>
        	<div class="list_r uploadDiv">
        		<div class="flex_r_f_s">
        			<div class="uploadBox">

        				<cube-upload v-if="imgOne==''" ref="uploadOne":action="action":simultaneous-uploads="1" :max="1" :process-file="processFile" />

        				<div class="img-box" v-if="imgOne!=''">
        					<img :src="imgOne.url" alt="" @click="showImagePreview('imgOne')">
        					<i class="cubeic-wrong" @click="fileRemove('imgOne')"></i>
        				</div>
        			</div>
        			<div class="uploadBox">

        				<cube-upload v-if="imgTwo==''" :max="1" ref="uploadTwo":action="action":simultaneous-uploads="1" :process-file="processFile2"/>

        				<div class="img-box" v-if="imgTwo!=''">
        					<img :src="imgTwo.url" alt="" @click="showImagePreview('imgTwo')">
        					<i class="cubeic-wrong" @click="fileRemove('imgTwo')"></i>
        				</div>
        			</div>
              <div class="uploadBox">

              	<cube-upload v-if="imgTherr==''" :max="1" ref="uploadTherr":action="action":simultaneous-uploads="1" :process-file="processFile3"/>

              	<div class="img-box" v-if="imgTherr!=''">
              		<img :src="imgTherr.url" alt="" @click="showImagePreview('imgTherr')">
              		<i class="cubeic-wrong" @click="fileRemove('imgTherr')"></i>
              	</div>
              </div>

        		</div>

        	</div>
        </li>
        <li class="flex_r_f_s">
        	<div class="list_l"><b>*</b>请款金额:</div>
        	<div class="list_r">
        		<input type="number" v-model.number="money" />
        	</div>
        </li>
        <li class="flex_r_f_s">
        	<div class="list_l"><b>*</b>支付方式:</div>
        	<div class="list_r staffStatus">
        		<cube-select
        		  v-model="payVal"
        		  :options="payStay">
        		</cube-select>
        	</div>
        </li>
			</ul>
			<div class="confirmBtn flex_r_s_c" @click="addCustomer">确定</div>
		</div>


	</div>
</template>

<script>
	import Api from '../common/apj.js'
	import compress from '../../data/image'

	export default {
		data(){
			let self = this;
			return{
        gmNum:'',
        gmSearchNum:'',
        userName:'',
        shopName:'',
        typeName:'',
        natureName:'',
        phone:'',
        fzr:'',
        addr:'',
        moneyType:[{value:'1',text:'广告费'},{value:'2',text:'佣金'},{value:'3',text:'服务费'},{value:'4',text:'稿费'}],
        remark:'',
        money:'',
        moneyVal:'',
        payStay:[{value:'1',text:'现金'},{value:'2',text:'骨币'},{value:'3',text:'骨豆'}],
        payVal:'',
				action: {
				  target: '//jsonplaceholder.typicode.com/photos/'
				},
        money:'',
				imgOne:'',
				imgTwo:'',
        imgTherr:'',
        userId:'',
        id:'',
				reg: /^1[3456789]\d{9}$/,
        typeData:[],
        natureData:[],

			}
		},
		mounted() {
        this.getCooperationTypeAll();
        this.getDeclareAll();
        // console.log(this.networkId)
        // console.log(JSON.parse(localStorage.getItem('userInfo')))
		},
		methods:{
			back(){
				this.$router.go(-1); //返回上一层
			},
			showImagePreview(img) {
			  this.$createImagePreview({
				imgs: [this[img]]
			  }).show()
			},
      getCooperationTypeAll(){//查询类型
        let self = this;
        self.axios.post(Api.userApi + '/cooperation/selectCooperationTypeAll',{
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then((res) => {
          if (res.data.code == 1) {
            res.data.data.forEach((e)=>{
              self.typeData.push({
                text:e.name,
                value:e.id
              })
            })

          } else {
            alert(res.data.msg)
          }
        })
      },
      getDeclareAll(){//查询商户性质
        let self = this;
        self.axios.post(Api.userApi + '/cooperation/selectCooperationNatureAll',{
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then((res) => {
          if (res.data.code == 1) {
            res.data.data.forEach((e)=>{
              self.natureData.push({
                text:e.name,
                value:e.id
              })
            })

          } else {
            alert(res.data.msg)
          }
        })
      },
      search(){
        this.getUserNo();
        this.getShopInfo();
      },
      getUserNo(){//根据骨米号查询信息
        let self = this;
        self.axios.post(Api.userApi + '/cooperation/selectUserInfoByUserNo',this.qs.stringify({
          userNo:self.gmSearchNum
        }), {
          headers: {
          	'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then((res) => {
          if (res.data.code == 1) {
            self.userId = res.data.data.userId;
            self.gmNum = res.data.data.userNo;
            self.userName = res.data.data.userName;

          } else {
            alert(res.data.msg)
          }
        })
      },
      getShopInfo(){
        let self = this;
        self.axios.post(Api.userApi + '/cooperation/selectCooperationShopsByUserNo',this.qs.stringify({
          userNo:self.gmSearchNum
        }), {
          headers: {
          	'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then((res) => {
          if (res.data.code == 1) {
            self.id = res.data.data.id;
            self.staffId = res.data.data.employeeId;
            self.shopName = res.data.data.shopName;
            self.phone = res.data.data.phone;
            self.fzr = res.data.data.principal;
            self.typeData.forEach((e)=>{
              if(e.value==res.data.data.typeId){
                self.typeName = e.text;
              }
            });
            self.natureData.forEach((e)=>{

              if(e.value==res.data.data.natureId){
                self.natureName = e.text;
              }

            })
            self.addr = res.data.data.province+res.data.data.city+res.data.data.area+res.data.data.address;
          } else {
            alert(res.data.msg)
          }
        })
      },
			addCustomer(){
				let self = this;
				if(this.gmNum == ''){

				  this.errTip('请先查询用户信息')

				}else if(this.remark==''){

          this.errTip('请填写请款说明')

        }else if(this.imgOne == ''||this.imgTwo==''||this.imgTherr==''){

					this.errTip('请上传单证照片')

				}else{
				  let formData = new FormData();
				  formData.append('imgA',self.imgOne.imgData,self.imgOne.name)
				  formData.append('imgB',self.imgTwo.imgData,self.imgTwo.name)
				  formData.append('imgC',self.imgTherr.imgData,self.imgTherr.name)
				  formData.append('cSId',self.id)
				  formData.append('employeeId',self.staffId)
				  formData.append('declareType',self.moneyVal)
				  formData.append('declareDesc',self.remark);
          formData.append('declarePrice',self.money);
          formData.append('payType',self.payVal);

				  self.axios.post(Api.userApi + '/cooperation/addCooperationDeclare',formData, {
				    headers: {
				      'Content-Type': 'multipart/form-data'
				    }
				  }).then((res) => {
				    if (res.data.code == 1) {
				      let toast = self.$createToast({
				        txt: '添加成功',
				        type: 'correct'
				      })
				      toast.show()
				      setTimeout(() => {
				        self.$router.push({
				          name: 'moneyDeclareManage'
				        })

				      },500)

				    } else {
				      alert(res.data.msg)
				    }
				  })

        }


			},
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
      errTip(msg){
        let toast = this.$createToast({
        	txt: msg,
        	type: 'error'
          })
        toast.show()
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

			      self.imgOne = {name:file.name,imgData:blob,url:file.base64};


			  })
			},
			processFile2(file,next) {

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
			     self.imgTwo = {name:file.name,imgData:blob,url:file.base64};

			  })
			},
      processFile3(file,next) {

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
           self.imgTherr = {name:file.name,imgData:blob,url:file.base64};

        })
      },
			fileRemove(img){
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
						// let self = this;
						this[img] = '';
					},
					onCancel: () => {

					}
				}).show()
			}

		}
	}
</script>

<style lang="scss">
	.addMoneyDeclare{
    background: #fff;
		.amap-logo{
			opacity:0;
		}
		.amap-copyright{
			opacity:0;
		}
		.cube-upload-file{
			display: none;
		}
		.login_nav{
			height: 42px;
			padding: 22px 0;
			position: relative;
			border-bottom: 1px solid #e8e8e8;
			.back{
				background: url("../../assets/icon/backColory.png") no-repeat center 0;
				background-size: cover;
				width: 24px;
				height: 40px;
				position: absolute;
				left: 20px;
				top: 50%;
				margin-top: -21px;
			}
			.title{
				font-size: 30px;
				color: #333;
				line-height: 42px;
				text-align: center;
			}
		}
		.addCustomer_list{
			padding: 20px;
      .cube-textarea-wrapper {

        height: 180px;
      }
      .searchGmNum{
        span{
          font-size: 26px;
          width: 150px;
          color: #333;
        }
        input{
          width:260px;
          height:50px;
          border:1px solid #e8e8e8;
          border-radius:30px;
          margin-left: 20px;
          padding:0 20px;
        }
        .searchBtn{
          width:100px;
          height:40px;
          background:#ff523d;
          color:#fff;
          border-radius:30px;
          margin-left: 30px;
        }
      }
			li{
				padding: 20px 0;
			}
			.list_l{
				font-size: 26px;
				width: 150px;
				color: #333;
				b{
					color: #ff523d;
				}
			}
			.uploadDiv{
				width: 80%;
			}
			.list_r{
				margin-left: 20px;
				flex-wrap:wrap;
        width:500px;
				&>input{
					border: 1px solid #e8e8e8;
					height: 50px;
					width: 390px;
					padding:0 10px;
					font-size: 26px;
				}
				.remark{
					width: 430px;
					.cube-textarea-wrapper{
						font-size: 24px;
					}
				}
				.img-box{
					width: 140px;
					height: 140px;
					// margin: 0 10px 10px 0;
					box-sizing: border-box;
					background-color: #fff;
					box-shadow: 0 0 6px 2px rgba(0,0,0,.08);
					border-radius: 2px;
					position: relative;
					.cubeic-wrong{
						position: absolute;
						top: -10px;
						right: -10px;
						font-size: 36px;
						color: #000;
					}
					img{
						width: 100%;
						height: 100%;

					}
				}
				.region {
					div {
						height:50px;
            width:150px;
						/*no*/
						margin-right: 20px;
						border: 1px solid #e8e8e8;
						/*no*/
						text-align: center;
						border-radius: 2px;
						/*no*/


						span {
							font-size: 26px;
							color: #333;
              overflow:hide;
              width:100px;
              height:50px;
              line-height:50px;
              display:block;
              overflow: hidden;        /*内容会被修剪，并且其余内容是不可见的*/
              text-overflow:ellipsis;  /*显示省略符号来代表被修剪的文本。*/
              white-space: nowrap;     /*文本不换行*/

						}

						img {
							width: 30px;
						}
					}

				}
				.customerType {

					.cube-select {
						padding-top: 2px;
						padding-bottom: 2px;
						font-size: 26px;
						margin-right: 20px;
					}
				}
				.uploadBox{
					margin-right: 15px;
					.cube-upload-input{
						width: 100%;
						height: 100%
					}
					.cube-upload-btn-def{
						width: 140px;
						height: 140px;
            border: 1px solid #999;/*no*/

					}
          .cube-upload-def{
            margin:0;
          }
					.cube-upload-def .cube-upload-btn, .cube-upload-def .cube-upload-file{
						margin:0 ;
					}
					.cube-upload{
						width: 140px;
						height: 140px;
            // border: 1px solid red;
						// overflow: auto;
					}
					p{
						text-align: center;
						padding-top: 10px;
						div{
							text-align: center;
							font-size: 28px;
							color: 999;

						}
					}
				}
				.customer_map{
					height: 350px;
					padding-top: 20px;
				}

			}
			.staffStatus{
        .cube-select{
         height: 50px;
         padding:10px 20px 10px 10px;
         width:410px;

        }
      }
      .confirmBtn{
				color: #fff;
				font-size: 30px;
				width: 500px;
				height: 60px;
				background: #ff523d;
				border-radius: 50px;
				margin: 50px auto;

			}
		}
	}
</style>
