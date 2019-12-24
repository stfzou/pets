<template>
  <div class="businessManage">
    <div class="businessManageTop">
      <div class="login_nav">
        <div class="back" @click="back"></div>
        <div class="title">商户管理</div>
      </div>
      <div class="regionBox flex_r_f_s">
        <div class="title">区域 :</div>
        <div class="region flex_r_f_s">
          <div class="sheng flex_r_s_b" @click="showAddressPicker" v-for="item in cityData">
            <span>{{item}}</span>
            <i class="cube-select-icon"></i>
          </div>
        </div>
      </div>

      <div class="branchName flex_r_f_s">
        <div class="title">名称 :</div>
        <input type="text" v-model="searchVal" placeholder="公司名称/简称">
        <div class="btn flex_r_s_c">查询</div>
      </div>
    </div>
    <div class="businessManageCnt">
      <cube-scroll ref="scroll" @pulling-up="onPullingUp" @pulling-down="onPullingDown" :options="options">
        <ul class="businessManageList">
          <li class="listItem" v-for="item in shopList">
            <div class="businessName">{{item.shopName}}</div>
            <div class="item addr flex_r_f_s">
              <div class="item_l">店铺地址&nbsp;:&nbsp;</div>
              <div class="item_r">{{item.province}}-{{item.city}}-{{item.area}}</div>
            </div>
            <div class="item xqAddr">{{item.address}}</div>
            <div class="item jyType flex_r_f_s">
              <div class="item_l">经营类型&nbsp;:&nbsp;</div>
              <div class="item_r">{{item.shopParentType}}【{{item.shopChildType|shopChildTypeFilter}}】</div>
            </div>
            <div class="item ticketNum flex_r_f_s">
              <div class="item_l">票券总数&nbsp;:&nbsp;{{item.ticketTotalNum}}</div>
              <div class="item_r">销售金额：￥{{item.sellPrice}}</div>
            </div>
            <div class="item businesStar flex_r_f_s">
              <div class="item_l">店铺星级&nbsp;:&nbsp;</div>
              <div class="item_r">
                <cube-rate :disabled="true" v-model="item.starLevel"></cube-rate>
              </div>
            </div>
            <div class="item startTime flex_r_f_s">
              <div class="item_l">开店时间&nbsp;:&nbsp;</div>
              <div class="item_r">{{item.openShopTime.split(' ')[0]}}</div>
            </div>
            <div class="item chargePerson flex_r_f_s">
              <div class="item_l">业务负责人&nbsp;:&nbsp;</div>
              <div class="item_r">{{item.principalName}}</div>
            </div>
            <div class="item remark">{{item.remark}}</div>
            <div class="btnsBox flex_r_s_b">
              <div class="btn">拜访记录</div>
              <div class="btn" @click="workShowPicker(item)">业务指派</div>
              <div class="btn" @click="diaShow(item)">客户备注</div>
              <div class="btn"><a :href="'https://uri.amap.com/marker?position='+item.longitude+','+item.latitude+'&name='+item.address">地址导航</a></div>
            </div>
          </li>
        </ul>
      </cube-scroll>
    </div>

    <div class="remarkMask flex_r_s_c" v-show="isDialog" @click.stop="diaHide">
      <div class="maskCnt" @click.stop>
        <div class="title">客户备注</div>
        <div class="star flex_r_f_s"><span class="span">客户星级</span>
          <cube-rate v-model="starValue"></cube-rate>
        </div>
        <cube-textarea v-model="remark" :autoExpand="true" :maxlength="200"></cube-textarea>
        <div class="remarkBtn flex_r_f_e">
          <span @click.stop="diaHide">取消</span>
          <span style="color:#ff523d" @click="updataRemark">确认</span>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import Api from '../common/apj.js'
  import {
    provinceList,
    cityList,
    areaList
  } from '../../data/area'


  const addressData = provinceList
  addressData.forEach(province => {
    province.children = cityList[province.value]
    province.children.forEach(city => {
      city.children = areaList[city.value]
    })
  })
  export default {
    data() {
      return {
        cityData: ['省份', '城市', '地区'],
        searchVal:'',
        starValue: 0,
        column: [],
        remark: '',
        shopList: [],
        page:1,
        isDialog: false,
        shopId:0,
        assignVal:0,
        employeeId:0,
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
    filters: {
      shopChildTypeFilter(val) {
        let temp = val.split(',');
        return temp.join('、')
      }
    },
    mounted() {
      this.addressPicker = this.$createCascadePicker({
        title: '城市选择',
        data: addressData,
        onSelect: this.selectHandle,
        onCancel: this.cancelHandle
      });
      this.getShopList();
      this.getAssign();
    },
    methods: {
      back() {
        this.$router.go(-1); //返回上一层
      },
      showAddressPicker() {
        this.addressPicker.show()
      },
      selectHandle(selectedVal, selectedIndex, selectedText) {
        this.cityData = selectedText;
        this.getShopList();
      },
      cancelHandle() {

      },
      workShowPicker(item) {
        let self = this;
        this.shopId = item.shopId;
        if (!this.picker) {
          this.picker = this.$createPicker({
            title: '业务指派',
            data: [self.column],
            onSelect: this.workSelectHandle,
            onCancel: function(){
              self.shopId = 0;
              self.employeeId = 0;
            }
          })
        }
        this.picker.show()
      },
      workSelectHandle(selectedVal, selectedIndex, selectedText) {
        this.employeeId = selectedVal[0];

        this.updataAssign();
      },
      onPullingDown(){
        this.page = 1;
        this.getShopList();
      },
      onPullingUp(){
        let self = this;
        this.page++
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
        self.axios.get(Api.userApi + '/employee/system/selectShopBySearch', {
          params: {
            province:sheng,
            city:shi,
            area:qu,
            keyword:self.searchVal,
            networkId: JSON.parse(localStorage.getItem('userInfo')).network,
            department: JSON.parse(localStorage.getItem('userInfo')).department,
            post: JSON.parse(localStorage.getItem('userInfo')).post,
            employeeId:JSON.parse(localStorage.getItem('userInfo')).employeeId,
            page: self.page,
            rows: 10
          }
        }, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then((res) => {
          if (res.data.code == 1) {
            if(res.data.data.length>1){

              setTimeout(() => {
                self.$refs.scroll.forceUpdate();
                self.shopList.push(...res.data.data);
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
      diaShow(item) {
        this.isDialog = true;
        this.remark = item.remark;
        this.starValue = item.starLevel;
        this.shopId = item.shopId;

      },
      diaHide() {
        this.isDialog = false;
        this.remark = '';
        this.starValue = 0;
        this.shopId = '';
      },
      getShopList() {
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
        self.axios.get(Api.userApi + '/employee/system/selectShopBySearch', {
          params: {
            province:sheng,
            city:shi,
            area:qu,
            keyword:self.searchVal,
            networkId: JSON.parse(localStorage.getItem('userInfo')).network,
            department: JSON.parse(localStorage.getItem('userInfo')).department,
            post: JSON.parse(localStorage.getItem('userInfo')).post,
            employeeId:JSON.parse(localStorage.getItem('userInfo')).employeeId,
            page: 1,
            rows: 10
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
              self.shopList = res.data.data;
            }else{
              setTimeout(() => {
                self.shopList = res.data.data;
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
      updataAssign(){
        let self = this;
        this.axios.post(Api.staffApi+'/employee/system/updateAssignPerson', this.qs.stringify({
        	shopId: this.shopId,
        	employeeId: this.employeeId

        }), {
        	headers: {
        		'Content-Type': 'application/x-www-form-urlencoded'
        	}
        }).then((res)=>{
          if(res.data.code==1){
            let toast = self.$createToast({
              txt: '修改成功',
              type: 'correct'
            })
            toast.show();
            self.getShopList();
          }else{
            alert(res.data.msg)
          }
        })
      },
      updataRemark(){
        let self = this;
        this.axios.post(Api.staffApi+'/employee/system/updateRemarkAndStarLevel', this.qs.stringify({
        	shopId: this.shopId,
        	remark: this.remark,
          starLevel:this.starValue
        }), {
        	headers: {
        		'Content-Type': 'application/x-www-form-urlencoded'
        	}
        }).then((res)=>{
          if(res.data.code==1){
            let toast = self.$createToast({
              txt: '修改成功',
              type: 'correct'
            })
            toast.show();
            self.isDialog = false;
            self.remark = '';
            self.starValue = 0;
            self.shopId = '';
            self.getShopList();
          }else{
            alert(res.data.msg)
          }
        })
      }
    }
  }
</script>

<style lang="scss">
  .businessManage {
    height: 100%;
    position: relative;

    .businessManageTop {
      height: 260px;
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

        span {
          color: #ff523d;
        }
      }
    }

    .regionBox {
      box-sizing: border-box;
      padding: 0 22px;
      padding-top: 20px;

      .title {
        font-size: 26px;
        color: #333;
        width: 80px;
        margin-right: 20px;
      }

      .region {
        width: 500px;

        div {

          /*no*/
          width: 150px;
          margin-right: 20px;
          border: 1px solid #e8e8e8;
          /*no*/
          text-align: center;
          border-radius: 2px;
          /*no*/


          span {
            font-size: 26px;
            color: #333;
            overflow: hide;
            width: 100px;
            height: 50px;
            line-height: 50px;
            display: block;
            overflow: hidden;
            /*内容会被修剪，并且其余内容是不可见的*/
            text-overflow: ellipsis;
            /*显示省略符号来代表被修剪的文本。*/
            white-space: nowrap;
            /*文本不换行*/
            padding-left: 10px;
            box-sizing: border-box;
          }

          img {
            width: 30px;
          }
        }
      }
    }

    .branchName {
      padding: 0 22px;
      padding-top: 20px;
      box-sizing: border-box;

      .title {
        font-size: 26px;
        color: #333;
        width: 80px;
        margin-right: 20px;
      }

      input {
        height: 50px;
        border: 1px solid #999;
        box-sizing: border-box;
        margin-right: 50px;
        width: 400px;
        padding: 0 15px;
        font-size: 26px;
      }

      .btn {
        height: 50px;
        width: 100px;
        border-radius: 25px;
        color: #fff;
        background: #ff523d;
        font-size: 26px;
      }
    }
  }

  .businessManageCnt {
    // padding:0 22px;
    position: absolute;
    top: 260px;
    left: 0;
    right: 0;
    bottom: 0;
    box-sizing: border-box;

    .businessManageList {
      padding: 22px;

      .listItem {
        background: rgba(255, 255, 255, 1);
        box-shadow: 0px 4px 12px 0px rgba(15, 15, 15, 0.16);
        border-radius: 10px;
        padding: 29px;
        box-sizing: border-box;
        box-sizing: border-box;
        margin-bottom: 30px;

        .cube-rate-item {
          width: 30px;
        }

        .businessName {
          color: #000000;
          padding-top: 30px;
          font-weight: bold;
        }

        .item {
          padding-top: 30px;
        }
        .xqAddr{
          line-height:40px;
        }
        .jyType{
          padding-top:10px;
          align-items:flex-start;
          .item_l{
            padding-top:10px;
          }
          .item_r{
            width:450px;
            line-height:40px;
          }
        }
        .ticketNum {
          .item_l {
            margin-right: 50px;
          }
        }

        .chargePerson {
          color: #000000;
          font-size: 30px;

        }

        .btnsBox {
          padding-top: 30px;

          .btn {
            padding: 12px;
            background: #f1f1f1;
            font-size: 24px;
            color: #333;
            border-radius: 10px;
            a{
              color:#333;
            }
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
    z-index: 10000;
    background: rgba(0, 0, 0, 0.6);

    .maskCnt {

      width: 580px;
      height: 420px;
      background: rgba(255, 255, 255, 1);
      border-radius: 10px;
      padding: 0 15px;
      box-sizing: border-box;

      .title {
        color: #000;
        text-align: center;
        padding: 30px 0;
      }

      .star {
        .span {
          margin-right: 30px;
        }
      }

      .cube-rate-item {
        width: 40px;
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
</style>
