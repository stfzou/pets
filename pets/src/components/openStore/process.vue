<template>
	<div class="processWarp">
		<cube-tab-bar v-model="selectedLabel" show-slider :useTransition="true" @click="tabClick">
			<cube-tab v-for="(item, index) in tabs" :label="item.label" :key="item.label">
			</cube-tab>
		</cube-tab-bar>
		<div class="processTab">
			<div class="openBtn flex_r_s_b">
				<div class="btn" @click="dataLink">立即开店</div>
        <div class="btn" @click="cashLink">推广骨米赚佣金</div>
			</div>

			<cube-slide ref="slide" @change="slideChangePage" :autoPlay="false" :showDots="false" :loop="false" :initial-index="index">

				<cube-slide-item>
					<cube-scroll :options="scrollOptions" ref="scroll2">
						<div class="processPost">

						</div>
						<div class="processImg">
							<img src="../../assets/menuCntBg_02.png" alt="" />

						</div>
					</cube-scroll>
				</cube-slide-item>

				<cube-slide-item>

					<cube-scroll :options="scrollOptions" ref="scroll">
						<div class="processPost">

						</div>
						<div class="processImg">
							<img src="../../assets/menuCntBg_01.png" alt="广告图片占位符" />

						</div>

					</cube-scroll>
				</cube-slide-item>
				<cube-slide-item>
					<cube-scroll :options="scrollOptions" ref="scroll3">
						<div class="processPost">

						</div>
						<div class="processImg">
							<img src="../../assets/menuCntBg_03.png" alt="" />

						</div>
					</cube-scroll>
				</cube-slide-item>
				<cube-slide-item>
					<cube-scroll :options="scrollOptions" ref="scroll4">
						<div class="processPost">

						</div>
						<div class="processImg">
							<img src="../../assets/menuCntBg_04.png" alt="" />

						</div>
					</cube-scroll>
				</cube-slide-item>
				<cube-slide-item>
					<cube-scroll :options="scrollOptions" ref="scroll5">
						<div class="processPost">

						</div>
						<div class="processImg">
							<img src="../../assets/menuCntBg_05.png" alt="" />

						</div>
					</cube-scroll>
				</cube-slide-item>
			</cube-slide>
		</div>
	</div>
</template>

<script>
	import Api from '../common/apj.js'
	export default {
		data() {
			return {
				index: 0,
				slideOptions: {
					listenScroll: true,
					probeType: 3,
					/* lock y-direction when scrolling horizontally and  vertically at the same time */
					directionLockThreshold: 0
				},
				scrollOptions: {
					/* lock x-direction when scrolling horizontally and  vertically at the same time */
					directionLockThreshold: 20
				},
				selectedLabel: '平台介绍',
				tabs: [{
					label: '平台介绍',
				}, {
					label: '经营痛点',
				}, {
					label: '开店流程',
				}, {
					label: '开店要求',
				}, {
					label: '资费说明',
				}],
				salesmanId: '',
				appUserId: ''
			}
		},
		mounted() {
			if(this.getUrlKey('salesmanId') != null) {
				this.salesmanId = this.getUrlKey('salesmanId');
			}
			if(this.getUrlKey('appUserId') != null) {
				this.appUserId = this.getUrlKey('appUserId');

			}

			setTimeout(e => {
				let self = this;

				self.$refs.scroll.refresh();
				self.$refs.scroll2.refresh();
				self.$refs.scroll3.refresh();
				self.$refs.scroll4.refresh();
				self.$refs.scroll5.refresh();

			}, 1000)
		},

		methods: {
			getUrlKey(name) {
				return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[1].replace(/\+/g, '%20')) || null
			},
      cashLink(){
        this.$router.push({
          name:'cashProcess'
        })
      },
			getUiserInfo() {
				let self = this;
				this.axios.get(Api.userApi + '/user/getUserInfo?userId=' + localStorage.getItem('userId'), {
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					}
				}).then(function(res) {
          if(res.data.code==1){
            localStorage.setItem('userType',res.data.data.userType)
            localStorage.setItem('userId',res.data.data.userId)
            if(res.data.data.userType == 1) {

            	if(self.salesmanId != '') {
            		self.$router.push({
            			name: 'storeData',
            			query: {
            				salesmanId: self.salesmanId
            			}
            		})
            	} else if(self.appUserId != '') {

            		self.$router.push({
            			name: 'storeData',
            			query: {
            				appUserId: self.appUserId
            			}
            		})
            	} else {
            		self.$router.push({
            			name: 'storeData'
            		})

            	}

            } else {
            	self.$router.push({
            		name: 'storeSus'
            	})
            }
          }else{
            alert(res.data.msg)
          }

				})

			},
			dataLink() {
				let self = this;
				if(localStorage.getItem('userId') != null) {
					this.userId = localStorage.getItem('userId')
					this.getUiserInfo();

				} else {

					if(self.salesmanId != '') {
						this.$router.push({
							name: 'storeRegister',
							query: {
								salesmanId: self.salesmanId
							}
						})
					} else if(self.appUserId != '') {

						this.$router.push({
							name: 'storeRegister',
							query: {
								appUserId: self.appUserId
							}
						})
					} else {

						this.$router.push({
							name: 'storeRegister'

						})
					}
				}

			},
			tabClick(e) {
				switch(e) {
					case '平台介绍':
						this.index = 0
						break;

					case '经营痛点':
						this.index = 1
						break;

					case '开店流程':
						this.index = 2
						break;

					case '开店要求':
						this.index = 3
						break;

					case '资费说明':
						this.index = 4
						break;
				}
			},
			slideChangePage(current) {
				setTimeout(e => {
					let self = this;

					self.$refs.scroll.refresh();
					self.$refs.scroll2.refresh();
					self.$refs.scroll3.refresh();
					self.$refs.scroll4.refresh();
					self.$refs.scroll5.refresh();

				}, 1000)
				switch(current) {
					case 0:
						this.selectedLabel = '平台介绍'
						break;

					case 1:
						this.selectedLabel = '经营痛点'
						break;

					case 2:
						this.selectedLabel = '开店流程'
						break;

					case 3:
						this.selectedLabel = '开店要求'
						break;

					case 4:
						this.selectedLabel = '资费说明'
						break;
				}
			},

		}
	}
</script>

<style lang="scss">
	.processWarp {
		.cube-tab-bar {
			background: #ff523d;
		}
		.cube-tab {
			color: #fff;
			font-size: 26px;
			padding: 20px 0;
		}
		.cube-tab-bar-slider {
			width: 20px;
			height: 6px;
			background: #fff;
		}
		.processPost {
			height: 360px;
			background-image: url('../../assets/topMenuBg.png');
			background-size: cover;
			background-repeat: no-repeat;
			background-position: 50%;
		}
		.processTab {
			position: fixed;
			top: 63px;
			left: 0;
			right: 0;
			bottom: 0;
			.openBtn {
				position: absolute;
				bottom: 0;
				left: 0;
				z-index: 1000;
				height: 96px;
				background: rgba(255, 255, 255, 1);
        padding:0 70px;
        box-sizing:border-box;
				box-shadow: 0px 0px 12px 0px rgba(102, 102, 102, 0.16);
				div {
					width: 258px;
					height: 68px;
					background: rgba(255, 82, 61, 1);
					border-radius: 10px;
					font-size: 30px;
					color: #fff;
					text-align: center;
					line-height: 68px;
				}
			}
		}
		.processImg {
			width: 100%;
			padding-bottom: 100px;
			img {
				max-width: 100%;
				;
			}
		}
	}
</style>
