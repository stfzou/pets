<template>
	<div class="praise_warp">
		<div class="top_nav flex_r_s_b">
			<div class="back" @click="back"></div>
			<div class="nav_title">32人点赞</div>
		</div>
		<div class="praise_cnt">
			<cube-scroll ref="scroll">
			<ul>
				<li v-for="item in likeData" class="flex_r_f_s">
					<div class="headImg">
						<img class="hPic" :src="item.userHeadImage" alt="">
					</div>
					<div class="userName">{{item.userName}}</div>
				</li>
			</ul>
			</cube-scroll>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				likeData:[]
			}
		},
		mounted() {
			this.likeData = this.$route.params.data;
			console.log(this.likeData)
		},
		methods:{
			back() {
				this.$router.go(-1); //返回上一层
			},
		}
		
	}
</script>

<style lang="scss">
	.praise_warp{
		.line{
			height: 10px;
			background: #e8e8e8;
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
		.praise_cnt{
			position: fixed;
			top: 88px;
			bottom: 0;
			width: 100%;
			ul{
				padding: 0 20px;
				li{
					padding: 20px 0;
					box-sizing: border-box;
					border-top: 1px solid #e8e8e8;/*no*/
					.headImg{
						width: 90px;
						height: 90px;
						border-radius: 50%;
						background: #ffdfdf;
						position: relative;
						margin-right: 30px;
						.hPic{
							width: 100%;
							height: 100%;
							border-radius: 50%;
							display: block;
						}
					}
					.userName{
						font-size: 28px;
						color: #333;
					}
				}
				li:first-child{
					border: none;
				}
			}
		}
	}
</style>
