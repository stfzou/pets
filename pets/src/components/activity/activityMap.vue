<template>
	<div class="activity_map">
		
		<div class="amap-page-container">

			<el-amap ref="map" vid="amapDemo" :center="center" :zoom="zoom" class="amap-demo">

				<el-amap-marker :icon="require('../../assets/icon/map@2x.png')" vid="component-marker" :position="center"></el-amap-marker>

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
				zoom: 14
			}
		},
		mounted() {
			let self = this;
			this.center = [self.$route.params.lng,self.$route.params.lat] ;
			console.log(this.center)
			// console.log(self.$route.params)
		},
		methods: {
			back() {
				 this.$router.go(-1); //返回上一层
// 				this.$router.push({
// 					name:'activity',
// 					query:{
// 						id:'2'
// 					}
// 				})
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
		.close{
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
