<template>
	<div class="main-cnt">
		<ul class="nav flex_r_f_s">
			<li class="active">
				
				<span>①</span>
				商家信息
			</li>
			<li>
				<img src="../assets/condition/icon_01.png" alt="">
			</li>
			<li>
				
				<span>②</span>
				资质信息
			</li>
			<li>
				
				<img src="../assets/condition/icon_01.png" alt="">
			</li>
			<li>
				<span>③</span>
				店铺信息提交成功
			</li>
		</ul>
		<div class="view_warpper">
			<div class="sellerInfo">
					
					<ul class="seller_info_list">
						<li>
							<p>商家名称<span>*</span></p>
							<div class="list_r">
								<input class="active_input" v-model="storeNameInput" type="text" placeholder="请与门店照片上的名称保持一致" />
							</div>
						</li>
						<li>
							<p>联系人姓名<span>*</span></p>
							<div class="list_r">
								<input type="text" v-model="userNameInput" placeholder="请输入联系人姓名" />
							</div>
						</li>
						<li>
							<p>联系人电话<span>*</span></p>
							<div class="list_r">
								<input class="gray_bg" type="text" readonly="readonly" v-model="phone" />
							</div>
						</li>
						<li>
							<p>商家类型<span>*</span></p>
							<div class="list_r">
								<el-select v-model="storeType" placeholder="请选择">
									<el-option
										v-for="(item,index) in storeTypeData"
										:key="index"
										:label="item.shopTypeName"
										:value="item.id">
									</el-option>
								</el-select>
							</div>
						</li>
						<li>
							<p>经营品类<span>*</span></p>
							<div class="list_r">
								<el-select v-model="varietiesValue" multiple placeholder="请选择">
									<el-option
										v-for="item in varietiesData"
										:key="item.typeName"
										:label="item.typeName"
										:value="item.id">
									</el-option>
								</el-select>
							</div>
						</li>
						<li>
							<p>所在城市<span>*</span></p>
							<div class="list_r">
								<VDistpicker @province="onChangeProvince" @city="onChangeCity" @area="onChangeArea"></VDistpicker>
							</div>
						</li>
						<li>
							<p>详细地址<span>*</span></p>
							<div class="list_r">
								<input id="input_id" v-model="searchMap" class="active_input" type="text" placeholder="请输入详细街道名称和门牌号，请与执照地址一致">
								<span class="map_button pointer" @click="mapShow = !mapShow">去定位</span>
							
							</div>
						</li>
						<li v-show="mapShow">
							<p></p>
							<div class="list_r map_r flex_r_s_b">
								
								<div class="amap-page-container">
								 <el-amap-search-box class="search-box" :search-option="searchOption" :on-search-result="onSearchResult"></el-amap-search-box>
								  <el-amap vid="amap" :zoom="zoom" :plugin="plugin" class="amap-demo" :center="mapCenter">
									 
									  <el-amap-marker :events="markers" draggable="true" vid="component-marker" :position="mapCenter"></el-amap-marker>
			
								  </el-amap>
								
								 
								</div>
							</div>
						</li>
						<li>
							<p>店面照片<span>*</span></p>
							<div class="list_r">
								<div class="store_img">
									<div class="outside flex_r_s_b">
										<div class="outside_img" v-if="sellerInfo.outImg">
											<img :src="sellerInfo.outImg">
											<i @click="deleteImg($refs.uploadOutSide.uploadFiles,'outImg')" class="el-icon-circle-close"></i>
										</div>
										<div v-show="!sellerInfo.outImg">
												<el-upload
													ref="uploadOutSide"
													class="avatar-uploader"
													action="http://192.168.0.109:8084/updateImg"
													:show-file-list="false"
													list-type="picture-card"
													:limit="1"
													name="Img"
													:on-success="handleStoreSuccess"
													:before-upload="beforeAvatarUpload">
													<i class="el-icon-plus avatar-uploader-icon"></i>
												</el-upload>
										</div>
										
										<div class="mid">
											<h3>门店照片</h3>
											<p>需拍出完整门框、门匾（建议正对门脸2米处拍摄）</p>
										</div>
										<div class="eg">
											<img class="avatar" src="../assets/condition/shili01.png" alt="">
										</div>
									</div>
									<div class="outside inside flex_r_s_b">
										<div class="outside_img" v-if="sellerInfo.inImg">
											<img :src="sellerInfo.inImg">
											<i @click="deleteImg($refs.uploadInSide.uploadFiles,'inImg')" class="el-icon-circle-close"></i>
										</div>
										<div v-show="!sellerInfo.inImg">
												<el-upload
													ref="uploadInSide"
													class="avatar-uploader"
													action="http://192.168.0.109:8084/updateImg"
													:show-file-list="false"
													list-type="picture-card"
													:limit="1"
													name="Img"
													:on-success="handleStoreInSuccess"
													:before-upload="beforeAvatarUpload">
													<i class="el-icon-plus avatar-uploader-icon"></i>
												</el-upload>
										</div>
										<div class="mid">
											<h3>店内照片</h3>
											<p>需真实反映店内环境（商品货架、美容室、收银台等）</p>
										</div>
										<div class="eg">
											<img src="../assets/condition/shili02.png" alt="">
										</div>
									</div>
								</div>
							</div>
						</li>
						<li>
							<p>商户LOGO<span>*</span></p>
							<div class="list_r">
								<div class="store_img">
									<div class="outside flex_r_s_b">
										<div class="outside_img" v-if="sellerInfo.logo">
											<img :src="sellerInfo.logo">
											<i @click="deleteImg($refs.uploadLogoSide.uploadFiles,'logo')" class="el-icon-circle-close"></i>
										</div>
										<div v-show="!sellerInfo.logo">
												<el-upload
													ref="uploadLogoSide"
													class="avatar-uploader"
													action="http://192.168.0.109:8084/updateImg"
													:show-file-list="false"
													list-type="picture-card"
													name="Img"
													:limit="1"
													:on-success="handleStoreLogoSuccess"
													:before-upload="beforeAvatarUpload">
													<i class="el-icon-plus avatar-uploader-icon"></i>
												</el-upload>
										</div>
										<div class="mid">
											<h3>商户LOGO</h3>
											<p>需体现您店铺的特色，吸引更多消费者进店消费</p>
										</div>
										<div class="eg">
											<img src="../assets/condition/shili03.png" alt="">
										</div>
									</div>
									
								</div>
							</div>
						</li>
					</ul>
					<div class="pointer next_btn" @click="next">点击进入下一步</div>
					
				</div>
		</div>
	</div>
	
