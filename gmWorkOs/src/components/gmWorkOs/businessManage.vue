<template>
  <div class="businessManage">
    <div class="businessManageTop">
      <div class="login_nav">
      	<div class="back" @click="back"></div>
      	<div class="title">商户管理</div>
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
    <div class="businessManageCnt">
      <cube-scroll ref="scroll">
        <ul class="businessManageList">
          <li class="listItem" v-for="item in [1,2,3,4,5]">
            <div class="businessName">华阳小二家宠物生活馆</div>
            <div class="item addr flex_r_f_s"><div class="item_l">店铺地址&nbsp;:&nbsp;</div><div class="item_r">四川省-成都市-锦江区</div></div>
            <div class="item xqAddr">一环路东三环139号</div>
            <div class="item jyType flex_r_f_s"><div class="item_l">经营类型&nbsp;:&nbsp;</div><div class="item_r">宠物【宠物主粮、宠物零食】</div></div>
            <div class="item ticketNum flex_r_f_s"><div class="item_l">票券总数&nbsp;:&nbsp;23</div><div class="item_r">销售金额：￥2351.80</div></div>
            <div class="item businesStar flex_r_f_s"><div class="item_l">店铺星级&nbsp;:&nbsp;</div><div class="item_r"><cube-rate :disabled="true" v-model="value"></cube-rate></div></div>
            <div class="item startTime flex_r_f_s"><div class="item_l">开店时间&nbsp;:&nbsp;</div><div class="item_r">2018/09/09</div></div>
            <div class="item chargePerson flex_r_f_s"><div class="item_l">业务负责人&nbsp;:&nbsp;</div><div class="item_r">姜晓明</div></div>
            <div class="item remark">该客户前期有问题还未解决。</div>
            <div class="btnsBox flex_r_s_b">
              <div class="btn">拜访记录</div>
              <div class="btn">业务指派</div>
              <div class="btn">客户备注</div>
              <div class="btn">地址导航</div>
            </div>
          </li>
        </ul>
      </cube-scroll>
    </div>
    <div class="remarkMask flex_r_s_c">
      <div class="maskCnt">
        <div class="title">业务指派</div>
        <div class="star flex_r_f_s"><span class="span">客户星级</span><cube-rate v-model="value"></cube-rate></div>
        <cube-textarea v-model="remark" :autoExpand="true" :maxlength="200"></cube-textarea>
        <div class="remarkBtn flex_r_f_e">
          <span>取消</span>
          <span style="color:#ff523d">确认</span>
        </div>
      </div>

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
        val:'',
        value:3,
        remark:''
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
      back(){
      	this.$router.go(-1); //返回上一层
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
  .businessManage{
    height:100%;
    position: relative;
    .businessManageTop{
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
    .branchName{
       padding:0 22px;
       padding-top:20px;
       box-sizing:border-box;
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
  }
    .businessManageCnt{
      // padding:0 22px;
      position:absolute;
      top:260px;
      left:0;
      right:0;
      bottom:0;
      box-sizing:border-box;
      .businessManageList{
        padding:22px;
        .listItem{
          background:rgba(255,255,255,1);
          box-shadow:0px 4px 12px 0px rgba(15,15,15,0.16);
          border-radius:10px;
          padding:29px;
          box-sizing:border-box;
          box-sizing:border-box;
          margin-bottom:30px;
          .cube-rate-item{
            width:30px;
          }
          .businessName{
            color:#000000;
            padding-top:30px;
            font-weight:bold;
          }
          .item{
            padding-top:30px;
          }
          .chargePerson{
            color:#000000;
            font-size:30px;

          }
          .btnsBox{
            padding-top:30px;
            .btn{
              padding:12px;
              background:#f1f1f1;
              font-size:24px;
              color:#333;
              border-radius:10px;
            }
          }
        }
      }

    }
    .remarkMask{
      position: fixed;
      left:0;
      top:0;
      height:100%;
      width:100%;
      z-index:1000;
      background:rgba(0,0,0,0.6);
      display:none;
      .maskCnt{

        width:580px;
        height:420px;
        background:rgba(255,255,255,1);
        border-radius:10px;
        padding:0 15px;
        box-sizing:border-box;
        .title{
          color:#000;
          text-align:center;
          padding:30px 0;
        }
        .star{
          .span{
            margin-right:30px;
          }
        }
        .cube-textarea-wrapper{
          margin-top:30px;
        }
        .remarkBtn{
          padding-top:30px;
        }
        .cube-textarea_expanded{
          height:180px;
        }
      }
    }
</style>
