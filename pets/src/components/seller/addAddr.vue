<template>
	<div class="addAddr">
		<div class="top_nav flex_r_s_b">
			<div class="back"></div>
			<div class="nav_title">新增收货地址</div>
			
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
				<div class="mid"></div>
			</li>
			<li class="flex_r_f_s">
				<div class="list_l">门牌号</div>
				<input class="phone" type="text" v-model="phone" placeholder="详细门牌号,例:2单元204">
			</li>
		</ul>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				phone:'',
				userName:'',
				addr:'',
				houseNumber:''
			}
		},
		methods: {
			addrMap() {
				this.$router.push({name:'confirmAddr'})
			}
		},
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
