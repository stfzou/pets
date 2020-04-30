<template>
  <div class="communityActivity">
    <div class="top_nav flex_r_s_b" :class="{activeNav:isHeadActive}">
      <div class="back" @click="back"></div>
      <div class="nav_title">{{activityName}}</div>
      <div class="share" @click="share"></div>
    </div>
    <div class="joinBtn flex_r_s_c" @click="downLink">+加入讨论</div>
    <cube-scroll  :scroll-events="['scroll']"  @scroll="scrollChange" ref="scroll" @pulling-up="onPullingUp" :options="options">
    <div class="communityHead">
      <img class="bg" :src="image" alt="">
      <div class="titleBox flex_r_s_b">

        <div class="imgBox" v-bind:style="{'background-image':'url('+image+')'}">

        </div>
        <div class="title_r">
          <div class="title">#{{activityName}}#</div>
          <div class="lookNum"><span>100人浏览</span> <span>54人参加</span></div>
        </div>
      </div>
    </div>
    <div class="cntWarp">
      <div class="communityDesc" v-html="desc"></div>
      <div class="dynamic-list">
        <div class="img-info" v-for="(item,index) in dynamicList" >
          <div class="user-info flex_r_s_b">
            <div class="headImg"><img :src="item.userHeadImage" alt=""></div>
            <div class="userName">
              <div class="name"><span>{{item.userName}}</span></div>
              <div class="petInfo flex_r_f_s" v-if="item.petId!=''">
                <img src="../../assets/icon_she21@3x.png" alt="">
                <span class="petName">{{item.petName}}</span>
                <img v-if="item.sex==1" src="../../assets/icon_man.png" alt="">
                <img v-if="item.sex==2" src="../../assets/icon_wuman.png" alt="">
                <span class="varieties" style="background:#ffedeb;">{{item.petBreedName}}</span>
                <span class="varieties" style="background:#fff8eb;">{{item.age}}岁</span>
                <span class="varieties" style="background:#ebf2ff;">{{item.weight}}kg</span>
              </div>
            </div>

          </div>
          <div class="activityName flex_r_f_s">#{{activityName}}# <img v-if="item.prize" src="../../assets/icon_gu99@3x.png" alt=""> </div>
          <div class="commentCnt" @click="dynamicXq(item)">
            <h3>{{item.title}}</h3>
            <p>{{item.content}}</p>

          </div>
          <div class="img-box img-box1" v-if="item.img.split(',').length===1" @click="dynamicXqLink(item)">
            <div>
              <img  :src="item.img.split(',')[0]" alt="">
              <img v-if="item.type==2" class="play" src="../../assets/play.png" alt="">
            </div>

          </div>
          <div class="img-box2 flex_r_s_b" v-if="item.img.split(',').length===2" @click="dynamicXqLink(item)">
            <div class="img_l">
              <img  :src="item.img.split(',')[0]" alt="">
            </div>
            <div class="img_r">
              <img  :src="item.img.split(',')[1]" alt="">
            </div>
          </div>
          <div class="img-box3 flex_r_s_b" v-if="item.img.split(',').length>=3" @click="dynamicXqLink(item)">
            <div class="img_l">
              <img  :src="item.img.split(',')[0]" alt="">
            </div>
            <div class="img_r flex_c_s_b">
              <div class="img-top">
                <img  class="pic" :src="item.img.split(',')[1]" alt="">
              </div>
              <div class="img-bottom">
                <img class="pic"  :src="item.img.split(',')[2]" alt="">
                <div class="mark flex_r_s_c" @click="dynamicXq(item)" v-if="item.img.split(',').length>3">
                  <img src="../../assets/icon_gu97@3x.png" alt="">
                  <span>{{item.img.split(',').length}}+</span>
                </div>
              </div>

            </div>
          </div>
          <div class="commentNum flex_r_s_b">
            <div class="commentIcon flex_r_f_s">
              <img status="1" src="../../assets/icon_xiaox.png" alt="">
              <span>{{item.commentCount}}</span>
            </div>
            <div class="loolIcon flex_r_f_s">
              <img status="1" src="../../assets/icon-chakan.png" alt="">
              <span>{{item.lookCount}}</span>
            </div>
            <div class="likeBox flex_r_f_s">
              <img  src="../../assets/icon_guanzhu.png" v-if="item.isLike===0" alt="" @click="clikeLike(item,index)">
              <img  src="../../assets/active_guanzhu.png" v-else @click="cancelLike(item,index)" alt="">
              <span>{{item.likeCount}}</span>
            </div>
          </div>

          <div class="addr flex_r_f_s"><img src="../../assets/icon/map@2x.png" alt=""><span>{{item.geoLocation}}</span></div>
        </div>

      </div>
    </div>
    </cube-scroll>
  </div>
</template>

