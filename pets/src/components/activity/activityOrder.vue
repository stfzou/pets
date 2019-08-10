<template>
	<div class="activityOrder">
		<div class="top_nav flex_r_s_b">
			<div class="back" @click="back"></div>
			<div class="nav_title">订单结算</div>
		</div>
		<div class="couponInfo flex_r_s_b">
			<div class="c_l">
				<img :src="activityImg" alt="">
			</div>
			<div class="c_r">
				<div class="activiName">{{typeName}}</div>
				<div class="time">{{startTime}}~{{endTime}}</div>
				<div class="address flex_r_f_s">
					<span>{{addr}}</span>
				</div>
			</div>
		</div>
		<div class="ticket_box">
			<div class="ticketInfo">
				<div class="ticket">
					<div class="title">票劵信息</div>
					<div class="name">{{ticketName}}</div>
					<div class="price flex_r_s_b"><span class="price_l">￥{{ticketPrice}}</span><span class="price_r">x{{ticketNum}}</span></div>
				</div>
				<div class="user">
					<div class="title">报名信息</div>
					<div class="userInfo">
						<span class="userName">{{userName}}</span>
						<span class="phone">{{phone}}</span>
					</div>
				</div>
			</div>
			<div class="buyTx">
				<div class="title">购买须知</div>
				<div class="cnt">
					<p>1、请确认活动票券和时间地址无误，购票成功后将不予退换</p>
					<p>2、购票成功后，会收到购票信息短信</p>
					<p>3、下单即代表你同意<a href="###">《自由犬用户服务协议》</a></p>
				</div>
			</div>
		</div>
		<div class="activityOderFoot flex_r_s_b">
			<div class="payMoney">待支付:￥{{totalPrice}}</div>
			<div class="payBtn flex_r_s_c" @click="popupShow">立即支付</div>

		</div>
		<div class="popup" @click.stop="popuphide" v-if="isPopup">
			<div class="payBox" @click.stop>
				<div class="popupTitle flex_r_s_c">在线支付</div>
				<div class="payment flex_r_s_b">
					<span class="payment_l">需付款</span>
					<span class="payment_r">￥{{totalPrice}}</span>
				</div>
				<div class="payStyle flex_r_f_e">
					<div class="flex_c_f_e">
						<div class="payImg" @click="clickAli">
							<img src="../../assets/zfb.png" alt="">
							<div class="select" v-show="activeIndex == '1'"></div>
						</div>
						<p>支付宝支付</p>
					</div>
					<div class="flex_c_f_e">
						<div class="payImg" @click="clickWx">
							<img src="../../assets/weixin.png" alt="">
							<div class="select" v-show="activeIndex == '2'"></div>
						</div>
						<p>微信支付</p>
					</div>
				</div>
				<div class="payBtn flex_r_s_c" @click="commit">确认支付</div>
			</div>
		</div>

	</div>
</template>

