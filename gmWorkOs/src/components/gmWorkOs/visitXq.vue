<template>
  <div class="visitXq">
    <div class="login_nav">
      <div class="back" @click="back"></div>
      <div class="title">拜访详情</div>
    </div>
    <div class="customer_map">
      <el-amap ref="map" vid="amapDemo" :center="center" :zoom="15" class="amap-demo">

        <el-amap-marker :icon="require('../../assets/icon/map@2x.png')" vid="component-marker"></el-amap-marker>

      </el-amap>
    </div>
    <div class="visitXqCnt">
      <div class="flex_r_s_b cntInfo">
        <div class="list_left">
          <div class="userName">{{uName}}</div>
          <div class="dataTime">
            {{timeY}}</br>{{timeH}}
          </div>
        </div>
        <div class="list_right">
          <div class="shopName">{{shopName}}</div>
          <div class="addr">{{addr}}</div>
          <div class="img-box flex_r_f_s">
            <img :src="img" alt="" v-for="(img,index) in imgList" :key="img" @click="handleImgsClick(index)">
          </div>
          <div class="remarks">{{remark}}</div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  import Api from '../common/apj.js'
  import compress from '../../data/image'
  export default {
    data() {
      let self = this;
      return {
        uName: '',
        shopName: '',
        img1: '',
        img2: '',
        img3: '',
        addr: '',
        imgList:[],
        remark: '',
        timeY: '',
        timeH: '',
        initialIndex: 0,
        center: [0, 0],
      }
    },
    mounted() {
      let self = this;
      let re = this.$route.query.visitInfo;
      this.center = [re.longitude, re.latitude];
      this.img1 = re.gateImg;
      this.img2 = re.displayImgOne;
      this.img3 = re.displayImgTwo;
      this.imgList = [self.img1,self.img2,self.img3];
      this.addr = re.currentAddr;
      this.remark = re.remark;
      this.uName = re.staffName,
      this.timeY = re.createTime.split(' ')[0];
      this.timeH = re.createTime.split(' ')[1];
      this.shopName = re.shopName;
      console.log(this.$route.query)
    },
    methods: {
      back() {
        this.$router.push({
          name: 'workOsInfoList'
        });
      },
      handleImgsClick(index) {
        this.initialIndex = index
        const params = {
          $props: {
            imgs: this.imgList,
            initialIndex: 'initialIndex', // 响应式数据的key名
            loop: false
          },
          $events: {
            change: (i) => {
              // 必须更新 initialIndex
              this.initialIndex = i
            }
          }
        }
        this.$createImagePreview({ ...params
        }).show()
      }
    }
  }
</script>

<style lang="scss">
  .visitXq {
    .login_nav {
      height: 42px;
      padding: 22px 0;
      position: relative;
      border-bottom: 1px solid #e8e8e8;

      .back {
        background: url("../../assets/icon/backColory.png") no-repeat center 0;
        background-size: cover;
        width: 24px;
        height: 40px;
        position: absolute;
        left: 20px;
        top: 50%;
        margin-top: -21px;
      }

      .title {
        font-size: 30px;
        color: #333;
        line-height: 42px;
        text-align: center;
      }
    }

    .customer_map {
      height: 500px;
    }
    .amap-copyright{
      display: none;
    }
    .visitXqCnt {
      padding: 0 20px;
      padding-top: 30px;

      .cntInfo {
        align-items: flex-start;

        .list_left {
          width: 20%;

          .userName {
            font-size: 30px;
            font-weight: bold;
            color: #333;
            text-align: center;
            padding-bottom: 10px;
          }

          .dataTime {
            font-size: 26px;
            color: #999;
            text-align: center;
            line-height: 28px;
          }
        }

        .list_right {
          width: 75%;
          padding-bottom: 15px;

          .shopName {
           font-size: 32px;
           font-weight: bold;
            color: #333;
            padding-bottom: 10px;
          }

          .addr {
            font-size: 26px;
            color: #999;
            line-height: 32px;
          }

          .img-box {
            padding: 20px 0;

            img {
              width: 130px;
              height: 130px;
              margin-right: 20px;
            }
          }

          .remarks {
            font-size: 26px;
            color: #999;
            line-height: 32px;

          }
        }
      }
    }
  }
</style>
