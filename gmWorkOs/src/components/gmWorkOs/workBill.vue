<template>
  <div class="workBill">
    <div class="workBillTop">
      <div class="login_nav">
      	<div class="back" @click="back"></div>
      	<div class="title">业务流水明细</div>
      </div>
      <div class="regionBox flex_r_f_s">
        <div class="title">区域  :</div>
        <div class="region flex_r_f_s">
          <div class="sheng flex_r_s_b" @click="showAddressPicker" v-for="item in cityData">
          	<span>{{item}}</span>
          	<i class="cube-select-icon"></i>
          </div>
        </div>
        <!-- <div class="status">活动状态</div> -->
      </div>
      <div class="timeSelect flex_r_f_s">
        <div class="title">时间  :</div>
        <div class="flex_r_s_b timeBox">

          <div class="timeBtn" @click="showDatePicker">{{time1}}</div>
          <span>-</span>
          <div class="timeBtn"  @click="showDatePicker2">{{time2}}</div>
        </div>
      </div>
      <div class="statusBox flex_r_f_s">
        <div class="title">状态  :</div>
        <div class="flex_r_s_b status_r">
          <cube-select
            v-model="value"
            :title="'选择'"
            :cancelTxt="'取消'"
            :options="options"
            :placeholder="'类型'"
            :auto-pop="false"
            @change="change">
          </cube-select>
          <cube-select
            v-model="value"
            :title="'选择'"
            :cancelTxt="'取消'"
            :options="options"
            :placeholder="'业务员'"
            :auto-pop="false"
            @change="change">
          </cube-select>
        </div>
        <div class="btn flex_r_s_c">查询</div>
      </div>
      <div class="storeInfo">
        <div class="incomeBox flex_r_s_b">
          <div class="time">2019/11/25</div>
          <div class="income">收入: <span>+¥120.00</span></div>
        </div>
        <div class="registerNum flex_r_s_b">
          <div>商户开店 : 23</div>
          <div>商户开店 : 23</div>
          <div>商户开店 : 23</div>
        </div>
      </div>
    </div>
    <div class="workBillCnt">
      <cube-scroll ref="scroll">
        <ul class="workBillList">
           <li class="flex_r_s_b" v-for="item in [1,2,3,4,5]">
             <div class="list_l flex_r_f_s">
               <div class="headImg">
                <!-- <img src="../../assets/logo.png" alt=""> -->
                </div>
               <div class="mid">
                 <div class="yq">邀请用户注册</div>
                 <div class="shopName">[花样小二家宠物生活馆]</div>
                 <div class="addr">四川省-成都市-锦江区</div>
                 <div class="time">2018/08/20  15:56:00</div>
               </div>
             </div>

             <div class="list_r">
               <div class="money">+¥5.00</div>
               <div class="zcStatus">已作废</div>
               <div class="delete flex_r_s_c">删除</div>
             </div>
           </li>
        </ul>
      </cube-scroll>
    </div>

  </div>
</template>

<script>
  import Api from '../common/apj.js'
  import {provinceList,cityList,areaList} from '../../data/area'
  const addressData = provinceList
  addressData.forEach(province => {
  	province.children = cityList[province.value]
  	province.children.forEach(city => {
  		city.children = areaList[city.value]
  	})
  })
  export default{
    data(){
      return{
        cityData: ['省份', '城市', '地区'],
        val:'',
        value:3,
        remark:'',
        options: [2013, 2014, 2015, 2016, 2017, 2018],
        time1:'',
        time2:''
      }
    },
    mounted() {
      this.addressPicker = this.$createCascadePicker({
      	title: '城市选择',
      	data: addressData,
      	onSelect: this.selectHandle,
      	onCancel: this.cancelHandle
      });

    },
    methods: {
      back(){
      	this.$router.go(-1); //返回上一层
      },  
      showAddressPicker() {
      	this.addressPicker.show()
      },
      selectHandle(selectedVal, selectedIndex, selectedText) {
      	this.cityData = selectedText
      },
      cancelHandle() {

      },
      change(value, index, text) {
        console.log('change', value, index, text)
      },
      showDatePicker() {
         if (!this.datePicker) {
           this.datePicker = this.$createDatePicker({
             title: '时间选择',
             min: new Date(2008, 7, 8),
             max: new Date(),
             value: new Date(),
             onSelect: this.selectHandle,
             onCancel: this.timeCancelHandle
           })
         }

         this.datePicker.show()
       },
       selectHandle(date, selectedVal, selectedText) {
         let self = this;
         this.time1 = selectedText.join('-');
         if(this.time2!=''&& new Date(selectedText.join('-')).getTime()>new Date(self.time2).getTime()){
           let temp = this.time2;
           this.time2 = this.time1;
           this.time1 = temp;

         }else if(this.time2!=''&& new Date(selectedText.join('-')).getTime()==new Date(self.time2).getTime()){
           alert('不能选相同的时间');
           this.time1 = '';
         }else{

         }
       },
      timeCancelHandle() {

      },
      showDatePicker2() {
         if (!this.datePicker2) {
           this.datePicker2 = this.$createDatePicker({
             title: '时间选择',
             min: new Date(2008, 7, 8),
             max: new Date(),
             value: new Date(),
             onSelect: this.selectHandle2,
             onCancel: this.timeCancelHandle
           })
         }

         this.datePicker2.show()
       },
      selectHandle2(date, selectedVal, selectedText) {
        //this.time2 = selectedVal.join('/')
         let self = this;
         if(this.time1==''){
           alert('请选择开始时间');
           return false;
         }
         this.time2 = selectedText.join('-');
         if(this.time1!=''&& new Date(selectedText.join('-')).getTime()<new Date(self.time1).getTime()){
           let temp = this.time2;
           this.time2 = this.time1;
           this.time1 = temp;

         }else if(this.time1!=''&& new Date(selectedText.join('-')).getTime()==new Date(self.time1).getTime()){
           alert('不能选相同的时间');
           this.time2 = '';
         }else{

         }
       },

    }
  }
