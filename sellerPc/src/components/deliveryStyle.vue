<template>
	<div class="ticketWarp">
		<ul class="ticketList">
			<li>
				<div class="add_goods_title">默认配送方式</div>
			</li>
			<li class="flex_r_f_s">
				<div class="ticketList_l">
					<p>默认配送方式<span style="color: #FF523D;">*</span></p>
				</div>
				<div class="ticketList_r">
					<div class="isCharge">
						<el-checkbox v-model="deliveryStyle">同城快递</el-checkbox>
						<span class="tx">(运费在商品发布里面填写)</span>
					</div>
				</div>
			</li>

			<li class="flex_r_f_s">
				<div class="ticketList_l">
					<p>订单免运费金额<span style="color: #FF523D;">*</span></p>
				</div>
				<div class="ticketList_r">
					<div class="explain flex_r_f_s">
						<el-input class="goodsNameInput h32" type="text" :show-word-limit="true" :maxlength="30" v-model="freeFareMoney"
						 placeholder="请输入订单免运费金额"></el-input>
						<span class="tx">免运费指用户单次购买达到包邮金额商家免收运费。（单位:元）</span>
					</div>
				</div>
			</li>
			<li>
				<div class="add_goods_title">更多配送方式</div>
			</li>
			<li class="flex_r_f_s">
				<div class="ticketList_l">
					<p>更多配送方式<span style="color: #FF523D;">*</span></p>
				</div>
				<div class="ticketList_r">
					<div class="examine examineOne flex_r_f_s">
						<el-checkbox v-model="isSelf">支持客户上门自提</el-checkbox>
						<span class="tx">（请确保营业时间内客户可以正常上门取货）</span>
					</div>
					<div class="examine flex_r_f_s">
						<el-checkbox v-model="isDelivery">支持免费送货上门</el-checkbox>
						<span class="tx">（支持送货上门将享受平台更多的产品爆光及优先排序机会， 也会让用户享受到更多的购物体验，增加消费者的再回头消费机率。）</span>
					</div>
				</div>
			</li>

			<li>
				<div class="add_goods_title">设置最远配送距离</div>
			</li>
			<li class="flex_r_f_s">
				<div class="ticketList_l">
					<p>支持最远配送距离<span style="color: #FF523D;">*</span></p>
				</div>
				<div class="ticketList_r">
					<div class="makeTicket flex_r_f_s">
						<div style="margin-right: 30px;">
							<el-radio v-model="mostFar" label="500米内">500米内</el-radio>
							<el-radio v-model="mostFar" label="1000米内">1000米内</el-radio>
							<el-radio v-model="mostFar" label="2公里内">2公里内</el-radio>
						</div>
					</div>
					<p class="p_tx">（正确设置订单起送标准、送货时间及配送距离，以协助平台更精准地将你的店铺推送给附近的养宠人群）</p>
				</div>
			</li>
			<li class="flex_r_f_s">
				<div class="ticketList_l">
					<p>下单后的送达时间<span style="color: #FF523D;">*</span></p>
				</div>
				<div class="ticketList_r">
					<div class="makeTicket flex_r_f_s">
						<div style="margin-right: 30px;">
							<el-radio v-model="deliveryTime" label="30分钟内">30分钟内</el-radio>
							<el-radio v-model="deliveryTime" label="1小时内">1小时内</el-radio>
							<el-radio v-model="deliveryTime" label="12小时内">12小时内</el-radio>
							<el-radio v-model="deliveryTime" label="24小时内">24小时内</el-radio>
						</div>

					</div>
					<p class="p_tx">（营业时间外不计算在内，更快捷的配送速度将增加用户的下单几率和购物体验）</p>
				</div>
			</li>
			<li class="flex_r_f_s">
				<div class="ticketList_l">
					<p>送货上门配送费用<span style="color: #FF523D;">*</span></p>
				</div>
				<div class="ticketList_r">
					<div class="explain flex_r_f_s">
						<el-input class="goodsNameInput h32" type="text" :show-word-limit="true" :maxlength="30" v-model="fare"
						 placeholder="请输入送货上门配送费用"></el-input>
						<span class="tx">（单位：元）</span>
					</div>
				</div>
			</li>
			<li class="flex_r_f_s">
				<div class="ticketList_l">
					<p>免费送货订单金额<span style="color: #FF523D;">*</span></p>
				</div>
				<div class="ticketList_r">
					<div class="explain flex_r_f_s">
						<el-input class="goodsNameInput h32" type="text" :show-word-limit="true" :maxlength="30" v-model="orderFreeMoney"
						 placeholder="请输入免费送货订单金额"></el-input>
						<span class="tx">（免费送货指用户购买金额达到你设置的订单金额后将不收取配送费用。单位：元）</span>
					</div>
				</div>
			</li>
		</ul>
		<div class="save_box">

			<el-button round class="fabu_btn" @click="commit">保存</el-button>
		</div>
	</div>
