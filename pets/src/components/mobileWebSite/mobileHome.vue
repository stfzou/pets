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
           <div class="downBtn flex_r_s_c">APP下载</div>
         </div>
        <div class="mobileNav flex_r_s_b">
          <a href="javascript:;"  @click="navClick(item,index)" :class="{active:navIndex==index}"  v-for="(item,index) in navData">{{item.title}}</a>
        </div>
      </div>

      <div class="mobileCnt">
        <router-view></router-view>
      </div>
      <div class="mobileFoot">
        <div class="footNav flex_r_s_b">
          <a href="javascript:;"  v-for="item in footNavData">{{item.title}}</a>
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
      return{
        navData:[{title:'汪圈精选',name:'mobileIndex'},{title:'附近优惠',name:'mobileCoupon'},{title:'推荐商户',name:''},{title:'宠物活动',name:''}],
        footNavData:[{title:'关于我们',name:''},{title:'注册协议',name:''},{title:'隐私协议',name:''},{title:'侵权投诉协议',name:''}],
        navIndex:0
      }
    },
    methods:{
      navClick(item,index){
        this.navIndex = index;
        this.$router.push({
          name:item.name
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
