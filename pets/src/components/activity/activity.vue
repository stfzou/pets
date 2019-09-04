<template>
	<div class="activity_warp">
		<DownApp v-on:closeDown="closeDown" v-show="isDown"></DownApp>
    <div class="couponListDialog flex_r_s_c" @click.stop="dailongHide" v-show="isDialong">
      <div class="dialongCnt" @click.stop>
        <div class="dialongCntTop">
          <div class="title">
            您暂不能参加此次活动
          </div>
          <p>仅限骨米卡特权会员预定，开通骨米卡优选俱乐部会员即可享受特权优惠权益</p>
        </div>
        <div class="btnBox flex_r_s_b">
          <div class="cancelBtn flex_r_s_c" @click="dailongHide">取消</div>
          <div class="okBtn flex_r_s_c" @click="guCardLink">查看权益</div>
        </div>
      </div>

    </div>
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
      <div class="gumi" v-if="isPrivilege===1">骨米卡专享</div>
			<div class="footprint">
				<span>浏览{{browse}}条</span>
				<span>收藏{{keep}}条</span>
				<span>留言{{commentNum}}</span>
			</div>
			<div class="cost">
        <span v-show="maxPrice>0&&maxPrice!=minPrice">{{minPrice}} ~ {{maxPrice}}元</span><span v-show="maxPrice===0">免费</span>
        <span v-show="maxPrice>0&&maxPrice==minPrice">{{maxPrice}}元</span>
       </div>
			<ul class="info_list">
        <li class="flex_r_f_s organizerName">
        	<img class="info_l" src="../../assets/icon_she80@3x.png" alt="">
        	<p><router-link :to="{name:'dynamic',query:{aId:userId}}">{{organizerName}}</router-link></p>
        </li>
				<li class="flex_r_f_s richeng">
					<img class="info_l" src="../../assets/icon_time.png" alt="">
					<p>{{startTime}}~{{endTime}}</p>
				</li>
				<li class="flex_r_f_s right_sjx" @click="goMap">
					<img class="info_l" src="../../assets/icon/map@1x.png" alt="">
					<p>{{activityAddr}}</p>
				</li>
				<li class="flex_r_f_s joinPerson">
					<img class="info_l" src="../../assets/icon_renshu.png" alt="">
					<p>已报名{{joinNum}}人/限{{limitNum}}人报名</p>
				</li>
			</ul>
		</div>
		<div class="line" v-if="isInnerHtml"></div>
		<div class="activity_cnt" v-if="isInnerHtml">
			<!-- <img src="../../assets/active_bg.png" alt=""> -->

		</div>
    <div class="activity_cnt_img" v-if="isCntImg">

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
								<img :src="item.userHeadImgAddr" alt="" @click="homeLink(item)">

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
                <div class="replay" v-if="item.replyContent!=''">
                  <div class="replayTitle">作者回复:</div>
                  <p>{{item.replyContent}}</p>
                </div>
							</div>
						</li>

					</ul>
				</cube-scroll>
			</div>
			<div class="tx" v-else>暂无评论</div>
		</div>
		<div class="active_foot">
			<div class="message_input flex_r_s_b" v-show="isComment">
				<input type="text" @blur.prevent="inputLoseFocus" v-model="msg" maxlength="200" placeholder="留言">
				<span class="send_msg" @click="commitComment">发送</span>
			</div>
			<div class="bottom flex_r_f_s">
				<div class="bot_l flex_r_f_e" style="width: 50%;">
					<div class="collection">
						<img v-if="isCollection == 0" src="../../assets/shoucang.png" alt="" @click="collection">
						<img v-else src="../../assets/collection.png" alt="" @click="cancelCollection">
						<p>收藏</p>
					</div>
					<div class="collection msg">
						<img src="../../assets/icon_she19@3x.png" alt="" @click="commentShow">
						<p>留言</p>
					</div>
				</div>
				<div class="bot_r flex_r_s_c" style="width: 50%;">
					<div class="partake flex_r_s_c" v-if="isConduct==1" @click="join">立即参加</div>
          <div class="partake flex_r_s_c grayBg" v-if="(new Date()).getTime()<(new Date(startTime)).getTime()&&isConduct!=1">未开始</div>
          <div class="partake flex_r_s_c grayBg" v-if="(new Date()).getTime()>=(new Date(endTime)).getTime()&&isConduct!=1">已过期</div>
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
        isDialong:false,
        isCntImg:true,
				msg:'',
        minPrice:0,
        maxPrice:0,
        organizerName:'',
				mainImg:'',//活动主图
				isActiveColor:false,
				center:[],
				activityTitle:'',
				browse:'',
				commentNum:'',
        isComment:false,
				keep:'',
        isPrivilege:'',
				activityAddr:'',
				endTime:'',
				startTime:'',
				activityPrice:'',
				joinNum:'',
				limitNum:'',
				isInnerHtml:true,
        isConduct:'',
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
				isDown:true,
        userId:''

			}
		},
		components:{
			DownApp
		},
		mounted() {
			let self = this;
      localStorage.removeItem("activeOrderNum");
			window.addEventListener('scroll', self.handleScroll)
			this.getUrlData();
			if(JSON.parse(localStorage.getItem('user')) == null){
				// this.$store.commit('setRouterName','activity');
				this.uId = '-1';
			}else{
				this.uId = JSON.parse(localStorage.getItem('user')).userId;
			}
			// console.log(JSON.parse(localStorage.getItem('user')))
			this.getActivity();
			this.getEval();


		},
    descFilter(val){
      if(val.length>15){
        return val.substr(0,15)+'...'
      }else{
        return val
      }
    },
		methods:{
      guCardLink(){
        this.$router.push({
          name:'gumiCard'
        })
      },
      dailongShow() {
        this.isDialong = true;
      },
      dailongHide() {
        this.isDialong = false;

      },
      getCardState(){
        let self = this;
        self.axios.post(Api.userApi + '/boneMika/selectUserBoneMikaStatus', self.qs.stringify({//查询骨米卡状态
          userId: self.uId
        }), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then((re) => {

          if(re.data.code ===1){
            if(re.data.data===1){
              self.$router.push({
              	name:'selectCoupon'
              })
            }else{
              self.isDialong = true;
            }


          }else{
            alert(re.data.msg)
          }

        })
      },
      commentShow(){
        if(this.isComment){
          this.isComment = false;
        }else{
          this.isComment = true;
        }

      },
      homeLink(item){
        this.$router.push({
          name:'dynamic',
          query:{
            aId:item.userId
          }
        })
      },
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
				  /*输出日志*/

				   localStorage.setItem('id',JSON.stringify(returnArr.id));


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
        self.page = 0;
				self.axios.post(Api.userApi+'/ca/selectCommunityActivityComment',self.qs.stringify({
					id:JSON.parse(localStorage.getItem('id')),
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
                console.log(self.evalList)
								self.commentNum = res.data.data.commentNum;
                self.$refs.scroll.forceUpdate();
                setTimeout(()=>{
                   self.$refs.scroll.refresh();
                },200)


							}, 1000)


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
					id:JSON.parse(localStorage.getItem('id')),
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
            self.isPrivilege = res.data.data.isPrivilege;
						self.mainImg = res.data.data.activityCover;
						self.activityTitle = res.data.data.activityTitel;
						self.browse = res.data.data.browse;
						self.keep = res.data.data.keep;
						self.activityAddr = res.data.data.activityAddr;
						self.startTime = res.data.data.startTime;
						self.endTime = res.data.data.endTime;
            self.organizerName = res.data.data.organizerName;
            self.userId = res.data.data.userId;
            if(res.data.data.maxPrice!=0){
              self.maxPrice = res.data.data.maxPrice;
            }
            if(res.data.data.minPrice==0){
              self.minPrice = '免费'
            }else{
              self.minPrice = res.data.data.minPrice;
            }
						self.limitNum = res.data.data.limitNum;
						self.joinNum = res.data.data.joinNum;
						self.lat = res.data.data.latitude;
						self.lng = res.data.data.longitude;
						self.isCollection = res.data.data.isKeep;
             //isCntImg
						if(res.data.data.description==''){
							self.isInnerHtml = false;
						}else{
              var re=/([\n\r])(\s)*(\<\/div\>?(\s)*\<div)+/g;
              document.querySelector(".activity_cnt").innerHTML=res.data.data.description.replace(/[\n\r]/g,'<br>');
							self.isInnerHtml = true;
						}
            if(res.data.data.imgs==''){

              self.isCntImg = false;
            }else{
              document.querySelector(".activity_cnt_img").innerHTML = res.data.data.imgs;
              self.isCntImg = true;
            }
            self.isConduct = res.data.data.isConduct;
						console.log(res.data.data)
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
				this.getEval();

			},
			onPullingUp() {
			// 模拟更新数据

				let self = this;
				this.page++;
				self.axios.post(Api.userApi+'/ca/selectCommunityActivityComment',self.qs.stringify({
					id:JSON.parse(localStorage.getItem('id')),
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
								})
                self.evalList.push(...res.data.data.doList)
                setTimeout(()=>{
                  self.$refs.scroll.refresh();
                },200)


							},800)


						}else{

							setTimeout(()=>{
								self.$refs.scroll.forceUpdate();
                self.$refs.scroll.refresh();
							},500)
						}

					}else{
						self.$refs.scroll.forceUpdate()
					}
				})

			},
			commitComment(){
        let self = this;
				if(JSON.parse(localStorage.getItem('user')) == null){
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
						userId:JSON.parse(localStorage.getItem('user')).userId,
						communityActivityId:JSON.parse(localStorage.getItem('id')),
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
        if(JSON.parse(localStorage.getItem('user')) == null){
        	let self = this;
        	let url = window.location.href;
        	this.$store.commit('setLoginUrl',url);
        	this.$createDialog({
        		type: 'confirm',
        		icon: 'cubeic-warn',
        		title: '需要登录后才进行收藏',
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
          self.axios.post(Api.userApi+'/ca/updateCommunityActivityKeep',self.qs.stringify({
          	userId:JSON.parse(localStorage.getItem('user')).userId,
          	id:JSON.parse(localStorage.getItem('id')),
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
        }


			},
			cancelCollection(){
				let self = this;
				self.axios.post(Api.userApi+'/ca/updateCommunityActivityKeep',self.qs.stringify({
					userId:JSON.parse(localStorage.getItem('user')).userId,
					id:JSON.parse(localStorage.getItem('id')),
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
				if(JSON.parse(localStorage.getItem('user')) == null){
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
					this.getCardState();
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
    background: #fff;
    padding-bottom: 200px;
    .couponListDialog {
      position: fixed;
      height: 100%;
      width: 100%;
      left: 0;
      top: 0;
      z-index: 10000;
      background: rgba(0, 0, 0, 0.6);
      .dialongCnt{
        width: 600px;
        background: #fff;
        padding-top: 50px;
        border-radius: 10px;
        .dialongCntTop{
          .title{
            font-size: 30px;
            color: #000;
            font-weight:bold;
            text-align: center;
          }
          p{
            color: #666;
            font-size: 28px;
            font-weight: bold;
            padding: 50px 30px 0 30px;
            text-align: center;
            line-height: 34px;
          }
        }
        .btnBox {
          box-sizing: border-box;
          padding: 30px 0;
          div {
            width: 50%;
            height: 70px;
            font-size: 30px;
            box-sizing: border-box;
            color: #ff523d;
          }
          .cancelBtn {
            color: #333;
          }
        }
      }

    }
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
        width:500px;
        overflow: hidden;/*超出部分隐藏*/
        text-overflow:ellipsis;/* 超出部分显示省略号 */
        white-space: nowrap;/*规定段落中的文本不进行换行 */
			}
			.share{
				width: 50px;
				height: 40px;
				background: url('../../assets/icon/share@2x.png') no-repeat center 0;
				background-size: 100%;
			}
		}
		.active_nav{
			background: #ff523d;

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
      .gumi{
        width:180px;
        height:30px;
        border-radius:30px;
        background:#ff523d;
        color:#fff;
        font-size:24px;
        line-height:30px;
        text-align:center;
        margin:10px 0;
      }
			.activity_name{
				font-size: 32px;
        line-height: 40px;
				color: #000;
				font-weight: bold;
			}
			.footprint{
				margin-top: 22px;
				span{
					font-size: 26px;
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
          padding: 15px 0;
					.info_l{
						width: 20px;
						margin-right: 8px;
					}
					p{
						font-size: 26px;
						color: #000;
            a{
              color: #000;
            }
					}

				}

				.richeng{
					background: url("../../assets/icon/icon_she55@3x.png") no-repeat 100% center;
					background-size: 28px;
          img{
            width: 30px;
          }
				}
				.right_sjx{

					background: url("../../assets/icon/icon_she56@3x.png") no-repeat 100% center;
					background-size: 28px;
          img{
            width: 28px;
          }

				}
        .organizerName{
          p{
            a{
              font-weight: bold;
            }
          }
          img{
            width: 24px;
          }
        }
        .joinPerson{
          img{
            width: 28px;
          }
        }
			}
		}
		.activity_cnt{
			padding: 30px;
      font-size: 28px;
      line-height: 40px;

		}
    .activity_cnt_img{
      padding: 0 15px;
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
              object-fit: cover;
						}
					}
					.right{
						width: 82%;
						.r_top{
							align-items:flex-start;
							.r_top_l{
								.user_name{
									font-size: 30px;
									color: #333;
									height: 30px;
								}
								.text{
									font-size: 28px;
									color: #000;
									margin-top: 20px;
								}

							}
							.cube-rate-item{
								height: 24px;
								width: 25px;

							}
						}
						.data{
							font-size: 26px;
							color: #999;
							margin-top: 15px;
						}
            .replay{
              background: #fcc9cf;
              padding: 15px;
              padding-top: 20px;
              margin-top: 20px;
              .replayTitle{
                font-size: 26px;
                color: #000;
              }
              p{
                padding-top: 10px;
                font-size: 26px;
                color: #000;
                line-height: 35px;
              }
            }
					}
				}
			}
		}
		.active_foot{
      // height: 110px;
      width: 100%;
      position: fixed;
      left:0;
      bottom: 0;
      background: #fff;
      z-index: 1000;
      border-top: 1px solid #ff523d;
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
          .msg{
            img{
              height: 56px;
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
          .grayBg{
            background: #999;
          }
				}
			}
		}

	}
</style>
