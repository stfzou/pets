<template>
	<div class="down-headr flex_r_s_b">
		<div class="down-l flex_r_f_s">
			<i class="cubeic-close" @click="closeDown"></i>
			<div class="introduce flex_r_f_s">
				<img src="../../assets/jd.png" alt="">
				<div class="text">
					<p>打开骨米宠物APP</p>
					<p>寻找更多养宠乐趣</p>
				</div>
			</div>
		</div>
		<div class="down-f flex_r_s_c">
			<a @click="isAnOrIos">立即打开</a>
		</div>
	</div>
</template>

<script>
	export default {
    data(){
      return{
        environment:''
      }
    },
    mounted() {
      this.getEnvironment();
    },
		methods: {
			closeDown() {
				this.$emit('closeDown');
			},
			isAnOrIos() {
				var u = navigator.userAgent,
				app = navigator.appVersion;
				var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
				var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
				if (isAndroid) {
					//这个是安卓操作系统
          //alert(1)
          if(this.environment=='-1'){
            this.$router.push({name:'wxWhitePage'})
          }else{
            window.location.href = 'http://gutouzu.oss-cn-shenzhen.aliyuncs.com/manager/app-v1.0.0.apk'
          }
					//alert('这个是安卓操作系统')
				}
				if (isIOS) {
					//这个是ios操作系统
          
					window.location.href = 'https://itunes.apple.com/cn/app/id1437699756'
				}
			},
      getEnvironment() { //静默授权初始化
        var ua = window.navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == 'micromessenger') {
          this.environment = '-1';

        } else {
          this.environment = '1';
        }
      },
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
