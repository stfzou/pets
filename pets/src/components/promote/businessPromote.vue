<template>
	<div class="businessPromoteWarp">

			<div class="title">推广商家海报</div>
			<div class="postBox flex_r_s_b">

				<div class="postItem">
					<div class="caretedBox">
						<img  v-show="posterDataUrl"  :src="posterDataUrl" class="poster-bg" alt="邀请海报"/>

					</div>
					<div v-show="!posterDataUrl" class="imgBox" ref="box" id="poster">
						<canvas class="qr" id="qrCode-canvas"></canvas>
						<img class="postpic" src="../../assets/tuiguang_01.jpg" alt="" />
					</div>
					<div class="postBtn flex_r_s_b">
						<div class="itemBtn" @click="showImagePreview">预览</div>
						<div class="itemBtn" @click="showAlert">保存</div>
					</div>
				</div>
				<div class="postItem">
					<div class="caretedBox">
						<img  v-show="posterDataUrl2"  :src="posterDataUrl2" class="poster-bg" alt="邀请海报"/>

					</div>
					<div v-show="!posterDataUrl2"  class="imgBox" ref="box" id="poster2">
						<canvas class="qr" id="qrCode-canvas2"></canvas>
						<img class="postpic" src="../../assets/tuiguang_02.jpg" alt="" />
					</div>
					<div class="postBtn flex_r_s_b">
						<div class="itemBtn" @click="showImagePreview2">预览</div>
						<div class="itemBtn" @click="showAlert">保存</div>
					</div>
				</div>
				<div class="postItem">
					<div class="caretedBox">
						<img  v-show="posterDataUrl3"  :src="posterDataUrl3" class="poster-bg" alt="邀请海报"/>

					</div>
					<div v-show="!posterDataUrl3" class="imgBox" ref="box" id="poster3">
						<canvas class="qr" id="qrCode-canvas3"></canvas>
						<img class="postpic" src="../../assets/tuiguang_03.jpg" alt="" />
					</div>
					<div class="postBtn flex_r_s_b">
						<div class="itemBtn" @click="showImagePreview3">预览</div>
						<div class="itemBtn" @click="showAlert">保存</div>
					</div>
				</div>

			</div>
			<div class="commissionTip">
				<h3>关于推广佣金说明：</h3>
				<p v-html="spreadDesc">


				</p>
			</div>

	</div>
</template>

