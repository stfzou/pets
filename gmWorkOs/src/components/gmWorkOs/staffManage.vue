<template>
	<div class="staffManage">

      <div class="branchManageTop">
        <div class="login_nav">
        	<div class="back" @click="back"></div>
        	<div class="title">员工管理</div>
          <router-link :to="{name:'addStaff'}">添加员工</router-link>
        </div>
        <div class="regionBox flex_r_f_s">
          <div class="title">区域  :</div>
          <div class="region flex_r_f_s">
            <div class="sheng flex_r_s_b" @click="showAddressPicker" v-for="item in cityData">
            	<span>{{item}}</span>
            	<i class="cube-select-icon"></i>
            </div>
          </div>
        </div>
        <div class="branchName flex_r_f_s">
          <div class="title">名称  :</div>
          <input type="text" v-model="keyword" placeholder="请输入员工名称/手机号码">
          <div class="btn flex_r_s_c" @click="getStaffInfo">查询</div>
        </div>
      </div>



    <div class="branchManageCnt">
      <cube-scroll ref="scroll" @pulling-up="onPullingUp" @pulling-down="onPullingDown" :options="options">
      <div class="branchManageList">
        <ul>
          <li v-for="item in staffList">
            <div class="companyNameBox flex_r_s_b">
              <div class="companyName">
                {{item.name}}<b style="color:#ff523d">[{{item.department|departmentFilter}}]</b>
                <b style="color: #2fcfec;">[{{item.post|postFilter}}]</b>
                <b v-if="item.status==1" style="color: #32e9b8;">[正常]</b><b v-else style="color:red;">[禁用]</b>
              </div>
              <div class="btn flex_r_s_c" @click="edit(item)">编辑</div>
            </div>
            <div class="abbreviation"><span>{{item.phone}}</span></div>
            <div class="listItem">{{item.province}}-{{item.city}}-{{item.area}}</div>
            <div class="listItem">用户数量:{{item.userNum}}</div>
            <div class="listItem">商户数量:{{item.shopNum}}</div>
            <div class="listItem">添加日期:2019-11-12</div>
          </li>
        </ul>
      </div>
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
	export default {
		data() {
			return {
        cityData: ['省份', '城市', '地区'],
        networkId:'',
        post:JSON.parse(localStorage.getItem('userInfo')).post,
        department:JSON.parse(localStorage.getItem('userInfo')).department,
        staffList:[],
        keyword:'',
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
        page:1
			}
		},
		mounted() {
      this.addressPicker = this.$createCascadePicker({
      	title: '城市选择',
      	data: addressData,
      	onSelect: this.selectHandle,
      	onCancel: this.cancelHandle
      });
      this.networkId = JSON.parse(localStorage.getItem('userInfo')).network;
      this.getStaffInfo();
		},
    filters:{
      departmentFilter(val){
        let departmentOptions = [{value:1,text:'办公室'},{value:2,text:'运营部'},{value:3,text:'客服部'},{value:4,text:'内勤部'}]
        let text = '';
        departmentOptions.forEach((e)=>{
          if(val==e.value){
            text = e.text;
          }
        })
        return text;
      },
      postFilter(val){
        let postOptions = [{value:1,text:'经理'},{value:2,text:'主管'},{value:3,text:'区长'},{value:4,text:'组长'},{value:5,text:'职员'}]
        let text = '';
        postOptions.forEach((e)=>{
          if(val==e.value){
            text = e.text;
          }
        })
        return text;
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
        this.getStaffInfo();
      },
      cancelHandle() {

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
       self.axios.get(Api.userApi + '/employee/system/selectEmployeeBySearch',{
           params: {
           province:sheng,
           city:shi,
           area:qu,
           keyword:self.keyword,
           networkId:self.networkId,
           department:self.department,
           post:self.post,
           page:self.page,
           rows:10
         }
       },{
         headers: {
           'Content-Type': 'multipart/form-data'
         }
       }).then((res) => {
         if (res.data.code == 1) {
           //console.log(res)
           if(res.data.data.length>0){
             setTimeout(() => {
              self.$refs.scroll.forceUpdate();
             	self.staffList.push(...res.data.data);
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
           	self.staffList = res.data.data;
           	setTimeout(() => {
           		self.$refs.scroll.refresh();
           	}, 100)
           }, 500)
         }
       })
      },
      onPullingDown(){
        this.page = 1;
        this.getStaffInfo();
      },
      edit(item){
        this.$router.push({
          name:'editStaff',
          query:{
            employeeId:item.employeeId
          }
        })
      },
      getStaffInfo(){
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

        self.axios.get(Api.userApi + '/employee/system/selectEmployeeBySearch',{
          params: {
          	province:sheng,
          	city:shi,
            area:qu,
            keyword:self.keyword,
            networkId:self.networkId,
            department:self.department,
            post:self.post,
            page:1,
            rows:10
          }
        },{
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then((res) => {
          if (res.data.code == 1) {
            //console.log(res)
            if(res.data.data.length<1){
              alert('暂无数据')
              self.staffList = res.data.data;
            }else{
              setTimeout(() => {
                self.$refs.scroll.forceUpdate();
              	self.staffList = res.data.data;
              	setTimeout(() => {
              		self.$refs.scroll.refresh();
              	}, 100)
              }, 500)
            }

          } else {
            alert(res.data.msg)
            setTimeout(() => {
              self.$refs.scroll.forceUpdate();
            	self.staffList = res.data.data;
            	setTimeout(() => {
            		self.$refs.scroll.refresh();
            	}, 100)
            }, 500)
          }
        })
      }
    }
  }

</script>

<style lang="scss">
	.staffManage {
    height:100%;
    position: relative;
    .branchManageTop{
      height:260px;
    }
		.login_nav {
				height: 42px;
				padding: 22px 0;
				position: relative;
				border-bottom: 1px solid #e8e8e8;
				a{
					width: 100px;
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
    .regionBox{

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
       .title{
         font-size:26px;
         color:#333;
         width:80px;
         margin-right:20px;
       }
       input{
         height:50px;
         border:1px solid #999;
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
    .branchManageCnt{
      padding:0 22px;
      position:absolute;
      top:260px;
      left:0;
      right:0;
      bottom:0;
      box-sizing:border-box;
      .branchManageList{
        font-size:26px;
        color:#666;

        ul{
          li{
            border-bottom:1px dashed #999;
            padding-bottom:30px;
            padding-top:20px;
          }
          .companyNameBox{
            padding-top:10px;
            .btn{
              height:50px;
              width:100px;
              border-radius:25px;
              color:#333;
              background:#dcdada;
              font-size:26px;
            }
            b{
              color:#ff523d;
              font-weight: bold;
              margin-left:10px;
            }
          }
          .abbreviation{
            padding-top:15px;
          }
          .listItem{
            padding-top:15px;
          }
        }
      }
    }

	}
</style>
