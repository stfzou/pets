<template>
	<div class="workInfoList">
		<div class="login_nav">
			<div class="back" @click="back"></div>
			<div class="title">欢迎你:{{name}}</div>
		</div>
		<div class="workInfoList_cnt">
			<ul class="workInfoList_list">
				<li class="flex_r_s_b">
					<div>客户信息管理(<span>100</span>)</div>
					<img src="../../../../kugou/src/assets/images/arrow_icon.png" alt="">
				</li>
				<li class="flex_r_s_b" v-if="parentId==0">
					<div>员工资料管理(<span>{{staffNum}}</span>)</div>
					<img src="../../../../kugou/src/assets/images/arrow_icon.png" alt="">
				</li>
				<li class="flex_r_s_b">
					<div>修改登录密码</div>
					<img src="../../../../kugou/src/assets/images/arrow_icon.png" alt="">
				</li>
				
			</ul>
			<div class="quit">退出登录</div>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				staffId:'',
				parentId:'1',
				name:'',
				staffNum:''
			}
		},
		mounted() {
			
			if(JSON.parse(sessionStorage.getItem('staff'))== null){
				
				this.$router.push({
					name:'workOsLogin'
				})
				
			}else{
				this.staffId = JSON.parse(sessionStorage.getItem('staff')).staffId;
				this.parentId = JSON.parse(sessionStorage.getItem('staff')).parentId;
				this.name = JSON.parse(sessionStorage.getItem('staff')).name;
				this.staffNum = JSON.parse(sessionStorage.getItem('staff')).staffNum;
			}
		},
		methods:{
			back(){
				this.$router.go(-1);
			},
			
			
		}
	}
</script>

<style lang="scss">
	@import '../../style/common.scss';
	@import '../../style/mixin.scss';
	.workInfoList{
		.login_nav{
			height: 42px;
			padding: 22px 0;
			position: relative;
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
				color: #ff523d;
				line-height: 42px;
				text-align: center;
			}
		}
		.workInfoList_cnt{
			padding: 0 20px;
			ul{
				li{
					font-size: 26px;
					color: #999;
					padding: 20px 0;
					border-bottom:1px dashed #e8e8e8;
					img{
						width: 16px;
					}
					span{
						color: #ff523d;
					}
				}
				
			}
			.quit{
				font-size: 26px;
				color: #999;
				padding-top: 20px;
			}
		}
	}
</style>
