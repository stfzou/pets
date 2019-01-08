<template>
	<div class="dataReady">
		<header class="header">
			<img src="../assets/data_ready.png" alt="">
		</header>
		<div class="main-cnt">
			<h2 class="title"><p>申请开店前，请准备好以下资料</p></h2>
			<ul class="eg_list">
				<li>
					<h3>店面照片</h3>
					<div class="pic_box">
						<img src="../assets/condition/shili01.png" alt="">
						<div class="sx">示例</div>
					</div>
					
					<p>需拍出完整门框、门匾（建议正对门脸2米处拍摄</p>
					
				</li>
				<li>
					<h3>店内照片</h3>
					<div class="pic_box">
						<img src="../assets/condition/shili02.png" alt="">
						<div class="sx">示例</div>
					</div>
					
					<p>需真实反映店内环境（商品货架、美容室、收银台等）</p>
				</li>
				<li>
					<h3>商户LOGO</h3>
					<div class="pic_box">
						<img src="../assets/condition/shili03.png" alt="">
						<div class="sx">示例</div>
					</div>
					
					<p>需体现您店铺的特色，吸引更多消费者进店消费</p>
				</li>
				<li>
					<h3>法人身份证正反面照片</h3>
					<div class="pic_box">
						<img src="../assets/condition/shili04.png" alt="">
						<div class="sx">示例</div>
					</div>
					
					<p>需要清晰展示人物五官、身份证文字信息和国徽</p>
				</li>
				<li>
					<h3>营业执照</h3>
					<div class="pic_box">
						<img src="../assets/condition/shili05.png" alt="">
						<div class="sx">示例</div>
					</div>
					
					<p>需上传清晰三证合一后的营业执照，边框完整；拍复印件需加盖鲜章；二维码能够识别</p>
				</li>
				<li>
					<h3>动物诊疗证<span>(仅医疗单位提供)</span></h3>
					<div class="pic_box">
						<img src="../assets/condition/shili06.png" alt="">
						<div class="sx">示例</div>
					</div>
					
					<p>仅医疗单位上传，例如宠物医院；上传有效期内的彩色动物诊疗许可证，复印件需加盖鲜章</p>
				</li>
				
			</ul>
			<div class="button pointer" @click="link">立即开店</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods: {
			link() {
				let userId = JSON.parse(sessionStorage.getItem('user'))
				this.$router.push({name:'sellerInfo',query:{id:userId.userId}});
			}
		},
		
	}
</script>

<style lang="scss">
	.dataReady{
		width: 100%;
		background: #fff5f4;
		padding-bottom: 138px;
		overflow: initial;
		.header{
			background: #ff8677;
			height: 120px;
			padding-left:28px;
			overflow: hidden;
			img{
				width: 382px;
				margin-top: 30px;
			}
		}
		.main-cnt{
			width: 1200px;
			margin: 20px auto 0 auto;
			background: #fff;
			padding: 0 20px;
			padding-bottom: 54px;
			box-sizing: border-box;
			box-shadow: 0px 0px 10px 5px #ffe9e6;
			padding-top: 60px;
			.button{
				width: 300px;
				height: 38px;
				line-height: 38px;
				color: #fff;
				background:#FF523D;
				border-radius: 19px;
				font-size: 16px;
				margin: 54px auto 0 auto;
				text-align: center;
			}
			.title{
				padding: 15px 0;
				
				p{
					font-size: 22px;
					color: #333;
					line-height: 28px;
					border-left: 2px solid #ff523d;
					padding-left: 10px;
				}
			}
			.eg_list{
				padding: 0 12px;
				box-sizing: border-box;
				overflow: hidden;
				li{
					width: 260px;
					float: left;
					margin-left: 178px;
					height: 280px;
					position: relative;
					margin-top: 30px;
					h3{
						font-size: 18px;
						color: #333;
						line-height: 24px;
						span{
							color: #FF523D;
						}
					}
					.pic_box{
						margin-top: 5px;
						width: 260px;
						height: 160px;
						position: relative;
						img{
							display: block;
							width: 260px;
							height: 160px;
						}
						.sx{
							position:absolute ;
							width:36px;
							height:20px;
							line-height: 20px;
							text-align: center;
							background:rgba(0,0,0,1);
							opacity:0.4;
							border-radius:10px;
							color: #fff;
							font-size: 12px;
							bottom: 5px;
							right: 5px;
						}
					}
					
					p{
						line-height: 24px;
						font-size: 16px;
						color: #666;
						margin-top: 5px;
					}
					
				}
				li:nth-child(3n+1){
					margin-left: 0;
				}
			}
		}
	}
</style>
