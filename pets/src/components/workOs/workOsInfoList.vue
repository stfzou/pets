<template>
	<div class="workInfoList">
		<div class="login_nav">
			<div class="back" @click="back"></div>
			<div class="title">欢迎你:{{name}}</div>
		</div>
		<div class="workInfoList_cnt">
			<ul class="workInfoList_list">
				<li class="flex_r_s_b" @click="khRouter">
					<div>客户信息管理(<span>{{clientNum}}</span>)</div>
					<img src="../../../../kugou/src/assets/images/arrow_icon.png" alt="">
				</li>
				<li class="flex_r_s_b" v-if="parentId==0" @click="staffRouter">
					<div>员工资料管理(<span>{{staffNum}}</span>)</div>
					<img src="../../../../kugou/src/assets/images/arrow_icon.png" alt="">
				</li>
				<li class="flex_r_s_b" @click="pwRouter">
					<div>修改登录密码</div>
					<img src="../../../../kugou/src/assets/images/arrow_icon.png" alt="">
				</li>
				<li class="flex_r_s_b" @click="visitLink">
					<div>拜访记录</div>
					<img src="../../../../kugou/src/assets/images/arrow_icon.png" alt="">
				</li>
        <li class="flex_r_s_b" @click="workTableLink">
        	<div>工作报表</div>
        	<img src="../../../../kugou/src/assets/images/arrow_icon.png" alt="">
        </li>
			</ul>
			<div class="quit" @click="quit">退出登录</div>
		</div>
	</div>
</template>

<script>
	import Api from '../common/apj.js'
	export default{
		data(){
			return{
				staffId:'',
				parentId:'1',
				name:'',
				staffNum:'',
				clientNum:''
			}
		},
		mounted() {

			if(JSON.parse(localStorage.getItem('staff'))== null){

				this.$router.push({
					name:'workOsLogin'
				})

			}else{
				this.staffId = JSON.parse(localStorage.getItem('staff')).staffId;
				this.parentId = JSON.parse(localStorage.getItem('staff')).parentId;
				this.name = JSON.parse(localStorage.getItem('staff')).name;
				this.staffNum = JSON.parse(localStorage.getItem('staff')).staffNum;
				// this.staffNum = this.$store.state.staffNum;
				this.clientNum = JSON.parse(localStorage.getItem('staff')).clientNum;
				if(this.parentId == 0){
					this.staffId = '-1';
				}
				this.getCustomer();
			}
		},
		methods:{
			back(){
				this.$router.push({
					name:'workOsInfoList'
				});
			},
			khRouter(){
				this.$router.push({
					name:'workOsCustomer'
				})
			},
			pwRouter(){
				this.$router.push({
					name:'workOsChangePw'
				})
			},
			quit(){
				localStorage.removeItem('staff');
				this.$router.push({
					name:'workOsLogin'
				})
			},
			staffRouter(){
				this.$router.push({
					name:'staffInfo'
				})
			},
      visitLink(){
        this.$router.push({
        	name:'visitRecords'
        })
      },
      workTableLink(){
        this.$router.push({
        	name:'workTable'
        })
      },
			getCustomer(){
				let self = this;
				this.axios.post(Api.staffApi + '/business/selectBClientInfo', this.qs.stringify({
					businessId:self.staffId,
					province:'',
					city:'',
					area:'',
					conditionId:'',
					typeId:'',
					pageNo:0,
					pageSize:1,
					shopName:'',
					productTypeId:''
				}), {
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					}
				}).then((res) => {
					if (res.data.code == 1) {


						self.clientNum = res.data.data.bcNum;

					} else {
						alert(res.data.msg)
					}
				})
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
