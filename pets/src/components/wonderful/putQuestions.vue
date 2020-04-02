<template>
  <div class="putQuestions">
      <div class="top_nav flex_r_s_b">
        <div class="back" @click="back"></div>
        <div class="nav_title">{{questionTitle}}</div>
        <div class="share" @click="share"></div>
      </div>
      <div class="putQuestionsCnt">
        <div class="putQuestionsHead">
          <div class="userInfo flex_r_s_b">
            <div class="user_l flex_r_f_s">
              <div class="userHead">
                <img :src="userHeadImage" alt="">
              </div>
              <div class="userName">
                <div class="name">{{userName}}</div>
                <div class="petInfo flex_r_f_s">
                  <img src="../../assets/icon_she21@3x.png" alt="">
                  <b v-if="petName!=''">{{petName}}</b>
                  <b v-else>暂无信息</b>
                  <img v-if="sex==1" src="../../assets/icon_man.png" alt="">
                  <img v-if='sex==2' src="../../assets/icon_wuman.png" alt="">
                  <span v-if="petBreedName!=''" style="background: #ffedeb;">{{petBreedName}}</span>
                  <span v-else style="background: #ffedeb;">暂无信息</span>
                  <span style="background: #fff8eb;">{{age}}岁</span>
                  <span style="background: #ebf2ff;">{{weight}}kg</span>
                </div>
              </div>
            </div>

          </div>
          <div class="title">{{questionTitle}}</div>
          <div class="questionContent">{{questionContent}}</div>
          <div class="answerImg" v-show="questionCompressImages!=''">
            <cube-scroll
              ref="scroll"
              :data="questionCompressImages.split(',')"
              direction="horizontal"
              :options="scrollOption"
              class="horizontal-scroll-list-wrap">
              <div class="imgBox">
                <div class="imgPic" @click="imgShow(questionImages,imgIndex)" v-for="(imgItem,imgIndex) in questionCompressImages.split(',')">
                  <img :src="imgItem">
                </div>
              </div>
            </cube-scroll>
          </div>
          <div class="answerBox">
            <div class="answer flex_r_f_s" @click="tip">
              <img src="../../assets/icon_gai21@3x.png" alt="">
              <span>我来回答</span>
            </div>
          </div>

        </div>
        <div class="notAnswer" v-if="count==0">
          <img src="../../assets/icon_gai43@3x.png" alt="">
          <span>暂无回答</span>
        </div>
        <div class="midNav flex_r_s_b" v-if="count>0">
          <div class="nav_l">{{count}}条回答</div>
          <div class="nav_r">
            <span :class="{activeSpan:newIndex==1}" @click="selectAnswer(1)">综合</span>
            <b>|</b>
            <span :class="{activeSpan:newIndex==2}" @click="selectAnswer(2)">最新</span>
          </div>
        </div>
        <div  class="answerList" v-if="count>0">
          <ul>
            <li v-for="item in answers">
              <div class="userInfo flex_r_s_b">
                <div class="user_l flex_r_f_s">
                  <div class="userHead">
                    <img :src="item.userHeadImage" alt="">
                  </div>
                </div>
                <div class="user_r">
                  <div class="userName">
                    <div class="name flex_r_s_b">

                    <span>{{item.userName}}</span>
                    <div class="zan flex_r_f_s">
                      <i class="cubeic-good" @click="like(item)" v-if="item.isLike==0"></i>
                      <i class="cubeic-good activeLike" v-else @click="cancelLike(item)"></i>
                      <span>{{item.likeCount}}</span>
                    </div>
                    </div>

                    <div class="petInfo flex_r_f_s">
                      <img src="../../assets/icon_she21@3x.png" alt="">
                      <b v-if="item.petName!=''">{{item.petName}}</b>
                      <b v-else>暂无信息</b>
                      <img v-if="item.sex==1" src="../../assets/icon_man.png" alt="">
                      <img v-if='item.sex==2' src="../../assets/icon_wuman.png" alt="">
                      <span v-if="item.petBreedName!=''" style="background: #ffedeb;">{{item.petBreedName}}</span>
                      <span v-else style="background: #ffedeb;">暂无信息</span>
                      <span style="background: #fff8eb;">{{item.age}}岁</span>
                      <span style="background: #ebf2ff;">{{item.weight}}kg</span>
                    </div>
                  </div>
                  <div class="answerCnt">
                    {{item.answerContent}}
                  </div>
                  <div class="answerImg" v-show="item.answerCompressImages!=''">
                    <cube-scroll
                      ref="scroll"
                      :data="item.answerCompressImages.split(',')"
                      direction="horizontal"
                      :options="scrollOption"
                      class="horizontal-scroll-list-wrap">
                      <div class="imgBox">
                        <div class="imgPic" @click="imgShow(item.answerImages,imgIndex)" v-for="(imgItem,imgIndex) in item.answerCompressImages.split(',')">
                          <img :src="imgItem">
                        </div>
                      </div>
                    </cube-scroll>
                  </div>
                </div>
              </div>

            </li>
          </ul>
        </div>
        <div class="recommend" v-if="count==0">
          <div class="recommendTitle">相关推荐</div>
          <ul>
            <li v-for="item in questions" @click="questionLink(item)">

                <div class="questionTile flex_r_f_s">
                  <span>Q</span><b>{{item.questionTitle}}</b>
                </div>
                <div class="questionContent">{{item.questionContent}}</div>
            </li>
          </ul>
        </div>
        <div class="more" @click="appTesting">下载骨米APP查看更多有趣内容</div>
      </div>

  </div>
