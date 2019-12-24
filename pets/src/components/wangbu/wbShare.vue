<template>
  <div class="wbShare">
    <div class="logoBox flex_r_s_b">
      <div class="box_l flex_r_f_s">

        <img src="../../assets/wbLogo.png" alt="">
        <div class="mid">
          <h3>骨米旺步</h3>
          <p>一款遛狗就能得奖励的健身软件</p>
        </div>
      </div>
      <div class="download flex_r_s_c" @click="isAnOrIos">下载</div>
    </div>
    <div class="userBox flex_r_s_b">
      <div class="headImg">
        <img :src="headImg" alt="">
      </div>

      <p>我是{{userName}}，我已经使用旺步{{h}}小时了，里程{{km}}公里，遛宠健身两不误，非常好用。</p>
    </div>
    <div class="conductBox">
      <div class="imgBox flex_r_s_c">
        <img src="../../assets/wbxc.png" alt="">
      </div>
      <div class="moveInfo flex_r_f_e">
        <div class="item">
          <div class="item_t">{{h}}h</div>
          <div class="item_b">累计</div>
        </div>
        <div class="item">
          <div class="item_t">{{km}}km</div>
          <div class="item_b">总里程</div>
        </div>
        <div class="item">
          <div class="item_t">{{total}}次</div>
          <div class="item_b">总计</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Api from '../common/apj.js'
  export default{
    data(){
      return{
        h:'',
        km:'',
        total:'',
        headImg:'',
        userName:'',
        userId:'',
        environment:'',
        appUrl:''
      }
    },
    mounted() {
      this.getAppUrl();
      this.getEnvironment();
      this.userId = this.getUrlKey('userId');
      this.h = this.getUrlKey('h');
      this.km = this.getUrlKey('km');
      this.total = this.getUrlKey('total');
      this.getUserInfo();
    },
    methods:{
      getEnvironment() { //判断当前浏览器环境
        var ua = window.navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == 'micromessenger') {
          this.environment = '-1';

        } else {
          this.environment = '1';
        }
      },
      isAnOrIos() {
      	var u = navigator.userAgent,
      	app = navigator.appVersion;
      	var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
      	var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      	if (isAndroid) {
      		//这个是安卓操作系统
      	  //alert(1)
      	  if(this.environment=='-1'){
      	    this.$router.push({name:'wxWhitePage'})
      	  }else{

      	    window.location.href = this.appUrl;
      	  }
      		//alert('这个是安卓操作系统')
      	}
      	if (isIOS) {
      		//这个是ios操作系统
      		window.location.href = 'https://itunes.apple.com/cn/app/id1437699756'
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
      getAppUrl(){
        let self = this;
        self.axios.post(Api.userApi+'/version/selectNewestVersionInfo',{
        	headers: {
        		'Content-Type': 'application/x-www-form-urlencoded'
        	}
        }).then((res)=>{
          if(res.data.code==1){
            self.appUrl = res.data.data.address;

          }else{
            alert(res.data.msg)
          }
        })
      },
    }
  }
</script>

<style lang="scss">
  .wbShare{
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
        background:#fff url("../../assets/wb_bg.png") no-repeat 0 100%;
        background-size:100%;
        height:700px;
        border-top-left-radius: 20px;
        border-top-right-radius: 20px;
        img{
          width:105px;
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
