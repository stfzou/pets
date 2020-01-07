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
        <div class="more pointer" @click="maskShow">查看更多</div>
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
        tempArr:[]
      }
    },
    components:{
      vueWaterfallEasy
    },
    mounted() {
      this.getWqSelect();
      this.tempArr = [{
        src:'http://gutouzu.oss-cn-shenzhen.aliyuncs.com/re/1575899639065598.jpg',
        href : 'http://gmpet.com',
        userName : '恍恍惚惚',
        userHeadImage : 'http://gutouzu.oss-cn-shenzhen.aliyuncs.com/re/1575891162279.jpg',
        likeCount : 10,
        title : '真狗粮',
        type:1,
        videoId:0
      },{
        src:'http://gutouzu.oss-cn-shenzhen.aliyuncs.com/re/1577026552776302.jpg',
        href : 'http://gmpet.com',
        userName : '星河灿烂',
        userHeadImage : 'http://gutouzu.oss-cn-shenzhen.aliyuncs.com/re/1575942342856.jpg',
        likeCount : 8,
        title : '你是人间理想',
        type:1,
        videoId:1
      },{
        src:'http://gutouzu.oss-cn-shenzhen.aliyuncs.com/re/1576805654024482.jpg',
        href : 'http://gmpet.com',
        userName : '为你伏笔',
        userHeadImage : 'http://gutouzu.oss-cn-shenzhen.aliyuncs.com/re/1576744856386.jpg',
        likeCount : 18,
        title : '阳光正好，微风不燥',
        type:1,
        videoId:2
      },{
        src:'http://gutouzu.oss-cn-shenzhen.aliyuncs.com/re/1577067143497134.jpg',
        href : 'http://gmpet.com',
        userName : '天晴等你',
        userHeadImage : 'http://gutouzu.oss-cn-shenzhen.aliyuncs.com/re/1575870248803.jpg',
        likeCount : 32,
        title : '两只胖猪',
        type:1,
        videoId:3
      },{
        src:'http://gutouzu.oss-cn-shenzhen.aliyuncs.com/re/1577724354012913.jpg',
        href : 'http://gmpet.com',
        userName : '窗外的风景',
        userHeadImage : 'http://gutouzu.oss-cn-shenzhen.aliyuncs.com/re/1577644950267.jpg',
        likeCount : 18,
        title : '哈哈，好可爱',
        type:1,
        videoId:4
      }];
      this.dynamicList.push(...this.tempArr)
    },
    methods:{
      maskShow(){
        this.$popup();
      },
      getWqSelect(){
        let self = this;
        self.axios.get(Api.httpApi+'/community/selectJxUserDynamic',{
          params:{
            userId:38,
            page:1,
            rows:25
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
            // {type:1,videoId:1},{type:1,videoId:2},{type:1,videoId:3},{type:1,videoId:4},{type:1,videoId:5}


            self.dynamicList.push(...res.data.data);
            // console.log(self.dynamicList)
            self.$refs.waterfall.waterfallOver()
        	}else{

        	}
        })
      },
      clickFn(event, { index, value }) {
          // 阻止a标签跳转
          event.preventDefault()
          // 只有当点击到图片时才进行操作
            console.log(value)
            if(value.type==1){
              this.$router.push({
              	name:'dynamicVido',
              	query:{
              		videoId:value.videoId
              	}
              })
            }else{
              this.$router.push({
              	name:'dynamicDetails',
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
          width:70px;
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
