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
      <div class="statusBox flex_r_s_b">
        <div class="flex_r_f_s divBox">
          <div class="title">状态  :</div>
            
              <cube-select
                v-model="typeVal"
                :title="'选择'"
                :cancelTxt="'取消'"
                :options="typeOpt"
                :placeholder="'类型'"
                :auto-pop="false"
                @change="change">
              </cube-select>
          
        </div>


          <div class="flex_r_f_s divBox">
            <div class="title">员工  :</div>
            <cube-select
              v-model="ywVal"
              :title="'选择'"
              :cancelTxt="'取消'"
              :options="column"
              :placeholder="'业务员'"
              :auto-pop="false"
              @change="change">
            </cube-select>
          </div>



        <!-- <div class="btn flex_r_s_c">查询</div> -->
      </div>
      <div class="storeInfo">
        <div class="incomeBox flex_r_s_b">
          <div class="time"><span>{{time1}}</span><span v-if="time2!=''"> ~ {{time2}}</span></div>
          <div class="income">收入: <span>+¥{{dataInfo.totalIncome}}</span></div>
        </div>
        <div class="registerNum flex_r_s_b">
          <div>商户开店 : {{dataInfo.shopNum}}</div>
          <div>用户注册 : {{dataInfo.userNum}}</div>
          <div>商户达标 : {{dataInfo.shopQualifiedNum}}</div>
        </div>
      </div>
    </div>
    <div class="workBillCnt">
      <cube-scroll ref="scroll" @pulling-up="onPullingUp" @pulling-down="onPullingDown" :options="options">
        <ul class="workBillList">
           <li class="flex_r_s_b" v-for="(item,index) in dataInfo.list">
             <div class="list_l flex_r_f_s">
               <div class="headImg">
                <!-- <img src="../../assets/logo.png" alt=""> -->
                </div>
               <div class="mid">
                 <div class="yq"><span>{{item.type|typeFilter}}</span></div>
                 <div class="shopName">[{{item.title}}]</div>
                 <div class="addr">{{item.province}}-{{item.city}}-{{item.area}}</div>
                 <div class="time">{{item.creatdTime}}</div>
               </div>
             </div>

             <div class="list_r">
               <div class="money">+¥{{item.income}}</div>
               <div class="zcStatus" v-if="item.status==2">已作废</div>
               <div class="delete flex_r_s_c" v-if="item.status==1" @click="upDataStatusFalse(item,index)">作废</div>
               <div class="delete flex_r_s_c" v-else @click="upDataStatusTrue(item,index)">恢复正常</div>
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
        typeVal:0,
        ywVal:'',
        remark:'',
        typeOpt: [{text:'用户',value:1},{text:'商户',value:2},{text:'全部',value:0}],
        time1:'',
        time2:'',
        dataInfo:'',
        column:[{text:'全部',value:''}],
        page:1,
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

        	},
          bindToWrapper:true
        },
      }
    },
    mounted() {
      this.addressPicker = this.$createCascadePicker({
      	title: '城市选择',
      	data: addressData,
      	onSelect: this.selectHandle,
      	onCancel: this.cancelHandle
      });
      this.monthnow();
      this.getBill();
      this.getAssign();

    },
    filters:{
      typeFilter(val){
        if(val==1){
          return '用户注册'
        }else if(val==2){
          return '商户注册'
        }else if(val==3){
          return '商户票卷达标'
        }else if(val==4){
          return '商户票卷核销'
        }else if(val==5){
          return '商家首单成交'
        }else if(val==6){
          return '用户首单成交'
        }
      }
    },
    methods: {
      back(){
      	this.$router.go(-1); //返回上一层
      },
      showAddressPicker() {
      	this.addressPicker.show()
      },
      selectHandle(selectedVal, selectedIndex, selectedText) {
      	this.cityData = selectedText;
        this.getBill();
      },
      cancelHandle() {

      },
      upDataStatusTrue(item,index){
        let self = this;
        this.axios.post(Api.staffApi+'/employee/system/updateStatus', this.qs.stringify({
        	ebdId:item.ebdId+'',
        	status:1
        }), {
        	headers: {
        		'Content-Type': 'application/x-www-form-urlencoded'
        	}
        }).then((res)=>{
          if(res.data.code==1){
            let toast = self.$createToast({
            	txt: '账单恢复正常',
            	type: 'correct'
             })
            toast.show();
            item.status = 1;
          }else{
            alert(res.data.msg)
          }

        })
      },
      upDataStatusFalse(item,index){
        let self = this;
        this.axios.post(Api.staffApi+'/employee/system/updateStatus', this.qs.stringify({
        	ebdId:item.ebdId+'',
        	status:2
        }), {
        	headers: {
        		'Content-Type': 'application/x-www-form-urlencoded'
        	}
        }).then((res)=>{
          if(res.data.code==1){
            let toast = self.$createToast({
            	txt: '账单已作废',
            	type: 'correct'
             })
            toast.show();
            item.status = 2;
          }else{
            alert(res.data.msg)
          }

        })
      },
      monthnow(){
         var dd= new Date();

         dd.setDate(dd.getDate());//获取AddDayCount天后的日期

         var y = dd.getFullYear();

         var m = dd.getMonth()+1;//获取当前月份的日期

         var d = dd.getDate();
         this.time1 = y+"-"+m;

      },
      onPullingDown(){
        this.page = 1;
        let self = this;
        let sheng = '';
        let shi = '';
        let qu = '';
        if(this.cityData.length===3){
          if(this.cityData[0]=='省份'){
            sheng = '';
            shi = '';
            qu = '';
          }else if(this.cityData[2]=='市辖区'){
            sheng = this.cityData[0];
            shi = this.cityData[1];
            qu = '';
          }else{
            sheng = this.cityData[0];
            shi = this.cityData[1];
            qu = this.cityData[2];
          }
        }else if(this.cityData.length===2){
          if(this.cityData[1]=='城市'){
            sheng = this.cityData[0];
            shi = '';
            qu = '';
          }else{
            sheng = this.cityData[0];
            shi = this.cityData[1];
            qu = '';
          }

        }

        self.axios.get(Api.userApi + '/employee/system/selectOtherEmployeeBillingDetails', {
          params: {
            province:sheng,
            city:shi,
            area:qu,
            startTime:self.time1,
            endTime:self.time2,
            userId:JSON.parse(localStorage.getItem('userInfo')).employeeId,
            employeeId:self.ywVal,
            type:self.typeVal,
            networkId: JSON.parse(localStorage.getItem('userInfo')).network,
            department: JSON.parse(localStorage.getItem('userInfo')).department,
            post: JSON.parse(localStorage.getItem('userInfo')).post,
            page:1,
            rows:10
          }
        }, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then((res) => {
          if (res.data.code == 1) {
            console.log(res)
            if(res.data.data.length<1){
              alert('暂无数据')
              self.$refs.scroll.forceUpdate();
              self.$refs.scroll.refresh();
              self.dataInfo.list = res.data.data;
            }else{
              setTimeout(() => {
                self.dataInfo.list = res.data.data;
                self.$refs.scroll.forceUpdate();
              	setTimeout(() => {
              		self.$refs.scroll.refresh();
              	}, 100)
              }, 500)
            }


          } else {
            alert(res.data.msg);
          }
        })
      },
      onPullingUp(){
        let self = this;
        this.page++;
        let sheng = '';
        let shi = '';
        let qu = '';
        if(this.cityData.length===3){
          if(this.cityData[0]=='省份'){
            sheng = '';
            shi = '';
            qu = '';
          }else if(this.cityData[2]=='市辖区'){
            sheng = this.cityData[0];
            shi = this.cityData[1];
            qu = '';
          }else{
            sheng = this.cityData[0];
            shi = this.cityData[1];
            qu = this.cityData[2];
          }
        }else if(this.cityData.length===2){
          if(this.cityData[1]=='城市'){
            sheng = this.cityData[0];
            shi = '';
            qu = '';
          }else{
            sheng = this.cityData[0];
            shi = this.cityData[1];
            qu = '';
          }

        }

        self.axios.get(Api.userApi + '/employee/system/selectOtherEmployeeBillingDetails', {
          params: {
            province:sheng,
            city:shi,
            area:qu,
            startTime:self.time1,
            endTime:self.time2,
            userId:JSON.parse(localStorage.getItem('userInfo')).employeeId,
            employeeId:self.ywVal,
            type:self.typeVal,
            networkId: JSON.parse(localStorage.getItem('userInfo')).network,
            department: JSON.parse(localStorage.getItem('userInfo')).department,
            post: JSON.parse(localStorage.getItem('userInfo')).post,
            page:self.page,
            rows:10
          }
        }, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then((res) => {
          if (res.data.code == 1) {

            if(res.data.data.length>1){
              self.$refs.scroll.forceUpdate();
              self.$refs.scroll.refresh();
              self.dataInfo.list.push(...res.data.data);
            }else{
              setTimeout(() => {
                self.$refs.scroll.forceUpdate();
              	setTimeout(() => {
              		self.$refs.scroll.refresh();
              	}, 100)
              }, 500)
            }


          } else {
            alert(res.data.msg);
            setTimeout(() => {
              self.$refs.scroll.forceUpdate();
            	setTimeout(() => {
            		self.$refs.scroll.refresh();
            	}, 100)
            }, 500)
          }
        })
      },
      change(value, index, text) {
        this.getBill();
      },
      showDatePicker() {
         if (!this.datePicker) {
           this.datePicker = this.$createDatePicker({
             title: '时间选择',
             min: new Date(2008, 7, 8),
             max: new Date(),
             value: new Date(),
             columnCount:2,
             onSelect: this.selectHandle1,
             onCancel: function(){}
           })
         }

         this.datePicker.show()
       },
      selectHandle1(date, selectedVal, selectedText) {
         let self = this;
         this.time1 = selectedText.join('-');
         if(this.time2!=''&& new Date(selectedText.join('-')).getTime()>new Date(self.time2).getTime()){
           let temp = this.time2;
           this.time2 = this.time1;
           this.time1 = temp;
           this.getBill();
         }else if(this.time2!=''&& new Date(selectedText.join('-')).getTime()==new Date(self.time2).getTime()){

           this.time1 = selectedText.join('-');
           this.time2 = '';
           this.getBill();
         }else{
           this.getBill();
         }
       },

      getAssign(){
        let self = this;
        self.axios.get(Api.userApi + '/employee/system/selectAssignEmployeeInfo', {
          params: {
            networkId: JSON.parse(localStorage.getItem('userInfo')).network,
            department: JSON.parse(localStorage.getItem('userInfo')).department,
            post: JSON.parse(localStorage.getItem('userInfo')).post,
          }
        }, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then((res)=>{
          if(res.data.code==1){
            //console.log(res)
            res.data.data.forEach((e)=>{
              self.column.push({text:e.name,value:e.employeeId})
            })

          }else{
            alert(res.data.msg)
          }
        })
      },
      showDatePicker2() {
         if (!this.datePicker2) {
           this.datePicker2 = this.$createDatePicker({
             title: '时间选择',
             min: new Date(2008, 7),
             max: new Date(),
             columnCount:2,
             value: new Date(),
             onSelect: this.selectHandle2,
             onCancel: function(){}
           })
         }

         this.datePicker2.show()
       },
      selectHandle2(date, selectedVal, selectedText) {
        //this.time2 = selectedVal.join('/')
         let self = this;
         if(this.time1==''){
           this.time1 = selectedText.join('-');
           this.time2 = '';
           this.getBill();
         }
         this.time2 = selectedText.join('-');
         if(this.time1!=''&& new Date(selectedText.join('-')).getTime()<new Date(self.time1).getTime()){
           let temp = this.time2;
           this.time2 = this.time1;
           this.time1 = temp;
           this.getBill();
         }else if(this.time1!=''&& new Date(selectedText.join('-')).getTime()==new Date(self.time1).getTime()){
           this.time1 = selectedText.join('-');
           this.time2 = '';
           this.getBill();
         }else{
          this.getBill();
         }
       },
       getBill(){
         let self = this;
         let sheng = '';
         let shi = '';
         let qu = '';
         if(this.cityData.length===3){
           if(this.cityData[0]=='省份'){
             sheng = '';
             shi = '';
             qu = '';
           }else if(this.cityData[2]=='市辖区'){
             sheng = this.cityData[0];
             shi = this.cityData[1];
             qu = '';
           }else{
             sheng = this.cityData[0];
             shi = this.cityData[1];
             qu = this.cityData[2];
           }
         }else if(this.cityData.length===2){
           if(this.cityData[1]=='城市'){
             sheng = this.cityData[0];
             shi = '';
             qu = '';
           }else{
             sheng = this.cityData[0];
             shi = this.cityData[1];
             qu = '';
           }

         }

         self.axios.get(Api.userApi + '/employee/system/selectEmployeeBillingDetailsByFirst', {
           params: {
             province:sheng,
             city:shi,
             area:qu,
             startTime:self.time1,
             endTime:self.time2,
             userId:JSON.parse(localStorage.getItem('userInfo')).employeeId,
             employeeId:self.ywVal,
             type:self.typeVal,
             networkId: JSON.parse(localStorage.getItem('userInfo')).network,
             department: JSON.parse(localStorage.getItem('userInfo')).department,
             post: JSON.parse(localStorage.getItem('userInfo')).post,

           }
         }, {
           headers: {
             'Content-Type': 'multipart/form-data'
           }
         }).then((res) => {
           if (res.data.code == 1) {
             console.log(res)
             if(res.data.data.length<1){
               alert('暂无数据')
               self.$refs.scroll.forceUpdate();
               self.$refs.scroll.refresh();
               self.dataInfo = res.data.data;
             }else{
               setTimeout(() => {
                 self.dataInfo = res.data.data;
                 self.$refs.scroll.forceUpdate();
               	setTimeout(() => {
               		self.$refs.scroll.refresh();
               	}, 100)
               }, 500)
             }


           } else {
             alert(res.data.msg);
           }
         })
       }

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

       .divBox{
         width:300px;
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
          .time{
            span{
              color:#333;
            }
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
            width:120px;
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
              width:120px;
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
