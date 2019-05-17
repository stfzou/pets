<template>
	<div class="dynamic">
		
		<div class="dynamic-list" v-if="dynamicList.length>0">
			<cube-scroll ref="scroll" :options="options" @pulling-up="onPullingUp" @pulling-down="onPullingDown">
				<div class="dynamic-item" v-for="item in dynamicList">
					<div class="item-box">
						<div class="authorInfo flex_r_f_s">
							<div class="author-img">
								<img :src="item.userHeadImage" alt="">
								<div class="author-vip flex_r_s_c">V</div>	
							</div>
							<div class="authorNameBox">
								<div class="author-name">自由犬</div>
								<div class="time">2018-08-20</div>
							</div>
						</div>
						<div class="author-cnt">
							<div class="text_cnt">
								{{item.content}}
							</div>
							<div class="trend_img" v-show="item.images!=''">
								<!-- <img :src="item" alt="" v-for="(item,index) in images" :key="index"> -->
								<div class="imgs-container flex_r_f_s">
									<div class="img-box" v-for="(img,index) in item.images.split(',')" :key="img">
										<img :src="img"  @click="handleImgsClick(item.images,index)">
									</div>
									
								</div>
							</div>
						</div>
						<div class="addr flex_r_f_s"><img src="../../assets/icon/map@2x.png" alt=""><span>{{item.geoLocation}}</span></div>
						<div class="item-foot flex_r_f_e">
							<div class="dynamic-pj flex_r_s_c" @click="dynamicXq(item)">
								<img src="../../assets/icon_xiaox.png" alt="">
								<span>{{item.commentCount}}</span>
							</div>
							<div class="browse-num flex_r_s_c">
								<img src="../../assets/icon-chakan.png" alt="">
								<span>{{item.lookCount}}</span>
							</div>
							<div class="like-num flex_r_s_c">
								<img src="../../assets/icon_guanzhu.png" alt="" v-if="item.isLike == 0" @click="clikeLike(item)">
								<img src="../../assets/active_guanzhu.png" alt="" v-else @click="cancelLike(item)">
								<span>{{item.likeCount}}</span>
							</div>
						</div>
					</div>
					
					<div class="line"></div>
				</div>
			</cube-scroll>
		</div>
		<div class="dynamic-list flex_r_s_c" v-else>
			<cube-loading :size="30"></cube-loading>
		</div>
	</div>
</template>

