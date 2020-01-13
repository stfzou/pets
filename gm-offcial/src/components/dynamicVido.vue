<template>
  <div class="dynamicVido">
      <div class="dynamiCnt flex_r_s_b">
        <div class="dynamic_l">
            <div class="dynamicSlide">

                   <video
                   :src="vidoInfo.vidoUrl"
                   controls="controls" objectfit="contain" class="videocontent">
                   </video>

            </div>
            <div class="centTitle">{{vidoInfo.authorTitile}}</div>
            <div class="content" v-html="vidoInfo.authorContent">

            </div>
            <div class="likeBox flex_r_f_s">
              <div class="flex_r_f_s like">
                <img src="../assets/like.png" alt="">
                <span>{{vidoInfo.likeCount}}</span>
              </div>
              <div class="flex_r_f_s commentNum">
                <img src="../assets/comment.png" alt="">
                <span>{{vidoInfo.commentCount}}</span>
              </div>
              <div class="flex_r_f_s look">
                <img src="../assets/look.png" alt="">
                <span>{{vidoInfo.lookCount}}</span>
              </div>
            </div>
            <div class="time">发布于 {{vidoInfo.createdTime}}</div>
            <div class="commentBox">
              <div class="title">汪圈评论</div>
              <!-- <ul class="commentList" v-if="vidoInfo.comment.length>1">
                <li class="flex_r_s_b" v-for="item in comment">
                  <div class="list_l flex_r_f_s">
                    <div class="commentUserHead">
                      <img :src="item.userHeadImage" alt="">
                    </div>
                    <div class="commentUserInfo">
                      <div class="userName">{{item.userName}}</div>
                      <div class="commentTime">{{item.createdTime}}</div>
                      <div class="commentxt">{{item.userContent}}</div>
                    </div>
                  </div>
                  <div class="replay flex_r_f_s pointer">
                    <img src="../assets/zan.png" alt="">
                    <span>回复</span>
                  </div>
                </li>
              </ul> -->
              <!-- <div class="more pointer"  v-if="vidoInfo.comment.length>1">查看更多</div> -->
            </div>
        </div>
        <div class="dynamic_r">
            <div class="wqAuthorInfoBox">
              <div class="title">汪圈作者</div>
              <div class="wqAuthorInfo">
                <div class="authorHead flex_r_f_s">
                  <div class="imgBox"><img :src="vidoInfo.authorHeadImage" alt=""></div>
                  <div class="authorNamebox">
                    <div class="author">{{vidoInfo.authorName}}</div>
                    <div v-if="vidoInfo.signature==''" class="autograph">暂无签名</div>
                    <div v-else class="autograph">{{vidoInfo.signature}}</div>
                  </div>

                </div>
                <div class="fansBox flex_r_s_b">
                  <div class="fansItem">
                    <div class="fansText">骨粉</div>
                    <div class="num">{{vidoInfo.fansCount}}</div>
                  </div>
                  <div class="fansItem">
                    <div class="fansText">关注</div>
                    <div class="num">{{vidoInfo.focusCount}}</div>
                  </div>
                  <div class="fansItem">
                    <div class="fansText">骨米号</div>
                    <div class="num">{{vidoInfo.userNo}}</div>
                  </div>
                </div>
              </div>
            </div>
            <!-- <div class="relevantDyna">
              <div class="title">相关动态</div>
              <div class="dynamicList">
                <ul>
                  <li v-for="item in dynamicList" class="flex_r_f_s">
                    <div class="imgBox">
                      <img :src="item.compressImages.split(',')[0]" alt="">
                    </div>
                    <div class="list_r">
                      <p>{{item.title}}</p>
                      <div class="like flex_r_f_s">
                        <img src="../assets/like.png" alt="">
                        <span>{{item.likeCount}}</span>
                      </div>
                    </div>
                  </li>
                </ul>
                 <div class="more">查看更多</div>
              </div>

            </div> -->
        </div>
      </div>
  </div>