<script>
	import QRCode from 'qrcode'
	import html2canvas from 'html2canvas'
	import {Canvas2Image} from '../common/canvas2Image.js';
	import Api from '../common/apj.js'
	export default {
		data() {
			return {
				posterDataUrl:'',
				posterDataUrl2:'',
				posterDataUrl3:'',
				spreadDesc:'',
        		qrCodeUrl:'',
        		qrCodeUrl2:'',
        		qrCodeUrl3:''
			}
		},
		async mounted () {
			this.getTip();
			if(localStorage.getItem('userId') != null) {
				this.qrCodeUrl = 'https://h5.gumipet.com/#/process?appUserId='+localStorage.getItem('userId')
				this.qrCodeUrl2 = 'https://h5.gumipet.com/#/process?appUserId='+localStorage.getItem('userId')
				this.qrCodeUrl3 = 'https://h5.gumipet.com/#/process?appUserId='+localStorage.getItem('userId')

			} else {
				this.$router.push({
					name:'promoteLogin'
				})
			}
			this.createQRCode()



    	},
		methods: {
			showAlert() {
		      this.$createDialog({
		        type: 'alert',
		        title: '温馨提示',
		        content: '请长按图片进行保存',
		        icon: ''
		      }).show()
    		},
			showImagePreview(img) {
			      this.$createImagePreview({
			        imgs:[this.posterDataUrl]
			      }).show()
    		},
    		showImagePreview2() {
			      this.$createImagePreview({
			        imgs:[this.posterDataUrl2]
			      }).show()
    		},
    		showImagePreview3() {
			      this.$createImagePreview({
			        imgs:[this.posterDataUrl3]
			      }).show()
    		},
			getTip(){
				let self = this
				this.axios.post(Api.userApi + '/userSpread/selectUserSpreadPosterType', this.qs.stringify({
					userId: localStorage.getItem('userId'),
					type:2
				}), {
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					}
				}).then(res=>{
					if(res.data.code==1){

						this.spreadDesc = res.data.data.spreadDesc;
					}else{
						alert(res.data.msg)
					}
				})
			},
			base64ToBlob(code) {
				let parts = code.split(';base64,');
				let contentType = parts[0].split(':')[1];
				let raw = window.atob(parts[1]);
				let rawLength = raw.length;

				let uInt8Array = new Uint8Array(rawLength);

				for(let i = 0; i < rawLength; ++i) {
					uInt8Array[i] = raw.charCodeAt(i);
				}
				return new Blob([uInt8Array], {
					type: contentType
				});
			},
			createQRCode () {
		        //先用 QRCode 生成二维码 canvas，然后用 html2canvas 合成整张海报并转成 base64 显示出来
		        let opts={
		         		useCORS: true
		        }
		        let canvas = document.getElementById('qrCode-canvas')
		        let canvas2 = document.getElementById('qrCode-canvas2')
		        let canvas3 = document.getElementById('qrCode-canvas3')
		        QRCode.toCanvas(canvas, this.qrCodeUrl,{margin:1},(error) => {
		          if (error) {
		            console.log(error)
		          } else {
		            //qrcode 生成的二维码会带有一些默认样式，需要调整下
		           	canvas.style.width = 1+'rem'
		            canvas.style.height = 1+'rem'
		            let poster = document.getElementById('poster')

		            html2canvas(poster,opts).then(canvas => {

		              this.posterDataUrl = canvas.toDataURL("image/png")


		            });
		          }
		        })

		         QRCode.toCanvas(canvas2, this.qrCodeUrl2,{margin:1}, (error) => {
		          if (error) {
		            console.log(error)
		          } else {
		            //qrcode 生成的二维码会带有一些默认样式，需要调整下

		            canvas2.style.width = 1+'rem'
		            canvas2.style.height = 1+'rem'

		            let poster = document.getElementById('poster2')
		            html2canvas(poster,opts).then(canvas2 => {

		              this.posterDataUrl2 = canvas2.toDataURL("image/png")

		            });
		          }
		        })
		        QRCode.toCanvas(canvas3, this.qrCodeUrl3,{margin:1}, (error) => {
		          if (error) {
		            console.log(error)
		          } else {
		            //qrcode 生成的二维码会带有一些默认样式，需要调整下

		            canvas3.style.width = 1+'rem'
		            canvas3.style.height = 1+'rem'

		            let poster = document.getElementById('poster3')
		            html2canvas(poster,opts).then(canvas3 => {

		              this.posterDataUrl3 = canvas3.toDataURL("image/png")

		            });
		          }
		        })
		    }

		}
	}
</script>

<style lang="scss">
	.businessPromoteWarp {
		height: 100%;
		padding: 0 20px;
		background: #fff;
		.title {
			font-size: 28px;
			color: #000;
			padding: 20px 0;
		}
		.commissionTip {

			border-radius: 4px;
			padding: 20px;
			margin-top: 30px;
			font-size: 24px;
			line-height: 38px;
			h3 {
				color: #333;
				font-weight: bold;
			}
			p {
				color: #333;
			}
		}
		.postBox {
			.postItem {
				width: 170px;
				.poster-bg{
					width:170px;

					img{
						z-index: 10000;
						height: 325px;
					}
				}
				.imgBox {
					position: relative;
					height: 300px;
					.postpic {
						width: 100%;

					}

				}
				#poster{
					.qr {
						position: absolute;
						bottom:30px;
						transform: translateX(-50%);
						left: 50%;
					}
				}
				#poster2{
					.qr {
						position: absolute;
						bottom:105px;
						transform: translateX(-50%);
						left: 50%;
					}

				}
				#poster3{
					.qr {
						position: absolute;
						bottom:105px;
						transform: translateX(-50%);
						left: 50%;
					}

				}
				.postBtn {
					padding-top: 10px;
					div {
						color:#333;
						width: 80px;
						height: 40px;
						text-align: center;
						line-height: 40px;
						font-size: 26px;
						border-radius:10px;
						background: #f5f5f5;
					}
				}
			}
		}
	}
</style>