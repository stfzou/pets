<template>
	<div class="dynamicHome">
   <!-- <DownApp v-on:closeDown="closeDown" v-show="isDown"></DownApp> -->
		<div class="top flex_r_s_b">
			<img class="back" @click="back" src="../../assets/icon/back@1x.png" alt="">
			<img class="share" @click="share" src="../../assets/icon/share@1x.png" alt="">
		</div>
		<div class="post">
			<img :src="styleImg" alt="">
		</div>
		<div class="userInfoBox">
			<div class="userInfo">
				<div class="headImg">
					<img class="hPic" :src="userHeadImage" alt="">
					<!-- <div class="rank flex_r_s_c">v</div> -->
				</div>
				<div class="userInfo-r">
					<div class="userName flex_r_s_b">
						<div class="name">{{userName}}</div>
						<div class="follow flex_r_s_c" v-if="isFocus==1" @click="cancelFollow">已关注</div>
						<div class="follow flex_r_s_c" v-else @click="follow">点击关注</div>
					</div>
					<div class="fansBox flex_r_s_b">
						<div class="fansNum flex_r_s_b">
							<span>骨粉{{fansCount}}</span>

							<div class="shuxian"></div><span class="followNum">关注{{focusCount}}</span>
						</div>
						<div class="gumiNum">骨米号:{{userNo}}</div>
					</div>

				</div>
			</div>
		</div>
    <div class="autograph" v-if="signature!=''">
      <p>{{signature}}</p>
    </div>
    <div class="autograph" v-else>
      <p>TA很懒,什么都没有留下</p>
    </div>
		<div class="dynamicNav flex_r_f_e">

			<router-link :to="{name:'dynamic',query:{aId:aId}}" class="flex_r_s_c">
				<span>TA的动态</span>
				<div class="hx"></div>
			</router-link>
			<router-link :to="{name:'authorActivity',query:{aId:aId}}" class="flex_r_s_c">
				<span>TA的活动</span>
				<div class="hx"></div>
			</router-link>
			<router-link :to="{name:'authorPets',query:{aId:aId}}" class="flex_r_s_c">
				<span>TA的宠物</span>
				<div class="hx"></div>
			</router-link>
		</div>
		<div class="dynamic-cnt">
			<router-view></router-view>
		</div>
	</div>
</template>

<script>
  import wxapi from '../common/wxapi.js'
	import Api from '../common/apj.js'
  import DownApp from '../common/downApp.vue'
	export default {
		data() {
			return {
				fansCount: '',
				focusCount: '',
				isFocus: '',
				isOneself: '',
				userHeadImage: '',
				userName: '',
				userNo: '',
				styleImg: '',
				userId: -1,
				aId: '',
        isDown:true,
        signature:''
			}
		},
    components:{
    	DownApp
    },
		mounted() {

			if (JSON.parse(localStorage.getItem('user')) != null) {
				this.userId = JSON.parse(localStorage.getItem('user')).userId;
			}
      this.aId = this.getUrlKey('aId');
      localStorage.setItem('Aid',this.aId);
			this.getAuthorInfo();

			// console.log(window.location.href)
		},
		methods: {
      closeDown(){
      	this.isDown = false;
      },
      back() {
      	this.$router.go(-1); //返回上一层
      },
      share() {
      	let toast = this.$createToast({
      		txt: '点击浏览器顶端最右边进行分享',
      		type: 'warn'
      	})
      	toast.show()
      },

      getUrlKey(name){
          return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[1].replace(/\+/g, '%20')) || null
      },
			getAuthorInfo() {
				let self = this;
				self.axios.get(Api.trendApi + '/userCenter/selectUserCenterByUserId', {
					params: {
						beLookUserId: JSON.parse(localStorage.getItem('Aid')),
						lookUserId: self.userId
					}
				}, {
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					}
				}).then((res) => {
					if (res.data.code == 1) {

            let option = {
                title: '分享了'+res.data.data.userName+'的个人空间', // 分享标题, 请自行替换
                desc:'给你推荐了'+res.data.data.userName+'的个人空间,快来了解一下吧',
                link: window.location.href, // 分享链接，根据自身项目决定是否需要split
                imgUrl:res.data.data.userHeadImage, // 分享图标, 请自行替换，需要绝对路径
                success: () => {
                  alert('分享成功')
                },
                error: () => {
                  alert('已取消分享')
                }
            }
            wxapi.wxRegister(option)

						self.fansCount = res.data.data.fansCount;
						self.focusCount = res.data.data.focusCount;
						self.isFocus = res.data.data.isFocus;
						self.isOneself = res.data.data.isOneself;
						self.userHeadImage = res.data.data.userHeadImage;
						self.userName = res.data.data.userName;
						self.userNo = res.data.data.userNo;
						self.styleImg = res.data.data.styleImg;
            self.signature = res.data.data.signature;
						//console.log(res.data)
					}
				})
			},
			follow() {

				if (this.userId == -1) {
					this.goLogin('登录后才能关注');
				} else if (this.isOneself) {
					let toast = this.$createToast({
						txt: '不能关注自己',
						type: 'warn'
					})
					toast.show();
					return false;
				} else {
					let self = this;

					this.axios.post(Api.trendApi + '/community/focusUser', this.qs.stringify({
						targetUserId: JSON.parse(localStorage.getItem('Aid')),
						userId: self.userId
					}), {
						headers: {
							'Content-Type': 'application/x-www-form-urlencoded'
						}
					}).then((res) => {
						if (res.data.code == 1) {
							self.isFocus = 1;
							let toast = self.$createToast({
								txt: '关注成功',
								type: 'correct'
							})
							toast.show();
						} else {
							alert(res.data.msg)
						}
					})
				}

			},
			cancelFollow() {
				let self = this;
				this.axios.post(Api.trendApi + '/community/cancelFocusUser', this.qs.stringify({
					targetUserId:  JSON.parse(localStorage.getItem('Aid')),
					userId: self.userId
				}), {
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					}
				}).then((res) => {
					if (res.data.code == 1) {
						self.isFocus = '';
						let toast = self.$createToast({
							txt: '取消关注',
							type: 'correct'
						})
						toast.show();
					} else {
						alert(res.data.msg)
					}
				})
			},
			goLogin(msg) {
				let self = this;
				let url = window.location.href;
				this.$store.commit('setLoginUrl', url);
				this.$createDialog({
					type: 'confirm',
					icon: 'cubeic-warn',
					title: msg,
					confirmBtn: {
						text: '去登录',
						active: true,
						disabled: false,
						href: 'javascript:;'
					},
					cancelBtn: {
						text: '取消',
						active: false,
						disabled: false,
						href: 'javascript:;'
					},
					onConfirm: () => {
						self.$router.push({
							name: 'login'
						})

					},

				}).show()

			},

		},
	}
