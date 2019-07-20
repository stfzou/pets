<template>
  <div class="workTable">
      <div class="cntTop">
        <div class="login_nav">
          <div class="back" @click="back"></div>
          <div class="title">工作报表</div>
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
         <div class="recordsNum">共查询到700条拜访记录</div>
      </div>
      <div class="cntList">
        <cube-scroll ref="scroll" :options="options">
        <ul>
          <li class="flex_r_s_b" v-for="item in nameOpt">
            <div class="list_left">
              <div class="userName">刘海洋</div>
              <div class="time">2019/07/18   17:12:15</div>
            </div>
            <div class="list_right">查看报表详情></div>
          </li>
        </ul>
        </cube-scroll>
      </div>
  </div>
</template>

<script>
  import Api from '../common/apj.js'
  export default{
     data(){
       return{
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
     methods:{
       back(){
       	this.$router.push({
       		name:'workOsInfoList'
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
  .workTable{
    height: 100%;
    position: relative;
    .cntTop{

      height: 260px;
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
      .recordsNum{
        padding: 50px 20px 0 20px;
        font-size: 30px;
        color: #333;

      }
    }
    .cntList{
      position: absolute;
      top: 260px;
      left: 0;
      right: 0;
      bottom: 0;
      ul{
        padding: 0 20px;
        li{
          border-bottom: 1px solid #e8e8e8;/*no*/
          padding: 15px 0;
          .list_left{
            .userName{
              font-size:22px;
              color: #333;
            }
            .time{
              font-size:22px;
              color: #333;
              padding-top: 10px;
            }
          }
          .list_right{
            color: #999;
            font-size: 22px;
          }
        }
      }
    }
  }
</style>