<script>

  import Api from '../common/apj.js'
  export default {

    data() {
      return {
        isHeadActive:false,
        dynamicList: [],
        mobileGap: 15,
        page: 1,
        userId: '-1',
        createdTime: '',
        desc: '',
        image: '',
        activityName: '',
        ocaId: '',
        startTime: '',
        endTime: '',
        count: 0,
        options:{
          probeType:2,
        	pullUpLoad:{
        		txt:{
        			more: '加载更多', noMore: '没有更多数据了',
        		},
        		threshold:40,

        	},
          bindToWrapper:true
        },
      }
    },
    mounted() {
      if (JSON.parse(localStorage.getItem('user')) != null) {
        this.userId = JSON.parse(localStorage.getItem('user')).userId;
      }
      this.ocaId = this.getUrlKey('ocaId');

      this.getActivity();

    },
    methods: {
      back() {
        this.$router.go(-1); //返回上一层
      },
      dynamicXqLink(item){
        this.$router.push({
          name:'trend',
          query:{
            dynamicId:item.dynamicId
          }
        })
      },
      downLink(){
        this.$router.push({
          name:'appShowBtn'
        })
      },
      goUserHome(item) {
        let self = this;
        this.$router.push({
          name: 'dynamic',
          query: {
            aId: item.userId
          }
        })
      },
      getUrlKey(name) {
        return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[
          1].replace(/\+/g, '%20')) || null
      },
      decodeUnicode(str) {
        str = str.replace(/\\/g, "%");
        return unescape(str);
      },
      getActivity() {
        let self = this;
        self.axios.get(Api.userApi + '/community/selectInitUserDynamicOfActivity', {
          params: {
            ocaId: self.ocaId,
            userId: self.userId
          }
        }, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then((res) => {
          if (res.data.code == 1) {
            //console.log(res)
            self.count = res.data.data.officialActivityDo.count;
            self.startTime = res.data.data.officialActivityDo.startTime;
            self.endTime = res.data.data.officialActivityDo.endTime;
            self.desc = res.data.data.officialActivityDo.desc;
            self.image = res.data.data.officialActivityDo.image;
            self.activityName = res.data.data.officialActivityDo.name;
            res.data.data.dynamicVos.forEach((e) => {

              if (e.type == 2) {
                e.img = e.videoCoverImage;
              } else {
                e.img = e.compressImages;
              }

            })
            self.dynamicList = res.data.data.dynamicVos;

          } else {
            let toast = self.$createToast({
              txt: res.data.msg,
              type: 'error'
            })
            toast.show()
          }
        })
      },

      share() {
        let toast = this.$createToast({
          txt: '点击顶部右上角进行分享',
          type: 'warn'
        })
        toast.show()
      },
      scrollChange(e){
        console.log(e)
        if(e.y<0){
          this.isHeadActive = true
        }else{
          this.isHeadActive = false
        }
      },
      onPullingUp() {
        let self = this;
        this.page++;
        self.axios.get(Api.trendApi + '/community/selectUserDynamicOfActivity', {
          params: {
            ocaId: self.ocaId,
            userId: self.userId,
            page: self.page,
            rows: 10
          }
        }, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then((res) => {
          if (res.data.code == 1) {
            if (res.data.data.length > 0) {

              setTimeout(() => {
                self.$refs.scroll.forceUpdate();
              	res.data.data.forEach((e) => {
              	  e.content = self.decodeUnicode(e.content);
              	  e.content = e.content.replace(/[\n\r]/g, '<br>');
              	});
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

          } else {
            alert(res.data.msg);
            setTimeout(() => {
            	self.$refs.scroll.forceUpdate();
              self.$refs.scroll.refresh();
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
          title: msg,
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
      clikeLike(item, index) {

        if (this.userId == -1) {
          this.goLogin('登录后才能点赞');
        } else {
          let self = this;
          this.axios.post(Api.trendApi + '/community/likeDynamic', this.qs.stringify({
            byLikeUserId: item.userId,
            dynamicId: item.dynamicId,
            userId: self.userId,
            petId: ''
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
      cancelLike(item, index) {

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
    }
  }
</script>

<style lang="scss">
  .communityActivity {
    height: 100%;
    position: relative;
    .joinBtn{
      position: fixed;
      left: 50%;
      bottom:80px;
      margin-left:-120px;
      z-index: 100;
      width:240px;
      height:80px;
      background:linear-gradient(129deg,rgba(254,146,113,1),rgba(254,146,113,1),rgba(255,130,96,1),rgba(255,96,96,1));
      box-shadow:0px 0px 30px 0px rgba(230,51,0,0.16);
      border-radius:40px;
      color:#fff;
      font-size:28px;
    }
    .top_nav {
      padding: 0 20px;
      height: 88px;
      box-sizing: border-box;
      position: fixed;
      left: 0;
      top: 0;
      z-index: 100;

      .back {
        width: 26px;
        height: 42px;
        background: url(../../assets/icon/back@2x.png) no-repeat center 0;
        background-size: cover;
      }

      .nav_title {
        font-size: 30px;
        color: #fff;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);

      }

      .share {
        width: 50px;
        height: 40px;
        background: url('../../assets/icon/share@2x.png') no-repeat center 0;
        background-size: 100%;
      }
    }
    .activeNav{
      background:#f88a7d;
    }
    .communityHead {
      height: 300px;
      position: relative;
      padding-top: 120px;
      box-sizing: border-box;
      z-index: 1;

      .titleBox {
        align-items: flex-start;
        padding: 0 30px;
        box-sizing: border-box;

        .imgBox {
          width: 140px;
          height: 140px;
          border-radius: 10px;
          background-size: cover;
          background-position: 50%;
          background-repeat: no-repeat;
        }

        .title_r {
          width: 490px;

          .title {
            font-size: 28px;
            color: #fff;
            line-height: 36px;
            padding-top: 5px;
          }

          .lookNum {
            padding-top: 50px;
            color: #fff;
            font-size: 22px;

            span {
              margin-right: 40px;
            }
          }

        }
      }

      .bg {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        filter: blur(10px);
        -webkit-filter: blur(10px);

      }
    }

    .cntWarp {
      padding: 0 30px;
      border: 1px solid #fff;
      position: relative;

      .communityDesc {
        padding: 30px;
        box-shadow: 0px 0px 16px 0px rgba(102, 102, 102, 0.16);
        border-radius: 20px;
        position: relative;
        top: -20px;
        left: 0;
        z-index: 1000;
        background: #fff;
        line-height: 48px;
      }

      .dynamic-list {
        .activityName{
          color:#ff523d;
          font-size:26px;
          padding-top:30px;
          img{
            width:30px;
            height:30px;
            margin-left:5px;
          }
        }
        .cube-index-list-nav {
          padding: 20px 0;
        }

        .cube-pullup-wrapper {
          padding-top: 20px;
        }

        .cube-pullup-wrapper .before-trigger {
          padding: 0;
          height: 50px;
          line-height: 50px;
        }

        .img-info:last-child {
          border: none;
        }

        .img-info {

          padding: 0 0 30px 0;
          box-sizing:border-box;
          .img-box1 {
            padding-top: 30px;
            div {
              width:660px;
              height:330px;
              position:relative;
              img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                border-radius: 20px;
              }
              .play{
                width:50px;
                height:50px;
                position:absolute;
                top:50%;
                left:50%;
                margin-top:-25px;
                margin-left:-25px;
              }
            }

          }

          .img-box2 {
            padding-top: 30px;

            div {
              width: 330px;
              height: 440px;
            }

            img {
              width: 100%;
              height: 100%;
              object-fit: cover;
              border-radius: 20px;
            }
          }

          .img-box3 {
            padding-top: 30px;

            .img_l {
              width: 430px;
              height: 600px;
              img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                border-radius: 20px;
              }
            }

            .img_r {
              height: 600px;
              width: 210px;

              div {
                width: 210px;
                height: 293px;
                position: relative;
              }

              .img-bottom {
                .mark {
                  position: absolute;
                  left: 0;
                  top: 0;
                  width: 100%;
                  height: 100%;
                  background: rgba(0, 0, 0, 0.4);
                  border-radius: 20px;

                  img {
                    width: 30px;
                    margin-right: 10px;
                  }

                  span {
                    color: #fff;
                    font-size: 28px;
                  }
                }
              }

              .pic {
                object-fit: cover;
                width: 100%;
                height: 100%;
                border-radius: 20px;
              }
            }
          }

          .commentNum {
            font-size: 22px;
            color: #666;
            padding-top: 30px;
            .likeBox {
              width: 100px;
              font-size: 22px;

              img {
                width: 35px;
                margin-right: 10px;
              }
            }
            .commentIcon {
              img {
                width: 36px;
                margin-right: 10px;
              }
            }

            .loolIcon {
              img {
                width: 40px;
                margin-right: 10px;
              }
            }

          }

          .addr {
            padding-top: 30px;

            img {
              width: 26px;
              margin-right: 15px;
            }

            span {
              font-size: 24px;
              color: #999;
            }
          }

          .commentCnt {
            padding-top: 30px;
            h3{
              font-size:30px;
              color:#000;
              font-weight:bold;
            }
            p{
              color:#333;
              font-size: 24px;
              line-height:48px;
              padding-top:10px;
            }
          }

          .user-info {
            height: 90px;
            padding-top: 20px;
            .headImg{
              width: 90px;
              height: 90px;
              border-radius: 50%;
              img {
                width: 90px;
                height: 90px;
                border-radius: 50%;
                object-fit: cover;

              }
            }
            .userName {
              width:550px;
              .name{
                span {
                  font-size: 26px;
                  color: #000;
                }
              }
              .petInfo{
                font-size:22px;
                padding-top:20px;
                img{
                  width:20px;
                  height:20px;
                }
                .petName{
                  margin:0 10px;
                  color:#666;
                }
                .varieties{
                  margin-left:10px;
                  padding:5px 10px;
                  border-radius:10px;

                }
              }
            }

          }
        }




      }
    }
  }
</style>
