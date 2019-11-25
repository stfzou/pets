<template>
	<div class="addMarketingPlan">

		<div class="login_nav">
			<div class="back" @click="back"></div>
			<div class="title">添加营销计划</div>
		</div>
		<div class="addCustomer_list">
			<ul>
				<li class="flex_r_f_s">
					<div class="list_l"><b>*</b>计划名称:</div>
					<div class="list_r">
						<input type="text" v-model="storeName" />
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
					<div class="list_l"><b>*</b>活动地址:</div>
					<div class="list_r">
						<input type="text" v-model="addr" />
					</div>
				</li>
        <li class="flex_r_f_s">
        	<div class="list_l"><b>*</b>活动位置:</div>
        	<div class="list_r">
        		<input type="text" v-model="addr" />
        	</div>
        </li>
        <li class="flex_r_f_s">
        	<div class="list_l"><b>*</b>执行人:</div>
        	<div class="list_r staffStatus">
        		<cube-select
        		  v-model="value"
        		  :options="options">
        		</cube-select>
        	</div>
        </li>
        <li class="flex_r_f_s">
        	<div class="list_l"><b>*</b>配合人:</div>
        	<div class="list_r staffStatus">
        		<cube-select
        		  v-model="value"
        		  :options="options">
        		</cube-select>
        	</div>
        </li>
       <li class="flex_r_f_s">
       	<div class="list_l"><b>*</b>计划时间:</div>
       	<div class="list_r">
       		<input type="text" v-model="addr" />
       	</div>
       </li>
       <li class="flex_r_f_s">
       	<div class="list_l"><b>*</b>审核人:</div>
       	<div class="list_r staffStatus">
       		<cube-select
       		  v-model="value"
       		  :options="options">
       		</cube-select>
       	</div>
       </li>
        <li class="flex_r_f_s">
					<div class="list_l"><b>*</b>计划说明:</div>
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
				isCommit:false,
        options: ['启用','禁用'],
        value: '启用',
				remark:'',
				lng:'',
				lat:'',
				cityData: ['省份', '城市', '地区'],
				storeName:'',
				addr:'',
				phone:'',
				//图片上传
				action: {
					target:Api.staffApi+'/business/updateImg',
					prop: 'base64Value',
					max:1

				},
				center:[0,0],
				imgOne:'',
				imgTwo:'',
				imgThree:'',
				loadOne:false,
				loadTwo:false,
				loadThree:false,
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



				let upLoad = document.querySelectorAll(".uploadBox input");
				upLoad.forEach((e)=>{
					e.setAttribute("capture","camera");
				})



		},
		methods:{
			back(){
				this.$router.push({
					name:'workOsInfoList'
				});
			},
			showImagePreview(img) {
			  this.$createImagePreview({
				imgs: [this[img]]
			  }).show()
			},

			addCustomer(){
				let self = this;
				if(this.center[0] == 0){

					return false;
				}else if(this.storeName == ''){

					return false;
				}else if(this.cityData[0] == '省份'){

					return false;
				}else if(this.addr == ''){

					return false;
				}else if (this.phone == '') {


					return false;
				}else if (!this.reg.test(this.phone)) {


					return false;
				}else if (this.environmenVal == '') {



					return false;
				}else if(this.typeVal == ''){


					return false;
				}else if(self.projectTypeVal.length<1){

					return false;
				}
				else if(this.imgOne == ''||this.imgTwo==''||this.imgThree==''){

					return false;
				}else{


					this.axios.post(Api.staffApi + '/ca/addBClient', this.qs.stringify({
						businessId:JSON.parse(localStorage.getItem('staff')).staffId,
						shopName:self.storeName,
						province:self.cityData[0],
						city:self.cityData[1],
						area:self.cityData[2],
						address:self.addr,
						latitude:self.center[1],
						longitude:self.center[0],
						phone:self.phone,
						conditionId:self.environmenVal,
						typeId:self.typeVal,
						storeImg:self.imgOne,
						displayOneImg:self.imgTwo,
						displayTwoImg:self.imgThree,
						remark:self.remark,
						productTypeId:self.projectTypeVal.join(',')
					}), {
						headers: {
							'Content-Type': 'application/x-www-form-urlencoded'
						}
					}).then((res)=>{
						if(res.data.code == 1){

							let toast = this.$createToast({
								txt: '添加成功',
								type: 'correct'
							})
							toast.show();
							setTimeout(()=>{
								self.$router.push({
									name:'workOsCustomer'
								})

							},500)
						}else{
							alert(res.data.msg);


						}
					})
				}

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
			processFile(file, next) {
			  compress(file, {
				compress: {
				  width: 1600,
				  height: 1600,
				  quality: 0.5
				}
			  }, next)
			},
			fileSubmitted(file) {
			  file.base64Value = file.file.base64
			},
			uploadSuccess(file,img,load){
				this[img] = file.response.data;
				this[load] = false;
			},
			fileError(file){
				console.log(file);
			},
			filesAdded(load){
				console.log(this[load])
				this[load] = true;

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
						this.axios.post(Api.staffApi + '/business/deleteImg', this.qs.stringify({
							imgAddr:self[img]
						}), {
							headers: {
								'Content-Type': 'application/x-www-form-urlencoded'
							}
						}).then((res)=>{
							if(res.data.code == 1){
								let toast = this.$createToast({
									txt: '删除成功',
									type: 'correct'
								 })
								toast.show();
								self[img] = '';
								setTimeout(()=>{
									let upLoad = document.querySelectorAll(".uploadBox input");
									upLoad.forEach((e)=>{
										e.setAttribute("capture","camera");
									});
								},200)

							}else{
								alert(res.data.msg);
							}
						})
					},
					onCancel: () => {

					}
				}).show()
			}

		}
	}
</script>

<style lang="scss">
	.addMarketingPlan{
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
				margin: 0 auto;
        margin-top:50px;
			}
		}
	}
</style>