<script>
	import Api from '../common/apj.js'
	import weixinPay from '../common/weixinPay.js'
	export default {
		data() {

			return {
				val: '',
				activityImg: '',
				addr: '',
				endTime: '',
				startTime: '',
				typeName: '',
				ticketName: '',
				isPopup: false,
				ticketNum: '',
				ticketPrice: '',
				totalPrice: '',
				phone: '',
				userName: '',
				code:'',
				environment:'',
				activeIndex:'2',
				cAId:''
			}
		},
		mounted() {

			// let arr = window.location.href.split("?")[1];
      console.log(this.$store.state.activityInfo.CAorderId)
			this.cAOrderId = this.$store.state.activityInfo.CAorderId;
			// alert(this.cAOrderId);
			this.getEnvironment();
		},
		methods: {
			getEnvironment(){
				var ua = window.navigator.userAgent.toLowerCase();
				if (ua.match(/MicroMessenger/i) == 'micromessenger') {
					this.environment = '0';
					this.getCode();
				} else {
					let self = this;
					this.environment = '1';
					this.axios.post(Api.userApi + '/ca/selectSettlementCommunityActivityOrder', this.qs.stringify({
						cAOrderId: self.cAOrderId
					}), {
						headers: {
							'Content-Type': 'application/x-www-form-urlencoded'
						}
					}).then((res)=>{
						if(res.data.code == 1){
							let d = res.data.data;
							self.cAId = d.cAId;
							self.activityImg = d.communityActivityVo.activityCover;
							self.addr = d.communityActivityVo.activityAddr;
							self.typeName = d.communityActivityVo.typeName;
							self.startTime = self.format(d.communityActivityVo.startTime);
							self.endTime = self.format(d.communityActivityVo.endTime);
							self.ticketName = d.ticketName;
							self.ticketNum = d.ticketNum;
							self.ticketPrice = d.ticketPrice;
							self.totalPrice = d.totalPrice;
							self.ticketNum = d.ticketNum;
							self.userName = d.name;
							self.phone = d.phone;
						}else{
							alert(res.data.msg)
						}
					})
				}
			},

			getUrlData() {// 截取url中的数据

				   let tempStr = window.location.href
				   /**
				   * tempArr 是一个字符串数组 格式是["key=value", "key=value", ...]
				   */
				   let tempArr = tempStr.split('?')[1] ? tempStr.split('?')[1].split('&') : []
				   /**
				   * returnArr 是要返回出去的数据对象 格式是 { key: value, key: value, ... }
				   */
				   let returnArr = {}
				   tempArr.forEach(element => {
				   returnArr[element.split('=')[0]] = element.split('=')[1]
				   })
				  /*输出日志*/
				   // console.log(returnArr)
			},
			getUrlPara(name) {
				var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)","i");
				var r = window.location.search.substr(1).match(reg);
				if (r!=null) return (r[2]);
				return null;
			},
			getCode () { //静默授权
				let self = this;
				this.code = this.getUrlPara('code');
				const local = window.location.href;
				if (this.code == null || this.code === '') {
					window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxdf1774932d9dd96e&redirect_uri='+encodeURIComponent(local)+'&response_type=code&scope=snsapi_base&state='+this.cAOrderId+'#wechat_redirect';

				}else{

						this.axios.post(Api.userApi + '/ca/selectSettlementCommunityActivityOrder', this.qs.stringify({
							cAOrderId: self.getUrlPara('state')
						}), {
							headers: {
								'Content-Type': 'application/x-www-form-urlencoded'
							}
						}).then((res)=>{
							if(res.data.code == 1){
								let d = res.data.data;
								self.activityImg = d.communityActivityVo.activityCover;
								self.addr = d.communityActivityVo.activityAddr;
								self.typeName = d.communityActivityVo.typeName;
								self.startTime = self.format(d.communityActivityVo.startTime);
								self.endTime = self.format(d.communityActivityVo.endTime);
								self.ticketName = d.ticketName;
								self.ticketNum = d.ticketNum;
								self.ticketPrice = d.ticketPrice;
								self.totalPrice = d.totalPrice;
								self.ticketNum = d.ticketNum;
								self.userName = d.name;
								self.phone = d.phone;
							}else{
								alert(res.data.msg)
							}
						})

				}


			},
			clickWx(){
				this.activeIndex = '2';
			},
			clickAli(){
				this.activeIndex = '1';
			},
			back() {
				this.$router.go(-1); //返回上一层
			},
			popupShow() {
				this.isPopup = true;
			},
			popuphide() {
				this.isPopup = false;
			},
			format(str) {
				let tmp = str.split(" ");
				let arrr = tmp[0].split("-");
				return arrr.slice(1, 3).join("/");
			},
			commit(){
				if(this.activeIndex == '2'&&this.environment == '0'){
					this.wxPay();
				}else if(this.activeIndex == '2'&&this.environment == '1'){
					this.wxH5Pay();
				}else if(this.activeIndex == '1'){
					this.aliPay();
				}
			},
			wxPay () { // 通过code获取 openId等用户信息，/api/user/wechat/login 为后台接口

				let self = this;
				this.axios.post(Api.userApi + '/ca/wxPay/gzhh5/prepay', this.qs.stringify({
					cAOrderId: self.getUrlPara('state'),
					code:self.getUrlPara('code')
				}), {
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					}
				}).then((res) => {
					if (res.data.code == 1) {
						WeixinJSBridge.invoke('getBrandWCPayRequest', {
							'appId': res.data.data.appId,
							'timeStamp': res.data.data.timeStamp,
							'nonceStr': res.data.data.nonceStr,
							'package': res.data.data.package,
							'signType': 'MD5',
							'paySign':res.data.data.paySign
						}, function(res) {
							if (res.err_msg === 'get_brand_wcpay_request:ok') {
								alert('支付成功，返回活动详情页！');
								setTimeout(()=>{
									window.location.href = 'http://app.gutouzu.com/index.html#/activity?id='+self.cAId;
								},500)
							} else if (res.err_msg === 'get_brand_wcpay_request:cancel') {
								alert('取消支付！');
							}else if(res.err_msg === 'get_brand_wcpay_request:fail'){
								alert(JSON.stringify(res))
							}
						});
					} else {
						alert(res.data.msg)
					}
				})
			},
			wxH5Pay() {

				let self = this;
				this.axios.post(Api.userApi + '/ca/wxPay/h5/prepay', this.qs.stringify({
					cAOrderId: self.cAOrderId
				}), {
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					}
				}).then((res) => {
					if (res.data.code == 1) {
//
						window.location.href=res.data.data

						console.log(res)


						 // weixinPay(wxData);

					} else {
						alert(res.data.msg)
					}
				})
				//
			},
			aliPay() {

				if(this.environment == '0'){
					alert('请点击右上角用浏览器打开进行支付')
				}else{
					let self = this;
					this.axios.post(Api.userApi + '/ca/ali/webpay', this.qs.stringify({
						cAOrderId: self.cAOrderId
					}), {
						headers: {
							'Content-Type': 'application/x-www-form-urlencoded'
						}
					}).then((res) => {

						if(res.data.code == 1){
							const div = document.createElement('div');
							div.innerHTML = res.data.data;
							document.body.appendChild(div);
							document.forms.punchout_form.submit();
							self.isPopup = false;
						}else{
							alert(res.data.msg)
						}

					})
				}

			}
		}
	}
