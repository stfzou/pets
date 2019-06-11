<template>
	<div class="editTicketWarp">
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
						<el-radio v-model="charge" label="0">免费</el-radio>
						<el-radio v-model="charge" label="1">收费</el-radio>
					</div>
				</div>
			</li>
			
			<li class="flex_r_f_s">
				<div class="ticketList_l">
					<p>票劵名称<span style="color: #FF523D;">*</span></p>
				</div>
				<div class="ticketList_r">
					<div class="explain flex_r_f_s">
						<el-input class="goodsNameInput h32" type="text" :show-word-limit="true" :maxlength="30" v-model="ticketTitle"
						 placeholder="请输入票劵名称"></el-input>
			
					</div>
				</div>
			</li>
			<li class="flex_r_f_s">
				<div class="ticketList_l">
					<p>票劵数量<span style="color: #FF523D;">*</span></p>
				</div>
				<div class="ticketList_r">
					<div class="ticketNum">
						<el-input class="goodsNameInput h32" v-model="ticketNum" maxlength="60" placeholder="请输入票劵数量"></el-input>
					</div>
				</div>
			</li>
			<li class="flex_r_f_s" v-if="charge == '1'">
				<div class="ticketList_l">
					<p>票劵价格<span style="color: #FF523D;">*</span></p>
				</div>
				<div class="ticketList_r">
					<div class="ticketNum">
						<el-input class="goodsNameInput h32" v-model="ticketPrice" maxlength="60" placeholder="请输入票劵价格"></el-input>
					</div>
				</div>
			</li>
			<li class="flex_r_f_s">
				<div class="ticketList_l">
					<p>限购数量<span style="color: #FF523D;">*</span></p>
				</div>
				<div class="ticketList_r">
					<div class="limitNum flex_r_f_s">
						<el-input class="goodsNameInput h32" v-model="limitNum" maxlength="60" placeholder="请输入限购数量"></el-input>
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
						<el-checkbox v-model="isExamine">凡此报名此票劵需要经过我审核</el-checkbox>
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
						<el-input type="textarea" placeholder="请输入票劵说明" v-model="ticketExplain" maxlength="100" :show-word-limit="true"></el-input>
						<div class="inputNum">{{ticketExplain.length}}/100</div>
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
							<el-checkbox v-model="isActiveEnd">默认活动结束前</el-checkbox>
						</div>
						<div class="selectData" v-if="!isActiveEnd">
							<el-date-picker v-model="reserveData" @change="reserveDataChange" type="datetimerange"  value-format="timestamp"  range-separator="至" start-placeholder="开始日期"
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
							<el-checkbox v-model="isActiveIng">默认为活动举办期间</el-checkbox>
						</div>
						<div class="selectData" v-if="!isActiveIng">
							<el-date-picker v-model="effectiveData" @change="effectiveDataChange" type="datetimerange"  value-format="timestamp" range-separator="至" start-placeholder="开始日期"
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
							<el-radio v-model="ticketStyleVal" label="1">单次票</el-radio>
							<span class="tx">(票劵有效期内只能使用一次)</span>
						</div>
						<div>
							<el-radio v-model="ticketStyleVal" label="2">连次票</el-radio>
						</div>

					</div>
				</div>
			</li>
			
			<li class="flex_r_f_s" v-if="ticketStyleVal==2">
				<div class="ticketList_l" style="width: 160px;">
					<p>每日最多使用次数<span style="color: #FF523D;">*</span></p>
				</div>
				<div class="ticketList_r">
					<div class="limitNum flex_r_f_s" style="width: 180px;">
						<el-input class="goodsNameInput h32" v-model="useNum" maxlength="60"></el-input>
						<div class="remark">次</div>
					</div>
				</div>
			</li>
			<li class="flex_r_f_s">
				<div class="ticketList_l">
					<p>退票设置<span style="color: #FF523D;">*</span></p>
				</div>
				<div class="ticketList_r">
					<div class="makeTicket flex_r_f_s">
						<div style="margin-right: 30px;">
							<el-radio v-model="returnVal" label="1">支持退票，委托【骨米】退票</el-radio>
							
						</div>
						<div>
							<el-radio v-model="returnVal" label="0">不支持退票</el-radio>
						</div>
				
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

			<el-button round class="fabu_btn" @click="addTicket">保存</el-button>
		</div>
	</div>
</template>

