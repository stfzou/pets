<template>
	<div class="addStaff">

		<div class="login_nav">
			<div class="back" @click="back"></div>
			<div class="title">添加员工</div>
		</div>
		<div class="addCustomer_list">
			<ul>
				<li class="flex_r_f_s">
					<div class="list_l"><b>*</b>员工名称:</div>
					<div class="list_r">
						<input type="text" v-model="name" />
					</div>
				</li>
        <li class="flex_r_f_s">
        	<div class="list_l"><b>*</b>手机号码:</div>
        	<div class="list_r">
        		<input type="text" v-model="phone" />
        	</div>
        </li>
				<li class="flex_r_f_s">
					<div class="list_l"><b>*</b>业务区域:</div>
					<div class="list_r">
						<div class="region flex_r_f_s">
							<div class="sheng flex_r_s_b" @click="showAddressPicker" v-for="item in cityData">
								<span>{{item}}</span>
								<i class="cube-select-icon"></i>
							</div>
						</div>
					</div>
				</li>
				<li class="flex_r_f_s">
					<div class="list_l"><b>*</b>业务地址:</div>
					<div class="list_r">
						<input type="text" v-model="address" />
					</div>
				</li>
				<li class="flex_r_f_s">
					<div class="list_l"><b>*</b>证件照片:</div>
					<div class="list_r uploadDiv">
						<div class="flex_r_f_s">
							<div class="uploadBox">

								<cube-upload v-if="imgOne==''" ref="uploadOne":action="action":simultaneous-uploads="1" :max="1" :process-file="processFile" />

								<div class="img-box" v-if="imgOne!=''">
									<img :src="imgOne.url" alt="" @click="showImagePreview('imgOne')">
									<i class="cubeic-wrong" @click="fileRemove('imgOne')"></i>
								</div>
								<p>

									<span>省份证正面</span>

								</p>
							</div>
							<div class="uploadBox">

								<cube-upload v-if="imgTwo==''" :max="1" ref="uploadTwo":action="action":simultaneous-uploads="1" :process-file="processFile2"/>

								<div class="img-box" v-if="imgTwo!=''">
									<img :src="imgTwo.url" alt="" @click="showImagePreview('imgTwo')">
									<i class="cubeic-wrong" @click="fileRemove('imgTwo')"></i>
								</div>
								<p>

									<span>身份证反面</span>
								</p>
							</div>

						</div>

					</div>
				</li>
				<li class="flex_r_f_s">
					<div class="list_l"><b>*</b>员工部门:</div>
					<div class="list_r staffStatus">
						<cube-select
						  v-model="departmentVal"
						  :options="departmentOptions"
              :disabled="isDepartment">
						</cube-select>
					</div>
				</li>
        <li class="flex_r_f_s">
        	<div class="list_l"><b>*</b>岗位名称:</div>
        	<div class="list_r staffStatus">
        		<cube-select
        		  v-model="postVal"
        		  :options="postOptions">
        		</cube-select>
        	</div>
        </li>
        <li class="flex_r_f_s">
        	<div class="list_l"><b>*</b>初始密码:</div>
        	<div class="list_r">
        		<input type="password" v-model="password" />
        	</div>
        </li>
        <li class="flex_r_f_s">
        	<div class="list_l"><b>*</b>员工状态:</div>
        	<div class="list_r staffStatus">
        		<cube-select
        		  v-model="staffVal"
        		  :options="staffOptions">
        		</cube-select>
        	</div>
        </li>
        <li class="flex_r_f_s">
					<div class="list_l"><b style="color:#fff">*</b>备注信息:</div>
					<div class="list_r">
						<div class="remark">
							<cube-textarea v-model="remark" :maxlength="200"></cube-textarea>
						</div>
					</div>
				</li>
			</ul>
			<div class="confirmBtn flex_r_s_c" @click="addCustomer">确定</div>
		</div>


	</div>
</template>