</template>

<script>

	import VDistpicker from 'v-distpicker'
	export default {
		components: { VDistpicker },
		data() {
			const self = this;
			return {
				varietiesData: [],
				varietiesValue:[],//经营品类
				markers:{
					 dragend: (e) => {
						var geocoder = new AMap.Geocoder();
						self.lng = e.lnglat.lng;
						self.lat = e.lnglat.lat;
						self.mapCenter = [self.lng, self.lat];
						console.log(self.mapCenter)
					}
				},
				 searchOption: {
					city:'',
					citylimit: true
				},
				phone:JSON.parse(sessionStorage.getItem('user')).userPhone,
				storeNameInput:'',
				userNameInput:'',
				storeTypeData:[],
				storeType:'',//商家类型
				sheng:'',
				shi:'',
				qu:'',
				province: "",
				mapCenter: [121.59996, 31.197646],
				area: "",
				sellerInfo:{
					outImg:'',
					outId:'',
					inImg:'',
					inId:'',
					logo:'',
					logoId:''
				},
				city:'',
				searchMap:'',
				lng: 0,
				lat: 0,
				loaded: false,
				mapShow:true,
				zoom:14,
				plugin: [{
				  enableHighAccuracy: true,//是否使用高精度定位，默认:true
				  timeout: 100,          //超过10秒后停止定位，默认：无穷大
				  maximumAge: 0,           //定位结果缓存0毫秒，默认：0
				  convert: false,           //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
				  showButton: false,        //显示定位按钮，默认：true
				  buttonPosition: 'RB',    //定位按钮停靠位置，默认：'LB'，左下角
				  showMarker: false,        //定位成功后在定位到的位置显示点标记，默认：true
				  showCircle: true,        //定位成功后用圆圈表示定位精度范围，默认：true
				  panToLocation: true,     //定位成功后将定位到的位置作为地图中心点，默认：true
				  zoomToAccuracy:true,//定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：f
				  extensions:'all',
				  pName: 'Geolocation',
				  events: {
					init(o) {
					  // o 是高德地图定位插件实例
					  o.getCurrentPosition((status, result) => {
							
							if (result && result.position) {
								
								
								self.lng = result.position.lng;
								self.lat = result.position.lat;
								self.mapCenter = [self.lng, self.lat];
								self.searchOption.city = result.addressComponent.city;
								self.loaded = true;
								self.$nextTick();
								// console.log(result.addressComponent.city)
								
							}
					  
						});
					}
				  }
				},
				{
					pName:'Geocoder',
					events:{
						init(o){
							
						}
					}
				}]
				//
			};
		},
		mounted:function(){
			let self = this;
			this.axios.post('/selectShopUserInfo', this.qs.stringify({
				userId:JSON.parse(sessionStorage.getItem('user')).userId
				
			}), {
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				}
			}).then((res)=>{
				if(res.data.code == 1){
					if(res.data.user.userShops.shopStatus === 3){
						
						self.$router.push({
							name: 'login'
						})
						
					}else if(res.data.user.userShops.shopStatus === 4) {
								
						self.$router.push({
							name: 'qualificationsInfo',
							params: { shopTypeName: res.data.user.userShops.shopName }
						})
					}else if(res.data.user.userShops.shopStatus === 2){
						
						self.$router.push({
							name: 'addGoods'
						})
					}else if(res.data.user.userShops.shopStatus === 1){
						
						self.$router.push({
							name: 'storeSuccess'
						})
						
					}
				}
			})
			
			
			this.axios.all([
				this.axios.post('/getOperateAll',{
					headers: { //经营品类
						'Content-Type': 'application/x-www-form-urlencoded',
					}
				}),
				this.axios.post('/getShopTypeAll',{
					headers: { //商店类型
						'Content-Type': 'application/x-www-form-urlencoded',
					}
				})

			]).then(self.axios.spread(function(resPl,resType){
					if(resPl.data.code==1&&resType.data.code==1){
						self.varietiesData = resPl.data.data;
						self.storeTypeData = resType.data.data;
					}else{
						self.$message({
							showClose: true,
							message:'初始化数据失败',
							type: 'error',
						});
					}
					
			}));
			
		},
		methods: {
				beforeAvatarUpload(file) {
							
					const isLt2M = file.size / 1024 / 1024 < 2;
					if (!isLt2M) {
					  this.$message.error('上传图片大小不能超过 2MB!');
					}
					return isLt2M;
				},
				handleStoreSuccess(res,file,fileList) { //门店照片
					this.sellerInfo.outImg = file.response.data.imgAddr;
					this.sellerInfo.outId = file.response.data.imgId;
					
				},
				handleStoreInSuccess(res,file,fileList) {//店内照片
					this.sellerInfo.inImg = file.response.data.imgAddr;
					this.sellerInfo.inId = file.response.data.imgId;
				},
				handleStoreLogoSuccess(res,file,fileList) {//商户logo
					this.sellerInfo.logo = file.response.data.imgAddr;
					this.sellerInfo.logoId = file.response.data.imgId;
				},
				deleteImg(arr,img){ //照片删除
					
					let self = this;
					
					this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
							confirmButtonText: '确定',
							cancelButtonText: '取消',
							type: 'warning',
							callback:function(action, instance){
								if(action == 'confirm'){
									self.axios.post('/deleteImg', self.qs.stringify({
										imgAddr: self.sellerInfo[img],
									}), {
										headers: {
											'Content-Type': 'application/x-www-form-urlencoded'
										}
									}).then(function(res){
										if(res.data.code == 1){
											arr.splice(0, 1);
											self.sellerInfo[img] = '';
										}else{
											self.$message({
												showClose: true,
												message:res.data.msg,
												type: 'error',
											});
										}
									
									}).catch(function(res){
											self.$message({
												showClose: true,
												message:'服务器错误',
												type: 'error',
											});
									})
									
								}
							}
					})
				},
				addMarker: function() {
				  let lng = 121.5 + Math.round(Math.random() * 1000) / 10000;
				  let lat = 31.197646 + Math.round(Math.random() * 500) / 10000;
				  this.markers.push([lng, lat]);
				},
				onSearchResult(pois) {
				  
				  if (pois.length > 0) {
					
					this.mapCenter = [pois[0].lng, pois[0].lat];
					
				  }
				},
				//省市区赋值
				onChangeProvince(data){
					this.sheng = data.value;
					console.log(this.sheng);
				},
				onChangeCity(data){
					this.shi = data.value;
					
				},
				onChangeArea(data){
					this.qu = data.value;
					
				},
				onSearchResult(pois){
					let self = this;
					self.lng = pois[0].location.lng;
					self.lat = pois[0].location.lat;
					self.mapCenter = [self.lng, self.lat];
					console.log(self.mapCenter)
				},
				//下一步按钮验证
				next(){
					let self = this;
					//商家信息填写成功
					if(this.storeNameInput === ''){
						this.$message.error('商家名字不能为空');
						return false;
					}else if(this.userNameInput === ''){
						this.$message.error('用户名字不能为空');
						return false;
					}else if(this.storeType == ''){
						this.$message.error('请选择商家类型');
						return false;
					}else if(this.varietiesValue == ''){
						this.$message.error('请选择经营种类');
						return false;
					}else if(this.sheng == ''||this.shi == ''||this.qu == ''){
						this.$message.error('请填写省市区');
						return false;
					}else if(this.searchMap === ''){
						this.$message.error('请填写详细街道位置');
						return false;
					}else if(this.sellerInfo.outId == ''){
						this.$message.error('请上传门店照片');
						return false;
					}else if(this.sellerInfo.inId == ''){
						this.$message.error('请上传店内照片');
						return false;
					}else if(this.sellerInfo.logoId == ''){
						this.$message.error('请上传LOGO');
						
						return false;
					}else{
						let loading = this.$loading({
							lock: true,
							text: '加载中，请稍后',
							spinner: 'el-icon-loading',
							background: 'rgba(0, 0, 0, 0.7)'
						});
						this.axios.post('/webShop/editShopsInfo', this.qs.stringify({
							
							shopId:JSON.parse(sessionStorage.getItem('user')).shopId,
							shopName:self.storeNameInput,
							contactName:self.userNameInput,
							contactTel:JSON.parse(sessionStorage.getItem('user')).userPhone,
							shopTypeId:self.storeType,
							operateIds:self.varietiesValue.join(','),
							province:self.sheng,
							city:self.shi,
							area:self.qu,
							shopAddress:self.searchMap,
							shopImg:self.sellerInfo.logoId,
							shopImgFacade:self.sellerInfo.outId,
							imgInStore:self.sellerInfo.inId,
							latitude:self.mapCenter[1],
							longitude:self.mapCenter[0],
							
						}), {
							headers: {
								'Content-Type': 'application/x-www-form-urlencoded'
							}
						}).then(function(res){
							if(res.data.code == 1){
								
								setTimeout(() => {
									loading.close();
								}, 1000);
								self.$message({
									showClose: true,
									message: '提交成功',
									type: 'success',
								});
								self.$router.push({name:'qualificationsInfo'});
							}else{
								self.$message.error(res.data.msg);
							}
						})
					}
				}
				
			
		//
		},
		created(){
			setTimeout(()=>{
				this.mapShow = false;
			},500)
		}
	}
