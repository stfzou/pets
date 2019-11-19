<template>
  <div class="shopNameVisit">
    <div class="cntTop">
      <div class="login_nav">
        <div class="back" @click="back"></div>
        <div class="title">{{shopName}}拜访记录</div>
        <router-link class="addStaffData" :to="{name:'addVisitInfo'}">
          <img src="../../assets/ali-add.png" alt="">
        </router-link>
      </div>
      <div class="nameAndTime flex_r_s_b">
        <!-- <div class="name_l flex_r_f_s">
          <p>姓名:</p>
          <cube-select v-model="staffVal" title="选择员工" :options="staffNameList" @change="nameChange">
          </cube-select>
        </div> -->

        <div class="name_r flex_r_s_b">
          <p>时间:</p>
          <div class="flex_r_s_b timeBox">
            <cube-button class="cube-select" @click="showDatePicker">{{time1}}</cube-button>
            <span>-</span>
            <cube-button class="cube-select" @click="showDatePicker2">{{time2}}</cube-button>
          </div>
        </div>
      </div>
     <!-- <div class="search_box">
      	<div class="search flex_r_s_b">
      		<input type="text" placeholder="输入你要查询的店铺名字" v-model="shopName">
      		<div class="sIcon flex_r_s_c" @click="search">
      			<img src="../../assets/ali-sousuo.png" alt="">
      		</div>
      	</div>
      </div> -->
      <div class="recordsNum">共查询到{{totalNum}}条拜访记录 <span class="down-bf" @click="export2Excel" v-if="parentId==0">下载拜访信息</span></div>
     <!-- <div class="dataNum">2019/7/19共<span>7</span>条拜访记录</div> -->
    </div>
    <div class="cntList">
      <cube-scroll ref="scroll" :options="options" @pulling-up="onPullingUp" @pulling-down="onPullingDown">
      <ul>
        <li class="flex_r_s_b" v-for="item in visitList" @click="link(item)">
          <div class="list_left">
            <div class="userName">{{item.staffName}}</div>
            <div class="dataTime">
              {{item.createTime.split(' ')[0]}}</br>{{item.createTime.split(' ')[1]}}
            </div>
          </div>
          <div class="list_right">
            <div class="shopName">{{item.shopName}}</div>
            <div class="addr">{{item.currentAddr}}</div>
            <div class="img-box flex_r_f_s">
              <img :src="item.gateImg" alt="">
              <img :src="item.displayImgOne" alt="">
              <img :src="item.displayImgTwo" alt="">
            </div>
            <div class="remarks">{{item.remark}}</div>
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
        visitList:[],
        shopName:'',
        xlsData:[],
        parentId:'-1',
        staffVal: '',
        totalNum:'',
        isAdmin:'',
        time1:'',
        time2:'',
        page:0,
        clientId:'',
        viewCompetence:'',//权限
        staffNameList:[],
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
        this.parentId = JSON.parse(localStorage.getItem('staff')).parentId;
        this.clientId = this.$route.query.shopId;
        this.shopName = this.$route.query.shopName;
        this.getList();
        this.getXls();
      }


    },
    methods: {
      nameChange() {
        this.getList();
      },
      export2Excel() {
        　require.ensure([], () => {
      　　　const { export_json_to_excel } = require('../../vendor/Export2Excel');
      　　　const tHeader = ['店铺名称','添加时间','地址','拜访人员','备注'];//生成Excel表格的头部标题栏
      　　　const filterVal = ['shopName', 'createTime','currentAddr','staffName','remark'];//生成Excel表格的内容栏（根据自己的数据内容属性填写）
      　　　const list = this.xlsData;//需要导出Excel的数据
      　　　const data = this.formatJson(filterVal, list);
      　　　export_json_to_excel(tHeader, data, '拜访信息');//这里可以定义你的Excel表的默认名称
      　　})
        },
        formatJson(filterVal, jsonData) {
             return jsonData.map(v => filterVal.map(j => v[j]))
        },
      back() {
        // this.$router.push({
        //   name: 'workOsInfoList'
        // });
        this.$router.go(-1)
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
           this.getList();
           this.getXls();

         }else if(this.time2!=''&& new Date(selectedText.join('-')).getTime()==new Date(self.time2).getTime()){
           alert('不能选相同的时间');
           this.time1 = '';
         }else{
            this.getList();
            this.getXls();
         }
       },
      cancelHandle() {},
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
           this.getList();
           this.getXls();

         }else if(this.time1!=''&& new Date(selectedText.join('-')).getTime()==new Date(self.time1).getTime()){
           alert('不能选相同的时间');
           this.time2 = '';
         }else{
           this.getList();
           this.getXls();
         }
       },
      cancelHandle2() {},
      search(){
        this.getList();
      },
      link(item){
        this.$router.push({
          name:'visitInfoList',
          query:{
            visitInfo:item
          }
        })
      },
      getXls(){
        let self = this;
        self.axios.post(Api.staffApi + '/visit/selectClientVisitAll', this.qs.stringify({
          clientId:self.clientId,
          startTime:self.time1,
          endTime:self.time2,
          shopName:self.shopName
        }), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then((res)=>{
          if(res.data.code==1){
            self.xlsData = res.data.data.list;
          }else{
            alert(res.data.msg)
          }
        })
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
        }else if(this.isAdmin === 0){

          this.axios.get(Api.staffApi+'/business/selectStaffByCompetence?viewCompetence='+self.viewCompetence,{
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
        }

      },
      getList(){//获取拜访记录
        let self = this;
        self.page = 0;
        self.axios.post(Api.staffApi + '/visit/selectClientVisit', this.qs.stringify({
          clientId:self.clientId,
          startTime:self.time1,
          endTime:self.time2,
          shopName:self.shopName,
          pageNo:self.page,
          pageSize:10
        }), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then((res)=>{
          if(res.data.code==1){
            console.log(res)
            setTimeout(() => {
              self.visitList = res.data.data.list;
              if(res.data.data.num==''||res.data.data.num==null){
                self.totalNum = 0;
              }else{
                self.totalNum = res.data.data.num;
              }
              self.$refs.scroll.forceUpdate();
               setTimeout(() => {
              	self.$refs.scroll.refresh();

              }, 100);
            }, 500);
          }else{
            alert(res.data.msg)
          }
        })
      },
      onPullingDown(){

        this.getList();
      },
      onPullingUp(){
        let self = this;
        this.page++;
        self.axios.post(Api.staffApi + '/visit/selectClientVisit', this.qs.stringify({
        	clientId:self.clientId,
        	startTime:self.time1,
        	endTime:self.time2,
        	shopName:self.shopName,
        	pageNo:self.page,
        	pageSize:10
        }), {
        	headers: {
        		'Content-Type': 'application/x-www-form-urlencoded'
        	}
        }).then((res)=>{
          if(res.data.code == 1){
            // self.workTableList = res.data.data.list;
            if(res.data.data.list.length>0){
              console.log(res.data.data.list)
              setTimeout(()=>{
                self.visitList.push(...res.data.data.list)
                self.$refs.scroll.forceUpdate();
                setTimeout(()=>{
                  self.$refs.scroll.refresh()
                },100)

              },500)
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
  .shopNameVisit {
    height: 100%;
    position: relative;
    .cntTop {
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
          font-size: 26px;
          color: #ff523d;
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
            font-size: 26px;
            color: #333;
            margin-right: 15px;
          }
          .cube-select{
            width: 150px;
            height: 50px;
            padding: 8px 10px 5px 20px;
          }
        }
        .name_r{
          width: 400px;
          p{
            font-size: 26px;
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
        padding: 30px 20px 0 20px;
        font-size: 30px;
        color: #333;
        span{
          color:#999;
          margin-left:50px;
        }
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
      top: 260px;
      right: 0;
      bottom: 0;
      ul{
        padding: 0 20px;
        li{
          align-items: flex-start;
          margin-top: 30px;
          padding-top:10px;
          .list_left{
            width: 25%;
            .userName{
             font-size: 30px;
             font-weight: bold;
              color: #333;
              text-align: center;
              padding-bottom: 10px;
            }
            .dataTime{
              font-size: 26px;
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
              font-size: 32px;
              font-weight: bold;
              color: #333;
              padding-bottom: 10px;
            }
            .addr{
              font-size: 26px;
              color: #999;
              line-height: 32px;
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
              font-size: 26px;
              color: #999;
              line-height: 32px;

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
