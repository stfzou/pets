<template>
  <div class="shopStore">
    <div class="top_nav flex_r_s_b">
    	<div class="back" @click="back"></div>
    	<div class="nav_title">相关门店 <span>（12家）</span></div>
    </div>
    <div class="shopList">
      <cube-scroll ref="scroll">
        <ul>
          <li class="flex_r_s_b" v-for="item in dataList">
            <div class="list_l">
              <div class="shopName">{{item.name}}</div>
              <div class="shopAddr">{{item.address}}</div>
            </div>
            <div class="list_r flex_c_f_e">
              <img src="../../assets/icon/icon_she56@3x.png" alt="">
              <p>{{item.distance}}</p>
            </div>
          </li>
        </ul>
      </cube-scroll>
    </div>
    <div class="amap-page-container" v-show="false">
    	<el-amap ref="map" vid="amapDemo" :plugin="plugin" class="amap-demo"></el-amap>

    </div>
  </div>
</template>

<script>
  import Api from '../common/apj.js'
  export default{
    data(){
      let self = this;
      return{
        lng:0,
        lat:0,
        totalShopNum:0,
        dataList:[],
        plugin: [

        	{
        		pName: 'Geolocation',
        		enableHighAccuracy: true, //是否使用高精度定位，默认:true
        		timeout: 10000, //超过10秒后停止定位，默认：无穷大
        		maximumAge: 0, //定位结果缓存0毫秒，默认：0
        		convert: true, //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
        		showButton: true, //显示定位按钮，默认：true
        		buttonPosition: 'RB', //定位按钮停靠位置，默认：'LB'，左下角
        		showMarker: true, //定位成功后在定位到的位置显示点标记，默认：true
        		showCircle: true, //定位成功后用圆圈表示定位精度范围，默认：true
        		panToLocation: true, //定位成功后将定位到的位置作为地图中心点，默认：true
        		zoomToAccuracy: true, //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：f
        		extensions: 'all',
        		events: {
        			init(o) {
        				// o 是高德地图定位插件实例
        				o.getCurrentPosition((status, result) => {

        					if (result && result.position) {

        						self.lng = result.position.lng;
        						self.lat = result.position.lat;

        					} else {
        						// self.getActivityListOne();
        						let toast = self.$createToast({
        							txt: '定位失败，请刷新页面重新定位',
        							type: 'warn'
        						  })
        						toast.show()
        					}
        				});
        			}
        		}
        	}
        ]
      }
    },
    mounted() {
      this.getShopStore();
    },
    methods:{
      back() {
      	this.$router.go(-1); //返回上一层
      },
      getShopStore(){
        let self = this;
        this.axios.get(Api.userApi+'/multipleShop/selectMultipleShopInfo',{
          params:{
            userId:28,
            latitude:30.65984,
            longitude:104.10194
          }

        }).then(function(res) {

              if(res.data.code==1){

                self.totalShopNum = res.data.data.totalShopNum;
                self.dataList = res.data.data.list;

              }else{
                alert(res.data.msg);

              }
        	}).catch(function(err) {
              alert(err)

        	});
      }
    }
  }
</script>

<style lang="scss">
  .shopStore{
    height:100%;
    background:#F5F5F5;
    .top_nav {
    	padding: 0 20px;
    	height: 88px;
    	box-sizing: border-box;
    	z-index: 100;
      background: #fff;

      border-bottom:1px solid #ff523d;/*no*/

    	.back {
    		width: 26px;
    		height: 42px;
    		background: url(../../assets/icon/backColory.png) no-repeat center 0;
    		background-size: cover;
    	}
    	.nav_title {
    		font-size: 30px;
    		color: #333;
    		position: absolute;
    		left: 50%;
    		top: 50%;
    		transform: translate(-50%, -50%);
    		font-weight:400;
        span{
          color:#ff523d;
        }
    	}

    }
    .shopList{
      padding:0 20px;
      height: calc(100% - 88px);

      box-sizing:border-box;
      ul{
        overflow:hidden;
        padding-top:30px;
        // padding-bottom:30px;
      }
      li{
          padding:20px;
          border-radius:10px;
          background:#fff;
          margin-bottom:30px;
          box-sizing:border-box;
          .list_l{
            border-right:1px solid #ddd;/*no*/
            width:500px;
            padding:10px 0;
            .shopName{
              font-size:28px;
              color:#000;

            }
            .shopAddr{
              padding-top:30px;
              color:#666666;
              font-size:24px;
              line-height:36px;
            }
          }
          .list_r{
            width:150px;
            img{
              width:53px;
            }
            p{
              font-size:24px;
              color:#666666;
              padding-top:20px;
            }
          }
      }

    }
  }
</style>
