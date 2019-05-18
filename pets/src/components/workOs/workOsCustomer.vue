<template>
	<div class="workOsCustomer">
		<div class="workOsCustomer_top">
			<div class="login_nav">
				<div class="back" @click="back"></div>
				<div class="title">客户信息列表</div>
			</div>
			<div class="searchCriteria">
				<div class="region flex_r_f_s">
					<div class="sheng flex_r_s_b" @click="showAddressPicker" v-for="item in cityData">
						<span>{{item}}</span>
						<i class="cube-select-icon"></i>
					</div>
				</div>
				<div class="customerType flex_r_f_s">
					<cube-select v-model="environmenVal" :options="storeEnvironmen" placeholder="店铺环境"></cube-select>
					<cube-select v-model="typeVal" :options="customerType" placeholder="客户类型"></cube-select>
					<cube-select v-model="staffVal" :options="staffData" placeholder="员工"></cube-select>
				</div>
				<div class="search_box">
					<div class="search flex_r_s_b">
						<input type="text" placeholder="输入你要搜索的内容">
						<div class="sIcon flex_r_s_c">
							<img src="../../assets/ali-sousuo.png" alt="">
						</div>
					</div>
				</div>

			</div>
			<div class="workOsCustomer_nav">
				<router-link class="active" :to="{name:'workOsCustomer'}">信息列表</router-link>
				<router-link :to="{name:'workOsMap'}">地图详情</router-link>
			</div>
			<div class="line"></div>
		</div>
		<div class="workOsCustomer_cnt">
			<cube-scroll ref="scroll" :options="options"  @pulling-up="onPullingUp" @pulling-down="onPullingDown">
			<ul class="listInfo">
				<li v-for="item in customerList">
					<div class="storeName flex_r_f_s"><span>{{item.shopName}}</span>
						<!-- <a href="###"><img src="../../assets/ali-edit.png" alt=""></a> -->
						<router-link :to="{name:'editCustomer',params:{
							cityData:[item.province,item.city,item.area],
							addr:item.address,
							shopName:item.shopName,
							imgOne:item.storeImg,
							imgTwo:item.displayOneImg,
							imgThree:item.displayTwoImg,
							latitude:item.latitude,
							longitude:item.longitude,
							phone:item.phone,
							typeId:item.typeId,
							conditionId:item.conditionId,
							clientId:item.clientId
						}}">
							<img src="../../assets/ali-edit.png" alt="">
						</router-link>
					</div>
					<div class="addr flex_r_f_s">
						<span>{{item.address}}<img src="../../assets/icon/map@2x.png" alt=""></span>
						
					</div>
					<div class="addTime flex_r_s_b">
						<span class="span">添加日期:{{item.createTime}}</span>
						<cube-rate v-model="starVal" :disabled="true" :max="5"></cube-rate>
					</div>
					<div class="customerType">
						<div class="colorType flex_r_s_b">
							<span style="background: #0093dd;">重点客户</span>
							<span style="background: #85c324;">优质客户</span>
							<span style="background: #ef9b48;">一般客户</span>
							<span style="background: #bb8fbb;">潜在客户</span>
							<span style="background: #aba9a9;">无效客户</span>
						</div>
						
					</div>
					<div class="personCharge">负责人:{{name}}</div>
				</li>
					
			</ul>
			</cube-scroll>
		</div>
	</div>
</template>

