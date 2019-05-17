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
						<input type="text" value="" />
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
						<input type="text" value="" />
					</div>
				</li>
				<li class="flex_r_f_s">
					<div class="list_l"><b>*</b>联系电话:</div>
					<div class="list_r">
						<input type="text" value="" />
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
					<div class="list_l"><b>*</b>店铺照片:</div>
					<div class="list_r">
						<div class="flex_r_f_s">
							<div class="uploadBox">
								<cube-upload ref="upload":action="action":simultaneous-uploads="1":process-file="processFile"@file-submitted="fileSubmitted" />
								<p>店外照片</p>
							</div>
							<div class="uploadBox">
								<cube-upload ref="upload":action="action":simultaneous-uploads="1":process-file="processFile"@file-submitted="fileSubmitted" />
								<p>店外照片</p>
							</div>
							<div class="uploadBox">
								<cube-upload ref="upload":action="action":simultaneous-uploads="1":process-file="processFile"@file-submitted="fileSubmitted" />
								<p>店外照片</p>
							</div>
						</div>
						
					</div>
				</li>
				<li>
					<div class="list_l"><b>*</b>地理位置:</div>
					<div class="list_r">
						<div class="customer_map">
							<el-amap ref="map" vid="amapDemo"  :zoom="15" class="amap-demo">
							
								<!-- <el-amap-marker :icon="require('../../assets/icon/map@2x.png')" vid="component-marker" :position="center"></el-amap-marker> -->
								
							</el-amap>
						</div>
					</div>
				</li>
			</ul>
			<div class="confirmBtn flex_r_s_c">确定</div>
		</div>
	</div>
</template>

<script>
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
			return{
				cityData: ['省份', '城市', '地区'],
				storeEnvironmen: ['一星级', '二星级', '三星级', '四星级', '五星级'],
				customerType: ['重点客户', '优质客户', '一般客户', '潜在客户', '无效客户'],
				environmenVal: '',
				typeVal: '',
				//图片上传
				 action: {
					target: '//jsonplaceholder.typicode.com/photos/',
					prop: 'base64Value'
				}
			}
		},
		mounted() {
			this.addressPicker = this.$createCascadePicker({
				title: '城市选择',
				data: addressData,
				onSelect: this.selectHandle,
				onCancel: this.cancelHandle
			});
			let upLoad = document.querySelector(".uploadBox input");
			upLoad.setAttribute("capture","camera");
		},
		methods:{
			back(){
				
			},
			showAddressPicker() {
				this.addressPicker.show()
			},
			selectHandle(selectedVal, selectedIndex, selectedText) {
				this.cityData = selectedText
			},
			cancelHandle() {
				this.$createToast({
					type: 'correct',
					txt: 'Picker canceled',
					time: 1000
				}).show()
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
			}
		}
	}
</script>

<style lang="scss">
	.addCustomer{
		.login_nav{
			height: 42px;
			padding: 22px 0;
			position: relative;
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
			padding: 0 20px;
			padding-bottom: 20px;
			li{
				padding: 20px 0;
			}
			.list_l{
				font-size: 26px;
				width: 180px;
				color: #333;
				b{
					color: #ff523d;
				}
			}
			.list_r{
				margin-left: 20px;
				&>input{
					border: 1px solid #e8e8e8;
					height: 50px;
					width: 390px;
					padding:0 10px
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
					p{
						text-align: center;
						font-size: 24px;
						color: #999;
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
