<template>
	<div class="dataReady">
		<header class="header">
			<img src="../assets/data_ready.png" alt="">
		</header>
		<div class="main-cnt">
			<h2 class="title"><p>申请开店前，请准备好以下资料</p></h2>
			<ul class="flex_r_s_b eg_list">
				<li>
					123
				</li>
				<li>
					123
				</li>
				<li>
					123
				</li>
				<li>
					123
				</li>
			</ul>
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
	.dataReady{
		height: 100%;
		width: 100%;
		background: #fff5f4;
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
			height: 800px;
			margin: 20px auto 0 auto;
			background: #fff;
			padding: 0 20px;
			box-sizing: border-box;
			box-shadow: 0px 0px 10px 5px #ffe9e6;
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
				flex-wrap: wrap;
				li{
					width: 260px;
					background: red;
				}
			}
		}
	}
</style>
