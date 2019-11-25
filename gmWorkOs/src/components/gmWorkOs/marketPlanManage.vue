<template>
  <div class="marketPlanManage">
    <div class="marketPlanManageTop">
      <div class="login_nav">
      	<div class="back" @click="back"></div>
      	<div class="title">营销计划管理</div>
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
      <div class="statusBox flex_r_f_s">
        <div class="title">状态  :</div>
        <div class="flex_r_s_b status_r">
          <cube-select
            v-model="value"
            :title="'选择'"
            :cancelTxt="'取消'"
            :options="options"
            :placeholder="'执行人'"
            :auto-pop="false"
            @change="change">
          </cube-select>
          <cube-select
            v-model="value"
            :title="'选择'"
            :cancelTxt="'取消'"
            :options="options"
            :placeholder="'活动状态'"
            :auto-pop="false"
            @change="change">
          </cube-select>
          <cube-select
            v-model="value"
            :title="'选择'"
            :cancelTxt="'取消'"
            :options="options"
            :placeholder="'审批状态'"
            :auto-pop="false"
            @change="change">
          </cube-select>
        </div>

      </div>
      <div class="timeSelect flex_r_f_s">
        <div class="title">时间  :</div>
        <div class="flex_r_s_b timeBox">

          <div class="timeBtn" @click="showDatePicker">{{time1}}</div>
          <span>-</span>
          <div class="timeBtn"  @click="showDatePicker2">{{time2}}</div>
        </div>
      </div>
      <div class="branchName flex_r_f_s">
        <div class="title">名称  :</div>
        <input type="text" v-model="val" placeholder="计划名称">
        <div class="btn flex_r_s_c">查询</div>
      </div>
    </div>
    <div class="businessManageCnt">
      <cube-scroll ref="scroll">
        <ul class="businessManageList">
          <li class="listItem" v-for="item in [1,2,3,4,5]">
            <div class="businessName">关于四川大学附近楼盘地推的活动计划关于四川大学 附近楼盘地推的活动计划</div>
            <div class="item">2019/11/14  12:00:00~2019/11/16  12:00:00</div>
            <div class="item chargePerson flex_r_f_s"><div class="item_l">活动执行人&nbsp;:&nbsp;</div><div class="item_r">姜晓明</div></div>
            <div class="item addr flex_r_f_s"><div class="item_l">计划区域&nbsp;:&nbsp;</div><div class="item_r">四川省-成都市-锦江区</div></div>
            <div class="item xqAddr">一环路东三环139号</div>
            <div class="item jyType flex_r_f_s"><div class="item_l">配合人&nbsp;:&nbsp;</div><div class="item_r"><span>张三</span> <span>李四</span> <span>老王</span></div></div>
            <div class="item startTime flex_r_f_s"><div class="item_l">添加日期&nbsp;:&nbsp;</div><div class="item_r">2018/09/09</div></div>
            <div class="item chargePerson flex_r_f_s"><div class="item_l">审批人&nbsp;:&nbsp;</div><div class="item_r">李玉刚<span style="color:#ff523d">【审批中】</span></div></div>

            <div class="btnsBox flex_r_s_b">
              <div class="btn_l flex_r_s_b">
                <div class="btn">计划详情</div>
                <div class="btn">审批</div>
                <div class="btn">地址导航</div>
              </div>
              <div class="btn_r">编辑</div>
            </div>
          </li>
        </ul>
      </cube-scroll>
    </div>
    <div class="remarkMask flex_r_s_c">
      <div class="maskCnt">
        <div class="title">计划审批</div>
        <div class="approvalBox flex_r_f_e">
          <span class="flex_r_s_c">通过审批</span>
          <span class="flex_r_s_c">拒绝审批</span>
        </div>
        <cube-textarea v-model="remark"   :placeholder="'请输入审批备注'" :autoExpand="true" :maxlength="30"></cube-textarea>
        <div class="remarkBtn flex_r_f_e">
          <span>取消</span>
          <span style="color:#ff523d">确认</span>
        </div>
      </div>

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
      back() {
      	this.$router.push({
      		name:'workOsInfoList'
      	});
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
  .marketPlanManage{
    height:100%;
    position: relative;
    .marketPlanManageTop{
      height:400px;
      .statusBox{
        padding:20px 20px 0 20px;
        box-sizing:border-box;
        .title{
          color:#000;
          margin-right:35px;
          font-size:26px;
        }
        .status_r{
          width:500px;
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
    .branchName{
       padding:0 22px;
       padding-top:20px;
       box-sizing:border-box;
       .title{
         font-size:26px;
         color:#333;
         width:80px;
         margin-right:20px;
       }
       input{
         height:55px;
         border:1px solid #e8e8e8;
         box-sizing:border-box;
         margin-right:50px;
         width:400px;
         padding:0 15px;
         font-size:26px;
       }
       .btn{
         height:50px;
         width:100px;
         border-radius:25px;
         color:#fff;
         background:#ff523d;
         font-size:26px;
       }
     }
  }
    .businessManageCnt{
      // padding:0 22px;
      position:absolute;
      top:400px;
      left:0;
      right:0;
      bottom:0;
      box-sizing:border-box;
      .businessManageList{
        padding:22px;
        .listItem{
          background:rgba(255,255,255,1);
          box-shadow:0px 4px 12px 0px rgba(15,15,15,0.16);
          border-radius:10px;
          padding:29px;
          box-sizing:border-box;
          box-sizing:border-box;
          margin-bottom:30px;
          .cube-rate-item{
            width:30px;
          }
          .businessName{
            color:#000000;
            // padding-top:20px;
            font-weight:bold;
            line-height:40px;
          }
          .item{
            padding-top:30px;
          }

          .btnsBox{
            padding-top:30px;
            .btn_l{
              width:400px;
            }
            .btn{
              padding:12px;
              background:#f1f1f1;
              font-size:24px;
              color:#333;
              border-radius:10px;
            }
            .btn_r{
              color:#ff523d;
            }
          }
        }
      }

    }
    .remarkMask{
      position: fixed;
      left:0;
      top:0;
      height:100%;
      width:100%;
      z-index:1000;
      background:rgba(0,0,0,0.6);
      display:none;
      .maskCnt{

        width:580px;
        height:420px;
        background:rgba(255,255,255,1);
        border-radius:10px;
        padding:0 15px;
        box-sizing:border-box;
        .title{
          color:#000;
          text-align:center;
          padding:30px 0;
        }
        .approvalBox{
          span{
            width:160px;
            height:40px;
            background:rgba(255,255,255,1);
            border:1px solid rgba(232,232,232,1);
            border-radius:20px;
          }

        }
        .star{
          .span{
            margin-right:30px;
          }
        }
        .cube-textarea-wrapper{
          margin-top:30px;
          height:180px;
        }
        .remarkBtn{
          padding-top:30px;
        }

      }
    }
</style>
