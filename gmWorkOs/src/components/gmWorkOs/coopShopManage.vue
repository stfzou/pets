<template>
  <div class="coopShopManage">
      <div class="coopShopManageTop">
        <div class="login_nav">
        	<div class="back" @click="back"></div>
        	<div class="title">合作商户管理({{totalNum}})</div>
          <router-link :to="{name:'addCoopShop'}">添加</router-link>
        </div>
        <div class="typeBox flex_r_s_b">
          <div class="flex_r_s_b"><input type="text" @click="typeShowPicker" v-model="typeName" placeholder="类型" readonly="readonly"><i class="cubeic-pulldown"></i></div>
          <div class="flex_r_s_b"><input type="text" @click="natureShowPicker" v-model="natureName" placeholder="性质" readonly="readonly"><i class="cubeic-pulldown"></i></div>
          <div class="flex_r_s_b"><input type="text" @click="staffShowPicker" v-model="staffName" placeholder="营业员" readonly="readonly"><i class="cubeic-pulldown"></i></div>
        </div>
        <div class="inputBox flex_r_s_b">
          <input type="text" placeholder="请输入商户名称" v-model="shopName">
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
      </div>
      <div class="coopShopManageCnt">
        <cube-scroll ref="scroll" @pulling-up="onPullingUp" @pulling-down="onPullingDown" :options="options">
        <ul class="coopShopManageList">
          <li v-for="item in coopeShopList">
            <div class="shopName flex_r_s_b"><span>{{item.shopName}}</span><div class="edit">编辑</div></div>
            <div class="shopType flex_r_f_s"><div class="type">[类型:{{item.typeName}}]</div><div class="xz">[性质:{{item.natureName}}]</div></div>
            <div class="fzr flex_r_s_b">
              <div class="div_l">负责人:{{item.principal}}</div>
              <div class="div_r">电话:15283133594</div>
            </div>
            <div class="addr">地址:{{item.province}}{{item.city}}{{item.area}}{{item.address}}</div>
            <div class="remark">备注:{{item.remark}}</div>
            <div class="ywy">业务员:{{item.employeeName}}</div>
            <div class="imgBox flex_r_f_s">
              <div>
                <img :src="item.imgA" @click="showImagePreview(item.imgA)" alt="">
              </div>
              <div>
                <img :src="item.imgB" @click="showImagePreview(item.imgB)" alt="">
              </div>
              <div>
                <img :src="item.imgC" @click="showImagePreview(item.imgC)" alt="">
              </div>
            </div>
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
        val:'',
        time1:'',
        time2:'',
        typeData:[],
        typeVal:'',
        typeName:'',
        natureData:[],
        natureVal:'',
        natureName:'',
        staffData:[],
        staffVal:'',
        staffName:'',
        gmNum:'',
        phone:'',
        shopName:'',
        coopeShopList:[],
        page:0,
        totalNum:0,
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
      this.getDeclareAll();
      this.getCooperationTypeAll();
      this.getAssign();
      this.getCoopeShop();
    },
    methods:{
      back(){
      
      	this.$router.go(-1); //返回上一层
      },
      onPullingUp(){
        let self = this;
        self.page++;
        self.axios.post(Api.userApi + '/cooperation/selectCooperationShopsManager',this.qs.stringify({
          shopName:self.shopName,
          userNo:self.gmNum,
          typeId:self.typeVal,
          natureId:self.natureVal,
          employeeId:self.staffVal,
          phone:self.phone,
          // startTime:self.time1,
          // endTime:self.time2,
          pageNo:self.page,
          pageSize:5
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
              	self.coopeShopList.push(...res.data.data.list);
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
            setTimeout(() => {
              self.$refs.scroll.forceUpdate();
            	setTimeout(() => {
            		self.$refs.scroll.refresh();
            	}, 100)
            }, 500)
          }
        })
      },
      onPullingDown(){
        this.getCoopeShop();
      },
      showImagePreview(img) {
        this.$createImagePreview({
      	imgs: [img]
        }).show()
      },
      search(){
        if(this.time1!=''&&this.time2==''){
          this.errTip('请填写结束时间')
        }else{
          this.getCoopeShop();
        }
      },
      errTip(msg){
        let toast = this.$createToast({
        	txt: msg,
        	type: 'error'
          })
        toast.show()
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
      staffShowPicker() {
        let self = this;
            if (!this.staffPicker) {
              this.staffPicker = this.$createPicker({
                title: '营业员',
                data: [self.staffData],
                onSelect:function (selectedVal, selectedIndex, selectedText) {
                    self.staffVal = selectedVal[0]
                    self.staffName = selectedText[0]
                },
                onCancel:function(){

                }
              })
            }
            this.staffPicker.show()
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
              self.staffData.push({text:e.name,value:e.employeeId})
            })

          }else{
            alert(res.data.msg)
          }
        })
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
      getCoopeShop(){
        let self = this;
        self.page = 0;
        self.axios.post(Api.userApi + '/cooperation/selectCooperationShopsManager',this.qs.stringify({
          shopName:self.shopName,
          userNo:self.gmNum,
          typeId:self.typeVal,
          natureId:self.natureVal,
          employeeId:self.staffVal,
          phone:self.phone,
          // startTime:self.time1,
          // endTime:self.time2,
          pageNo:0,
          pageSize:5
        }), {
          headers: {
          	'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then((res) => {
          if (res.data.code == 1) {

            self.totalNum = res.data.data.num;
            if(res.data.data.list.length<1){
              alert('暂无数据')
              self.coopeShopList = res.data.data.list;
            }else{
              setTimeout(() => {
                self.$refs.scroll.forceUpdate();
              	self.coopeShopList = res.data.data.list;
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
      showDatePicker() {
         if (!this.datePicker) {
           this.datePicker = this.$createDatePicker({
             title: '时间选择',
             min: new Date(2008, 7, 8),
             max: new Date(),
             value: new Date(),
             columnCount:3,
             onSelect: this.selectHandle,
             onCancel: function(){}
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

          this.time1 = selectedText.join('-');
          this.time2 = '';

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
         }
       },
    }
  }
</script>

<style lang="scss">
  .coopShopManage{
    height:100%;
    position: relative;
    .coopShopManageTop{
      height:470px;
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
    }
      .typeBox{
        padding:30px 20px 0 20px;
        box-sizing:border-box;
        div{
          width:200px;
          height:60px;
          background:#f1f1f1;
          border-radius:40px;
          padding:0 20px;
          box-sizing:border-box;
          input{
            width:150px;
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

    .coopShopManageCnt{
      position:absolute;
      top:500px;
      left:0;
      right:0;
      bottom:0;
      box-sizing:border-box;
      .coopShopManageList{
        padding:10px 20px 20px 20px;
        li{
          box-shadow:0px 4px 12px 0px rgba(15,15,15,0.16);
          border-radius:10px;
          padding:30px 20px;
          .imgBox{
            padding-top:30px;
            div{
              width:150px;
              height:150px;
              margin-right:15px;
              img{
                display: block;
                width: 100%;
                height: 100%;
                object-fit: cover;
              }
            }
          }
          .shopName{
            color:#000;
            font-size:26px;
            .edit{
              color:#ff523d;
            }
          }
          .shopType{
            padding-top:30px;
            color:#000;
            .xz{
              margin-left:30px;
            }
          }
          .fzr{
            padding-top:30px;
          }
          .addr{
            padding-top:30px;
          }
          .remark{
            padding-top:30px;
          }
          .ywy{
            padding-top:30px;
          }
          .imgBox{
            padding-top:30px;
          }
        }
      }
    }
  }
</style>
