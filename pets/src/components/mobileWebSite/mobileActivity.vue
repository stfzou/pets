<template>
  <div class="mobileActivity">
      <div class="mobileActivityList">

      		<div class="activity-item" v-for="item in activityList">
            <router-link class="flex_r_s_c" :to="{name:'activity',query:{id:item.id}}">
              <img class="cover" :src="item.activityCover" alt="">
            </router-link>
            <img class="tipImg" v-if="item.isPrivilege===1" src="../../assets/icon_gu37@2x.png" alt="">
      			<div class="activeInfo">
      				<div class="activityName">{{item.activityTitel}}</div>
      				<div class="data flex_r_f_s">
      					<img src="../../assets/icon_time.png" alt="">
      					<span>{{item.startTime}}~{{item.endTime}}</span>
      				</div>
      				<div class="activityAddr flex_r_s_b">
      					<div class="addr-l flex_r_f_s">
      						<img src="../../assets/icon/map@2x.png" alt="">
      						<span>{{item.address}}</span>
      					</div>
      					<div class="addr-r">
      						{{item.distance}}
      					</div>
      				</div>
      				<div class="cost flex_r_s_b">
                <div>
                  <div class="price" v-if="item.maxPrice == 0">免费</div>
                  <div class="price" v-if="item.maxPrice>0&&item.maxPrice!=item.minPrice">¥{{item.minPrice}} ~ {{item.maxPrice}}元</div>
                  <div class="price" v-if="item.maxPrice==item.minPrice&&item.maxPrice>0">¥{{item.maxPrice}}元</div>
                </div>
      					<div class="surplusBox flex_r_s_b">
                  <div class="surplus">仅剩{{item.limitNum-item.joinNum}}名额</div>
                  <router-link class="flex_r_s_c" v-if="item.isConduct===1" :to="{name:'activity',query:{id:item.id}}">立即报名</router-link>
                  <a class="flex_r_s_c grayBg" v-if="(new Date()).getTime()<(new Date(item.startTime)).getTime()&&item.isConduct!=1">未开始</a>
                  <a class="flex_r_s_c grayBg" v-if="(new Date()).getTime()>=(new Date(item.endTime)).getTime()&&item.isConduct!=1">已过期</a>
                </div>
      					<!-- <a href="###" class="flex_r_s_c">立即报名</a> -->

      				</div>
      			</div>
      		</div>

      </div>
  </div>
</template>

<script>
  import Api from '../common/apj.js'
  export default{
    data(){
      return{
        activityList:[],
        lat:0,
        lng:0
      }
    },
    mounted() {
      this.lat = this.$store.state.location.lat;
      this.lng = this.$store.state.location.lng;
      this.getActivityList();
    },
    methods:{
      getActivityList() {
      	let self = this;
      	self.axios.post(Api.userApi + '/ca/selectCommunityActivityList', self.qs.stringify({
      		pageNo: 0,
      		pageSize: 30,
      		latitude:self.lat,
      		longitude:self.lng
      	}), {
      		headers: {
      			'Content-Type': 'application/x-www-form-urlencoded'
      		}
      	}).then((res) => {
      		if (res.data.code == 1) {
            self.activityList = res.data.data;

      		}else{
      			alert(res.data.msg)

      		}
      	})
      },
    }
  }
</script>

<style lang="scss" scoped="scoped">
  .mobileActivity{
    .mobileActivityList {

      background:#fff;
    	overflow: hidden;
    	padding: 0 20px;
    	padding-bottom: 28px;
    	padding-top: 20px;
    	box-sizing: border-box;
    	.activity-item {
    		margin-bottom: 28px;
    		border-radius: 10px;
    		box-shadow: 0px 4px 12px 0px rgba(15, 15, 15, 0.16);
        position:relative;
        .tipImg{
          width:180px;
          position:absolute;
          left:-8px;
          top:20px;
        }
    		.cover {
    			width: 100%;
          height: 100%;
          object-fit: cover;
    			border-top-left-radius: 10px;
    			border-top-right-radius: 10px;
    		}

    		.activeInfo {
    			padding: 20px 20px 0 20px;

    			.activityName {

    				line-height: 48px;
    				font-size: 32px;
            font-weight: bold;
    				color: #000;
    			}

    			.data {
    				height: 48px;
            padding-top:15px;
    				img {
    					width: 26px;
    				}

    				span {
    					font-size: 26px;
    					color: #666;
    					margin-left: 10px;
    				}
    			}

    			.activityAddr {
    				height: 48px;
            align-items:flex-start;
            padding-top:20px;
    				.addr-l {
    					overflow: hidden;
    					width: 500px;
              align-items:flex-start;
              padding-top:5px;
    					img {
    						width: 26px;
    					}

    					span {
    						font-size: 24px;
    						color: #666;
    						margin-left: 10px;
    					}
    				}

    				.addr-r {
              padding-top:5px;
    					width: 180px;
    					font-size: 24px;
    					color: #666;
    					margin-left: 10px;
    					text-align: right;
    				}
    			}
          .surplusBox{
            width:360px;
            padding-top:20px;
            .surplus{
              color:#ff523d;
              font-size:26px;
            }
          }


    			.cost {
    				padding: 10px 0 22px 0;

    				.price {
    					font-size: 28px;
    					color: #ff523d;
    				}

    				a {
    					width: 154px;
    					height: 50px;
    					background:linear-gradient(90deg, #fb8550, #fd7a5d, #f56258, #ff4949);
    					font-size: 26px;
    					color: #fff;
    					border-radius: 6px;
    				}
            .grayBg{
              background: #999;
            }
    			}
    		}
    	}
      .activity-item:last-child{
        margin: 0;
      }
    }
  }
</style>
