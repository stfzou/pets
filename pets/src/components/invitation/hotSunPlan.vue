<template>
  <div class="hotSunWarp">

      <div class="top_nav flex_r_s_b">
        <div class="back" @click="back"></div>
       <!-- <div class="nav_title">骨米宠物奇葩说详情</div> -->
        <div class="share" @click="share"></div>
      </div>
      <div class="hotSunCnt">

          <img src="../../assets/plan_01.png" alt="">
          <img src="../../assets/plan_02.png" alt="">
          <img src="../../assets/plan_03.png" alt="">
          <img src="../../assets/plan_04.png" alt="">
      </div>
      
  </div>
</template>

<script>
  import wxapi from '../common/wxapi.js'
  import Api from '../common/apj.js'
  export default{
    data(){
      return{

      }
    },
    mounted() {
      let option = {
        title:'养宠物逛汪圈领取现金红包奖励!!', // 分享标题, 请自行替换
        desc:'养宠物上骨米！发现附近的养宠爱好者，晒养宠趣事领取现金红包奖励！',
        link: window.location.href, // 分享链接，根据自身项目决定是否需要split
        imgUrl:'https://gutouzu.oss-cn-shenzhen.aliyuncs.com/static/icon_share03.png', // 分享图标, 请自行替换，需要绝对路径
        success: () => {
          alert('分享成功')
        },
        error: () => {
          alert('已取消分享')
        }
      }
      wxapi.wxRegister(option)
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
    }
  }
</script>

<style lang="scss">
  .hotSunWarp{
    position:relative;
    .top_nav {
      	padding: 0 20px;
      	height: 88px;
      	box-sizing: border-box;
        position:absolute;
        top:0;
        left:0;
      	.back {
      		width: 26px;
      		height: 42px;
      		background: url(../../assets/icon/back@2x.png) no-repeat center 0;
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
      		background: url('../../assets/icon/share@2x.png') no-repeat center 0;
      		background-size: 100%;
      	}
    }
    .hotSunCnt{
      img{
        width:100%;
        display:block;
      }
    }
  }
</style>
