<template>
	<div class="confirmAddr">
		<div class="top_nav flex_r_s_b">
			<div class="back" @click="back"></div>
			<div class="nav_title">确认收货地址</div>
		</div>
		<div class="amap-page-container">

			<el-amap ref="map" vid="amapDemo" :center="center" :zoom="zoom" :plugin="plugin" class="amap-demo">

				<el-amap-marker :icon="require('../../assets/icon/map@2x.png')" vid="component-marker" :position="center"></el-amap-marker>

			</el-amap>
			<input type="text" id="map_input" placeholder="小区/写字楼/学校等" v-model="serchText">
		</div>
		<ul id="serch_list">
			<cube-scroll ref="scroll">
				<li v-for="(item,index) in searchList" @click="paramsLink(item)" :key="index">
					<div class="name">
						{{item.name}}
					</div>
					<div class="address">
						{{item.address}}
					</div>

				</li>

			</cube-scroll>
		</ul>
	</div>
</template>

<script>
	export default {
		data() {
			let self = this;
			return {
				center: [104.0647600000, 30.5702000000],
				zoom: 14,
				lat: '',
				lng: '',
				city: '', //市
				province: '', //省
				district: '', //区
				activeIndex: 0,
				serchText: '',
				searchList: [],
				plugin: [{
						pName: 'Autocomplete',
						input: 'map_input',
						datatype: 'poi',
						city: '',
						events: {
							select(e) {
								// console.log(e)
								// let self = this;
															
								self.center = [e.poi.location.lng,e.poi.location.lat]
								 var geocoder = new AMap.Geocoder({
									radius: 1000,
									extensions: "all"
								  }); 
								  geocoder.getAddress([e.poi.location.lng ,e.poi.location.lat], function(status, result) {
									if (status === 'complete' && result.info === 'OK') {
									  if (result && result.regeocode) {
										console.log(result)
										self.city = result.regeocode.addressComponent.city;
										self.province = result.regeocode.addressComponent.province;
										self.district = result.regeocode.addressComponent.district;
										self.$router.push({
											name:'addAddr',
											params:{
												addrName:e.poi.name,
												lat:e.poi.location.lat,
												lng:e.poi.location.lng,
												city:self.city,
												province:self.province,
												district:self.district,
												userAddrId:self.$route.params.userAddrId,
												houseNumber:self.$route.params.houseNumber,
												phone:self.$route.params.phone,
												userName:self.$route.params.userName
											}
										})
									  }
									}
									}); 
							},

						}
					},
					{
						pName: 'Geolocation',
						enableHighAccuracy: true, //是否使用高精度定位，默认:true
						timeout: 100, //超过10秒后停止定位，默认：无穷大
						maximumAge: 0, //定位结果缓存0毫秒，默认：0
						convert: true, //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
						showButton: true, //显示定位按钮，默认：true
						buttonPosition: 'RB', //定位按钮停靠位置，默认：'LB'，左下角
						showMarker: false, //定位成功后在定位到的位置显示点标记，默认：true
						showCircle: false, //定位成功后用圆圈表示定位精度范围，默认：true
						panToLocation: true, //定位成功后将定位到的位置作为地图中心点，默认：true
						zoomToAccuracy: true, //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：f
						extensions: 'all',
						events: {
							init(o) {
								// o 是高德地图定位插件实例
								o.getCurrentPosition((status, result) => {


									if (result && result.position) {
										self.lng = result.position.lng;
										self.lat = result.position.lat;
										self.center = [self.lng, self.lat];
										self.searchList = result.pois;
										self.plugin[0].city = result.addressComponent.city
										self.city = result.addressComponent.city;
										self.province = result.addressComponent.province;
										self.district = result.addressComponent.district;
										console.log(result)
										// self.nearbyData = result.pois.slice(0,5);
									}
								});
							}
						}
					}
				],

			}
		},
		mounted() {

			let h = document.documentElement.clientHeight - document.querySelector("#serch_list").offsetTop;
			document.querySelector("#serch_list").style.height = h + 'px';
		},
		methods: {
			back() {
				this.$router.go(-1); //返回上一层
			},
			paramsLink(item) {
				let self = this;
				this.$router.push({
					name: 'addAddr',
					params: {
						addrName: item.name,
						lat: item.location.lat,
						lng: item.location.lng,
						city: self.city,
						province: self.province,
						district: self.district,
						userAddrId:self.$route.params.userAddrId,
						houseNumber:self.$route.params.houseNumber,
						phone:self.$route.params.phone,
						userName:self.$route.params.userName
					}
				})
			},
			
		},
	}
</script>

<style lang="scss">
	.confirmAddr {

		.top_nav {
			padding: 0 20px;
			height: 88px;
			box-sizing: border-box;
			position: relative;
			border-bottom: 1px solid #FF523D;

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

		.amap-demo {
			height: 600px;
		}

		.amap-page-container {
			position: relative;

			input:focus {
				outline: none;
			}

			#map_input {
				width: 660px;
				height: 60px;
				text-align: center;
				border-radius: 40px;
				position: absolute;
				background: #fff url("../../assets/icon/icon-search@2x.png") no-repeat 600px center;
				background-size: 32px;
				font-size: 28px;
				left: 50%;
				margin-left: -330px;
				top: 22px;
			}
		}

		#serch_list {
			padding: 0 20px;

			li {
				padding: 30px 0;
				border-bottom: 1px solid #e8e8e8;

				/*no*/
				.name {
					background: url('../../assets/icon/map@2x.png') no-repeat 0 center;
					background-size: 18px;
					padding-left: 28px;
					font-size: 28px;
					color: #000;
				}

				.address {
					font-size: 24px;
					color: #666;
					margin-top: 10px;
					padding-left: 28px;
				}

				.active_name {
					color: #FF523D;
				}
			}

		}
	}
</style>
