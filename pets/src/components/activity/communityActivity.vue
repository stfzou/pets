<template>
  <div class="communityActivity">
      <div class="top_nav flex_r_s_b">
      	<div class="back" @click="back"></div>
      	<div class="nav_title">陪你一起过圣诞节</div>
      </div>
      <div class="cntWarp">
        <vue-waterfall-easy :imgsArr="dynamicList" :mobileGap="mobileGap" @click="clickFn"  ref="waterfall"   @scrollReachBottom="onPullingUp">
            <div slot="waterfall-head" class="waterfallHead">
              <div class="activityImg flex_r_s_c">
               <img status="1" src="../../assets/as_post.jpg" alt="">
              </div>
              <div class="activityData">活动时间：2019/12/22~2019/12/30</div>
              <div class="activityText">哈哈哈哈<br>嘻嘻嘻<br>嘿嘿嘿</div>
            </div>
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
      return{
        dynamicList:[],
        mobileGap:15,
        page:1,

      }
    },
    mounted() {
      this.getDynamic();
    },
    methods:{
      back() {
      	this.$router.go(-1); //返回上一层
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
      },
      getDynamic(){
      	let self = this;
      	self.axios.get(Api.trendApi + '/community/selectDynamicByUserId', {
      		params: {
      			beLookUserId:42,
      			lookUserId:38,
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
      onPullingUp(){
        let self = this;
        this.page++;
        self.axios.get(Api.trendApi + '/community/selectDynamicByUserId', {
        	params: {
        		beLookUserId:42,
        		lookUserId:38,
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
      }
    }
  }
</script>

<style lang="scss">
  .communityActivity{
    height:100%;
    position:relative;
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
    }
    .cntWarp{
      position:absolute;
      left:0;
      top:88px;
      right:0;
      bottom:0;
      .vue-waterfall-easy-container .vue-waterfall-easy a.img-wraper > img[data-v-ded6b974]{
        border-radius:10px;
      }
      .vue-waterfall-easy-container .vue-waterfall-easy a.img-inner-box[data-v-ded6b974]{
        box-shadow:none;
      }
      .waterfallHead{
        padding:30px 20px;
        box-sizing:border-box;
        border-bottom:10px solid #e8e8e8;
        margin-bottom:15px;
        .activityImg{
          img{
            max-width:100%;
            border-radius:10px;
            max-height:100%;
          }

        }
        .activityData{
          font-size:24px;
          color:#666;
          padding-top:30px;
        }
        .activityText{
          padding-top:30px;
          text-align: center;
          line-height:48px;
          font-size:30px;
          color:#000;
        }
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