<script>
	import Api from '../common/apj.js'
	export default{
		data(){
			return{
				dynamicList:[],
				geoLocation:'',
				scroll:'',
				page:1,
				options:{
					pullDownRefresh:{
						txt:'更新成功',
						threshold:40
					},
					pullUpLoad:{
						txt:{
							more: '加载更多', noMore: '没有更多数据了',
						},
						threshold:40,
						
					}
				},
				userId:-1
			}
		},
		mounted() {
			if (JSON.parse(sessionStorage.getItem('user')) != null) {
				this.userId = JSON.parse(sessionStorage.getItem('user')).userId;
			}
			this.getHeight();
			setTimeout(()=>{
				this.getDynamic();
			},100)
			
		},
		methods:{
			handleImgsClick(imges,index) {
				this.initialIndex = index
				const params = {
					$props: {
						imgs: imges.split(','),
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
			getHeight(){
				let elHeight = document.querySelector(".dynamicNav").offsetHeight;
				let elTop = document.querySelector(".dynamicNav").offsetTop;
				let h = document.documentElement.clientHeight - elTop;
				document.querySelector(".dynamic-list").style.height = h+'px';
			},
			getDynamic(){
				let self = this;
				self.axios.get(Api.trendApi + '/community/selectDynamicByUserId', {
					params: {
						beLookUserId: JSON.parse(sessionStorage.getItem('Aid')),
						lookUserId:self.userId,
						page:1,
						rows:5
					}
				}, {
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					}
				}).then((res)=>{
					if(res.data.code == 1){
						console.log(res)
						setTimeout(()=>{
							self.dynamicList = res.data.data;
							self.dynamicList.forEach((e)=>{
								e.content = self.decodeUnicode(e.content)
							})
							self.$refs.scroll.forceUpdate();
							self.$refs.scroll.refresh();
						},500)
					}else{
						alert(res.data.msg);
					}
				})
			},
			onPullingDown() {
			// 模拟更新数据
				this.getDynamic();
				
			},
			onPullingUp() {
			// 模拟更新数据
				
				let self = this;
				this.page++;
				self.axios.get(Api.trendApi + '/community/selectDynamicByUserId', {
					params: {
						beLookUserId: JSON.parse(sessionStorage.getItem('Aid')),
						lookUserId:self.userId,
						page:self.page,
						rows:5
					}
				}, {
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					}
				}).then((res)=>{
					if(res.data.code == 1){
						if(res.data.data.length>0){
							
							setTimeout(()=>{
								self.$refs.scroll.forceUpdate();
								res.data.data.forEach((e)=>{
									e.content = self.decodeUnicode(e.content)
									self.dynamicList.push(e)
								});
								setTimeout(()=>{
									self.$refs.scroll.refresh();
								},100)
							},500)
							
						}else{
							setTimeout(()=>{
								self.$refs.scroll.forceUpdate();
							},500)
						}
						
					}else{
						alert(res.data.msg);
						self.$refs.scroll.forceUpdate();
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
			clikeLike(item) {
				
				if (this.userId == -1) {
					this.goLogin('登录后才能点赞');
				} else {
					let self = this;
					this.axios.post(Api.trendApi + '/community/likeDynamic', this.qs.stringify({
						byLikeUserId:item.userId,
						dynamicId: item.dynamicId,
						userId: self.userId,
						petId:''
					}), {
						headers: {
							'Content-Type': 'application/x-www-form-urlencoded'
						}
					}).then((res) => {
						if (res.data.code == 1) {
							item.isLike = 1;
							item.likeCount++;
						} else {
							alert(res.data.msg)
						}
					})
				}
			
			},
			cancelLike(item) {
			
				let self = this;
				this.axios.post(Api.trendApi + '/community/disLikeDynamic', this.qs.stringify({
					byLikeUserId: item.userId,
					dynamicId: item.dynamicId,
					userId: self.userId
				}), {
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					}
				}).then((res) => {
					if (res.data.code == 1) {
						item.isLike = 0;
						item.likeCount--;
					} else {
						alert(res.data.msg)
					}
				})
			},
			dynamicXq(item){
				this.$router.push({
					name:'trend',
					query:{
						dynamicId:item.dynamicId
					}
				})
			},
			decodeUnicode(str) {
				str = str.replace(/\\/g, "%");
				return unescape(str);
			}
			
		}
	}
</script>

<style lang="scss">
	// @import '../../style/common.scss';
	.dynamic{
		.dynamic-list{
			.dynamic-item{
				.item-box{
					padding: 0 20px;
					.authorInfo{
						height: 100px;
						.author-img{
							height: 60px;
							width: 60px;
							background: #FFDFDF;
							border-radius: 50%;
							position: relative;
							margin-right: 20px;
							img{
								width: 60px;
								height: 60px;
								border-radius: 50%;
							}
							.author-vip{
								height: 20px;
								width: 20px;
								background: #ff523d;
								color: #fff;
								border-radius: 50%;
								position: absolute;
								bottom: -3px;
								right: -3px;
								font-size: 14px;
							}
						}
						.authorNameBox{
							.author-name{
								font-size: 28px;
								color: #000;
							}
							.time{
								font-size: 22px;
								color: #999;
								margin-top: 15px;
							}
						}
						
					}
					.author-cnt{
						.text_cnt{
							margin-bottom: 20px;
							font-size: 24px;
							color: #333;
							line-height: 30px;
						}
						.trend_img {
							.imgs-container{
								flex-wrap: wrap;
								.img-box{
									width: 210px;
									height: 210px;
									position: relative;
									overflow: hidden;
									margin-bottom: 10px;
									
									border-radius: 4px;
									margin-right: 15px;
									img {
										width: 100%;
										height: 100%;
										position: absolute;
										top: 0;
										left: 0;
										// display: block;
										
									}
								}

								
							}
							
						
						}
					
					}
					.addr{
						padding: 12px 0;
						border-bottom: 1px solid #e8e8e8;
						img{
							width: 18px;
							margin-right: 10px;
						}
						span{
							font-size: 22px;
							color: #666;
							
						}
					}
					.item-foot{
						padding: 18px 0;
						span{
							font-size: 22px;
							color: #666;
							margin-left: 10px;
						}
						.dynamic-pj{
							img{
								width: 36px;
							}
							
						}
						.browse-num{
							img{
								width: 41px;
							}
						}
						.like-num{
							img{
								width: 35px;
							}
						}
					}
					
				}
				
				.line{
					height: 10px;
					background: #e8e8e8;
				}
			}
		}
	}
</style>
