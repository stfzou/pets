<template>
  <div class="workTable">
      <div class="cntTop">
        <div class="login_nav">
          <div class="back" @click="back"></div>
          <div class="title">工作报表</div>
          <router-link class="addStaffData" :to="{name:'addWorkTable'}">
            <img src="../../assets/ali-add.png" alt="">
          </router-link>
        </div>
        <div class="nameAndTime flex_r_s_b">
          <div class="name_l flex_r_f_s">
            <p>姓名:</p>
            <cube-select v-model="staffVal" title="选择员工" :options="staffNameList" @change="nameChange">
            </cube-select>
          </div>

          <div class="name_r flex_r_s_b">
            <p>时间:</p>
            <div class="flex_r_s_b timeBox">
              <cube-button class="cube-select" @click="showDatePicker">{{time1}}</cube-button>
              <span>-</span>
              <cube-button class="cube-select" @click="showDatePicker2">{{time2}}</cube-button>
            </div>
          </div>
        </div>
         <div class="recordsNum">共查询到{{num}}条工作表</div>
      </div>
      <div class="cntList">
        <cube-scroll ref="scroll" :options="options" @pulling-up="onPullingUp" @pulling-down="onPullingDown">
        <ul>
          <li class="flex_r_s_b" v-for="item in workTableList" @click="link(item)">
            <div class="list_left">
              <div class="userName">{{item.name}}</div>
              <div class="time">{{item.createTime}}</div>
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
          staffNameList:[{text:'王保长',value:'1'}],
          staffVal:'',
          workTableList:[],
          page:0,
          isAdmin:'',
          num:0,
          viewCompetence:'',
          time1:'',//时间文本值
          time2:'',//时间文本值
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
     mounted() {
       if(JSON.parse(localStorage.getItem('staff'))== null){

       	this.$router.push({
       		name:'workOsLogin'
       	})

       }else{

       	if(JSON.parse(localStorage.getItem('staff')).parentId === 0){
       		this.isAdmin = 1;
          this.staffVal = -1;
          this.staffNameList = [{value:-1,text:'全部'}]

       	}else{
          this.isAdmin = 0;
          this.staffVal = JSON.parse(localStorage.getItem('staff')).staffId;
          this.viewCompetence = JSON.parse(localStorage.getItem('staff')).viewCompetence;
          console.log(JSON.parse(localStorage.getItem('staff')).viewCompetence)
          this.staffNameList = [{value:JSON.parse(localStorage.getItem('staff')).staffI,text:'自己'}]
        }
        this.getStaffName();
        this.getWorkTable();
       }


     },
     methods:{
       back(){
       	this.$router.push({
       		name:'workOsInfoList'
       	});
       },
       nameChange(){
         // console.log(this.staffNameList)
        this.getWorkTable();
       },
       showDatePicker() {
         if (!this.datePicker) {
           this.datePicker = this.$createDatePicker({
             title: '时间选择',
             min: new Date(2008, 7, 8),
             max: new Date(),
             value: new Date(),
             onSelect: this.selectHandle,
             onCancel: this.cancelHandle
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
           this.workTableList = [];
           this.getWorkTable();
         }else if(this.time2!=''&& new Date(selectedText.join('-')).getTime()==new Date(self.time2).getTime()){
           alert('不能选相同的时间');
           this.time1 = '';
         }else{
           this.workTableList = [];
           this.getWorkTable();
         }
       },
       cancelHandle() {

       },
      showDatePicker2() {
         if (!this.datePicker2) {
           this.datePicker2 = this.$createDatePicker({
             title: '时间选择',
             min: new Date(2008, 7, 8),
             max: new Date(),
             value: new Date(),
             onSelect: this.selectHandle2,
             onCancel: this.cancelHandle2
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
           this.workTableList = [];
           this.getWorkTable();
         }else if(this.time1!=''&& new Date(selectedText.join('-')).getTime()==new Date(self.time1).getTime()){
           alert('不能选相同的时间');
           this.time2 = '';
         }else{
           this.workTableList = [];
           this.getWorkTable();
         }
       },
      cancelHandle2() {

      },
      getStaffName(){//获取员工名字
       let self = this;

       if(this.isAdmin === 1){

         this.axios.get(Api.staffApi+'/business/selectStaffAll',{
         		headers: {
         			'Content-Type': 'application/x-www-form-urlencoded'
         		}
         	}).then(function(res) {
              if(res.data.code == 1){
                 console.log(res.data.data)
                 res.data.data.forEach((e)=>{
                   self.staffNameList.push({
                     value:e.id,
                     text:e.name
                   })
                 })

              }else{
                alert(res.data.msg)
              }
         	})
          return false;
       }else if(this.isAdmin === 0&&this.viewCompetence!=''){

         this.axios.get(Api.staffApi+'/business/selectStaffByCompetence?viewCompetence='+self.viewCompetence,{
         		headers: {
         			'Content-Type': 'application/x-www-form-urlencoded'
         		}
         	}).then(function(res) {
              if(res.data.code == 1){
                 // console.log(res.data.data)
                 res.data.data.forEach((e)=>{
                   self.staffNameList.push({
                     value:e.id,
                     text:e.name
                   })
                 })

              }else{
                alert(res.data.msg)
              }
         	})
       }else{
          self.staffNameList = [{value:self.staffVal,text:'自己'}]
       }

     },
      getWorkTable(){
        let self = this;
        self.page = 0;
        self.axios.post(Api.staffApi + '/workReport/selectWorkReportByCompetence', this.qs.stringify({
        	isAdmin:self.isAdmin,
          staffIds:self.staffVal,
          startTime:self.time1,
          endTime:self.time2,
          pageNo:self.page,
          pageSize:1
        }), {
        	headers: {
        		'Content-Type': 'application/x-www-form-urlencoded'
        	}
        }).then((res)=>{
          if(res.data.code == 1){


            setTimeout(() => {
              self.workTableList = res.data.data.list;
              self.num = res.data.data.num;

            	self.$refs.scroll.forceUpdate();
              setTimeout(() => {
              	self.$refs.scroll.refresh();
              }, 100)
            }, 500)
          }else{
            alert(res.data.msg)
          }
        })
      },
      link(item){
        this.$router.push({
          name:'workTableXq',
          params:{
            tbInfo:item
          }
        })
      },
      onPullingDown(){
        this.page = 0;
        this.getWorkTable();
      },
      onPullingUp(){
        let self = this;
        this.page++;
        self.axios.post(Api.staffApi + '/workReport/selectWorkReportByCompetence', this.qs.stringify({
        	isAdmin:self.isAdmin,
        	staffIds:self.staffVal,
        	startTime:self.time1,
        	endTime:self.time2,
        	pageNo:self.page,
        	pageSize:1
        }), {
        	headers: {
        		'Content-Type': 'application/x-www-form-urlencoded'
        	}
        }).then((res)=>{
          if(res.data.code == 1){
            // self.workTableList = res.data.data.list;
            if(res.data.data.list.length>0){

              setTimeout(() => {
                self.workTableList.push(...res.data.data.list)
              	self.$refs.scroll.forceUpdate();
              	setTimeout(() => {
              		self.$refs.scroll.refresh();
              	}, 100)
              }, 500)


            }else{
              setTimeout(() => {
              	self.$refs.scroll.forceUpdate();
              }, 500)
            }

          }else{
            alert(res.data.msg)
            setTimeout(() => {
            	self.$refs.scroll.forceUpdate();
            }, 500)
          }
        })
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
            padding: 10px 10px 5px 20px;
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
              font-size:28px;
              color: #333;
            }
            .time{
              font-size:26px;
              color: #333;
              padding-top: 10px;
            }
          }
          .list_right{
            color: #999;
            font-size: 28px;
          }
        }
      }
    }
  }
</style>
