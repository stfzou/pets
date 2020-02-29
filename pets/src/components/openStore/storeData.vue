<template>
	<div class="storeDataWarp">
		<div class="storeDataPost">

		</div>
		<div class="mapDia" v-show="isMap">

			<div class="mapCnt">
				<el-amap ref="map" vid="amapDemo" :center="center" :zoom="18"  class="amap-demo" :plugin="plugin">
					<el-amap-search-box class="search-box" :search-option="searchOption" :on-search-result="onSearchResult"></el-amap-search-box>
					<el-amap-marker v-if="isMark" :draggable="true" :events="markers" :icon="require('../../assets/icon/map@2x.png')" vid="component-marker"></el-amap-marker>

				</el-amap>
				<div class="mapBtn" @click="mapHide">确定</div>




			</div>
		</div>
		<div class="storeDataHead">
			<div class="storeLogo">
				<div class="uploadImg" v-if="logoImg.length==0">
					<img src="../../assets/icon_mr.png" alt="" />
					<cube-upload :max="1" action="//jsonplaceholder.typicode.com/photos/" :process-file="function(file,next){return processFile(file,next,'logoImg')}" :simultaneous-uploads="1" @files-added="filesAdded" />
				</div>
				<div class="logoImg" v-else>
					<img :src="logoImg[0].url" alt="" />
					<i class="cubeic-wrong" @click="removeImg('logoImg')"></i>
				</div>
			</div>
			<div class="loadTip">
				上传你的门店logo
			</div>
		</div>
		<div class="storeForm">
			<ul>
				<li class="flex_r_f_s">
					<p>商户名称</p>
					<input placeholder="请输入商户名称" type="" name="" id="" v-model="shopName" />
				</li>
				<li class="flex_r_f_s">
					<p>负责人姓名</p>
					<input placeholder="请输入负责人姓名" type="" name="" id="" v-model="userName" />
				</li>
				<li class="flex_r_f_s">
					<p>负责人电话</p>
					<input placeholder="请输入负责人电话" type="" name="" id="" v-model="userPhone" />
				</li>
				<li class="flex_r_f_s">
					<p>经营范围</p>
					<!--<input readonly="readonly" placeholder="请选择经营行业" type="" name="" id="" v-model="shopTypeText" />-->
					<el-select v-model="shopTypeVal" multiple placeholder="请选择经营范围(可多选)">
				    <el-option
				      v-for="item in shopTypeData"
				      :key="item.value"
				      :label="item.text"
				      :value="item.value">
				    </el-option>
				  </el-select>
				</li>
				<li class="flex_r_f_s" @click="mapShow">
					<p>所在区域</p>
					<input placeholder="在地图上标注你的店铺位置" type="" name="" id="" v-model="shopAddr" />
				</li>
				<li class="flex_r_f_s">
					<p>商户地址</p>
					<input placeholder="请输入详细街道名称和门牌号" type="" name="" id="" v-model="detailedAddress" />
				</li>
				<li class="flex_r_f_s timeBox">
					<p>营业时间</p>
					<div class="time_r flex_r_s_b">
						<input @click="showTimePicker" readonly="readonly" placeholder="开始时间" type="" name="" id="" v-model="time1" />
						<span>~</span>
						<input @click="showEndTimePicker" readonly="readonly" placeholder="结束时间" type="" name="" id="" v-model="time2" />
					</div>

				</li>
			</ul>
			<div class="storeImgBox">
				<div class="title flex_r_s_b">
					<p>上传资质照片</p>
					<div class="lookEgImg" @click="egImgShow(1)">查看示例图</div>
				</div>
				<div class="upImgBox flex_r_f_s">
					<div class="upItem">
						<cube-upload :process-file="function(file,next){return processFile(file,next,'yyzzImg')}" v-if="yyzzImg.length==0" action="//jsonplaceholder.typicode.com/photos/" :simultaneous-uploads="1" @files-added="filesAdded" />
						<div class="upItemImg" v-else>
							<img :src="yyzzImg[0].url" alt="" /><i @click="removeImg('yyzzImg')" class="cubeic-wrong"></i>
						</div>
						<p>营业执照照片</p>
					</div>
					<div class="upItem">
						<cube-upload :process-file="function(file,next){return processFile(file,next,'idCardFront')}" v-if="idCardFront.length==0" action="//jsonplaceholder.typicode.com/photos/" :simultaneous-uploads="1" @files-added="filesAdded" />
						<div class="upItemImg" v-else>
							<img :src="idCardFront[0].url" alt="" /><i @click="removeImg('idCardFront')" class="cubeic-wrong"></i>
						</div>
						<p>法人身份证正面</p>
					</div>
					<div class="upItem">
						<cube-upload :process-file="function(file,next){return processFile(file,next,'idCardBack')}" v-if="idCardBack.length==0" action="//jsonplaceholder.typicode.com/photos/" :simultaneous-uploads="1" @files-added="filesAdded" />

						<div class="upItemImg" v-else>
							<img :src="idCardBack[0].url" alt="" /><i @click="removeImg('idCardBack')" class="cubeic-wrong"></i>
						</div>
						<p>法人身份证背面</p>
					</div>
				</div>
			</div>
			<div class="storeImgBox">
				<div class="title flex_r_s_b">
					<p>上传门店照片</p>
					<div class="lookEgImg" @click="egImgShow(2)">查看示例图</div>
				</div>
				<div class="upImgBox flex_r_f_s">
					<div class="upItem">
						<cube-upload :process-file="function(file,next){return processFile(file,next,'storeOutImg')}" v-if="storeOutImg.length==0" action="//jsonplaceholder.typicode.com/photos/" :simultaneous-uploads="1" @files-added="filesAdded" />
						<div class="upItemImg" v-else>
							<img :src="storeOutImg[0].url" alt="" /><i @click="removeImg('storeOutImg')" class="cubeic-wrong"></i>
						</div>
						<p>门店照片</p>
					</div>
					<div class="upItem">
						<cube-upload :process-file="function(file,next){return processFile(file,next,'firstStoreIn')}" v-if="firstStoreIn.length==0" action="//jsonplaceholder.typicode.com/photos/" :simultaneous-uploads="1" @files-added="filesAdded" />
						<div class="upItemImg" v-else>
							<img :src="firstStoreIn[0].url" alt="" /><i @click="removeImg('firstStoreIn')" class="cubeic-wrong"></i>
						</div>
						<p>店内照片</p>
					</div>
					<div class="upItem">
						<cube-upload :process-file="function(file,next){return processFile(file,next,'secondStoreIn')}" v-if="secondStoreIn.length==0" action="//jsonplaceholder.typicode.com/photos/" :simultaneous-uploads="1" @files-added="filesAdded" />
						<div class="upItemImg" v-else>
							<img :src="secondStoreIn[0].url" alt="" /><i @click="removeImg('secondStoreIn')" class="cubeic-wrong"></i>
						</div>
						<p>店内照片</p>
					</div>
				</div>
			</div>
			<div class="storeDesc">
				<cube-textarea v-model="shopDesc" :maxlength="200" placeholder="请描述一下您的店铺"></cube-textarea>
			</div>
			<div class="setSaleBox">
				<div class="setSale flex_r_s_b">
					<p>设置骨米用户进店消费折扣</p>
					<div class="slaeBox flex_r_f_e">
						<i :class="{active:saleVal<=1}" class="cubeic-remove" @click="removeSale"></i>
						<input @change="saleChange(val)" type="number" v-model="saleVal" />
						<i :class="{active:saleVal>=99}" class="cubeic-add" @click="addSale"></i>
						<span>%</span>
					</div>
				</div>
				<div class="saleTip">
					<span style="color: #ff523d;">指骨米宠物APP用户到您线下门店消费可以享受的折扣。</span><br /> 设置10%的优惠即打9折，例如：订单金额1000元，设置10%优惠后应收款金额为900元，高折扣将引起更多用户的关注，请根据成本预算谨慎设置。
				</div>
			</div>
			<div class="saleCode" v-show="salesmanId==''&&appUserId==''">
				<p>区域销售编码</p>
				<input placeholder="如有请填写(选填)" type="" name="" id="" v-model="saleCode" />
				<div class="saleCodeTip">请输入骨米宠物区域销售人员身份编码，帮助我们提高管理效率及售后服务品质，谢谢！</div>
			</div>
			<div class="setStoreAgree flex_r_s_b">
				<p class="">同意商户服务协议</p>
				<cube-switch v-model="isRead"></cube-switch>
			</div>
			<div class="lookAgree">

				<router-link :to="{name:'agreement',query:{agreementId:9}}">注册商户您需要同意商户服务协议</router-link>
			</div>
			<div class="commitBtn flex_r_s_c" @click="commit">提交资料</div>
		</div>

	</div>
