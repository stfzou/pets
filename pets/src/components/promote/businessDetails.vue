<template>
	<div class="businessDetailsWarp">

		<div class="businessDetailsCnt">
			<cube-scroll ref="scroll" @pulling-up="onPullingUp" @pulling-down="onPullingDown" :options="options">
				<div class="title">商户推广明细</div>
				<ul>
					<li class="flex_r_s_b" v-for="item in shopMxList">
						<div class="listLeft">
							<div class="shopName">商家名称:{{item.shopName}}</div>
							<div class="rewardType"><span v-if="item.type===1">【注册奖励】</span><span v-else>【上架奖励】</span></div>
							<div class="time">{{item.createTime}}</div>
						</div>
						<div class="listRight">
							<div class="money">¥{{item.rewardPrice}}</div>
							<div class="status notSet" v-if="item.status===0">未设置</div>
							<div class="status notSet" v-if="item.status===1">审核中</div>
							<div class="status passed" v-if="item.status===2">已通过</div>
							<div class="status notSet" v-if="item.status===3">未通过</div>
							<div class="status notSet" v-if="item.status===4">信息未完善</div>
						</div>
					</li>
				</ul>
			</cube-scroll>
		</div>
	</div>
</template>

<script>
	import Api from '../common/apj.js'
	export default {
		data() {
			return {
				shopMxList: [],
				page: 0,
				options: {
					pullDownRefresh: {
						txt: '更新成功',
						threshold: 40
					},
					pullUpLoad: {
						txt: {
							more: '加载更多',
							noMore: '没有更多数据了',
						},
						threshold: 40,

					}
				},
			}
		},
		mounted() {
			if(localStorage.getItem('userId') != null) {
				this.getInitData();
			} else {
				this.$router.push({
					name:'promoteLogin'
				})
			}
		},
		methods: {
			onPullingDown() { //下拉刷新
				this.page = 0;
				this.getInitData();
			},
			onPullingUp() { //上拉加载
				let self = this
				self.page++
				this.axios.post(Api.userApi + '/userSpread/selectUserSpreadByShops', this.qs.stringify({
					userId: localStorage.getItem('userId'),
					pageNo: self.page,
					pageSize: 20
				}), {
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					}
				}).then(res => {
					if(res.data.code == 1) {
						if(res.data.data.infos.length > 0) {
							setTimeout(() => {
								self.$refs.scroll.forceUpdate();
								self.shopMxList.push(...res.data.data.infos)
								setTimeout(() => {
									self.$refs.scroll.refresh();
								}, 200)
							}, 500)
						} else {
							setTimeout(() => {
								self.$refs.scroll.forceUpdate();
								self.$refs.scroll.refresh();
							}, 500)
						}

					} else {
						alert(res.data.msg)
						self.$refs.scroll.forceUpdate();

					}
				})
			},
			getInitData() {
				let self = this
				this.axios.post(Api.userApi + '/userSpread/selectUserSpreadByShops', this.qs.stringify({
					userId: localStorage.getItem('userId'),
					pageNo: self.page,
					pageSize: 20
				}), {
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					}
				}).then(res => {
					if(res.data.code == 1) {
//						console.log(res.data.data)
						setTimeout(() => {
							self.$refs.scroll.forceUpdate();
							self.shopMxList = res.data.data.infos;
							setTimeout(() => {
								self.$refs.scroll.refresh();
							}, 200)
						}, 500)

					} else {
						alert(res.data.msg)
						self.$refs.scroll.forceUpdate();
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.businessDetailsWarp {
		position: absolute;
		top: 435px;
		left: 0;
		right: 0;
		bottom: 0;
		box-sizing: border-box;
		background: #fff;
		.businessDetailsCnt {
			padding: 0 30px;
			height: 100%;
			box-sizing: border-box;
			.title {
				padding-top: 30px;
				font-size: 28px;
				color: #000;
			}
			ul {
				li {
					padding: 30px 0;
					border-bottom: 1px solid #f5f5f5;
					.listLeft {
						.shopName {
							font-size: 24px;
							color: #333;
						}
						.rewardType {
							font-size: 24px;
							color: #3D94FF;
							padding: 26px 0;
						}
						.time {
							font-size: 22px;
							color: #999;
						}
					}
					.listRight {
						.money {
							font-size: 30px;
							color: #999;
							padding-bottom: 30px;
							text-align: center;
						}
						.status {
							border-radius: 10px;
							width: 100px;
							height: 30px;
							border-radius: 10px;
							color: #fff;
							text-align: center;
							line-height: 30px;
							font-size: 22px;
						}
						.notSet {
							background: #AAAAAA;
						}
						.passed {
							background: #ff523d;
						}
					}
				}
			}
		}
	}
</style>