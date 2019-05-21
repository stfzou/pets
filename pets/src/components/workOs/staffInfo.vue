<template>
	<div class="staffInfo">
		<div class="login_nav">
			<div class="back" @click="back"></div>
			<div class="title">员工资料列表</div>
			<router-link class="addStaffData" :to="{name:'addStaff'}">
				<img src="../../assets/ali-add.png" alt="">
			</router-link>
		</div>
		<div class="staffList">
			<cube-scroll ref="scroll" :options="options" @pulling-up="onPullingUp" @pulling-down="onPullingDown">
				<ul>
					<li v-for="item in staffInfo">
						<div class="staffName flex_r_f_s">
							<div class="box_l flex_r_f_s">
								<span>{{item.name}}</span>
								<router-link :to="{name:'editStaff',query:{editStaff:item}}">
									<img src="../../assets/ali-edit.png" alt="">
								</router-link>
							</div>
							<div class="box_r">
								客户数量<span>{{item.clientNum}}</span>
							</div>
						</div>
						<div class="phone">{{item.phone}}</div>
						<div class="addr">区域:{{item.province}}-{{item.city}}-{{item.area}}</div>
						<div class="addTime flex_r_s_b">
							<span>添加日期:{{item.createTime}}</span>
							<!-- <img @click="showBtn(item)" src="../../assets/ali-delete.png" alt=""> -->
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
				staffInfo: [],
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
			this.getStaffList();
		},
		methods: {
			back() {
				this.$router.push({
					name:'workOsInfoList'
				});
			},
			getStaffList() {
				let self = this;
				this.axios.post(Api.staffApi + '/business/selectBusinessStaffAll', this.qs.stringify({
					pageNo: 0,
					pageSize: 10
				}), {
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					}
				}).then((res) => {
					if (res.data.code == 1) {
						console.log(res)
						self.staffInfo = res.data.data;
						setTimeout(() => {
							this.$refs.scroll.refresh();
							this.$refs.scroll.forceUpdate();
						}, 1000)
					} else {
						alert(res.data.msg)
					}
				})
			},
			onPullingDown() {
				// 模拟更新数据

				this.page = 0;
				this.getStaffList();

			},
			onPullingUp() {
				this.page++;
				console.log(this.page)
				let self = this;
				this.axios.post(Api.staffApi + '/business/selectBusinessStaffAll', this.qs.stringify({
					pageNo: self.page,
					pageSize: 10
				}), {
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					}
				}).then((res) => {
					if (res.data.code == 1) {

						if (res.data.data.length > 0) {

							setTimeout(() => {
								res.data.data.forEach((e) => {
									self.staffInfo.push(e)
								})
								self.$refs.scroll.forceUpdate();
								setTimeout(() => {
									self.$refs.scroll.refresh();
								}, 100)
							}, 500)
						} else {

							setTimeout(() => {
								self.$refs.scroll.forceUpdate();
							}, 500)
						}

					} else {
						alert(res.data.msg);
						setTimeout(() => {
							self.$refs.scroll.forceUpdate();
						}, 500)
					}
				})
			},
			
		}
	}
</script>

<style lang="scss">
	// @import '../../style/common.scss';
	.staffInfo {
		height: 100%;
		position: relative;

		.login_nav {
			height: 42px;
			padding: 22px 0;
			position: relative;
			border-bottom: 1px solid #e8e8e8;
			.back {
				background: url("../../assets/icon/backColory.png") no-repeat center 0;
				background-size: cover;
				width: 24px;
				height: 40px;
				position: absolute;
				left: 20px;
				top: 50%;
				margin-top: -21px;
			}

			.title {
				font-size: 30px;
				color: #333;
				line-height: 42px;
				text-align: center;
			}

			.addStaffData {
				width: 40px;
				height: 40px;
				position: absolute;
				right: 20px;
				top: 50%;
				margin-top: -21px;

				img {
					width: 40px;
					height: 40px;
				}
			}
		}

		.staffList {
			position: absolute;
			top: 80px;
			left: 0;
			right: 0;
			bottom: 0;
			padding-top: 20px;
			ul {
				padding: 0 20px;
			}

			li {
				border-bottom: 1px dashed #e8e8e8;
				padding: 20px 0;
			}

			.staffName {
				.box_l {
					font-size: 26px;
					color: #333;
					width: 200px;

					img {
						width: 30px;
						margin-left: 10px;
					}
				}

				.box_r {
					font-size: 26px;
					color: #333;

					span {
						color: #ff523d;
						margin-left: 10px;
					}
				}
			}

			.phone {
				font-size: 26px;
				color: #999;
				padding: 10px 0;
			}

			.addr {
				font-size: 26px;
				color: #333;
				padding-bottom: 10px;
			}

			.addTime {
				font-size: 26px;
				color: #999;

				img {
					width: 40px;
				}
			}
		}
	}
</style>
