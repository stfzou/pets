<template>
	<div class="activity_warp">
		<DownApp v-on:closeDown="closeDown" v-show="isDown"></DownApp>
		<div class="top_nav flex_r_s_b" :class="{active_nav:isActiveColor}">
			<div class="back" @click="back"></div>
			<div class="nav_title">{{activityTitle}}</div>
			<div class="share" @click="share"></div>
		</div>
		<div class="activity_filter">
			<img :src="mainImg" alt="">
		</div>
		<div class="activity_img">
			<img :src="mainImg" alt="">
		</div>
		<div class="activity_info">
			<div class="activity_name">{{activityTitle}}</div>
			<div class="footprint">
				<span>浏览{{browse}}条</span>
				<span>收藏{{keep}}条</span>
				<span>留言{{commentNum}}</span>
			</div>
			<div class="cost">{{activityPrice}}</div>
			<ul class="info_list">
				<li class="flex_r_f_s richeng">
					<img class="info_l" src="../../assets/icon_time.png" alt="">
					<p>{{startTime}}~{{endTime}}</p>
				</li>
				<li class="flex_r_f_s right_sjx" @click="goMap">
					<img class="info_l" src="../../assets/icon/map@1x.png" alt="">
					<p>{{activityAddr}}</p>
				</li>
				<li class="flex_r_f_s">
					<img class="info_l" src="../../assets/icon_renshu.png" alt="">
					<p>已报名{{joinNum}}人/限{{limitNum}}人报名</p>
				</li>
			</ul>
		</div>
		<div class="line" v-if="isInnerHtml"></div>
		<div class="activity_cnt" v-if="isInnerHtml">
			<!-- <img src="../../assets/active_bg.png" alt=""> -->
			
		</div>
		<div class="line"></div>
		<div class="message_cnt">
			<div class="title">
				<p v-if="evalList.length>0">留言({{commentNum}})</p>
				<p v-else>留言(0)</p>
			</div>
			<div class="msg_box" v-if="evalList.length>0">
				<cube-scroll ref="scroll" @pulling-up="onPullingUp" @pulling-down="onPullingDown" :options="options">
					<ul class="eval_list">
						<li class="flex_r_s_b list_item" v-for="(item,index) in evalList" :key="index">
							<div class="head_icon">
								<img :src="item.userHeadImgAddr" alt="">
								
							</div>
							<div class="right">
								<div class="r_top flex_r_s_b">
									<div class="r_top_l">
										<div class="user_name">
											<span v-if="item.userName!=null">{{item.userName}}</span>
											<span v-else>未设置</span>
										</div>
										<div class="text">{{item.content}}</div>
									</div>
								
								</div>
								
								<div class="data">{{item.createTime}}</div>
							</div>
						</li>
						
					</ul>
				</cube-scroll>
			</div>
			<div class="tx" v-else>暂无评论</div>
		</div>
		<div class="active_foot">
			<div class="message_input flex_r_s_b">
				<input type="text" @blur.prevent="inputLoseFocus" v-model="msg" placeholder="留言">
				<span class="send_msg" @click="commitComment">发送</span>
			</div>
			<div class="bottom flex_r_f_s">
				<div class="bot_l flex_r_f_e" style="width: 50%;">
					<div class="collection">
						<img v-if="isCollection == 0" src="../../assets/shoucang.png" alt="" @click="collection">
						<img v-else src="../../assets/collection.png" alt="" @click="cancelCollection">
						<p>收藏</p>
					</div>
					<div class="collection">
						<img src="../../assets/icon_kefu.png" alt="">
						<p>客服</p>
					</div>
				</div>
				<div class="bot_r flex_r_s_c" style="width: 50%;">
					<div class="partake flex_r_s_c" @click="join">立即参加</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import DownApp from '../common/downApp.vue'
	import Api from '../common/apj.js'
	export default{
		data(){
			let self = this;
			return {
				evalList:[],
				msg:'',
				mainImg:'',//活动主图
				isActiveColor:false,
				center:[],
				activityTitle:'',
				browse:'',
				commentNum:'',
				keep:'',
				activityAddr:'',
				endTime:'',
				startTime:'',
				activityPrice:'',
				joinNum:'',
				limitNum:'',
				isInnerHtml:true,
				page:0,
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
				collectionImg:'',
				isCollection:'',
				uId:'-1',
				isDown:true
				
			}
		},
		components:{
			DownApp
		},
		mounted() {
			let self = this;
			window.addEventListener('scroll', self.handleScroll)
			
			this.getUrlData();
			if(JSON.parse(sessionStorage.getItem('user')) == null){
				// this.$store.commit('setRouterName','activity');
				this.uId = '-1';
			}else{
				this.uId = JSON.parse(sessionStorage.getItem('user')).userId;
			}
			
			// console.log(JSON.parse(sessionStorage.getItem('user')))
			this.getActivity();
			this.getEval();
			
			
		},
		methods:{
			closeDown(){
				this.isDown = false;
			},
			back() {
				this.$router.go(-1); //返回上一层
			},
			inputLoseFocus() {
				setTimeout(() => {
				  const scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0;
					window.scrollTo(0, Math.max(scrollHeight - 1, 0));
				},100);
				
			},
			getUrlData() {// 截取url中的数据
			    
				   let tempStr = window.location.href
				   /**
				   * tempArr 是一个字符串数组 格式是["key=value", "key=value", ...]
				   */
				   let tempArr = tempStr.split('?')[1] ? tempStr.split('?')[1].split('&') : []
				   /**
				   * returnArr 是要返回出去的数据对象 格式是 { key: value, key: value, ... }
				   */
				   let returnArr = {}
				   tempArr.forEach(element => {
				   returnArr[element.split('=')[0]] = element.split('=')[1]
				   })
				  /*输出日志*/
				   
				   sessionStorage.setItem('id',JSON.stringify(returnArr.id));
					
			  
			  },
	
			handleScroll () {
				
				setTimeout(()=>{
					var scrollTop = window.scrollY;
					let elHeight = document.querySelector(".activity_filter").offsetHeight;
					if(scrollTop>elHeight){
						
						this.isActiveColor = true;
					}else{
						this.isActiveColor = false;
						
					}
					if(scrollTop>0){
						this.isDown = false;
					}else{
						this.isDown = true;
					}
				},200)
			  
			},
			getEval(){
				let self = this;
				self.axios.post(Api.userApi+'/ca/selectCommunityActivityComment',self.qs.stringify({
					id:JSON.parse(sessionStorage.getItem('id')),
					pageNo:self.page,
					pageSize:5
				}), {
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					}
				}).then((res)=>{
					if(res.data.code == 1){
						if(res.data.data.doList.length>0){
							setTimeout(() => {
								
								self.evalList = res.data.data.doList;
								self.evalList.forEach((e)=>{
									e.content = self.decodeUnicode(e.content);
								})
								
								self.commentNum = res.data.data.commentNum;
							}, 500)
						}
						
					}else{
						let toast = self.$createToast({
							txt:res.data.msg,
							type: 'error'
						  })
						toast.show()
					}
				})
			},
			goMap(){
				let self = this;
				this.$router.push({
					name:'activityMap',
					query:{
						lat:self.lat,
						lng:self.lng,
						name:self.activityAddr
					}
				})
			},
			getActivity(){
				let self = this;
				self.axios.post(Api.userApi+'/ca/selectCommunityActivityDetails',self.qs.stringify({
					id:JSON.parse(sessionStorage.getItem('id')),
					userId:self.uId,
					latitude:0,
					longitude:0
				}), {
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					}
				}).then((res)=>{
					if(res.data.code == 1){
						console.log(res)
						self.mainImg = res.data.data.activityCover;
						self.activityTitle = res.data.data.activityTitel;
						self.browse = res.data.data.browse;
						self.keep = res.data.data.keep;
						self.activityAddr = res.data.data.activityAddr;
						self.startTime = res.data.data.startTime;
						self.endTime = res.data.data.endTime;
						if(res.data.data.isToll == 0){
							self.activityPrice = '免费'
						}else{
							self.activityPrice = '活动费用最少'+ res.data.data.minPrice+'元'
						}
						self.limitNum = res.data.data.limitNum;
						self.joinNum = res.data.data.joinNum;
						self.lat = res.data.data.latitude;
						self.lng = res.data.data.longitude;
						self.isCollection = res.data.data.isKeep;
						
						if(res.data.data.description==''){
							self.isInnerHtml = false;
						}else{
							document.querySelector(".activity_cnt").innerHTML = res.data.data.description;
							self.isInnerHtml = true;
						}
						console.log(res.data.data.description)
						// console.log(res.data.data.description)
						// self.evalList = res.data.data.commentVos;
					}else{
						let toast = self.$createToast({
							txt:res.data.msg,
							type: 'error'
						  })
						toast.show()
					}
				})
			},
			onPullingDown() {
			// 模拟更新数据
				this.page = 0;
				this.getEval();
				setTimeout(() => {
					this.$refs.scroll.forceUpdate()
				}, 600)
				setTimeout(() => {
					this.$refs.scroll.refresh();
				}, 800)
			},
			onPullingUp() {
			// 模拟更新数据
				
				let self = this;
				this.page++;
				self.axios.post(Api.userApi+'/ca/selectCommunityActivityComment',self.qs.stringify({
					id:JSON.parse(sessionStorage.getItem('id')),
					pageNo:self.page,
					pageSize:5
				}), {
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					}
				}).then((res)=>{
					
					if(res.data.code == 1){
						
						if(res.data.data.doList.length>0){
							
							setTimeout(()=>{
								self.$refs.scroll.forceUpdate();
								res.data.data.doList.forEach((e)=>{
									e.content = self.decodeUnicode(e.content);
									self.evalList.push(e)
								})
								
							},500)
							setTimeout(() => {
								self.$refs.scroll.refresh();
							}, 600)
							
						}else{
							
							setTimeout(()=>{
								self.$refs.scroll.forceUpdate();
							},500)
						}
						
					}else{
						self.$refs.scroll.forceUpdate()
					}
				})
			
			},
			commitComment(){
				
				if(JSON.parse(sessionStorage.getItem('user')) == null){
					let self = this;
					let url = window.location.href;
					this.$store.commit('setLoginUrl',url);
					this.$createDialog({
						type: 'confirm',
						icon: 'cubeic-warn',
						title: '需要登录后才能评论',
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
						  	name:'login'
						  })
						},
						
					 }).show()
					
				}else if(self.msg == ''){
					let toast = self.$createToast({
						txt: '评论不能为空',
						type: 'error'
					  })
					toast.show()
				}else{
					let self = this;
					self.axios.post(Api.userApi+'/ca/addCommunityActivityComment',self.qs.stringify({
						userId:JSON.parse(sessionStorage.getItem('user')).userId,
						communityActivityId:JSON.parse(sessionStorage.getItem('id')),
						content:self.msg
					}), {
						headers: {
							'Content-Type': 'application/x-www-form-urlencoded'
						}
					}).then((res)=>{
						if(res.data.code == 1){
							self.msg = '';
							self.page = 0;
							self.getEval();
							let toast = self.$createToast({
								txt: '提交成功',
								type: 'correct'
							  })
							toast.show()
							setTimeout(()=>{
								
								self.$refs.scroll.scrollTo(0,0);
								
							},500)
							
						}else{
							
							let toast = self.$createToast({
								txt:res.data.msg,
								type: 'error'
							  })
							toast.show()
						}
					})
				}
				
			},
			collection(){
				let self = this;
				self.axios.post(Api.userApi+'/ca/updateCommunityActivityKeep',self.qs.stringify({
					userId:JSON.parse(sessionStorage.getItem('user')).userId,
					id:JSON.parse(sessionStorage.getItem('id')),
					status:1
				}), {
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					}
				}).then((res)=>{
					if(res.data.code == 1){
						self.isCollection = 1;
						let toast = self.$createToast({
							txt: '收藏成功',
							type: 'correct'
						  })
						toast.show()
					}else{
						let toast = self.$createToast({
							txt:res.data.msg,
							type: 'error'
						  })
						toast.show()
					}
				})
			},
			cancelCollection(){
				let self = this;
				self.axios.post(Api.userApi+'/ca/updateCommunityActivityKeep',self.qs.stringify({
					userId:JSON.parse(sessionStorage.getItem('user')).userId,
					id:JSON.parse(sessionStorage.getItem('id')),
					status:0
				}), {
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					}
				}).then((res)=>{
					if(res.data.code == 1){
						self.isCollection = 0;
						let toast = self.$createToast({
							txt: '取消收藏',
							type: 'correct'
						  })
						toast.show()
					}else{
						let toast = self.$createToast({
							txt:res.data.msg,
							type: 'error'
						  })
						toast.show()
					}
				})
			},
			join(){
				let self = this;
				if(JSON.parse(sessionStorage.getItem('user')) == null){
					let url = window.location.href;
					this.$store.commit('setLoginUrl',url);
					this.$createDialog({
						type: 'confirm',
						icon: 'cubeic-warn',
						title: '需要登录后才能参加活动',
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
						  	name:'login'
						  })
						},
						
					 }).show()
					
				}else{
					this.$router.push({
						name:'selectCoupon'
					})
				}
				
			},
			share(){
				let toast = this.$createToast({
					txt: '点击顶部右上角进行分享',
					type: 'warn'
				  })
				toast.show()
			},
			decodeUnicode(str) {
				str = str.replace(/\\/g, "%");
				return unescape(str);
			}
		}
	
	}
