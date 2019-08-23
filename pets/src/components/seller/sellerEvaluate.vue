<template>
  <div class="seller_eval">
    <div class="eval_nav flex_r_s_b" v-if="evalList.length>0">
      <a @click="select(item,index)" :class="{'active':curunt == index}" :key="index" v-for="(item,index) in evalNav">
        <span class="span1">{{item.text}}</span>
        <span class="span2">{{item.num}}</span>
      </a>
    </div>
    <div class="line" v-if="evalList.length>0"></div>
    <div class="eval_content" v-if="evalList.length>0">
      <cube-scroll ref="scroll" @pulling-up="onPullingUp" @pulling-down="onPullingDown" :options="options">
        <!-- <transition name="fade">
					<router-view></router-view>
				</transition> -->
        <ul class="eval_list">
          <li class="flex_r_s_b list_item" v-for="(item,index) in evalList" :key="index">
            <div class="head_icon">
              <img :src="item.userHeadImgAddr" alt="">
            </div>
            <div class="right">
              <div class="r_top flex_r_s_b">
                <div class="r_top_l">
                  <div class="user_name">{{item.userName}}</div>
                  <div class="text">{{item.assessContent}}</div>
                </div>
                <div class="star">
                  <cube-rate v-model="item.fraction" :disabled="disabled">

                  </cube-rate>

                </div>
              </div>
              <div class="eval_pic flex_r_s_b" v-if="item.images">
                <img :src="im.imgAddr" alt="" v-for="(im,i) in item.images" :key="i">

              </div>
              <div class="data">{{item.createTime}}</div>
            </div>
          </li>

        </ul>
      </cube-scroll>
    </div>
    <div class="eval_content flex_r_s_c cntTx" v-else>暂无评论</div>
  </div>
</template>

<script>
  import Api from '../common/apj.js'
  export default {
    data() {
      return {
        evalNav: [{

            text: '全部',
            num: 453,
            isImg: '-1',
            isPraise: '-1'
          },
          {

            text: '有图',
            num: 26,
            isImg: '1',
            isPraise: '-1'
          },
          {

            text: '好评',
            num: 365,
            isImg: '-1',
            isPraise: '5'
          },
          {

            text: '中评',
            num: 35,
            isImg: '-1',
            isPraise: '3'
          },
          {

            text: '差评',
            num: 4,
            isImg: '-1',
            isPraise: '1'
          }

        ],
        curunt: 0,
        page: 0,
        evalList: [],
        star: 3.5,
        disabled: true,
        options: {
          pullDownRefresh: {
            txt: '更新成功',
            threshold: 60
          },
          pullUpLoad: {
            txt: {
              more: '加载更多',
              noMore: '没有更多数据了',
            },
            threshold: 30,

          }
        },
        isImgCode: '-1',
        isPraiseCode: '-1'
      };
    },

    mounted() {
      let h = document.documentElement.clientHeight - document.querySelector(".eval_content").offsetTop;
      document.querySelector(".eval_content").style.height = h + 'px';
      this.getEval(-1, -1);

      // 			setTimeout(() => {
      //
      // 			  this.$refs.scroll.refresh();
      //
      // 			}, 1000)
    },
    methods: {
      select(item, index) {
        this.evalList = [];
        this.$refs.scroll.scrollTo(0, 0)
        this.curunt = index;
        this.isImgCode = item.isImg;
        this.isPraiseCode = item.isPraise;
        this.page = 0;
        this.getEval(item.isImg, item.isPraise);
        // this.$refs.scroll.refresh();
      },
      getEval(isImg, isPraise) {
        let self = this;
        self.axios.post(Api.shopApi + '/webShop/selectShopAssessPage', self.qs.stringify({
          shopId: JSON.parse(localStorage.getItem('user')).shopId,
          isImg: isImg,
          isPraise: isPraise,
          pageNo: 0,
          pageSize: 5
        }), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then((res) => {
          if (res.data.code == 1) {


            setTimeout(() => {
              self.evalList = res.data.data;
              self.$refs.scroll.forceUpdate();
              setTimeout(() => {
                self.$refs.scroll.refresh();

              }, 100)
            }, 500)

          }
        })
      },
      onPullingDown() {
        // 模拟更新数据
        this.page = 0;
        this.getEval(this.isImgCode, this.isPraiseCode);
      },
      onPullingUp() {
        // 模拟更新数据
        let self = this;
        this.page++;
        self.axios.post(Api.shopApi + '/webShop/selectShopAssessPage', self.qs.stringify({
          shopId: JSON.parse(localStorage.getItem('user')).shopId,
          isImg: self.isImgCode,
          isPraise: self.isPraiseCode,
          pageNo: self.page,
          pageSize: 5
        }), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then((res) => {
          if (res.data.code == 1) {
            console.log(res)

            if (res.data.data.length > 0) {
              setTimeout(() => {
                self.evalList.push(...res.data.data)
                self.$refs.scroll.forceUpdate();
                setTimeout(() => {
                  self.$refs.scroll.refresh();
                }, 100)
              }, 500)
            }

            setTimeout(() => {
              self.$refs.scroll.refresh();
            }, 500)
          } else {
            alert(res.data.msg)
            self.$refs.scroll.forceUpdate()
          }
        })

      },
    }

  }
</script>

<style lang="scss">
  .seller_eval {
    .eval_nav {
      margin-bottom: 1px;
      padding: 30px 20px 0 20px;
      box-sizing: border-box;
      flex-wrap: wrap;
      background: #fff;

      a {
        width: 149px;
        height: 38px;
        border: 1px solid #999;
        /*no*/
        border-radius: 26px;
        text-align: center;
        line-height: 38px;
        margin-bottom: 32px;
      }

      a.active {
        color: #FF523D;
        border: 1px solid #FF523D;
        /*no*/
      }
    }

    .line {
      height: 10px;
      background: #e8e8e8;
    }

    .eval_content {
      position: absolute;
      width: 100%;

      .eval_list {
        height: auto;

        .list_item {
          padding: 30px 20px;
          box-sizing: border-box;

          align-items: flex-start;
          border-bottom: 1px solid #e8e8e8;

          /*no*/
          .head_icon {
            height: 90px;
            width: 90px;
            border-radius: 50%;
            background: #FFDFDF;

            img {
              height: 90px;
              width: 90px;
              border-radius: 50%;
            }
          }

          .right {
            width: 82%;

            .r_top {
              align-items: flex-start;

              .r_top_l {
                .user_name {
                  font-size: 24px;
                  color: #333;
                }

                .text {
                  font-size: 26px;
                  color: #000;
                  margin-top: 26px;
                }

              }

              .cube-rate-item {
                height: 24px;
                width: 25px;

              }
            }

            .data {
              font-size: 20px;
              color: #999;
              margin-top: 40px;
            }

            .eval_pic {

              flex-wrap: wrap;

              img {
                width: 120px;
                height: 120px;
                margin-top: 30px;
              }

            }
          }
        }
      }
    }

    .cntTx {
      font-size: 28px;
      color: #000;
    }
  }
</style>