</script>

<style lang="scss">
	@import '../../style/common.scss';
	@import '../../style/mixin.scss';

	html,
	body {
		height: 100%;
		background: #f5f5f5;
	}

	.activityOrder {
		padding: 88px 0 96px 0;

		.popup {
			position: fixed;
			left: 0;
			bottom: 0;
			z-index: 1000;
			width: 100%;
			height: 100%;
			background: rgba(0, 0, 0, 0.6);

			.payBox {
				position: absolute;
				left: 0;
				bottom: 0;
				background: #fff;
				width: 100%;

				.payBtn {
					height: 96px;
					background: #FF523D;
					color: #fff;
					font-size: 28px;
				}

				.payStyle {
					height: 286px;

					&>div {
						position: relative;

						.payImg {
							position: relative;

							img {
								width: 80px;
							}

							.select {
								width: 38px;
								height: 38px;
								background: url('../../assets/select.png') no-repeat center 0;
								background-size: cover;
								position: absolute;
								right: -10px;
								top: -10px;
							}
						}

						p {
							margin-top: 10px;
							font-size: 28px;
							color: #000;
						}

					}
				}

				.popupTitle {
					height: 72px;
					border-bottom: 1px solid #FF523D;
					/*no*/
					font-size: 28px;
					color: #000;
				}

				.payment {
					height: 68px;
					padding: 0 20px;
					box-sizing: border-box;

					.payment_l {
						font-size: 28px;
						color: #000;
					}

					.payment_r {
						font-size: 28px;
						color: #FF523D;
					}
				}
			}
		}

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

				.time {
					font-size: 22px;
					color: #666;
					margin-top: 50px;
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

		.ticket_box {
			padding: 0 20px;
			overflow: hidden;

			.ticketInfo {
				background: #fff;
				padding: 20px;
				margin-top: 30px;
				box-shadow: 0px 0px 7px 0px rgba(104, 104, 104, 0.12);
				border-radius: 10px;

				.title {
					font-size: 26px;
					color: #666;
					border-left: 4px solid #FF523D;
					padding-left: 12px;
					margin-bottom: 30px;
				}

				.ticket {
					margin-bottom: 50px;

					.name {
						font-size: 28px;
						color: #000;
						margin-bottom: 30px;
					}

					.price {
						font-size: 28px;
						color: #000;

						.price_l {
							color: #FF523D;
						}
					}
				}

				.user {
					.userInfo {
						font-size: 30px;
						color: #000;

						.userName {
							margin-right: 100px;
						}
					}
				}
			}

			.buyTx {
				margin-top: 30px;
				padding: 20px;
				background: #fff;
				box-shadow: 0px 0px 7px 0px rgba(104, 104, 104, 0.12);
				border-radius: 10px;

				.title {
					font-size: 26px;
					color: #666;
					border-left: 4px solid #FF523D;
					padding-left: 12px;
					margin-bottom: 30px;
				}

				.cnt {
					p {
						font-size: 24px;
						color: #666;
						line-height: 48px;

						a {
							color: #FF523D;
						}
					}
				}
			}
		}

		.activityOderFoot {
			height: 96px;
			border-top: 1px solid #FF523D;
			/*no*/
			background: #fff;
			padding: 0 20px;
			position: fixed;
			left: 0;
			bottom: 0;
			box-sizing: border-box;
			z-index: 100;

			.payMoney {
				font-size: 28px;
				color: #000;
			}

			.payBtn {
				width: 182px;
				height: 70px;
				background: #FF523D;
				border-radius: 7px;
				color: #fff;
				font-size: 28px;
			}
		}
	}
</style>