</script>

<style lang="scss">
	.main-cnt{
		width: 1200px;
		margin: 20px auto 0 auto;
		background: #fff;
		padding: 0 20px;
		padding-bottom: 54px;
		box-sizing: border-box;
		box-shadow: 0px 0px 10px 5px #ffe9e6;
		padding-top: 60px;
		.nav{
			width: 1000px;
			height: 60px;
			border-radius:30px;
			box-shadow: 0px 0px 10px 5px #ffe9e6;
			margin:0 auto;
			box-sizing: border-box;
			justify-content:space-around;
			li{
				font-size: 20px;
				font-weight:400;
				display: flex;
				span{
					margin-right: 12px;
				}
			}
			.active{
				color: #FF523D;
				display: flex;
				.success{
					width: 18px;
					height: 18px;
					margin-right: 12px;
				}
			}
		}
	}
	.el-select-dropdown.is-multiple .el-select-dropdown__item.selected{
		color: #FF523D;
	}
	.sellerInfo{
		margin-top: 28px;
		.map_r{
			width: 540px;
			.amap-demo {
				height: 300px;
			}
			.amap-page-container {
				position: relative;
				height: 300px;
				width: 500px;
			}
			#output{
				width: 200px;
				height: 300px;
			}
			.search-box {
			  position: absolute;
			  top: 25px;
			  left: 20px;
			}
		}
		
		
		.next_btn{
			width:300px;
			height:38px;
			line-height:38px;
			text-align: center;
			margin: 0 auto;
			color: #fff;
			margin-top: 60px;
			background:rgba(255,82,61,1);
			box-shadow:0px 6px 8px 0px rgba(255,82,61,0.16);
			border-radius:19px;
		}
		.seller_info_list{
			padding-left: 165px;
			.amap-demo {
			  height: 300px;
			}
			.amap-page-container {
			  position: relative;
			}
			&>li{
				overflow: hidden;
				margin-top: 28px;
				&>p{
					font-size: 18px;
					color: #333;
					line-height: 32px;
					height: 32px;
					float: left;
					width: 100px;
					span{
						color: #FF523D;
					}
				}
				.list_r{
					float: left;
					position: relative;
					margin-left: 24px;
					&>input{
						line-height: 32px;
						color: #333;
						font-size: 16px;
						width: 280px;
						outline: none;
						border:1px solid rgba(221,221,221,1);
						border-radius:6px;
						padding-left: 20px;
						box-sizing: border-box;
					}
					.active_input{
						width: 420px;
					}
					.gray_bg{
						background: #f2f2f2;
						color: #666;
					}
					.el-select{
						width: 280px;
					}
					.el-select-dropdown__item{
						color: red;
					}
					.el-select-dropdown.is-multiple .el-select-dropdown__item.selected{
						color: red;
					}
					.distpicker-address-wrapper {
						select{
							padding: 0;
							height: 28px;
							padding-left: 20px;
							line-height: 28px;
							width: 200px;
							box-sizing: border-box;
							margin-right: 8px;
						}
					}
					.map_button{
						display: inline-block;
						width:80px;
						height:30px;
						background:rgba(255,82,61,1);
						border-radius:15px;	
						color: #fff;
						line-height: 30px;
						font-size: 16px;
						text-align: center;
						margin-left: 12px;
					}
					.el-upload--picture-card{
						height: initial;
						width: initial;
						line-height:110px;
					}
					.avatar-uploader .el-upload {
						border: 1px dashed #d9d9d9;
						border-radius: 6px;
						cursor: pointer;
						position: relative;
						overflow: hidden;
					}
					.avatar-uploader .el-upload:hover {
						border-color: #409EFF;
					}
					.avatar-uploader-icon {
						font-size: 28px;
						color: #8c939d;
						width: 110px;
						height: 110px;
						line-height: 110px;
						text-align: center;
					}
					.avatar {
						width: 110px;
						height: 110px;
						display: block;
					}
					.store_img{
						width:620px;
						border:1px solid rgba(221,221,221,1);
						border-radius:6px;
						.outside_img{
							height: 110px;
							width: 110px;
							position: relative;
							font-size: 0;
							img{
								height: 110px;
								width: 110px;
								
							}
							.el-icon-circle-close{
								position:absolute;
								right: -5px;
								top: -5px;
								font-size: 18px;
								cursor: pointer;
								color: gray;
							}
						}
						.inside{
							border-top: 1px solid #ddd;
						}
						.outside{
							padding: 10px;
							box-sizing:border-box;
							align-items: flex-start;
							.mid{
								width: 270px;
								h3{
									font-size: 16px;
									color: #333;
									margin-top: 5px;
								}
								p{
									color: #666;
									font-size: 14px;
									line-height: 24px;
									margin-top: 5px;
								}
							}
							.eg{
								img{
									width: 180px;
									height: 110px;
								}
							}
						}
					}
					
				}
			}
			
			
		}
	}
</style>
