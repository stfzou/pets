<template>
	<div class="dynamic">

		<div class="dynamic-list">
      <cube-scroll ref="scroll" @pulling-up="onPullingUp" @pulling-down="onPullingDown" :options="options">
      <div class="img-info" v-for="(item,index) in dynamicList">
        <div class="user-info flex_r_s_b">
          <div class="userName flex_r_f_s">
            <img status="1" :src="item.userHeadImage" alt="">
            <span>{{item.userName}}</span>
          </div>
          <div class="likeBox flex_r_f_s">
            <img status="1" src="../../assets/icon_guanzhu.png" v-if="item.isLike===0" alt="" @click="clikeLike(item,index)">
            <img status="1" src="../../assets/active_guanzhu.png" v-else @click="cancelLike(item,index)" alt="">
            <span>{{item.likeCount}}</span>
          </div>
        </div>
        <div class="img-box img-box1" v-if="item.compressImages.split(',').length===1">
          <div>
            <img @click="handleImgsClick(item,0)" :src="item.compressImages.split(',')[0]" alt="">
          </div>

        </div>
        <div class="img-box2 flex_r_s_b" v-if="item.compressImages.split(',').length===2">
          <div class="img_l">
             <img @click="handleImgsClick(item,0)" :src="item.compressImages.split(',')[0]" alt="">
          </div>
         <div class="img_r">
           <img @click="handleImgsClick(item,1)" :src="item.compressImages.split(',')[1]" alt="">
         </div>
        </div>
        <div class="img-box3 flex_r_s_b" v-if="item.compressImages.split(',').length>=3">
          <div class="img_l">
             <img @click="handleImgsClick(item,0)" :src="item.compressImages.split(',')[0]" alt="">
          </div>
         <div class="img_r flex_c_s_b">
           <div class="img-top">
             <img @click="handleImgsClick(item,1)" class="pic" :src="item.compressImages.split(',')[1]" alt="">
           </div>
           <div class="img-bottom">
             <img class="pic" @click="handleImgsClick(item,2)" :src="item.compressImages.split(',')[2]" alt="">
             <div class="mark flex_r_s_c" @click="dynamicXq(item)" v-if="item.compressImages.split(',').length>3">
               <img src="../../assets/icon_gu97@3x.png" alt="">
               <span>{{item.compressImages.split(',').length}}+</span>
             </div>
           </div>

         </div>
        </div>
         <div class="commentNum flex_r_f_s">
           <div class="commentIcon flex_r_f_s">
             <img status="1" src="../../assets/icon_xiaox.png" alt="">
             <span>{{item.commentCount}}</span>
           </div>
           <div class="loolIcon flex_r_f_s">
             <img status="1" src="../../assets/icon-chakan.png" alt="">
             <span>{{item.lookCount}}</span>
           </div>
         </div>
         <div class="commentCnt" @click="dynamicXq(item)">{{item.title}}</div>
         <div class="addr flex_r_f_s"><img src="../../assets/icon/map@2x.png" alt=""><span>{{item.geoLocation}}</span></div>
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
        isLoading:false,
        mobileGap:15,
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
      this.aId = this.getUrlKey('aId');
			setTimeout(()=>{
				this.getDynamic();
			},100)

		},
		methods:{
      
			handleImgsClick(item,index) {
        let self = this;
        this.axios.get(Api.userApi + '/image/getImageUrlArrays?keys=' + item.images, {
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
              //console.log(res)
              self.dynamicList = res.data.data;
					}else{
						alert(res.data.msg);
					}
				})
			},
			onPullingDown() {
			// 模拟更新数据
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

              setTimeout(() => {
                self.$refs.scroll.forceUpdate();
              	self.dynamicList = res.data.data;
              	setTimeout(() => {
              		self.$refs.scroll.refresh();
              	}, 100)
              }, 500)
					}else{
						setTimeout(() => {
							self.$refs.scroll.forceUpdate();
						  self.$refs.scroll.refresh();
						}, 500)
					}
				})

			},

      getUrlKey(name){
          return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[1].replace(/\+/g, '%20')) || null
      },
			onPullingUp() {
			// 模拟更新数据
				let self = this;
        self.page++
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
            if (res.data.data.length > 0) {
            	setTimeout(() => {
                self.$refs.scroll.forceUpdate();

                self.dynamicList.push(...res.data.data)

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
					}else{
						alert(res.data.msg);
            setTimeout(() => {
            	self.$refs.scroll.forceUpdate();
            }, 500)
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
			clikeLike(item,index) {

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
              // self.dynamicList[index].isLike = 1
              // self.dynamicList[index].likeCount++
							item.isLike = 1;
							item.likeCount++;
						} else {
							alert(res.data.msg)
						}
					})
				}

			},
			cancelLike(item,index) {

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
						// item.isLike = 0;
						// item.likeCount--;
            item.isLike = 0
            item.likeCount--
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
			},
      clickFn(event, { index, value }) {
          // 阻止a标签跳转
          event.preventDefault()
          // 只有当点击到图片时才进行操作
          if (event.target.tagName.toLowerCase() == 'img'&&event.target.getAttribute('status')!=1) {
            this.$router.push({
            	name:'trend',
            	query:{
            		dynamicId:value.dynamicId
            	}
            })

          }
      }
		}
	}
