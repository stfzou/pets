<template>
  <div class="todayRead">
      <div class="top_nav flex_r_s_b">
        <div class="back" @click="back"></div>
        <div class="nav_title">{{title}} </div>
        <div class="share" @click="share"></div>
      </div>
      <div class="userInfo flex_r_s_b">
        <div class="user_l flex_r_f_s">
          <div class="userHead">
            <img :src="userHeadImage" alt="">
          </div>
          <div class="userName">
            <div class="name">{{name}}</div>
            <div class="fans">{{fansNum}}粉丝</div>
          </div>
        </div>
        <div v-if="isFocus==0" class="user_r follow" @click="follow">+关注</div>
        <div v-else class="user_r follow" @click="cancelFollow">取消关注</div>
      </div>
      <div class="todayReadCnt" v-html="details">

      </div>
      <div class="likeBox flex_r_s_b">
        <div class="good flex_r_f_s">
          <i class="cubeic-good" @click="operation(1)" v-if="status!=1"></i>
          <i class="cubeic-good" @click="operation(3)" v-if="status==1" style="color:#ff523d"></i>
          <span>{{likeNum}}赞</span>
        </div>
        <div class="bad flex_r_f_s">
          <i class="cubeic-bad" v-if="status!=2" @click="operation(2)"></i>
          <i class="cubeic-bad" v-if="status==2" @click="operation(4)" style="color:#ff523d"></i>
          <span>{{disLikeNum}}踩</span>
        </div>
      </div>
      <div class="recommend">
        <div class="title">相关推荐</div>
        <div class="recommendList">
          <cube-scroll
            ref="scroll"
            :data="billboardVos"
            direction="horizontal"
            :options="scrollOption"
            class="horizontal-scroll-list-wrap">
            <ul class="flex_r_f_s">
              <li @click="recommendLink(item)" v-for="item in billboardVos" class="flex_r_s_b">
                  <div class="list_l">
                    <div class="listTitle">{{item.title|descFilter}}</div>
                    <div class="userName flex_r_f_s">
                      <div class="headPic"><img :src="item.userHeadImg" alt=""></div>
                      <div class="name">{{item.userName}}</div>
                    </div>
                  </div>
                  <div class="list_r recommendImg">
                    <img :src="item.coverImg" alt="">
                  </div>
              </li>
          </ul>
          </cube-scroll>
        </div>

      </div>
      <div class="line"></div>
      <div class="commentList">
        <div class="commentNum flex_r_s_b">
          <div class="num">评论{{commentCount}}</div>
          <div class="lookNum flex_r_f_s">
            <i class="cubeic-eye-visible"></i>
            <span>{{viewCount}}</span>
          </div>
        </div>
        <ul>
          <li class="flex_r_s_b"  v-for="item in commentDos">
            <div class="commentHead">
              <img :src="item.userHeadImage" alt="">
            </div>
            <div class="commentNameBox">
              <div class="name flex_r_s_b">
                <div class="name_l">{{item.userName}}</div>
                <div class="name_r time">{{item.createdTime}}</div>
              </div>
              <div class="commentCnt">
                {{item.content}}
              </div>
            </div>
          </li>
        </ul>
        <div class="more" @click="more">查看更多</div>
      </div>
      <div class="addComment flex_r_s_b">
        <input type="text" placeholder="添加一条评论" v-model="commentVal">
        <span @click="addComment">发送</span>
      </div>
  </div>
</template>

