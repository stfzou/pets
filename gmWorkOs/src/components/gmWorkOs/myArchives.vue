<template>
  <div class="myArchives">
      <div class="login_nav">
      	<div class="back" @click="back"></div>
      	<div class="title">我的档案</div>
      </div>
      <div class="myArchivesCnt">
        <div class="staffInfo">孙辉勇<b style="color:#ff523d">[主管]</b><b style="color: #2fcfec;">[运营部]</b><b style="color: #32e9b8;">[正常]</b></div>
        <ul class="myArchivesList">
            <li >
              电话号码 : 15283133594
            </li>
            <li>
              业务区域 : 四川省-成都市-锦江区
            </li>
            <li>
              商户数量 : <span>298</span>
            </li>
            <li>
              用户数量 : <span>12876</span>
            </li>
            <li>
              添加日期 : 2019-11-12
            </li>
        </ul>
        <div class="businessCode flex_c_f_e">
           <div class="title">我的业务推荐码</div>
           <div class="code flex_r_s_c">{{val}}</div>
           <div class="copy flex_r_s_c tag-read" @click="copy" data-clipboard-action="copy" :data-clipboard-text="val">复制</div>
        </div>
      </div>
  </div>
</template>

<script>
  import Clipboard from 'clipboard'
  import Api from '../common/apj.js'
  export default {
  	data() {
  		return {
        val:'987672'
  		}
  	},
  	mounted() {


  	},
  	methods: {
      back() {
      	this.$router.push({
      		name:'workOsInfoList'
      	});
      },
     copy() {
        let self = this

        var clipboard = new Clipboard('.tag-read')

        clipboard.on('success', e => {
       
          self.susTip('复制成功')
          // 释放内存
          clipboard.destroy()
        })
        clipboard.on('error', e => {
          // 不支持复制
          alert('该浏览器不支持自动复制')
          // 释放内存
          clipboard.destroy()
        })
      },

      susTip(msg){
        let toast = this.$createToast({
        	txt: msg,
        	type: 'correct'
          })
        toast.show()
      },
    }
  }
</script>

<style lang="scss">
  .myArchives{

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
      .myArchivesCnt{
        padding:0 22px;
        .staffInfo{
          font-size:26px;
          color:#666;
          padding-top:30px;
          b{
            font-weight:bold;
            margin-left:10px;
          }
        }
        .myArchivesList{
          li{
            padding-top:50px;
            span{
              color:#ff523d;
              font-size:30px;
            }
          }
        }
        .businessCode{
          padding-top:60px;
          .title{
            padding-bottom:50px;
          }
          .code{
            width:260px;
            background:#fdbb8a;
            color:#666;
            height:80px;
            font-size:60px;
            font-weight:bold;
          }
          .copy{
            height:50px;
            width:100px;
            border-radius:25px;
            color:#fff;
            background:#ff523d;
            font-size:26px;
            margin-top:50px;
          }
        }
      }
  }

</style>