</template>

<script>
	import Api from '../common/apj.js'
	import compress from '../../data/image'

	export default {
		data() {
			let self = this;
			return {
				reg: /^1[3456789]\d{9}$/,
				searchOption: {
		            city: '成都',
		            citylimit: true
        },
				isMark:true,
				shopName: '',
				userName: '',
				userPhone: '',
				time1: '',
				time2: '',
				shopDesc: '',
				isRead: false, //是否阅读协议
				saleCode: '', //销售编码
				saleVal: 10, //折扣设置
				shopTypeData: [], //经营行业数据
				shopTypeVal: '', //经营行业选中的值
				shopTypeText: '',
				sheng: '', //省
				shi: '', //市
				qu: '', //区
				shopAddr: '',
				detailedAddress: '', //详细地址
				logoImg: [], //Logo
				yyzzImg: [], //营业执照
				idCardFront: [], //身份证正面照
				idCardBack: [], //身份证反面照
				storeOutImg: [], //店外照片
				firstStoreIn: [], //店内照片1
				secondStoreIn: [], //店内照片2
				salesmanId:'',
				appUserId:'',
				isMap: false,
				center: [104.0658400000, 30.6574200000],
				plugin: [{
					pName: 'Geolocation',
					enableHighAccuracy: true, //是否使用高精度定位，默认:true
					timeout: 10000, //超过10秒后停止定位，默认：无穷大
					showMarker: false, //定位成功后在定位到的位置显示点标记，默认：true
					showCircle: false, //定位成功后用圆圈表示定位精度范围，默认：true
					panToLocation: true, //定位成功后将定位到的位置作为地图中心点，默认：true
					zoomToAccuracy: false, //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：f
					useNative: true,
					events: {
						init(o) {
							// o 是高德地图定位插件实例
							o.getCurrentPosition((status, result) => {
								if(result && result.position) {
									self.center = [result.position.lng, result.position.lat];
									self.sheng = result.addressComponent.province;
									self.shi = result.addressComponent.city;
									self.qu = result.addressComponent.district;
									self.shopAddr = self.sheng + ' ' + self.shi + ' ' + self.qu;

									self.searchOption.city = result.addressComponent.city;
									self.detailedAddress = result.addressComponent.township+result.addressComponent.street+result.addressComponent.streetNumber;
									console.log(result)
								}else{

								}
							});
						},
						complete(res){

						 	self.isMark = false;
							setTimeout(()=>{
								  self.isMark = true;

							},200)
					  	}

					}
				}],
				markers: {
					position: self.center,
					dragend: (e) => {

						self.center = [e.lnglat.lng, e.lnglat.lat]
						let arr = [e.lnglat.lng, e.lnglat.lat];
						let geocoder = new AMap.Geocoder({
							radius: 1000,
							extensions: 'all'
						})
						geocoder.getAddress(arr, function(status, result) {
							if(status === 'complete' && result.info === 'OK') {
								//result字段就是根据经纬度解析后的地址信息

								self.sheng = result.regeocode.addressComponent.province
								self.shi = result.regeocode.addressComponent.city
								self.qu = result.regeocode.addressComponent.district
								self.shopAddr = self.sheng + ' ' + self.shi + ' ' + self.qu

								self.detailedAddress = result.regeocode.addressComponent.township+result.regeocode.addressComponent.street+result.regeocode.addressComponent.streetNumber;


							}
						})

					}
				},
			}
		},
		mounted() {
      
			if(this.$route.query.salesmanId != null) {
				this.salesmanId = this.$route.query.salesmanId

			}else if(this.$route.query.appUserId != null){
				this.appUserId = this.$route.query.appUserId;
			}
			if(localStorage.getItem('userId') == null) {
				this.$router.push({
					name:'storeRegister'
				})
			}
			this.getShopType();
			},
			methods: {
				onSearchResult(pois){
				 let self = this;
				 if(pois.length>0){

				 	self.center = [pois[0].lng,pois[0].lat]
				 	let geocoder = new AMap.Geocoder({
							radius: 1000,
							extensions: 'all'
					})
					geocoder.getAddress(self.center, function(status, result) {
							if(status === 'complete' && result.info === 'OK') {
								//result字段就是根据经纬度解析后的地址信息

								self.sheng = result.regeocode.addressComponent.province
								self.shi = result.regeocode.addressComponent.city
								self.qu = result.regeocode.addressComponent.district
								self.shopAddr = self.sheng + ' ' + self.shi + ' ' + self.qu
								self.detailedAddress = result.regeocode.addressComponent.township+result.regeocode.addressComponent.street+result.regeocode.addressComponent.streetNumber;

							}
					})
				 	self.isMark = false;
					setTimeout(()=>{
						self.isMark = true;
					},200)
				 }

				},
				errTip(msg) {
					let toast = this.$createToast({
						txt: msg,
						type: 'error'
					})
					toast.show()
				},
				commit() {
					let self = this;
					if(this.logoImg.length == 0) {
						this.errTip('请上传店铺LOGO')
					} else if(this.shopName == '') {
						this.errTip('请输入店铺名字')
					} else if(this.userName == '') {
						this.errTip('请输入负责人姓名')
					} else if(this.userPhone == '') {
						this.errTip('请输入负责人电话')
					} else if(!this.reg.test(this.userPhone)) {
						this.errTip('电话格式错误')
					} else if(this.shopTypeVal == '') {
						this.errTip('请选择经营行业')
					} else if(this.sheng == '') {
						this.errTip('请获取地图标注')
					} else if(this.detailedAddress == '') {
						this.errTip('请输入详细地址')
					} else if(this.time1 == '') {
						this.errTip('请选择营业开始时间')
					} else if(this.time2 == '') {
						this.errTip('请选择营业结束时间')
					} else if(this.yyzzImg.length == 0) {
						this.errTip('请上传营业执照')
					} else if(this.idCardFront.length == 0) {
						this.errTip('请上传身份证正面照')
					} else if(this.idCardBack.length == 0) {
						this.errTip('请上传身份证背面照')
					} else if(this.storeOutImg.length == 0) {
						this.errTip('请上传门店照片')
					} else if(this.firstStoreIn.length == 0) {
						this.errTip('请上传店内照片')
					} else if(this.secondStoreIn.length == 0) {
						this.errTip('请完善店内图片')
					} else if(this.shopDesc == '') {
						this.errTip('请输入店铺描述')
					} else if(!this.isRead) {
						this.errTip('请同意商户服务协议')
					} else {
						let formData = new FormData();
						formData.append("shopType",self.shopTypeVal.join(','))
						formData.append("userId", localStorage.getItem('userId'))
						formData.append("province", self.sheng)
						formData.append("city", self.shi)
						formData.append("area", self.qu)
						formData.append("shopAddress", self.detailedAddress)
						formData.append("shopName", self.shopName)
						formData.append("shopDesc", self.shopDesc)
						formData.append("shopImg", self.logoImg[0].imgData, self.logoImg[0].name)
						formData.append("license", self.yyzzImg[0].imgData, self.yyzzImg[0].name)
						formData.append("IDCardFront", self.idCardFront[0].imgData, self.idCardFront[0].name)
						formData.append("IDCardBack", self.idCardBack[0].imgData, self.idCardBack[0].name)
						formData.append("shopImgFacade", self.storeOutImg[0].imgData, self.storeOutImg[0].name)
						formData.append("imgInStore", self.firstStoreIn[0].imgData, self.firstStoreIn[0].name)
						formData.append("imgInStore", self.secondStoreIn[0].imgData, self.secondStoreIn[0].name)

						formData.append("contactName", self.userName)
						formData.append("contactTel", self.userPhone)
						formData.append("longitude", self.center[0])
						formData.append("latitude", self.center[1])
						formData.append("startTime", self.time1)
						formData.append("endTime", self.time2)
						if(self.saleCode != '') {
							formData.append("code", self.saleCode)
						}
						if(self.salesmanId != '') {
							formData.append("employeeId", self.salesmanId)
						}
						if(self.appUserId!=''){
							formData.append("inviteUser", self.appUserId)

						}

						formData.append("shopDiscount", self.saleVal)
						self.axios.post(Api.userApi + '/hw/perfectShopsInfo', formData, {
							headers: {
								'Content-Type': 'multipart/form-data'
							}
						}).then((res) => {
							if(res.data.code == 1) {

								let toast = self.$createToast({
									txt: '提交成功',
									type: 'correct'
								})
								toast.show()
								setTimeout(() => {
									self.$router.push({
										name: 'storeSus'
									})

								},500)


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
				addSale() {
					if(this.saleVal >= 99) {
						this.saleVal = 99;
					} else {
						this.saleVal = parseInt(this.saleVal) + 1;
					}
				},
				removeSale() {
					if(this.saleVal <= 1) {
						this.saleVal = 1
					} else {
						this.saleVal = parseInt(this.saleVal) - 1;
					}
				},
				saleChange() {

					if(this.saleVal >= 99) {
						this.saleVal = 99;
					} else if(this.saleVal <= 1) {
						this.saleVal = 1;
					}
				},
				showTimePicker() {
					let self = this;
					if(!this.timePicker) {
						this.timePicker = this.$createDatePicker({
							title: '开始时间',
							min: [0, 0],
							max: [23, 59],
							columnCount: 2,
							value: new Date(),
							startColumn: 'hour',
							onSelect: function(date, selectedVal, selectedText) {

								if(self.time2 != '' && selectedVal[0] > self.time2.split(':')[0]) {
									self.time1 = '';
									alert('开始时间不能大于结束时间')
								} else if(self.time2 != '' && selectedVal[0] == self.time2.split(':')[0] && selectedVal[1] == self.time2.split(':')[1]) {
									alert('开始时间不能等于结束时间')
								} else {
									self.time1 = selectedText.join(':');
								}
							},
							onCancel: function() {

							}
						})
					}

					this.timePicker.show()
				},
				showEndTimePicker() {
					let self = this;
					if(!this.endtimePicker) {
						this.endtimePicker = this.$createDatePicker({
							title: '结束时间',
							min: [0, 0],
							max: [23, 59],
							columnCount: 2,
							value: new Date(),
							startColumn: 'hour',
							onSelect: function(date, selectedVal, selectedText) {

								if(self.time1 != '' && selectedVal[0] < self.time1.split(':')[0]) {
									self.time2 = '';
									alert('结束时间不能小于开始时间')
								} else if(self.time1 != '' && selectedVal[0] == self.time1.split(':')[0] && selectedVal[1] == self.time1.split(':')[1]) {
									alert('结束时间不能等于开始时间')
								} else {
									self.time2 = selectedText.join(':');
								}
							},
							onCancel: function() {

							}
						})
					}

					this.endtimePicker.show()
				},

				getShopType() {

					let self = this;
					this.axios.get(Api.userApi + '/coupon/selectPetType', {
						headers: {
							'Content-Type': 'application/x-www-form-urlencoded'
						}
					}).then((res) => {
						if(res.data.code == 1) {
							res.data.data.forEach(e => {
								self.shopTypeData.push({
									text: e.name,
									value: e.typeId
								})

							})
						}

					})

				},
				egImgShow(val) {
					if(val === 1) {
						let imgs = [require('../../assets/shili05.png'), require('../../assets/shili04.png'), require('../../assets/shili07.png')];
						this.$createImagePreview({
							imgs: imgs
						}).show()
					} else {
						let imgs = [require('../../assets/shili01.png'), require('../../assets/shili02.png')];
						this.$createImagePreview({
							imgs: imgs
						}).show()

					}

				},
				dataURItoBlob(base64Data) { //将base64转为blob
					var byteString;
					if(base64Data.split(",")[0].indexOf("base64") >= 0)
						byteString = atob(base64Data.split(",")[1]);
					else byteString = unescape(base64Data.split(",")[1]);
					var mimeString = base64Data
						.split(",")[0]
						.split(":")[1]
						.split(";")[0];
					var ia = new Uint8Array(byteString.length);
					for(var i = 0; i < byteString.length; i++) {
						ia[i] = byteString.charCodeAt(i);
					}
					return new Blob([ia], {
						type: mimeString
					});
				},
				processFile(file, next, imgArr) {

					let self = this;
					compress(file, {
						compress: {
							width: 800,
							height: 800,
							quality: 0.5
						}
					}, function() {


						let blob = self.dataURItoBlob(file.base64)

						self[imgArr].push({
							name: file.name,
							imgData: blob,
							url: file.base64
						})


					})
				},
				removeImg(imgName) { //删除图片
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
							self[imgName] = [];

						},
						onCancel: () => {

						}
					}).show()
				},
				filesAdded(files) {

				},
				mapHide() {
					this.isMap = false;
				},
				mapShow() {
					this.isMap = true;
				}
			}
		}
</script>

<style lang="scss">
	.storeDataWarp {
		padding-bottom: 60px;
		background: #fff;
		.mapDia {
			position: fixed;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			background: rgba(0, 0, 0, 0.6);
			z-index: 100;
			.mapCnt {
				width: 100%;
				height: 100%;
				position: relative;
				.el-vue-search-box-container{
					width: 600px;

				}
				.el-vue-search-box-container .search-tips{
					width: 100%;
				}
				.cubeic-close {
					position: absolute;
					right: 10px;
					top: 10px;
					font-size: 50px;
				}
				.mapBtn{
					position: absolute;
					bottom: 0;
					width: 100%;
					height: 70px;
					border-radius: 40px;
					background: #FF523D;
					color: #fff;
					text-align: center;
					line-height: 70px;
					font-size: 26px;
					left: 0;
					z-index: 10000;

				}
				.search-box {
			      position: absolute;
			      top: 25px;
			      left: 50%;
			      margin-left: -300px;
			    }

			    .amap-page-container {
			      position: relative;
    			}
			}
		}
		.storeDataPost {
			height: 360px;
			background-image: url('../../assets/topMenuBg.png');
			background-size: contain;
			background-repeat: no-repeat;
			background-position: 50%;
		}
		.cube-upload-file-def {
			display: none;
		}
		.cube-upload-file {
			display: none;
		}
		.storeDataHead {
			padding-top: 60px;
			.loadTip {
				text-align: center;
				font-size: 24px;
				color: #666;
				padding-top: 25px;
			}
		}
		.storeLogo {
			display: flex;
			flex-direction: row;
			justify-content: center;
			.uploadImg {
				width: 150px;
				position: relative;
				img {
					width: 150px;
				}
				.cube-upload {
					position: absolute;
					top: 0;
					left: 0;
					width: 100%;
					height: 100%;
					opacity: 0;
				}
			}
			.logoImg {
				width: 150px;
				border-radius: 50%;
				height: 150px;
				position: relative;
				.cubeic-wrong {
					position: absolute;
					right: -10px;
					top: -10px;
					font-size: 40px;
				}
				img {
					width: 150px;
					height: 150px;
					border-radius: 50%;
				}
			}
		}
		.storeForm {
			padding: 60px 20px 0 20px;
			.cube-switch .cube-switch-input:checked+.cube-switch-ui {
				border-color: #ff523d;
				background-color: #ff523d;
			}
			.commitBtn {
				margin: 140px auto 0 auto;
				width: 570px;
				height: 70px;
				background: #ff523d;
				border-radius: 60px;
				font-size: 28px;
				color: #fff;
			}
			.lookAgree {
				padding-top: 15px;
				a {
					font-size: 24px;
					color: #ff523d;
				}
			}
			.setStoreAgree {
				padding-top: 20px;
				p {
					font-size: 28px;
					color: #333;
				}
			}
			.saleCode {
				p {
					font-size: 28px;
					color: #333;
					padding: 20px 0 30px 0;
				}
				input {
					border: 1px solid rgba(232, 232, 232, 1);
					/*no*/
					width: 100%;
					box-sizing: border-box;
					padding: 12px 8px;
					font-size: 28px;

				}
				.saleCodeTip {
					font-size: 24px;
					color: #999;
					line-height: 36px;
					padding-top: 10px;
				}
			}
			.setSaleBox {
				.saleTip {
					font-size: 24px;
					color: #999;
					line-height: 36px;
					padding-top: 10px;
				}
				.setSale {
					padding-top: 36px;
					p {
						font-size: 28px;
						color: #333;
					}
					.slaeBox {
						width: 180px;
						i {
							font-size: 40px;
							color: #FF523D;
						}
						input {
							width: 50px;
							font-size: 30px;
							text-align: center;
						}
						span {
							font-size: 30px;
							color: #000;
						}
						.active {
							color: #ACACAC;
						}
					}
				}
			}
			.storeDesc {
				padding-top: 30px;
				.cube-textarea-wrapper {
					height: 240px;
				}
			}
			.storeImgBox {
				.title {
					padding: 40px 10px 20px 10px;
					box-sizing: border-box;
					font-size: 28px;
					color: #333;
					.lookEgImg {
						color: #ff523d;
					}
				}
				.upImgBox {
					.upItem {
						margin-right: 20px;
						height: 200px;
						position: relative;
						width: 160px;
						.upItemImg {
							width: 160px;
							height: 160px;
							position: relative;
							.cubeic-wrong {
								position: absolute;
								right: -10px;
								top: -10px;
								font-size: 40px;
							}
							img {
								width: 160px;
								height: 160px;
							}
						}
						.cube-upload-btn-def {
							width: 160px;
							height: 160px;
						}
						p {
							font-size: 20px;
							color: #999;
							text-align: center;
							position: absolute;
							width: 100%;
							bottom: 0;
							left: 0;
						}
					}
				}
			}
			ul {
				font-size: 28px;
				color: #333;
				p {
					height: 30px;
					width: 150px;
				}
				input {
					height: 30px;
					width: 450px;
					margin-left: 42px;
					height: 50px;
				}
				li {
					padding: 30px 10px 20px 10px;
					box-sizing: border-box;
					border-bottom: 1px solid #e8e8e8;
					/*no*/
				}
				.timeBox {
					.time_r {
						margin-left: 42px;
						width: 380px;
					}
					input {
						width: 115px;
						margin: 0;
					}
				}
				.el-select{
					.el-tag.el-tag--info{
						font-size: 24px;
					}
					.el-input__icon{
						line-height: 100%;
					}
					.el-input__inner{
						height: 60px;
					}
					.el-select__tags{
						left:50px;
					}
				}
			}
		}
	}
</style>
