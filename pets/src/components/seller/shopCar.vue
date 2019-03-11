<template>
	<div class="shopcar_warp">
		<div class="top_nav flex_r_s_b">
			<div class="back" @click="back"></div>
			<div class="nav_title">购物车</div>
			<div class="text" @click="edit">{{text}}</div>
		</div>
		<div class="shopCart_list" v-if="shopCarData.length>0">
			<ul>
				<li v-for="item in shopCarData" :key="item.shopId">
					<div class="shopName_box flex_r_f_s">
						<div class="select_cir">
							<i class="cubeic-right" v-if="item.select" @click="shopCancel(item)"></i>
							<i class="cubeic-round-border" v-else  @click="shopSelect(item)"></i>
						</div>
						<div class="shopName flex_r_f_s">
							<img src="../../assets/icon_dianpu.png" alt="">
							<span>{{item.shopName}}</span>
						</div>
					</div>
					<div class="discount flex_r_f_s">
						<span class="discount_title flex_r_s_c">优惠</span>
						<span class="text">满99减5元</span>
					</div>
					<div class="goods_list">
						<div class="goods_item flex_r_f_e"  v-for="subItem in item.carPs" :key="subItem.carId">
							<!-- <cube-checkbox v-model="checked" @click.stop="selectCar"></cube-checkbox> -->
							<div class="goods_l select_cir">
								<i class="cubeic-round-border" v-if="subItem.isSelect == 0" @click="selectCar(subItem,item)"></i>
								<i class="cubeic-right" v-else @click="cancel(subItem,item)"></i>
							</div>
							<div class="mid">
								<img :src="subItem.skuImgAddr" alt="">
							</div>
							<div class="goods_r">
								<div class="goods_name">{{subItem.productName}}</div>
								<div class="parameter" v-if="subItem.anvs.length>0">
									
									<span v-for="(s,index) in subItem.anvs">{{s.avName|pNameFilter(index,subItem.anvs.length-1)}}</span>
								</div>
								<div class="activity">
									<div>
										<span>限时</span>
									</div>
									
								</div>
								<div class="price_box flex_r_s_b">
									<div class="price_l">
										<span class="new" v-if="subItem.activityPrice!=null">￥{{subItem.activityPrice}}</span>
										<span class="new" v-else>￥{{subItem.original}}</span>
										<span class="old" v-if="subItem.activityPrice!=null">￥{{subItem.original}}</span>
									</div>
									<div class="num_box flex_r_f_s">
										<div class="add flex_r_s_c" style="width: 33.333%;" @click="reduce(subItem)">
											<img src="../../assets/reduce.png" alt="">
										</div>
										<input style="width: 33.333%;" type="text" @change="number(subItem)" v-model="subItem.productNum">
										<div style="width: 33.333%;" class="reduce flex_r_s_c" @click="add(subItem)">
											<img src="../../assets/add.png" alt="">
										</div>
									</div>
								</div>
								
							</div>
						</div>
						
					</div>
				</li>
				
			</ul>
		</div>
		<div class="shopCart_foot flex_r_s_b">
			<div class="selct_all flex_r_f_s">
				<div class="select_cir">
					<i class="cubeic-right" v-if="allSelect" @click="cancelSelectAll"></i>
					<i class="cubeic-round-border" v-else @click="selectAll"></i>
				</div>
				<span class="text">全选</span>
			</div>
			<div class="count_price flex_r_s_b" v-if="conuntStatus">
				<div class="count_l">
					合计:￥{{price}}
				</div>
				<div class="count_btn flex_r_s_c" @click="settlement">
					去结算(0)
				</div>
			</div>
			<div v-else class="delete_btn flex_r_s_c" @click="deleteCar">
				删除选中
			</div>
		</div>
	</div>
</template>