<script>
  import wxapi from '../common/wxapi.js'
  import Api from '../common/apj.js'
  export default{
    data(){
      return{
        title:'',
        details:'',
        isFocus:0,
        status:0,
        commentVal:'',
        sysBilId:'',
        userHeadImage:'',
        name:'',
        fansNum:0,
        userId:-1,
        authorId:'',
        likeNum:0,
        disLikeNum:0,
        viewCount:0,
        commentCount:0,
        commentDos:[],
        scrollOption:{
          eventPassthrough:'vertical'
        },
        billboardVos:[]
      }
    },
    filters:{
      descFilter(val){
        if(val.length>20){
          return val.substr(0,20)+'...'
        }else{
          return val
        }
      }
    },
    mounted() {
      if (JSON.parse(localStorage.getItem('user')) != null) {
      	this.userId = JSON.parse(localStorage.getItem('user')).userId;
      }
      if(this.getUrlKey('sysBilId')!=null){
        this.sysBilId = this.getUrlKey('sysBilId')
      }
      this.getData();
    },
    methods:{
      susTip(msg){
        let toast = this.$createToast({
               txt:msg,
               type: 'correct'
             })
        toast.show()
      },
      getUrlKey(name){
          return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[1].replace(/\+/g, '%20')) || null
      },
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
      more(){
        this.$router.push({
          name:'appShowBtn'
        })
      },
      recommendLink(item){
        this.$router.push({
          name:'todayRead',
          query:{
            sysBilId:item.sysBilId
          }
        })
        this.$router.go(0);
      },
      getComment(){
        let self = this
        this.axios.get(Api.userApi+'/systemBillboard/selectSystemBillboardComment',{
          params:{
            sysBilId:self.sysBilId,
            page:1,
            rows:10
          }
        }, {
        		headers: {
        			'Content-Type': 'application/x-www-form-urlencoded'
        		}
        }).then(res=>{
          if(res.data.code==1){
            self.commentDos = res.data.data;
          }else{
            alert(res.data.msg)
          }
        })
      },
      addComment(){
        let self = this;
        if(JSON.parse(localStorage.getItem('user')) != null){
          if(self.commentVal!=''){
            this.axios.post(Api.userApi + '/systemBillboard/addComment', this.qs.stringify({
            	sysBilId: self.sysBilId,
            	userId: self.userId,
              content:self.commentVal
            }), {
            	headers: {
            		'Content-Type': 'application/x-www-form-urlencoded'
            	}
            }).then(res=>{
                if(res.data.code==1){
                  self.getComment();
                  self.commentVal = '';
                  self.susTip('评论成功')
                }else{
                  alert(res.data.msg)
                }
            })
          }

        }else{
          this.goLogin('请先登录才能进行此操作')
        }
      },
      operation(type){
        let self = this;

        if(JSON.parse(localStorage.getItem('user')) != null){
          this.axios.post(Api.userApi + '/systemBillboard/operation', this.qs.stringify({
          	sysBilId: self.sysBilId,
          	userId: self.userId,
            type:type
          }), {
          	headers: {
          		'Content-Type': 'application/x-www-form-urlencoded'
          	}
          }).then((res) => {
          	if (res.data.code == 1) {
          		if(type==1){
                if(self.status==2){
                  self.disLikeNum--
                  self.status = 1
                  self.likeNum++
                }else{
                  self.status = 1
                  self.likeNum++
                }

              }else if(type==2){
                if(self.status==1){
                  self.likeNum--
                  self.disLikeNum++
                  self.status = 2
                }else{
                  self.disLikeNum++
                  self.status = 2
                }
              }else if(type==3){
                self.likeNum--
                self.status = 0;
              }else if(type==4){
                self.status = 0;
                self.disLikeNum--
              }

              console.log(self.status)
          	} else {
          		alert(res.data.msg)
          	}
          })
        }else{
          this.goLogin('请先登录才能进行此操作')
        }

      },
      follow(){//关注
        if(JSON.parse(localStorage.getItem('user')) != null){
          let self = this;
          this.axios.post(Api.userApi + '/community/focusUser', this.qs.stringify({
          	targetUserId: self.authorId,
          	userId: self.userId
          }), {
          	headers: {
          		'Content-Type': 'application/x-www-form-urlencoded'
          	}
          }).then((res) => {
          	if (res.data.code == 1) {
          		self.isFocus = 1;
          		self.susTip('关注成功')
          	} else {
          		alert(res.data.msg)
          	}
          })
        }else{
          this.goLogin('请先登录才能进行此操作')
        }

      },
      cancelFollow() {
      	let self = this;
      	this.axios.post(Api.userApi + '/community/cancelFocusUser', this.qs.stringify({
      		targetUserId: self.authorId,
      		userId: self.userId
      	}), {
      		headers: {
      			'Content-Type': 'application/x-www-form-urlencoded'
      		}
      	}).then((res) => {
      		if (res.data.code == 1) {
      			self.isFocus = 0;
            self.susTip('已取消')
      		} else {
      			alert(res.data.msg)
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
      getData(){
        let self = this
        this.axios.get(Api.userApi+'/systemBillboard/selectBkSystemBillboardDetails',{
          params:{
            sysBilId:self.sysBilId,
            userId:self.userId
          }
        }, {
        		headers: {
        			'Content-Type': 'application/x-www-form-urlencoded'
        		}
        }).then(res=>{
          if(res.data.code==1){
            self.title = res.data.data.simpleSystemBillboardDo.title;
            self.details = res.data.data.simpleSystemBillboardDo.details;
            self.name = res.data.data.baseUserDo.name;
            self.userHeadImage = res.data.data.baseUserDo.userHeadImage;
            self.authorId = res.data.data.baseUserDo.userId;
            self.billboardVos = res.data.data.billboardVos;
            self.disLikeNum = res.data.data.disLikeNum;
            self.likeNum = res.data.data.likeNum;
            self.commentDos = res.data.data.commentDos;
            self.viewCount = res.data.data.viewCount;
            self.commentCount = res.data.data.commentCount;
            self.authorId = res.data.data.baseUserDo.userId;
            self.isFocus = res.data.data.isFocus;
            self.status = res.data.data.status;
            let option = {
              title: self.title, // 分享标题, 请自行替换
              desc:res.data.data.simpleSystemBillboardDo.subTitle.substr(0,30),
              link: window.location.href, // 分享链接，根据自身项目决定是否需要split
              imgUrl:self.userHeadImage, // 分享图标, 请自行替换，需要绝对路径
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
  .todayRead{
    background:#fff;
    padding-bottom:96px;
    .addComment{
      position:fixed;
      bottom:0;
      width:100%;
      left:0;
      height:96px;
      box-sizing:border-box;
      padding:0 20px;
      background:#fff;
      z-index:1000;
      box-shadow:0px 0px 16px 0px rgba(51,51,51,0.15);
      input{
        width:580px;
        height:60px;
        padding-left:20px;
        box-sizing:border-box;
        background:#f5f5f5;
        border-radius:30px;
        font-size:28px;
      }
      span{
        font-size:28px;
        color:#999;
        width:80px;
        text-align:right;
      }
    }
    .line{
      height:10px;
      background:#f5f5f5;
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
    .userInfo{
      padding:30px 22px;
      box-sizing:border-box;
      .user_l{
        width:500px;
        .userHead{
          height:90px;
          width:90px;
          margin-right:22px;
          img{
            width:100%;
            height:100%;
            object-fit: cover;
            border-radius: 50%;
            display:block;
          }

        }
        .userName{
          width:350px;
          .name{
            font-size:28px;
            color:#333;
            line-height:48px;
          }
          .fans{
            line-height:48px;
            color:#999;
            font-size:22px;
          }
        }
      }
      .follow{
        width:100px;
        height:40px;
        border:1px solid rgba(244,61,61,1);
        border-radius:6px;
        text-align:center;
        line-height:40px;
        font-size:24px;
        color:#ff523d;
      }
    }
    .todayReadCnt{
      padding:30px 22px;
      line-height:48px;
      font-size:28px;
    }
    .commentList{
      padding:0 22px;
      .more{
        font-size:26px;
        color:#ff523d;
        text-align:center;
        padding-bottom:20px;
      }
      ul{
        li{
          border-top:1px solid #e8e8e8;/*no*/
          padding:30px 0;
          .commentHead{
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
          .commentNameBox{
            width:560px;
            .name{
              align-items:flex-start;
              padding-bottom:20px;
              .name_l{
                width:200px;
                font-size:28px;

              }
              .time{
                font-size:22px;
                color:#999;
              }
            }
          }
          .commentCnt{
            font-size:24px;
            color:#666;
            line-height:38px;
          }
        }
      }
      .commentNum{
        height:70px;
        .num{
          height:70px;
          font-size:26px;
          color:#ff523d;
          line-height:70px;
          border-bottom:4px solid #ff523d;
          box-sizing:border-box;
        }
        .lookNum{
          color:#999;
          width:150px;
          justify-content:flex-end;
          i{
            font-size:36px;
          }
          span{
            font-size:22px;
          }
        }
      }
    }
    .likeBox{
      box-sizing:border-box;
      padding:30px 90px;
      div{
        width:200px;
        height:50px;
        border-radius:25px;
        font-size:24px;
        justify-content:center;

        i{
          font-size:30px;
          margin-right:5px;
        }
      }
      .good{
        background:#f9b6ae;
        i{
          color:#999;
        }
        span{
          color:#ff523d;
        }
      }
      .bad{
        background:rgba(245,245,245,1);
        color:#999;
      }
    }
    .recommend{
      .title{
        font-size:24px;
        color:#333;
        padding:20px 0 0 30px;

      }
      .cube-scroll-content{
        display: inline-block;
      }
      ul{
        padding:20px 20px 20px 30px;
        li{
          align-items:flex-start;
          width:400px;
          box-sizing:border-box;
          margin-right:20px;
          padding:20px;
          box-shadow:0px 0px 12px 0px rgba(102,102,102,0.16);
          border-radius:20px;
          .list_l{
            width:230px;
            .listTitle{
              line-height:48px;
              color:#333;
              font-size:24px;
            }
            .userName{
              .name{
                width:140px;
                font-size:22px;
                color:#999;
                line-height:36px;
                overflow: hidden;/*超出部分隐藏*/
                text-overflow:ellipsis;/* 超出部分显示省略号 */
                white-space: nowrap;/*规定段落中的文本不进行换行 */
              }
              .headPic{
                height:50px;
                width:50px;
                margin-right:10px;
                img{
                  width:100%;
                  height:100%;
                  object-fit: cover;
                  border-radius: 50%;
                  display:block;
                }

              }
            }
          }
          .list_r{
            width:100px;
            height:100px;
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
    }
  }
</style>
