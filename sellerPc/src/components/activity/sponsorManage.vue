<template>
	<div class="sponsorManage">
		<div class="sponsorManageDialog flex_r_f_e" v-if="isDilog" @click.stop="dialogHide">
			<div class="dialogCnt flex_r_f_e" @click.stop>
				<div>
					<div class="dialog-title">主办方认证</div>
					<p>1、认证后的主办方享受专属V标识。</p>
					<p>2、企业身份认证适合于企业（含个人）、组织、单位申请，个人身份认证仅供个人申请。</p>
					<p>3、同一账户只能选择一个身份进行认证。</p>
					<p>4、通过第三方资质审核机构对您所提交的资料进行审核，审核服务费为300元/年（此审核服务费用无法退回）。</p>
					<div class="dialogBtn pointer" @click="realLink">立即认证</div>
				</div>
			</div>
		</div>
		<div class="addBtn pointer"><router-link :to="{name:'addSponsor'}">+添加主办方</router-link></div>
		<div class="sponsorList" v-if="sponsorList.length>0">
			<div class="sponsorBox" v-for="item in sponsorList">
				<div class="sponsorTop flex_r_s_b">
					<div class="sponsorHeadImg">
						<img :src="item.organizerHead" alt="">
					</div>
					<div class="sponsorMid">
						<div class="sponsorName flex_r_f_s">
							<span v-if="item.type == '1'">{{item.name}}</span>
							<span v-else>{{item.companyName}}</span>
							
							
							<!-- <img src="../../assets/icon_renzheng.PNG" alt=""> -->
							<img v-if="item.type == '2'" src="../../assets/icon_renzheng.png" alt="">
							<img v-else src="../../assets/icon_renzheng2.png" alt="">
						</div>
						<div class="rzType" v-if="item.type == '1'">个人主办方</div>
						<div class="rzType" v-else>企业主办方</div>
						<div class="rzSign">
							<div class="rzSuccess" v-if="item.status=='2'">已认证<span>有效期至2019年6月10日</span></div>
						 	<div class="rzExceed" v-if="item.isExpired=='1'">认证失效<span>有效期至2019年6月10日</span></div>
							<div class="rzError" v-if="item.status=='3'">认证错误</div>
							<div class="rzIng" v-if="item.status=='1'">认证中</div>
						</div>
					</div>
					<div class="sponsorRight flex_r_s_b">
						<!-- <div class="rzBtn pointer" v-if="isExpired =='1'" @click="dialogShow(item)">重新认证</div> -->
						<div class="rzBtn pointer" @click="dialogShow(item)">立即认证</div>
						<div class="editBtn pointer" @click="editLink(item)">编辑</div>
					</div>
				</div>
				<div class="rzTip" v-if="item.statusDescription!=''"><i class="el-icon-warning"></i>{{item.statusDescription}}</div>
			</div>
		</div>
		<div class="wxtx">
			<div class="tx-title">温馨提示</div>
			<p>1、每个账户只能添加一个”个人主办方”和一个“企业主办方 ”。</p>
			<p>2、每个账户只能选择其中一个主办方进行认证，认证后不能变更认证类型，只能删除主办方重新认证（需重新付费），请谨慎选择。</p>
			<p>3、第三方公司认证，认证资料提交后3-7个工作日完成审核，请留意来电。</p>
		</div>
	</div>
</template>

