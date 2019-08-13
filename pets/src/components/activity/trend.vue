<template>
	<div class="trend_warp">
		<DownApp v-on:closeDown="closeDown" v-show="isDown"></DownApp>
		<div class="top_nav flex_r_s_b">
			<div class="back" @click="back"></div>
			<div class="nav_title">动态正文</div>
			<div class="share flex_r_s_b" @click="reportHide">
				<span></span>
				<span></span>
				<span></span>
			</div>
		</div>
		<div class="trend_cnt">
			<div class="trend_mask" v-if="isMask" @click.stop="maskHide">
				<div class="share_box" v-if="!isReport" @click.stop>
					<div class="share flex_r_f_s" @click.stop="share">
						<img src="../../assets/icon/active_share.png" alt="">
						<span>分享</span>
					</div>
					<div class="report flex_r_f_s" @click.stop="reportShow">
						<img src="../../assets/icon_jubao.png" alt="">
						<span>举报</span>
					</div>
				</div>
				<div class="trend_report" v-else @click.stop>
					<div class="title flex_r_s_b">
						<span class="cancel" @click.stop="maskHide">取消</span>
						<span class="mid">举报</span>
						<span class="confirm" @click="report">确定</span>
					</div>
					<ul class="report_list">
						<li v-for="(item,index) in reportData">
							<div @click="selectReport(item,index)" class="flex_r_s_c" :class="{active:index == activeIndex}">{{item}}</div>
						</li>
					</ul>
				</div>
			</div>
			<div class="userInfo flex_r_f_s">
				<div class="headImg">
					<img :src="userHeadImage" alt="" @click="homeLink">
				</div>
				<div class="mid">
					<div class="userName">{{userName}}</div>
					<div class="time">{{time}}</div>
				</div>
				<div class="follow flex_r_s_c" @click="follow" v-if="isFocus == 0">+关注</div>
				<div class="follow flex_r_s_c" @click="cancelFollow" v-else>取消关注</div>
			</div>
			<div class="text_cnt">
				{{content}}
			</div>
			<div class="trend_img" v-show="images.length>0">
				<!-- <img :src="item" alt="" v-for="(item,index) in images" :key="index"> -->
				<div class="imgs-container flex_r_f_s">
					<div class="img-box" v-for="(img,index) in images" :key="img">
						<img :src="img" @click="handleImgsClick(index)" :class="images.length>0&&images.length==1?classA:classB">
					</div>

				</div>
			</div>
			<div class="trend_label">
				<div class="addr flex_r_f_s" v-if="geoLocation!=''"><img src="../../assets/icon/map@2x.png" alt=""><span>{{geoLocation}}</span></div>
        <div class="itemTip" v-if="dynamicLabelNames.length>0"><span v-for="subItem in dynamicLabelNames">{{subItem}}</span></div>
        <div class="petName" v-if="petName!=''"><span>#{{petName}}</span>+撸一次</div>
				<!-- <div class="footprint flex_r_f_s"><img src="../../assets/footprint.png" alt=""><span>胖太</span></div>
				<div class="explain">#异瞳#</div> -->
			</div>
			<div class="like_box">
				<div class="like flex_r_f_s">
					<i class="cubeic-like" v-if="isLike == 0" @click="clikeLike"></i>
					<i class="cubeic-like active" v-else @click="cancelLike"></i>
					<span>{{likeCount}}人点赞</span>
				</div>
				<div class="like_people flex_r_f_s">
					<div class="likeHeadImg" v-for="(item,index) in likeUserHeadImages">
						<img :src="item.userHeadImage" alt="" @click="likeLink(item)">
					</div>
					<div class="likeHeadImg active flex_r_s_c" v-show="likeLength>7">
						<div class="flex_r_s_b" @click="praiseLink">
							<span></span>
							<span></span>
							<span></span>
						</div>
					</div>

				</div>
			</div>

		</div>
		<div class="line"></div>
		<div class="trend_comment">
			<div class="title flex_r_s_b">
				<div class="title_l flex_r_s_c">
					评论{{commentCount}}
				</div>
				<div class="title_r flex_r_f_s">
					<img src="../../assets/icon-chakan.png" alt="">
					<span>{{lookCount}}</span>
				</div>
			</div>
			<div class="comment_list" v-if="dynamicComments.length>0">
				<cube-scroll ref="scroll" @pulling-up="onPullingUp" @pulling-down="onPullingDown" :options="options">
					<ul>
						<li class="flex_r_s_b" v-for="(item,index) in dynamicComments">
							<div class="list_l">
								<img width="720" :src="item.userHeadImage" alt="" @click="commentLink(item)">
							</div>
							<div class="list_mid">
								<div class="userName">{{item.userName}}</div>
								<div class="comment_cent">{{item.userContent}}</div>
							</div>
							<div class="list_r">{{item.createdTime}}</div>
						</li>
					</ul>
				</cube-scroll>
			</div>
			<div class="comment_list" v-else>
				<div class="tx">暂无评论</div>
			</div>

			<!-- " -->
			<div class="send_comment flex_r_s_b">
				<input type="text" @blur.prevent="inputLoseFocus" v-model="val" placeholder="添加一条评论" />
				<div class="send_btn" @click="addComment">发送</div>
			</div>
		</div>

	</div>
