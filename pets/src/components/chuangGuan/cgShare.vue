<template>
  <div class="cgShare">
    <div class="logoBox flex_r_s_b">
      <div class="box_l flex_r_f_s">

        <img src="../../assets/jd.png" alt="">
        <div class="mid">
          <h3>骨米宠物</h3>
          <p>骨米,养宠更有趣</p>
        </div>
      </div>
      <div class="download flex_r_s_c" @click="isAnOrIos">下载</div>
    </div>
    <div class="userBox flex_r_s_b">
      <div class="headImg">
        <img :src="headImg" alt="">
      </div>

      <p>我是{{userName}}，我在骨米宠物参加萌宠闯关大赛，答题得奖励，养宠真有趣。快来试一下，让你脑洞大开！。</p>
    </div>
    <div class="conductBox">
      <div class="imgBox flex_r_s_c">
        <img src="../../assets/mccg.png" alt="">
      </div>

    </div>
  </div>
</template>

<script>
  import Api from '../common/apj.js'
  export default{
    data(){
      return{
        headImg:'',
        userName:'',
        userId:''
      }
    },
    mounted() {
      this.userId = this.getUrlKey('userId');

      this.getUserInfo();
    },
    methods:{
      isAnOrIos() {
      	var u = navigator.userAgent,
      		app = navigator.appVersion;
      	var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
      	var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      	if (isAndroid) {
      		//这个是安卓操作系统
      		alert('这个是安卓操作系统')
      	}
      	if (isIOS) {
      		//这个是ios操作系统
      		alert('这个是ios操作系统')
      	}
      },
      getUserInfo(){
        let self = this;
        this.axios.get(Api.userApi+'/userCenter/selectUserCenterByUserId',{
          params:{
            beLookUserId:self.userId,
            lookUserId:-1,
          }

        }).then(function(res) {

              if(res.data.code==1){
                self.headImg = res.data.data.userHeadImage;
                self.userName = res.data.data.userName;

              }else{
                alert(res.data.msg)
              }
        	}).catch(function(err) {
              alert(err)

        	});
      },
      getUrlKey(name){
          return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[1].replace(/\+/g, '%20')) || null
      },
    }
  }
</script>

<style lang="scss">
  .cgShare{
    height:100%;
    background:#f5f5f5;
    padding:22px 22px 25px 22px;
    box-sizing:border-box;
    .logoBox{
      background:#fff;
      height:130px;
      padding:0 30px;
      box-sizing:border-box;
      border-radius:20px;
      .box_l{
        img{
          max-width:90px;
          max-height:90px;
          margin-right:20px;
        }
        h3{
          font-size:30px;
          color:#000000;
        }
        p{
          font-size:24px;
          color:#666666;
          padding-top:20px;
        }
      }
      .download{
        width:120px;
        height:50px;
        background:rgba(255,82,61,1);
        border-radius:25px;
        font-size:24px;
        color:#fff;
      }
    }
    .userBox{
      padding-top:30px;
      .headImg{
        width:90px;
        height:90px

      }
      img{
        border-radius:50%;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      p{
        width:550px;
        font-size:26px;
        color:#333333;
        line-height:48px;
      }
    }
    .conductBox{
      margin-top:30px;
      border-radius:20px;
      background:#fff;
      .imgBox{
        background-size:100%;
        height:870px;

        img{
          width:100%;
          height:100%;
          object-fit: cover;
        }
      }
      .moveInfo{
        height:120px;
        .item_t{
          font-size:36px;
          font-family:SimHei;
          color:#333333;
          text-align: center;
        }
        .item_b{
          font-size:24px;
          color:#333333;
          padding-top:20px;
          text-align: center;
        }
      }
    }
  }
</style>
