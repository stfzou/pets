<template>
	<div class="selectCoupon">
		<div class="top_nav flex_r_s_b">
			<div class="back" @click="back"></div>
			<div class="nav_title">选择票券</div>
		</div>
		<div class="couponInfo flex_r_s_b">
			<div class="c_l">
				<img :src="activityCover" alt="">
			</div>
			<div class="c_r">
				<div class="activiName">{{activiName}}</div>
				<div class="price">{{priceInterval}}</div>
				<div class="time">时间:{{startTime}}~{{endTime}}</div>
				<div class="address flex_r_f_s">
					<img src="../../assets/icon/map@2x.png" alt="">
					<span>{{address}}</span>
				</div>
			</div>
		</div>
		<div class="couponList">
			<ul>
				<li :class="{active:index == activeIndex}" v-for="(item,index) in ticketList" @click="selectTicket(item,index)">
					<div class="couponLiBox">
						<img class="select" src="../../assets/icon/selectCoupon.png" alt="" v-if="index == activeIndex">
						<div class="couponName">{{item.ticketName}}</div>
						<div class="couponBox flex_r_s_b">
							<div class="couponBox_l">
								<div class="price" v-if="item.ticketType == 1">￥{{item.ticketPrice}} ({{item.useNum|useNumFilter}})</div>
								<div class="price" v-else="">￥免费 ({{item.useNum|useNumFilter}})</div>
								<div class="couponNum">
									<span class="sy">剩余{{item.ticketNum-item.sellNum}}张</span>
									<span>每人限购{{item.limitNum}}张</span>
								</div>
                <div class="makeTime">使用时间:{{item.validStartTime.split(' ')[0]}}~{{item.validEndTime.split(' ')[0]}}</div>
                <div class="buyTime">购票时间:{{item.buyStartTime}}~{{item.buyEndTime}}</div>
								<div class="special_tx flex_r_f_s" v-if="item.useNum>1">
									每日使用次数不超过{{item.useNum}}次
								</div>
								<div class="tx">【购买此票券需经过主办方审核】</div>
							</div>
							<div class="couponBox_r">
								<div class="num_box flex_r_f_s">
									<div class="add flex_r_s_c" style="width: 33.333%;" @click.stop="reduce(item,index)">
										<img src="../../assets/reduce.png" alt="">
									</div>
									<input style="width: 33.333%;" type="text" @blur.prevent="inputLoseFocus" v-model="item.isUse" @change="number(item,index)">
									<div style="width: 33.333%;" class="reduce flex_r_s_c" @click.stop="add(item,index)">
										<img src="../../assets/add.png" alt="">
									</div>
								</div>
								<div class="isTuiPiao">
									{{item.isBearRefund | isBearRefund}}
								</div>
							</div>
						</div>
					</div>
					<div class="dotted" v-if="item.ticketDescription!=''">
						{{item.ticketDescription}}
					</div>
				</li>
			</ul>
		</div>

    <div v-if="isCommit" class="couponBtn activeCommit flex_r_s_c">不在购买时间内暂不可购买</div>
		<div v-else class="couponBtn flex_r_s_c" @click="commit">下一步</div>

	</div>
</template>