<script>
	import Api from '../common/apj.js'
	export default{
		data(){
			return{
				checked:true,
				option: {
					label: '全选',
					value: 'optionValue',
					disabled: false
				},
				val:1,
				shopCarData:[],
				conuntStatus:true,
				text:'编辑',
				allSelect:false,
				price:''
				
			}
		},
		mounted() {
			
			this.getShopCar();
		},
		filters:{
			pNameFilter(val,index,arrl){
				
				if(arrl == index){
					return val;
				}else{
					return val+' ; '
				}
			},
		},
		methods: {
			back() {
				this.$router.go(-1);//返回上一层
			},
			edit(){
				this.conuntStatus = !this.conuntStatus;
				if(this.conuntStatus){
					this.text = '编辑'
				}else{
					this.text = '完成'
				}
			},
			add(subItem){
				let self = this;
				if(subItem.productNum >= subItem.reserve){
					self.$createDialog({
						type: 'alert',
						title: `警告`,
						content: '商品只有'+subItem.reserve+'件了哦',
						icon: 'cubeic-warn'
					}).show()
					subItem.productNum = subItem.productNum;
				}else{
					self.axios.post(Api.userApi+'/car/shopCarOperate',self.qs.stringify({
						shopId:subItem.shopId,
						productId:subItem.productId,
						skuId:subItem.skuId,
						userId:subItem.userId,
						num:1
					}), {
						headers: {
							'Content-Type': 'application/x-www-form-urlencoded'
							
						}
					}).then((res)=>{
						
						if(res.data.code == 1){
							subItem.productNum++
							subItem.skuImgId = subItem.productNum;
							self.upGetShopCar();
						}else{
							self.$createDialog({
								type: 'error',
								title: `失败`,
								content: res.data.msg,
								icon: 'cubeic-wrong'
							}).show()
						}
					})
				}
				
				
			},
			reduce(subItem){
				if(subItem.productNum<=1){
					console.log('不能再减了哦')
				}else{
					
					let self = this;
					self.axios.post(Api.userApi+'/car/shopCarOperate',self.qs.stringify({
						shopId:subItem.shopId,
						productId:subItem.productId,
						skuId:subItem.skuId,
						userId:subItem.userId,
						num:-1
					}), {
						headers: {
							'Content-Type': 'application/x-www-form-urlencoded'
						}
					}).then((res)=>{
						
						if(res.data.code == 1){
							subItem.productNum = subItem.productNum-1;
							subItem.skuImgId = subItem.productNum;
							self.upGetShopCar();
							console.log(self.shopCarData)
						}else{
							self.$createDialog({
								type: 'error',
								title: `失败`,
								content: res.data.msg,
								icon: 'cubeic-wrong'
							}).show()
						}
					})
				}
			},
			getShopCar(){
				let self = this;
				self.axios.post(Api.userApi+'/car/selectShopCar',self.qs.stringify({
					userId:31,
				}), {
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					}
				}).then((res)=>{
					
					if(res.data.code == 1){
						// self.shopCarData = res.data.data.carShops;
						console.log(res)
						self.allSelect = true;
						res.data.data.carShops.forEach((e)=>{
							self.shopCarData.push({
								carPs:e.carPs,
								select:true,
								shopId:e.shopId,
								shopImgAddr:e.shopImgAddr,
								shopName:e.shopName
							})
						})
						self.shopCarData.forEach((e)=>{
							// e.select = true;
							e.carPs.forEach((j)=>{
								j.skuImgId = j.productNum;
								if(j.isSelect == 0){
									e.select = false;
									self.allSelect = false;
								}
							})
						})
						self.price = Math.floor(res.data.data.selectPrice * 100) / 100;
						
					}else{
						console.log(res.data.msg)
					}
				})
			},
			upGetShopCar(){
				let self = this;
				self.axios.post(Api.userApi+'/car/selectShopCar',self.qs.stringify({
					userId:31,
				}), {
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					}
				}).then((res)=>{
					
					if(res.data.code == 1){
					
						self.price = res.data.data.selectPrice;
						console.log(res)
					}
				})
			},
			number(subItem){　
　　　 			subItem.productNum=subItem.productNum.replace(/[^\.\d]/g,'');
				subItem.productNum=subItem.productNum.replace('.','');
				if(subItem.productNum == ''||subItem.productNum == subItem.skuImgId){
					subItem.productNum = subItem.skuImgId;
				}else if(subItem.productNum>=subItem.reserve){
					this.$createDialog({
						type: 'alert',
						title: `警告`,
						content: '商品只有'+subItem.reserve+'件了哦',
						icon: 'cubeic-warn'
					}).show()
					subItem.productNum = subItem.skuImgId;
				}else{
					// subItem.skuImgId = subItem.productNum;
					let self = this;
					self.axios.post(Api.userApi+'/car/shopCarOperate',self.qs.stringify({
						shopId:subItem.shopId,
						productId:subItem.productId,
						skuId:subItem.skuId,
						userId:subItem.userId,
						num:subItem.productNum-subItem.skuImgId
					}), {
						headers: {
							'Content-Type': 'application/x-www-form-urlencoded'
						}
					}).then((res)=>{
						
						if(res.data.code == 1){
							// subItem.productNum = subItem.productNum-1;
							subItem.skuImgId = subItem.productNum;
							self.upGetShopCar();
						}else{
							self.$createDialog({
								type: 'error',
								title: res.data.msg,
								content: res.data.msg,
								icon: 'cubeic-wrong'
							}).show()
						}
					})
				}
　　		},
			selectCar(subItem,item){
				let self = this;
				self.axios.post(Api.userApi+'/car/updateShopSelect ',self.qs.stringify({
					carId:subItem.carId,
					select:1
				}), {
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					}
				}).then((res)=>{
					if(res.data.code == 1){
						self.upGetShopCar();
						subItem.isSelect = 1;
						item.select = true;
						self.allSelect = true;
						item.carPs.forEach((e)=>{
							
							if(e.isSelect == 0){
								item.select = false;
								return false;
							}
						})
						self.shopCarData.forEach((e)=>{
							e.carPs.forEach((j)=>{
								if(j.isSelect == 0){
									this.allSelect = false;
									return false;
								}
							})
						})
						
					}
				})
				
			},
			cancel(subItem,item){
				let self = this;
				self.axios.post(Api.userApi+'/car/updateShopSelect ',self.qs.stringify({
					carId:subItem.carId,
					select:0
				}), {
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					}
				}).then((res)=>{
					if(res.data.code == 1){
						self.upGetShopCar();
						subItem.isSelect = 0;
						item.select = false;
						self.allSelect = false;
					}
				})
				
			},
			shopSelect(item){
				
				let self = this;
				self.axios.post(Api.userApi+'/car/updateShopSelectAll',self.qs.stringify({
					shopId:item.carPs[0].shopId,
					select:1,
					userId:item.carPs[0].userId
				}), {
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					}
				}).then((res)=>{
					if(res.data.code == 1){
						self.upGetShopCar();
						item.select = true;
						self.allSelect = true;
						item.carPs.forEach((e)=>{
							e.isSelect = 1;
						})
						self.shopCarData.forEach((s)=>{
							s.carPs.forEach((j)=>{
								if(j.isSelect == 0){
									self.allSelect = false;
									return false;
								}
							})
						})
					}
				})
				
				
			},
			shopCancel(item){
				let self = this;
				
				self.axios.post(Api.userApi+'/car/updateShopSelectAll',self.qs.stringify({
					shopId:item.carPs[0].shopId,
					select:0,
					userId:item.carPs[0].userId
				}), {
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					}
				}).then((res)=>{
					if(res.data.code == 1){
						self.upGetShopCar();
						item.select = false;
						self.allSelect = false;
						item.carPs.forEach((e)=>{
							e.isSelect = 0;
						})
						
					}
				})
				
				
			},
			selectAll(){
				let self = this;
				self.axios.post(Api.userApi+'/car/updateShopSelectAll',self.qs.stringify({
					shopId:-1,
					select:1,
					userId:24
				}), {
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					}
				}).then((res)=>{
					if(res.data.code == 1){
						self.allSelect = true;
						self.upGetShopCar();
						self.shopCarData.forEach((e)=>{
							e.select = true;
							e.carPs.forEach((j)=>{
								j.isSelect = 1;
							})
						})
						
					}
				})
				
			},
			cancelSelectAll(){
				let self = this;
				self.axios.post(Api.userApi+'/car/updateShopSelectAll',self.qs.stringify({
					shopId:-1,
					select:0,
					userId:24
				}), {
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					}
				}).then((res)=>{
					if(res.data.code == 1){
						self.allSelect = false;
						self.upGetShopCar();
						self.shopCarData.forEach((e)=>{
							e.select = false;
							e.carPs.forEach((j)=>{
								j.isSelect = 0;
							})
						})
						
					}
				})
			},
			deleteCar(){
				let clearCarData = [];
				let self = this;
				if(this.allSelect){
					self.axios.post(Api.userApi+'/car/deleteShopCar',self.qs.stringify({
						userId:24
					}), {
						headers: {
							'Content-Type': 'application/x-www-form-urlencoded'
						}
					}).then((res)=>{
						if(res.data.code == 1){
							self.shopCarData = [];
							self.getShopCar();
							// window.location.search+100*Math.random()
						}
					})
				}else{
					this.shopCarData.forEach((e)=>{
						
						e.carPs.forEach((j)=>{
							if(j.isSelect == 1){
								clearCarData.push(j.carId)
							}
						})
					})
					self.axios.post(Api.userApi+'/car/deleteShopSkus',self.qs.stringify({
						carIds:clearCarData.join(',')
					}), {
						headers: {
							'Content-Type': 'application/x-www-form-urlencoded'
						}
					}).then((res)=>{
						if(res.data.code == 1){
							self.shopCarData = [];
							self.getShopCar();
							// window.location.search+100*Math.random()
						}
					})
				}
				
			},
			settlement(){
				let self = this;
				let isHttp = false;
				self.shopCarData.forEach((e)=>{
					e.carPs.forEach((j)=>{
						if(j.isSelect == 1){
							isHttp = true;
							return false;
						}
					})
				})
				
				if(isHttp){
					self.axios.post(Api.userApi+'/order/orderSettlement',self.qs.stringify({
					
						userId:31
						
					}), {
						headers: {
							'Content-Type': 'application/x-www-form-urlencoded'
						}
					}).then((res)=>{
						if(res.data.code == 1){
							self.$router.push({
								name:'orderAccounts'
							})
						}else{
							self.$createDialog({
								type: 'alert',
								title: `警告`,
								content:res.data.msg,
								icon: 'cubeic-warn'
							}).show()
						}
					})
				}else{
					self.$createDialog({
						type: 'alert',
						title: `警告`,
						content:'请选择要结算的商品',
						icon: 'cubeic-warn'
					}).show()
				}
				
			}
		},
	}