<script>
	import Api from '../common/apj.js'
	import {provinceList,cityList,areaList} from '../../data/area'
	import compress from '../../data/image'
	const addressData = provinceList
	addressData.forEach(province => {
		province.children = cityList[province.value]
		province.children.forEach(city => {
			city.children = areaList[city.value]
		})
	})
	export default {
		data(){
			let self = this;
			return{
        staffOptions: [{value:'1',text:'启用'},{value:'2',text:'禁用'}],
        staffVal: '',
        departmentOptions:[{value:1,text:'办公室'},{value:2,text:'运营部'},{value:3,text:'客服部'},{value:4,text:'内勤部'}],
				departmentVal:'',
        postOptions:[{value:1,text:'经理'},{value:2,text:'主管'},{value:3,text:'区长'},{value:4,text:'组长'},{value:5,text:'职员'}],
        postVal:'',
        addUserId:'',//添加人Id
        networkId:'',//合作网点Id,
        name:'',
        phone:'',
        password:'',
        address:'',
        remark:'',
        networkId:'',
				cityData: ['省份', '城市', '地区'],
				//图片上传
				action: {
				  target: '//jsonplaceholder.typicode.com/photos/'
				},
        isDepartment:false,
				imgOne:'',
				imgTwo:'',
				reg: /^1[3456789]\d{9}$/,


			}
		},
		mounted() {

				this.addressPicker = this.$createCascadePicker({
					title: '城市选择',
					data: addressData,
					onSelect: this.selectHandle,
					onCancel: this.cancelHandle
				});
        let userInfo = JSON.parse(localStorage.getItem('userInfo'));
        this.addUserId = JSON.parse(localStorage.getItem('userInfo')).employeeId;
        this.networkId = JSON.parse(localStorage.getItem('userInfo')).network;
        if(userInfo.manager){
          this.isDepartment = false;
        }else{
          this.isDepartment = true;
          this.departmentVal = userInfo.department;
          let postArr = [];
          this.postOptions.forEach((e)=>{
            if(e.value>userInfo.post){
              postArr.push(e)
            }
          });
          this.postOptions = postArr;
        }
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

			addCustomer(){
				let self = this;
				if(this.name == ''){

          this.errTip('请填写员工名称')

				}else if (this.phone == '') {

          this.errTip('请填写手机号码')

				}else if (!this.reg.test(this.phone)) {

          this.errTip('手机号码格式不正确')

				}else if(this.cityData[0] == '省份' ||this.cityData[1] == '城市' || this.cityData[2] == '地区'){

          this.errTip('请选择省市区')

				}else if (this.address == '') {

          this.errTip('请填写业务地址')

				}else if(this.imgOne == ''||this.imgTwo==''){

					this.errTip('上传证件照片')

				}else if(this.departmentVal == ''){

					this.errTip('请选择员工部门')

				} else if(this.postVal == ''){

          this.errTip('请选择岗位名称')

				}else if(this.password == ''){

          this.errTip('请填写密码')

        }else if(this.staffVal == ''){
          this.errTip('请选择员工状态')
				}else{
          let formData = new FormData();
          formData.append('idCardFront',self.imgOne.imgData,self.imgOne.name)
          formData.append('idCardBack',self.imgTwo.imgData,self.imgTwo.name)
          formData.append('userId',self.addUserId);
          formData.append('networkId',self.networkId);
          formData.append('name',self.name);
          formData.append('phone',self.phone);
          formData.append('password',self.password);
          formData.append('province',self.cityData[0])
          formData.append('city',self.cityData[1])
          formData.append('area',self.cityData[2])
          formData.append('address',self.address);
          formData.append('department',self.departmentVal);
          formData.append('post',self.postVal);
          formData.append('remark',self.remark);
          formData.append('status',self.staffVal);

          self.axios.post(Api.userApi + '/employee/system/addEmployee',formData, {
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
                  name: 'staffManage'
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
			showAddressPicker() {
				this.addressPicker.show()
			},
			selectHandle(selectedVal, selectedIndex, selectedText) {
				this.cityData = selectedText
			},
			cancelHandle() {

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
	.addStaff{
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
