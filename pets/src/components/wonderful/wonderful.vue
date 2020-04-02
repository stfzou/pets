<template>
  <div class="wonderfulWarp">
      <div class="top_nav flex_r_s_b">
        <div class="back" @click="back"></div>
        <div class="nav_title">骨米宠物奇葩说详情</div>
        <div class="share" @click="share"></div>
      </div>
      <div class="wonderfulCnt">
        <div class="wonderfulHead">
          <div class="wonderfulTitle">{{strangeTalkTitle}}</div>
          <div class="topicCnt">{{strangeTalkContent}}</div>
          <div class="topicSelect">
            <div class="btnBox flex_r_f_e" :class="{activeBtn:voteType==0}">
              <div class="yesBtn" :style="{'width':yesWidth}" @click="vote(1)">
                <img class="img_l" src="../../assets/icon_gai37@3x.png" alt="">
                <span>是<b v-if="voteType!=0">{{approveNum}}</b></span>
                <img class="img_r" src="../../assets/icon_gai38@3x.png" alt="">
               </div>
              <div class="noBtn" :style="{'width':noWidth}"  @click="vote(2)">
                <img class="img_l" src="../../assets/icon_gai39@32x.png" alt="">
                <span>否<b v-if="voteType!=0">{{denyNum}}</b></span>
                <img class="img_r" src="../../assets/icon_gai40@3x.png" alt="">
              </div>
            </div>

          </div>
          <div class="answerBox">
            <div class="answer flex_r_f_s" @click="tip">
              <img src="../../assets/icon_gai21@3x.png" alt="">
              <span>我来回答</span>
            </div>
          </div>

        </div>
        <div class="notAnswer" v-if="answerNum==0">
          <img src="../../assets/icon_gai43@3x.png" alt="">
          <span>暂无回答</span>
        </div>
        <div class="midNav flex_r_s_b" v-if="answerNum>0">
          <div class="nav_l">{{answerNum}}条回答</div>
          <div class="nav_r">
            <span :class="{activeSpan:newIndex==1}" @click="selectAnswer(1)">综合</span>
            <b>|</b>
            <span :class="{activeSpan:newIndex==2}" @click="selectAnswer(2)">最新</span>
          </div>
        </div>
        <div  class="answerList" v-if="answerNum>0">
          <ul>
            <li v-for="i in answerVos">
              <div class="userInfo flex_r_s_b">
                <div class="user_l flex_r_f_s">
                  <div class="userHead">
                    <img :src="i.userHeadImage" alt="">
                  </div>

                </div>
                <div class="user_r">
                  <div class="userName">
                    <div class="name flex_r_s_b">

                      <span>{{i.userName}}</span>
                      <div class="zan flex_r_f_s">
                        <i class="cubeic-good" @click="like(i)" v-if="i.isLike==0"></i>
                        <i class="cubeic-good activeLike" v-else @click="cancelLike(i)"></i>
                        <span>{{i.likeCount}}</span>
                      </div>
                    </div>
                    <div class="petInfo flex_r_f_s">
                      <img src="../../assets/icon_she21@3x.png" alt="">
                      <b v-if="i.petName!=''">{{i.petName}}</b>
                      <b v-else>暂无信息</b>
                      <img v-if="i.sex==1" src="../../assets/icon_man.png" alt="">
                      <img v-if='i.sex==2' src="../../assets/icon_wuman.png" alt="">
                      <span v-if="i.petBreedName!=''" style="background: #ffedeb;">{{i.petBreedName}}</span>
                      <span v-else style="background: #ffedeb;">暂无信息</span>
                      <span style="background: #fff8eb;">{{i.age}}岁</span>
                      <span style="background: #ebf2ff;">{{i.weight}}kg</span>
                    </div>
                  </div>

                  <div class="answerCnt">
                    {{i.answerContent}}
                  </div>
                  <div class="answerImg" v-show="i.answerCompressImages!=''">
                    <cube-scroll
                      ref="scroll"
                      :data="i.answerCompressImages.split(',')"
                      direction="horizontal"
                      :options="scrollOption"
                      class="horizontal-scroll-list-wrap">
                      <div class="imgBox">
                        <div class="imgPic" @click="imgShow(i,imgIndex)" v-for="(imgItem,imgIndex) in i.answerCompressImages.split(',')">
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
        <div class="recommend" v-if="answerNum==0">
          <div class="recommendTitle">相关推荐</div>
          <ul>
            <li v-for="item in strangeTalKs" @click="strangeTalkLink(item)">
              <div class="questionBox">
                <div class="time">{{item.createdTime}}</div>
                <div class="question">
                  <img class="q_l" src="../../assets/icon_gai25@3x.png" alt="">
                  <span>{{item.strangeTalkTitle}}</span>
                  <img class="q_r" src="../../assets/icon_gai24@3x.png" alt="">
                </div>
                <div class="joinName">{{item.joinUserName}}等<span>{{item.joinNum}}</span>人参与</div>
                <div class="questionSelect">
                  <div class="btnBox flex_r_f_e">
                    <div class="yesBtn" :style="{'width':item.yesWidth}">
                      <img class="img_l" src="../../assets/icon_gai37@3x.png" alt="">
                      <span>是</span>
                      <img class="img_r" src="../../assets/icon_gai38@3x.png" alt="">
                     </div>
                    <div class="vs" v-if="item.voteType==0">VS</div>
                    <div class="noBtn" :style="{'width':item.noWidth}">
                      <img class="img_l" src="../../assets/icon_gai39@32x.png" alt="">
                      <span>否</span>
                      <img class="img_r" src="../../assets/icon_gai40@3x.png" alt="">
                    </div>
                  </div>

                </div>

              </div>
              <div class="userHead flex_r_f_s" v-if="item.answerNum!=0">
                <div class="headPic">
                  <img :src="item.answerUserHeadImage" alt="">
                </div>
                <div class="name">{{item.answerUserName}}</div>
              </div>
              <div class="userAnswer" v-if="item.answerNum!=0">
                {{item.answerContent}}
              </div>
              <div class="answerNum">共{{item.answerNum}}人回答</div>
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
        strangeTalkTitle:'',
        strangeTalkContent:'',
        answerNum:0,
        voteType:0,
        approveNum:0,//是数量
        denyNum:0,//否数量
        yesWidth:'35%',
        noWidth:'35%',
        answerVos:[],
        strangeTalkId:'',
        initialIndex:0,
        userId:-1,
        scrollOption:{
          eventPassthrough:'vertical'
        },
        strangeTalKs:[]
      }
    },
    mounted() {

      if (JSON.parse(localStorage.getItem('user')) != null) {
      	this.userId = JSON.parse(localStorage.getItem('user')).userId;

      }
      if(this.getUrlKey('strangeTalkId')!=null){
        this.strangeTalkId = this.getUrlKey('strangeTalkId')
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
      strangeTalkLink(item){
        this.$router.push({
          name:'wonderful',
          query:{
            strangeTalkId:item.strangeTalkId
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
      vote(type){//投票
        let self = this
        if(JSON.parse(localStorage.getItem('user')) != null){
          if(this.voteType==0){
            this.axios.post(Api.userApi+'/strange/talk/vote', this.qs.stringify({
            		userId:self.userId,
                type:type,
                strangeTalkId:self.strangeTalkId
            	}), {
            		headers: {
            			'Content-Type': 'application/x-www-form-urlencoded'
            		}
            }).then(res=>{
            	if(res.data.code==1){
            		self.getData()
                self.susTip('投票成功')
            	}else{
            		alert(res.data.msg)
            	}
            })
          }
        }else{
          this.goLogin('请先登录才能进行此操作')
        }


      },
      selectAnswer(num){
        let self = this
        self.newIndex = num;
        this.axios.get(Api.userApi+'/strange/talk/selectAnswer',{
          params:{
            strangeTalkId:self.strangeTalkId,
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
              self.answerVos = res.data.data.slice(0,10)
            }else{
              self.answerVos = res.data.data;
            }
          }else{
            alert(res.data.msg)
          }
        })
      },
      like(item){

        if(JSON.parse(localStorage.getItem('user')) != null){
          let self = this
          this.axios.post(Api.userApi+'/strange/talk/likeAnswer', this.qs.stringify({
          		userId:self.userId,
              answerId:item.answerId,
              beLikeUserId:item.userId,
              strangeTalkId:self.strangeTalkId
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
          this.axios.post(Api.userApi+'/strange/talk/disLikeAnswer', this.qs.stringify({
          		userId:self.userId,
              answerId:item.answerId,
              beLikeUserId:item.userId,
              strangeTalkId:self.strangeTalkId
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

      imgShow(i,imgIndex){
        let self = this;
        this.axios.get(Api.userApi + '/image/getImageUrlArrays?keys=' + i.answerImages, {
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
        this.axios.get(Api.userApi+'/strange/talk/selectStrangeTalkDesc',{
          params:{
            strangeTalkId:self.strangeTalkId,
            userId:self.userId
          }
        }, {
        		headers: {
        			'Content-Type': 'application/x-www-form-urlencoded'
        		}
        }).then(res=>{
        	if(res.data.code==1){
            self.denyNum = res.data.data.denyNum;
            self.approveNum = res.data.data.approveNum;
            self.strangeTalkTitle = res.data.data.strangeTalkTitle;
            self.strangeTalkContent = res.data.data.strangeTalkContent;
            self.voteType = res.data.data.voteType;
            self.answerVos = res.data.data.answerVos;
            let option = {
              title: self.strangeTalkTitle, // 分享标题, 请自行替换
              desc:self.strangeTalkContent.substr(0,30),
              link: window.location.href, // 分享链接，根据自身项目决定是否需要split
              imgUrl:'https://gutouzu.oss-cn-shenzhen.aliyuncs.com/static/icon_share%403x.png', // 分享图标, 请自行替换，需要绝对路径
              success: () => {

              },
              error: () => {
                alert('已取消分享')
              }
            }
            wxapi.wxRegister(option)

            if(res.data.data.answerVos.length>10){
              self.answerVos = res.data.data.answerVos.slice(0,10)
            }
            self.answerNum = res.data.data.answerNum;
            if(res.data.data.answerNum==0){
              self.strangeTalKs = res.data.data.strangeTalKs;
            }
            if(self.denyNum==0&&self.approveNum==0||self.voteType==0){
              self.yesWidth = '35%'
              self.noWidth = '35%'
              console.log(1)
            }else if(self.denyNum==0&&self.approveNum!=0){
              self.yesWidth = '70%'
              self.noWidth = '20%'
              console.log(2)
            }else if(self.denyNum!=0&&self.approveNum==0){
              self.yesWidth = '70%'
              self.noWidth = '20%'
              console.log(3)
            }else{

              if((self.approveNum/(self.approveNum+self.denyNum))*100>=70){
                self.yesWidth = '70%'
                self.noWidth = '20%'
              }else if((self.approveNum/(self.approveNum+self.denyNum))*100<=20){
                self.yesWidth = '20%'
                self.noWidth = '70%'
              }else if((self.denyNum/(self.approveNum+self.denyNum))*100<=20){
                self.yesWidth = '70%'
                self.noWidth = '20%'
              }
              else{


                self.yesWidth = (self.approveNum/(self.approveNum+self.denyNum))*100-5+'%'
                self.noWidth = (self.denyNum/(self.approveNum+self.denyNum))*100-5+'%'

              }

              // if((self.denyNum/(self.approveNum+self.denyNum))*100>=70){
              //   self.noWidth = '70%'
              //   self.yesWidth = '20%'
              // }else if((self.denyNum/(self.approveNum+self.denyNum))*100<=20){
              //   self.noWidth = '20%'
              // }else{
              //   self.noWidth = (self.denyNum/(self.approveNum+self.denyNum))*100+'%'
              //   console.log(self.noWidth)
              // }


            }

        	}else{
        		alert(res.data.msg)
        	}
        })
      }
    }
  }
</script>

<style lang="scss">
  .wonderfulWarp{
    height:100%;
    @keyframes btSacl
    {
      0% {transform: scale(0.9);}
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
      	}
      	.share{
      		width: 50px;
      		height: 40px;
      		background: url('../../assets/icon/active_share.png') no-repeat center 0;
      		background-size: 100%;
      	}
      }
      .wonderfulCnt{
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
        .wonderfulHead{
          box-shadow:0px 0px 12px 0px rgba(102,102,102,0.16);
          border-radius:20px;
        }
        .wonderfulTitle{
          height:90px;
          background:rgba(113,183,254,1);
          box-shadow:0px 0px 12px 0px rgba(102,102,102,0.16);
          border-radius:20px;
          font-size:28px;
          color:#fff;
          text-align:center;
          line-height:90px;
        }
        .topicCnt{
          font-size:24px;
          line-height:48px;
          color:#666;
          padding:15px 30px;
        }
        .topicSelect{
          padding:15px 30px 40px 15px;
          .btnBox{
            .img_l{
              position:absolute;
              left:0;
              top:0;
              height:50px;
            }
            .img_r{
              position:absolute;
              right:0;
              top:0;
              height:50px;
            }
            div{
              border-radius:10px;
              box-shadow:0px 5px 0px 0px rgba(239,0,0,0.2);
              height:50px;
              width:240px;
              color:#fff;
              font-size:26px;
              line-height:50px;
              position:relative;
              text-align:center;

            }
            .yesBtn{
              background:#ff523d;

            }
            .noBtn{
              background:#333;
            }
          }
          .activeBtn{
            div{
              animation: btSacl 0.8s linear infinite alternate;
            }
          }
        }
        .answerBox{
          padding:15px 30px;
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
            .answerNum{
              font-size:28px;
              color:#333;
              text-align:center;
              padding:30px 40px 22px 40px;
            }
            .userAnswer{
              line-height:48px;
              font-size:24px;
              color:#666;
              box-sizing:border-box;
              padding:0 40px;
            }
            .userHead{
              padding:0 40px;
              box-sizing:border-box;
              .headPic{
                width:32px;
                height:32px;
                img{
                  width:100%;
                  height:100%;
                  object-fit: cover;
                  border-radius:50%;
                  display:block;
                }
              }
              .name{
                font-size:26px;
                color:#000;
                margin-left:10px;
                padding:30px 0 20px 0;
              }
            }
            .questionBox{
              padding:40px;
              background:#71B7FE;
              border-radius:20px;
              .time{
                font-size:22px;
                color:#fff;
                padding-left:90px;
                padding-bottom:10px;
              }
              .question{
                display:flex;
                justify-content:center;
                align-items:center;
                flex-direction:row;
                padding:55px 30px;
                background:#99c9f9;
                font-size:28px;
                line-height:48px;
                color:#fff;
                position:relative;
                img{
                  width:72px;
                  height:72px;
                }
                .q_l{
                  position:absolute;
                  top:-62px;
                  left:0;
                }
                .q_r{
                  position:absolute;
                  bottom:-42px;
                  right:0;
                }
              }
              .joinName{
                font-size:24px;
                color:#fff;
                padding:40px 0;
                span{
                  color:#ff523d;

                }
              }
              .questionSelect{

                .btnBox{
                  .img_l{
                    position:absolute;
                    left:0;
                    top:0;
                    height:50px;
                  }
                  .img_r{
                    position:absolute;
                    right:0;
                    top:0;
                    height:50px;
                  }
                  div{
                    border-radius:10px;
                    box-shadow:0px 5px 0px 0px rgba(239,0,0,0.2);
                    height:50px;
                    width:240px;
                    color:#fff;
                    font-size:26px;
                    line-height:50px;
                    position:relative;
                    text-align:center;
                  }
                  .vs{
                     box-shadow:none;
                  }
                  .yesBtn{
                    background:#ff523d;
                  }
                  .noBtn{
                    background:#333;
                  }
                }
              }
            }
          }
        }
      }

  }

</style>