</script>

<style lang="scss">
	// @import '../../style/common.scss';
	.dynamic{
		.dynamic-list{
      height: 800px;
      background:#fff;

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
      .img-info:last-child{
        border:none;
      }
      .img-info{
        border-bottom:10px solid #e8e8e8;
        padding:0 20px 30px 20px;
        .img-box1{
          padding-top:30px;
          div{
            width:680px;
            height:680px;
            img{
              width:100%;
              height:100%;
              object-fit: cover;
              border-radius:20px;
            }
          }

        }
        .img-box2{
          padding-top:30px;
          div{
            width:330px;
            height:440px;
          }
          img{
            width:100%;
            height:100%;
            object-fit: cover;
            border-radius:20px;
          }
        }
        .img-box3{
           padding-top:30px;
          .img_l{
            width:450px;
            height:600px;
            img{
              width:100%;
              height:100%;
              object-fit: cover;
              border-radius:20px;
            }
          }
          .img_r{
            height:600px;
            width:210px;
            div{
              width:210px;
              height:293px;
              position: relative;
            }
            .img-bottom{
              .mark{
                position: absolute;
                left:0;
                top:0;
                width:100%;
                height:100%;
                background:rgba(0,0,0,0.4);
                border-radius:20px;
                img{
                  width:30px;
                  margin-right:10px;
                }
                span{
                  color:#fff;
                  font-size:28px;
                }
              }
            }
            .pic{
              object-fit: cover;
              width:100%;
              height:100%;
              border-radius:20px;
            }
          }
        }
        .commentNum{
          font-size:22px;
          color:#666;
          padding-top:20px;
          .commentIcon{
            img{
              width:36px;
              margin-right:10px;
            }
          }
          .loolIcon{
            img{
              width:40px;
              margin-right:10px;
            }
          }

        }
        .addr{
          padding-top:10px;
          img{
            width:26px;
            margin-right:15px;
          }
          span{
            font-size:24px;
            color:#999;
          }
        }
        .commentCnt{
          padding-top:20px;
          line-height:48px;
          font-size:24px;
          color:#000;
        }
        .user-info{
          height:60px;
          padding-top:20px;
          .userName{

            height:60px;
            img{
              // width:32px;
             width: 60px;
             height: 60px;
             border-radius: 50%;
             object-fit: cover;
             margin-right:20px;
            }
            span{
              font-size:26px;
              color:#000;
            }
          }
          .likeBox{
            width:100px;
            font-size:22px;
            img{
              width:35px;
              margin-right:10px;
            }
          }
        }
      }




		}
	}
</style>
