<template>
  <div class="nearbyActivity">
    <div class="dataDia flex_r_s_c" v-show="isDia">
      <div class="diaCnt">
        <div class="title">日期选择</div>
        <div class="flex_r_s_b timeBox">

          <div class="timeBtn" @click="showDatePicker">{{time1}}</div>
          <span>-</span>
          <div class="timeBtn"  @click="showDatePicker2">{{time2}}</div>
        </div>
        <div class="btnBox flex_r_f_e">
          <div @click="diaHide">取消</div>
          <div style="color:#ff523d" @click="selectTime">确定</div>
        </div>
      </div>
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
            <img @click="getActivityList" src="../../assets/icon/icon-search@1x.png" alt="">
          </div>
        </div>
        <div class="nearbyNav flex_r_f_e">
          <div @click="showPicker1" :class="{active:navindex1==1}">
            <span>分类</span>
            <i class="cubeic-select"></i>

          </div>
          <div @click="showPicker2" :class="{active:navindex2==2}">
            <span>位置</span>
            <i class="cubeic-select"></i>
          </div>
          <div @click="showPicker3" :class="{active:navindex3==3}">
            <span>日期</span>
            <i class="cubeic-select"></i>
          </div>
          <div @click="showPicker4" :class="{active:navindex4==4}">
            <span>价格</span>
            <i class="cubeic-select"></i>
          </div>
        </div>
    </div>
    <div class="nearbyActivityList">
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
              <div>
                <div class="price" v-if="item.maxPrice == 0">免费</div>
                <div class="price" v-if="item.maxPrice>0&&item.maxPrice!=item.minPrice">{{item.minPrice}} ~ {{item.maxPrice}}元</div>
                <div class="price" v-if="item.maxPrice==item.minPrice&&item.maxPrice>0">{{item.maxPrice}}元</div>
              </div>
    					<div class="surplusBox">
                <!-- <div class="surplus">仅剩{{item.limitNum-item.joinNum}}名额</div> -->
                <router-link class="flex_r_s_c" v-if="item.isConduct===1" :to="{name:'activity',query:{id:item.id}}">立即报名</router-link>
                <a class="flex_r_s_c grayBg" v-if="(new Date()).getTime()<(new Date(item.startTime)).getTime()&&item.isConduct!=1">未开始</a>
                <a class="flex_r_s_c grayBg" v-if="(new Date()).getTime()>=(new Date(item.endTime)).getTime()&&item.isConduct!=1">已过期</a>
              </div>
    					<!-- <a href="###" class="flex_r_s_c">立即报名</a> -->

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
  export default{
    data(){
      let self = this;
      return{
        isDia:false,
        searchVal:'',
        navindex1:'',
        navindex2:'',
        navindex3:'',
        navindex4:'',
        typeData:[{value:'',text:'全部'}],
        val1:'',
        val2:'',
        val3:'',
        val4:-1,
        time1:'',
        time2:'',
        lng:0,
        lat:0,
        city:'',
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
        page:0,
        activityList:[],
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
                    self.getActivityList();
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
    mounted() {
      this.getTypes();
      //this.getActivityList();
    },
    methods:{
      getTypes(){
        let self = this;
        self.axios.post(Api.userApi + '/ca/selectCommunityActivityType',{
        	headers: {
        		'Content-Type': 'application/x-www-form-urlencoded'
        	}
        }).then((res)=>{
          if(res.data.code==1){
            res.data.data.forEach((e)=>{
              self.typeData.push({
                value:e.typeId,
                text:e.typeName
              })
            })
          }
        })
      },
      showPicker1() {
        if (!this.picker) {
          let self = this;
          this.picker = this.$createPicker({
            title: '分类',
            data: [self.typeData],
            onSelect: function(selectedVal, selectedIndex, selectedText){
              if(selectedText=='全部'){
                self.navindex1 = '';
                self.val1 = selectedVal[0];
                self.getActivityList();
              }else{
                self.val1 = selectedVal[0];
                console.log(selectedVal[0])
                self.navindex1 = 1;
                self.getActivityList();
              }
            },
            onCancel: function(){

            }
          })
        }
        this.picker.show()
      },
      showPicker2() {
        if (!this.picker2) {
          let self = this;
          this.picker2 = this.$createPicker({
            title: '位置',
            data: [[{value:'',text:'全部'},{value:3,text:'3km以内'},{value:5,text:'5km以内'},{value:10,text:'10km以内'},{value:20,text:'20km以内'}]],
            onSelect: function(selectedVal, selectedIndex, selectedText){
                if(selectedText=='全部'){
                  self.navindex2 = '';
                  self.val2 = selectedVal[0];
                  self.getActivityList();
                }else{
                  self.val2 = selectedVal[0];
                  self.navindex2 = 2;
                  self.getActivityList();
                }
            },
            onCancel: function(){

            }
          })
        }
        this.picker2.show()
      },
      showPicker3() {
        if (!this.picker3) {
          let self = this;
          this.picker3 = this.$createPicker({
            title: '日期',
            data: [[{value:'',text:'全部'},{value:1,text:'今天'},{value:2,text:'本周'},{value:3,text:'本月'},{value:'',text:'自定义'}]],
            onSelect: function(selectedVal, selectedIndex, selectedText){
                if(selectedText=='全部'){
                  self.navindex3 = '';
                  self.val3 = selectedVal[0];
                  self.time2 = '';
                  self.time1 = '';
                  self.getActivityList();
                }else if(selectedText=='自定义'){
                  self.isDia = true;
                }else{
                  self.val3 = selectedVal[0];
                  self.navindex3 = 3;
                  self.time2 = '';
                  self.time1 = '';
                  self.getActivityList();
                }
            },
            onCancel: function(){

            }
          })
        }
        this.picker3.show()
      },
      showPicker4() {
        if (!this.picker4) {
          let self = this;
          this.picker4 = this.$createPicker({
            title: '价格',
            data: [[{value:-1,text:'全部'},{value:0,text:'免费'},{value:1,text:'付费'}]],
            onSelect: function(selectedVal, selectedIndex, selectedText){

                if(selectedText=='全部'){
                  self.navindex4 = '';
                  self.val4 = selectedVal[0];
                  self.getActivityList();
                }else{
                  self.val4 = selectedVal[0];

                  self.navindex4 = 4;
                  self.getActivityList();
                }
            },
            onCancel: function(){

            }
          })
        }
        this.picker4.show()
      },
      getActivityList() {
      	let self = this;
      	self.axios.post(Api.userApi + '/ca/selectCommunityActivityList', self.qs.stringify({
      		param:self.searchVal,
          typeIds:self.val1,
          distance:self.val2,
          time:self.val3,
          startTime:self.time1,
          endTime:self.time2,
          ticketType:self.val4,
      		pageNo: 0,
      		pageSize:10,
      		latitude:self.lat,
      		longitude:self.lng
      	}), {
      		headers: {
      			'Content-Type': 'application/x-www-form-urlencoded'
      		}
      	}).then((res) => {
      		if (res.data.code == 1) {

      			setTimeout(() => {
      				self.activityList = res.data.data;
              //console.log(self.activityList)
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
      onPullingUp(){
        let self = this;
        self.page++
        self.axios.post(Api.userApi + '/ca/selectCommunityActivityList', self.qs.stringify({
        	param:self.searchVal,
        	typeIds:self.val1,
        	distance:self.val2,
        	time:self.val3,
        	startTime:self.time1,
        	endTime:self.time2,
        	ticketType:self.val4,
        	pageNo:self.page,
        	pageSize:10,
        	latitude:self.lat,
        	longitude:self.lng
        }), {
        	headers: {
        		'Content-Type': 'application/x-www-form-urlencoded'
        	}
        }).then((res) => {
        	if (res.data.code == 1) {

        		if(res.data.data.length>0){

              setTimeout(() => {
                self.$refs.scroll.forceUpdate();
                self.activityList.push(...res.data.data);
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
        this.page = 0;
        this.getActivityList();
      },
      diaHide(){
        this.isDia = false;
      },
      selectTime(){
        this.isDia = false;
        this.getActivityList();
      },
      showDatePicker() {
          let self = this;
         if (!this.datePicker) {
           this.datePicker = this.$createDatePicker({
             title: '时间选择',
             min: new Date(2008, 7, 8),
             max: new Date(),
             value: new Date(),
             onSelect: function(date, selectedVal, selectedText){

               self.time1 = selectedText.join('-');
               console.log(self.time1)
               if(self.time2!=''&& new Date(selectedText.join('-')).getTime()>new Date(self.time2).getTime()){
                 let temp = self.time2;
                 self.time2 = self.time1;
                 self.time1 = temp;

               }else if(self.time2!=''&& new Date(selectedText.join('-')).getTime()==new Date(self.time2).getTime()){
                 self.time2 = '';
                 self.time1 = selectedText.join('-');;
               }
             },
             onCancel: function(){

             }
           })
         }

         this.datePicker.show()
       },

      showDatePicker2() {
         let self = this;
         if (!this.datePicker2) {
           this.datePicker2 = this.$createDatePicker({
             title: '时间选择',
             min: new Date(2008, 7, 8),
             max: new Date(),
             value: new Date(),
             onSelect: function(date, selectedVal, selectedText){

               if(self.time1==''){
                 self.time1 = selectedVal;
                 self.time2 = '';
               }
               self.time2 = selectedText.join('-');
               if(self.time1!=''&& new Date(selectedText.join('-')).getTime()<new Date(self.time1).getTime()){
                 let temp = self.time2;
                 self.time2 = self.time1;
                 self.time1 = temp;

               }else if(self.time1!=''&& new Date(selectedText.join('-')).getTime()==new Date(self.time1).getTime()){
                 self.time1 = selectedText.join('-');;
                 self.time2 = '';
               }
             },
             onCancel: function(){

             }
           })
         }

         this.datePicker2.show()
       },


    }
  }
</script>

<style lang="scss">
  .nearbyActivity{
    height:100%;
    position: relative;
    .dataDia{
      position: fixed;
      height:100%;
      width:100%;
      box-sizing:border-box;
      left:0;
      top:0;
      background:rgba(0,0,0,0.6);
      z-index:100;
      .diaCnt{
        width:600px;
        height:350px;
        border-radius:10px;
        background:#fff;
        .title{
          font-size:28px;
          color:#000;
          text-align:center;
          padding-top:30px;
        }
        .timeBox{
          width: 450px;
          margin:0 auto;
          padding-top:60px;
          .timeBtn{
            height:50px;
            width:200px;
            border:1px solid #e8e8e8;
            line-height:50px;
            text-align:center;
            font-size:26px;
            color:#000;
          }
          span{
            margin: 0 10px;

          }
        }
        .btnBox{
          padding-top:100px;
          div{
            font-size:28px;
            color:#000;
          }
        }
      }
    }
    .nearByTop{
      height:160px;
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
      .nearbyNav{
        height:70px;
        border-bottom:1px solid #ff523d;/*no*/
        div{
          font-size:28px;
          color:#000;
          i{
            color:#000;
          }
        }

        .active{
          color:#ff523d;
          i{
            color:#ff523d;

          }
        }
      }
    }
    .nearbyActivityList {

      background:#fff;
    	overflow: hidden;
    	padding: 20px 20px 28px 20px;
      position: absolute;
      top:160px;
      left:0;
      bottom:0;
      right:0;
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
          .surplusBox{
            width:154px;
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
