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
					<cube-select v-model="staffVal" :options="staffData"  @change="listChange"></cube-select>
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
				<el-amap ref="map" vid="amapDemo" :center="center" :zoom="13" class="amap-demo" :plugin="plugin">
					<!-- <el-amap-text v-for="text in texts" :text="text.text" :offset="text.offset" :position="text.position" :events="text.events"></el-amap-text> -->
					<el-amap-text v-for="(item,index) in customerList" :key="item.clientId" :text="item.shopName" :position="[item.longitude,item.latitude]"></el-amap-text>
					<el-amap-marker v-for="(item,index) in customerList" :key="index" :icon="item.clientTypeIcom" :events="events"
					vid="component-marker" :position="[item.longitude,item.latitude]" @click="markClick"></el-amap-marker>
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
				events: {
					click: (e) => {

					  self.$createDialog({
						type: 'confirm',
						icon: 'cubeic-alert',
						content: '是否导航到该位置？',
						confirmBtn: {
						  text: '确定',
						  active: true,
						  disabled: false,
						  href: 'javascript:;'
						},
						cancelBtn: {
						  text: '取消',
						  active: false,
						  disabled: false,
						  href: 'javascript:;'
						},
						onConfirm: () => {
						  // window.location.href = 'https://uri.amap.com/marker?position='+e.lnglat.lng+','+e.lnglat.lat+'&name=' ';
						  window.open("https://uri.amap.com/marker?position="+e.lnglat.lng+","+e.lnglat.lat+"&name= ")

						},

					  }).show()
					}
				},
				storeEnvironmen: [{value:'',text:'全部星级'}],
				customerType: [{value:'',text:'全部类型'}],
				staffData:[],
				projectData:[{value:'',text:'全部产品'}],
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
        businessId:'',
				plugin: [

					{
						pName: 'Geolocation',
						enableHighAccuracy: true,//是否使用高精度定位，默认:true
						timeout: 10000,          //超过10秒后停止定位，默认：无穷大
						maximumAge: 0,           //定位结果缓存0毫秒，默认：0
						convert: true,           //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
						showButton: true,        //显示定位按钮，默认：true
						buttonPosition: 'RB',    //定位按钮停靠位置，默认：'LB'，左下角
						showMarker: false,        //定位成功后在定位到的位置显示点标记，默认：true
						showCircle: false,        //定位成功后用圆圈表示定位精度范围，默认：true
						panToLocation: true,     //定位成功后将定位到的位置作为地图中心点，默认：true
						zoomToAccuracy:false,//定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：f
						extensions:'all',
						useNative:true,
						events: {
							init(o) {
								// o 是高德地图定位插件实例
								o.getCurrentPosition((status, result) => {

									if (result && result.position) {
										self.center = [result.position.lng,result.position.lat];
									}
								});
							}
						}
					}
				]
			}
		},
		mounted() {
      let self = this;
			if(JSON.parse(localStorage.getItem('staff'))== null){

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

				this.name = JSON.parse(localStorage.getItem('staff')).name;
				this.parentId = JSON.parse(localStorage.getItem('staff')).parentId;
				this.staffVal = JSON.parse(localStorage.getItem('staff')).staffId;
				if(this.parentId == 0){
					this.staffVal = '-1';
				  this.businessId = '-1';
				  this.staffData.push({
				    value:'-1',
				    text:'全部'
				  });
				}else{
					this.staffVal = JSON.parse(localStorage.getItem('staff')).staffId;
				  this.viewCompetence = JSON.parse(localStorage.getItem('staff')).viewCompetence;

				  if(this.viewCompetence!=''){
				    this.businessId = this.viewCompetence+','+this.staffVal;
				    this.staffData = [{value:self.businessId,text:'全部'},{value:self.staffVal,text:'自己'}]
				  }else{
				    this.businessId = this.staffVal;
				    this.staffData=[{value:self.staffVal,text:'自己'}]
				  }
				}
				this.getCustomer();
				this.getCondition();
				this.getType();
				this.getProjectType();
				this.getStaffName();


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
      listChange(val){
        this.businessId = val;
        this.getCustomer();
      },
			markClick(){
				alert('11111')
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
			getStaffName(){//获取员工名字
			  let self = this;
			  if(this.staffVal === '-1'){
			    this.axios.get(Api.staffApi+'/business/selectStaffAll',{
			    		headers: {
			    			'Content-Type': 'application/x-www-form-urlencoded'
			    		}
			    	}).then(function(res) {
			         if(res.data.code == 1){
			            console.log(res.data.data)
			            res.data.data.forEach((e)=>{
			              self.staffData.push({
			                value:e.id,
			                text:e.name
			              })
			            })

			         }else{
			           alert(res.data.msg)
			         }
			    	})
			  }else if(self.viewCompetence!=''){
			     // alert(self.staffId)
			    this.axios.get(Api.staffApi+'/business/selectStaffByCompetence?viewCompetence='+self.viewCompetence,{
			    		headers: {
			    			'Content-Type': 'application/x-www-form-urlencoded'
			    		}
			    	}).then(function(res) {
			         if(res.data.code == 1){
			            console.log(res.data.data)
			            res.data.data.forEach((e)=>{
			              self.staffData.push({
			                value:e.id,
			                text:e.name
			              })
			            })

			         }else{
			           alert(res.data.msg)
			         }
			    	})
			  }else{
			    this.staffData = [{value:self.staffVal,text:'自己'}]
			  }


			},
			showAddressPicker() {
				this.addressPicker.show()
			},
			selectHandle(selectedVal, selectedIndex, selectedText) {
				this.cityData = selectedText;
				let self = this;
				if(selectedText[1] == '城市'){
					new AMap.DistrictSearch({
						level: 'country',
						subdistrict: 3
					}).search(selectedText[0],function(status, result){
						console.log(result)
						self.center=[result.districtList[0].center.lng,result.districtList[0].center.lat]
					});
				}else{
					new AMap.DistrictSearch({
						level: 'country',
						subdistrict: 3
					}).search(selectedText[1],function(status, result){
						console.log(result)
						self.center=[result.districtList[0].center.lng,result.districtList[0].center.lat]
					});
				}

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
				if(this.cityData[1] == '城市'){
					this.shi = '';
				}
				if(this.cityData[2] == '市辖区'){
					this.qu = '';
				}
				this.axios.post(Api.staffApi + '/business/selectBClientInfo', this.qs.stringify({
					businessId:self.businessId,
					province:self.sheng,
					city:self.shi,
					area:self.qu,
					conditionId:self.environmenVal,
					typeId:self.typeVal,
					pageNo:0,
					pageSize:100,
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
							font-size: 26px;
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