</template>

<script>
  import Api from '../api/api.js'
  export default{
    data(){
      return{
        vidoInfo:'',
        cntData:[{
          authorName : '恍恍惚惚',
          authorHeadImage : 'http://gutouzu.oss-cn-shenzhen.aliyuncs.com/re/1575891162279.jpg',
          authorContent:'小猫咪真可爱',
          vidoUrl:'https://gutouzu.oss-cn-shenzhen.aliyuncs.com/videoTest/3.mp4',
          authorTitile:'逗猫玩',
          likeCount:88,
          commentCount:0,
          lookCount:66,
          createdTime:'2019/12/8 17:22',
          comment:[],
          signature:'红红火火,恍恍惚惚',
          fansCount:166,
          focusCount:199,
          userNo:11241512
        },{
          authorName : '星河灿烂',
          authorHeadImage : 'http://gutouzu.oss-cn-shenzhen.aliyuncs.com/re/1575942342856.jpg',
          authorContent:'刚出生的小奶狗，太萌了',
          vidoUrl:'https://gutouzu.oss-cn-shenzhen.aliyuncs.com/videoTest/4.mp4',
          authorTitile:'小不点狗狗',
          likeCount:28,
          commentCount:0,
          lookCount:11,
          createdTime:'2020/1/8 15:15',
          comment:[],
          signature:'星河滚烫，人间理想',
          fansCount:106,
          focusCount:60,
          userNo:11241819
        },{
          authorName : '为你伏笔',
          authorHeadImage : 'http://gutouzu.oss-cn-shenzhen.aliyuncs.com/re/1576805654024482.jpg',
          authorContent:'需要配种的快来哦',
          vidoUrl:'https://gutouzu.oss-cn-shenzhen.aliyuncs.com/videoTest/5.mp4',
          authorTitile:'奶油脸借公配种',
          likeCount:136,
          commentCount:0,
          lookCount:205,
          createdTime:'2019/8/9 18:52',
          comment:[],
          signature:'为你应下了轻语',
          fansCount:101,
          focusCount:76,
          userNo:11241776
        },{
          authorName : '天晴等你',
          authorHeadImage : 'http://gutouzu.oss-cn-shenzhen.aliyuncs.com/re/1575870248803.jpg',
          authorContent:'摇头晃脑的真好玩',
          vidoUrl:'https://gutouzu.oss-cn-shenzhen.aliyuncs.com/videoTest/6.mp4',
          authorTitile:'好奇的猫',
          likeCount:25,
          commentCount:0,
          lookCount:152,
          createdTime:'2019/10/1 09:30',
          comment:[],
          signature:'天青色等烟雨，天晴我等你',
          fansCount:66,
          focusCount:52,
          userNo:11241118
        },{
          authorName : '窗外的风景',
          authorHeadImage : 'http://gutouzu.oss-cn-shenzhen.aliyuncs.com/re/1577644950267.jpg',
          authorContent:'看我如何欺负一只漂亮的小猫咪',
          vidoUrl:'https://gutouzu.oss-cn-shenzhen.aliyuncs.com/videoTest/7.mp4',
          authorTitile:'贪玩小猫咪',
          likeCount:50,
          commentCount:0,
          lookCount:80,
          createdTime:'2019/11/11 13:50',
          comment:[],
          signature:'你装饰了我的梦',
          fansCount:56,
          focusCount:32,
          userNo:11241955
        },


        {
          authorName : '天之蓝',
          authorHeadImage : 'http://www.gumipet.com/head/heiad_01.jpg',
          authorContent:'钻刀圈',
          vidoUrl:'https://gutouzu.oss-cn-shenzhen.aliyuncs.com/videoTest/mp4_01.mp4',
          authorTitile:'绝活',
          likeCount:135,
          commentCount:0,
          lookCount:80,
          createdTime:'2019/8/25 08:50',
          comment:[],
          signature:'',
          fansCount:200,
          focusCount:275,
          userNo:11241861
        },{
          authorName : '眸七443',
          authorHeadImage : 'http://www.gumipet.com/head/head_02.jpg',
          authorContent:'青春真好',
          vidoUrl:'https://gutouzu.oss-cn-shenzhen.aliyuncs.com/videoTest/mp4_02.mp4',
          authorTitile:'青云洋溢',
          likeCount:78,
          commentCount:0,
          lookCount:101,
          createdTime:'2019/9/11 9:50',
          comment:[],
          signature:'',
          fansCount:136,
          focusCount:89,
          userNo:11891935
        },{
          authorName : '斜阳',
          authorHeadImage : 'http://www.gumipet.com/head/head_03.jpg',
          authorContent:'来摘橘子咯',
          vidoUrl:'https://gutouzu.oss-cn-shenzhen.aliyuncs.com/videoTest/mp4_03.mp4',
          authorTitile:'国庆摘桔子咯',
          likeCount:350,
          commentCount:0,
          lookCount:501,
          createdTime:'2019/10/01 14:50',
          comment:[],
          signature:'今天天气不错',
          fansCount:86,
          focusCount:52,
          userNo:11241415
        },{
          authorName : '看我你怕了没',
          authorHeadImage : 'http://www.gumipet.com/head/head_04.jpg',
          authorContent:'舞蹈真好看',
          vidoUrl:'https://gutouzu.oss-cn-shenzhen.aliyuncs.com/videoTest/mp4_04.mp4',
          authorTitile:'舞蹈',
          likeCount:50,
          commentCount:0,
          lookCount:80,
          createdTime:'2019/7/9 20:50',
          comment:[],
          signature:'',
          fansCount:127,
          focusCount:100,
          userNo:11241895
        },{
          authorName : '嘻嘻嘻',
          authorHeadImage : 'http://www.gumipet.com/head/head_05.jpg',
          authorContent:'妖娆的广告，你怕了没',
          vidoUrl:'https://gutouzu.oss-cn-shenzhen.aliyuncs.com/videoTest/mp4_05.mp4',
          authorTitile:'打广告',
          likeCount:235,
          commentCount:0,
          lookCount:310,
          createdTime:'2019/10/11 10:50',
          comment:[],
          signature:'',
          fansCount:99,
          focusCount:85,
          userNo:11981915
        },{
          authorName : '刷你滴卡',
          authorHeadImage : 'http://www.gumipet.com/head/head_06.jpg',
          authorContent:'来看看这走秀怎么样',
          vidoUrl:'https://gutouzu.oss-cn-shenzhen.aliyuncs.com/videoTest/mp4_06.mp4',
          authorTitile:'时装秀',
          likeCount:110,
          commentCount:0,
          lookCount:180,
          createdTime:'2019/8/11 14:20',
          comment:[],
          signature:'',
          fansCount:156,
          focusCount:132,
          userNo:11248465
        },{
          authorName : '7的意志',
          authorHeadImage : 'http://www.gumipet.com/head/head_07.jpg',
          authorContent:'逛超市真开心',
          vidoUrl:'https://gutouzu.oss-cn-shenzhen.aliyuncs.com/videoTest/mp4_07.mp4',
          authorTitile:'买东西咯',
          likeCount:27,
          commentCount:0,
          lookCount:136,
          createdTime:'2019/11/20 17:50',
          comment:[],
          signature:'',
          fansCount:86,
          focusCount:54,
          userNo:11587412
        },{
          authorName : '遇见',
          authorHeadImage : 'http://www.gumipet.com/head/head_08.jpg',
          authorContent:'八哥真可爱',
          vidoUrl:'https://gutouzu.oss-cn-shenzhen.aliyuncs.com/videoTest/mp4_08.mp4',
          authorTitile:'八哥宝宝',
          likeCount:61,
          commentCount:0,
          lookCount:80,
          createdTime:'2019/11/09 11:50',
          comment:[],
          signature:'',
          fansCount:56,
          focusCount:32,
          userNo:14211958
        },{
          authorName : '低调的咸鱼',
          authorHeadImage : 'http://www.gumipet.com/head/head_09.jpg',
          authorContent:'领导发表重要讲话',
          vidoUrl:'https://gutouzu.oss-cn-shenzhen.aliyuncs.com/videoTest/mp4_09.mp4',
          authorTitile:'公司年会',
          likeCount:98,
          commentCount:0,
          lookCount:120,
          createdTime:'2020/01/08 19:50',
          comment:[],
          signature:'',
          fansCount:116,
          focusCount:52,
          userNo:11691155
        },{
          authorName : '星期日',
          authorHeadImage : 'http://www.gumipet.com/head/head_010.jpg',
          authorContent:'认真开车的男人真帅',
          vidoUrl:'https://gutouzu.oss-cn-shenzhen.aliyuncs.com/videoTest/mp4_010.mp4',
          authorTitile:'开车的男人',
          likeCount:77,
          commentCount:0,
          lookCount:108,
          createdTime:'2019/9/11 16:50',
          comment:[],
          signature:'',
          fansCount:36,
          focusCount:12,
          userNo:18969552
        },{
          authorName : '潇湘夜雨',
          authorHeadImage : 'http://www.gumipet.com/head/head_011.jpg',
          authorContent:'逗小黑',
          vidoUrl:'https://gutouzu.oss-cn-shenzhen.aliyuncs.com/videoTest/mp4_011.mp4',
          authorTitile:'小黑',
          likeCount:185,
          commentCount:0,
          lookCount:280,
          createdTime:'2019/8/30 15:50',
          comment:[],
          signature:'',
          fansCount:106,
          focusCount:82,
          userNo:19864255
        },{
          authorName : '偶滴天呐',
          authorHeadImage : 'http://www.gumipet.com/head/head_012.jpg',
          authorContent:'认真学习的学员们',
          vidoUrl:'https://gutouzu.oss-cn-shenzhen.aliyuncs.com/videoTest/mp4_012.mp4',
          authorTitile:'宠物培训',
          likeCount:123,
          commentCount:0,
          lookCount:160,
          createdTime:'2019/12/30 09:50',
          comment:[],
          signature:'',
          fansCount:36,
          focusCount:10,
          userNo:11256982
        }]
      }
    },
    mounted() {
      this.getVidoInfo();
    },
    methods:{
      getVidoInfo(){
        let self = this;
        this.vidoId = this.$route.query.videoId;
        this.vidoInfo = this.cntData[self.vidoId];
        console.log(this.cntData[parseInt(self.videoId)])
      }
    }
  }
