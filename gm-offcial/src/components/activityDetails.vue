<template>
  <div class="activityDetails">
     <div class="activityDetailsCnt">
        <div class="activityPost flex_r_s_b">
            <div class="activityCover" v-bind:style="{'background-image':'url('+mainImg+')'}"></div>
            <div class="activityInfo">
              <div class="activityTitle">{{activityTitle}}</div>
              <div class="gumiCard" v-if="isPrivilege==1">骨米卡专享</div>
              <div class="price" v-if="minPrice==0">免费</div>
              <div class="price" v-else>¥{{minPrice}}</div>
              <ul>
                <li class="flex_r_f_s">
                  <div class="list_l">主办方</div>
                  <div class="list_r">{{organizerName}}</div>
                </li>
                <li class="flex_r_f_s">
                  <div class="list_l">活动时间</div>
                  <div class="list_r">{{startTime}}~{{endTime}}</div>
                </li>
                <li class="flex_r_f_s">
                  <div class="list_l">活动地址</div>
                  <div class="list_r">{{address}}</div>
                </li>
                <li class="flex_r_f_s">
                  <div class="list_l">报名人数</div>
                  <div class="list_r">已报名{{joinNum}}人/限{{limitNum}}人报名</div>
                </li>
                <li class="flex_r_f_s">
                  <div class="list_l"></div>
                  <div class="list_r"><div class="joinBtn pointer" @click="maskShow">立即参加</div></div>
                </li>
              </ul>

            </div>
        </div>
        <div class="activityNav flex_r_s_b">
          <div class="nav_l flex_r_f_e">
            <div class="itemNav pointer" :class="{active:navIndex==1}" @click="navClick(1)">活动详情</div>
            <div class="itemNav pointer" :class="{active:navIndex==2}" @click="navClick(2)">活动留言({{commentNum}})</div>
          </div>
          <div class="nav_r">推荐活动</div>
        </div>
        <div class="activityImgBox flex_r_s_b">
          <div class="activityImg_l">
            <div class="activityImgs" v-html="imgs" v-show="navIndex==1">

            </div>
            <div class="activityComment" v-show="navIndex==2">
              <ul>
                <li class="flex_r_s_b" v-for="item in commentList">
                  <div class="list_l">
                    <div class="headImg" v-bind:style="{'background-image':'url('+item.userHeadImgAddr+')'}"></div>
                  </div>
                  <div class="list_mid">
                    <div class="userName">{{item.userName}}</div>
                    <div class="commentCnt">{{item.content}}</div>
                  </div>
                  <div class="list_r">
                    <div class="time">{{item.createTime}}</div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div class="activityImg_r">
            <ul>
              <li v-for="item in activityList" class="pointer" @click="activityXq(item)">
                <div class="listImg" v-bind:style="{'background-image':'url('+item.activityCover+')'}"></div>
                <div class="listTitle">宠物摄影大赛</div>
                <div class="price" v-if="item.minPrice==0">免费</div>
                <div class="price" v-else>{{item.maxPrice}}~{{item.minPrice}}元</div>
              </li>
            </ul>
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
        isPrivilege:'',
        mainImg:'',
        activityTitle:'',
        browse:'',
        keep:'',
        address:'',
        startTime:'',
        endTime:'',
        organizerName:'',
        minPrice:0,
        limitNum:'',
        joinNum:'',
        isCollection:'',
        description:'',
        isInnerHtml:false,
        imgs:'',
        isConduct:'',
        commentList:[],
        commentNum:0,
        navIndex:1,
        activityList:[],
        activityId:'',
      }
    },
    mounted() {
      this.activityId = this.$route.query.activityId;
      this.getActivity();
      this.getActivityList();
    },
    watch: {
      $route( to , from ){
          this.activityId = to.query.activityId;
          this.$router.go(0);
      }

    },
    methods:{
      maskShow(){
        this.$popup();
      },
      activityXq(item){
        this.$router.push({
          name:'activityDetails',
          query:{
            activityId:item.id
          }
        })
      },
      getActivity(){
      	let self = this;
      	self.axios.post(Api.httpApi+'/ca/selectCommunityActivityDetails',self.qs.stringify({
      		id:self.activityId,
      		userId:-1,
      		latitude:0,
      		longitude:0
      	}), {
      		headers: {
      			'Content-Type': 'application/x-www-form-urlencoded'
      		}
      	}).then((res)=>{
      		if(res.data.code == 1){
            console.log(res)
            self.isPrivilege = res.data.data.isPrivilege;
      			self.mainImg = res.data.data.activityCover;
      			self.activityTitle = res.data.data.activityTitel;
      			self.browse = res.data.data.browse;
      			self.keep = res.data.data.keep;
      			self.address = res.data.data.address;
      			self.startTime = res.data.data.startTime;
      			self.endTime = res.data.data.endTime;
            self.organizerName = res.data.data.organizerName;
            self.userId = res.data.data.userId;
            self.commentNum = res.data.data.commentNum;
            if(res.data.data.commentVos.length>5){
              self.commentList = res.data.data.commentVos.slice(0,5);
            }else{
              self.commentList = res.data.data.commentVos;
            }

            // if(res.data.data.maxPrice!=0){
            //   self.maxPrice = res.data.data.maxPrice;
            // }

            self.minPrice = res.data.data.minPrice;

      			self.limitNum = res.data.data.limitNum;
      			self.joinNum = res.data.data.joinNum;
      			self.lat = res.data.data.latitude;
      			self.lng = res.data.data.longitude;
      			self.isCollection = res.data.data.isKeep;
            self.imgs = res.data.data.imgs;
            self.isConduct = res.data.data.isConduct;

      			// console.log(res.data.data.description)
      			// self.evalList = res.data.data.commentVos;
      		}else{
      			alert(res.data.msg)
      		}
      	})
      },
      navClick(index){
        this.navIndex = index;
      },
      getActivityList(){
        let self = this;
        self.axios.post(Api.httpApi+'/ca/selectCommunityActivityList',self.qs.stringify({
        	pageNo:0,
          pageSize:6,
        	latitude:0,
        	longitude:0
        }), {
        	headers: {
        		'Content-Type': 'application/x-www-form-urlencoded'
        	}
        }).then(res=>{
          if(res.data.code==1){
            //console.log(res)
            this.activityList = res.data.data;
          }else{
            alert(res.data.msg)
          }
        })
      }
    }
  }
