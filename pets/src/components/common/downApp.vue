<template>
	<div class="down-headr flex_r_s_b">
		<div class="down-l flex_r_f_s">
			<i class="cubeic-close" @click="closeDown"></i>
			<div class="introduce flex_r_f_s">
				<img src="../../assets/jd.png" alt="">
				<div class="text">
					<p>打开骨米宠物APP</p>
					<p>逛汪圈领现金红包</p>
				</div>
			</div>
		</div>
		<div class="down-f flex_r_s_c">
			<a @click="downApp">立即打开</a>
		</div>
	</div>
</template>

<script>
  import Api from '../common/apj.js'
	export default {
    data(){
      return{
        
      }
    },
		methods: {
			closeDown() {
				this.$emit('closeDown');
			},
      downApp(){
        this.$router.push({
          name:'appShowBtn'
        })
      }
		}
	}
</script>

<style lang="scss">
	@import '../../style/common.scss';

	.down-headr {
		position: fixed;
		z-index: 2000;
		box-sizing: border-box;
		padding-left: 20px;
		height: 88px;
		background: #232326;
		left: 0;
		top: 0;

		.down-l {

			.cubeic-close {
				font-size: 30px;
				margin-right: 20px;
				color: #fff;
			}

			.introduce {
				width: 300px;

				img {
					width: 70px;
					height: 70px;
					margin-right: 20px;
				}

				.text {
					p {
						line-height: 28px;
						font-size: 24px;
						color: #fff;
					}
				}
			}
		}

		.down-f {
			width: 300px;
			background: #ff523d;
			height: 88px;

			a {
				color: #fff;
				font-size: 28px;
			}
		}
	}
</style>