</script>

<style lang="scss">
  .workBill{
    height:100%;
    position: relative;
    .workBillTop{
      height:450px;
      .statusBox{
        padding:20px 20px 0 20px;
        box-sizing:border-box;
        .btn{
          height:50px;
          width:100px;
          border-radius:25px;
          color:#fff;
          background:#ff523d;
          font-size:26px;
          margin-left:30px;
        }
        .title{
          color:#000;
          margin-right:35px;
          font-size:26px;
        }
        .status_r{
          width:330px;
        }
        .cube-select{
          width:150px;
          padding: 10px 20px 10px 10px;
        }
      }
      .timeSelect{
        padding:20px 20px 0 20px;
        box-sizing:border-box;
        .title{
          color:#000;
          margin-right:35px;
          font-size:26px;
        }
        .timeBox{
          width: 450px;
          .timeBtn{
            height:50px;
            width:200px;
            border:1px solid #e8e8e8;
            line-height:50px;
            text-align:center;
          }
          span{
            margin: 0 10px;

          }
        }
      }
      .storeInfo{
        background:#F5F5F5;
        padding:20px;
        margin-top:30px;
        .incomeBox{
          color:#000;
          span{
            color:#ff523d;
          }
        }
        .registerNum{
          padding-top:20px;
          font-size:24px;
        }
      }
    }
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
    			span{
    				color: #ff523d;
    			}
    		}
    	}
    .regionBox{
      box-sizing:border-box;
       padding:0 22px;
       padding-top:20px;
       .title{
         font-size:26px;
         color:#333;
         width:80px;
         margin-right:20px;
       }
       .region{
         width:500px;
         div {

         	/*no*/
           width:150px;
         	margin-right: 20px;
         	border: 1px solid #e8e8e8;
         	/*no*/
         	text-align: center;
         	border-radius: 2px;
         	/*no*/


         	span {
         		font-size: 26px;
         		color: #333;
             overflow:hide;
             width:100px;
             height:50px;
             line-height:50px;
             display:block;
             overflow: hidden;        /*内容会被修剪，并且其余内容是不可见的*/
             text-overflow:ellipsis;  /*显示省略符号来代表被修剪的文本。*/
             white-space: nowrap;     /*文本不换行*/
             padding-left:10px;
             box-sizing:border-box;
         	}

         	img {
         		width: 30px;
         	}
         }
       }
     }

  }
    .workBillCnt{
      // padding:0 22px;
      position:absolute;
      top:450px;
      left:0;
      right:0;
      bottom:0;
      box-sizing:border-box;
      .workBillList{
        li{
          align-items:flex-start;
          padding:22px;
          box-sizing:border-box;
          border-bottom:1px solid #e8e8e8;/*no*/
          .list_l{
            align-items:flex-start;
          }
          .headImg{
            width:80px;
            height:80px;
            background:rgba(255,255,255,1);
            border:1px solid rgba(204,204,204,1);
            border-radius:50%;
            margin-right:30px;
            img{
              width:100%;
              height:100%;
              object-fit: cover;
            }
          }
          .mid{
            width:400px;
            .yq{
              color:#000;
            }
            .shopName{
              color:#000;
              padding-top:30px;
            }
            .addr{
              font-size:24px;
              padding-top:30px;
            }
            .time{
              font-size:24px;
              padding-top:30px;
            }
          }
          .list_r{
            width:100px;
            .money{
              color:#ff523d;
              text-align:right;
            }
            .zcStatus{
              padding-top:30px;
              font-size:24px;
              text-align:right;
            }
            .delete{
              width:100px;
              height:40px;
              background:#ff523d;
              border-radius:10px;
              color:#fff;
              font-size:24px;
              margin-top:60px;
            }
          }
        }
      }

    }

</style>
