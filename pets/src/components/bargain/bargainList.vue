<template>
  <div class="bargainListWarp">
    <div class="bargainListHead">
        <div class="headCover">
          <div class="top_nav flex_r_s_b">
            <div class="back" @click="back"></div>
            <div class="nav_title">限时抢购</div>
            <div class="share" @click="showRuler">规则</div>
          </div>
        </div>
        <div class="slideTetx">
          <div class="slideBox">
            <cube-slide ref="slide" :data="bargainSuccessInfoVos" :autoPlay="true" :showDots="false" direction="vertical">
              <cube-slide-item v-for="(item, index) in bargainSuccessInfoVos" :key="index">
                <p>{{item.userName}}{{item.time}}拿到了{{item.commodityName}}</p>
              </cube-slide-item>
            </cube-slide>
          </div>

        </div>
     </div>
    <div class="bargainListCnt">
      <cube-scroll ref="vscroll">
      <ul>
        <li class="flex_r_s_b" v-for="item in bargainList" @click="xqLink(item)">
          <div class="imgBox" v-bind:style="{'background-image':'url('+item.commodityImage.split(',')[0]+')'}"></div>
          <div class="commodityInfo">
             <div class="commodityName">{{item.commodityName}}</div>
             <div class="commodityPrice">¥{{item.price}}</div>
             <div class="btnBox flex_r_s_b">
               <span>已送出{{item.sellNum}}份</span>
               <div class="receiveBtn flex_r_s_c">点击免费拿</div>
             </div>
          </div>
        </li>
      </ul>
      </cube-scroll>
    </div>
  </div>
</template>

<script>
  import Api from '../common/apj.js'
  import wxapi from '../common/wxapi.js'
  export default{
    data(){
      return{
        bargainList:[],
        bargainSuccessInfoVos:[],

      }
    },
    mounted() {
      this.getBargainList();
    },
    methods:{
      showRuler() {
         this.$router.push({
           name:'bargainRule'
         })
      },
      back(){
        this.$router.go(-1); //返回上一层
      },
      xqLink(item){
        this.$router.push({
          name:'bargainGoods',
          query:{
            commodityId:item.commodityId
          }
        })
      },
      getBargainList(){
        let self = this;
        self.axios.get(Api.userApi+'/bargain/selectBargain',{
          params: {
            userId:-1,
          }
        },{
        	headers: {
        		'Content-Type': 'application/x-www-form-urlencoded'
        	}
        }).then((res)=>{
          if(res.data.code==1){
            self.bargainList = res.data.data.bargainCommodityVos;
            self.bargainSuccessInfoVos = res.data.data.bargainSuccessInfoVos;
            self.commodityData = res.data.data;
            // console.log()
            let option = {
              title: '铲屎官的福利来啦！', // 分享标题, 请自行替换
              desc:'快来邀请你的好友上骨米宠物，一起帮你抢正品大牌宠物用品，包邮到家不用付费！',
              link: window.location.href, // 分享链接，根据自身项目决定是否需要split
              imgUrl:self.bargainList[0].commodityImage.split(',')[0], // 分享图标, 请自行替换，需要绝对路径
              success: () => {

              },
              error: () => {

              }
            }

            wxapi.wxRegister(option)
            setTimeout(() => {
              self.$refs.vscroll.forceUpdate();
              self.$refs.vscroll.refresh();
            }, 200)
            //console.log(self.bargainSuccessInfoVos)
          }
        })
      }
    }
  }
</script>

<style lang="scss">
  .bargainListWarp{
     height:100%;
     position:relative;
    .bargainListHead{
      height:460px;

      .headCover{
        height:360px;
        background:url('../../assets/icon_gu153.png') no-repeat center;
        background-size:cover;
        .top_nav {
          padding: 0 20px;
          height: 88px;
          box-sizing: border-box;
          z-index: 100;
          // background:#ff8260;
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
            font-weight: 400;
          }
          .share{
            color:#fff;
            font-size: 26px;
          }
        }
      }
      .slideTetx{
        padding:30px 30px 0 30px;
        .slideBox{
          font-size:20px;
          color:#666;
          height:40px;
          background:#f5f5f5;
          border-radius:24px;
          text-align:center;
          line-height:40px;
          p{
            padding:0 30px;
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
          }
        }
      }
    }
    .bargainListCnt{
      position:absolute;
      top:460px;
      bottom:0;
      left:0;
      right:0;
      ul{
        padding:0 30px;
        li{
          align-items:flex-start;
          padding:30px 0;
          border-bottom:1px solid #eee;
        }
      }
      .imgBox{

        width:220px;
        height:220px;
        border-radius:10px;
        background-color:#f5f5f5;
        background-size: cover;
        background-repeat: no-repeat;
        background-position: 50%;
        cursor: pointer;
      }
      .commodityInfo{
        width:400px;
        .commodityName{
          font-size:26px;
          color:#333;
          line-height:36px;
        }
        .commodityPrice{
          font-size:28px;
          color:#ff523d;
          padding-top:20px;
        }
        .btnBox{
          padding-top:40px;
          span{
            color:#FF8060;
            font-size:24px;
          }
          .receiveBtn{
            width: 160px;
            height: 50px;
            background: linear-gradient(90deg, #f9d28b, #ffaf60, #ff964b, #fe8071);
            border-radius: 6px;
            color: #fff;
            font-size: 24px;
          }
        }

      }
    }
  }
</style>
