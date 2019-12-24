<template>
  <div class="coopShopManage">
      <div class="coopShopManageTop">
        <div class="login_nav">
        	<div class="back"></div>
        	<div class="title">合作商户管理</div>
          <router-link :to="{name:'addBranch'}">添加</router-link>
        </div>
        <div class="typeBox flex_r_s_b">
          <div class="flex_r_s_b"><span>类型</span><i class="cubeic-pulldown"></i></div>
          <div class="flex_r_s_b"><span>性质</span><i class="cubeic-pulldown"></i></div>
          <div class="flex_r_s_b"><span>营业员</span><i class="cubeic-pulldown"></i></div>
        </div>
        <div class="inputBox flex_r_s_b">
          <input type="text" placeholder="请输入电话号码" v-model="val">
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
      </div>
      <div class="coopShopManageCnt">
        <ul class="coopShopManageList">
          <li>
            <div class="shopName flex_r_s_b"><span>紫东日杂店</span><div class="edit">编辑</div></div>
            <div class="shopType flex_r_f_s"><div class="type">[类型:便利店]</div><div class="xz">[性质:个体工商户]</div></div>
            <div class="fzr flex_r_s_b">
              <div class="div_l">负责人:张三</div>
              <div class="div_r">电话:15283133594</div>
            </div>
            <div class="addr">地址:成都市成华区双庆路134号</div>
            <div class="remark">备注:这个客户是广告投入客户</div>
            <div class="ywy">业务员:李宁</div>
            <div class="imgBox flex_r_f_s">
              <div>
                <img src="../../assets/icon_geren01.png" alt="">
              </div>
              <div>
                <img src="../../assets/icon_geren01.png" alt="">
              </div>
              <div>
                <img src="../../assets/icon_geren01.png" alt="">
              </div>
            </div>
          </li>
        </ul>
      </div>
  </div>
</template>

<script>
  export default{
    data(){
      return{
        val:'',
        time1:'开始时间',
        time2:'结束时间'
      }
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

    .coopShopManageCnt{
      position:absolute;
      top:500px;
      left:0;
      right:0;
      bottom:0;
      box-sizing:border-box;
      .coopShopManageList{
        padding:0 20px;
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
