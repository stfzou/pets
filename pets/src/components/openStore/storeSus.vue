<template>
	<div class="storeSusWarp">
		<div class="storeSusPost">

		</div>
		<div class="storeSusCnt">
			<img src="../../assets/storeSus.png" alt="" />
			<div class="susTip">您的开店资料已经提交成功!</div>
			<p v-html="cntTip">{{cntTip}}</p>
			<div class="appDownBtn" @click="iosDown">IOS苹果版下载</div>
			<div class="appDownBtn" @click="andDown">Android安卓版下载</div>
		</div>
	</div>
</template>

<script>
	import Api from '../common/apj.js'
	export default {
		data() {
			return {
				cntTip: '资质审核中 <br />请下载骨米宠物APP等待审核通过后上传商品',

			}
		},
		mounted() {

			if(localStorage.getItem('userId')!=null){
				var userType = localStorage.getItem('userType');
				var userId = localStorage.getItem('userId');
			}else{
				this.$router.push({
					name:'storeRegister'
				})
			}
			this.getShopStatus(userId);

		},
		methods: {
			iosDown(){
        		window.location.href = 'https://itunes.apple.com/cn/app/id1437699756';
      		},
      		andDown(){
        		window.location.href = 'http://app.xiaomi.com/details?id=com.freedogs.freedogs';
      		},
			getShopStatus(userId) { //查询店铺状态
				let self = this;
				self.axios.post(Api.userApi + '/user/selectUserShopsStatus', self.qs.stringify({
					userId:userId
				}), {
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					}
				}).then((res) => {

					if(res.data.code === 1) {
						if(res.data.data==1){

							self.cntTip = '资质审核中 <br />请下载骨米宠物APP等待审核通过后上传商品'
						}else if(res.data.data==2){

							self.cntTip = '资质审核通过 <br />请下载骨米宠物APP上传商品'
						}else if(res.data.data==3){
							self.cntTip = '资质审核未通过 <br />请重新提交资料进行审核'
						}else if(res.data.dta==0){
							self.$router.push({
								name:'process'
							})
						}

					} else {
						alert(res.data.msg)
					}

				})
			}
		}
	}
</script>

<style lang="scss">
	.storeSusWarp {
		background: #fff;
		.storeSusPost {
			height: 360px;
			background-image: url('../../assets/topMenuBg.png');
			background-size: contain;
			background-repeat: no-repeat;
			background-position: 50%;
		}
		.storeSusCnt {
			display: flex;
			flex-direction: column;
			align-items: center;
			padding-top: 56px;
			.susTip {
				color: #FF523D;
				font-size: 30px;
				padding-top: 50px;
			}
			p {
				font-size: 26px;
				color: #666;
				text-align: center;
				line-height: 48px;
				padding-top: 60px;
			}
			img {
				width: 120px;
			}
			.appDownBtn {
				width: 560px;
				height: 80px;
				background: rgba(255, 82, 61, 1);
				border-radius: 40px;
				font-size: 30px;
				color: #fff;
				text-align: center;
				line-height: 80px;
				margin-top: 75px;
			}
		}
	}
</style>
