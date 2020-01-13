<template>
  <div class="indexWarp">
    <div class="inexHeader flex_r_s_b">
      <div class="logo">
        <router-link :to="{name:'index'}"><img src="../assets/logo.png" alt=""></router-link>
      </div>
      <ul class="navList">
        <li v-for="(item,index) in navData">
          <li v-for="(item,index) in navData">
            <router-link :to="{name:item.link}">
              <span class="navSpan">{{item.text}}</span>
            </router-link>
          </li>
        </li>
      </ul>
    </div>
    <div class="indexCnt">
        <div class="phoneBox">
          <div class="phoneBg">

          </div>
          <div class="indexSlide">
            <el-carousel height="564px">
                <el-carousel-item indicator-position="none" ref="carousel">
                  <img src="../assets/indexSlide_01.png" alt="">
                </el-carousel-item>
                <el-carousel-item indicator-position="none" ref="carousel">
                  <img src="../assets/indexSlide_02.png" alt="">
                </el-carousel-item>
                <el-carousel-item indicator-position="none" ref="carousel">
                  <img src="../assets/indexSlide_03.png" alt="">
                </el-carousel-item>
            </el-carousel>
          </div>
        </div>
        <div class="propagandaBox">
          <div class="propaganda">
            养宠上骨米 <br>
            生活更有趣
          </div>
          <div class="erweimaBox flex_r_f_s">
            <div class="ios ewmItem">
              <div class="divTop flex_r_f_s">
                <img src="../assets/iOS.png" alt="">
                <span>IOS版</span>
              </div>
              <div class="ewm">
                <img src="../assets/ewm_IOS.png" alt="">
              </div>
            </div>
            <div class="android ewmItem">
              <div class="divTop flex_r_f_s">
                <img src="../assets/Android.png" alt="">
                <span>安卓版</span>
              </div>
             <div class="ewm">
                <img src="../assets/ewm_And.png" alt="">
              </div>
            </div>

          </div>
        </div>
    </div>
    <div class="indexFooter">
      <div class="agreement flex_r_f_e">
        <router-link :to="{name:'agreement',query:{agreementId:2}}">注册协议</router-link>
        <router-link :to="{name:'agreement',query:{agreementId:1}}">隐私协议</router-link>
        <router-link :to="{name:'agreement',query:{agreementId:3}}">侵权投诉指引</router-link>
        <router-link :to="{name:'agreement',query:{agreementId:16}}">未成年保护协议</router-link>
        <router-link :to="{name:'agreement',query:{agreementId:17}}">自审制度</router-link>
      </div>
      <div class="addrBox">
        <span>地址:四川省成都市锦江区一环路东五段108号东恒国际2栋2单元11层1104号</span><span style="margin: 0 20px;">电话:028-62498867  13608212022</span><span>邮箱:info@gumipet.com</span>
      </div>
      <div class="KeepRecord">
        <p>成都爱之宠宠物用品有限公司版权所有 Copyright2018-2019 <a href="http://www.beian.miit.gov.cn/">蜀ICP备16029284号-2</a></p>
      </div>
    </div>
  </div>
</template>

<script>
  export default{
    data(){
      return{
        navData:[{text:'首页',link:'index'},{text:'汪圈精选',link:'wqSelect'},{text:'限时特惠',link:'couponList'},{text:'招商合作',link:'cooper'},{text:'圈子活动',link:'activity'},{text:'关于我们',link:'about'}],

      }
    }
  }
</script>

<style lang="scss" scoped="scoped">

  .indexWarp{
    // overflow: scroll;
    padding-top:106px;
    box-sizing:border-box;
    height:100%;
    box-sizing:border-box;
    background:url('../assets/indexBg.png') no-repeat;
    background-size:cover;
    .inexHeader{
      position: absolute;
      top:0;
      left:0;
      padding:0 90px;
      box-sizing:border-box;
      height:106px;
      z-index:1000;
      .navList{
        width: 1014px;
        flex-direction: row;
        justify-content: flex-end;
        align-items: center;
        display: flex;
        a{
          font-size:16px;
          color:#000;
          margin-left:58px;
          span{
            display:inline-block;
            line-height:40px;
          }
        }
        .router-link-active{
          .navSpan{
            border-bottom:3px solid #ff523d;
          }
        }
      }
    }
    .indexFooter{
      position: absolute;
      bottom:0;
      left:0;
      height:180px;
      padding:50px 90px;
      box-sizing:border-box;
      width:100%;
      .agreement{
        width:1080px;
        margin:0 auto;
        a{
          color:#000;
          font-size:16px;
        }
      }
      .addrBox{
        color:#999;
        padding-top:20px;
      }
      .KeepRecord{
        color:#999;
        padding-top:20px;
      }
    }

    .indexCnt{

      top: 50%;
      left: 50%;
      transform: translate(-60%,-60%);
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      position: absolute;
      .phoneBox{
        width: 300px;
        height: 600px;
        position: relative;
        .phoneBg{
          width: 300px;
          height: 600px;
          background: url('../assets/phoneBg.png') no-repeat;
          background-size: contain;
          position: absolute;
          z-index:100;
        }
        .indexSlide{
          position: absolute;
          width: 260px;
          height: 564px;
          margin: 18px 20px;
        }
      }

      .propagandaBox{
        .propaganda{
          font-size:40px;
          line-height:56px;

        }
        .erweimaBox{
          padding-top:30px;
          margin-left:50px;
          align-items:flex-start;
          .ios{
            margin-right:20px;
          }
          .ewmItem{
            position: relative;
            border-radius: 20px;
            padding:10px;
            background:#fff;
            .divTop{
              width: 150px;
              background:#fff;
              justify-content: center;
              align-items: center;
              img{
                width:30px;
                margin-right:5px;
              }
            }
            .ewm{
              background:#fff;
              margin-top:10px;
              img{
                width:134px;
                height:134px;
              }
            }

          }
        }
      }
    }

    @media screen and (min-height: 900px){
      .phoneBox {
          zoom: 1;
      }
    }

    @media screen and (max-height: 720px){
      .phoneBox {
          zoom: 0.6;
      }
    }


  }
</style>
