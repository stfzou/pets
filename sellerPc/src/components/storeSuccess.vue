<template>
	<div class="main-cnt">
		<ul class="nav flex_r_f_s">
			<li class="active">
				<img class="success" src="../assets/condition/icon_02.png" alt="">
				商家信息
			</li>
			<li>
				<img src="../assets/condition/icon_01a.png" alt="">
			</li>
			<li class="active">
				<img class="success" src="../assets/condition/icon_02.png" alt="">
				
				资质信息
			</li>
			<li>
				<img src="../assets/condition/icon_01a.png" alt="">
			</li>
			<li class="active">
				<img class="success" src="../assets/condition/icon_02.png" alt="">
			
				店铺信息提交成功
			</li>
		</ul>
		<div class="view_warpper">
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
		</div>
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
	.main-cnt{
		width: 1200px;
		margin: 20px auto 0 auto;
		background: #fff;
		padding: 0 20px;
		padding-bottom: 54px;
		box-sizing: border-box;
		box-shadow: 0px 0px 10px 5px #ffe9e6;
		padding-top: 60px;
		.nav{
			width: 1000px;
			height: 60px;
			border-radius:30px;
			box-shadow: 0px 0px 10px 5px #ffe9e6;
			margin:0 auto;
			box-sizing: border-box;
			justify-content:space-around;
			li{
				font-size: 20px;
				font-weight:400;
				display: flex;
				span{
					margin-right: 12px;
				}
			}
			.active{
				color: #FF523D;
				display: flex;
				.success{
					width: 18px;
					height: 18px;
					margin-right: 12px;
				}
			}
		}
	}
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
