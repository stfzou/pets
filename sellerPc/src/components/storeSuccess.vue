<template>
	<div class="store_success">
		<div class="text">恭喜您！您的开店信息已提交成功，请耐心等待审核结果！</br>审核结果会在2个工作日内通过短信的方式通知您!</div>
		<div class="line_title flex_r_f_e">
			<span class="row_line"></span>
			<span class="line_text">接下来你可以</span>
			<span class="row_line"></span>
		</div>
		<ul class="flex_r_s_b">
			<li>
				<img src="../assets/condition/icon_shuju.png" alt="">
				<p>准备商品资料数据</br>(做几个主图详情图)</p>
			</li>
			<li>
				<img src="../assets/condition/icon_xuexi.png" alt="">
				<p>学习开店知识</p>
			</li>
			<li>
				<img src="../assets/condition/icon_guize.png" alt="">
				<p>查看交易规则</p>
			</li>
		</ul>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
	.store_success{
		margin: 130px auto 0 auto;
		width: 622px;
		.text{
			text-align: center;
			line-height: 69px;
			font-size: 20px;
			color: #333;
		}
		.line_title{
			width: 310px;
			margin:127px auto 0 auto;
			.row_line{
				height:1px;
				background: #ddd;
				width: 90px;
			}
			.line_text{
				font-size: 16px;
				color: #666;
			}
		}
		ul{
			margin-top: 80px;
			margin-bottom: 178px;
			li{
				height:100px;
				img{
					display: block;
					margin: 0 auto;
				}
				p{
					text-align: center;
					color: #666;
					font-size: 16px;
					margin-top:21px;
					line-height: 26px;
					span{
						margin-top: 10px;
					}
				}
			}
		}
	}
</style>
