<template>
	<div class="branchManage">

      <div class="branchManageTop">
        <div class="login_nav">
        	<div class="back" @click="back"></div>
        	<div class="title">合作网点管理</div>
          <router-link :to="{name:'addBranch'}">添加网点</router-link>
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
          <input type="text" v-model="keyword" placeholder="公司名称/简称">
          <div class="btn flex_r_s_c" @click="getBranchList">查询</div>
        </div>
      </div>



    <div class="branchManageCnt">
      <cube-scroll ref="scroll" @pulling-up="onPullingUp" @pulling-down="onPullingDown" :options="options">
      <div class="branchManageList">
        <ul>
          <li v-for="item in branchList">
            <div class="companyNameBox flex_r_s_b">
              <div class="companyName">{{item.companyName}} <b>{{item.networkRank|rankFilter}}</b></div>
              <div class="charge">{{item.principalName}}</div>
            </div>
            <div class="abbreviation flex_r_s_b"><span>[{{item.networkName}}]</span><a :href="'tel:'+item.phone">{{item.phone}}</a></div>
            <div class="listItem">{{item.province}}-{{item.city}}-{{item.area}}</div>
            <div class="listItem">用户数量:{{item.userNum}}</div>
            <div class="listItem">商户数量:{{item.shopNum}}</div>
            <div class="listItem flex_r_s_b"><span>添加日期:2019-11-12</span><span style="color: #ff523d;" @click="editLink(item)">编辑</span></div>
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
        keyword:'',
        page:1,
        branchList:[],
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
    filters:{
      rankFilter(value){
        if(value==1){
          return '[省级]'
        }else if(value==2){
          return '[市级]'
        }else if(value==3){
          return '[区级]'
        }
      }
    },
		mounted() {
      this.addressPicker = this.$createCascadePicker({
      	title: '城市选择',
      	data: addressData,
      	onSelect: this.selectHandle,
      	onCancel: this.cancelHandle
      });
      this.getBranchList();
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
        this.getBranchList();
      },
      cancelHandle() {

      },
      onPullingUp(){
        this.page++;
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

        self.axios.get(Api.userApi + '/employee/system/selectNetworkBySearch',{
          params: {
          	province:sheng,
          	city:shi,
            area:qu,
            keyword:self.keyword,
            page:self.page,
            rows:10
          }
        },{
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then((res) => {
          if (res.data.code == 1) {
            if(res.data.data.length>0){
              setTimeout(() => {
                self.$refs.scroll.forceUpdate();
              	self.branchList.push(...res.data.data);
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
        this.page = 1;
        this.getBranchList();
      },
      getBranchList(){
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

        self.axios.get(Api.userApi + '/employee/system/selectNetworkBySearch',{
          params: {
          	province:sheng,
          	city:shi,
            area:qu,
            keyword:self.keyword,
            page:1,
            rows:10
          }
        },{
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then((res) => {
          if (res.data.code == 1) {
            if(res.data.data.length<1){
              alert('暂无数据')
              self.branchList = res.data.data;
            }else{
              setTimeout(() => {
                self.$refs.scroll.forceUpdate();
              	self.branchList = res.data.data;
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
      editLink(item){
        this.$router.push({
          name:'editBranch',
          query:{
            networkId:item.networkId
          }
        })
      }
    }
  }

</script>

<style lang="scss">
	.branchManage {
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
            b{
              color:#ff523d;
              font-weight: bold;
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
