<template>
	<div class="workOsMap">
		<div class="workOsCustomer_top">
			<div class="login_nav">
				<div class="back" @click="back"></div>
				<div class="title">客户信息列表(<span>{{bcNum}}</span>)</div>
			</div>
			<div class="searchCriteria">
				<div class="region flex_r_f_s">
					<div class="sheng flex_r_s_b" @click="showAddressPicker" v-for="item in cityData">
						<span>{{item}}</span>
						<i class="cube-select-icon"></i>
					</div>
				</div>
				<div class="customerType flex_r_f_s">
					<cube-select v-model="environmenVal" :options="storeEnvironmen" placeholder="店铺环境" @change="getCustomer"></cube-select>
					<cube-select v-model="typeVal" :options="customerType" placeholder="客户类型" @change="getCustomer"></cube-select>
					<cube-select v-model="projectTypeVal" :options="projectData" placeholder="产品类型" @change="getCustomer"></cube-select>
					<!-- <cube-select v-model="staffVal" :options="staffData" placeholder="员工" v-if="parentId==0" @change="getCustomer"></cube-select> -->
				</div>
				<div class="customerTypeBox">
					<cube-select v-model="staffVal" :options="staffData" placeholder="员工" v-if="parentId==0" @change="getCustomer"></cube-select>
				</div>
				<div class="search_box">
					<div class="search flex_r_s_b">
						<input type="text" placeholder="输入你要查询的店铺名字" v-model="shopName">
						<div class="sIcon flex_r_s_c" @click="getCustomer">
							<img src="../../assets/ali-sousuo.png" alt="">
						</div>
					</div>
				</div>

			</div>
			<div class="workOsCustomer_nav">
				<router-link  :to="{name:'workOsCustomer'}">信息列表</router-link>
				<router-link class="active" :to="{name:'workOsMap'}">地图详情</router-link>
			</div>
			
		</div>
		<div class="workOsCustomer_cnt">
			<div class="workOsCustomer_map">
				<el-amap ref="map" vid="amapDemo" :center="center" :zoom="15" class="amap-demo" :plugin="plugin">
				
					<el-amap-marker v-for="(item,index) in customerList" :key="index" :icon="item.clientTypeIcom" vid="component-marker" :position="[item.longitude,item.latitude]"></el-amap-marker>
					<!-- <el-amap-marker v-for="item in customerList" :icon="item.clientTypeIcom" vid="component-marker" :position="[item.latitude,item.longitude]"></el-amap-marker> -->
				</el-amap>
			</div>
		</div>
	</div>
</template>