<script>
	import Api from '../common/apj.js'
	import {provinceList,cityList,areaList} from '../../data/area'
	const addressData = provinceList
	addressData.forEach(province => {
		province.children = cityList[province.value]
		province.children.forEach(city => {
			city.children = areaList[city.value]
		})
	})
	export default {
		data() {
			return {
				storeEnvironmen: ['一星级', '二星级', '三星级', '四星级', '五星级'],
				customerType: ['重点客户', '优质客户', '一般客户', '潜在客户', '无效客户'],
				staffData:['张三','李四','王麻子'],
				environmenVal: '',
				typeVal: '',
				staffVal:'',
				addressPicker: '',
				cityData: ['省份', '城市', '地区'],
				customerList:[],
				sheng:'',
				shi:'',
				qu:'',
				page:0,
				starVal:5,
				name:'',
				options:{
					pullDownRefresh:{
						txt:'更新成功',
						threshold:40
					},
					pullUpLoad:{
						txt:{
							more: '加载更多', noMore: '没有更多数据了',
						},
						threshold:40,
						
					}
				},
			}
		},
		mounted() {
			this.addressPicker = this.$createCascadePicker({
				title: '城市选择',
				data: addressData,
				onSelect: this.selectHandle,
				onCancel: this.cancelHandle
			});
			this.getCustomer();
			this.name = JSON.parse(sessionStorage.getItem('staff')).name;
			// console.log(JSON.parse(sessionStorage.getItem('staff')))
		},
		methods: {
			back() {
				this.$router.go(-1);
			},
			getCustomer(){
				let self = this;
				if(this.cityData[0]=='省份'){
					this.sheng = '';
					this.shi = '';
					this.qu = ''
				}else{
					this.sheng = this.cityData[0];
					this.shi = this.cityData[1]
					this.qu = this.cityData[2]
				}
				this.axios.post(Api.staffApi + '/business/selectBClientInfo', this.qs.stringify({
					businessId:JSON.parse(sessionStorage.getItem('staff')).staffId,
					province:self.sheng,
					city:self.shi,
					area:self.qu,
					conditionId:self.environmenVal,
					typeId:self.typeVal,
					pageNo:0,
					pageSize:3
				}), {
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					}
				}).then((res) => {
					if (res.data.code == 1) {
						console.log(res)
						self.customerList = res.data.data;
						setTimeout(() => {
							this.$refs.scroll.refresh();
							this.$refs.scroll.forceUpdate();
						}, 1000)
					} else {
						alert(res.data.msg)
					}
				})
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
			onPullingDown() {
				// 模拟更新数据
			
				this.page = 0;
				this.getCustomer();
			
			},
			onPullingUp() {
				let self = this;
				if(this.cityData[0]=='省份'){
					this.sheng = '';
					this.shi = '';
					this.qu = ''
				}else{
					this.sheng = this.cityData[0];
					this.shi = this.cityData[1]
					this.qu = this.cityData[2]
				}
				this.page++;
				this.axios.post(Api.staffApi + '/business/selectBClientInfo', this.qs.stringify({
					businessId:JSON.parse(sessionStorage.getItem('staff')).staffId,
					province:self.sheng,
					city:self.shi,
					area:self.qu,
					conditionId:self.environmenVal,
					typeId:self.typeVal,
					pageNo:self.page,
					pageSize:3
				}), {
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					}
				}).then((res) => {
					if (res.data.code == 1) {
			
						if (res.data.data.length > 0) {
			
							setTimeout(() => {
								res.data.data.forEach((e) => {
									self.customerList.push(e)
								})
								self.$refs.scroll.forceUpdate();
								setTimeout(() => {
									self.$refs.scroll.refresh();
								}, 100)
							}, 500)
						} else {
			
							setTimeout(() => {
								self.$refs.scroll.forceUpdate();
							}, 500)
						}
			
					} else {
						alert(res.data.msg);
						setTimeout(() => {
							self.$refs.scroll.forceUpdate();
						}, 500)
					}
				})
			},
		}
	}
</script>

<style lang="scss">
	.workOsCustomer {
		height: 100%;
		position: relative;

		.workOsCustomer_top {
			height: 330px;
			.line{
				height: 4px;
				background: #e8e8e8;
				margin-top: 20px;
			}
			.login_nav {
				height: 42px;
				padding: 22px 0;
				position: relative;

				.back {
					background: url("../../assets/icon/backColory.png") no-repeat center 0;
					background-size: cover;
					width: 24px;
					height: 40px;
					position: absolute;
					left: 20px;
					top: 50%;
					margin-top: -21px;
				}

				.title {
					font-size: 30px;
					color: #333;
					line-height: 42px;
					text-align: center;
				}
			}

			.searchCriteria {
				padding: 0 20px;

				.region {
					div {
						padding: 5px 20px 5px 10px;
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
					padding-top: 20px;

					.cube-select {
						padding-top: 3px;
						padding-bottom: 3px;
						font-size: 26px;
						margin-right: 20px;
					}
				}

				.search_box {
					padding-top: 20px;

					.search {
						height: 48px;
						border: 1px solid #ff523d;
						/*no*/
						border-radius: 22px;
						padding-left: 10px;
						box-sizing: border-box;

						.sIcon {
							height: 48px;
							width: 80px;
							background: #ff523d;
							border-top-right-radius: 22px;
							border-bottom-right-radius: 22px;

							img {
								width: 30px;
							}
						}

						input {
							width: 85%;
						}
					}

				}
			}

			.workOsCustomer_nav {
				padding: 0 20px;
				padding-top: 20px;

				a {
					font-size: 24px;
					color: #333;
					margin-right: 20px;
				}
				.active{
					color: #ff523d;
				}
			}
		}

		.workOsCustomer_cnt {
			position: absolute;
			top: 330px;
			bottom: 0;
			left: 0;
			right: 0;
			padding: 0 20px;
			.listInfo{
				&>li{
					padding-top: 10px;
					.storeName{
						font-size: 28px;
						color: #333;
						a{
							img{
								width: 40px;
								margin-left: 10px;
							}
						}
					}
					.addr{
						padding-top: 10px;
						span{
							font-size: 24px;
							color: #999;
						}
						img{
							width: 20px;
							margin-left: 10px;
						}
					}
					.addTime{
						padding-top: 10px;
						.span{
							font-size: 24px;
							color: #999;
							padding-top: 10px;
						}
						.cube-rate-item{
							width: 25px;
						}
					}
					.customerType{
						padding-top: 20px;
						.colorType{
							span{
								width: 120px;
								background: red;
								font-size: 22px;
								color: #fff;
								text-align: center;
								padding: 5px 0;
								border-radius: 20px;
							}
						}
					}
					.personCharge{
						color: #999;
						font-size: 24px;
						padding-top: 20px;
						border-bottom: 1px dashed #e8e8e8;
						padding-bottom: 20px;
					}
				}
			}
		}
	}
</style>
