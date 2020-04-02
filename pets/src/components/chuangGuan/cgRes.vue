<template>
  <div class="cgResWarp">
    <div class="top_nav flex_r_s_b">
      <div class="back" @click="back"></div>
      <div class="nav_title">萌宠闯关</div>
    </div>
    <div class="cgResTitle">{{title}}</div>
    <div class="cgResCnt">
      <div class="cntBg">
        <div class="cntText" v-html="cntText"></div>
        <P v-if="status=='sus'">奖励骨豆{{prizeNum}}粒</P>
      </div>
    </div>
    <div class="cgResBootm">
      <p>今日剩余{{answerCount}}次闯关机会</p>
      <div class="btn flex_r_s_c" v-if="answerCount>0" @click="onemoretime">再来一次</div>
      <div class="btn flex_r_s_c" v-else>邀请好友答题</div>

    </div>

  </div>
</template>

<script>
  import wxapi from '../common/wxapi.js'
  import Api from '../common/apj.js'
  export default{
    data(){
      return{
        lvId:'',
        prizeType:'',
        prizeNum:0,
        status:'',
        cntText:'',
        title:'',
        userId:'',
        answerCount:0,
        isInvite:'-1',
        susNum:0,
        userName:'',

      }
    },
    mounted() {
      if (JSON.parse(localStorage.getItem('user')) != null) {
      	this.userId = JSON.parse(localStorage.getItem('user')).userId;
        this.userName = JSON.parse(localStorage.getItem('user')).userName;
        this.wxShare();

      }else{
        this.$router.push({
          name:'cgIndex'
        })
      }
      this.status = this.$route.query.status
      if(this.status=='sus'){
        this.title = '闯关成功'
        this.lvId = this.$route.query.lvId
        this.prizeType = this.$route.query.prizeType
        this.prizeNum = this.$route.query.prizeNum

        this.getSus();
      }else{
        this.title = '闯关失败'
        this.susNum = this.$route.query.susNum
        this.getFail();
      }
    },
    methods:{
      back() {
      	this.$router.go(-1); //返回上一层
      },

      wxShare(){
        let self = this
        let option = {
          title: '萌宠闯关挑战你的大脑IQ', // 分享标题, 请自行替换
          desc:'我是'+self.userName+'我在骨米宠物参加萌宠闯关大赛，答题得奖励，养宠真有趣。快来试一下，让你脑洞大开！',
          link: 'https://h5.gumipet.com/index.html#/cgIndex', // 分享链接，根据自身项目决定是否需要split
          imgUrl:'https://gutouzu.oss-cn-shenzhen.aliyuncs.com/static/gumilogo_1024.png', // 分享图标, 请自行替换，需要绝对路径
          success: () => {

          },
          error: () => {

          }
        }
        wxapi.wxRegister(option)
      },
      getSus(){
        let self = this;
        this.axios.post(Api.userApi+'/answerGame/answerSuccess', this.qs.stringify({
        		userId:self.userId,
            gateLevelId:self.lvId,
            prizeType:self.prizeType,
            prizeNum:self.prizeNum
        	}), {
        		headers: {
        			'Content-Type': 'application/x-www-form-urlencoded'
        		}
        }).then(res=>{
        	if(res.data.code==1){

            self.isInvite = res.data.data.isInvite
            self.answerCount = res.data.data.answerCount
            self.cntText = '恭喜你,'+' <br>闯关成功!'
        	}else{
        		alert(res.data.msg)
            setTimeout(e=>{
              self.$router.push({
                name:'cgIndex'
              })
            },500)
        	}
        })
      },
      getFail(){
        let self = this;
        this.axios.get(Api.userApi+'/answerGame/answerFail',{
          params:{
            userId:self.userId
          }

        }).then(function(res) {

              if(res.data.code==1){
                self.answerCount = res.data.data.answerCount;
                self.isInvite = res.data.data.isInvite;
                self.cntText = '本次闯关答对了'+self.susNum+'题 <br>请继续加油!'
              }else{
                alert(res.data.msg)
              }
        	}).catch(function(err) {
              alert(err)

        	});
      },
      onemoretime(){//再来一次
        this.$router.push({
          name:'cgIndex'
        })
      }
    }
  }
</script>

<style lang="scss">
  .cgResWarp{
    height:100%;
    background:#FE8F70;
    position:relative;
    .top_nav {
    	padding: 0 20px;
    	height: 88px;
    	box-sizing: border-box;
    	position: fixed;
    	z-index: 100;
      position: relative;
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
        text-align: center;
    		left: 50%;
    		top: 50%;
    		transform: translate(-50%, -50%);
        width:500px;
        overflow: hidden;/*超出部分隐藏*/
        text-overflow:ellipsis;/* 超出部分显示省略号 */
        white-space: nowrap;/*规定段落中的文本不进行换行 */
    	}

    }
    .cgResTitle{
      font-size:80px;
      font-family:HappyZcool-2016;
      color:#fff;
      text-shadow:0px 8px 0px rgba(186,20,0,0.3);
      text-align:center;
      padding-top:100px;
    }
    .cgResCnt{
      padding:60px 70px 0 70px;
      .cntBg{
        height:500px;
        background:url('../../assets/icon_she87@2x.png') no-repeat center 0;
        background-size:100%;
        text-align:center;
        .cntText{
          padding-top:80px;
          line-height:100px;
          font-size:60px;
          color:#333;
          font-family:HappyZcool-2016;
        }
        p{
          text-align:center;
          font-size:26px;
          color:#ff523d;
          padding-top:20px;
        }
      }
    }
    .cgResBootm{
      position:absolute;
      width:420px;
      bottom:80px;
      left:50%;
      margin-left:-210px;
      p{
        font-size:26px;
        color:#fff;
        text-align:center;

      }
      .btn{
        height:90px;
        border-radius:45px;
        background:#fff;
        color:#ff523d;
        font-size:36px;
        margin-top:40px;
      }
    }
  }
</style>