</template>

<script>
  import wxapi from '../common/wxapi.js'
  import Api from '../common/apj.js'
  export default{
    data(){
      return{
        newIndex:1,
        questionTitle:'',
        questionContent:'',
        userName:'',
        userHeadImage:'',
        questionImages:'',
        questionCompressImages:'',
        answers:[],
        questionId:'',
        initialIndex:0,
        userId:-1,
        count:0,
        weight:'',
        sex:'',
        age:'',
        species:'',
        petName:'',
        petBreedName:'',
        scrollOption:{
          eventPassthrough:'vertical'
        },
        questions:[]
      }
    },
    mounted() {

      if (JSON.parse(localStorage.getItem('user')) != null) {
      	this.userId = JSON.parse(localStorage.getItem('user')).userId;
      }
      if(this.getUrlKey('questionId')!=null){
        this.questionId = this.getUrlKey('questionId')
      }
      this.getData();

    },
    methods:{
      back() {
      	this.$router.go(-1); //返回上一层
      },
      share(){
        this.isMask = false
        let toast = this.$createToast({
        	txt: '点击浏览器顶端最右边进行分享',
        	type: 'warn'
        })
        toast.show()
      },
      getUrlKey(name){
          return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[1].replace(/\+/g, '%20')) || null
      },
      questionLink(item){
        this.$router.push({
          name:'putQuestions',
          query:{
            questionId:item.questionId
          }
        })
        this.$router.go(0);
      },
      tip(){
        let self = this;
        this.dialog = this.$createDialog({
                type: 'confirm',
                title: '提示',
                content: '参与骨米宠物汪圈问答得现金奖励！<br>请下载骨米宠物APP继续',
                confirmBtn: {
                  text: '确定',
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
                  self.appTesting();
                },
                onCancel: () => {

                }
         }).show()
      },
      appTesting(){
        var u = navigator.userAgent,
        app = navigator.appVersion;

        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
        var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        if (isAndroid) {

        	window.location.href = 'http://app.xiaomi.com/details?id=com.freedogs.freedogs';
        }
        if (isIOS) {
        	window.location.href = 'https://itunes.apple.com/cn/app/id1437699756';
        }
      },

      selectAnswer(num){
        let self = this
        self.newIndex = num;
        this.axios.get(Api.userApi+'/question/selectAnswer',{
          params:{
            questionId:self.questionId,
            userId:self.userId,
            type:num,
            page:1,
            rows:10
          }
        }, {
        		headers: {
        			'Content-Type': 'application/x-www-form-urlencoded'
        		}
        }).then(res=>{
          if(res.data.code==1){

            if(res.data.data.length>10){
              self.answers = res.data.data.slice(0,10)
            }else{
              self.answers = res.data.data;
            }
          }else{
            alert(res.data.msg)
          }
        })
      },
      like(item){

        if(JSON.parse(localStorage.getItem('user')) != null){
          let self = this
          this.axios.post(Api.userApi+'/question/likeAnswer', this.qs.stringify({
          		userId:self.userId,
              answerId:item.answerId,
              beLikeUserId:item.userId,
              questionId:self.questionId
          	}), {
          		headers: {
          			'Content-Type': 'application/x-www-form-urlencoded'
          		}
          }).then(res=>{
          	if(res.data.code==1){
          		item.isLike=1;
              item.likeCount++;
              self.susTip('点赞成功')
          	}else{
          		alert(res.data.msg)
          	}
          })
        }else{
          this.goLogin('请先登录才能进行此操作')
        }
      },
      cancelLike(item){
        if(JSON.parse(localStorage.getItem('user')) != null){
          let self = this
          this.axios.post(Api.userApi+'/question/disLikeAnswer', this.qs.stringify({
          		userId:self.userId,
              answerId:item.answerId,
              beLikeUserId:item.userId,
              questionId:self.questionId
          	}), {
          		headers: {
          			'Content-Type': 'application/x-www-form-urlencoded'
          		}
          }).then(res=>{
          	if(res.data.code==1){
          		item.isLike=0;
              item.likeCount--;
          	}else{
          		alert(res.data.msg)
          	}
          })
        }else{
          this.goLogin('请先登录才能进行此操作')
        }
      },
      susTip(msg){
        const toast = this.$createToast({
               txt:msg,
               type: 'correct'
             })
        toast.show()
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

      imgShow(imgs,imgIndex){
        let self = this;
        this.axios.get(Api.userApi + '/image/getImageUrlArrays?keys=' + imgs, {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then((res)=>{
            if(res.data.code==1){
              self.initialIndex = imgIndex
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
      getData(){
        let self = this
        this.axios.get(Api.userApi+'/question/selectQuestionDesc',{
          params:{
            questionId:self.questionId,
            userId:self.userId
          }
        }, {
        		headers: {
        			'Content-Type': 'application/x-www-form-urlencoded'
        		}
        }).then(res=>{
        	if(res.data.code==1){
            self.userName = res.data.data.userName;
            self.userHeadImage = res.data.data.userHeadImage;
            self.questionTitle = res.data.data.questionTitle;
            self.questionContent = res.data.data.questionContent;
            self.questionCompressImages = res.data.data.questionCompressImages;
            self.questionImages = res.data.data.questionImages;
            self.answers = res.data.data.answers;
            self.questions = res.data.data.questions;
            self.count = res.data.data.count;
            self.age = res.data.data.age;
            self.sex = res.data.data.sex;
            self.weight = res.data.data.weight;
            self.petName = res.data.data.petName;
            self.petBreedName = res.data.data.petBreedName;
            self.species = res.data.data.species;
            let wxImg = '';
            if(self.questionCompressImages!=''){
              wxImg = self.questionCompressImages.split(',')[0]
            }else{
              wxImg = self.userHeadImage;
            }
            let option = {
              title: self.questionTitle, // 分享标题, 请自行替换
              desc:self.questionContent.substr(0,30),
              link: window.location.href, // 分享链接，根据自身项目决定是否需要split
              imgUrl:wxImg, // 分享图标, 请自行替换，需要绝对路径
              success: () => {

              },
              error: () => {
                alert('已取消分享')
              }
            }
            wxapi.wxRegister(option)
        	}else{
        		alert(res.data.msg)
        	}
        })
      }
    }
  }
</script>

<style lang="scss">
  .putQuestions{
    height:100%;
    @keyframes btSacl
    {
      0% {transform: scale(0.6);}
      100% {transform: scale(1);}
    }
    .cube-dialog-content{
      text-align:center;
      .cube-dialog-content-def{
        text-align:center;
        &>p{
          text-align:center;
        }
      }
    }
    .more{
      text-align:center;
      color:#ff523d;
      font-size:26px;
      padding-bottom:20px;
    }
    .top_nav {
      	padding: 0 20px;
      	height: 88px;
      	box-sizing: border-box;
        position:relative;
      	.back {
      		width: 26px;
      		height: 42px;
      		background: url(../../assets/icon/backColory.png) no-repeat center 0;
      		background-size: cover;
          z-index:100;
      	}

      	.nav_title {
      		font-size: 30px;
      		color: #333;
      		position: absolute;
      		left: 0;
      		top: 0;
          height:88px;
          line-height:88px;
          width:100%;
          text-align: center;
          overflow: hidden;/*超出部分隐藏*/
          text-overflow:ellipsis;/* 超出部分显示省略号 */
          white-space: nowrap;/*规定段落中的文本不进行换行 */
          padding:0 80px;
          box-sizing:border-box;
      	}
      	.share{
      		width: 50px;
      		height: 40px;
      		background: url('../../assets/icon/active_share.png') no-repeat center 0;
      		background-size: 100%;
          z-index:100;
      	}
    }
    .putQuestionsCnt{
        padding:20px 30px 0 30px;
        .notAnswer{
          display:flex;
          flex-direction:column;
          justify-content:center;
          align-items:center;
          padding:60px 0;
          img{
            width:89px;
          }
          span{
            font-size:24px;
            color:#999;
          }
        }
        .midNav{
          color:#999;
          font-size:24px;
          margin-top:30px;
          margin-bottom:30px;
          b{
            color:#ff523d;
            font-size:30px;
          }
          .activeSpan{
            color:#000;
          }
        }
        .putQuestionsHead{
          box-shadow:0px 0px 12px 0px rgba(102,102,102,0.16);
          border-radius:20px;
          padding:30px;
          .title{
            font-size:28px;
            color:#333;
            line-height:48px;
            padding-top:15px;
          }
          .questionContent{
            font-size:24px;
            color:#666;
            line-height:48px;
          }
          .answerImg{
            .cube-scroll-content{
              display: inline-block;
            }
            .imgBox{
              white-space: nowrap;
              padding-top:20px;
              .imgPic{
                 display: inline-block;
                 width:150px;
                 height:150px;
                 border-radius:20px;
                 margin-right:20px;
                 img{
                   width:100%;
                   height:100%;
                   object-fit: cover;
                   border-radius:20px;
                   display:block;
                 }
              }
            }

          }
          .userInfo{
            align-items:flex-start;
            box-sizing:border-box;
            .user_l{
              width:500px;
              align-items:flex-start;
              .userHead{
                height:90px;
                width:90px;

                img{
                  width:100%;
                  height:100%;
                  object-fit: cover;
                  border-radius: 50%;
                  display:block;
                }

              }
              .userName{
                width:400px;
                margin-left:10px;
                .name{
                  font-size:30px;
                  color:#333;
                }
                img{
                  width:22px;
                }
                .petInfo{
                  padding-top:30px;
                  b{
                    margin:0 10px;
                  }
                  span{
                    margin-left:10px;
                    border-radius:10px;
                    padding:5px;

                  }
                }
              }
            }
          }
          .answerBox{
            padding-top:25px;
            .answer{

              justify-content:center;
              height:70px;
              border-radius:20px;
              background:rgba(245,245,245,1);
              img{
                width:36px;
              }
              span{
                font-size:26px;
                color:#333;
                line-height:70px;
              }
            }
          }
        }


        .answerList{
          li{
            padding:30px;
            box-shadow:0px 0px 12px 0px rgba(102,102,102,0.16);
            border-radius:20px;
            margin-bottom:30px;
            .answerImg{
              .cube-scroll-content{
                display: inline-block;
              }
              .imgBox{
                white-space: nowrap;
                padding-top:20px;
                .imgPic{
                   display: inline-block;
                   width:150px;
                   height:150px;
                   border-radius:20px;
                   margin-right:20px;
                   img{
                     width:100%;
                     height:100%;
                     object-fit: cover;
                     border-radius:20px;
                     display:block;
                   }
                }
              }

            }
            .userInfo{
              align-items:flex-start;
              .user_l{
                width:90px;
                align-items:flex-start;
                .userHead{
                  height:90px;
                  width:90px;

                  img{
                    width:100%;
                    height:100%;
                    object-fit: cover;
                    border-radius: 50%;
                    display:block;
                  }

                }
                .userName{
                  width:400px;
                  margin-left:10px;
                  .name{
                    font-size:30px;
                    color:#333;
                  }
                  img{
                    width:22px;
                  }
                  .petInfo{
                    padding-top:30px;
                    b{
                      margin:0 10px;
                    }
                    span{
                      margin-left:10px;
                      border-radius:10px;
                      padding:5px;

                    }
                  }
                }
              }
              .user_r{
                width:480px;
                .userName{
                  .name{
                    font-size:30px;
                    color:#333;
                    .zan{
                      width:100px;
                      text-align:right;
                      display:flex;
                      flex-direction:row;
                      justify-content:flex-end;
                      font-size:24px;
                      color:#999;
                      i{
                        font-size:30px;
                        margin-right:5px;
                        color:#999;
                      }
                      .activeLike{
                        color:#ff523d;
                      }
                    }
                  }
                  img{
                    width:22px;
                  }
                  .petInfo{
                    padding-top:30px;
                    b{
                      margin:0 10px;
                    }
                    span{
                      margin-left:10px;
                      border-radius:10px;
                      padding:5px;

                    }
                  }
                }
              }
            }
            .answerCnt{
              padding-top:20px;
              line-height:48px;
              font-size:24px;
              color:#666;
            }
          }
        }
        .recommend{
          .recommendTitle{
            font-size:26px;
            color:#333;
            padding:30px 0;
          }
          li{
            box-shadow:0px 0px 12px 0px rgba(102,102,102,0.16);
            border-radius:20px;
            margin-bottom:30px;
            padding:30px;

            .questionTile{
              font-size:28px;
              line-height:48px;
              color:#333;
              span{
                font-size:48px;
                color:#ff523d;
                margin-right:20px;
              }
              b{
                overflow: hidden;/*超出部分隐藏*/
                text-overflow:ellipsis;/* 超出部分显示省略号 */
                white-space: nowrap;/*规定段落中的文本不进行换行 */
                width:530px;
              }
            }
            .questionContent{
              line-height:48px;
              font-size:24px;
              color:#666;
              padding-top:20px;
            }
          }
        }
      }

  }

</style>
