<template>
	<div class="workOsCustomer">
		<div class="workOsCustomer_top">
			<div class="login_nav">
				<div class="back" @click="back"></div>
				<div class="title">客户信息列表(<span>{{bcNum}}</span>)</div>
				<router-link class="addStaffData" :to="{name:'addCustomer'}" v-if="parentId!=0">
					<img src="../../assets/ali-add.png" alt="">
				</router-link>
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

				</div>
				<div class="customerTypeBox flex_r_f_s" v-if="parentId==0">
					<cube-select v-model="staffVal" :options="staffData" placeholder="员工" @change="getCustomer"></cube-select>
					<router-link :to="{name:'workOsPcMap'}">PC端链接</router-link>
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
				<router-link class="active" :to="{name:'workOsCustomer'}">信息列表</router-link>
				<router-link :to="{name:'workOsMap'}">地图详情</router-link>
			</div>

		</div>
		<div class="workOsCustomer_cnt" v-if="customerList.length>0">
			<cube-scroll ref="scroll" :options="options"  @pulling-up="onPullingUp" @pulling-down="onPullingDown">
			<ul class="listInfo">
				<li v-for="item in customerList">
					<div class="storeName">
						<!-- <a href="###"><img src="../../assets/ali-ed

						it.png" alt=""></a> -->
						<router-link class="flex_r_f_s" :to="{name:'editCustomer',params:{
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
							clientId:item.clientId,
							productTypeId:item.productTypeId,
							remark:item.remark
						}}">
							<span><b>{{item.shopName}}</b></span>
							<img src="../../assets/ali-edit.png" alt="">
						</router-link>
					</div>
					<div class="addr">
						{{item.province}}-{{item.city}}-{{item.area}}
					</div>
					<div class="addr flex_r_f_s">
						<a :href="'https://uri.amap.com/marker?position='+item.longitude+','+item.latitude+'&name='+item.address">{{item.address}}<img src="../../assets/icon/map@2x.png" alt=""></a>
					</div>
					<div class="addTime flex_r_s_b">
						<span class="span">添加日期:{{item.createTime}}</span>
						<cube-rate v-model="item.conditionId" :disabled="true" :max="5"></cube-rate>
					</div>
					<div class="customerType">
						<div class="colorType flex_r_s_b">
							<a style="background: #0093dd;"  v-if="item.clientTypeName=='重点客户'" :href="'https://uri.amap.com/marker?position='+item.longitude+','+item.latitude+'&name='+item.address">
								重点客户
							</a>
							<a style="background: #85c324;" v-if="item.clientTypeName=='优质客户'" :href="'https://uri.amap.com/marker?position='+item.longitude+','+item.latitude+'&name='+item.address">
								优质客户
							</a>
							<a style="background: #ef9b48;" v-if="item.clientTypeName=='一般客户'" :href="'https://uri.amap.com/marker?position='+item.longitude+','+item.latitude+'&name='+item.address">
								一般客户
							</a>
							<a style="background: #bb8fbb;" v-if="item.clientTypeName=='潜在客户'" :href="'https://uri.amap.com/marker?position='+item.longitude+','+item.latitude+'&name='+item.address">
								潜在客户
							</a>
							<a style="background: #aba9a9;" v-if="item.clientTypeName=='无效客户'" :href="'https://uri.amap.com/marker?position='+item.longitude+','+item.latitude+'&name='+item.address">
								无效客户
							</a>

						</div>
					</div>
					<div class="pdtext">产品类型:<span v-for="pItem in item.clientPTypeNames">{{pItem}}</span></div>
					<div class="remark" v-if="item.remark!=''">客户备注:{{item.remark}}</div>
					<div class="personCharge">负责人:{{item.businessName}}</div>
          <div class="visit">共{{item.visitNum}}条拜访记录 <span v-if="item.visitNum>0">最近{{item.newVisitTime}}更新</span><b @click="visitLink(item)">>></b></div>
				</li>

			</ul>
			</cube-scroll>
		</div>
		<div class="div1" v-show="customerList.length==0">
			<div class="tx">暂无数据</div>
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
				storeEnvironmen: [{value:'',text:'店铺星级'}],
				customerType: [{value:'',text:'客户类型'}],
				staffData:[{value:'-1',text:'选择员工'}],
				projectData:[{value:'',text:'产品类型'}],
				environmenVal: '',
				typeVal: '',
				projectTypeVal:'',
				staffVal:'',
				addressPicker: '',
				cityData: ['省份', '城市', '地区'],
				customerList:[],
				sheng:'',
				shi:'',
				qu:'',
				bcNum:'',
				page:0,
				starVal:5,
				shopName:'',
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
				parentId:'1',

			}
		},
		mounted() {
			// console.log(JSON.parse(localStorage.getItem('staff'))==null)
			if(JSON.parse(localStorage.getItem('staff'))== null){

				this.$router.push({
					name:'workOsLogin'
				})

			}else{
				console.log(JSON.parse(localStorage.getItem('staff')))
				this.addressPicker = this.$createCascadePicker({
					title: '城市选择',
					data: addressData,
					onSelect: this.selectHandle,
					onCancel: this.cancelHandle
				});
				this.name = JSON.parse(localStorage.getItem('staff')).name;
				this.parentId = JSON.parse(localStorage.getItem('staff')).parentId;
				if(this.parentId == 0){
					this.staffVal = '-1';
				}else{
					this.staffVal = JSON.parse(localStorage.getItem('staff')).staffId;
				}
				this.getCustomer();
				this.getCondition();
				this.getProjectType();
				this.getType();
				this.getStaff();
			}

			// console.log(JSON.parse(sessionStorage.getItem('staff')))
		},
		methods: {
			back() {
				this.$router.push({
					name:'workOsInfoList'
				});
			},
      visitLink(item){
        this.$router.push({
          name:'shopNameVisit',
          query:{
            visitInfo:{
              shopId:item.clientId,
              shopName:item.shopName
            }
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
					businessId:self.staffVal,
					province:self.sheng,
					city:self.shi,
					area:self.qu,
					conditionId:self.environmenVal,
					typeId:self.typeVal,
					pageNo:0,
					pageSize:10,
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
						setTimeout(() => {
							self.$refs.scroll.refresh();
							self.$refs.scroll.forceUpdate();
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
				this.cityData = selectedText;
				this.getCustomer();
			},
			cancelHandle() {

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
				if(this.cityData[1] == '城市'){
					this.shi = '';
				}
				if(this.cityData[2] == '市辖区'){
					this.qu = '';
				}
				this.page++;
				this.axios.post(Api.staffApi + '/business/selectBClientInfo', this.qs.stringify({
					businessId:self.staffVal,
					province:self.sheng,
					city:self.shi,
					area:self.qu,
					conditionId:self.environmenVal,
					typeId:self.typeVal,
					pageNo:self.page,
					productTypeId:self.projectTypeVal,
					pageSize:10
				}), {
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					}
				}).then((res) => {
					if (res.data.code == 1) {

						if (res.data.data.bClientVos.length > 0) {

							setTimeout(() => {
								res.data.data.bClientVos.forEach((e) => {
									self.customerList.push(e)
								});
								self.bcNum = res.data.data.bcNum;
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
			height: 380px;
			border-bottom: 4px solid #e8e8e8;
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
				.addStaffData {
					width: 40px;
					height: 40px;
					position: absolute;
					right: 20px;
					top: 50%;
					margin-top: -21px;

					img {
						width: 40px;
						height: 40px;
					}
				}
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
					a{
						font-size: 26px;
						// color: #ff523d;
						margin-left: 20px;
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
		.div1{
			.tx{
				font-size: 30px;
				color: #000;
				text-align: center;
				padding-top: 50px;
			}
		}
		.workOsCustomer_cnt {
			position: absolute;
			top: 380px;
			bottom: 0;
			left: 0;
			right: 0;
			padding: 0 20px;

			.listInfo{
				&>li{
					padding-top: 30px;
					.storeName{
						font-size: 34px;
						font-weight: bold;
						color: #333;
						a{
							color: #333;
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
							a{
								width: 120px;
								font-size: 22px;
								color: #fff;
								text-align: center;
								padding: 5px 0;
								border-radius: 20px;
							}
						}
					}

					.pdtext{
						padding-top: 20px;
						color: #999;
						font-size: 24px;
						span{
							margin-right: 10px;
						}
					}
					.remark{
						padding-top: 20px;
						color: #999;
						font-size: 24px;
						line-height: 32px;
					}
					.personCharge{
						color: #999;
						font-size: 24px;
						padding-top: 20px;

					}
          .visit{
            border-bottom: 1px dashed #e8e8e8;
            padding: 20px 0;
            font-size: 26px;
            color: #000;
            b{
              margin-left: 50px;
            }
          }
				}
			}
		}
	}
</style>
