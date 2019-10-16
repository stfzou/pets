<template>
	<div class="dynamic">

		<div class="dynamic-list">
			<vue-waterfall-easy :imgsArr="dynamicList" ref="waterfall" :mobileGap="mobileGap"  @click="clickFn" @scrollReachBottom="onPullingUp">
        <div slot="waterfall-over">没有更多了</div>
        <cube-loading slot="loading" slot-scope="{isFirstLoad}" :size="28"></cube-loading>
        <div class="img-info" slot-scope="props">
           <div class="commentNum flex_r_f_s">
             <div class="commentIcon flex_r_f_s">
               <img status="1" src="../../assets/icon_xiaox.png" alt="">
               <span>{{props.value.commentCount}}</span>
             </div>
             <div class="loolIcon flex_r_f_s">
               <img status="1" src="../../assets/icon-chakan.png" alt="">
               <span>{{props.value.lookCount}}</span>
             </div>
           </div>
           <div class="commentCnt">{{props.value.title}}</div>
           <div class="user-info flex_r_s_b">
             <div class="userName flex_r_f_s">
               <img status="1" :src="props.value.userHeadImage" alt="">
               <span>{{props.value.userName}}</span>
             </div>
             <div class="likeBox flex_r_f_s">
               <img status="1" src="../../assets/icon_guanzhu.png" v-if="props.value.isLike===0" alt="" @click="clikeLike(props.value,props.index)">
               <img status="1" src="../../assets/active_guanzhu.png" v-else @click="cancelLike(props.value,props.index)" alt="">
               <span>{{props.value.likeCount}}</span>
             </div>
           </div>
        </div>
      </vue-waterfall-easy>
		</div>

	</div>
</template>

<script>
  import vueWaterfallEasy from 'vue-waterfall-easy'
	import Api from '../common/apj.js'
	export default{
    components:{
      vueWaterfallEasy
    },
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
							res.data.data.forEach((e)=>{
							  e.content = self.decodeUnicode(e.content);
							  e.content = e.content.replace(/[\n\r]/g,'<br>');
							  e.src = e.compressImages.split(',')[0];
							  e.href = 'http://app.gutouzu.com/index.html#/trend?dynamicId='+e.dynamicId;
							});
              self.dynamicList = res.data.data;



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
                res.data.data.forEach((e)=>{
                  e.content = self.decodeUnicode(e.content);
                  e.content = e.content.replace(/[\n\r]/g,'<br>');
                  e.src = e.compressImages.split(',')[0];
                  e.href = 'http://app.gutouzu.com/index.html#/trend?dynamicId='+e.dynamicId;
                });
                self.dynamicList.push(...res.data.data)
                // self.$refs.waterfall.waterfallOver()
                // console.log(res.data.data)
						}else{
							self.$refs.waterfall.waterfallOver()
						}

					}else{
						alert(res.data.msg);

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
      .vue-waterfall-easy-container .vue-waterfall-easy a.img-wraper > img[data-v-ded6b974]{
        border-radius:10px;
      }
      .vue-waterfall-easy-container .vue-waterfall-easy a.img-inner-box[data-v-ded6b974]{
        box-shadow:none;
      }
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
      .img-info{
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
        .commentCnt{
          padding-top:20px;
          line-height:48px;
          font-size:24px;
          color:#000;
        }
        .user-info{
          height:32px;
          padding-top:20px;
          .userName{

            img{
              // width:32px;
              width:40px;
              height:40px;
              border-radius:50%;
              margin-right:10px;
            }
            span{
              font-size:26px;
              color:#000;
            }
          }
          .likeBox{
            width:100px;
            img{
              width:24px;
              margin-right:10px;
            }
          }
        }
      }




		}
	}
</style>
