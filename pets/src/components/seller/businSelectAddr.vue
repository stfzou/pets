<template>
	<div class="businSelectAddr">
		<div class="top_nav flex_r_s_b">
			<div class="back"></div>
			<div class="nav_title">选择收货地址</div>
			<div class="text">新增地址</div>
		</div>
		<div class="nearby_addr">
			<div class="title">附近地址</div>
			<ul v-if="nearbyData.length>0">
				<li class="flex_r_f_s" v-for="(item,index) in nearbyData" :key="index">
					<img src="../../assets/icon/map@2x.png" alt="">
					<span>{{item.name}}</span>
				</li>
				
			</ul>
			<div class="tx" v-else="">定位附近地址失败，请点击新增地址页面增加新地址</div>
		</div>
		<div class="amap-page-container" v-show="false">
			<el-amap ref="map" vid="amapDemo" :zoom="zoom" :plugin="plugin" class="amap-demo">
			</el-amap>

		</div>
	</div>
</template>

<script>
	export default {
		
		data() {
			let self = this;
			return {
				zoom: 12,
				nearbyData:[],
				lng:'',
				lat:'',
				plugin: [

					{
						pName: 'Geolocation',
						enableHighAccuracy: true,//是否使用高精度定位，默认:true
						timeout: 100,          //超过10秒后停止定位，默认：无穷大
						maximumAge: 0,           //定位结果缓存0毫秒，默认：0
						convert: true,           //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
						showButton: true,        //显示定位按钮，默认：true
						buttonPosition: 'RB',    //定位按钮停靠位置，默认：'LB'，左下角
						showMarker: true,        //定位成功后在定位到的位置显示点标记，默认：true
						showCircle: true,        //定位成功后用圆圈表示定位精度范围，默认：true
						panToLocation: true,     //定位成功后将定位到的位置作为地图中心点，默认：true
						zoomToAccuracy:true,//定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：f
					    extensions:'all',
						events: {
							init(o) {
								// o 是高德地图定位插件实例
								o.getCurrentPosition((status, result) => {
									
									console.log(result)
									if (result && result.position) {
// 										self.lng = result.position.lng;
// 										self.lat = result.position.lat;
// 										self.center = [self.lng, self.lat];
// 										self.loaded = true;
// 										self.$nextTick();
										console.log(result)
										self.nearbyData = result.pois.slice(0,5);
									}
								});
							}
						}
					}
				]

			}
		}
	}
</script>

<style lang="scss">
	@import '../../style/common.scss';
	@import '../../style/mixin.scss';

	.businSelectAddr {
		.amap-demo {
			height: 300px;
		}

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

			.text {
				font-size: 26px;
				color: #FF523D;
			}
		}

		.nearby_addr {
			.title {
				font-size: 24px;
				color: #999;
				padding: 0 20px;
				padding-top: 20px;
			}
			.tx{
				text-align: center;
				padding: 50px 20px;
				font-size: 36px;
				color: #333;
				line-height: 50px;
				
			}
			ul {
				padding: 0 20px;

				li {
					padding: 30px 0;
					border-bottom: 1px solid #e8e8e8;

					/*no*/
					img {
						width: 20px;
					}

					span {
						font-size: 28px;
						color: #000;
						margin-left: 10px;
					}
				}
			}
		}
	}
</style>