</script>

<style lang="scss">
	@import '../../style/common.scss';

	.dynamicHome {
		.top {
			padding: 0 20px 0 20px;
			box-sizing: border-box;
			height: 88px;
			position: fixed;
			top: 0;
			left: 0;
      z-index:100;
			.back {
				width: 26px;
			}

			.share {
				width: 50px;
			}
		}

		.topBg {
			background: rgba(0, 0, 0, 0.3);
		}

		.post {
			height: 360px;
			background: #FFDFDF;
			background-size: 100%;
			position: relative;
			overflow: hidden;

			img {
				width: 100%;
        height: 100%;
				display: block;
        object-fit: cover;
			}
		}

		.userInfoBox {
			border: 1px solid #fff;
			padding-left: 30px;

			.userInfo {
				padding-left: 20px;
				height: 140px;
				margin-top: -69px;
				position: relative;

				.headImg {
					position: absolute;
					left: -14px;
					top: -10px;
					height: 140px;
					width: 140px;
					border-radius: 50%;
					z-index: 100;

					.hPic {
						width: 100%;
						height: 100%;
						border-radius: 50%;
            object-fit: cover;
					}

					.rank {
						height: 34px;
						width: 34px;
						border-radius: 50%;
						color: #fff;
						background: #ff523d;
						text-align: center;
						position: absolute;
						left: 17px;
						top: -5px;
						font-size: 28px;
					}
				}

				.userInfo-r {
					.userName {
						box-sizing: border-box;
						height: 68px;
						background: rgba(0, 0, 0, 0.3);
						padding-left: 160px;
						padding-right: 30px;

						.name {
							font-size: 30px;
							color: #fff;
						}

						.follow {
							width: 100px;
							height: 40px;
							border-radius: 6px;
							border: 1px solid #fff;
							/*px*/
							font-size: 24px;
							color: #fff;
						}
					}

					.fansBox {
						padding-left: 160px;
						padding-right: 18px;
						height: 72px;

						box-sizing: border-box;

						.fansNum {
							width: 160px;
							font-size: 24px;
							color: #333;

							.shuxian {
								height: 33px;
								width: 2px;/*no*/
								background: #333;
							}
						}

						.gumiNum {
							font-size: 24px;
							color: #333;
						}
					}

        }
			}
		}
    .autograph{
      font-size:24px;
      padding:30px 20px 0 20px;
      p{
        width:680px;
        height:60px;
        background:rgba(255,255,255,1);
        box-shadow:0px 4px 12px 0px rgba(15,15,15,0.16);
        border-radius:10px;
        line-height:60px;
        padding:0 20px;
        text-align:center;
        color:#999;
        box-sizing:border-box;
        overflow: hidden;/*超出部分隐藏*/
        white-space: nowrap;/*不换行*/
        text-overflow:ellipsis;/*超出部分文字以...显示*/
      }
    }
		.dynamicNav {
			margin-top: 30px;
			border-bottom: 1px solid #e8e8e8;

			/*no*/
			a {
				font-size: 28px;
				color: #000;
				height: 70px;
				position: relative;

				.hx {
					width: 84px;
					height: 4px;
					background: #ff523d;
					position: absolute;
					left: 50%;
					margin-left: -42px;
					bottom: 0;
					display: none;
				}
			}

			.router-link-active {
				color: #ff523d;

				.hx {
					display: block;
				}
			}

		}

	}
</style>
