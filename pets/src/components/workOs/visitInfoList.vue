<template>
  <div class="visitXq">
    <div class="login_nav">
    	<div class="back" @click="back"></div>
    	<div class="title">拜访详情</div>
    </div>
    <div class="customer_map">
    	<el-amap ref="map" vid="amapDemo" :center="center" :zoom="15" class="amap-demo" :plugin="plugin">

    		<el-amap-marker v-if="isMark" :events="markers" :icon="require('../../assets/icon/map@2x.png')" vid="component-marker"></el-amap-marker>

    	</el-amap>
    </div>
    <div class="visitXqCnt">
      <div class="flex_r_s_b cntInfo">
        <div class="list_left">
          <div class="userName">刘海洋</div>
          <div class="dataTime">
            2019/7-19</br>17:12:25
          </div>
        </div>
        <div class="list_right">
          <div class="shopName">毛毛屋宠物生活馆</div>
          <div class="addr">四川省成都市锦江区牛王庙东恒国际四川省成都市锦江区牛王庙东恒国际</div>
          <div class="img-box flex_r_f_s">
            <img src="../../assets/images/seller_pic.png" alt="">
            <img src="../../assets/images/seller_pic.png" alt="">
            <img src="../../assets/images/seller_pic.png" alt="">
          </div>
          <div class="remarks">备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注</div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
    import Api from '../common/apj.js'
    import compress from '../../data/image'
    export default {
      data(){
        let self = this;
        return{
          isMark:true,
          lng:'',
          lat:'',
          center:[0,0],
          plugin: [{
           	pName: 'Geolocation',
           	enableHighAccuracy: true,//是否使用高精度定位，默认:true
           	timeout: 10000,          //超过10秒后停止定位，默认：无穷大
           	showMarker: false,        //定位成功后在定位到的位置显示点标记，默认：true
           	showCircle: false,        //定位成功后用圆圈表示定位精度范围，默认：true
           	panToLocation: true,     //定位成功后将定位到的位置作为地图中心点，默认：true
           	zoomToAccuracy:false,//定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：f
           	useNative:true,
           	events: {
           	  init(o) {
           		// o 是高德地图定位插件实例
           		o.getCurrentPosition((status, result) => {
           		  if (result && result.position) {
           			self.lng = result.position.lng;
           			self.lat = result.position.lat;
           			self.center = [self.lng, self.lat];

           			// self.$nextTick();
           		  }
           		});
           	  },
           	  complete(res){

           		 self.isMark = false;

           		 setTimeout(()=>{
           			  self.isMark = true;
           			  self.lng = res.position.lng;
           			  self.lat = res.position.lat;
           			  self.center = [self.lng, self.lat];
           		 },200)
           	  }
           	}
            }],
            markers:{
            	position:self.center,
            	dragend: (e) => {
            		// var geocoder = new AMap.Geocoder();
            		let lng = e.lnglat.lng;
            		let lat = e.lnglat.lat;
            		self.center = [lng,lat];

            	}
            },
        }
      },
      mounted() {
        let self = this;
        this.getStaffName();
      },
      methods:{
        back(){
        	this.$router.push({
        		name:'workOsInfoList'
        	});
        },

      }
    }
</script>

<style lang="scss">
    .visitXq{
      .login_nav{
      	height: 42px;
      	padding: 22px 0;
      	position: relative;
      	border-bottom: 1px solid #e8e8e8;
      	.back{
      		background: url("../../assets/icon/backColory.png") no-repeat center 0;
      		background-size: cover;
      		width: 24px;
      		height: 40px;
      		position: absolute;
      		left: 20px;
      		top: 50%;
      		margin-top: -21px;
      	}
      	.title{
      		font-size: 30px;
      		color: #333;
      		line-height: 42px;
      		text-align: center;
      	}
      }
      .customer_map{
        height: 500px;
      }
      .visitXqCnt{
        padding: 0 20px;
        padding-top: 30px;
        .cntInfo{
          align-items: flex-start;
          .list_left{
            width: 20%;
            .userName{
              font-size: 28px;
              color: #333;
              text-align: center;
              padding-bottom: 10px;
            }
            .dataTime{
              font-size: 20px;
              color: #999;
              text-align: center;
              line-height: 28px;
            }
          }
          .list_right{
             width: 75%;
             padding-bottom: 15px;
            .shopName{
              font-size: 28px;
              color: #333;
              padding-bottom: 10px;
            }
            .addr{
              font-size: 20px;
              color: #999;
              line-height: 28px;
            }
            .img-box{
              padding: 20px 0;
              img{
                width: 130px;
                height: 130px;
                margin-right: 20px;
              }
            }
            .remarks{
              font-size: 20px;
              color: #999;
              line-height: 28px;

            }
          }
        }
      }
    }
</style>
