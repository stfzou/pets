<template>
	<div class="sellerInfo">
		<ul class="seller_info_list">
			<li>
				<p>商家名称<span>*</span></p>
				<div class="list_r">
					<input class="active_input" type="text" placeholder="请与门店照片上的名称保持一致" />
				</div>
			</li>
			<li>
				<p>联系人姓名<span>*</span></p>
				<div class="list_r">
					<input type="text" placeholder="请输入联系人姓名" />
				</div>
			</li>
			<li>
				<p>联系人电话<span>*</span></p>
				<div class="list_r">
					<input class="gray_bg" type="text" readonly="readonly" value="13123456789" />
				</div>
			</li>
			<li>
				<p>经营品类<span>*</span></p>
				<div class="list_r">
					<el-select
						v-model="varieties"
						multiple
						filterable
						allow-create
						default-first-option
						placeholder="请选择经营品类(可多选)">
						<el-option
						  v-for="item in varietiesData"
						  :key="item.value"
						  :label="item.label"
						  :value="item.value">
						</el-option>
					 </el-select>
				</div>
			</li>
			<li>
				<p>所在城市<span>*</span></p>
				<div class="list_r">
					<VDistpicker></VDistpicker>
				</div>
			</li>
			<li>
				<p>详细地址<span>*</span></p>
				<div class="list_r">
					<input id="input_id" v-model="searchMap" class="active_input" type="text" placeholder="请输入详细街道名称和门牌号，请与执照地址一致">
					<span class="map_button pointer">去定位</span>
				</div>
			</li>
			<li>
				<p></p>
				<div class="list_r map_r">
					<div class="amap-page-container">
					
					  <el-amap vid="amap" zoom="14" :plugin="plugin" class="amap-demo" :center="mapCenter">
						  
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
							<el-upload
							  class="avatar-uploader"
							  action="https://jsonplaceholder.typicode.com/posts/"
							  :show-file-list="false"
							  :on-success="handleAvatarSuccess"
							  :before-upload="beforeAvatarUpload">
							  <img v-if="sellerInfo.outImg" :src="sellerInfo.outImg" class="avatar">
							  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
							</el-upload>
							<div class="mid">
								<h3>门店照片</h3>
								<p>需拍出完整门框、门匾（建议正对门脸2米处拍摄）</p>
							</div>
							<div class="eg">
								<img src="../assets/condition/shili01.png" alt="">
							</div>
						</div>
						<div class="outside inside flex_r_s_b">
							<el-upload
							class="avatar-uploader"
							action="https://jsonplaceholder.typicode.com/posts/"
							:show-file-list="false"
							:on-success="handleAvatarSuccess"
							:before-upload="beforeAvatarUpload">
							<img v-if="sellerInfo.outImg" :src="sellerInfo.outImg" class="avatar">
							<i v-else class="el-icon-plus avatar-uploader-icon"></i>
							</el-upload>
							<div class="mid">
								<h3>店内照片</h3>
								<p>需真实反映店内环境（商品货架、美容室、收银台等）</p>
							</div>
							<div class="eg">
								<img src="../assets/condition/shili01.png" alt="">
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
							<el-upload
							class="avatar-uploader"
							action="https://jsonplaceholder.typicode.com/posts/"
							:show-file-list="false"
							:on-success="handleAvatarSuccess"
							:before-upload="beforeAvatarUpload">
							<img v-if="sellerInfo.outImg" :src="sellerInfo.outImg" class="avatar">
							<i v-else class="el-icon-plus avatar-uploader-icon"></i>
							</el-upload>
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
		<div class="pointer next_btn">点击进入下一步</div>
		
	</div>
</template>

