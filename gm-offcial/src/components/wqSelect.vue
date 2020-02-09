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
        src:'https://gutouzu.oss-cn-shenzhen.aliyuncs.com/videoTest/img3.png',
        href : 'http://gmpet.com',
        userName : '恍恍惚惚',
        userHeadImage : 'http://gutouzu.oss-cn-shenzhen.aliyuncs.com/re/1575891162279.jpg',
        likeCount : 88,
        title : '逗猫玩',
        type:1,
        videoId:0
      },{
        src:'https://gutouzu.oss-cn-shenzhen.aliyuncs.com/videoTest/img4.jpg',
        href : 'http://gmpet.com',
        userName : '星河灿烂',
        userHeadImage : 'http://gutouzu.oss-cn-shenzhen.aliyuncs.com/re/1575942342856.jpg',
        likeCount :28,
        title : '小不点狗狗',
        type:1,
        videoId:1
      },{
        src:'https://gutouzu.oss-cn-shenzhen.aliyuncs.com/videoTest/img5.png',
        href : 'http://gmpet.com',
        userName : '为你伏笔',
        userHeadImage : 'http://gutouzu.oss-cn-shenzhen.aliyuncs.com/re/1576744856386.jpg',
        likeCount : 136,
        title : '需要配种的快来哦',
        type:1,
        videoId:2
      },{
        src:'https://gutouzu.oss-cn-shenzhen.aliyuncs.com/videoTest/img6.jpg',
        href : 'http://gmpet.com',
        userName : '天晴等你',
        userHeadImage : 'http://gutouzu.oss-cn-shenzhen.aliyuncs.com/re/1575870248803.jpg',
        likeCount : 25,
        title : '好奇的猫',
        type:1,
        videoId:3
      },{
        src:'https://gutouzu.oss-cn-shenzhen.aliyuncs.com/videoTest/img7.png',
        href : 'http://gmpet.com',
        userName : '窗外的风景',
        userHeadImage : 'http://gutouzu.oss-cn-shenzhen.aliyuncs.com/re/1577644950267.jpg',
        likeCount : 50,
        title : '贪玩小猫咪',
        type:1,
        videoId:4
      },



      {
        src:'https://gutouzu.oss-cn-shenzhen.aliyuncs.com/videoTest/img_01.png',
        href : 'http://gmpet.com',
        userName : '天之蓝',
        userHeadImage : 'http://www.gumipet.com/head/heiad_01.jpg',
        likeCount : 135,
        title : '绝活',
        type:1,
        videoId:5
      },{
        src:'https://gutouzu.oss-cn-shenzhen.aliyuncs.com/videoTest/img_02.png',
        href : 'http://gmpet.com',
        userName : '眸七443',
        userHeadImage : 'http://www.gumipet.com/head/head_02.jpg',
        likeCount : 78,
        title : '青云洋溢',
        type:1,
        videoId:6
      },{
        src:'https://gutouzu.oss-cn-shenzhen.aliyuncs.com/videoTest/img_03.png',
        href : 'http://gmpet.com',
        userName : '斜阳',
        userHeadImage : 'http://www.gumipet.com/head/head_03.jpg',
        likeCount : 350,
        title : '国庆摘桔子咯',
        type:1,
        videoId:7
      },{
        src:'https://gutouzu.oss-cn-shenzhen.aliyuncs.com/videoTest/img_04.png',
        href : 'http://gmpet.com',
        userName : '看我你怕了没',
        userHeadImage : 'http://www.gumipet.com/head/head_04.jpg',
        likeCount : 150,
        title : '舞蹈',
        type:1,
        videoId:8
      },{
        src:'https://gutouzu.oss-cn-shenzhen.aliyuncs.com/videoTest/img_05.png',
        href : 'http://gmpet.com',
        userName : '嘻嘻嘻',
        userHeadImage : 'http://www.gumipet.com/head/head_05.jpg',
        likeCount :235,
        title : '打广告',
        type:1,
        videoId:9
      },{
        src:'https://gutouzu.oss-cn-shenzhen.aliyuncs.com/videoTest/img_06.png',
        href : 'http://gmpet.com',
        userName : '刷你滴卡',
        userHeadImage : 'http://www.gumipet.com/head/head_06.jpg',
        likeCount : 126,
        title : '时装秀',
        type:1,
        videoId:10
      },{
        src:'https://gutouzu.oss-cn-shenzhen.aliyuncs.com/videoTest/img_07.png',
        href : 'http://gmpet.com',
        userName : '7的意志',
        userHeadImage : 'http://www.gumipet.com/head/head_07.jpg',
        likeCount : 27,
        title : '买东西咯',
        type:1,
        videoId:11
      },{
        src:'https://gutouzu.oss-cn-shenzhen.aliyuncs.com/videoTest/img_08.png',
        href : 'http://gmpet.com',
        userName : '遇见',
        userHeadImage : 'http://www.gumipet.com/head/head_08.jpg',
        likeCount : 61,
        title : '八哥宝宝',
        type:1,
        videoId:12
      },{
        src:'https://gutouzu.oss-cn-shenzhen.aliyuncs.com/videoTest/img_09.png',
        href : 'http://gmpet.com',
        userName : '低调的咸鱼',
        userHeadImage : 'http://www.gumipet.com/head/head_09.jpg',
        likeCount : 98,
        title : '公司年会',
        type:1,
        videoId:13
      },{
        src:'https://gutouzu.oss-cn-shenzhen.aliyuncs.com/videoTest/img_010.png',
        href : 'http://gmpet.com',
        userName : '星期日',
        userHeadImage : 'http://www.gumipet.com/head/head_010.jpg',
        likeCount : 77,
        title : '开车的男人',
        type:1,
        videoId:14
      },{
        src:'https://gutouzu.oss-cn-shenzhen.aliyuncs.com/videoTest/img_011.png',
        href : 'http://gmpet.com',
        userName : '潇湘夜雨',
        userHeadImage : 'http://www.gumipet.com/head/head_011.jpg',
        likeCount : 185,
        title : '小黑',
        type:1,
        videoId:15
      },{
        src:'https://gutouzu.oss-cn-shenzhen.aliyuncs.com/videoTest/img_012.png',
        href : 'http://gmpet.com',
        userName : '偶滴天呐',
        userHeadImage : 'http://www.gumipet.com/head/head_012.jpg',
        likeCount : 123,
        title : '宠物培训',
        type:1,
        videoId:16
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
            rows:15
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
            //console.log(value)
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
      height:2850px;
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
