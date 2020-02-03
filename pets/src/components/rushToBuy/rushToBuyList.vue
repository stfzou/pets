<template>
  <div class="rushToBuyListWarp">
    <div class="top_nav flex_r_s_b">
      <div class="back" @click="back"></div>
      <div class="nav_title">限时抢购</div>
      <div class="share" @click="share"></div>
    </div>
    <div class="rushToBuyListCnt">

      <cube-scroll ref="vscroll">
        <div class="rushToBuyListHead">

          <div class="timeNav">
            <cube-scroll ref="scroll" :data="items" direction="horizontal" :options="hscrollOptions" class="horizontal-scroll-list-wrap">
              <ul class="timeList flex_r_f_s">
                <li v-for="(item,index) in navData" class="list-item" :class="{active_item:index==navIndex}" @click="navClick(item,index)">
                  <div class="day">{{item.dataObj.day}}</div>
                  <div class="hours">{{item.dataObj.time}}</div>
                </li>
              </ul>
            </cube-scroll>
          </div>
          <div class="countDownBox flex_r_s_b">
            <div class="countDown_l">每天10点 超值好货等你来抢</div>
            <div v-if="isStart===1" class="countDown_r flex_r_s_b">
              <span class="spanText">距结束</span>
              <div class="countDownTime">
                <span class="spanTime">{{hou}}</span>
                <span class="spanDian">:</span>
                <span class="spanTime">{{min}}</span>
                <span class="spanDian">:</span>
                <span class="spanTime">{{sec}}</span>
              </div>
            </div>
            <div v-else class="time">10:00准时开始</div>
          </div>
        </div>
        <ul class="commodityList">
          <li class="flex_r_s_b" v-for="item in commodityData" @click="xqLink(item)">
            <div class="imgBox">
              <img class="tipPic" src="../../assets/xsqg_01.png" alt="">
              <img class="commodityPic" :src="item.commodityImage" alt="">
            </div>
            <div class="commodityInfo">
              <div class="commodityName">{{item.commodityName}}</div>
              <div class="buyBox flex_r_s_b">
                <div class="newPrice">¥{{item.activityPrice}}</div>
                <div v-if="isStart===1" class="buyBtn flex_r_s_c">立即抢购</div>
                <div v-else class="notBuyBtn flex_r_s_c">暂未开始</div>
              </div>
              <div class="sellout flex_r_s_b">
                <div class="oldPrice">¥{{item.originalPrice}}</div>
                <div class="progressBox flex_r_s_b">
                  <span>已售{{item.rate.toFixed(1)}}%</span>
                  <div class="progress">
                    <div :style="{width:item.rate+'%'}"></div>
                  </div>
                </div>
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
  export default {
    data() {
      return {
        items: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
        hscrollOptions: {
          eventPassthrough: 'vertical'
        },
        isStart: 0,
        navIndex: 0,
        commodityData: [],
        navData: [],
        endTime: '',
        hou:'00',
        min:'00',
        sec:'00',
        countDownList:'',
        activityId:''
      }
    },
    mounted() {
      // console.log(this.getdate('2014-04-23 18:55:49'))
      this.getActivityTime();
    },
    methods: {
      back() {
        this.$router.go(-1); //返回上一层
      },
      timeFormat(param) {
        return param < 10 ? '0' + param : param;
      },
      share(){
      	let toast = this.$createToast({
      		txt: '点击顶部右上角进行分享',
      		type: 'warn'
      	  })
      	toast.show()
      },
      xqLink(item){
        let self = this;
        this.$router.push({
          name:'rushToBuyXq',
          query:{
            activityId:self.activityId,
            commodityId:item.commodityId
          }
        })
      },
      countDown(it) {
        var interval = setInterval(() => {
          // 获取当前时间，同时得到活动结束时间数组
          let newTime = new Date().getTime();
          // 对结束时间进行处理渲染到页面
          let endTime = new Date(this.endTime.replace(/-/g, "/")).getTime();

          let obj = null;
          // 如果活动未结束，对时间进行处理
          if (endTime - newTime > 0) {
            let time = (endTime - newTime) / 1000;
            // 获取天、时、分、秒
            let day = parseInt(time / (60 * 60 * 24));
            let hou = parseInt(time % (60 * 60 * 24) / 3600);
            let min = parseInt(time % (60 * 60 * 24) % 3600 / 60);
            let sec = parseInt(time % (60 * 60 * 24) % 3600 % 60);
            obj = {
              day: this.timeFormat(day),
              hou: this.timeFormat(hou),
              min: this.timeFormat(min),
              sec: this.timeFormat(sec)
            };
          } else { // 活动已结束，全部设置为'00'
            obj = {
              day: '00',
              hou: '00',
              min: '00',
              sec: '00'
            };
            clearInterval(interval);
          }
          // this.countDownList = obj.day + '天' + obj.hou + '时' + obj.min + '分' + obj.sec + '秒';
          if(obj.day>=1){
            this.hou = (obj.day*24)+obj.hou;
          }else{
            this.hou = obj.hou;
          }
          this.min = obj.min;
          this.sec = obj.sec
        }, 1000);
      },
      navClick(item, index) {
        this.navIndex = index;
        this.activityId = item.activityId;
        if(item.isStart===1){
           this.endTime = item.endTime;
           this.countDown();
        }
        this.isStart = item.isStart;
        this.getCommodity(item);
      },
      getCommodity(item) {
        let self = this;
        self.axios.get(Api.trendApi + '/flash/sale/selectFlashSaleCommodity', {
          params: {
            activityId: item.activityId,
            page: 1,
            rows: 20
          }
        }, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then(res => {
          if (res.data.code == 1) {
            res.data.data.forEach(e => {

              e.rate = parseInt(e.sellNum) / parseInt(e.totalNum) * 100
            })
            self.commodityData = res.data.data;


            setTimeout(() => {
              self.$refs.vscroll.forceUpdate();
              self.$refs.vscroll.refresh();
            }, 200)
          }
        })
      },
      getActivityTime() {
        let self = this;
        self.axios.get(Api.trendApi + '/flash/sale/selectFlashSaleInit', {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then(res => {
          if (res.data.code == 1) {
            res.data.data.activityVos.forEach(e => {
              e.dataObj = self.getdate(e.startTime)

            })

            self.navData = res.data.data.activityVos;
            //console.log(self.navData)
            self.activityId = res.data.data.activityVos[0].activityId;
            self.endTime = res.data.data.activityVos[0].endTime;

            res.data.data.commodityVos.forEach(e => {

              e.rate = parseInt(e.sellNum) / parseInt(e.totalNum) * 100
            })
            self.countDown();
            self.commodityData = res.data.data.commodityVos;
            let option = {
              title: '正品大牌宠物用品1折起抢！', // 分享标题, 请自行替换
              desc:'骨米宠物限时抢购活动，每天上午10点准时开抢，赶快来看看为你家宠物准备的心仪商品~~',
              link: window.location.href, // 分享链接，根据自身项目决定是否需要split
              imgUrl:self.commodityData[0].commodityImage, // 分享图标, 请自行替换，需要绝对路径
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
            self.isStart = 1;
            //console.log(self.navData)
          } else {
            alert(res.data.msg)
          }
        })
      },
      getdate(time) {
        let timeArr = []
        timeArr = time.split(' ')
        return {
          day:timeArr[0].split('-')[1]+'月'+timeArr[0].split('-')[2]+'日',
          time:'10:00'
        };
      }
    }
  }
</script>

<style lang="scss">
  .rushToBuyListWarp {
    height: 100%;
    position: relative;
    .top_nav {
      padding: 0 20px;
      height: 88px;
      box-sizing: border-box;
      z-index: 100;
      position:fixed;
      background:#ff8260;
      left:0;
      top:0;
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
      	width: 50px;
      	height: 40px;
      	background: url('../../assets/icon/share@2x.png') no-repeat center 0;
      	background-size: 100%;
      }
    }
    .rushToBuyListHead {
      height: 230px;
      background:#ff8260;
      position: relative;
      padding-top:80px;
      box-sizing:border-box;
      .countDownBox {
        width: 660px;
        height: 60px;
        box-shadow: 0px 0px 30px 0px rgba(255, 82, 61, 0.2);
        border-radius: 10px;
        background: #fff;
        padding: 0 20px;
        box-sizing: border-box;
        position: absolute;
        bottom: -30px;
        left: 50%;
        margin-left: -330px;
        z-index: 1000;

        .countDown_l {
          width: 320px;
          font-size: 22px;
          color: #FF8060;
        }

        .countDown_r {
          width: 240px;

          .spanText {
            font-size: 22px;
            color: #999;
          }

          .spanTime {
            width: 36px;
            display: inline-block;
            height: 30px;
            background: rgba(85, 85, 85, 1);
            border-radius: 10px;
            color: #fff;
            text-align: center;
            line-height: 30px;
          }

        }

        .time {
          font-size: 22px;
          color: #666;
        }
      }

      .horizontal-scroll-list-wrap {
        .cube-scroll-content {
          display: inline-block;
        }

        .timeList {
          padding: 0 30px;
          white-space: nowrap;
          height: 100px;
        }

        .list-item {
          display: inline-block;
          font-family: 'fanti';
          color: #F43D3D;
          margin-right: 40px;

          .day {
            font-size: 30px;
          }

          .hours {
            margin-top: 5px;
            font-size: 22px;
            text-align: center;
          }
        }

        .active_item {
          color: #fff;
        }
      }


    }

    .rushToBuyListCnt {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;

      .commodityList {
        background: #fff;
        padding: 50px 20px 0 20px;

        li {
          align-items: flex-start;
          padding: 30px 0;
          border-bottom: 1px solid #F5F5F5;
        }

        .imgBox {
          width: 220px;
          height: 220px;
          border-radius: 10px;
          position:relative;
          .tipPic{
            width:90px;
            position:absolute;
            top:0;
            left:0;
          }
          .commodityPic {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 10px;
          }
        }

        .commodityInfo {
          width: 400px;

          .commodityName {
            font-size: 26px;
            color: #333;
            line-height: 36px;
          }

          .buyBox {
            padding-top: 70px;

            .newPrice {
              font-size: 28px;
              color: #ff523d;
            }

            .buyBtn {
              width: 160px;
              height: 50px;
              background: linear-gradient(90deg, #f9d28b, #ffaf60, #ff964b, #fe8071);
              border-radius: 6px;
              color: #fff;
              font-size: 24px;
            }

            .notBuyBtn {
              width: 160px;
              height: 50px;
              background: #986AFF;
              border-radius: 6px;
              color: #fff;
              font-size: 24px;
            }
          }

          .sellout {
            padding-top: 20px;

            .oldPrice {
              text-decoration: line-through;
              font-size: 20px;
              color: #999;
              width: 80px;
            }

            .progressBox {
              width: 260px;
              span {
                font-size: 20px;
                color: #999;
                width:100px;
              }

              .progress {
                position: relative;
                width: 150px;
                height: 14px;
                background: #eee;
                border-radius: 10px;

                div {
                  width: 50%;
                  height: 100%;
                  background: #ff523d;
                  border-radius: 10px;
                }
              }
            }
          }
        }
      }
    }
  }
</style>