</script>

<style lang="scss">
	.activity_warp{
		
		.line{
			height: 10px;
			background: #e8e8e8;
		}
		.top_nav {
			padding: 0 20px;
			height: 88px;
			box-sizing: border-box;
			position: fixed;
			z-index: 100;
			left: 0;
			top: 0;
			.back {
				width: 26px;
				height: 42px;
				background: url(../../assets/icon/back@2x.png) no-repeat center 0;
				background-size: cover;
			}
		
			.nav_title {
				font-size: 30px;
				color: #fff;
				position: absolute;
				left: 50%;
				top: 50%;
				transform: translate(-50%, -50%);
		
			}
			.share{
				width: 50px;
				height: 40px;
				background: url('../../assets/icon/share@2x.png') no-repeat center 0;
				background-size: 100%;
			}
		}
		.active_nav{
			background: #fff;
			.back{
				background: url(../../assets/icon/backColory.png) no-repeat center 0;
				background-size: cover;
			}
			.share{
				background: url('../../assets/icon/active_share.png') no-repeat center 0;
				background-size: 100%;
			}
			.nav_title{
				color: #ff523d;
			}
		}
		.activity_filter{
			height: 430px;
			img{
				width: 100%;
				height: 100%;
				-webkit-filter: blur(30px); /* Chrome, Opera */
				-moz-filter: blur(30px);
				-ms-filter: blur(30px);    
				filter: blur(30px);
			}
		}
		.activity_img{
			height: 70px;
			position: relative;
			img{
				position: absolute;
				width: 600px;
				height: 400px;
				border-radius: 20px;
				top: -330px;
				left: 50%;
				margin-left: -300px;
			}
		}
		.activity_info{
			padding: 30px;
			.activity_name{
				font-size: 36px;
				color: #000;
				// font-weight: bold;
			}
			.footprint{
				margin-top: 22px;
				span{
					font-size: 22px;
					color: #666;
					margin-right: 30px;
				}
			}
			.cost{
				height: 110px;
				line-height: 110px;
				color: #ff523d;
				font-size: 30px;
			}
			.info_list{
				li{
					.info_l{
						width: 20px;
						margin-right: 8px;
					}
					p{
						font-size: 26px;
						color: #000;
						
					}
					
				}
				
				.richeng{
					background: url("../../assets/icon/icon_she55@3x.png") no-repeat 100% center;
					background-size: 22px;
				}
				.right_sjx{
					
					background: url("../../assets/icon/icon_she56@3x.png") no-repeat 100% center;
					background-size: 24px;
					margin: 35px 0;
				}
			}
		}
		.activity_cnt{
			padding: 30px;
			div{
				font-size: 24px;
				line-height: 34px;
				color: #000;
				margin-bottom: 10px;
			}
			img{
				width: 100%;
				display: block;
			}
		}
		.message_cnt{
			.title{
				padding: 20px;
				border-bottom: 1px solid #e8e8e8;/*no*/
				p{
					font-size: 28px;
					color: #000;
					border-left: 4px solid #ff523d;
					padding-left: 14px;
				}
			}
			.tx{
				padding: 30px 20px;
				font-size: 28px;
				color: #000;
				text-align: center;
			}
			.msg_box{
				height: 400px;
			}
			.eval_list{
				height: auto;
				
				.list_item{
					padding: 30px 20px;
					box-sizing: border-box;
					
					align-items:flex-start;
					border-bottom: 1px solid #e8e8e8;/*no*/
					.head_icon{
						height: 90px;
						width: 90px;
						border-radius: 50%;
						background: #FFDFDF;
						img{
							height: 90px;
							width: 90px;
							border-radius: 50%;
						}
					}
					.right{
						width: 82%;
						.r_top{
							align-items:flex-start;
							.r_top_l{
								.user_name{
									font-size: 24px;
									color: #333;
									height: 30px;
								}
								.text{
									font-size: 26px;
									color: #000;
									margin-top: 26px;
								}
								
							}
							.cube-rate-item{
								height: 24px;
								width: 25px;
								
							}
						}
						.data{
							font-size: 20px;
							color: #999;
							margin-top: 40px;
						}
						
					}
				}
			}
		}
		.active_foot{
			.message_input{
				padding: 20px;
				box-sizing: border-box;
				input{
					border-radius: 50px;
					font-size: 26px;
					color: #999;
					border: 1px solid #e8e8e8;/*no*/
					padding: 20px;
					width: 600px;
					box-sizing: border-box;
					outline: none;
					color: #000;
				}
				.send_msg{
					font-size: 28px;
					color: #ff523d;
				}
			}
			.bottom{
				padding: 0 20px;
				box-sizing: border-box;
				.bot_l{
					.collection{
						padding-top: 10px;
						box-sizing: border-box;
						img{
							display: block;
							height: 56px;
							margin: 0 auto;
						}
						p{
							padding: 10px 0;
							font-size: 24px;
							color: #000;
							text-align: center;
						}
					}
				}
				.bot_r{
					.partake{
						height: 80px;
						background: #ff523d;
						color: #fff;
						font-size: 28px;
						border-radius: 10px;
						width: 100%;
					}
				}
			}
		}
		
	}
</style>
