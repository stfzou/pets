<template>
	<div class="addAddr">
		<div class="top_nav flex_r_s_b">
			<div class="back" @click="back"></div>
			<div class="nav_title">新增收货地址</div>
			<div class="text" @click="modify" v-if="isEdit">修改</div>
			<div class="text" @click="newAddr" v-else>完成</div>
			
		</div>
		<ul class="addAddr_list">
			<li class="flex_r_f_s">
				<div class="list_l">联系人</div>
				<input class="user_name" type="text" v-model="userName" placeholder="联系人姓名">
			</li>
			<li class="flex_r_f_s">
				<div class="list_l">手机号</div>
				<input class="phone" type="text" v-model="phone" placeholder="联系人号码">
			</li>
			<li class="flex_r_f_s list_bg" @click="addrMap">
				<div class="list_l">收货地址</div>
				<div class="mid">{{addr}}</div>
			</li>
			<li class="flex_r_f_s">
				<div class="list_l">门牌号</div>
				<input class="phone" type="text" v-model="houseNumber" placeholder="详细门牌号,例:2单元204">
			</li>
		</ul>
	</div>
</template>

<script>
	import Api from '../common/apj.js'
	export default{
		data(){
			return{
				phone:'',
				userName:'',
				addr:'',
				houseNumber:'',
				reg: /^1[3456789]\d{9}$/,
				txt:'新增收获地址',
				isEdit:false
				
			}
		},
		methods: {
			back() {
				this.$router.go(-1); //返回上一层
			
			},
			addrMap() {
				let self = this;
				this.$router.push({
					name:'confirmAddr',
					params:{
						phone:self.phone,
						userAddrId:self.$route.params.userAddrId,
						houseNumber:self.houseNumber,
						userName:self.userName
					}
					
				})
			},
			newAddr(){
				let self = this;
				console.log(self.$route.params)
				
				if(self.userName == ''){
					self.$createDialog({
						type: 'alert',
						title: `警告`,
						content:'请输入联系人姓名',
						icon: 'cubeic-warn'
					}).show()
					return false;
				}else if(self.phone == ''){
					self.$createDialog({
						type: 'alert',
						title: `警告`,
						content:'请输手机号码',
						icon: 'cubeic-warn'
					}).show()
					return false;
				}else if(!this.reg.test(this.phone)){
					self.$createDialog({
						type: 'alert',
						title: `警告`,
						content:'手机号码输入有误',
						icon: 'cubeic-warn'
					}).show()
					return false;
				}else if(this.addr == undefined){
					self.$createDialog({
						type: 'alert',
						title: `警告`,
						content:'请选择收获地址',
						icon: 'cubeic-warn'
					}).show()
					return false;
				}else if(self.houseNumber == ''){
					self.$createDialog({
						type: 'alert',
						title: `警告`,
						content:'请输入详细地址',
						icon: 'cubeic-warn'
					}).show()
					return false;
				}else{
					self.axios.post(Api.userApi+'/user/addUserAddr',self.qs.stringify({
						userId:JSON.parse(sessionStorage.getItem('user')).userId,
						addressTitle:self.addr,
						addrProvince:self.$route.params.province,
						addrCity:self.$route.params.city,
						addrArea:self.$route.params.district,
						address:self.houseNumber,
						isDefault:0,
						receivePhone:self.phone,
						receiveName:self.userName,
						latitude:self.$route.params.lat,
						longitude:self.$route.params.lng
					}), {
						headers: {
							'Content-Type': 'application/x-www-form-urlencoded',
							"token":'063EC71B3F82EAB5EC46C94E2803D6E6'
						}
					}).then((res)=>{
						if(res.data.code == 1){
							// console.log(res);
							self.$createDialog({
								type: 'alert',
								title: `成功`,
								content:'添加成功',
								icon: 'cubeic-right',
								onConfirm: () => {
								 
								  	self.$router.push({
								  		name:'userAddr'
								  	})
								  
								},
							}).show()
							
							
							
							
						}else{
							self.$createDialog({
								type: 'alert',
								title: `警告`,
								content:res.data.msg,
								icon: 'cubeic-warn'
							}).show()
							
						}
					})
					
				}
				
				
			},
			modify(){
				let self = this;
				self.axios.post(Api.userApi+'/user/updateAddr',self.qs.stringify({
					userId:JSON.parse(sessionStorage.getItem('user')).userId,
					addressTitle:self.addr,
					addrProvince:self.$route.params.province,
					addrCity:self.$route.params.city,
					addrArea:self.$route.params.district,
					address:self.houseNumber,
					isDefault:1,
					receivePhone:self.phone,
					receiveName:self.userName,
					latitude:self.$route.params.lat,
					longitude:self.$route.params.lng,
					userAddrId:self.$route.params.userAddrId
				}), {
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded',
						"token":'063EC71B3F82EAB5EC46C94E2803D6E6'
					}
				}).then((res)=>{
					if(res.data.code == 1){
						self.$createDialog({
							type: 'alert',
							title: `成功`,
							content:'修改成功',
							icon: 'cubeic-right',
							onConfirm: () => {
							 
							  	self.$router.push({
							  		name:'userAddr'
							  	})
							  
							},
						}).show()
					}else{
						self.$createDialog({
							type: 'alert',
							title: `警告`,
							content:res.data.msg,
							icon: 'cubeic-warn'
						}).show()
					}
				})
			}
		},
		mounted(){
			console.log(this.$route.params)
			this.addr = this.$route.params.addrName;
			this.phone = this.$route.params.phone;
			this.houseNumber = this.$route.params.houseNumber;
			this.userName = this.$route.params.userName;
			console.log(this.$route.params.userAddrId)
			if(this.$route.params.userAddrId == undefined){
				this.txt = '新增收货地址'
				this.isEdit = false;
			}else{
				this.txt = '修改收货地址'
				this.isEdit = true;
			}
		}
		
	}
</script>

<style lang="scss">
	@import '../../style/common.scss';
	@import '../../style/mixin.scss';
	.addAddr{
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
		.addAddr_list{
			padding: 0 20px;
			li{
				padding: 30px 0;
				border-bottom: 1px solid #e8e8e8;/*no*/
				.list_l{
					margin-right: 40px;
					width: 120px;
					font-size: 28px;
					color: #666;
				}
				input{
					border: none;
					outline:none;
					font-size: 28px;
					color: #999;
				}
				input:focus{ 
					outline:none; 
				}
				.mid{
					font-size: 28px;
					color: #000;
				}
			}
			.list_bg{
				background: url("../../assets/icon/right_sjx.png") no-repeat 100% center;
				background-size:16px;
			}
		}
	}
</style>
