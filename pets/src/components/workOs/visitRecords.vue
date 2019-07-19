<template>
  <div class="visitRecords">
    <div class="cntTop">
      <div class="login_nav">
        <div class="back" @click="back"></div>
        <div class="title">拜访记录</div>
        <router-link class="addStaffData" :to="{name:'addCustomer'}">
          <img src="../../assets/ali-add.png" alt="">
        </router-link>
      </div>
      <div class="nameAndTime flex_r_s_b">
        <div class="name_l flex_r_f_s">
          <p>姓名:</p>
          <cube-select v-model="value" title="选择员工" :options="nameOpt" @change="nameChange">
          </cube-select>
        </div>

        <div class="name_r flex_r_s_b">
          <p>时间:</p>
          <div class="flex_r_s_b timeBox">
            <cube-button class="cube-select" @click="showDatePicker">{{time1}}</cube-button>
            <span>-</span>
            <cube-button class="cube-select" @click="showDatePicker">{{time1}}</cube-button>
          </div>
        </div>
      </div>
      <div class="search_box">
      	<div class="search flex_r_s_b">
      		<input type="text" placeholder="输入你要查询的店铺名字" v-model="value">
      		<div class="sIcon flex_r_s_c">
      			<img src="../../assets/ali-sousuo.png" alt="">
      		</div>
      	</div>
      </div>
      <div class="recordsNum">共查询到700条拜访记录</div>
      <div class="dataNum">2019/7/19共<span>7</span>条拜访记录</div>
    </div>
    <div class="cntList">
      <cube-scroll ref="scroll" :options="options">
      <ul>
        <li class="flex_r_s_b" v-for="item in nameOpt">
          <div class="list_left">
            <div class="userName">刘海洋</div>
            <div class="dataTime">
              2019/7-19</br>17:12:25
            </div>
          </div>
          <div class="list_right">
            <div class="shopName">毛毛屋宠物生活馆</div>
            <div class="addr">四川省成都市锦江区牛王庙东恒国际四川省成都市锦江区牛王庙东恒国际</div>
            <div class="img-box flex_r_f_s">
              <img src="../../assets/images/seller_pic.png" alt="">
              <img src="../../assets/images/seller_pic.png" alt="">
              <img src="../../assets/images/seller_pic.png" alt="">
            </div>
            <div class="remarks">备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注</div>
          </div>

        </li>
      </ul>
      </cube-scroll>
    </div>
  </div>
</template>

<script>
  import Api from '../common/apj.js'
  export default {
    data() {
      return {
        nameOpt: [1, 2, 3, 4, 5, 6],
        value1: '',
        value: '',
        time1:'',
        time2:'',
        options:{
        	pullDownRefresh:{
        		txt:'更新成功',
        		threshold:40
        	},
        	pullUpLoad:{
        		txt:{
        			more: '加载更多', noMore: '没有更多数据了',
        		},
        		threshold:40,

        	}
        },
      }
    },
    methods: {
      nameChange() {

      },
      back() {
        this.$router.push({
          name: 'workOsInfoList'
        });
      },
      showDatePicker() {
        if (!this.datePicker) {
          this.datePicker = this.$createDatePicker({
            title: 'Date Picker',
            min: new Date(2008, 7, 8),
            max: new Date(2020, 9, 20),
            value: new Date(),
            onSelect: this.selectHandle,
            onCancel: this.cancelHandle
          })
        }

        this.datePicker.show()
      },
      selectHandle(date, selectedVal, selectedText) {
        this.time1 = selectedVal.join('/')

      },
      cancelHandle() {
       alert(2)
      }
    }
  }
</script>

<style lang="scss">
  .visitRecords {
    height: 100%;
    position: relative;

    .cntTop {
      height: 360px;
      .login_nav {
        height: 42px;
        padding: 22px 0;
        position: relative;
        border-bottom: 1px solid #e8e8e8;

        .addStaffData {
          width: 40px;
          height: 40px;
          position: absolute;
          right: 20px;
          top: 50%;
          margin-top: -21px;

          img {
            width: 40px;
            height: 40px;
          }
        }

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

          span {
            color: #ff523d;
          }
        }
      }
      .nameAndTime{
        padding: 20px 20px 0 20px;
        box-sizing: border-box;
        .name_l{
          width: 280px;
          p{
            font-size: 22px;
            color: #333;
            margin-right: 15px;
          }
          .cube-select{
            width: 150px;
            height: 50px;
            padding: 5px 10px 5px 20px;
          }
        }
        .name_r{
          width: 400px;
          p{
            font-size: 22px;
            color: #333;
          }
          .cube-btn{
            background: none;
            color: #333;
            width: 160px;
            height: 50px;
            padding: 0;
          }
          .timeBox{
            width: 330px;
            span{
              margin: 0 10px;
            }
          }
        }
      }
      .search_box {
        padding: 20px 20px 0 20px;
      	.search {
      		height: 48px;
      		border: 1px solid #ff523d;
      		/*no*/
      		border-radius: 22px;
      		padding-left: 10px;
      		box-sizing: border-box;

      		.sIcon {
      			height: 48px;
      			width: 80px;
      			background: #ff523d;
      			border-top-right-radius: 22px;
      			border-bottom-right-radius: 22px;

      			img {
      				width: 30px;
      			}
      		}

      		input {
      			width: 85%;
      			font-size: 26px;
      		}
      	}

      }
      .recordsNum{
        padding: 20px 20px 0 20px;
        font-size: 30px;
        color: #333;

      }
      .dataNum{
        padding: 40px 20px 0 20px;
        font-size: 26px;
        color: #333;
        span{
          color: #ff523d;
        }
      }
    }
    .cntList{
      position: absolute;
      left: 0;
      top: 360px;
      right: 0;
      bottom: 0;
      ul{
        padding: 0 20px;
        li{
          align-items: flex-start;
          margin-top: 30px;
          .list_left{
            width: 25%;
            .userName{
              font-size: 28px;
              color: #333;
              text-align: center;
              padding-bottom: 10px;
            }
            .dataTime{
              font-size: 20px;
              color: #999;
              text-align: center;
              line-height: 28px;
            }
          }
          .list_right{
             width: 70%;
             padding-bottom: 15px;
             border-bottom: 2px solid #e8e8e8;/*no*/
            .shopName{
              font-size: 28px;
              color: #333;
              padding-bottom: 10px;
            }
            .addr{
              font-size: 20px;
              color: #999;
              line-height: 28px;
            }
            .img-box{
              padding: 10px 0;
              img{
                width: 130px;
                height: 130px;
                margin-right: 20px;
              }
            }
            .remarks{
              font-size: 20px;
              color: #999;
              line-height: 28px;

            }
          }
        }
        li:first-child{
          margin-top: 0;
        }
      }
    }
  }
</style>
