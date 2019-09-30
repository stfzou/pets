<template>
  <div class="gudouShop">
    <div class="headCnt flex_r_s_b">
      <img class="back" @click="link" src="../../assets/icon/back@2x.png" alt="">
      <div class="pageName">骨豆商场</div>
      <div class="searchBox flex_r_s_b" @click="link">
        <div class="gudouShopSearch"></div>
        <img src="../../assets/icon/icon-search@2x.png" alt="">
      </div>

      <div class="giftCenter" @click="link">礼品中心</div>

    </div>
      <header v-show="isShow" class="gudouHead">


      </header>
      <div class="gudouShopCnt">
        <div class="gudouInfoBox" v-show="isShow">
          <div class="gudouInfo">
            <div class="gudouInfoTop flex_r_s_b">
              <div class="gudouNum">您有<span>{{boneBean}}</span>粒骨豆可使用></div>
              <div class="getGudou flex_r_s_c">如何获得骨豆？</div>
            </div>
            <div class="choujiang flex_r_s_b">
              <div class="cj-item flex_r_s_b">
                <div>
                  <div class="cj-name">骨豆抽奖</div>
                  <div class="cj-js">最高得价值99元礼品</div>
                </div>
                <img src="../../assets/icon_zhuanpan.png" alt="">
              </div>
              <div class="cj-item flex_r_s_b">
                <div>
                  <div class="cj-name">欢乐砸金蛋</div>
                  <div class="cj-js">最高得200粒骨豆</div>
                </div>
                <img src="../../assets/jindan.png" alt="">
              </div>
            </div>
          </div>

        </div>
        <div class="hotExchangeBox" v-show="isShow">
          <div class="hotExchange exBox">
             <div class="exTitle">热门兑换</div>
             <cube-scroll
               ref="scroll"
               :data="hots"
               :options="hOption"
               direction="horizontal"
               class="horizontal-scroll-list-wrap">
               <ul class="flex_r_f_s">
                 <li v-for="item in hots">
                   <div class="imgBox">
                     <img class="goodsPic" :src="item.compressImage" alt="">
                     <img class="tipPic" src="../../assets/hot_tip.png" alt="">
                   </div>
                   <div class="desc">{{item.name|descFilter}}</div>
                   <div class="gudouPrice flex_r_s_c">
                     骨豆价¥{{item.boneBeanPrice}}
                   </div>
                 </li>
               </ul>

             </cube-scroll>

          </div>
        </div>
        <div class="hotExchangeBox" v-show="isShow">
          <div class="exBox">
             <div class="exTitle">精选推荐</div>

             <cube-scroll
               ref="scroll"
               :data="testArr"
               :options="hOption"
               direction="horizontal"
               class="horizontal-scroll-list-wrap">
               <ul class="flex_r_f_s">
                 <li v-for="item in selections">
                   <div class="imgBox">
                     <img class="goodsPic" :src="item.compressImage" alt="">
                     <img class="tipPic" src="../../assets/jx_tip.png" alt="">
                   </div>
                   <div class="desc">{{item.name|descFilter}}</div>
                   <div class="gudouPrice flex_r_s_c">
                     骨豆价¥{{item.boneBeanPrice}}
                   </div>
                 </li>
               </ul>

             </cube-scroll>
          </div>
        </div>
        <div class="goodsNav" :class="{activeNav:isNavCalss}">
          <div class="navBox">
            <cube-scroll
              ref="scroll"
              :data="navArr"
              direction="horizontal"
              class="horizontal-scroll-list-wrap">
              <div class="textBox">
                <span @click="navClick(index)" :class="{activeSpan:index==spanIndex}" v-for="(item,index) in navArr">{{item}}</span>
              </div>
              </cube-scroll>
          </div>




        </div>
        <div class="goodsNavList" v-show="isShow">
          <ul class="flex_r_s_b">
            <li v-for="item in alls">
              <div class="goodsImgBox">
                <img class="goodsPic" :src="item.compressImage" alt="">
                <img class="sxdTip" v-if="deduction>item.boneBeanPrice"  src="../../assets/sxd_tip.png" alt="">
              </div>
              <div class="listBottom">
                <div class="goodsName">{{item.name|typeNameFilter}}</div>
                <div class="exChangePeople">已有{{item.sumSellNum}}人兑换</div>
                <div class="deduction">骨豆直抵¥<span v-if="deduction>item.boneBeanPrice">{{item.boneBeanPrice}}</span><span v-else>{{deduction}}</span></div>
                <div class="gudouPriceBox flex_r_f_s">
                  <div class="gudouPrice flex_r_s_c">骨豆价¥{{item.boneBeanPrice}}</div>
                  <div class="oldPrice">¥{{item.price}}</div>
                </div>
              </div>

            </li>
          </ul>
        </div>
        <div class="goodsNavList activeList" v-show="!isShow">
          <cube-scroll ref="listScroll" :options="listOpt">
            <ul class="flex_r_s_b">
              <li v-for="item in alls">
                <div class="goodsImgBox">
                  <img class="goodsPic" :src="item.compressImage" alt="">
                  <img class="sxdTip" v-if="deduction>item.boneBeanPrice" src="../../assets/sxd_tip.png" alt="">
                </div>
                <div class="listBottom">
                  <div class="goodsName">{{item.name|typeNameFilter}}</div>
                  <div class="exChangePeople">已有{{item.sumSellNum}}人兑换</div>
                  <div class="deduction">骨豆直抵¥<span v-if="deduction>item.boneBeanPrice">{{item.boneBeanPrice}}</span><span v-else>{{deduction}}</span></div>
                  <div class="gudouPriceBox flex_r_f_s">
                    <div class="gudouPrice flex_r_s_c">骨豆价¥{{item.boneBeanPrice}}</div>
                    <div class="oldPrice">¥{{item.price}}</div>
                  </div>
                </div>

              </li>
            </ul>
          </cube-scroll>
        </div>
      </div>
  </div>