</template>

<script>
	import Api from './common/apj.js'
	export default {
		data() {
			return {
        deliveryStyle:false,//是否是同城快递,
        isSelf:false,//是否支持自提
        isDelivery:false,//是否支持送货上门
				mostFar:'',//最远配送距离
        deliveryTime:'',//送达时间，
        fare:'',//送货上门费用
        freeFareMoney:'',//运费
				orderFreeMoney:'',//订单免费金额

			}
		},
		mounted(){
			this.getDeliveryStyle();
		},
		methods: {
			getDeliveryStyle(){
				let self= this;
        this.axios.post(Api.shopApi+'/shop/selectShopsDelivery', this.qs.stringify({
        	shopId:JSON.parse(sessionStorage.getItem('user')).shopId
        }), {
        	headers: {
        		'Content-Type': 'application/x-www-form-urlencoded'
        	}
        }).then((res)=>{
          if(res.data.code==1){
            let re = res.data.data;
            if(re.isSameCity==null||re.isSameCity==0){
              self.deliveryStyle=false
            }else{
              self.deliveryStyle=true
            }
            if(re.isExtract==null||re.isExtract==0){
              self.isSelf=false
            }else{
              self.isSelf=true
            }
            if(re.isDelivery==null||re.isDelivery==0){
              self.isDelivery=false
            }else{
              self.isDelivery=true
            }
            if(re.mostFar!=null){
              self.mostFar = re.mostFar
            }
            if(re.deliveryTime!=null){
              self.deliveryTime = re.deliveryTime
            }
            if(re.fare!=null){
              self.fare = re.fare
            }
            if(re.freeFareMoney!=null){
              self.freeFareMoney = re.freeFareMoney
            }
            if(re.orderFreeMoney!=null){
              self.orderFreeMoney = re.orderFreeMoney
            }

          }else{
            alert(res.data.msg)
          }
        })
			},
			commit() {
        console.log(JSON.parse(sessionStorage.getItem('user')).shopId)
        if(this.freeFareMoney==''){
          this.erroTip('请填写订单免费金额')
        }else if(this.fare==''){
          this.erroTip('请填写送货上门费用')
        }else if(this.orderFreeMoney==''){
          this.erroTip('请填写免费送货订单金额')
        }else{
          let self = this;
          let isSameCity = null;//是否为同城快递
          let isSelf = null;//是否自提
          let isDelivery = null;//是否送货上门
          if(this.isDelivery==false){
            isDelivery = 0
          }else{
            isDelivery = 1
          }
          if(this.isSelf==false){
            isSelf = 0
          }else{
            isSelf = 1
          }
          if(this.deliveryStyle==false){
            isSameCity = 0
          }else{
            isSameCity = 1
          }
          this.axios.post(Api.shopApi+'/shop/editShopsDelivery', this.qs.stringify({
          	shopId:JSON.parse(sessionStorage.getItem('user')).shopId,
            isSameCity:isSameCity,
            freeFareMoney:self.freeFareMoney,
            isExtract:isSelf,
            isDelivery:isDelivery,
            mostFar:self.mostFar,
            fare:self.fare,
            deliveryTime:self.deliveryTime,
            orderFreeMoney:self.orderFreeMoney

          }), {
          	headers: {
          		'Content-Type': 'application/x-www-form-urlencoded'
          	}
          }).then((res)=>{
            if(res.data.code==1){
                self.$message({
                	showClose: true,
                	message: '编辑成功',
                	type: 'success',
                });
            }else{
              alert(res.data.msg)
            }
          })
        }

			},
      erroTip(str){
        this.$message({
        	showClose: true,
        	message:str,
        	type: 'error',
        });
        return false;
      }

		}

	}