<script>
	import Api from '../common/apj.js'
	import {provinceList,cityList,areaList} from '../../data/area'
	import {AMapManager} from "vue-amap"
	let amapManager=new AMapManager();
	const addressData = provinceList
	addressData.forEach(province => {
		province.children = cityList[province.value]
		province.children.forEach(city => {
			city.children = areaList[city.value]
		})
	})
	export default {
		data() {
			let self = this;
			return {
				center:[116.397428, 39.90923],
				storeEnvironmen: [{value:'',text:'店铺星级'}],
				customerType: [{value:'',text:'客户类型'}],
				staffData:[{value:'-1',text:'选择员工'}],
				projectData:[{value:'',text:'产品类型'}],
				environmenVal: '',
				projectTypeVal:'',
				shopName:'',
				typeVal: '',
				staffVal:'',
				addressPicker: '',
				cityData: ['省份', '城市', '地区'],
				starVal:5,
				customerList:[],
				sheng:'',
				shi:'',
				qu:'',
				page:0,
				name:'',
				parentId:'2',
				bcNum:'',
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
									
									if (result && result.position) {
										self.center = [result.position.lng,result.position.lat]
										
									}
								});
							}
						}
					}
				]
			}
		},
		mounted() {
			if(JSON.parse(sessionStorage.getItem('staff'))== null){
				
				this.$router.push({
					name:'workOsLogin'
				})
				
			}else{
				this.addressPicker = this.$createCascadePicker({
					title: '城市选择',
					data: addressData,
					onSelect: this.selectHandle,
					onCancel: this.cancelHandle
				});
				
				this.name = JSON.parse(sessionStorage.getItem('staff')).name;
				this.parentId = JSON.parse(sessionStorage.getItem('staff')).parentId;
				this.staffVal = JSON.parse(sessionStorage.getItem('staff')).staffId;
				
				if(this.parentId == 0){
					this.staffVal = '-1';
				}else{
					this.staffVal = JSON.parse(sessionStorage.getItem('staff')).staffId;
				}
				
				this.getCustomer();
				this.getCondition();
				this.getType();
				this.getProjectType();
				this.getStaff();
				
				
			}
			
			//let upLoad = document.querySelector(".upPic input");
			//upLoad.setAttribute("capture","camera");
		},
		methods: {
			back() {
				this.$router.push({
					name:'workOsInfoList'
				});
			},
			getProjectType(){
				let self = this;
				this.axios.post(Api.staffApi + '/business/selectBClientPTypeAll', this.qs.stringify({
					
				}), {
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					}
				}).then((res)=>{
					if(res.data.code == 1){
						// self.customerType = res.data.data;
						
						res.data.data.forEach((e)=>{
							self.projectData.push({
								value:e.typeId,
								text:e.name
							})
						})
						
					}else{
						alert(res.data.msg);
					}
				})
			},
			getStaff(){
				let self = this;
				this.axios.post(Api.staffApi + '/business/selectBusinessStaffAll', this.qs.stringify({
					pageNo:0,
					pageSize:100
				}), {
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					}
				}).then((res)=>{
					if(res.data.code == 1){
						// self.storeEnvironmen = res.data.data;
						
						res.data.data.forEach((e)=>{
							self.staffData.push({
								value:e.id,
								text:e.name
							})
						})
					}else{
						alert(res.data.msg);
					}
				})
			},
			showAddressPicker() {
				this.addressPicker.show()
			},
			selectHandle(selectedVal, selectedIndex, selectedText) {
				this.cityData = selectedText;
				let self = this;
				new AMap.DistrictSearch({
					level: 'country',
					subdistrict: 1
				}).search(selectedText[1],function(status, result){
					console.log(result)
					self.center=[result.districtList[0].center.lng,result.districtList[0].center.lat]
				});
				this.getCustomer();
			},
			cancelHandle() {
				this.$createToast({
					type: 'correct',
					txt: 'Picker canceled',
					time: 1000
				}).show()
			},
		
			getCondition(){
				let self = this;
				this.axios.post(Api.staffApi + '/business/selectBShopsConditionAll', this.qs.stringify({
					
				}), {
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					}
				}).then((res)=>{
					if(res.data.code == 1){
						// self.storeEnvironmen = res.data.data;
						
						res.data.data.forEach((e)=>{
							self.storeEnvironmen.push({
								value:e.conditionId,
								text:e.name
							})
						})
					}else{
						alert(res.data.msg);
					}
				})
			},
			getType(){
				let self = this;
				this.axios.post(Api.staffApi + '/business/selectBShopsTypeAll', this.qs.stringify({
					
				}), {
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					}
				}).then((res)=>{
					if(res.data.code == 1){
						// self.customerType = res.data.data;
						res.data.data.forEach((e)=>{
							self.customerType.push({
								value:e.typeId,
								text:e.name,
								icon:e.typeIcon
							})
						})
					}else{
						alert(res.data.msg);
					}
				})
			},
			getCustomer(){
				this.page = 0;
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
					businessId:this.staffVal,
					province:self.sheng,
					city:self.shi,
					area:self.qu,
					conditionId:self.environmenVal,
					typeId:self.typeVal,
					pageNo:0,
					pageSize:3,
					shopName:self.shopName,
					productTypeId:self.projectTypeVal
				}), {
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					}
				}).then((res) => {
					if (res.data.code == 1) {
						console.log(res)
						self.customerList = res.data.data.bClientVos;
						self.bcNum = res.data.data.bcNum;
					} else {
						alert(res.data.msg)
					}
				})
			},
		
			
		
		}
	}
</script>

<style lang="scss">
	.workOsMap {
		height: 100%;
		position: relative;

		.workOsCustomer_top {
			height: 380px;
			.line{
				height: 4px;
				background: #e8e8e8;
				margin-top: 20px;
			}
			.login_nav {
				height: 42px;
				padding: 22px 0;
				position: relative;
				border-bottom: 1px solid #e8e8e8;
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
					span{
						color: #ff523d;
					}
				}
			}

			.searchCriteria {
				padding: 0 20px;
				padding-top: 20px;
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
						margin-right: 10px;
						width: 200px;
					}
				}
				.customerTypeBox{
					padding-top: 10px;
					.cube-select {
						padding-top: 3px;
						padding-bottom: 3px;
						font-size: 26px;
						width: 200px;
					}
				}
				.search_box {
					padding-top: 10px;

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
			top: 380px;
			bottom: 0;
			left: 0;
			right: 0;
			
			.workOsCustomer_map{
				height: 100%;
			}
		}
	}
</style>
