<template>
  <div class="wqSelectWarp">
     <div class="wqSelectCnt">
       <vue-waterfall-easy :imgsArr="dynamicList" :mobileGap="mobileGap" @click="clickFn"  ref="waterfall">
        <div slot="waterfall-over" v-show="false">waterfall-over</div>
        <div class="img-info" slot-scope="props">
            <!-- <p class="some-info">第{{props.index+1}}张图片</p> -->
            <div class="title">{{props.value.title}}</div>
            <div class="userInfo flex_r_s_b">
              <div class="userHead flex_r_f_s">
                <div class="headImg">
                  <img :src="props.value.userHeadImage" alt="">
                </div>

                <div class="userName">{{props.value.userName}}</div>
              </div>
              <div class="like flex_r_f_s">
                <img src="../assets/like.png" alt="">
                <div class="likeCount">{{props.value.likeCount}}</div>
              </div>
            </div>
        </div>

        </vue-waterfall-easy>
        <div class="more pointer">查看更多</div>
     </div>
  </div>
</template>

<script>
  import vueWaterfallEasy from 'vue-waterfall-easy'
  import Api from '../api/api.js'
  export default{
    data(){
      return{
        dynamicList:[],
        mobileGap:15,
      }
    },
    components:{
      vueWaterfallEasy
    },
    mounted() {
      this.getWqSelect();
    },
    methods:{
      getWqSelect(){
        let self = this;
        self.axios.get(Api.httpApi+'/community/selectJxUserDynamic',{
          params:{
            userId:38,
            page:1,
            rows:30
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
            self.dynamicList = res.data.data;
            console.log(self.dynamicList)
            self.$refs.waterfall.waterfallOver()
        	}else{

        	}
        })
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
    }
  }
</script>

<style lang="scss" scoped="scoped">
  .wqSelectWarp{
    padding-top:106px;
    .wqSelectCnt{
      height:2500px;
      // background:yellow;
      .title{
        text-align:left;
        color:#000;
        padding:10px 10px 0 10px;
        line-height:20px;
      }
      .userInfo{
        padding:15px 10px;
        box-sizing:border-box;
        .userHead{
          .headImg{
            width:30px;
            height:30px;
            margin-right:10px;
          }
          img{
           width: 100%;
           height: 100%;
           object-fit: cover;
           border-radius:50%;

          }
        }
        .like{
          width:50px;
          img{
            width:25px;
            margin-right:5px;
          }

        }
      }
      .more{
        text-align:center;
        font-size:18px;
        color:#ff523d;

      }
    }
  }
</style>
