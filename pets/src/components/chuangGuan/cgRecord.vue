<template>
  <div class="cgRecord">
    <div class="top_nav flex_r_s_b">
    	<div class="back" @click="back"></div>
    	<div class="nav_title">萌宠闯关</div>
    	<div class="share" @click="share"></div>
    </div>
    <div class="gdReward"><b>{{gdNum}}</b><br>骨豆累计奖励</div>
    <div class="rewardTip">我的闯关记录</div>
    <div class="rewardBox">
      <cube-scroll ref="scroll" @pulling-up="onPullingUp" @pulling-down="onPullingDown" :options="options">
      <ul>
        <li class="flex_r_s_b" v-for="item in listData">
          <div class="list_l">
            <div class="cglj">闯关奖励</div>
            <div class="cgTime">{{item.passTime}}</div>
          </div>
          <div class="list_r">
            骨豆+{{item.prizeNum}}
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
      return {
        listData:[],
        userId:-1,
        page:1,
        gdNum:0,
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
      this.userId = this.getUrlKey('userId');
      this.getReward();
    },
    methods:{
      back() {
      	this.$router.go(-1); //返回上一层
      },
      share(){
      	let toast = this.$createToast({
      		txt: '点击顶部右上角进行分享',
      		type: 'warn'
      	  })
      	toast.show()
      },
      getUrlKey(name){
          return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[1].replace(/\+/g, '%20')) || null
      },
      getReward(){
        let self = this;
        self.axios.get(Api.trendApi + '/answerGame/selectPassRecord', {
        	params: {
        		userId:self.userId
        	}
        }, {
        	headers: {
        		'Content-Type': 'application/x-www-form-urlencoded'
        	}
        }).then((res)=>{

          if(res.data.code==1){
            self.gdNum = res.data.data.totalPrizeNum;
            self.listData = res.data.data.list;
          }

        })
      },
      onPullingUp(){
        let self = this;
        self.page++;
        self.axios.get(Api.trendApi + '/answerGame/selectOtherPassRecord', {
        	params: {
        		userId:self.userId,
            page:self.page,
            rows:8
        	}
        }, {
        	headers: {
        		'Content-Type': 'application/x-www-form-urlencoded'
        	}
        }).then((res)=>{

          if(res.data.code==1){

            if (res.data.data.length > 0){
              setTimeout(() => {
              	self.listData.push(...res.data.data);
              	self.$refs.scroll.forceUpdate();
              	setTimeout(() => {
              		self.$refs.scroll.refresh();
              	}, 200)
              }, 500)
            }else{

              setTimeout(() => {
              	self.$refs.scroll.forceUpdate();
                self.$refs.scroll.refresh();
              }, 500)
            }


          }else{
            alert(res.data.msg)
            setTimeout(() => {
            	self.$refs.scroll.forceUpdate();
              self.$refs.scroll.refresh();
            }, 500)

          }

        })
      },
      onPullingDown(){
        let self = this;
        self.page = 1;
        self.axios.get(Api.trendApi + '/answerGame/selectOtherPassRecord', {
        	params: {
        		userId:self.userId,
            page:1,
            rows:8
        	}
        }, {
        	headers: {
        		'Content-Type': 'application/x-www-form-urlencoded'
        	}
        }).then((res)=>{

          if(res.data.code==1){


            setTimeout(() => {
            	self.listData = res.data.data;
            	self.$refs.scroll.forceUpdate();
            	setTimeout(() => {
            		self.$refs.scroll.refresh();
            	}, 200)
            }, 500)

          }else{
            setTimeout(() => {
            	self.$refs.scroll.forceUpdate();
              self.$refs.scroll.refresh();
            }, 500)
            alert(res.data.msg)
          }

        })
      }
    }
  }
</script>

<style lang="scss">
  .cgRecord{
    // height:100%;
    background:#FE8F70;
    .top_nav {
    	padding: 0 20px;
    	height: 88px;
    	box-sizing: border-box;
    	position: fixed;
    	z-index: 100;
      position: relative;
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
        text-align: center;
    		left: 50%;
    		top: 50%;
    		transform: translate(-50%, -50%);
        width:500px;
        overflow: hidden;/*超出部分隐藏*/
        text-overflow:ellipsis;/* 超出部分显示省略号 */
        white-space: nowrap;/*规定段落中的文本不进行换行 */
    	}
    	.share{
    		width: 50px;
    		height: 40px;
    		background: url('../../assets/icon/share@2x.png') no-repeat center 0;
    		background-size: 100%;
    	}
    }
    .gdReward{
      font-size:26px;
      color:#fff;
      text-align:center;
      padding-top:88px;
      b{
        font-size:120px;
        font-family:SimHei;
      }
    }
    .rewardTip{
      font-size:28px;
      color:#fff;
      padding-left:40px;
      padding-top:40px;
      padding-bottom:20px;
    }
    .rewardBox{
      height:866px;
      background:#fff;
      border-top-left-radius: 30px;
      border-top-right-radius: 30px;
      ul{
        padding:0 40px;
        li{
          height:120px;
           border-bottom:1px solid #E8E8E8;/*no*/
          .list_l{

            .cglj{
              font-size:28px;
              color:#333;
            }
            .cgTime{
              font-size:24px;
              color:#666666;
              padding-top:5px;
            }
          }
          .list_r{
            font-size:28px;
            color:#ff523d;
          }
        }
      }
    }
  }
</style>
