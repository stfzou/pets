<template>
	<div class="seller_info_warp">
		<div class="seller_info">
			<h2>商家信息</h2>
			<div class="seller_pic">
				<img v-show="shopImgFacade" :src="item.imgAddr" alt="" v-for="(item,index) in shopImgFacade">
				<img v-show="shopImgInStore" :src="item.imgAddr" alt="" v-for="(item,index) in shopImgInStore">

			</div>
			<div class="text">
				商家简介：{{desc}}。
			</div>
		</div>
		<div class="line"></div>
		<div class="seller_info_list">
			<div class="flex_r_s_b">
				<span>商家名称</span>
				<span>{{shopName}}</span>
			</div>
			<div class="flex_r_s_b">
				<span>经营品类</span>
				<span>商品销售</span>
			</div>
			<div class="flex_r_s_b">
				<span>商家地址</span>
				<span>{{shopAddress}}</span>
			</div>
			<div class="flex_r_s_b none">
				<span>经营时间</span>
				<span>{{startTime}}-{{endTime}}</span>
			</div>
		</div>
		<div class="line"></div>
		<div class="zizhi">
			<div class="flex_r_s_b">
				<span>经营资质</span>
				<i class="cubeic-arrow"></i>
			</div>

		</div>
	</div>
</template>

<script>
	import Api from '../common/apj.js'
	export default {
		data() {
			return {
				desc:'',
				shopName:'',
				shopAddress:'',
				startTime:'',
				endTime:'',
				shopImgFacade:'',
				shopImgInStore:''
			};
		},
		mounted() {
			this.getInfo()
		},
		methods:{
			getInfo(){
				let self = this;
				self.axios.post(Api.shopApi+'/webShop/getShopsWholeById',self.qs.stringify({
					shopId:JSON.parse(localStorage.getItem('user')).shopId
				}), {
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					}
				}).then((res)=>{
					if(res.data.code == 1){
						let re = res.data.data;
						self.desc = re.shopDesc;
						self.shopName = re.shopName;
						self.shopAddress = re.shopAddress;
						self.startTime = re.startTime;
						self.endTime = re.endTime;
						self.shopImgFacade = re.shopImgFacade;
						self.shopImgInStore = re.shopImgInStore;
						console.log(self.shopImgFacade)
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	@import '../../style/mixin.scss';
	.seller_info_warp{
		.seller_info{
			padding:20px;
			h2{
				font-size: 28px;
				color: #000;
				margin-bottom: 16px;
			}
			.seller_pic{
				font-size: 0;
				margin-bottom: 16px;
				img{
					height: 150px;
					width: 150px;
					border-radius: 6px;
					margin-right: 16px;
					margin-top: 10px;
				}

			}
			.text{
				color: #000;
				line-height: 36px;
				font-size: 26px;
			}
		}
		.line{
			@include line;
		}
		.seller_info_list{
			padding: 0 20px;
			div{
				height:66px;
				border-bottom: 1px solid #e8e8e8;/*no*/
				box-sizing: border-box;
				span{
					font-size: 28px;
					color: #000;
				}
			}
			.none{
				border: none;
			}
		}
		.zizhi{
			box-sizing: border-box;
			padding: 0 20px;
			div{

				height: 66px;
				border-bottom: 1px solid #e8e8e8;/*no*/
				span{
					font-size: 28px;
					color: #000;
				}
				i{
					font-size: 22px;
					color: #000;
				}
			}

		}
	}
</style>