<script>

	import VDistpicker from 'v-distpicker'
	export default {
		components: { VDistpicker },
		data() {
			const self = this;
			return {
				varietiesData: [{
				  value: '商品销售',
				  label: '商品销售'
				}, {
				  value: '医疗救护',
				  label: '医疗救护'
				}, {
				  value: '美容护理',
				  label: '美容护理'
				}, {
				  value: '犬场猫舍',
				  label: '犬场猫舍'
				},{
				  value: '摄影婚配',
				  label: '摄影婚配'
				},{
				  value: '培训院校',
				  label: '培训院校'
				},{
				  value: '寄养看护',
				  label: '寄养看护'
				},{
				  value: '小宠爬虫',
				  label: '小宠爬虫'
				},{
				  value: '花鸟水族',
				  label: '花鸟水族'
				},{
				  value: '训练基地',
				  label: '训练基地'
				},{
				  value: '其他',
				  label: '其他'
				}
				],
				markers:{
					 dragend: (e) => {
						var geocoder = new AMap.Geocoder();
						self.lng = e.lnglat.lng;
						self.lat = e.lnglat.lat;
						self.mapCenter = [self.lng, self.lat];
						
						//地理逆编码
						geocoder.getAddress(self.mapCenter, function(status, result) {
								
								if (status === 'complete' && result.info === 'OK') {
									// result为对应的地理位置详细信息
									
									self.searchMap = result.regeocode.formattedAddress
								}
						  })
					}
				},
				varieties: [],
				province: "",
				mapCenter: [121.59996, 31.197646],
				area: "",
				sellerInfo:{
					outImg:'',
					inImg:'',
					logo:''
				},
				searchOption: {
					city: '',
					citylimit: true
				},
				searchMap:'',
				lng: 0,
				lat: 0,
				loaded: false,
				plugin: [{
				  enableHighAccuracy: true,//是否使用高精度定位，默认:true
				  timeout: 100,          //超过10秒后停止定位，默认：无穷大
				  maximumAge: 0,           //定位结果缓存0毫秒，默认：0
				  convert: false,           //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
				  showButton: true,        //显示定位按钮，默认：true
				  buttonPosition: 'RB',    //定位按钮停靠位置，默认：'LB'，左下角
				  showMarker: true,        //定位成功后在定位到的位置显示点标记，默认：true
				  showCircle: true,        //定位成功后用圆圈表示定位精度范围，默认：true
				  panToLocation: true,     //定位成功后将定位到的位置作为地图中心点，默认：true
				  zoomToAccuracy:true,//定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：f
				  extensions:'all',
				  pName: 'Geolocation',
				  events: {
					init(o) {
					  // o 是高德地图定位插件实例
					  o.getCurrentPosition((status, result) => {
						//console.log(result)
						
						if (result && result.position) {
						  self.searchOption.city = result.addressComponent.city;
						  self.lng = result.position.lng;
						  self.lat = result.position.lat;
						  self.mapCenter = [self.lng, self.lat];
						  self.loaded = true;
						  self.$nextTick();
						}
					  });
					}
				  }
				},{
					pName:'Autocomplete',
					input:'input_id',
					events:{
						init(o){
							
							o.search(self.searchMap, function(status, result) {
								// 搜索成功时，result即是对应的匹配数据
								
							})
 							AMap.event.addListener(o, "select", function(e){
 								console.log(e)
								self.lng = e.poi.location.lng;
								self.lat = e.poi.location.lat;
								self.mapCenter = [self.lng, self.lat];
								self.searchMap = e.poi.name;
 							});
						}
					}
					
					
				},{
					pName:'Geocoder',
					events:{
						init(o){
							
						}
					}
				}]
				//
			};
		},
		methods: {
			  handleAvatarSuccess(res, file) {
				this.outImg = URL.createObjectURL(file.raw);
			  },
			  beforeAvatarUpload(file) {
				const isJPG = file.type === 'image/jpeg';
				const isLt2M = file.size / 1024 / 1024 < 2;

				if (!isJPG) {
				  this.$message.error('上传头像图片只能是 JPG 格式!');
				}
				if (!isLt2M) {
				  this.$message.error('上传头像图片大小不能超过 2MB!');
				}
				 return isJPG && isLt2M;
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
				}
				
			
		//
		}
	}
</script>

<style lang="scss">
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
			.search-box {
				position: absolute;
				top: 25px;
				left: 20px;
			}
			.amap-page-container {
				position: relative;
				height: 300px;
			}
			.selectMarke{
				width: 50px;
				height: 50px;
				background: red;
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

			.search-box {
			  position: absolute;
			  top: 25px;
			  left: 20px;
			}

			.amap-page-container {
			  position: relative;
			}
			li{
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
