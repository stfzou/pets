<template>
  <div class="presentCenter">
    <div class="top_nav flex_r_s_b">
    	<div class="back" @click="back"></div>
    	<div class="nav_title">礼品中心</div>
    </div>
    <div class="presentList">
      <cube-scroll ref="scroll" :options="listOpt" @pulling-up="onPullingUp" @pulling-down="onPullingDown">
      <ul>
        <li v-for="item in dataList">
          <div class="presentInfo flex_r_s_b">
            <img :src="item.commodityImage" alt="">
            <div class="present_r">
              <div class="presentName">{{item.commodityName|descFilter}}</div>
              <div class="present_r_bottom" v-if="item.type==1">
                <div class="duihuanNum"><span class="num">兑换数量</span><span>{{item.num}}</span></div>
                <div class="orderNum">
                  <span class="text">订单编号</span> <span class="num">{{item.orderNumber}}</span>
                  <span class="status" v-if="item.status===0" style="color:#B129FF;">未支付</span>
                  <span class="status" v-if="item.status===2" style="color:#B129FF;">处理中</span>
                  <span class="status" v-if="item.status===3" style="color:#FF523D;">已完成</span>
                  <span class="status" v-if="item.status===4" style="color:#FF523D;">已退款</span>
                </div>
              </div>
            </div>
          </div>
          <div class="duihuanDate" v-if="item.type==1"><span class="span1">兑换日期</span> <span class="span2">{{item.exchangeTime}}</span></div>
          <div class="addressee" v-if="item.type==1"><span class="span1">收件人</span> <span class="span2">{{item.userName}}</span> <span class="phone">{{item.phone}}</span></div>
          <div class="addr" v-if="item.type==1">{{item.receiverAddress}}</div>
          <div class="remarkBox" v-if="item.type==1">
            <div class="remark">请耐心等待2~3天，兑换商品发出后将在这里显示物流信息</div>
          </div>
          <div class="jihuoBtn flex_r_s_c" v-if="item.type==2">待激活</div>
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
        dataList:[],
        page:1,
        userId:28,
        listOpt:{
          preventDefault:true,
          pullDownRefresh: {
          	txt: '更新成功',
          	threshold: 40
          },
          pullUpLoad: {
          	txt: {
          		more: '加载更多',
          		noMore: '没有更多数据了',
          	},
          	threshold: 40,

          }
        }
      }
    },
    filters:{
      descFilter(val){
        if(val.length>35){
          return val.substr(0,35)+'...'
        }else{
          return val
        }
      }

    },
    mounted() {
      if(this.$route.query.userId!=null){
        this.userId = this.$route.query.userId;
      }
      this.getData();
    },
    methods:{
      back() {
      	this.$router.go(-1); //返回上一层
      },
      onPullingDown(){
        this.page = 1;
        this.getData();
      },
      onPullingUp(){
        let self = this;
        self.page++
        this.axios.get(Api.userApi+'/boneBeanShop/selectExchangeRecord',{
          params:{
            userId:self.userId,
            page:self.page,
            rows:6
          }

        }).then(function(res) {

              if(res.data.code==1){

                setTimeout(() => {
                  self.dataList.push(...res.data.data);
                	self.$refs.scroll.forceUpdate();
                	setTimeout(() => {
                		self.$refs.scroll.refresh();
                	}, 200)
                }, 500)

              }else{
                alert(res.data.msg);
                setTimeout(() => {
                	self.$refs.scroll.forceUpdate();
                	self.$refs.scroll.refresh();
                }, 500)
              }
        	}).catch(function(err) {
              alert(err)

        	});
      },
      getData(){
        let self = this;
        this.axios.get(Api.userApi+'/boneBeanShop/selectExchangeRecord',{
          params:{
            userId:self.userId,
            page:self.page,
            rows:6
          }

        }).then(function(res) {

              if(res.data.code==1){

                setTimeout(() => {
                  self.dataList = res.data.data;
                	self.$refs.scroll.forceUpdate();
                	setTimeout(() => {
                		self.$refs.scroll.refresh();
                	}, 200)
                }, 500)

              }else{
                alert(res.data.msg);
                setTimeout(() => {
                	self.$refs.scroll.forceUpdate();
                	self.$refs.scroll.refresh();
                }, 500)
              }
        	}).catch(function(err) {
              alert(err)

        	});
      }
    }
  }
</script>

<style lang="scss">
  .presentCenter{
    height:100%;
    .top_nav {
    	padding: 0 20px;
    	height: 88px;
    	box-sizing: border-box;
    	z-index: 100;
      border-bottom:1px solid #e8e8e8;/*no*/
    	.back {
    		width: 26px;
    		height: 42px;
    		background: url(../../assets/icon/backColory.png) no-repeat center 0;
    		background-size: cover;
    	}

    	.nav_title {
    		font-size: 30px;
    		color: #000;
    		position: absolute;
    		left: 50%;
    		top: 50%;
    		transform: translate(-50%, -50%);
    		font-weight:400;
    	}

    }
    .presentList{
      height: calc(100% - 98px);
      box-sizing:border-box;
      ul{
        padding:0 20px;
        padding-bottom:30px;
        overflow:hidden;
        li{
          margin-top:30px;
          padding:40px 20px 40px 20px;
          box-sizing:border-box;
          background:#FFFFFF;
          box-shadow:0px 4px 12px 0px rgba(15,15,15,0.16);
          border-radius:10px;
          position: relative;
          .presentInfo{
            align-items: flex-start;
            img{
              width:160px;
              height:160px;
              border-radius:10px;
              margin-right:20px;
            }
            .present_r{
              width:550px;
              .presentName{
                font-size:26px;
                color:#000;
                line-height:48px;
              }
              .present_r_bottom{
                font-size:24px;
                color:#999999;
                .duihuanNum{
                  padding-top:10px;
                  .num{
                    margin-right:30px;
                  }
                }
                .orderNum{
                  padding-top:10px;
                  .text{
                    margin-right:15px;
                  }
                  .num{
                    margin-right:15px;
                  }
                  .status{
                    color:#B129FF;
                  }
                }
              }
            }
          }
          .duihuanDate{
            font-size:24px;
            color:#333;
            padding-top:30px;
            .span1{
              margin-right:20px;
              width:100px;
              display:inline-block;
            }
          }
          .addressee{
            font-size:24px;
            color:#333;
            padding-top:20px;
            .span1{
              margin-right:20px;
              width:100px;
              display:inline-block;
            }
            .span2{
              margin-right:80px;
            }
          }
          .addr{
            padding-top:20px;
            font-size:24px;
            color:#333;
          }
          .remarkBox{
            margin-top:30px;
            padding-top:30px;
            border-top:1px dashed #E8E8E8;/*no*/
            .remark{
              color:#999999;
              font-size:24px;

            }
          }
          .jihuoBtn{
            width:100px;
            height:36px;
            background:#FF523D;
            font-size:22px;
            border-radius:10px 10px 10px 10px;
            color:#fff;
            position:absolute;
            bottom:46px;
            right:20px;
          }
        }
      }

    }
  }
</style>
