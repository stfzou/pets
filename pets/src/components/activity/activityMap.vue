<template>
	<div class="activity_map">

		<div class="amap-page-container">

			<el-amap ref="map" vid="amapDemo" :center="center" :zoom="zoom" class="amap-demo">

				<el-amap-marker :icon="require('../../assets/icon/map@2x.png')" vid="component-marker" :position="center" :events="markers.events"></el-amap-marker>
				
			</el-amap>

		</div>
		<i class="cubeic-close close" @click="back"></i>
	</div>
</template>

<script>
	export default {
		data() {
			let self = this;
			return {
				center: [],
				zoom: 14,
				markers:{
					events: {
						click: () => {
							var ua = window.navigator.userAgent.toLowerCase();
							if (ua.match(/MicroMessenger/i) == 'micromessenger') {
								alert('点击右上角用浏览器打开进行导航');
							}else{
								window.location.href = 'https://uri.amap.com/marker?position='+self.center[0]+','+self.center[1]+'&name='+self.name;
							}
							
						},
					},
				},
				name:''
			}
		},
		mounted() {
			let self = this;
			let mapInfo = this.getUrlData();
 			this.center = [mapInfo.lng, mapInfo.lat];
 			this.name = mapInfo.name;
			console.log(mapInfo)
		},
		methods: {
			back() {
				this.$router.go(-1); //返回上一层
			},
			getUrlData() { // 截取url中的数据
			
				let tempStr = window.location.href
				/**
				 * tempArr 是一个字符串数组 格式是["key=value", "key=value", ...]
				 */
				let tempArr = tempStr.split('?')[1] ? tempStr.split('?')[1].split('&') : []
				/**
				 * returnArr 是要返回出去的数据对象 格式是 { key: value, key: value, ... }
				 */
				let returnArr = {}
				tempArr.forEach(element => {
					returnArr[element.split('=')[0]] = element.split('=')[1]
				})
				/*输出日志*/
				return returnArr;
				
			
			},
		},
	}
</script>

<style lang="scss">
	.activity_map {
		position: fixed;
		height: 100%;
		width: 100%;
		left: 0;
		top: 0;

		.close {
			position: absolute;
			left: 20px;
			top: 20px;
			font-size: 50px;
			color: gray;
		}

		.amap-demo {
			height: 100%;
		}

		.amap-page-container {
			position: relative;
			height: 100%;

			input:focus {
				outline: none;
			}

		}


	}
</style>
