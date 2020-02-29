<template>
	<div class="promoteIndexWarp">
		<div class="commissionData">
			<div class="title">佣金数据</div>
			<ul class="flex_r_s_b">
				<li>
					<div class="num">¥{{todayIncome}}</div>
					<p>今日收益</p>
				</li>
				<li>
					<div class="num">{{todayUserNum}}</div>
					<p>今日用户数</p>
				</li>
				<li>
					<div class="num">{{todayShopsNum}}</div>
					<p>今日商家数</p>
				</li>
				<li>
					<div class="num">¥{{totalIncome}}</div>
					<p>累计收益</p>
				</li>
				<li>
					<div class="num">{{totalUserNum}}</div>
					<p>累计用户数</p>
				</li>
				<li>
					<div class="num">{{totalShopsNum}}</div>
					<p>累计商家数</p>
				</li>
			</ul>
		</div>
		<div class="promoteTool">
			<div class="title">推广工具</div>
			<ul class="flex_r_f_s">
				<li @click="businessPromote">
					<img src="../../assets/tool_01.png" alt="" />
					<p>推广商家</p>
				</li>
				<!--<li>
					<img src="../../assets/tool_02.png" alt="" />
					<p>推广用户</p>
				</li>-->
				<li @click="shopMx">
					<img src="../../assets/tool_03.png" alt="" />
					<p>商家明细</p>
				</li>
				<!--<li>
					<img src="../../assets/tool_04.png" alt="" />
					<p>用户明细</p>
				</li>-->
				<li @click="cashProcess">
					<img src="../../assets/tool_05.png" alt="" />
					<p>佣金提现</p>
				</li>
			</ul>
		</div>
		
	</div>
</template>

<script>
	import Api from '../common/apj.js'
	export default{
		data(){
			return{
				todayIncome:0,
				todayUserNum:0,
				todayShopsNum:0,
				totalIncome:0,
				totalUserNum:0,
				totalShopsNum:0
				
			}
		},
		 mounted(){
		 	if(localStorage.getItem('userId')!=null){
		 		this.getIndexInfo();
		 	}else{
		 		this.$router.push({
					name:'promoteLogin'
				})
		 	}
		},
		methods:{
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
						self.todayIncome = res.data.data.todayIncome;
						self.todayUserNum = res.data.data.todayUserNum;
						self.todayShopsNum = res.data.data.todayShopsNum;
						self.totalIncome = res.data.data.totalIncome;
						self.totalUserNum = res.data.data.totalUserNum;
						self.totalShopsNum = res.data.data.totalShopsNum;
					}else{
						alert(res.data.msg)
					}
				})
			},
			shopMx(){
				this.$router.push({
					name:'businessDetails'
				})
			},
			cashProcess(){
				this.$router.push({
					name:'cashProcess'
				})
			},
			businessPromote(){
				this.$router.push({
					name:'businessPromote'
				})
			}
		}
	}
</script>

<style lang="scss">
	.promoteIndexWarp{
		background:#fff;
		padding: 0 30px;
		.title{
			font-size: 28px;
			color: #000;
			
		}
		.promoteTool{
			.title{
				padding: 10px 0 30px 0;
			}
			ul{
				flex-wrap: wrap;
				li{
					width: 100px;
					margin-right: 80px;
					margin-bottom: 30px;
					img{
						width: 100px;
						height: 100px;
					}
					p{
						text-align: center;
						font-size:24px;
						color: #666;
						padding-top: 18px;
					}
				}
				li:nth-child(4){
          			margin-right:0;
        		}
			}
		}
		.commissionData{
			.title{
				padding: 30px 0;
			}
			ul{
				flex-wrap: wrap;
				li{
					width:200px;
					height:100px;
					box-shadow:0px 0px 8px 0px rgba(102,102,102,0.16);
					border-radius:10px;
					display: flex;
					flex-direction:column;
					justify-content:center;
					margin-bottom: 30px;
					.num{
						text-align: center;
						font-weight:bold;
						font-size: 26px;
						color: #333;
					}
					p{
						text-align: center;
						font-size: 22px;
						color: #666;
						padding-top: 10px;
					}
				}
			}
		}
	}
	
</style>