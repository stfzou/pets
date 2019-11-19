<template>
	<div class="branchManage">

      <div class="branchManageTop">
        <div class="login_nav">
        	<div class="back" @click="back"></div>
        	<div class="title">合作网点管理</div>
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
          <input type="text" v-model="val" placeholder="公司名称/简称">
          <div class="btn flex_r_s_c">查询</div>
        </div>
      </div>



    <div class="branchManageCnt">
      <cube-scroll ref="scroll">
      <div class="branchManageList">
        <ul>
          <li v-for="item in [1,2,3,4,5,6]">
            <div class="companyNameBox flex_r_s_b">
              <div class="companyName">成都爱之宠物有限公司<b>[省级]</b></div>
              <div class="charge">李玉刚</div>
            </div>
            <div class="abbreviation flex_r_s_b"><span>【自由犬宠物】</span><span>15283133594</span></div>
            <div class="listItem">四川省-成都市-锦江区</div>
            <div class="listItem">用户数量:298</div>
            <div class="listItem">商户数量:12786</div>
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
        val:''
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