</script>

<style lang="scss">
	@import '../../style/common.scss';
	@import '../../style/mixin.scss';
	.shopcar_warp{
		padding: 88px 0 86px 0;
		
		.top_nav {
			padding: 0 20px;
			height: 88px;
			box-sizing: border-box;
			position: relative;
			border-bottom: 1px solid #FF523D;
			position: fixed;
			left: 0;
			top: 0;
			background: #fff;
			z-index: 1000;
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
		.select_cir{
			.cubeic-round-border{
				font-size: 24px;/*no*/
				color: #e8e8e8;
			}
			.cubeic-right{
				color: #FF523D;
				font-size: 24px;/*no*/
			}
		}
		.shopCart_list{
			ul{
				li{
					border-bottom: 10px solid #e8e8e8;
					
					.shopName_box{
						padding: 0 20px;
						height: 86px;
						box-sizing: border-box;
						border-bottom: 1px solid #e8e8e8;/*no*/
						.shopName{
							margin-left: 30px;
							width: 280px;
							background: url('../../assets/icon/right_sjx.png') no-repeat 100% center;
							padding-right: 20px;
							background-size: 15px;
							img{
								width: 46px;
								// height: 46px;
								margin-right: 14px;
							}
							span{
								font-size: 28px;
								color: #000;
							}
						}
					}
					
					.discount{
						height: 60px;
						background: #ffefed;
						box-sizing: border-box;
						font-size: 24px;
						padding: 0 20px;
						.discount_title{
							width:80px;
							height:36px;
							border:1px solid rgba(255,82,61,1);
							border-radius:6px;
							color: #FF523D;
						}
						.text{
							color: #666;
							margin-left: 24px;
						}
					}
					.goods_list{
						padding: 0 20px;
						.goods_item{
							padding: 30px 0;
							border-top: 1px solid #e8e8e8;/*no*/
							
							.mid{
								img{
									width: 104px;
									margin: 0 30px;
								}
							}
							.goods_r{
								.goods_name{
									font-size: 26px;
									color: #000;
									line-height: 38px;
								}
								.parameter{
									font-size: 22px;
									color: #666;
									line-height: 34px;
								}
								.activity{
									height: 30px;
									margin: 20px 0;
									span{
										background: #c271fe;
										color: #fff;
										border-radius: 5px;
										padding:2px 4px;
									}
								}
								.price_box{
									.price_l{
										width: 210px;
										.new{
											font-size: 28px;
											color: #FF523D;
										}
										.old{
											font-size: 24px;
											color: #666;
											margin-left: 20px;
											text-decoration: line-through;
										}
									}
									.num_box{
										width: 160px;
										height: 44px;
										border-radius: 40px;
										background: #FF523D;
										div{
											img{
												width: 24px;
											}
										}
										input{
											height: 40px;
											text-align: center;
											color: #FF523D;
											font-size: 24px;
											outline: none;
											
										}
										.add{
											height: 40px;
										}
									}
								}
							}
						}
						.goods_item:first-child{
							border: none;
						}
					}
					
						
				}
			}
		}
		.shopCart_foot{
			height: 86px;
			border-top: 1px solid #FF523D;/*no*/
			padding: 0 20px;
			box-sizing: border-box;
			position: fixed;
			left: 0;
			bottom: 0;
			width: 100%;
			background: #fff;
			.selct_all{
				.text{
					font-size: 28px;
					color: #000;
					margin-left: 20px;
				}
			}
			.count_price{
				width: 390px;
				.count_l{
					font-size: 28px;
					color: #000;
					width: 200px;
				}
				.count_btn{
					width: 180px;
					height: 70px;
					color: #fff;
					font-size: 28px;
					background:linear-gradient(90deg, #fe8071, #ffb160, #ffaf60, #ff7660);
					border-radius:7px;
				}
				
			}
			.delete_btn{
				width: 180px;
				height: 70px;
				border: 1px solid #FF523D;/*no*/;
				border-radius:7px;
				color: #FF523D;
				font-size: 28px;
				
			}
		}
	}
</style>
