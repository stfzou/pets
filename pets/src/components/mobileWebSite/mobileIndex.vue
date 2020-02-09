<template>
  <div class="mobileIndex">

    <vue-waterfall-easy :imgsArr="dynamicList" :mobileGap="15" @click="clickFn"  ref="waterfall">

        <div slot="waterfall-over" style="display: none;">没有更多了</div>
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
             <div class="userName flex_r_f_s" @click="goUserHome(props.value)">
               <img status="1" :src="props.value.userHeadImage" alt="">
               <span>{{props.value.userName}}</span>
             </div>
             <div class="likeBox flex_r_f_s">
               <img status="1" src="../../assets/icon_guanzhu.png" v-if="props.value.isLike===0" alt="">
               <img status="1" src="../../assets/active_guanzhu.png" v-else  alt="">
               <span>{{props.value.likeCount}}</span>
             </div>
           </div>
        </div>
    </vue-waterfall-easy>
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
        dynamicList:[]
      }
    },
    mounted() {
      this.getWqSelect();
    },
    methods:{
      clickFn(event, { index, value }) {
          // 阻止a标签跳转
          event.preventDefault()
          // 只有当点击到图片时才进行操作
          this.$router.push({
            name:'trend',
            query:{
              dynamicId:value.dynamicId
            }
          })
      },
      getWqSelect(){
        let self = this;
        self.axios.get(Api.userApi+'/community/selectJxUserDynamic',{
          params:{
            userId:38,
            page:1,
            rows:50
          }
        },{
        	headers: {
        		'Content-Type': 'application/x-www-form-urlencoded'
        	}
        }).then((res)=>{
        	if(res.data.code == 1){
            //console.log(res)
            res.data.data.forEach((e)=>{
              e.src = e.compressImages.split(',')[0];
              e.href = 'http://app.gutouzu.com/index.html#/trend?dynamicId='+e.dynamicId;
            })
            self.dynamicList.push(...res.data.data);
            self.$refs.waterfall.waterfallOver()
        	}else{

        	}
        })
      },
    }
  }
</script>

<style lang="scss">
  .mobileIndex{
      height:15400px;
      .vue-waterfall-easy-container .vue-waterfall-easy a.img-wraper > img[data-v-ded6b974]{
        border-radius:10px;
      }
      .vue-waterfall-easy-container .vue-waterfall-easy a.img-inner-box[data-v-ded6b974]{
        box-shadow:none;
      }
      .vue-waterfall-easy-container .vue-waterfall-easy-scroll[data-v-ded6b974]{
        overflow-y:hidden;
      }
      .waterfallHead{
        padding:30px 20px;
        box-sizing:border-box;

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
          .span1{
            margin-left:5px;
            color:#ff523d;
          }
        }
        .activityText{
          padding-top:30px;

          line-height:48px;
          font-size:30px;
          color:#000;
        }
      }
      .img-info{
        padding:0 20px 20px 20px;
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
</style>