<script>
	import Api from '../common/apj.js'
	export default {
		data() {
			return {
				charge:'1',//是否收费
				ticketTitle:'',//票劵名称
				ticketNum:'',//票劵数量
				ticketPrice:'',//票劵价格
				limitNum:'',//限购数量
				isExamine:false,//审核
				ticketExplain:'',//票劵说明
				isActiveEnd:true,//是否在活动结束前
				reserveData:[],//订购日期
				isActiveIng:true,//是否在活动举办期间
				effectiveData:[],//有效日期
				ticketStyleVal:'1',//单次票还是多次票
				returnVal:'1',//是否支持退票
				useNum:'1',//每日使用最多次数
				activeData:[],//活动开始日期
				ticketId:''//活动卷ID
			}
		},
		mounted(){
			console.log(this.$route.params.ticketInfo)
			
			this.getTicketInfo();
			// console.log(JSON.parse(sessionStorage.getItem('user')).userId)
		},
		methods: {
			getTicketInfo(){
				let self = this;
				let re = this.$route.params.ticketInfo;
				this.activeData = this.$route.params.activeData;
				this.charge = re.ticketType+'';
				this.ticketId = re.ticketId;
				this.ticketTitle = re.ticketName;
				this.ticketNum = re.ticketNum;
				this.ticketPrice = re.ticketPrice;
				this.limitNum = re.limitNum;
				if(re.isCheck == '1'){
					this.isExamine = true;
				}else{
					this.isExamine = false;
				}
				this.ticketExplain = re.ticketDescription;
				if(re.isBuyTime =='1'){
					this.isActiveEnd = true;
					this.reserveData = this.activeData;
					
				}else{
					this.isActiveEnd = false;
					this.reserveData = [self.capiDate(re.buyStartTime),self.capiDate(re.buyEndTime)];
				}
				
				if(re.isValidTime == '1'){
					this.isActiveIng = true;
					this.effectiveData = this.activeData;
					
				}else{
					this.isActiveEnd = false;
					this.effectiveData = [self.capiDate(re.validStartTime),self.capiDate(re.validEndTime)];
					alert(2)
				}
				
				this.ticketStyleVal = re.useType+'';
				this.returnVal = re.isBearRefund+'';
				this.useNum = re.useNum;
				
				console.log(this.activeData)
			},
			capitalize (value) {//将时间戳转化为日期
			  var date = new Date(parseInt(value));
			  var tt = [date.getFullYear(), ((date.getMonth()+1)<10?'0'+(date.getMonth()+1):date.getMonth()+1), (date.getDate()<10?'0'+date.getDate():date.getDate())].join('-') + ' ' +[(date.getHours()<10?'0'+date.getHours():date.getHours()), (date.getMinutes()<10?'0'+date.getMinutes():date.getMinutes())].join(':');
			  return tt;
			},
			capiDate(value){//将日期转化为时间戳
				return new Date(value).getTime();
			},
			reserveDataChange(val){//限制订购时间
				if(val[1]>this.activeData[1]){
					this.$message({
						showClose: true,
						message:'订购日期必须在活动结束日期之前',
						type: 'error',
					});
					this.reserveData = [];
				}
			},
			effectiveDataChange(val){//有效日期限制时间
				if(val[0]<this.activeData[0]||val[1]>this.activeData[1]){
					this.$message({
						showClose: true,
						message:'有效日期只能在活动日期之间',
						type: 'error',
					});
					this.effectiveData = [];
				}
			},
			addTicket() {
				
				let self = this;
				let examineVal = ''
				let activeEndVal = ''
				let activeIng = ''
				console.log(self.ticketStyleVal)
				if(self.isExamine){
					examineVal = '1'
					
				}else{
					examineVal = '0'
				}
				if(self.isActiveEnd){
					activeEndVal = '1'
					self.reserveData = self.activeData
				}else{
					activeEndVal = '0'
				}
				if(self.isActiveIng){
					activeIng = '1'
					self.effectiveData = self.activeData
				}else{
					activeIng = '0'
				}
				if(self.charge!='1'){
					self.ticketPrice = ''
				}
				if(self.ticketTitle == ''){
					self.$message({
						showClose: true,
						message:'请填写票劵名称',
						type: 'error',
					});
				}else if(self.ticketNum == ''){
					self.$message({
						showClose: true,
						message:'请填写票劵数量',
						type: 'error',
					});
				}else if(self.charge == '1'&&self.ticketPrice == ''){
					self.$message({
						showClose: true,
						message:'请填写票劵价格',
						type: 'error',
					});
				}else if(self.limitNum == ''){
					self.$message({
						showClose: true,
						message:'请填写限购数量',
						type: 'error',
					});
				}else if(self.reserveData.length<1){
					self.$message({
						showClose: true,
						message:'请填写订购日期',
						type: 'error',
					});
				}else if(self.effectiveData.length<1){
					self.$message({
						showClose: true,
						message:'请填写有效日期',
						type: 'error',
					});
				}else if(self.ticketStyleVal == '2'&&self.useNum==''){
					self.$message({
						showClose: true,
						message:'请填写每日最多使用次数',
						type: 'error',
					});
				}else{
					
					self.axios.post(Api.userApi+'/ca/editCommunityActivityTicket', self.qs.stringify({
						ticketId:self.ticketId,
						userId:JSON.parse(sessionStorage.getItem('user')).userId,
						ticketType:self.charge,
						ticketName:self.ticketTitle,
						ticketNum:self.ticketNum,
						ticketPrice:self.ticketPrice,
						limitNum:self.limitNum,
						isCheck:examineVal,
						ticketDescription:self.ticketExplain,
						isBuyTime:activeEndVal,
						buyStartTime:self.capitalize(self.reserveData[0]),
						buyEndTime:self.capitalize(self.reserveData[1]),
						isValidTime:activeIng,
						validStartTime:self.capitalize(self.effectiveData[0]),
						validEndTime:self.capitalize(self.effectiveData[1]),
						useType:self.ticketStyleVal,
						useNum:self.useNum,
						isBearRefund:self.returnVal,
						startTime:self.capitalize(self.activeData[0]),
						endTime:self.capitalize(self.activeData[1])
						
					}), {
						headers: {
							'Content-Type': 'application/x-www-form-urlencoded'
						}
					}).then(function(res){
						if(res.data.code == 1){
							self.$message({
								showClose: true,
								message:'编辑成功',
								type: 'success'
							});
							self.$router.push({
								name:'publishActivity'
							})
						}else{
							self.$message({
								showClose: true,
								message:res.data.msg,
								type: 'error',
							});
						}
					
					})
				}
				
			}
		}
		
	}
</script>

<style lang="scss">
	.editTicketWarp {
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
				.el-input__inner{
					height: 32px;
					line-height: 32px;
				}
				.el-date-editor .el-range__icon{
					line-height: 17px;
				}
				.el-date-editor .el-range-separator{
					line-height: 22px;
				}
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