</script>

<style lang="scss">
	.ticketWarp {
		padding: 40px;
		padding-right: 10px;
		.el-date-editor .el-range__close-icon{
			line-height: 18px;
		}
		.save_box {
			margin-top: 68px;

			.el-button {
				height: 40px;
				padding: 0;
				line-height: 40px;
				width: 300px;
				color: #fff;
				font-size: 16px;
			}

			.fabu_btn {
				background: #FF523D;
				margin: 0 auto;
				display: block;
			}
		}

		.ticketList {
			// font-size: 18px;
			box-sizing: border-box;
			border-radius: 4px;

			li {
				padding: 15px 0;
			}

			li:first-child {
				padding-top: 0;
			}

			.add_goods_title {
				font-size: 14px;
				color: #FF523D;
				height: 18px;
				line-height: 18px;
				border-left: 2px solid #FF523D;
				padding-left: 6px;
			}

			.returnExplain {
				border-radius: 6px;
				padding: 20px;
				background: #f5f5f5;
				width: 600px;

				.title {
					color: #333;
					padding-bottom: 10px;
					font-size: 14px;
				}

				p {
					line-height: 24px;
					color: #999;
					font-size: 14px;
				}

				.wxTx {
					padding-top: 10px;
					color: #ff523d;
					font-size: 14px;
				}
			}

			.ticketList_l {
				width: 120px;

				p {
					color: #333;
					font-size:14px;
				}
			}

			.ticketList_r {
				width: 900px;
				margin-left: 20px;
				.isCharge{
					.tx{
						font-size: 12px;
						color: #999;
						margin-left: 12px;
					}
				}
				.explain{
					.tx{
						font-size: 12px;
						color: #999;
						margin-left:10px;
					}
				}
				.examine{
					.tx{
						font-size: 12px;
						color: #999;
						margin-left:20px;
					}
				}
				.examineOne{
					margin-bottom: 20px;
				}
				.el-input__inner{
					height: 32px;
					line-height: 32px;
					width: 300px;
				}
				.el-date-editor .el-range__icon{
					line-height: 17px;
				}
				.el-date-editor .el-range-separator{
					line-height: 22px;
				}
				.el-input {
					width:300px;
					font-size: 14px;
				}
				.el-textarea{
					font-size: 14px;
					textarea{
						height: 100px;
					}
				}
				.el-range-editor.el-input__inner {
					width: 420px;
				}
				.ticketName{
					.inputNum{
						color: #999;
						font-size: 14px;
						padding: 10px 0 0 5px;
					}
				}
				.limitNum {
					.remark {
						margin-left: 8px;
					}
				}

				.reserveData {
					.selectData {
						margin-top: 10px;
					}
				}


				.p_tx{
					font-size: 12px;
					color: #999;

				}


			}

		}



		.el-radio {
			line-height: 32px;
		}

		.el-radio__input.is-checked+.el-radio__label {
			color: #333;
		}

		.el-radio__input.is-checked .el-radio__inner {
			border-color: #ff523d;
			background: #ff523d;
		}

		.el-radio__inner:hover {
			border-color: #ff523d;
		}

		.el-checkbox__input.is-checked+.el-checkbox__label {
			color: #333;
		}

		.el-checkbox__input.is-checked .el-checkbox__inner {
			border-color: #ff523d;
			background: #ff523d;
		}

		.el-checkbox__input.is-focus .el-checkbox__inner {
			border-color: #ff523d;
		}

		.el-checkbox__inner:hover {
			border-color: #ff523d;
		}

		.send_goods_time {
			.tx {
				font-size: 14px;
				color: #666;
			}
		}


	}
</style>
