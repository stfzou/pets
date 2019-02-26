<template>
	<div class="confirmAddr">
		<div class="top_nav flex_r_s_b">
			<div class="back" @click="back"></div>
			<div class="nav_title">确认收货地址</div>
		</div>
		<div class="amap-page-container">
			<el-amap ref="map" vid="amapDemo" :center="center" :zoom="zoom" :plugin="plugin" class="amap-demo" :events="events">
				<el-amap-marker :icon="require('../../assets/icon/map@2x.png')"  vid="component-marker" :position="center"></el-amap-marker>
				
			</el-amap>
			<input type="text" id="map_input" placeholder="小区/写字楼/学校等" v-model="serchText">
		</div>
		<ul id="serch_list">
			<cube-scroll ref="scroll">
			<li v-for="(item,index) in searchList">
				<div class="name" :class="{active_name:index == activeIndex}">
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
				center:[104.0647600000, 30.5702000000],
				zoom: 14,
				city: '',
				activeIndex:0,
				serchText:'',
				searchList:[],
				plugin: [{
					pName: 'Autocomplete',
					input: 'map_input',
					city: '',
					events: {
						select(e){
							console.log(e)
						}
					}
				},{
					pName:'PlaceSearch',
					events:{
						init(o){
							o.searchNearBy('',self.center,2000,function(status,result){
								
								self.searchList = result.poiList.pois;
							})
						}
					}
				}],
				events: {
					init: (o) => {
						
						o.getCity(result => {
							console.log(result)
							self.plugin[0].city = result.city
							setTimeout(()=>{
								 self.$refs.scroll.refresh();
							},200)
						})
					},
				}
			}
		},
		mounted() {
			
			let h = document.documentElement.clientHeight - document.querySelector("#serch_list").offsetTop;
			document.querySelector("#serch_list").style.height = h+'px';
		},
		methods: {
			back(){
				this.$router.go(-1);//返回上一层
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
			height: 720px;
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
		#serch_list{
			padding: 0 20px;
			li{
				padding: 30px 0;
				border-bottom: 1px solid #e8e8e8;/*no*/
				.name{
					background: url('../../assets/icon/map@2x.png') no-repeat 0 center;
					background-size: 18px;
					padding-left: 28px;
					font-size: 28px;
					color: #000;
				}
				.address{
					font-size: 24px;
					color: #666;
					margin-top: 10px;
					padding-left: 28px;
				}
				.active_name{
					color: #FF523D;
				}
			}
			
		}
	}
</style>