</script>

<style lang="scss">
  .activityDetails{
    padding-top:108px;
    .activityDetailsCnt{
      width:1100px;
      margin:0 auto;
      .activityPost{
        // align-items:flex-start;
        text-align:left;
        .activityCover{
          width:620px;
          height:415px;
          background-size: contain;
          background-repeat: no-repeat;
          background-position: 50%;
        }
        .activityInfo{
          width:400px;
          .activityTitle{
            font-size:20px;
            line-height:36px;
          }
          .gumiCard{
            width:120px;
            height:22px;
            background:#FFAB3D;
            color:#fff;
            border-radius:11px;
            text-align:center;
            line-height:22px;
            font-size:14px;
            margin-top:10px;
          }
          .price{
            color:#FF523D;
            font-size:36px;
            padding-top:20px;
            font-family:Microsoft YaHei;
          }
          ul{
            padding-top:20px;
            li{
              color:#666;
              padding-top:20px;
              align-items:flex-start;
              .list_l{
                width:100px;
                padding-top:3px;
              }
              .list_r{
                width:550px;
                line-height:20px;
                .joinBtn{
                  width:180px;
                  height:40px;
                  background:#ff523d;
                  text-align:center;
                  line-height:40px;
                  border-radius:10px;
                  font-size:20px;
                  color:#fff;
                }
              }
            }
          }
        }
      }
      .activityNav{
        padding-top:60px;
        height:50px;
        font-size:18px;
        color:#666;
        .nav_l{
          height:50px;
          background:#F5F5F5;
          width:700px;
          .itemNav{
            height:50px;
            box-sizing:border-box;
            text-align:center;
            line-height:50px;
            width:150px;
          }
          .active{
            border-bottom:3px solid #ff523d;
          }
        }
        .nav_r{
          height:50px;
          background:#F5F5F5;
          width:350px;
          text-align:center;
          line-height:50px;
        }
      }
      .activityImgBox{
        align-items:flex-start;
        .activityImg_l{
          width:700px;
          .activityImgs{
            padding:30px;
            img{
              width:100%;
              display:block;
            }
          }
          .activityComment{

            li{
              align-items:flex-start;
              padding:30px 0;
              border-bottom:1px dashed #eee;
              .list_l{
                width:40px;
                margin-right:10px;
                .headImg{
                  background-size:cover;
                  background-repeat: no-repeat;
                  // background-position: 50%;
                  width:40px;
                  height:40px;
                  border-radius:50%;

                }
              }
              .list_mid{
                width:500px;
                text-align:left;
                .userName{
                  color:#333;
                  font-size:16px;
                }
                .commentCnt{
                  color:#666;
                  line-height:20px;
                  padding-top:10px;
                }
              }
              .list_r{
                width:150px;
                 color:#666;
              }
            }

          }
        }
        .activityImg_r{
          width:350px;
          ul{
            text-align:left;
            li{
              padding-top:30px;
              .listImg{
                height:198px;
                background-size:cover;
                background-repeat: no-repeat;
                background-position: 50%;
                border-radius:10px;
              }
              .listTitle{
                font-size:20px;
                color:#333;
                padding-top:20px;
              }
              .price{
                color:#FF523D;
                font-size:20px;
                padding-top:30px;
              }
            }
          }
        }
      }
    }
  }
</style>
