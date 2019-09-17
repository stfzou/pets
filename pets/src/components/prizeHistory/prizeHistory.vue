<template>
  <div class="prizeHistory">
      <div class="top_nav flex_r_s_b">
      	<div class="back"></div>
      	<div class="nav_title">中奖纪录</div>
      </div>
      <div class="prize-history-cnt">

        <div class="scroolBox">
          <cube-scroll ref="scroll" @pulling-up="onPullingUp" @pulling-down="onPullingDown" :options="options">
          <ul class="history-list">
            <li class="listTop flex_r_s_b">
              <div class="left">中奖时间</div>
              <div class="mid">奖品</div>
              <div class="right">领取状态</div>
            </li>
            <li class="flex_r_s_b" v-for="item in dataList">
              <div class="left">{{item.winPrizeTime}}</div>
              <div class="mid">{{item.prizeName}}</div>

              <div class="right">
                <div class="receive" v-if="item.properties==1">已领取</div>
                <div class="receive active" v-else>待领取</div>
              </div>
            </li>

          </ul>
          </cube-scroll>
        </div>

      </div>
  </div>
</template>

<script>
  import Api from '../common/apj.js'
  export default{
    data(){
      return{
        dataList:[],
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
      this.getDataList();
    },
    methods:{
      back(){

      },
      getDataList(){
        let self = this;
        this.axios.get(Api.userApi+'/prize/selectWinPrizeRecordByType',{
          params:{
            userId:38,
            type:1,
            page:1,
            rows:10
          }

        }).then(function(res) {
              console.log(res.data.data)
              if(res.data.code==1){
                self.dataList = res.data.data;
              }else{

              }
        	}).catch(function(err) {
              alert(err)

        	});
      },
      onPullingDown(){//上拉刷新

      },
      onPullingUp(){//下拉加载

      }
    }
  }
</script>

<style lang="scss">
    .prizeHistory{
      height:100%;
      background: url(../../assets/historyBg.png) no-repeat;
      background-size:cover;
      .top_nav {
      	padding: 0 20px;
      	height: 88px;
      	box-sizing: border-box;
      	z-index: 100;
      	.back {
      		width: 26px;
      		height: 42px;
      		background: url(../../assets/icon/back@2x.png) no-repeat center 0;
      		background-size: cover;
      	}
      	.nav_title {
      		font-size: 30px;
      		color: #fff;
      		position: absolute;
      		left: 50%;
      		top: 50%;
      		transform: translate(-50%, -50%);
      		font-weight:400;
      	}

      }
      .prize-history-cnt{
        margin-top:40px;
        padding:0 20px;
        box-sizing:border-box;
        .scroolBox{
          height:1000px;
          background:#fff;
          border-radius: 30px;
          padding:20px 28px;
          box-sizing:border-box;
          li{
            padding:20px 0;
            .left{
              width:180px;
              text-align:center;
            }
            .mid{
              width:180px;
              text-align:center;
            }
            div{
              text-align: left;
              width:130px;
              font-size:26px;
              color:#333;
            }
            .receive{
              width:110px;
              height:40px;
              text-align:center;
              line-height:40px;

            }
            .active{
              background:#ff523d;
              width:110px;
              height:40px;
              text-align:center;
              line-height:40px;
              border-radius:20px;
              color:#fff;
            }
          }
          .listTop{
            div{
              font-size:28px;
              color:#000;
              font-weight:bold;
            }
          }
        }
      }
    }
</style>