<script>
	import Api from '../common/apj.js'
	export default {
		data() {
			let self = this;
			return {
				activeIndex:0,
				ticketList:[],
				activiName:'',
				priceRange:'',
				startTime:'',
				endTime:'',
				address:'',
				priceInterval:'',
				distance:'',
				activityCover:'',
				ticketInfo:null,
				lng:0,
				lat:0,
        startParse:0,
        endParse:0,
        isCommit:false

			}
		},
		mounted() {
			// this.format("2019-03-14 11:56:00",'123')

      this.getTicket();
		},
		filters:{
			isBearRefund(val){
				if(val==1){
					return '支持退票'
				}else{
					return '不支持退票'
				}
			},
			useNumFilter(val){
				if(val == 1){
					return '单次票'
				}else{
					return '连次票'
				}
			}
		},
		methods: {
			inputLoseFocus() {
				setTimeout(() => {
				  const scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0;
					window.scrollTo(0, Math.max(scrollHeight - 1, 0));
				},100);

			},
			back() {
				this.$router.go(-1); //返回上一层
			},
			add(item,index) {
				if(index == this.activeIndex){
					if(item.isUse>=item.limitNum){
            this.tip('购买数量超过限制');
						item.isUse = item.limitNum;
						this.ticketInfo.ticketNum = item.limitNum;
					}else{
						item.isUse++;
						this.ticketInfo.ticketNum = item.isUse;
					}
				}else{
					if(item.isUse>=item.limitNum){
						item.isUse = item.limitNum;
					}else{
						item.isUse++;
					}
				}
			},
			reduce(item,index) {
				// console.log(index == this.activeIndex)
				if(index == this.activeIndex){
					if(item.isUse<=1){
						item.isUse = 1;
						this.ticketInfo.ticketNum = item.isUse;

					}else{
						item.isUse--;
						this.ticketInfo.ticketNum = item.isUse;
					}
				}else{
					if(item.isUse<=1){
						item.isUse = 1;
					}else{
						item.isUse--;

					}
				}
			},
			number(item,index) {
				item.isUse = item.isUse.replace(/[^\.\d]/g, '');
				item.isUse = item.isUse.replace('.', '');
				if(index == this.activeIndex){
					if(item.isUse>=item.limitNum){
						item.isUse = item.limitNum;;
						this.ticketInfo.ticketNum = item.limitNum;
					}else{
						this.ticketInfo.ticketNum = item.isUse;
					}
				}else{
					if(item.isUse>=item.limitNum){
						item.isUse = item.limitNum;
					}
				}
			},
			getTicket(){
				let self = this;
				self.axios.post(Api.userApi+'/ca/selectCommunityActivityJoinVo',self.qs.stringify({
					id:JSON.parse(localStorage.getItem('id')),
					latitude:self.lat,
					longitude:self.lng
				}), {
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					}
				}).then((res)=>{
					if(res.data.code == 1){
						console.log(res)
						self.activiName = res.data.data.activityTitel;
						self.priceRange = res.data.data.priceInterval;
						self.address = res.data.data.address;
						self.distance = res.data.data.distance;
						self.startTime = self.format(res.data.data.startTime);
						self.endTime = self.format(res.data.data.endTime);
						self.ticketList = res.data.data.tickets;
						self.activityCover = res.data.data.activityCover;
						self.ticketList.forEach((e)=>{
							e.isUse = 1;
						})
            self.startParse = Date.parse(new Date(self.ticketList[0].buyStartTime));
            self.endParse = Date.parse(new Date(self.ticketList[0].buyEndTime));
            let nowParse = Date.parse(new Date());
            if(nowParse<this.startParse||nowParse>this.endParse){
              self.isCommit = true;
            }else{
              self.isCommit = false;
            }
						self.ticketInfo = {
							cAId:JSON.parse(localStorage.getItem('id')),
							userId:JSON.parse(localStorage.getItem('user')).userId,
							ticketId:self.ticketList[0].ticketId,
							ticketNum:self.ticketList[0].isUse,
							ticketType:self.ticketList[0].ticketType,
							syticketNum:self.ticketList[0].ticketNum-self.ticketList[0].sellNum
						}
						self.priceInterval = res.data.data.priceInterval;
					}
				})
			},
			format(str){
				let tmp = str.split(" ");
				let arrr = tmp[0].split("-");
				return arrr.slice(1,3).join("/");
			},
			selectTicket(item,index){
				this.activeIndex = index;
        this.startParse = Date.parse(new Date(item.buyStartTime));
        this.endParse = Date.parse(new Date(item.buyEndTime));
        let nowParse = Date.parse(new Date());
        if(nowParse<this.startParse||nowParse>this.endParse){
          this.isCommit = true;
        }else{
          this.isCommit = false;
        }
				this.ticketInfo = {
					cAId:JSON.parse(localStorage.getItem('id')),
					userId:JSON.parse(localStorage.getItem('user')).userId,
					ticketId:item.ticketId,
					ticketNum:item.isUse,
					ticketType:item.ticketType,
					syticketNum:item.ticketNum-item.sellNum
				}
			},
			commit(){
				let self = this;

				if(this.ticketInfo.ticketNum>this.ticketInfo.syticketNum){
					let toast = self.$createToast({
						txt: '不能超过剩余票券数量',
						type: 'error'
					  })
					toast.show();
					return false;
				}else{
					this.$store.commit('setTicket',this.ticketInfo);
					this.$router.push({
						name:'activityEnter'
					})
				}

			},
      tip(msg){
        let toast = this.$createToast({
        	txt: msg,
        	type: 'error'
          })
        toast.show();
      }

		}
	}
