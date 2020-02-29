<template>
	<div class="cashProcessWarp">
		<div class="cashProcessCnt">
			<div class="commission">
				<div class="title">佣金提现</div>
				<div class="moneyBox">
					<div class="money">¥{{totalIncome}}</div>
					<p>累计佣金</p>
				</div>
			</div>
			<div class="cashImg">
				<div class="title">提现流程</div>
				<img src="../../assets/cashProcess.png" alt="" />
			</div>
			<div class="cashTip">
				<p>
					<b>账户提现说明：</b> <br />
					1、请下载骨米宠物APP，使用当前推广账户(手机号)登陆骨米宠物【我的】界面。<br />
					2、在【骨米钱包】->【账户余额】界面查看并点击【提现】进行提现操作。<br />
					3、在提现过程中，您需要认证您的账户信息，包括真实姓名和身份证信息及照片。账户一旦审核通过不可修改，每次提现只能提现到认证的账户名称。<br />
					4、提现到账户包含【银行卡】和【支付宝账户】两种渠道，银行提现审核后24小时内到账，支付宝审核后2小时内到账。<br />
					5、您可以在【账户明细】中查看提现进度和状态。
				</p>
			</div>
			
		</div>
		<div class="cashProcessFoot flex_r_s_b">
				<div @click="iosDown">IOS下载</div>
				<div @click="andDown">Android下载</div>
		</div>
	</div>
</template>

<script>
	import Api from '../common/apj.js'
	export default{
		data(){
			return{
				totalIncome:0,
			}
		},
		mounted() {
			if(localStorage.getItem('userId') != null) {
				this.getIndexInfo();
			} else {
				this.$router.push({
					name:'promoteLogin'
				})
			}
		},
		methods:{
			iosDown(){
       			 window.location.href = 'https://itunes.apple.com/cn/app/id1437699756';
      		},
      		andDown(){
        		window.location.href = 'http://app.xiaomi.com/details?id=com.freedogs.freedogs';
      		},
			getIndexInfo(){
				let self = this
				this.axios.post(Api.userApi+'/userSpread/selectUserSpreadVo', this.qs.stringify({
						userId:localStorage.getItem('userId')
					}), {
						headers: {
							'Content-Type': 'application/x-www-form-urlencoded'
						}
				}).then(res=>{
					if(res.data.code==1){
						self.totalIncome = res.data.data.totalIncome;
					}else{
						alert(res.data.msg)
					}
				})
			},
		}
	}
</script>

<style lang="scss">
	.cashProcessWarp{
		background: #fff;
		.title{
			font-size: 28px;
			color: #000;
			
		}
		.cashProcessCnt{
			padding: 0 30px;
			.title{
					padding: 30px 0;
			}
			
			.cashTip{
				font-size:22px;
				line-height:30px;
				color: #666;
				padding:40px 0;
				b{
					color: #333;
					font-size:24px;
				}
			}
			.cashImg{
				img{
					width: 100%;
				}
			}
			.commission{
				.title{
					padding: 30px 0;
				}
				.moneyBox{
					width:200px;
					height:100px;
					border-radius:10px;
					box-shadow:0px 0px 8px 0px rgba(102,102,102,0.16);
					display: flex;
					flex-direction:column;
					align-items: center;
					justify-content:center;
					.money{
						font-size:26px;
						color: #333;
					}
					p{
						font-size:22px;
						color: #666;
						padding-top: 18px;
					}	
				}
			}
			
		}
		.cashProcessFoot{
			padding: 0 60px;
			box-sizing: border-box;
			height: 96px;
			box-shadow:0px 0px 16px 0px rgba(51,51,51,0.15);
			div{
				width:240px;
				height:70px;
				background:rgba(255,82,61,1);
				border-radius:35px;
				color: #fff;
				text-align: center;
				line-height: 70px;
				font-size: 30px;
			}
		}
	}
</style>