<script>
	import Api from '../common/apj.js'
	export default {
		data(){
			return {
				isDilog:false,
				sponsorList:[],
				type:'',
				organizerId:''
			}
		},
		mounted() {
			this.getSponsor();
			
		
			this.$store.commit('initialNav', {
				navNum: 6,
				subNum: 1,
				subData: [{
					subNavName: '发布活动',
					subIcon: require('../../assets/home/icon_home1.png'),
					link: 'publishActivity'
				}, {
					subNavName: '主办方管理',
					subIcon: require('../../assets/home/icon_home2.png'),
					link: 'sponsorManage'
				}, {
					subNavName: '认证',
					subIcon: require('../../assets/home/icon_home5.png'),
					link: 'realName'
				}]
			});
		
		},
		methods:{
			dialogShow(item){
				this.isDilog = true;
				this.type = item.type;
				this.organizerId = item.organizerId;
			},
			dialogHide(){
				this.isDilog = false;
			},
			realLink(item){
				let self = this;
				if(this.type=='1'){
					this.$router.push({
						name:'realUser',
						query:{
							organizerId:self.organizerId
						}
					})
				}else if(this.type=='2'){
					this.$router.push({
						name:'realName',
						query:{
							organizerId:self.organizerId
						}
					})
				}
				
			},
			getSponsor(){
				let self = this;
				self.axios.post(Api.userApi+'/ca/selectCommunityActivityOrganizerByUserId', self.qs.stringify({
					userId:JSON.parse(sessionStorage.getItem('user')).userId
				}), {
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					}
				}).then((res)=>{
					if(res.data.code == 1){
						self.sponsorList = res.data.data
						console.log(self.sponsorList)
					}else{
						alert(res.data.msg)
					}
				})
			},
			editLink(item){
				this.$router.push({
					name:'editSponsor',
					params:{
						sponsorInfo:item
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.sponsorManage{
		padding: 20px;
		.sponsorManageDialog{
			position: fixed;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			background: rgba(0,0,0,0.6);
			z-index: 10000;
			.dialogCnt{
				width: 400px;
				background: #fff;
				height: 280px;
				border-radius: 4px;
				.dialog-title{
					font-size: 16px;
					color: #000;
					text-align: center;
					padding-bottom: 10px;
				}
				p{
					font-size: 14px;
					color: #666;
					width: 350px;
					line-height: 24px;
				}
				.pointer{
					width: 200px;
					height: 30px;
					border-radius: 20px;
					background: #ff523d;
					font-size: 14px;
					color: #fff;
					margin: 0 auto;
					text-align: center;
					line-height: 30px;
				}
			}
		}
		.addBtn{
			width:200px;
			height:30px;
			background:rgba(255,82,61,1);
			box-shadow:0px 6px 8px 0px rgba(255,82,61,0.16);
			font-size: 14px;
			color: #fff;
			border-radius: 20px;
			text-align: center;
			line-height: 30px;
			a{
				color:#fff;
			}
		}
		.wxtx{
			padding: 10px;
			font-size: 14px;
			width: 700px;
			border-radius: 4px;
			background: #f5f5f5;
			.tx-title{
				color: #333;
				padding-bottom: 5px;
			}
			p{
				color: #999;
				line-height: 20px;
			}
		}
		.sponsorList{
			padding-top: 30px;
			.sponsorBox{
				width: 600px;
				box-shadow:0px 0px 10px 0px rgba(255,118,96,0.16);
				border-radius:6px;
				margin-bottom: 30px;
				.sponsorTop{
					padding: 20px 30px;
					box-sizing: border-box;
					.sponsorHeadImg{
						img{
							width: 80px;
							height: 80px;
							border-radius: 50%;
						}
					}
					.sponsorMid{
						width: 280px;
						.sponsorName{
							font-size: 16px;
							padding-bottom: 10px;
							color: #333;
							span{
								margin-right: 5px;
							}
						}
						.rzType{
							font-size: 14px;
							color: #999;
							padding-bottom: 20px;
						}
						.rzSign{
							.rzSuccess{
								font-size: 16px;
								color: #ff523d;
								span{
									font-size: 14px;
									margin-left: 20px;
								}
							}
							.rzExceed{
								font-size: 16px;
								color: #999;
								span{
									font-size: 14px;
									margin-left: 20px;
								}
							}
							.rzError{
								font-size: 16px;
								color: #999;
							}
							.rzIng{
								font-size: 16px;
								color: #ff523d;
							}
						}
					}
					.sponsorRight{
						width: 150px;
						padding-top: 40px;
						.editBtn{
							width:56px;
							height:24px;
							background:rgba(255,82,61,1);
							border-radius:12px;
							color: #fff;
							font-size: 12px;
							text-align: center;
							line-height: 24px;
						}
						.rzBtn{
							width:86px;
							height:24px;
							background:rgba(67,67,67,1);
							border-radius:12px;
							color: #fff;
							font-size: 12px;
							text-align: center;
							line-height: 24px;
						}
					}
				}
				.rzTip{
					height: 34px;
					line-height: 34px;
					color: #ff523d;
					font-size: 14px;
					padding-left: 25px;
					border-top: 1px dashed #ffddd9;
					i{
						margin-right: 5px;
					}
				}
			}
		}
	}
</style>
