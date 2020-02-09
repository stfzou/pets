<template>
  <div class="moneyDeclareManage">
    <div class="moneyDeclareManageTop">
     <div class="login_nav">
     	<div class="back" @click="back"></div>
     	<div class="title">合作商户管理({{totalNum}})</div>
       <router-link :to="{name:'addMoneyDeclare'}">添加</router-link>
     </div>
     <div class="typeBox flex_r_s_b">
       <div class="flex_r_s_b" @click="typeShowPicker"><input type="text" readonly="readonly" placeholder="类型" v-model="typeName"><i class="cubeic-pulldown"></i></div>
       <div class="flex_r_s_b" @click="natureShowPicker"><input type="text" readonly="readonly" placeholder="性质" v-model="natureName"><i class="cubeic-pulldown"></i></div>
     </div>
     <div class="inputBox flex_r_s_b">
       <input type="text" placeholder="请输入名称" v-model="shopName">
       <input type="number" placeholder="请输入骨米号" v-model.number="gmNum">
     </div>
     <div class="timeBox flex_r_s_b">
       <input type="text" v-model="time1" @click="showDatePicker" placeholder="开始时间" readonly="readonly">
       <span></span>
       <input type="text" v-model="time2" @click="showDatePicker2" placeholder="结束时间" readonly="readonly">
     </div>
     <div class="shopNameSearch flex_r_s_b">
       <input type="number" placeholder="请输入电话号码" v-model.number="phone">
       <span class="searchBtn flex_r_s_c" @click="search">查询</span>
     </div>
      <div class="storeInfo">
        <div class="title">汇款总额</div>
        <div class="registerNum flex_r_s_b">
          <div>现金 : {{sumCash}}</div>
          <div>骨币 : {{sumBoneCurrency}}</div>
          <div>骨豆 : {{sumBoneBean}}</div>
        </div>
      </div>
    </div>
    <div class="moneyDeclareManageCnt">
      <cube-scroll ref="scroll" @pulling-up="onPullingUp" @pulling-down="onPullingDown" :options="options">
        <ul class="moneyDeclareManageList">
           <li class="flex_r_s_b" v-for="(item,index) in declareList">
             <div class="list_l">
               <div class="mid">
                 <div class="shopName">{{item.shopName}}</div>
                 <div class="receivables flex_r_f_s">
                   <div>收款人: <b>{{item.principal}}</b></div>
                   <div class="midPhone">电话: <b>15283133594</b></div>
                 </div>
                 <div class="receivables flex_r_f_s">
                   <div>类型: <b>{{item.typeName}}</b></div>
                   <div class="midPhone">请款人: <b>{{item.principal}}</b></div>
                 </div>
                 <div class="statusDesc" v-if="item.status==3"><span style="color:#666">审批备注:</span>{{item.statusDesc}}</div>
                 <div class="declareTime">{{item.createTime}}</div>
               </div>
             </div>

             <div class="list_r">
               <div class="money">¥{{item.declarePrice}}</div>
               <div class="zcStatus moeyType">[{{item.payType|payText}}]</div>
               <div class="zcStatus spStatus">
                <span v-if="item.status==0">未审批</span>
                <span v-if="item.status==1" style="color:#3dc0ff">已审批</span>
                <span v-if="item.status==2" style="color:greenyellow">已支付</span>
                <span v-if="item.status==3" style="color:#ff523d">已拒绝</span>
               </div>
               <div class="spBtn flex_r_s_c" @click="diaShow(item)" v-if="item.status==0">审批</div>
             </div>
           </li>
        </ul>
      </cube-scroll>
    </div>
    <div class="remarkMask flex_r_s_c" v-show="isDialog" @click.stop="diaHide">
      <div class="maskCnt" @click.stop>
        <div class="title">审批</div>
        <div class="radioBox">
          <cube-radio-group v-model="radioVal" @input="radioChange"  :horizontal="true" position="right" :options="radiOptions" />
        </div>
        <cube-textarea v-model="remark" :disabled="isDisabled" placeholder="请填写不批准原因" :autoExpand="true" :maxlength="200"></cube-textarea>
        <div class="remarkBtn flex_r_f_e">
          <span @click.stop="diaHide">取消</span>
          <span style="color:#ff523d" @click="commit">确认</span>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import Api from '../common/apj.js'

  export default{
    data(){
      return{
        id:'',
        employeeId:'',
        isDisabled:false,
        radioVal:0,
        radiOptions:[{label:'不批准',value: 0},{label:'批准',value: 1}],
        remark:'',
        isDialog:false,
        sumCash:0,
        totalNum:0,
        sumBoneCurrency:0,//骨币
        sumBoneBean:0,//骨豆
        declareList:[],
        typeData:[],
        typeVal:'',
        typeName:'',
        natureData:[],
        natureVal:'',
        natureName:'',
        userName:'',
        shopName:'',
        gmNum:'',
        page:0,
        time1:'',
        time2:'',
        phone:'',
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
      this.employeeId = JSON.parse(localStorage.getItem('userInfo')).employeeId;
      this.getDeclareAll();
      this.getCooperationTypeAll();
      this.getDeclareList();
    },
    filters:{
        payText(val){
          if(val==1){
            return '现金'
          }else if(val==2){
            return '骨币'
          }else if(val==3){
            return '骨豆'
          }
        }
    },
    methods: {
      back(){
      	this.$router.go(-1); //返回上一层
      },
      radioChange(val){
        if(val==0){
          this.isDisabled = false;
        }else{
          this.isDisabled = true;
        }
      },
      search(){
        if(this.time1!=''&&this.time2==''){
          this.errTip('请填写结束时间')
        }else{
          this.getDeclareList();
        }
      },
      commit(){
        let self = this;
        if(self.radioVal==0&&self.remark==''){
          self.errTip('请填写不批准原因');
        }else{
          self.axios.post(Api.userApi + '/cooperation/updateDeclareApproval',this.qs.stringify({
            employeeId:JSON.parse(localStorage.getItem('userInfo')).employeeId,
            id:self.id,
            status:self.radioVal,
            statusDesc:self.remark
          }), {
            headers: {
            	'Content-Type': 'application/x-www-form-urlencoded'
            }
          }).then((res)=>{
            if(res.data.code==1){
              self.isDialog = false;
              self.id = '';
              self.remark = '';
              let toast = this.$createToast({
                  txt: '审批完成',
                  type: 'correct'
              })
              toast.show()
              self.getDeclareList();
            }else{
              alert(res.data.msg)
            }
          })
        }

      },
      diaShow(item) {
        this.isDialog = true;
        this.id = item.id;

        // this.remark = item.remark;

      },
      diaHide() {
        this.isDialog = false;
        this.radioVal = 0;
        this.remark = '';
        this.id = '';
      },
      errTip(msg){
        let toast = this.$createToast({
        	txt: msg,
        	type: 'error'
          })
        toast.show()
      },
      getDeclareAll(){//查询商户性质
        let self = this;
        self.axios.post(Api.userApi + '/cooperation/selectCooperationNatureAll',{
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then((res) => {
          if (res.data.code == 1) {
            res.data.data.forEach((e)=>{
              self.natureData.push({
                text:e.name,
                value:e.id
              })
            })

          } else {
            alert(res.data.msg)
          }
        })
      },
      getCooperationTypeAll(){//查询类型
        let self = this;
        self.axios.post(Api.userApi + '/cooperation/selectCooperationTypeAll',{
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then((res) => {
          if (res.data.code == 1) {
            res.data.data.forEach((e)=>{
              self.typeData.push({
                text:e.name,
                value:e.id
              })
            })

          } else {
            alert(res.data.msg)
          }
        })
      },
      onPullingDown(){
        this.getDeclareList();
      },
      onPullingUp(){
        let self = this;
        self.page++;
        let startTime = '';
        let endTime = '';
        self.page = 0;
        if(self.time1!=''){
          startTime = self.time1+' 00:00';
        }else{

        }
        if(self.time2!=''){
          endTime = self.time2+' 00:00';
        }
        self.axios.post(Api.userApi + '/cooperation/selectCooperationDeclareManager',this.qs.stringify({
          shopName:self.shopName,
          userNo:self.gmNum,
          typeId:self.typeVal,
          natureId:self.natureVal,
          employeeId:'',
          phone:self.phone,
          startTime:startTime,
          endTime:endTime,
          pageNo:self.page,
          pageSize:10
        }), {
          headers: {
          	'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then((res) => {
          if (res.data.code == 1) {
            self.totalNum = res.data.data.num;
            if(res.data.data.list>0){
              setTimeout(() => {
                self.$refs.scroll.forceUpdate();
              	self.declareList.push(...res.data.data.list);
              	setTimeout(() => {
              		self.$refs.scroll.refresh();
              	}, 100)
              }, 500)
            }else{
              setTimeout(() => {
                self.$refs.scroll.forceUpdate();
              	setTimeout(() => {
              		self.$refs.scroll.refresh();
              	}, 100)
              }, 500)
            }

          } else {
            alert(res.data.msg)
          }
        })
      },
      typeShowPicker() {
        let self = this;
            if (!this.typePicker) {
              this.typePicker = this.$createPicker({
                title: '类型',
                data: [self.typeData],
                onSelect: function (selectedVal, selectedIndex, selectedText) {

                  self.typeVal = selectedVal[0]
                  self.typeName = selectedText[0]

                },
                onCancel: function () {

                },
              })
            }
            this.typePicker.show()
      },
      natureShowPicker() {
            let self = this;
            if (!this.naturePicker) {
              this.naturePicker = this.$createPicker({
                title: '性质',
                data: [self.natureData],
                onSelect: function (selectedVal, selectedIndex, selectedText) {
                  self.natureVal = selectedVal[0]
                  self.natureName = selectedText[0]
                },
                onCancel: function () {

                }
              })
            }
            this.naturePicker.show()
      },

      showDatePicker() {
         if (!this.datePicker) {
           this.datePicker = this.$createDatePicker({
             title: '时间选择',
             min: new Date(2008, 7, 8),
             max: new Date(),
             value: new Date(),
             columnCount:3,
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

         }else if(this.time2!=''&& new Date(selectedText.join('-')).getTime()==new Date(self.time2).getTime()){

           this.time1 = selectedText.join('-');
           this.time2 = '';

         }else{

         }
       },


      showDatePicker2() {
         if (!this.datePicker2) {
           this.datePicker2 = this.$createDatePicker({
             title: '时间选择',
             min: new Date(2008, 7),
             max: new Date(),
             columnCount:3,
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

         }
         this.time2 = selectedText.join('-');
         if(this.time1!=''&& new Date(selectedText.join('-')).getTime()<new Date(self.time1).getTime()){
           let temp = this.time2;
           this.time2 = this.time1;
           this.time1 = temp;

         }else if(this.time1!=''&& new Date(selectedText.join('-')).getTime()==new Date(self.time1).getTime()){
           this.time1 = selectedText.join('-');
           this.time2 = '';

         }else{

         }
       },
      getDeclareList(){
         let self = this;
         let startTime = '';
         let endTime = '';
         self.page = 0;
         if(self.time1!=''){
           startTime = self.time1+' 00:00';
         }else{

         }
         if(self.time2!=''){
           endTime = self.time2+' 00:00';
         }

         self.axios.post(Api.userApi + '/cooperation/selectCooperationDeclareManager',this.qs.stringify({
           shopName:self.shopName,
           userNo:self.gmNum,
           typeId:self.typeVal,
           natureId:self.natureVal,
           employeeId:'',
           phone:self.phone,
           startTime:startTime,
           endTime:endTime,
           pageNo:0,
           pageSize:10
         }), {
           headers: {
           	'Content-Type': 'application/x-www-form-urlencoded'
           }
         }).then((res) => {
           if (res.data.code == 1) {
             //console.log(res)
             self.totalNum = res.data.data.num;
             self.sumCash = res.data.data.sumCash;
             self.sumBoneCurrency = res.data.data.sumBoneCurrency;
             self.sumBoneBean = res.data.data.sumBoneBean;
             if(res.data.data.list.length<1){
               alert('暂无数据')
               self.declareList = res.data.data.list;
             }else{
               setTimeout(() => {
                self.$refs.scroll.forceUpdate();
               	self.declareList = res.data.data.list;
               	setTimeout(() => {
               		self.$refs.scroll.refresh();
               	}, 100)
               }, 500)
             }

           } else {
             alert(res.data.msg)
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
          input{
            width:200px;
            background:#f1f1f1;
          }
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
        input{
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
              .declareTime{
                font-size:24px;
                padding-top:20px;
              }
              .statusDesc{
                line-height:40px;
                padding-top:10px;
                color:#ff523d;
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
            .spBtn{
              width:80px;
              height:40px;
              background:rgba(255,82,61,1);
              border:1px solid rgba(221,221,221,1);
              border-radius:40px;
              color:#fff;
              margin:20px 0 0 40px;
            }
          }
        }
      }

    }
    .remarkMask {
      position: fixed;
      left: 0;
      top: 0;
      height: 100%;
      width: 100%;
      z-index: 100;
      background: rgba(0, 0, 0, 0.6);

      .maskCnt {

        width: 580px;
        height: 480px;
        background: rgba(255, 255, 255, 1);
        border-radius: 10px;
        padding: 0 15px;
        box-sizing: border-box;

        .title {
          color: #000;
          text-align: center;
          padding: 30px 0;
        }

        .cube-textarea-wrapper {
          margin-top: 30px;
          height: 180px;
        }

        .remarkBtn {
          padding-top: 30px;
        }

      }
    }
  }


</style>