</template>

<script>
	import DownApp from '../common/downApp.vue'
	import Api from '../common/apj.js'
	export default {
		data() {
			return {
				val: '',
        petName:'',
        dynamicLabelNames:[],
        uId:'',
        likeLength:'',
        classA:'imgActive',
        classB:'img',
        compressImages:'',
				isMask: false,
				isReport: false,
				reportData: ['垃圾营销', '有害信息', '违法信息', '诈骗信息', '不实信息'],
				activeIndex: 0,
				userName: '',
				time: '',
				images: [],
				geoLocation: '',
				userHeadImage: '',
				content: '',
				likeUserHeadImages: [],
				likeCount: '',
				lookCount: '',
				commentCount: '',
				authorId: '',
				dynamicId: '',
				isLike: '',
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
						threshold: 20,

					}
				},
				page: 1,
				dynamicComments: [],
				likeData: [],
				isFocus: '',
				userId: -1,
				isDown: true,
				imgSlide: [],
				initialIndex:0,
				reportText:'垃圾营销',
				byReportUserId:'',
				petId:''

			}

		},
		mounted() {

			// let h = document.documentElement.clientHeight - document.querySelector(".title").offsetTop;
			// let bottomH = document.querySelector(".send_comment").offsetHeight;
			// document.querySelector(".comment_list").style.height = (h-bottomH-100)+'px';
			if (JSON.parse(sessionStorage.getItem('user')) != null) {
				this.userId = JSON.parse(sessionStorage.getItem('user')).userId;
			}
			this.getUrlData();
			this.getTrend();
			this.getComment();

		},
		components: {
			DownApp
		},
		methods: {
      homeLink(){
        let self = this;
        this.$router.push({
          name:'dynamic',
          query:{
            aId:self.uId
          }
        })
      },
			handleImgsClick(index) {
				this.initialIndex = index
				const params = {
					$props: {
						imgs: this.images,
						initialIndex: 'initialIndex', // 响应式数据的key名
						loop: false
					},
					$events: {
						change: (i) => {
							// 必须更新 initialIndex
							this.initialIndex = i
						}
					}
				}
				this.$createImagePreview({ ...params
				}).show()
			},
			closeDown() {
				this.isDown = false;
			},
			getUrlData() { // 截取url中的数据

				let tempStr = window.location.href;
				/**
				 * tempArr 是一个字符串数组 格式是["key=value", "key=value", ...]
				 */
        let returnArr = {};
        let urlArr = tempStr.split('?');
        if(urlArr){
          urlArr.forEach((e)=>{

              if(e.indexOf('=')>-1){

                returnArr[e.split('=')[0]] = e.split('=')[1];
              }

          })
        }
				/**
				 * returnArr 是要返回出去的数据对象 格式是 { key: value, key: value, ... }
				 */

				/*输出日志*/
				//console.log(returnArr)
				this.dynamicId = returnArr.dynamicId;

			},
			inputLoseFocus() {
				setTimeout(() => {
				  const scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0;
					window.scrollTo(0, Math.max(scrollHeight - 1, 0));
				},100);

			},
			back() {
				this.$router.go(-1); //返回上一层
			},
			maskHide() {
				this.isMask = false;
			},
			maskShow() {
				this.isMask = true;
			},
			reportShow() {
				this.isReport = true;
				this.isMask = true;
			},
			reportHide() {
				this.isReport = false;
				this.isMask = true;
			},
			selectReport(item,index) {
				this.activeIndex = index;
				this.reportText = item;
			},
			share() {
				this.isMask = false
				let toast = this.$createToast({
					txt: '点击浏览器顶端最右边进行分享',
					type: 'warn'
				})
				toast.show()
			},
			praiseLink() {
				let self = this;
				this.$router.push({
					name: 'praise',
					params: {
						data: self.likeData
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
					title:msg,
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
			getTrend() {
				let self = this;
				self.axios.get(Api.trendApi + '/community/selectDynamicDetails', {
					params: {
						userId: self.userId,
						dynamicId: self.dynamicId
					}
				}, {
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					}
				}).then((res) => {
					if (res.data.code == 1) {
            console.log(res.data.data)
						self.userName = res.data.data.userName;
						self.geoLocation = res.data.data.geoLocation;
            self.dynamicLabelNames = res.data.data.dynamicLabelNames;
            self.petName = res.data.data.petName;
            console.log(res)
						if(res.data.data.images!=''){
							self.images = res.data.data.images.split(',');
						}
            self.compressImages = res.data.data.compressImages.split(',');
						self.time = res.data.data.createdTime.split(' ')[0];
						self.userHeadImage = res.data.data.userHeadImage;
						// self.content = res.data.data.content;
						self.content = self.decodeUnicode(res.data.data.content);
						self.likeCount = res.data.data.likeCount;
						self.likeData = res.data.data.likeUserHeadImages;
						self.isFocus = res.data.data.isFocus;
            self.likeLength = res.data.data.likeUserHeadImages.length;
						if (res.data.data.likeUserHeadImages.length > 7) {
							self.likeUserHeadImages = res.data.data.likeUserHeadImages.slice(-6);
						} else {
							self.likeUserHeadImages = res.data.data.likeUserHeadImages;
						}

						self.lookCount = res.data.data.lookCount;
						self.commentCount = res.data.data.commentCount;
            console.log(res.data.data)
            self.uId = res.data.data.userId;

						self.authorId = res.data.data.userId;
						self.dynamicId = res.data.data.dynamicId;
						self.isLike = res.data.data.isLike;
						self.byReportUserId = res.data.data.userId;
						self.petId = res.data.data.petId;
					} else {
						alert(res.data.msg)
					}
				})
			},
      likeLink(item){
        this.$router.push({
          name:'dynamic',
          query:{
            aId:item.userId
          }
        })
      },
			getComment() {

				let self = this;
				self.axios.get(Api.trendApi + '/community/selectCommentByDynamicId', {
					params: {
						type: 1,
						contentId: self.dynamicId,
						page: self.page,
						rows: 10
					}
				}, {
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					}
				}).then((res) => {
					if (res.data.code == 1) {

						if (res.data.data.length > 0) {
              console.log(res.data.data)
							setTimeout(() => {
								self.dynamicComments = res.data.data;
                //console.log(self.dynamicComments)
								self.dynamicComments.forEach((e)=>{
									e.userContent = self.decodeUnicode(e.userContent);
								})
								self.$refs.scroll.forceUpdate();
								setTimeout(() => {
									self.$refs.scroll.refresh();
								}, 200)
							}, 500)
						}


						// console.log(res)
					} else {
						alert(res.data.msg)
					}
				})


			},
      commentLink(item){
        this.$router.push({
          name:'dynamic',
          query:{
            aId:item.userId
          }
        })
      },
			onPullingDown() {
				// 模拟更新数据
				this.page = 1;
				this.getComment();

			},
			onPullingUp() {
				// 模拟更新数据

				let self = this;
				this.page++;
				self.axios.get(Api.trendApi + '/community/selectCommentByDynamicId', {
					params: {
						type: 1,
						contentId: self.dynamicId,
						page: self.page,
						rows: 10
					}
				}, {
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					}
				}).then((res) => {
					if (res.data.code == 1) {

						// self.dynamicComments = res.data.data;
						if (res.data.data.length > 0) {
							setTimeout(() => {
                self.$refs.scroll.forceUpdate();
								res.data.data.forEach((e) => {
                  e.userContent = self.decodeUnicode(e.userContent);
								})
                self.dynamicComments.push(...res.data.data)

								setTimeout(() => {
									self.$refs.scroll.refresh();
								}, 100)
							}, 500)
						} else {
							setTimeout(() => {
								self.$refs.scroll.forceUpdate();
                self.$refs.scroll.refresh();
							}, 500)

						}

					} else {
						setTimeout(() => {
							self.$refs.scroll.forceUpdate();
              self.$refs.scroll.refresh();
						}, 500)
						alert(res.data.msg)
					}
				})

			},
			addComment() {
				if (this.userId == -1) {
					this.goLogin('登录后才能评论')
				} else {
					let self = this;
					if (self.val == '') {
						let toast = this.$createToast({
							txt: '评论内容不能为空',
							type: 'error'
						})
						toast.show()
						return false;
					} else {
						this.axios.post(Api.trendApi + '/community/addComment', {
							authorId: self.authorId,
							contentId: self.dynamicId,
							userContent: self.val,
							userId: self.userId
						}, {
							headers: {
								'Content-Type': 'application/json'
							}
						}).then((res) => {
							if (res.data.code == 1) {
								self.page = 1;
								self.dynamicComments = [];
								self.getComment();
								self.val = '';
								self.commentCount++;
								let toast = self.$createToast({
									txt: '评论成功',
									type: 'correct'
								})
								toast.show();

							} else {
								alert(res.data.msg);
							}
						})
					}
				}



			},
			clikeLike() {

				if (this.userId == -1) {
					this.goLogin('登录后才能点赞');
				} else {
					let self = this;
					this.axios.post(Api.trendApi + '/community/likeDynamic', this.qs.stringify({
						byLikeUserId:self.byReportUserId,
						dynamicId: self.dynamicId,
						userId: self.userId,
						petId:self.petId
					}), {
						headers: {
							'Content-Type': 'application/x-www-form-urlencoded'
						}
					}).then((res) => {
						if (res.data.code == 1) {
							self.isLike = 1;
							self.likeCount++;
						} else {
							alert(res.data.msg)
						}
					})
				}

			},
			cancelLike() {

				let self = this;
				this.axios.post(Api.trendApi + '/community/disLikeDynamic', this.qs.stringify({
					byLikeUserId: self.authorId,
					dynamicId: self.dynamicId,
					userId: self.userId
				}), {
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					}
				}).then((res) => {
					if (res.data.code == 1) {
						self.isLike = 0;
						self.likeCount--;
					} else {
						alert(res.data.msg)
					}
				})
			},
			follow() {
				if (this.userId == -1) {
					this.goLogin('登录后才能关注');
				} else {
					let self = this;
					this.axios.post(Api.trendApi + '/community/focusUser', this.qs.stringify({
						targetUserId: self.authorId,
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
					targetUserId: self.authorId,
					userId: self.userId
				}), {
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					}
				}).then((res) => {
					if (res.data.code == 1) {
						self.isFocus = 0;
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
			report(){
				if (this.userId == -1) {
					this.isMask = false;
					this.goLogin('登录后才举报');

				}else{
					let self = this;
					this.axios.post(Api.trendApi + '/community/reportDynamic', this.qs.stringify({
						userId:self.userId,
						dynamicId:self.dynamicId,
						reportReason:self.reportText,
						byReportUserId:self.byReportUserId
					}), {
						headers: {
							'Content-Type': 'application/x-www-form-urlencoded'
						}
					}).then((res)=>{
						if(res.data.code == 1){
							let toast = this.$createToast({
								txt: '举报成功',
								type: 'correct'
							  })
							toast.show();
							self.isMask = false;
						}else{
							alert(res.data.msg)
						}
					})
				}

			},
			decodeUnicode(str) {
				str = str.replace(/\\/g, "%");
				return unescape(str);
			},
		}
	}
</script>

<style lang="scss">
	.trend_warp {
		padding-top: 88px;
    padding-bottom: 88px;
    background: #fff;
    .down-headr{
      position: fixed;
      left: 0;
      top: 0;
    }
		.tx {
			font-size: 28px;
			padding: 30px 20px;
			color: #000;
			text-align: center;
		}

		.line {
			height: 10px;
			background: #e8e8e8;
		}

		.top_nav {
			padding: 0 20px;
			height: 88px;
			box-sizing: border-box;
			position: fixed;
			border-bottom: 1px solid #FF523D;
			background: #fff;
			left: 0;
			top: 0;
			z-index: 100;

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

			.share {
				width: 50px;
				height: 10px;

				span {
					width: 6px;
					/*no*/
					height: 6px;
					/*no*/
					border-radius: 50%;
					background: #FF523D;
				}
			}
		}

		.trend_cnt {
			padding: 0 20px 0 20px;
			position: relative;

			.trend_mask {
				height: 100%;
				width: 100%;
				left: 0;
				top: 0;
				position: fixed;
				background: rgba(0, 0, 0, 0.3);
				z-index: 1000;

				.share_box {
					padding: 26px;
					background: #fff;
					border-radius: 10px;
					position: absolute;
					right: 0;
					top: 88px;
					z-index: 10;

					div {
						img {
							width: 30px;
							margin-right: 6px;
						}

						span {
							font-size: 28px;
							color: #333;
						}
					}

					.share {
						margin-bottom: 50px;
					}
				}

				.trend_report {
					position: absolute;
					bottom: 0;
					left: 0;
					width: 100%;
					background: #fff;

					.title {
						height: 70px;
						font-size: 28px;
						color: #333;
						padding: 0 40px;
						box-sizing: border-box;
						border-bottom: 1px solid #ff523d;
						/*no*/
					}

					.report_list {
						li {
							padding: 15px 0;

							div {
								height: 70px;
								box-sizing: border-box;
								font-size: 26px;
								color: #333;
							}

							.active {
								border-top: 1px solid #e8e8e8;
								/*no*/
								border-bottom: 1px solid #e8e8e8;
								/*no*/
								color: #FF523D;
							}
						}
					}
				}
			}

			.userInfo {
				padding: 20px 0;
				box-sizing: border-box;

				.headImg {
					height: 90px;
					width: 90px;
					border-radius: 50%;
					background: #ffdfdf;
					margin-right: 20px;

					img {
						display: block;
						width: 100%;
						height: 100%;
            object-fit: cover;
						border-radius: 50%;
					}
				}

				.mid {
					width: 250px;
					margin-right: 180px;

					.userName {
						font-size: 28px;
						color: #000;
					}

					.time {
						font-size: 22px;
						color: #999;
						margin-top: 16px;
					}
				}

				.follow {
					width: 100px;
					height: 40px;
					border: 1px solid #FF523D;
					/*no*/
					border-radius: 6px;
					color: #FF523D;
					font-size: 24px;
				}
			}

			.text_cnt {
				font-size: 28px;
				color: #333;
				line-height: 36px;
				margin-bottom: 10px;
			}

			.trend_img {
				.imgs-container{
					flex-wrap: wrap;
					.img-box{
						position: relative;
						overflow: hidden;
						margin-bottom: 10px;
						border-radius: 4px;
						margin-right: 15px;
						.img {
							width: 210px;
							height: 210px;
							display: block;
              object-fit: cover;
							display: block;
						}
            .imgActive{
              max-height: 222px;
              max-width:720px
            }
					}

				}


			}

			.trend_label {
				font-size: 26px;
				color: #666;
				margin-top: 5px;

				div {
					line-height: 34px;
				}

				.addr {
          font-size: 26px;
					img {
						width: 22px;
						margin-right: 10px;
					}
				}
        .itemTip{
          padding: 20px 0 30px 0;

          span{
            padding: 5px 10px;
            border: 1px solid #e8e8e8;
            color: #e8e8e8;
            border-radius: 18px;
            font-size: 26px;
            margin-right: 10px;
            margin-bottom: 10px;
          }
        }
        .petName{
          font-size: 26px;
          color: #e8e8e8;
          span{
            margin-right: 20px;
          }
        }
				.footprint {

					margin: 15px 0;

					img {
						width: 26px;
						margin-right: 10px;
					}
				}
			}

			.like_box {
				margin-top: 20px;
        font-size: 26px;
				.like {
					i {
						font-size: 28px;
						margin-right: 10px;
						color: #999;

					}

					.active {
						color: #ff523d;
					}

					span {
						font-size: 26px;
						color: #666;
					}
				}

				.like_people {
					padding: 20px 0 30px 0;

					.likeHeadImg {
						width: 90px;
						height: 90px;
						border-radius: 50%;
						background: #ffdfdf;
            margin-left: 8px;
						img {
							width: 100%;
							height: 100%;
							border-radius: 50%;
						}
					}
          .likeHeadImg:first-child{
            margin-left: 0;
          }
					.active {
						background: #e8e8e8;

						div {
							width: 50px;
							height: 10px;

							span {
								height: 6px;
								/*no*/
								width: 6px;
								/*no*/
								border-radius: 50px;
								background: #999999;
							}
						}

					}
				}
			}
		}

		.trend_comment {
			.title {
				height: 70px;
				border-bottom: 1px solid #e8e8e8;
				/*no*/
				padding: 0 20px;
				box-sizing: border-box;

				.title_l {
					height: 70px;
					width: 106px;
					border-bottom: 1px solid #ff523d;
					/*no*/
					box-sizing: border-box;
					color: #ff523d;
					font-size: 26px;
				}

				.title_r {
					width: 100px;

					img {
						width: 40px;
						margin-right: 10px;
					}

					span {
						font-size: 26px;
						color: #666;
					}
				}
			}

			.comment_list {
				height: 350px;
        box-sizing: border-box;
				ul {
					padding: 0 20px;

					li {
						padding: 30px 0;
						box-sizing: border-box;
						border-bottom: 1px solid #e8e8e8;
						/*no*/
						;
						align-items: flex-start;

						.list_l {
							height: 90px;
							width: 90px;
							border-radius: 50%;
							background: #ffdfdf;
							border-radius: 50%;

							img {
								display: block;
								width: 100%;
								height: 100%;
								border-radius: 50%;
							}
						}

						.list_mid {
							width: 430px;

							.userName {
								font-size: 28px;
								color: #333;
								line-height: 54px;
							}

							.comment_cent {
								font-size: #000;
								font-size: 26px;
								line-height: 54px;
							}
						}

						.list_r {
							font-size: 24px;
							color: #999;
							width: 130px;
						}
					}

					li:last-child {
						border: none;
					}
				}
			}

			.send_comment {
				padding:0 20px;
				height: 104px;
				box-sizing: border-box;
				border-top: 1px solid #ff523d;
				position: fixed;
				background: #fff;
				z-index: 100;
				bottom: 0;
				left: 0;
				input {
					padding: 15px;
					border-radius: 40px;
					border: 1px solid #e8e8e8;
					/*no*/
					font-size: 26px;
					color: #333;
					width: 600px;
					box-sizing: border-box;
				}

				.send_btn {
					font-size: 26px;
					color: #999;
				}
			}
		}
	}
</style>
