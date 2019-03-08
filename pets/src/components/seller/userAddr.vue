<template>
	<div class="userAddr">
		<div class="top_nav flex_r_s_b">
			<div class="back" @click="back"></div>
			<div class="nav_title">选择收货地址</div>
			<div class="text" @click="newAddr">新增地址</div>
		</div>
		<ul class="userAddr_list">
			<li v-for="(item,index) in addrData">
				<div class="user_name">
					<span>{{item.receiveName}}</span>
					<span class="phone">{{item.receivePhone}}</span>
				</div>
				<div class="address">
					{{item.addrProvince}}{{item.addrCity}}{{item.addrArea}}{{item.addressTitle}}
				</div>
				<div class="select_box flex_r_s_b">
					<div class="select_l flex_r_s_b" @click="setDefaultAddr(item)">
						<div class="cir" :class="{active_cir:item.userAddrId == defaultIndex}"></div>
						<span>默认地址</span>
					</div>
					<div class="select_r flex_r_s_b">
						<div class="edit flex_r_f_e" @click="edit(item)"><img src="../../assets/edit.png" alt=""><span>编辑</span></div>
						<div class="delete flex_r_f_e" @click="maskShow(item)"><img src="../../assets/delete.png" alt=""><span>删除</span></div>
					</div>
				</div>
			</li>
			
		</ul>
		<div class="mask flex_r_s_c" v-if="isMask" @click.stop = "maskHide">
			<div class="mask_cnt" @click.stop>
				<h3>删除地址</h3>
				<p>确定删除地址?</p>
				<div class="msk_btn flex_r_f_s">
					<span class="cancel" @click="maskHide">取消</span>
					<span class="confirm" @click="confirmDelete">确定</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Api from '../common/apj.js'
	export default{
		data(){
			return{
				isMask:false,
				addrData:[],
				defaultIndex:'',
				deleteAddrData:''
			}
		},
		mounted(){
			this.getAddr();
			// console.log(this.$router.query.id)
			
		},
		methods: {
			maskHide() {
				this.isMask = false;
			},
			maskShow(item){
				this.isMask = true;
				this.deleteAddrData = item;
			},
			back() {
				this.$router.go(-1); //返回上一层
			},
			newAddr(){
				this.$router.push({
					name:'addAddr'
				})
			},
			confirmDelete(){
				let self = this;
				console.log(self.deleteAddrData)
				self.axios.post(Api.userApi+'/user/deleteAddr',self.qs.stringify({
					userAddrId:self.deleteAddrData.userAddrId
				}), {
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded',
						"token":'063EC71B3F82EAB5EC46C94E2803D6E6'
					}
				}).then((res)=>{
					if(res.data.code == 1){
						self.isMask = false;
						self.deleteAddrData = '';
						self.getAddr();
					}
				})
			},
			getAddr(){
				let self = this;
				self.axios.post(Api.userApi+'/user/selectUserAddr',self.qs.stringify({
					userId:29,
				}), {
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded',
						"token":'063EC71B3F82EAB5EC46C94E2803D6E6'
					}
				}).then((res)=>{
					if(res.data.code == 1){
						console.log(res)
						self.addrData = res.data.data;
						self.addrData.forEach((e)=>{
							if(e.isDefault == 1){
								self.defaultIndex = e.userAddrId;
								return false;
							}
						})
					}
				})
			},
			setDefaultAddr(item){
				let self = this;
				if(self.defaultIndex == item.userAddrId){
					let toast = this.$createToast({
						txt: '已经是默认地址了',
						type: 'warn',
						time: 500,
					  })
					toast.show()
				}else{
					self.axios.post(Api.userApi+'/user/updateAddrDefault',self.qs.stringify({
						userId:29,
						userAddrId:item.userAddrId
					}), {
						headers: {
							'Content-Type': 'application/x-www-form-urlencoded',
							"token":'063EC71B3F82EAB5EC46C94E2803D6E6'
						}
					}).then((res)=>{
						if(res.data.code == 1){
							self.defaultIndex = item.userAddrId;
							self.$router.push({
								name:self.$route.query.name
							})

						}
					})
				}
				
			},
			edit(item){
// 				let selectData = item;
// 				sessionStorage.setItem('editAddr', JSON.stringify(selectData));
				let self = this;
				self.$router.push({
					name:'addAddr',
					params:{
						addrName:item.addressTitle,
						lat:item.latitude,
						lng:item.longitude,
						city:item.addrCity,
						province:item.addrProvince,
						district:item.addrArea,
						userAddrId:item.userAddrId,
						userName:item.receiveName,
						houseNumber:item.address,
						phone:item.receivePhone
					}
				})
			}
		},
	}
</script>

<style lang="scss">
	@import '../../style/common.scss';
	@import '../../style/mixin.scss';
	.userAddr{
		padding-top: 88px;
		.cube-toast .cube-popup-content{
			background-color: rgba(0,0,0,0.6)
		}
		.top_nav {
			padding: 0 20px;
			height: 88px;
			box-sizing: border-box;
			position:fixed;
			border-bottom: 1px solid #FF523D;
			background: #fff;
			left: 0;
			top: 0;
			z-index: 100;
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
		.line{
			@include line;
		}
		.mask{
			height: 100%;
			width: 100%;
			position: fixed;
			box-sizing: border-box;
			left: 0;
			top: 0;
			background: rgba(0,0,0,0.6);
			.mask_cnt{
				height: 240px;
				background: #fff;
				border-radius: 10px;
				position: absolute;
				width: 90%;
				padding:40px 20px;
				box-sizing: border-box;
				h3{
					font-size: 32px;
					color: #000;
				}
				p{
					font-size: 26px;
					color: #666;
					margin: 40px 0;
				}
				.msk_btn{
					justify-content:flex-end;
					.cancel{
						margin-right: 50px;
					}
					span{
						font-size: 26px;
						color: #FF523D;
					}
				}
			}
		}
		.userAddr_list{
			li{
				padding: 0 20px;
				border-bottom: 10px solid #e8e8e8;
				.user_name{
					font-size: 28px;
					color: #000;
					padding: 30px 0;
					.phone{
						margin-left: 106px;
					}
				}
				.address{
					font-size: 26px;
					color: #666;
					padding-bottom: 30px;
					border-bottom: 1px solid #e8e8e8;/*no*/
				}
				.select_box{
					padding: 20px 0;
					.select_l{
						width: 150px;
						.cir{
							width: 30px;
							height: 30px;
							border-radius: 50%;
							border: 1px solid #e8e8e8;/*no*/
							box-sizing: border-box;
						}
						.active_cir{
							background:url('../../assets/select.png') no-repeat center 0;
							background-size:100%;
							border: none;
						}
						span{
							color: #666;
							font-size: 26px;
						}
						.active_span{
							color: #FF523D;
						}
					}
					.select_r{
						width: 210px;
						.edit{
							width: 100px;
							color: #FF523D;
							font-size: 26px;
							img{
								width: 30px;
							}
						}
						.delete{
							width: 100px;
							color: #FF523D;
							font-size: 26px;
							img{
								width: 28px;
							}
						}
					}
					
				}
			}
			
		}
	}
</style>
