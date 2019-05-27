<template>
	<div class="addStaff">
		<div class="login_nav">
			<div class="back" @click="back"></div>
			<div class="title">添加员工信息</div>
		</div>
		<div class="addCustomer_list">
			<ul>
				<li class="flex_r_f_s">
					<div class="list_l"><b>*</b>员工姓名:</div>
					<div class="list_r">
						<input type="text" v-model="staffName" />
					</div>
				</li>
				<li class="flex_r_f_s">
					<div class="list_l"><b>*</b>手机号码:</div>
					<div class="list_r">
						<input type="text" v-model="phone"/>
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
					<div class="list_l"><b>*</b>登录密码:</div>
					<div class="list_r">
						<input type="password" v-model="pwd"/>
					</div>
				</li>
			</ul>
			<div class="confirmBtn flex_r_s_c" @click="addStaff"><cube-loading :size="28" v-if="loading"></cube-loading><span v-else>确定</span></div>
		</div>
	</div>
</template>

<script>
	import {provinceList,cityList,areaList} from '../../data/area'
	import Api from '../common/apj.js'
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
				staffName:'',
				pwd:'',
				phone:'',
				reg: /^1[3456789]\d{9}$/,
				loading:false
			}
		},
		mounted() {
			this.addressPicker = this.$createCascadePicker({
				title: '城市选择',
				data: addressData,
				onSelect: this.selectHandle,
				onCancel: this.cancelHandle
			});
			
		},
		methods:{
			back(){
				this.$router.push({
					name:'workOsInfoList'
				});
			},
			showAddressPicker() {
				this.addressPicker.show()
			},
			selectHandle(selectedVal, selectedIndex, selectedText) {
				this.cityData = selectedText;
				console.log(selectedText)
			},
			cancelHandle() {
				
			},
			addStaff(){
				let self = this;
				if(this.staffName == ''){
					let toast = this.$createToast({
						txt: '请填写员工姓名',
						type: 'error'
					  })
					toast.show()
					return false;
				}else if (this.phone == '') {
							
					let toast = this.$createToast({
						txt: '手机号不能为空',
						type: 'error'
					  })
					toast.show()
					return false;
				}else if (!this.reg.test(this.phone)) {
							
					let toast = this.$createToast({
						txt: '手机号格式错误',
						type: 'error'
					  })
					toast.show()
					return false;
				}else if(this.cityData[0] == '省份'){
					let toast = this.$createToast({
						txt: '请填写省市区',
						type: 'error'
					  })
					toast.show()
				}else if (this.pwd == '') {
							
					let toast = this.$createToast({
						txt: '密码不能为空',
						type: 'error'
					  })
					toast.show()
					return false;
				}else{
					self.loading = true;
					this.axios.post(Api.staffApi+'/business/addBusinessStaff', this.qs.stringify({
						phone: this.phone,
						password: this.pwd,
						name:this.staffName,
						province:this.cityData[0],
						city:this.cityData[1],
						area:this.cityData[2],
						parentId:JSON.parse(localStorage.getItem('staff')).staffId
					}), {
						headers: {
							'Content-Type': 'application/x-www-form-urlencoded'
						}
					}).then((res)=>{
						if(res.data.code == 1){
							setTimeout(()=>{
								let toast = this.$createToast({
									txt: '提交成功',
									type: 'correct'
								  })
								toast.show();
								self.loading = false;
								self.$router.push({
									name:'staffInfo'
								})
								
							},500)
							
						}else{
							alert(res.data.msg);
							self.loading = false;
						}
					})
				}
			}
			
		}
	}
</script>

<style lang="scss">
	.addStaff{
		.login_nav{
			height: 42px;
			padding: 22px 0;
			position: relative;
			border-bottom: 1px solid #e8e8e8;
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
				width: 130px;
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
					padding:0 10px;
					font-size: 26px;
				}
				.region {
					div {
						padding: 6px 20px 6px 10px;
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
				
				
			}
			.confirmBtn{
				color: #fff;
				font-size: 30px;
				width: 500px;
				height: 60px;
				background: #ff523d;
				border-radius: 50px;
				margin: 0 auto;
				margin-top: 50px;
			}
		}
	}
</style>
