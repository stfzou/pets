<template>
	<div class="authorActivity">

		<div class="activityList">
			<cube-scroll ref="scroll" :options="options" @pulling-up="onPullingUp" @pulling-down="onPullingDown">
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
							<div class="price" v-if="item.maxPrice == 0">免费</div>
							<div class="price" v-if="item.maxPrice>0&&item.maxPrice!=item.minPrice">{{item.minPrice}} ~ {{item.maxPrice}}元</div>
              <div class="price" v-if="item.maxPrice==item.minPrice&&item.maxPrice>0">{{item.maxPrice}}元</div>
							<!-- <a href="###" class="flex_r_s_c">立即报名</a> -->
							<router-link class="flex_r_s_c" v-if="item.isConduct===1" :to="{name:'activity',query:{id:item.id}}">立即报名</router-link>
              <a class="flex_r_s_c grayBg" v-if="(new Date()).getTime()<(new Date(item.startTime)).getTime()&&item.isConduct!=1">未开始</a>
              <a class="flex_r_s_c grayBg" v-if="(new Date()).getTime()>=(new Date(item.endTime)).getTime()&&item.isConduct!=1">已过期</a>
						</div>
					</div>
				</div>
			</cube-scroll>
		</div>
		<div class="amap-page-container" v-show="false">
			<el-amap ref="map" vid="amapDemo" :plugin="plugin" class="amap-demo"></el-amap>

		</div>
	</div>
</template>

<script>

	import Api from '../common/apj.js'
	export default {
		data() {
			let self = this;
			return {
        aId:'',
				activityList: [],
        isLoading:true,
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
				lng: 0,
				lat: 0,
				page:0,
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


									}
								});
							}
						}
					}
				]
			}
		},
		mounted() {
      this.getUrlData();
      this.getActivityList();
		},
		methods: {
      
      showToastType() {
        const toast = this.$createToast({
          txt: 'TA还没有活动',
          type: 'warn'
        })
        toast.show()
      },
      getUrlData() { // 截取url中的数据
      	let tempStr = window.location.href;
      	/**
      	 * tempArr 是一个字符串数组 格式是["key=value", "key=value", ...]
      	 */
      	let returnArr = {};
      	let urlArr = tempStr.split('?');
      	if(urlArr){
      	  urlArr.forEach((e)=>{

      	      if(e.indexOf('=')>-1){

      	        returnArr[e.split('=')[0]] = e.split('=')[1];
      	      }

      	  })
      	}
      	/*输出日志*/
      	if(returnArr.aId!=undefined){
      		//localStorage.setItem('Aid',JSON.stringify(returnArr.aId));
          this.aId = returnArr.aId;
      	}
      },
			getActivityList() {
				let self = this;
				self.axios.post(Api.userApi + '/ca/selectCommunityActivityListByUserId', self.qs.stringify({
					userId: self.aId,
					pageNo: 0,
					pageSize: 5,
					latitude: self.lat,
					longitude: self.lng
				}), {
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					}
				}).then((res) => {
					if (res.data.code == 1) {

						setTimeout(() => {
							self.activityList = res.data.data;
              console.log(self.activityList)
							self.$refs.scroll.forceUpdate();
              setTimeout(()=>{
                self.$refs.scroll.refresh();
              },100)

						}, 500)
					}else{
						alert(res.data.msg)
						self.$refs.scroll.forceUpdate();
					}
				})
			},
			onPullingDown() {
			// 模拟更新数据
				this.getActivityList();
			},
			onPullingUp() {
			// 模拟更新数据
				let self = this;
				this.page++;
				self.axios.post(Api.userApi + '/ca/selectCommunityActivityListByUserId', self.qs.stringify({
					userId: self.aId,
					pageNo: self.page,
					pageSize: 5,
					latitude: self.lat,
					longitude: self.lng
				}), {
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					}
				}).then((res)=>{
					if(res.data.code == 1){
						if(res.data.data.length>0){

							setTimeout(()=>{
                self.$refs.scroll.forceUpdate();
                self.activityList.push(...res.data.data)
								self.$refs.scroll.refresh();

							},800)

						}else{
							setTimeout(()=>{
								self.$refs.scroll.forceUpdate();
                self.$refs.scroll.refresh();
							},500)
						}

					}else{
						alert(res.data.msg);
						self.$refs.scroll.forceUpdate();

					}
				})

			}
		}
	}
</script>

<style lang="scss">
	.authorActivity {
		.cube-scroll-wrapper {
			overflow: initial;

		}
    .cube-pullup-wrapper{
      padding-top: 20px;
    }
    .cube-pullup-wrapper .before-trigger{
      padding: 0;
      height: 50px;
      line-height: 50px;
    }
		.cube-scroll-list-wrapper {
			overflow: initial;
		}

		.activityList {
      height: 800px;
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

						img {
							width: 26px;
						}

						span {
							font-size: 28px;
							color: #666;
							margin-left: 10px;
						}
					}

					.activityAddr {
						height: 48px;

						.addr-l {
							overflow: hidden;
							width: 500px;

							img {
								width: 26px;
							}

							span {
								font-size: 26px;
								color: #666;
								margin-left: 10px;
							}
						}

						.addr-r {
							width: 180px;
							font-size: 26px;
							color: #666;
							margin-left: 10px;
							text-align: right;
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
							background: #ff523d;
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