</template>

<script>
  import Api from '../common/apj.js'
  export default{
    data(){
      return{
        scroll:'',
        deduction:'',
        searchVal:'',
        spanIndex:0,
        boneBean:'',//骨豆
        hots:[],//热门
        selections:[],//精选
        alls:[],//全部
        goodstType:[],//分类
        isShow:true,
        isNavCalss:false,
        testArr:[1,2,3,4,5],
        navArr:['全部','宠物主粮','宠物零食','营养保健','生活日用','测试','测试2'],
        hOption:{
          preventDefault:false
        },
        listOpt:{
          preventDefault:true,
          pullDownRefresh: {
          	txt: '更新成功',
          	threshold: 40
          },
          pullUpLoad: {
          	txt: {
          		more: '加载更多',
          		noMore: '没有更多数据了',
          	},
          	threshold: 20,

          }
        }
      }
    },
    filters:{
      descFilter(val){
        if(val.length>15){
          return val.substr(0,15)+'...'
        }else{
          return val
        }
      },
      typeNameFilter(val){
        if(val.length>25){
          return val.substr(0,25)+'...'
        }else{
          return val
        }
      }
    },
    mounted() {
      window.addEventListener('scroll', this.menu)
      this.getListData();
    },
    destroyed () {
     window.removeEventListener('scroll', this.menu)
    },
    methods:{
      navClick(index){
       this.spanIndex = index;
        console.log(1)
      },
      link(){
       // this.$router.push({
       //   name:'presentSearch'
       // })
       this.isShow = true;
       this.isNavCalss = false;
       this.$refs.scroll.refresh();
      },
      menu() {
        let domH = document.querySelector('.goodsNav').offsetTop;
        let navH = document.querySelector('.goodsNav').offsetHeight;
        let listH = document.querySelector('.goodsNavList').offsetTop;
        this.scroll = document.documentElement.scrollTop || document.body.scrollTop;
        if(this.scroll>navH+listH-200){
          this.isNavCalss = true;
          this.isShow = false;
          setTimeout(()=>{
            this.$refs.listScroll.refresh();
          },200)

        }

        //console.log('scroll   '+this.scroll)
      },
      show(){
        this.isShow = true;
        this.isNavCalss = false;
      },
      getListData(){
        let self = this;
        this.axios.get(Api.userApi+'/boneBeanShop/selectBoneBeanShopHomePage',{
          params:{
            userId:38
          }

        }).then(function(res) {

              if(res.data.code==1){
                self.boneBean = res.data.data.boneBean;
                self.deduction = res.data.data.boneBean/100;
                console.log(self.deduction)
                self.hots = res.data.data.hots;
                self.alls = res.data.data.alls;
                self.selections = res.data.data.selections;
                setTimeout(() => {
                  self.$refs.scroll.forceUpdate();
                	self.dataList = res.data.data;
                	setTimeout(() => {
                		self.$refs.scroll.refresh();
                	}, 200)
                }, 500)

              }else{

              }
        	}).catch(function(err) {
              alert(err)

        	});
      }

    }
  }

</script>

