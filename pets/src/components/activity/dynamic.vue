<template>
	<div class="dynamic">

		<div class="dynamic-list">
			<cube-scroll ref="scroll" :options="options" @pulling-up="onPullingUp" @pulling-down="onPullingDown">
				<div class="dynamic-item" v-for="item in dynamicList">
					<div class="item-box">
						<div class="authorInfo flex_r_f_s">
							<div class="author-img">
								<img :src="item.userHeadImage" alt="">
								<!-- <div class="author-vip flex_r_s_c">V</div> -->
							</div>
							<div class="authorNameBox">
								<div class="author-name">{{item.userName}}</div>
								<div class="time">{{item.createdTime}}</div>
							</div>
						</div>
						<div class="author-cnt">
							<div class="text_cnt">
                <router-link :to="{name:'trend',query:{dynamicId:item.dynamicId}}">
                  {{item.content}}
                </router-link>

							</div>
							<div class="trend_img" v-show="item.images!=''">

								<div class="imgs-container flex_r_f_s" v-show="item.compressImages!=''">
									<div class="img-box" v-for="(img,index) in item.compressImages.split(',')" :key="img">
										<img :src="img"  @click="handleImgsClick(item.images,index)" :class="item.compressImages.split(',').length==1?classA:classB">
									</div>

								</div>
							</div>
						</div>
						<div class="addr flex_r_f_s"><img src="../../assets/icon/map@2x.png" alt=""><span>{{item.geoLocation}}</span></div>
            <div class="itemTip" v-if="item.dynamicLabelNames.length>0"><span v-for="subItem in item.dynamicLabelNames">{{subItem}}</span></div>
            <div class="petName" v-if="item.petName!=''"><span>#{{item.petName}}</span>+撸一次</div>
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

	</div>
</template>

<script>
	import Api from '../common/apj.js'
	export default{
		data(){
			return {
				dynamicList:[],
				geoLocation:'',
				scroll:'',
        classA:'imgActive',
        classB:'img',
				page:1,
        aId:'',
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

					},
          bindToWrapper:true
				},
				userId:-1
			}
		},
		mounted() {
			if (JSON.parse(localStorage.getItem('user')) != null) {
				this.userId = JSON.parse(localStorage.getItem('user')).userId;

			}

			// this.getHeight();
      this.getUrlData();
			setTimeout(()=>{
				this.getDynamic();
			},100)

		},
		methods:{
			handleImgsClick(imges,index) {
        let self = this;
        this.axios.get(Api.userApi + '/image/getImageUrlArrays?keys=' + imges, {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then((res)=>{
            if(res.data.code==1){
              self.initialIndex = index
              const params = {
              	$props: {
              		imgs:res.data.data,
              		initialIndex: 'initialIndex', // 响应式数据的key名
              		loop: false
              	},
              	$events: {
              		change: (i) => {
              			// 必须更新 initialIndex
              			self.initialIndex = i
              		}
              	}
              }
              self.$createImagePreview({ ...params
              }).show()
            }

        })


			},
			getDynamic(){
				let self = this;
        this.page = 1;
				self.axios.get(Api.trendApi + '/community/selectDynamicByUserId', {
					params: {
						beLookUserId:self.aId,
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
              self.$refs.scroll.forceUpdate();
							res.data.data.forEach((e)=>{
								e.content = self.decodeUnicode(e.content)
							})
              self.dynamicList = res.data.data;
              setTimeout(()=>{
                self.$refs.scroll.refresh();
              },500)

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
      	/*输出日志*/
      	if(returnArr.aId!=undefined){
      		//localStorage.setItem('Aid',JSON.stringify(returnArr.aId));
          this.aId = returnArr.aId;
      	}
      },
			onPullingUp() {
			// 模拟更新数据

				let self = this;
				this.page++;
				self.axios.get(Api.trendApi + '/community/selectDynamicByUserId', {
					params: {
						beLookUserId:self.aId,
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
                res.data.data.forEach((e)=>{
                	e.content = self.decodeUnicode(e.content)
                });
								self.$refs.scroll.forceUpdate();
                self.dynamicList.push(...res.data.data)
								setTimeout(()=>{
									self.$refs.scroll.refresh();
								},200)
							},1000)

						}else{
							setTimeout(()=>{
								self.$refs.scroll.forceUpdate();
                self.$refs.scroll.refresh();
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
      height: 800px;
      .cube-index-list-nav{
        padding: 20px 0;
       }
       .cube-pullup-wrapper{
         padding-top: 20px;
       }
       .cube-pullup-wrapper .before-trigger{
         padding: 0;
         height: 50px;
         line-height: 50px;
       }
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
                object-fit: cover;
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
							font-size: 28px;
							line-height: 36px;
              a{
                color: #333;
              }
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
                    max-height: 360px;
                    max-width: 100%;
                  }
								}


							}


						}

					}
					.addr{
						padding: 12px 0;
						img{
							width: 20px;
							margin-right: 10px;
						}
						span{
							font-size: 24px;
							color: #666;

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
            padding-bottom: 20px;
            span{
              margin-right: 20px;
            }
          }
					.item-foot{
            border-top: 1px solid #e8e8e8;
						padding: 18px 0;
						span{
							font-size: 26px;
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
