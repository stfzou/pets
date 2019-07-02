<template>
	<div class="addCustomer">
		<div class="login_nav">
			<div class="back" @click="back"></div>
			<div class="title">添加客户信息</div>
		</div>
		<div class="addCustomer_list">
			<ul>
				<li class="flex_r_f_s">
					<div class="list_l"><b>*</b>店铺名称:</div>
					<div class="list_r">
						<input type="text" v-model="storeName" />
					</div>
				</li>
				<li class="flex_r_f_s">
					<div class="list_l"><b>*</b>所在区域:</div>
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
					<div class="list_l"><b>*</b>经营地址:</div>
					<div class="list_r">
						<input type="text" v-model="addr" />
					</div>
				</li>
				
				<li class="flex_r_f_s">
					<div class="list_l"><b>*</b>联系电话:</div>
					<div class="list_r">
						<input type="text" v-model="phone" />
					</div>
				</li>
				<li class="flex_r_f_s">
					<div class="list_l"><b>*</b>店铺环境:</div>
					<div class="list_r">
						<div class="customerType">
							<cube-select v-model="environmenVal" :options="storeEnvironmen" placeholder="店铺环境"></cube-select>
						</div>
					</div>
				</li>
				<li class="flex_r_f_s">
					<div class="list_l"><b>*</b>客户类型:</div>
					<div class="list_r">
						<div class="customerType">
							<cube-select v-model="typeVal" :options="customerType" placeholder="客户类型"></cube-select>
						</div>
					</div>
				</li>
				<li class="flex_r_f_s">
					<div class="list_l"><b>*</b>产品类型:</div>
					<div class="list_r">
						<div class="projectType">
							<el-select v-model="projectTypeVal" multiple placeholder="请选择">
								<el-option
								  v-for="item in projectData"
								  :key="item.value"
								  :label="item.label"
								  :value="item.value">
								</el-option>
							 </el-select>
						</div>
					</div>
				</li>
				<li class="flex_r_f_s">
					<div class="list_l"><b>*</b>店铺照片:</div>
					<div class="list_r uploadDiv">
						<div class="flex_r_f_s">
							<div class="uploadBox">
							
								<cube-upload v-if="imgOne==''" ref="uploadOne":action="action":simultaneous-uploads="1" :max="1"
									:process-file="processFile"@file-submitted="fileSubmitted" @file-success="function(file){return uploadSuccess(file,'imgOne','loadOne')}" 
									@files-added="function(file){return filesAdded('loadOne')}" />
							
								<div class="img-box" v-if="imgOne!=''">
									<img :src="imgOne" alt="" @click="showImagePreview('imgOne')">
									<i class="cubeic-wrong" @click="fileRemove('imgOne')"></i>
								</div>
								<p>
									<cube-loading v-show="loadOne" class="flex_r_s_c" :size="28"></cube-loading>
									<span>门头照片</span>

								</p>
							</div>
							<div class="uploadBox">
								
								<cube-upload v-if="imgTwo==''" :max="1" ref="uploadTwo":action="action":simultaneous-uploads="1" :process-file="processFile"
								@file-submitted="fileSubmitted" @file-success="function(file){return uploadSuccess(file,'imgTwo','loadTwo')}"
								@files-added="function(file){return filesAdded('loadTwo')}"/>
								
								<div class="img-box" v-if="imgTwo!=''">
									<img :src="imgTwo" alt="" @click="showImagePreview('imgTwo')">
									<i class="cubeic-wrong" @click="fileRemove('imgTwo')"></i>
								</div>
								<p>
									<cube-loading v-show="loadTwo" class="flex_r_s_c" :size="28"></cube-loading>
									<span>陈列照片</span>
								</p>
							</div>
							<div class="uploadBox">
								
								<cube-upload v-if="imgThree==''" :max="1" ref="uploadThree":action="action":simultaneous-uploads="1" :process-file="processFile"
								@file-submitted="fileSubmitted" @file-success="function(file){return uploadSuccess(file,'imgThree','loadThree')}" @file-error="fileError"
								 @files-added="function(file){return filesAdded('loadThree')}"/>
								
								<div class="img-box" v-if="imgThree!=''">
									<img :src="imgThree" alt=""  @click="showImagePreview('imgThree')">
									<i class="cubeic-wrong" @click="fileRemove('imgThree')"></i>
								</div>
								<p>
									<cube-loading v-show="loadThree" class="flex_r_s_c" :size="28"></cube-loading>
									<span>陈列照片</span>
								</p>
							</div>
						</div>
						
					</div>
				</li>
				<li class="flex_r_f_s">
					<div class="list_l">客户备注:</div>
					<div class="list_r">
						<div class="remark">
							<cube-textarea v-model="remark" :maxlength="200" placeholder="请输入客户备注信息"></cube-textarea>
						</div>
					</div>
				</li>
				<li>
					<div class="list_l"><b>*</b>地理位置:</div>
					<div class="list_r">
						<div class="customer_map">
							<el-amap ref="map" vid="amapDemo" :center="center" :zoom="15" class="amap-demo" :plugin="plugin">
							
								<el-amap-marker v-if="isMark" :draggable="true" :events="markers" :icon="require('../../assets/icon/map@2x.png')" vid="component-marker"></el-amap-marker>
								
							</el-amap>
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
				remark:'',
				isMark:true,
				lng:'',
				lat:'',
				cityData: ['省份', '城市', '地区'],
				storeEnvironmen: [],
				customerType: [],
				storeName:'',
				addr:'',
				phone:'',
				environmenVal: '',
				typeVal: '',
				//图片上传
				action: {
					target:Api.staffApi+'/business/updateImg',
					prop: 'base64Value',
					max:1
					
				},
				center:[0,0],
				plugin: [{
					pName: 'Geolocation',
					enableHighAccuracy: true,//是否使用高精度定位，默认:true
					timeout: 10000,          //超过10秒后停止定位，默认：无穷大
					showMarker: false,        //定位成功后在定位到的位置显示点标记，默认：true
					showCircle: false,        //定位成功后用圆圈表示定位精度范围，默认：true
					panToLocation: true,     //定位成功后将定位到的位置作为地图中心点，默认：true
					zoomToAccuracy:false,//定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：f
					useNative:true,
					events: {
					  init(o) {
						// o 是高德地图定位插件实例
						o.getCurrentPosition((status, result) => {
						  if (result && result.position) {
							self.lng = result.position.lng;
							self.lat = result.position.lat;
							self.center = [self.lng, self.lat];
							
							// self.$nextTick();
						  }
						});
					  },
					  complete(res){
						
						 self.isMark = false;
						
						 setTimeout(()=>{
							  self.isMark = true;
							  self.lng = res.position.lng;
							  self.lat = res.position.lat;
							  self.center = [self.lng, self.lat];
						 },200)
					  }
					}
				 }],
				markers:{
					position:self.center,
					dragend: (e) => {
						// var geocoder = new AMap.Geocoder();
						let lng = e.lnglat.lng;
						let lat = e.lnglat.lat;
						self.center = [lng,lat];
						
					}
				},
				imgOne:'',
				imgTwo:'',
				imgThree:'',
				loadOne:false,
				loadTwo:false,
				loadThree:false,
				
				reg: /^1[3456789]\d{9}$/,
				projectData:[],
				projectTypeVal:''
				
			}
		},
		mounted() {
			if(JSON.parse(localStorage.getItem('staff'))== null){
				
				this.$router.push({
					name:'workOsLogin'
				})
				
			}else{
				this.addressPicker = this.$createCascadePicker({
					title: '城市选择',
					data: addressData,
					onSelect: this.selectHandle,
					onCancel: this.cancelHandle
				});
				this.getCondition();
				this.getType();
				this.getProjectType();
				let upLoad = document.querySelectorAll(".uploadBox input");
				upLoad.forEach((e)=>{
					e.setAttribute("capture","camera");
				})
			}
			
			
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
			getCondition(){
				let self = this;
				this.axios.post(Api.staffApi + '/business/selectBShopsConditionAll', this.qs.stringify({
					
				}), {
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					}
				}).then((res)=>{
					if(res.data.code == 1){
						// self.storeEnvironmen = res.data.data;
						
						res.data.data.forEach((e)=>{
							self.storeEnvironmen.push({
								value:e.conditionId,
								text:e.name
							})
						})
					}else{
						alert(res.data.msg);
					}
				})
			},
			getType(){
				let self = this;
				this.axios.post(Api.staffApi + '/business/selectBShopsTypeAll', this.qs.stringify({
					
				}), {
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					}
				}).then((res)=>{
					if(res.data.code == 1){
						// self.customerType = res.data.data;
						res.data.data.forEach((e)=>{
							self.customerType.push({
								value:e.typeId,
								text:e.name,
								icon:e.typeIcon
							})
						})
					}else{
						alert(res.data.msg);
					}
				})
			},
			getProjectType(){
				let self = this;
				this.axios.post(Api.staffApi + '/business/selectBClientPTypeAll', this.qs.stringify({
					
				}), {
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					}
				}).then((res)=>{
					if(res.data.code == 1){
						// self.customerType = res.data.data;
						res.data.data.forEach((e)=>{
							self.projectData.push({
								value:e.typeId,
								label:e.name
							})
						})
					}else{
						alert(res.data.msg);
					}
				})
			},
			addCustomer(){
				let self = this;
				if(this.center[0] == 0){
					let toast = this.$createToast({
						txt: '定位失败，请点击地图定位按钮重新定位',
						type: 'error'
					  })
					toast.show()
					return false;
				}else if(this.storeName == ''){
					let toast = this.$createToast({
						txt: '店铺名称不能为空',
						type: 'error'
					  })
					toast.show()
					return false;
				}else if(this.cityData[0] == '省份'){
					let toast = this.$createToast({
						txt: '请填写省市区',
						type: 'error'
					  })
					toast.show()
					return false;
				}else if(this.addr == ''){
					let toast = this.$createToast({
						txt: '经营地址不能为空',
						type: 'error'
					  })
					toast.show()
					return false;
				}else if (this.phone == '') {
							
					let toast = this.$createToast({
						txt: '手机号不能为空',
						type: 'error'
					  })
					toast.show()
					return false;
				}else if (!this.reg.test(this.phone)) {
							
					let toast = this.$createToast({
						txt: '手机号格式错误',
						type: 'error'
					  })
					toast.show()
					return false;
				}else if (this.environmenVal == '') {
							
					let toast = this.$createToast({
						txt: '请选择店铺环境',
						type: 'error'
					  })
					toast.show()
					return false;
				}else if(this.typeVal == ''){
					let toast = this.$createToast({
						txt: '请填选择客户类型',
						type: 'error'
					  })
					toast.show()
					return false;
				}else if(self.projectTypeVal.length<1){
					let toast = this.$createToast({
						txt: '请选择产品类型',
						type: 'error'
					  })
					toast.show()
					return false;
				}
				else if(this.imgOne == ''||this.imgTwo==''||this.imgThree==''){
					let toast = this.$createToast({
						txt: '请上传店铺照片',
						type: 'error'
					  })
					toast.show()
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
	.addCustomer{
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
						padding: 3px 20px 3px 10px;
						/*no*/
						margin-right: 20px;
						border: 1px solid #e8e8e8;
						/*no*/
						text-align: center;
						border-radius: 2px;
						/*no*/
						width: initial;

						span {
							font-size: 26px;
							color: #333;
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
						
					}
					.cube-upload-def .cube-upload-btn, .cube-upload-def .cube-upload-file{
						margin:0 ;
					}
					.cube-upload{
						width: 140px;
						height: 140px;
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
			.confirmBtn{
				color: #fff;
				font-size: 30px;
				width: 500px;
				height: 60px;
				background: #ff523d;
				border-radius: 50px;
				margin: 0 auto;
			}
		}
	}
</style>