<style lang="scss">
  .gudouShop{

    .headCnt{
      padding:0 20px;
      height:98px;
      box-sizing: border-box;
      background: linear-gradient(90deg, #fb9f84, #f97d5c, #fd7046, #ff6c6c);
      position:fixed;
      left:0;
      top:0;
      z-index:1000;
      .back{
        width:26px;
      }
      .pageName{
        font-size:30px;
        color:#fff;
      }
      .searchBox{
        width:340px;
        height:60px;
        border-radius:30px;
        box-sizing:border-box;
        background:#fff;
        padding:0 20px;
        .gudouShopSearch{
          font-size:26px;
          width:245px;
        }
        img{
          width:34px;

        }
      }
      .giftCenter{
        font-size:26px;
        color:#fff;
      }
    }
    .gudouHead{
      height:246px;
      background: linear-gradient(90deg, #fb9f84, #f97d5c, #fd7046, #ff6c6c);

    }
    .gudouShopCnt{
      background:#f3f3f3;
      .gudouInfoBox{
         height:160px;
         position:relative;
         .cube-scroll-content{
           display: inline-block;
         }
        .gudouInfo{
          width:680px;
          padding:24px 0 60px 0;
          background:rgba(255,255,255,1);
          box-shadow:0px 0px 20px 0px rgba(0, 0, 0, 0.1);
          border-radius:10px;
          box-sizing:border-box;
          position: absolute;
          top:-135px;
          left:50%;
          margin-left:-340px;
          .gudouInfoTop{
            padding-left:22px;
            box-sizing:border-box;
            .gudouNum{
              font-size:24px;
              color:#000;
              span{
                font-size:36px;
                color:#ff523d;
              }
            }
            .getGudou{
              width:200px;
              height:36px;
              background:rgba(51,51,51,1);
              border-top-left-radius: 18px;
              border-bottom-left-radius: 18px;
              color:#fff;
              font-size:22px;
            }
          }
          .choujiang{
            padding:54px 20px 0 20px;
            box-sizing:border-box;
            .cj-item{
              width:310px;
              img{
                width:118px;
              }
              .cj-name{
                font-size:30px;
                font-family:Microsoft YaHei;
                font-weight:bold;
                color:#000;

              }
              .cj-js{
                font-size:22px;
                font-family:Microsoft YaHei;
                font-weight:400;
                margin-top:22px;
                color:#666;
              }
            }
          }
        }

      }
      .hotExchangeBox{
        padding:28px 20px 0 20px;
        .cube-scroll-content{
          display: inline-block;
        }
        .exBox{
          padding-left:20px;
          background:#fff;
          .exTitle{
            font-size:30px;
            color:#000;
            font-weight:400;
            height:88px;
            line-height:88px;
          }
          ul{
            li{
              width:220px;
              margin-right:30px;
              .imgBox{
                position:relative;
                width:220px;
                height:220px;
                border-radius:10px;
                .goodsPic{
                  width:220px;
                  height:220px;
                  object-fit: cover;
                }
                .tipPic{
                  position: absolute;
                  top:-6px;
                  left:-6px;
                  width:82px;
                }
              }
              .desc{
                font-size:26px;
                color:#333;
                line-height:46px;
                padding-top:9px;
                font-weight:400;
              }
              .gudouPrice{
                width:180px;
                height:40px;
                background:rgba(255,82,61,1);
                border-radius:20px;
                color:#fff;
                font-size:24px;
                margin-top:18px;
                margin-bottom:26px;
              }
            }
          }
        }
        .hotExchange{
          background:#fff url("../../assets/hotec_bg.png") no-repeat 100% 0;
          background-size:660px;
        }
      }
      .goodsNav{
        width:100%;
        height:80px;
        z-index:1000;
        background:#f3f3f3;
        .navBox{
          height:80px;
          padding:0 20px;
          box-sizing:border-box;
        }
        .cube-scroll-content{
          display: inline-block;
        }
        span{
          margin-right:50px;
          color:#000;
          font-size:26px;
        }
        .activeSpan{
          color:#ff523d;
        }
        .textBox{
          white-space: nowrap;
          height:80px;
          line-height:80px;
        }
      }
      .activeNav{
        position: fixed;
        left:0;
        top:98px;
      }
      .goodsNavList{
        background:#f3f3f3;
        padding: 0 20px;
        box-sizing:border-box;

        ul{
          flex-wrap: wrap;

          li{
            width:330px;
            background:#fff;
            margin-bottom:28px;
            border-radius:10px;
            box-shadow:0px 0px 20px 0px rgba(0, 0, 0, 0.1);
            .listBottom{
              padding:15px 12px 20px 12px;
            }
            .goodsImgBox{
              width:330px;
              height:330px;
              position:relative;
              .goodsPic{
                width:100%;
                height:100%;
                border-radius:10px;
                object-fit: cover;
              }
              .sxdTip{
                width:76px;
                position:absolute;
                left:14px;
                top:0;
              }
            }
            .goodsName{
              line-height:45px;
              font-size:26px;
              color:#333;
            }
            .exChangePeople{
              padding-top:12px;
              font-size:22px;
              color:#666666;
            }
            .deduction{
              font-size:24px;
              color:#ff523d;
              padding-top:20px;
            }
            .gudouPriceBox{
              padding-top:20px;
              .gudouPrice{
                width:180px;
                height:40px;
                background:rgba(255,82,61,1);
                border-radius:20px;
                color:#fff;
                font-size:24px;
                margin-right:20px;

              }
              .oldPrice{
                text-decoration:line-through;
                color:#999999;
                font-size:24px;
              }
            }
          }
        }
      }
      .activeList{
        position:fixed;
        left:0;
        top:178px;
        right:0;
        bottom:0;
        ul{
          // padding-top:80px;
        }
      }
    }

  }

</style>
