<template>
	<div class="ticketWarp">
		<ul class="ticketList">
			<li>
				<div class="add_goods_title">票券基本信息</div>
			</li>
			<li class="flex_r_f_s">
				<div class="ticketList_l">
					<p>票劵类型<span style="color: #FF523D;">*</span></p>
				</div>
				<div class="ticketList_r">
					<div class="isCharge">
						<el-radio v-model="val" label="0">免费</el-radio>
						<el-radio v-model="val" label="1">收费</el-radio>
					</div>
				</div>
			</li>
			
			<li class="flex_r_f_s">
				<div class="ticketList_l">
					<p>票劵名称<span style="color: #FF523D;">*</span></p>
				</div>
				<div class="ticketList_r">
					<div class="explain flex_r_f_s">
						<el-input class="goodsNameInput h32" type="text" :show-word-limit="true" :maxlength="100" v-model="goodsNameInput"
						 maxlength="60" placeholder="请输入每人限额数量(默认不限制)"></el-input>
			
					</div>
				</div>
			</li>
			<li class="flex_r_f_s">
				<div class="ticketList_l">
					<p>票劵数量<span style="color: #FF523D;">*</span></p>
				</div>
				<div class="ticketList_r">
					<div class="ticketNum">
						<el-input class="goodsNameInput h32" v-model="goodsNameInput" maxlength="60" placeholder="请输入票劵数量"></el-input>
					</div>
				</div>
			</li>
			<li class="flex_r_f_s">
				<div class="ticketList_l">
					<p>限购数量<span style="color: #FF523D;">*</span></p>
				</div>
				<div class="ticketList_r">
					<div class="limitNum flex_r_f_s">
						<el-input class="goodsNameInput h32" v-model="goodsNameInput" maxlength="60" placeholder="请输入每人限额数量(默认不限制)"></el-input>
						<div class="remark">张/人</div>
					</div>
				</div>
			</li>
			<li class="flex_r_f_s">
				<div class="ticketList_l">
					<p>审核<span style="color: #FF523D;">*</span></p>
				</div>
				<div class="ticketList_r">
					<div class="examine flex_r_f_s">
						<el-checkbox v-model="val">凡此报名此票劵需要经过我审核</el-checkbox>
					</div>
				</div>
			</li>
			<li class="flex_r_f_s">
				<div class="ticketList_l">
					<p>票劵说明<span style="color: #FF523D;">*</span></p>
				</div>
				<div class="ticketList_r">
					<div class="ticketName">
						<!-- <el-input class="goodsNameInput h32" show-word-limit v-model="goodsNameInput" maxlength="60" placeholder="请输入票劵名称"></el-input> -->
						<el-input type="textarea" placeholder="请输入内容" v-model="goodsNameInput" maxlength="100" :show-word-limit="true"></el-input>
						<div class="inputNum">{{goodsNameInput.length}}/100</div>
					</div>
				</div>
			</li>
			<li class="flex_r_f_s">
				<div class="ticketList_l">
					<p>可订购日期<span style="color: #FF523D;">*</span></p>
				</div>
				<div class="ticketList_r">
					<div class="reserveData">
						<div>
							<el-checkbox v-model="val">默认活动结束前</el-checkbox>
						</div>
						<div class="selectData">
							<el-date-picker v-model="activityData" type="daterange" range-separator="至" start-placeholder="开始日期"
							 end-placeholder="结束日期">
							</el-date-picker>
						</div>
					</div>
				</div>
			</li>
			<li class="flex_r_f_s">
				<div class="ticketList_l">
					<p>票劵有效期<span style="color: #FF523D;">*</span></p>
				</div>
				<div class="ticketList_r">
					<div class="reserveData">
						<div>
							<el-checkbox v-model="val">默认为活动举办期间</el-checkbox>
						</div>
						<div class="selectData">
							<el-date-picker v-model="activityData" type="daterange" range-separator="至" start-placeholder="开始日期"
							 end-placeholder="结束日期">
							</el-date-picker>
						</div>
					</div>
				</div>
			</li>
			<li class="flex_r_f_s">
				<div class="ticketList_l">
					<p>票劵使用<span style="color: #FF523D;">*</span></p>
				</div>
				<div class="ticketList_r">
					<div class="makeTicket">
						<div>
							<el-radio v-model="charge" label="1">单次票</el-radio>
							<span class="tx">(票劵有效期内只能使用一次)</span>
						</div>
						<div>
							<el-radio v-model="charge" label="1">连次票</el-radio>
						</div>

					</div>
				</div>
			</li>
			<li class="flex_r_f_s">
				<div class="ticketList_l">
					<p>退票设置<span style="color: #FF523D;">*</span></p>
				</div>
				<div class="ticketList_r">
					<div class="returnTicket">
						<el-radio v-model="charge" label="1">支持退票，委托【骨米】退票</el-radio>
						<el-radio v-model="charge" label="2">不支持退票</el-radio>
					</div>
				</div>
			</li>
			<li class="returnExplain">
				<div class="title">退票说明</div>
				<p>1、本活动由主办方委托【骨米】代为处理退款事宜；</p>
				<p>2、如需退款，请于活动开始24小时之前提交申请，活动开始前的24小时不接受退款；</p>
				<p>3、退款时，将收取活动票价的10%作为手续费</p>
				<div class="wxTx">温馨提示：活动一旦审核发布后不能更改退票设置。</div>
			</li>
		</ul>
		<div class="save_box">

			<el-button round class="fabu_btn">保存</el-button>
		</div>
	</div>
</template>

<script>
	import Api from '../common/apj.js'
	export default {
		data() {
			return {
				charge: '',
				activityData: [],
				val: '',
				goodsNameInput: '',

			}
		}
	}
</script>

<style lang="scss">
	.ticketWarp {
		padding: 40px;
		padding-right: 10px;

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
				font-size: 18px;
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
				width: 100px;
				
				p {
					color: #333;
					font-size:14px;
				}
			}

			.ticketList_r {
				width: 600px;
				margin-left: 20px;
				.el-input {
					width: 420px;
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

				.makeTicket {
					&>div {
						.tx {
							margin-left: 10px;
							font-size: 14px;
							color: #999;
						}

					}
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
