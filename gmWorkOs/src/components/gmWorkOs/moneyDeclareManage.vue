<template>
  <div class="moneyDeclareManage">
    <div class="moneyDeclareManageTop">
     <div class="login_nav">
     	<div class="back"></div>
     	<div class="title">合作商户管理</div>
       <router-link :to="{name:'addBranch'}">添加</router-link>
     </div>
     <div class="typeBox flex_r_s_b">
       <div class="flex_r_s_b"><span>类型</span><i class="cubeic-pulldown"></i></div>
       <div class="flex_r_s_b"><span>性质</span><i class="cubeic-pulldown"></i></div>
     </div>
     <div class="inputBox flex_r_s_b">
       <input type="text" placeholder="请输入名称" v-model="val">
       <input type="text" placeholder="请输入骨米号" v-model="val">
     </div>
     <div class="timeBox flex_r_s_b">
       <div class="flex_r_f_s">{{time1}}</div>
       <span></span>
       <div class="flex_r_f_s">{{time2}}</div>
     </div>
     <div class="shopNameSearch flex_r_s_b">
       <input type="text" placeholder="请输入电话号码" v-model="val">
       <span class="searchBtn flex_r_s_c">查询</span>
     </div>
      <div class="storeInfo">
        <div class="title">汇款总额</div>
        <div class="registerNum flex_r_s_b">
          <div>现金 : {{dataInfo.shopNum}}</div>
          <div>骨币 : {{dataInfo.userNum}}</div>
          <div>骨豆 : {{dataInfo.shopQualifiedNum}}</div>
        </div>
      </div>
    </div>
    <div class="moneyDeclareManageCnt">
      <cube-scroll ref="scroll" @pulling-up="onPullingUp" @pulling-down="onPullingDown" :options="options">
        <ul class="moneyDeclareManageList">
           <li class="flex_r_s_b" v-for="(item,index) in dataInfo.list">
             <div class="list_l">
               <div class="mid">
                 <div class="shopName">紫东杂货店</div>
                 <div class="receivables flex_r_f_s">
                   <div>收款人: <b>张小白</b></div>
                   <div class="midPhone">电话: <b>15283133594</b></div>
                 </div>
                 <div class="receivables flex_r_f_s">
                   <div>类型: <b>广告费</b></div>
                   <div class="midPhone">请款人: <b>张三</b></div>
                 </div>
               </div>
             </div>

             <div class="list_r">
               <div class="money">¥{{item.income}}</div>
               <div class="zcStatus moeyType">[现金]</div>
               <div class="zcStatus spStatus" style="color:#3dc0ff">已审批</div>
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
        val:'',
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
  .moneyDeclareManage{
    height:100%;
    position: relative;
    .moneyDeclareManageTop{
      height:580px;
      .login_nav {
      		height: 42px;
      		padding: 22px 0;
      		position: relative;
      		border-bottom: 1px solid #e8e8e8;
      		a{

      			height: 40px;
            line-height:40px;
      			position: absolute;
      			right: 20px;
      			top: 50%;
      			margin-top: -21px;
            font-size:24px;
            color:#ff523d;
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

      .typeBox{
        padding:30px 20px 0 20px;
        box-sizing:border-box;
        div{
          width:310px;
          height:60px;
          background:#f1f1f1;
          border-radius:40px;
          padding:0 20px;
          box-sizing:border-box;
        }
      }
      .inputBox{
        padding:30px 20px 0 20px;
        box-sizing:border-box;
        input{
          width:310px;
          height:60px;
          background:#f1f1f1;
          border-radius:40px;
          padding:0 20px;
          box-sizing:border-box;
        }
      }
      .timeBox{
        padding:30px 20px 0 20px;
        box-sizing:border-box;
        div{
          width:310px;
          height:60px;
          background:#f1f1f1;
          border-radius:40px;
          padding:0 20px;
          box-sizing:border-box;
        }
        span{
          width:28px;
          height:2px;/*no*/
          background:#000;
        }
      }
      .shopNameSearch{
        padding:30px 20px 0 20px;
        box-sizing:border-box;
        input{
          width:500px;
          height:60px;
          background:#f1f1f1;
          border-radius:40px;
          padding:0 20px;
          box-sizing:border-box;
        }
        span{
          width:120px;
          height:60px;
          background:rgba(255,82,61,1);
          border:1px solid rgba(221,221,221,1);
          border-radius:40px;
          color:#fff;
        }
      }
      .storeInfo{
        background:#F5F5F5;
        padding:20px;
        margin-top:30px;
        .title{
          padding-bottom:10px;
          color:#000;

        }
        .registerNum{

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
         width:110px;

       }
      input{
        width:150px;
        border:1px solid #e8e8e8;
        height:50px;
        padding:0 20px;
      }
      .region{
        width:300px;
      }
      .region_r{
         width:310px;
      }
     }

  }
    .moneyDeclareManageCnt{
      // padding:0 22px;
      position:absolute;
      top:580px;
      left:0;
      right:0;
      bottom:0;
      box-sizing:border-box;
      .moneyDeclareManageList{
        li{
          align-items:flex-start;
          padding:22px;
          box-sizing:border-box;
          border-bottom:1px solid #e8e8e8;/*no*/
          .list_l{

            .mid{
              width:500px;
              .yq{
                color:#000;
              }
              .shopName{
                color:#000;

              }
              .receivables{
                padding-top:20px;
                b{
                  color:#000;

                }
                .midPhone{
                  margin-left:40px;
                }
              }
            }
          }


          .list_r{
            width:120px;
            .money{
              color:#ff523d;
              text-align:right;
            }
            .zcStatus{
              padding-top:20px;
              font-size:24px;
              text-align:right;
            }

          }
        }
      }

    }

</style>
