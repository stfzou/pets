<template>
  <div class="nearbyCoupon">
    <div class="amap-page-container" v-show="false">
    	<el-amap ref="map" vid="amapDemo" :plugin="plugin" class="amap-demo"></el-amap>

    </div>
    <div class="nearByTop">
        <div class="serchWarp flex_r_f_s">
          <div class="location flex_r_f_s">
            <img src="../../assets/icon/map_fff@2x.png" alt="">
            <span v-if="city!=''">{{city}}</span>
            <cube-loading v-else :size="20"></cube-loading>
          </div>
          <div class="search flex_r_s_b">
            <input v-model="searchVal" type="text" placeholder="输入关键字,搜出你喜欢的活动吧">
            <img src="../../assets/icon/icon-search@1x.png" @click="getShopList" alt="">
          </div>
        </div>
        <div class="titleBox flex_r_s_b">
          <div class="title_l">附近商家</div>
          <div class="title_r flex_r_s_c" @click="showBtn">我要申请开店</div>
        </div>
    </div>
    <div class="nearbyCouponList">
      <cube-scroll ref="scroll" :options="options" @pulling-up="onPullingUp" @pulling-down="onPullingDown">
      <ul>
        <li class="flex_r_s_b" v-for="item in shopList" @click="shopLink(item)">
          <div class="list_l"><img :src="item.shopImgAddr" alt=""></div>
          <div class="list_r">
            <div class="shopName">{{item.shopName}}</div>
            <div class="types">主营：{{item.shopsTypes|typesFilter}}</div>
            <div class="openTime flex_r_s_b"><span>营业时间   {{item.startTime}}~{{item.endTime}}</span><span>{{item.distance}}</span></div>
            <div class="discount flex_r_f_s">
              <div class="tip flex_r_s_c">优惠</div>
              <div class="text">骨米会员进店立享{{(1-item.shopDiscount)*10}}折优惠</div>
            </div>
            <div class="shopCouponList flex_r_s_b" v-if="item.couponList.length>0">
              <div class="shopCouponItem" v-for="i in item.couponList" @click.stop="xqLink(i)">
                <div class="imgBox">
                 <img :src="i.compressImg" alt="">
                </div>
                <div class="price">¥{{i.conditionPrice}}</div>
              </div>
            </div>
            <div class="discountInfo flex_r_s_b">
              <span v-if="item.couponNum>0">该商户共有{{item.couponNum}}条优惠信息</span>
              <span class="activeSpan" v-if="item.storeNum>0">共{{item.storeNum}}家门店可用</span>
             </div>
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
      let self = this;
      return{
        city:'',
        searchVal:'',
        shopList:[],
        lng:0,
        lat:0,
        page:0,
        options: {
        	pullDownRefresh: {
        		txt: '更新成功',
        		threshold: 40
        	},
        	pullUpLoad: {
        		txt: {
        			more: '加载更多',
        			noMore: '没有更多数据了',
        		},
        		threshold: 90,

        	}
        },
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
                    self.city = result.addressComponent.city;
                    self.getShopList();
        					}else{
                    alert('定位失败，请刷新重试')
                  }
        				});
        			}
        		}
        	}
        ]
      }
    },
    mounted(){

      //this.getShopList();
    },
    filters:{
      typesFilter(val){
        let tempArr = [];
        if(val.length>1){
          val.forEach((e)=>{
            tempArr.push(e.name)
          });
        }
        return tempArr.join('、')
      }
    },
    methods:{
      onPullingUp(){
        let self = this;
        self.page++;
        self.axios.get(Api.userApi + '/coupon/selectShopCouponListVo', {
          params: {
            keyword:self.searchVal,
            latitude:self.lat,
            longitude:self.lng,
            pageNo:self.page,
            pageSize:10
          }
        }, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then((res)=>{
          if (res.data.code == 1) {

          	if(res.data.data.length>0){

              setTimeout(() => {
                self.$refs.scroll.forceUpdate();
                self.shopList.push(...res.data.data);
              	setTimeout(() => {
              		self.$refs.scroll.refresh();
              	}, 100)
              }, 500)
          	}else{
          		setTimeout(()=>{
          			self.$refs.scroll.forceUpdate();
          	    self.$refs.scroll.refresh();
          		},500)
          	}
          }else{
          	alert(res.data.msg)
          	self.$refs.scroll.forceUpdate();
          }

        })
      },
      onPullingDown(){
       
        this.getShopList();
      },
      shopLink(item){
        this.$router.push({
          name:'shopCoupon',
          query:{
            shopId:item.shopId
          }
        })
      },
      xqLink(i){
        this.$router.push({
          name:'couponXq',
          query:{
            couponId:i.couponId
          }
        })

      },
      getShopList(){
        let self = this;
        this.page=0;
        self.axios.get(Api.userApi + '/coupon/selectShopCouponListVo', {
          params: {
            keyword:self.searchVal,
            latitude:self.lat,
            longitude:self.lng,
            pageNo:0,
            pageSize:10
          }
        }, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then((res)=>{
          if(res.data.code==1){

            if(res.data.data.length<1){
              alert('暂无数据')
              setTimeout(() => {
              	self.shopList = res.data.data;
              	self.$refs.scroll.forceUpdate();
                setTimeout(()=>{
                  self.$refs.scroll.refresh();
                },100)

              }, 500)
            }else{
              setTimeout(() => {
              	self.shopList = res.data.data;
              	self.$refs.scroll.forceUpdate();
                setTimeout(()=>{
                  self.$refs.scroll.refresh();
                },100)

              }, 500)
            }

          }else{
            alert(res.data.msg)
            setTimeout(() => {
            	self.$refs.scroll.forceUpdate();
              setTimeout(()=>{
                self.$refs.scroll.refresh();
              },100)

            }, 500)
          }
        })
      },
      showBtn() {
            let self = this;
            this.$createDialog({
              type: 'confirm',
              title: '提示',
              content: '请下载骨米宠物APP继续',
              confirmBtn: {
                text: '去下载',
                active: true,
                disabled: false,
                href: 'javascript:;'
              },
              cancelBtn: {
                text: '取消',
                active: false,
                disabled: false,
                href: 'javascript:;'
              },
              onConfirm: () => {

              },
              onCancel: () => {

              }
            }).show()
      },


    }
  }
</script>

<style lang="scss">
  .nearbyCoupon{
    height:100%;
    position: relative;
    overflow:hidden;
    .nearByTop{
      height:210px;
      .serchWarp{
        background:linear-gradient(90deg,#fb9c4b,rgba(255,130,96,1),rgba(254,146,113,1),rgba(255,96,96,1));
        height:90px;
        padding:0 20px;
        box-sizing:border-box;
        .location{
          width:150px;
          img{
            width:30px;
          }
          span{
            color:#fff;
            font-size:28px;
            margin-left:10px;
          }
        }
        .search{
          width:484px;
          height:60px;
          border-radius:30px;
          background:#fff;
          padding:0 20px;
          box-sizing:border-box;
          input{
            font-size:26px;
            width:400px;
          }
          img{
            width:34px;
          }
        }
      }
      .titleBox{
        padding:0 20px;
        box-sizing:border-box;
        height:120px;
        .title_l{
          font-size:30px;
          color:#000;
          font-weight:bold;
        }
        .title_r{
          width:160px;
          height:40px;
          background:linear-gradient(0deg,#fb9c4b,rgba(255,130,96,1),rgba(254,146,113,1),rgba(255,96,96,1));
          border-radius:10px;
          color:#fff;
          font-size:22px;
        }
      }
    }
    .nearbyCouponList{
      position: absolute;

      top:210px;
      left:0;
      bottom:0;
      right:0;
      box-sizing: border-box;
      ul{
        padding: 0 20px 28px 20px;
      }
      li{
        align-items:flex-start;
        margin-top:30px;
        box-shadow:0px 4px 12px 0px rgba(15,15,15,0.16);
        border-radius:10px;
        padding:30px;
        box-sizing:border-box;
        .list_l{
          width:150px;
          height:150px;
          border-radius:8px;

          img{
            width:100%;
            height:100%;
            object-fit: cover;
            border-radius:8px;
          }
        }
        .list_r{
          width:430px;
          .shopName{
            font-size:28px;
            color:#000;
          }
          .types{
            color:#999;
            font-size:22px;
            line-height:32px;
            padding-top:20px;
          }
          .openTime{
            font-size:24px;
            color:#000;
            padding-top:20px;
          }
          .discount{
            padding-top:20px;
            font-size:22px;
            .tip{
              width:70px;
              height:30px;
              background:#FF523D;
              border-radius:15px;
              color:#fff;

            }
            .text{
              margin-left:10px;
              color:#ff523d;
            }
          }
          .shopCouponList{
            padding-top:32px;
            .shopCouponItem{
              width:90px;
              .price{
                color:#ff523d;
                font-size:24px;
                text-align: center;
                padding:10px 0;
              }
              .imgBox{
                width:90px;
                height:90px;
                border-radius:10px;
                img{
                  width:100%;
                  height:100%;
                  object-fit: cover;
                  border-radius:10px;
                }
              }
            }

          }
          .discountInfo{
            font-size:22px;
            color:#666666;
            padding-top:20px;
            .activeSpan{
              color:#ff523d;
            }
          }
        }
      }
    }
  }
</style>
