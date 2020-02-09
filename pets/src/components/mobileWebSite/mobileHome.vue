<template>
  <div class="mobileHomeWarp">
      <div class="mobileTop">
        <div class="mobileHead flex_r_s_b">
           <div class="mobileLogo flex_r_f_s">
             <img src="../../assets/jd.png" alt="">
             <div class="propaganda">
               <h3>骨米宠物</h3>
               <p>养宠更有趣</p>
             </div>
           </div>
           <div class="downBtn flex_r_s_c" @click="appshowLink">APP下载</div>
         </div>
        <div class="mobileNav flex_r_s_b">
          <a href="javascript:;"  @click="navClick(item,index)" :class="{active:navIndex==index}"  v-for="(item,index) in navData">{{item.title}}</a>
        </div>
      </div>

      <div class="mobileCnt">
        <router-view></router-view>
      </div>
      <div class="amap-page-container" v-show="false">
        <el-amap ref="map" vid="amapDemo" :plugin="plugin" class="amap-demo"></el-amap>

      </div>
      <div class="mobileFoot">
        <div class="lookMore" @click="appshowLink">查看更多</div>
        <div class="footNav flex_r_s_b">
          <a href="javascript:;" @click="agreementLink(item.id)"  v-for="item in footNavData">{{item.title}}</a>
        </div>
        <div class="footInfo">
          <div class="addr">地址:四川省成都市锦江区一环路东五段东恒国际2栋2单元1104号</div>
          <div class="tell flex_r_s_b">
            <span>电话:028-62498867      13608212022</span>
            <span>邮箱:info@gumipet.com</span>
          </div>
          <div class="corporateName">成都爱之宠宠物用品有限公司版权所有</div>
          <div class="keepRecord">Copyright2018-2019 <a href="http://www.beian.miit.gov.cn/">蜀ICP备16029284号-2</a></div>
        </div>
      </div>
  </div>
</template>

<script>
  export default{
    data(){
      let self = this;
      return{
        navData:[{title:'汪圈精选',name:'mobileIndex'},{title:'附近优惠',name:'mobileCoupon'},{title:'推荐商户',name:'mobileShopCoupon'},{title:'宠物活动',name:'mobileActivity'}],
        footNavData:[{title:'关于我们',id:18},{title:'注册协议',id:2},{title:'隐私协议',id:1},{title:'侵权投诉协议',id:3}],
        navIndex:0,
        plugin: [

          {
            pName: 'Geolocation',
            enableHighAccuracy: true, //是否使用高精度定位，默认:true
            timeout: 10000, //超过10秒后停止定位，默认：无穷大
            maximumAge: 0, //定位结果缓存0毫秒，默认：0
            convert: true, //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
            showButton: true, //显示定位按钮，默认：true
            buttonPosition: 'RB', //定位按钮停靠位置，默认：'LB'，左下角
            showMarker: true, //定位成功后在定位到的位置显示点标记，默认：true
            showCircle: true, //定位成功后用圆圈表示定位精度范围，默认：true
            panToLocation: true, //定位成功后将定位到的位置作为地图中心点，默认：true
            zoomToAccuracy: true, //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：f
            extensions: 'all',
            events: {
              init(o) {
                // o 是高德地图定位插件实例
                o.getCurrentPosition((status, result) => {

                  if (result && result.position) {


                    let mapInfo = {
                      lng:result.position.lng,
                      lat:result.position.lat
                    }
                    self.$store.commit('setLocation',mapInfo);
                    // console.log(self.$store.state)
                  } else {
                    // self.getActivityListOne();
                    let toast = self.$createToast({
                      txt: '定位失败，请刷新页面重新定位',
                      type: 'warn'
                    })
                    toast.show()
                  }
                });
              }
            }
          }
        ]
      }
    },
    mounted() {
      if(sessionStorage.getItem('navIndex')!=null){
        this.navIndex = parseInt(sessionStorage.getItem('navIndex'))
      }
      
    },
    methods:{
      navClick(item,index){
        this.navIndex = index;
        this.$router.push({
          name:item.name
        })
        sessionStorage.setItem('navIndex',index);
      },
      agreementLink(id){
        this.$router.push({
          name:'agreement',
          query:{
            agreementId:id
          }
        })
      },
      appshowLink(){
        this.$router.push({
          name:'appShowBtn'
        })
      }
    }
  }
</script>

<style lang="scss" scoped="scoped">
  .mobileHomeWarp{
    padding-top:230px;
    padding-bottom:20px;
    .mobileTop{
      height:230px;
      width:100%;
      position:fixed;
      top:0;
      left:0;
      z-index:1000;
      background:#fff;
    }
    .mobileHead{
       padding:20px 30px;
       box-sizing:border-box;
       .mobileLogo{
         width:300px;
         img{
           width:90px;
           height:90px;
         }
         .propaganda{
           margin-left:24px;
           h3{
             font-size:30px;
             color:#000;
           }
           p{
             font-size:24px;
             color:#666;
             padding-top:20px;
           }
         }
       }
       .downBtn{
         width:150px;
         height:50px;
         background:rgba(255,255,255,1);
         border:1px solid rgba(231,118,68,1);
         border-radius:25px;
         color:#E77644;
         font-size:24px;
       }
     }
    .mobileNav{
      box-sizing:border-box;
      padding:0 40px;
      background:#F5F5F5;
      a{
        padding:30px 0;
        color:#333333;
        font-size:30px;
        display:inline-block;
      }
      .active{
        color:#ff523d;
        // border-bottom:1px solid #ff23d;
        border-bottom:4px solid #ff523d;/*no*/
      }
    }
    .mobileFoot{
      padding:30px 30px 0 30px;
      .lookMore{
        font-size:28px;
        color:#ff523d;
        text-align:center;
        padding-bottom:50px;
      }
      .footNav{
        border-radius:10px;
        background:#F5F5F5;
        font-size:24px;
        color:#333;
        padding:18px 26px;
        box-sizing:border-box;
      }
      .footInfo{
        line-height:30px;
        font-size:20px;
        color:#999999;
        padding-top:30px;
        a{
           color:#999999;
        }
        .addr{

        }
        .corporateName{
          text-align:center;
        }
        .keepRecord{
          text-align:center;
        }
      }
    }
  }
</style>
