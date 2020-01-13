<template>
  <div class="dynamicDetails">
      <div class="dynamiCnt flex_r_s_b">
        <div class="dynamic_l">
            <div class="dynamicSlide">
              <el-carousel trigger="click" height="500px" indicator-position="none" ref="carousel" @change="slidChange">
                  <el-carousel-item v-for="item in imgData" :key="item">
                      <!-- <img :src="item" alt=""> -->
                      <div class="slidImg" v-bind:style="{'background-image':'url('+item+')'}">

                      </div>
                  </el-carousel-item>
              </el-carousel>
            </div>
            <div class="imgIndex">
              <span class="pointer" :class="{active:imgIndex==index}" @click="setActiveItem(index)" v-for="(item,index) in compressImages" :src="item" v-bind:style="{'background-image':'url('+item+')'}"></span>
            </div>
            <div class="centTitle">{{trendTitle}}</div>
            <div class="content" v-html="content">

            </div>
            <div class="likeBox flex_r_f_s">
              <div class="flex_r_f_s like">
                <img src="../assets/like.png" alt="">
                <span>{{likeCount}}</span>
              </div>
              <div class="flex_r_f_s commentNum">
                <img src="../assets/comment.png" alt="">
                <span>{{commentCount}}</span>
              </div>
              <div class="flex_r_f_s look">
                <img src="../assets/look.png" alt="">
                <span>{{lookCount}}</span>
              </div>
            </div>
            <div class="time">发布于 {{createdTime}}</div>
            <div class="commentBox">
              <div class="title">汪圈评论</div>
              <ul class="commentList" v-if="comment.length>1">
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
              </ul>
              <div class="more pointer"  v-if="comment.length>1">查看更多</div>
            </div>
        </div>
        <div class="dynamic_r">
            <div class="wqAuthorInfoBox">
              <div class="title">汪圈作者</div>
              <div class="wqAuthorInfo">
                <div class="authorHead flex_r_f_s">
                  <div class="imgBox"><img :src="userHeadImage" alt=""></div>
                  <div class="authorNamebox">
                    <div class="author">{{userName}}</div>
                    <div v-if="signature==''" class="autograph">暂无签名</div>
                    <div v-else class="autograph">{{signature}}</div>
                  </div>

                </div>
                <div class="fansBox flex_r_s_b">
                  <div class="fansItem">
                    <div class="fansText">骨粉</div>
                    <div class="num">{{fansCount}}</div>
                  </div>
                  <div class="fansItem">
                    <div class="fansText">关注</div>
                    <div class="num">{{focusCount}}</div>
                  </div>
                  <div class="fansItem">
                    <div class="fansText">骨米号</div>
                    <div class="num">{{userNo}}</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="relevantDyna" v-if="dynamicList.length>0">
              <div class="title">相关动态</div>
              <div class="dynamicList">
                <ul>
                  <li v-for="item in dynamicList" class="flex_r_f_s pointer" @click="dynamicXq(item)">
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
                 <div class="more" @click="maskShow">查看更多</div>
              </div>

            </div>
        </div>
      </div>
  </div>
</template>

<script>
  import Api from '../api/api.js'
  export default{
    data(){
      return{
        trendTitle:'',
        userName:'',
        compressImages:[],
        images:'',
        imgData:[],
        userHeadImage:'',
        content:'',
        likeCount:0,
        lookCount:0,
        comment:[],
        commentCount:0,
        createdTime:'',
        fansCount:0,
        focusCount:0,
        userNo:0,
        signature:'',
        imgIndex:0,
        dynamicList:[],
        userId:'-1',
      }
    },
    mounted() {
      this.getTrend();
      // this.getAuthor();

    },
    watch: {
      $route( to , from ){
          this.userId = to.query.userId;
          this.$router.go(0);
      }

    },
    methods:{
      maskShow(){
        this.$popup();
      },
      slidChange(index){
        this.imgIndex = index;
      },
      dynamicXq(item){
        this.$router.push({
        	name:'dynamicDetails',
        	query:{
        		dynamicId:item.dynamicId
        	}
        })
      },
      getDynamic(){
      	let self = this;
        this.page = 1;
      	self.axios.get(Api.httpApi + '/community/selectDynamicByUserId', {
      		params: {
      			beLookUserId:self.userId,
      			lookUserId:'-1',
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
              self.dynamicList = res.data.data;
      		}else{
      			alert(res.data.msg);
      		}
      	})
      },
      getAuthor(){
      	let self = this;
      	self.axios.get(Api.httpApi + '/userCenter/selectUserCenterByUserId', {
      		params: {
      			beLookUserId:self.userId,
      			lookUserId:'-1'
      		}
      	}, {
      		headers: {
      			'Content-Type': 'application/x-www-form-urlencoded'
      		}
      	}).then((res) => {
      		if (res.data.code == 1) {


      			self.fansCount = res.data.data.fansCount;
      			self.focusCount = res.data.data.focusCount;
      			self.userNo = res.data.data.userNo;
      	    self.signature = res.data.data.signature;
      			//console.log(res.data)
      		}
      	})
      },
      decodeUnicode(str) {
      	str = str.replace(/\\/g, "%");
      	return unescape(str);
      },
      setActiveItem(index){
        this.$refs.carousel.setActiveItem(index);
        this.imgIndex = index;
      },
      getImgs() {
      	let self = this;
      	this.axios.get(Api.httpApi + '/image/getImageUrlArrays?keys=' + self.images, {
      	    headers: {
      	      'Content-Type': 'application/x-www-form-urlencoded'
      	    }
      	}).then((res)=>{
      	    if(res.data.code==1){
      	      // self.initialIndex = index
      	      self.imgData = res.data.data;

      	    }

      	})
      },
      getTrend() {
      	let self = this;
      	self.axios.get(Api.httpApi + '/community/selectDynamicDetails', {
      		params: {
      			userId:38,
      			dynamicId:self.$route.query.dynamicId
      		}
      	}, {
      		headers: {
      			'Content-Type': 'application/x-www-form-urlencoded'
      		}
      	}).then((res) => {
      		if (res.data.code == 1) {
           //console.log(res)
            self.trendTitle = res.data.data.title;
      			self.userName = res.data.data.userName;
      			if(res.data.data.images!=''){
      				self.images = res.data.data.images;
              self.compressImages = res.data.data.compressImages.split(',');
      			}
            self.userId = res.data.data.userId;
            self.getAuthor();
            self.getDynamic();
            self.getImgs();
      			self.time = res.data.data.createdTime.split(' ')[0];
      			self.userHeadImage = res.data.data.userHeadImage;
      			// self.content = res.data.data.content;
            self.lookCount = res.data.data.lookCount;
            self.createdTime = res.data.data.createdTime;
      			self.content = self.decodeUnicode(res.data.data.content);
            self.content = self.content.replace(/[\n\r]/g,'<br>')
      			self.likeCount = res.data.data.likeCount;
      			self.commentCount = res.data.data.commentCount;
            if(res.data.data.dynamicComments.length>2){
              self.comment = res.data.data.dynamicComments.slice(0,2);
            }else{
              self.comment = res.data.data.dynamicComments;
            }

      		} else {
      			alert(res.data.msg)
      		}
      	})
      },
    }
  }
</script>

<style lang="scss" scoped="scoped">
  .dynamicDetails{
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
          .slidImg{
            height:100%;
            width:100%;
            background-size: contain;
            background-repeat: no-repeat;
            background-position: 50%;

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