</script>

<style lang="scss" scoped="scoped">
  .dynamicVido{
    padding-top:106px;

    .dynamiCnt{
      width:850px;
      margin:0 auto;
      align-items:flex-start;
      .dynamic_l{
        width:500px;
        .centTitle{
          font-size: 24px;
          font-weight: 500;
          color:#333;
          text-align:left;
          padding-top:20px;
        }
        .dynamicSlide{
          width: 500px;
          height: 500px;
          video {
            height: 100%;
            width: 100%;
            outline: none;
            background-color: #000;
          }
        }
        .imgIndex{
          padding-top:20px;
          span{
            height:40px;
            width:40px;
            border-radius: 4px;
            background-size: cover;
            background-position: 50%;
            background-repeat: no-repeat;
            display: inline-block;
            margin: 0 5px 0 0;
            box-sizing:border-box;
          }
          .active{
            border:1px solid red;
          }
        }
        .content{
          padding-top:30px;
          text-align:left;
          line-height:20px;
        }
        .likeBox{
          padding-top:20px;
          div{
            width:80px;
            margin-right:10px;
          }
          img{
            width:20px;
          }
          .look{
            img{
              width:30px;
            }
            span{
              margin-left:2px;
            }

          }
          span{
            color:#555;
            margin-left:5px;
          }
        }
        .time{
          text-align:left;
          color:#999;
          padding-top:20px;
          font-size:16px;
        }
        .commentBox{
          text-align:left;
          padding-top:30px;
          .title{
            font-weight:bold;
            color:#000;
            border-left:4px solid red;
            padding-left:20px;
            font-size:16px;
          }
          .commentList{
            padding-top:30px;
            li{
              align-items:flex-start;
              padding:10px 0;
              border-bottom:1px solid #e8e8e8;
            }
            .list_l{
              width:400px;
              align-items:flex-start;
            }
            .commentUserHead{
              height:30px;
              width:30px;
              border-radius:50%;
              margin-right:10px;
              img{
                width: 100%;
                height: 100%;
                object-fit: cover;
                border-radius:50%;
              }

            }
            .commentUserInfo{
              width:330px;
              .userName{
                color:#333;
              }
              .commentTime{
                font-size:12px;
                color:#666;
                padding:10px 0;
              }
              .commentxt{
                line-height:20px;
              }
            }
            .replay{
              width:100px;
              color:#666;
              img{
                width:20px;
              }
              span{
                margin-left:10px;
              }
            }
          }
          .more{
            color:#5b92e1;
            text-align: center;
            padding: 20px 0 0 0;
            font-size:16px;
          }
        }
      }
      .dynamic_r{
        width:320px;
        text-align:left;
        .wqAuthorInfoBox{
          width: 318px;
          height: 176px;
          border: 1px solid #eee;
          border-radius: 4px;
          color: #000;
          font-size: 14px;
          background: #fff;
          text-align:left;
          .wqAuthorInfo{
            padding:0 20px;
          }
           .title{
             font-weight: 500;
             font-size: 16px;
             padding: 10px 0 10px 20px;
             margin: 0;
             border-bottom: 1px solid #eee;
           }
          .authorHead{
            padding:10px 0;
            border-bottom:1px solid #eee;
            .imgBox{
              height:50px;
              width:50px;
              border-radius:50%;
              margin-right:15px;
              img{
                width: 100%;
                height: 100%;
                object-fit: cover;
                border-radius:50%;
              }

            }
            .authorNamebox{
              width:210px;

              .author{
                font-size: 16px;
                color:#333;
              }
              .autograph{
                overflow:hidden;
                color:#999;
                padding-top:5px;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
                word-break: break-all;
              }
            }
          }
          .fansBox{
            padding-top:15px;
            color:#999;
            .num{
              color:#333;
              margin-top:10px;
            }
          }
        }
        .relevantDyna{
          width: 318px;
          margin-top:30px;
          border: 1px solid #eee;
          border-radius: 4PX;
          cursor: pointer;
          background: #fff;
          padding-bottom: 9px;
          .title{
            font-weight: 500;
            font-size: 16px;
            padding: 10px 0 10px 20px;
            margin: 0;
            border-bottom: 1px solid #eee;
          }
          .dynamicList{

            position: relative;
            .more{
              position: absolute;
              bottom:0;
              left:0;
              width:100%;
              border-top: 1px solid #eee;
              text-align: center;
              padding-top:10px;
              box-sizing:border-box;
              cursor: pointer;
              color: #555;
              background:#fff;
            }
            ul{
              max-height: 400px;
              overflow-y: auto;
              padding-bottom:30px;
            }
            li{
              padding:10px 20px;
              box-sizing:border-box;
              .imgBox{
                width: 80px;
                height: 80px;
                border-radius: 4PX;
                img{
                  width: 100%;
                  height: 100%;
                  object-fit: cover;
                  border-radius:4px;
                }
              }
              .list_r{
                width:180px;
                margin-left:10px;
                p{
                  line-height:20px;
                }

                .like{
                  padding-top:10px;
                  img{
                    width:20px;
                    margin-right:5px;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
</style>