</script>

<style lang="scss">
	@import '../../style/common.scss';
	@import '../../style/mixin.scss';
	.selectCoupon {
		padding-top: 88px;
		padding-bottom:116px;
		background: #f5f5f5;
		box-sizing: border-box;
    height:100%;
    box-sizing:border-box;
    overflow:auto;
		.top_nav {
			padding: 0 20px;
			height: 88px;
			box-sizing: border-box;
			position: fixed;
			border-bottom: 1px solid #FF523D;
			background: #fff;
			left: 0;
			top: 0;
			z-index: 100;

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

			}

		}

		.couponInfo {
			background: #fff;
			padding: 20px;
			box-sizing: border-box;

			.c_l {
				width: 270px;
				height: 180px;

				img {
					width: 100%;
					height: 100%;
					border-radius: 7px;
				}
			}

			.c_r {
				width: 390px;

				.activiName {
					font-size: 28px;
					color: #000;
					line-height: 34px;
				}

				.price {
					font-size: 26px;
					color: #FF523D;
					line-height: 56px;
					height: 56px;
				}

				.time {
					font-size: 22px;
					color: #666;
				}

				.address {
					margin-top: 10px;

					img {
						width: 18px;
						margin-right: 10px;
					}

					span {
						font-size: 22px;
						color: #666;
					}
				}
			}
		}

		.couponList {
			ul {
				overflow: hidden;
				padding: 0 20px;

				li {
					padding-bottom: 10px;
					box-sizing: border-box;
          border: 1px solid #fff;
					background: #fff;
					margin-top: 30px;
					box-shadow:0px 0px 8px 0px rgba(104,104,104,0.1);
					position: relative;
          .makeTime{
            font-size:24px;
            color:#666;
            padding:20px 0 10px 0;
          }
          .buyTime{
            font-size:22px;
            color:#999;
            padding:10px 0;
          }
					.dotted{
						padding: 20px;
						padding-bottom: 10px;
						border-top: 1px dashed #e8e8e8;/*no*/
						font-size: 24px;
            line-height:34px;
						color: #666;
						word-wrap:break-word;
						word-break:break-all;
					}
					.couponLiBox{
						padding: 20px;
					}
					.select{
						position: absolute;
						top: 0.5px;
						right: 0.5px;
						width: 40px;
					}
					.couponName{
						font-size: 28px;
						color: #000;
					}
					border-radius:10px;
					.couponBox {
						margin-top: 20px;
						.couponBox_l{
							width: 500px;
							.price{
								font-size: 30px;
								color: #FF523D;
								margin-bottom: 10px;
							}
							.couponNum{
								line-height: 34px;
								color: #666;
								font-size: 24px;
								.sy{
									margin-right: 30px;
								}
							}
							.special_tx{
								line-height: 34px;
								color: #666;
								font-size: 24px;
							}
							.tx{
								font-size: 24px;
								color: #999;
								line-height: 34px;
							}
						}
						.couponBox_r {
							.num_box {
								width: 160px;
								height: 44px;
								border-radius: 40px;
								background: #FF523D;

								div {
									img {
										width: 24px;
									}
								}

								input {
									height: 40px;
									text-align: center;
									color: #FF523D;
									font-size: 24px;
									outline: none;

								}

								.add {
									height: 40px;
								}
							}
							.isTuiPiao{
								text-align: center;
								font-size: 24px;
								color: #666;
								margin-top: 20px;
							}
						}
					}
				}
				.active{
					border: 1px solid #FF523D;
				}
			}
		}
		.couponBtn{
			height: 96px;
			position: fixed;
			left: 0;
			bottom: 0;
			background: #FF523D;
			color: #fff;
			font-size: 30px;
		}
    .activeCommit{
      background:#FFAB3D;
    }
	}
</style>
