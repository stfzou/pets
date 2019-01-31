<template>
	<div class="sell_warp">

		<div class="query">
			<div class="query_goods_class">
				<span class="query_title">商品分类</span>
				<el-cascader :options="goodsClassData" v-model="selectGoodsClass" @change="select">
				</el-cascader>
			</div>
			<div class="query_goods_class goods_num">
				<span class="query_title">商品编码</span>
				<el-input v-model="goodsNum" placeholder="商品编码"></el-input>
			</div>
			<div class="query_goods_class goods_num">
				<span class="query_title">商品名称</span>
				<el-input v-model="goodsName" placeholder="商品编码"></el-input>
			</div>
			<div class="query_goods_class sales">
				<span class="query_title">销量</span>
				<el-input v-model="xiaoliang.min" @change="saleNum(xiaoliang,'min')"></el-input>
				<span class="query_line">—</span>
				<el-input v-model="xiaoliang.max" @change="saleNum(xiaoliang,'max')"></el-input>
			</div>
			<div class="query_goods_class sales">
				<span class="query_title">库存</span>
				<el-input v-model="kucun.min" @change="saleNum(kucun,'min')"></el-input>
				<span class="query_line">—</span>
				<el-input v-model="kucun.max" @change="saleNum(kucun,'max')"></el-input>
			</div>
			<div class="query_goods_class search_btn">
				<el-button icon="el-icon-search" round @click="search">查询</el-button>
			</div>
		</div>
		<div class="sales_table">
			<div class="sales_table_nav">
				<span @click="updateTable(item,index)" :class="{active:index == selectNum}" :key="index" v-for="(item,index) in tableNavData">{{item.name}}</span>
			</div>

			<el-table v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading"
			 element-loading-background="#fff" ref="multipleTable" :data="tableData" style="width: 100%" :default-sort="{prop: 'date', order: 'descending'}"
			 @selection-change="handleSelectionChange">
				<el-table-column type="selection" width="55">
				</el-table-column>
				<el-table-column prop="productCoding" label="商品编码" width="120">

				</el-table-column>
				<el-table-column prop="p_img" label="商品图片" width="120">
					<template slot-scope="scope">
						<img class="table_img" :src="scope.row.p_img" alt="">
					</template>
				</el-table-column>
				<el-table-column prop="productName" label="商品名称" width="200">
				</el-table-column>
				<el-table-column prop="original" width="200" label="销售价格" sortable>
				</el-table-column>
				<el-table-column prop="productNum" label="库存数量" width="200" sortable>
				</el-table-column>
				<el-table-column prop="saleNum" label="累计销售" width="200" sortable>
				</el-table-column>
				
				<el-table-column label="编辑" width="250">
					<template slot-scope="scope">
						<div class="edite">
							<span @click="editLink(scope.row)">编辑</span>
							<span @click="deleteOne(scope.row)" v-if="scope.row.productStatus=='3'||scope.row.productStatus=='4'||scope.row.productStatus=='2'">删除</span>
							<span v-if="scope.row.productStatus=='1'" @click="shelve(scope.row)">下架</span>
							<span v-if="scope.row.productStatus=='1'" @click="share">分享商品</span>
							<span v-if="scope.row.productStatus=='1'" @click="overhead">
								置顶商品
							</span>

						</div>
					</template>
				</el-table-column>
				<el-table-column label="商品状态">
					<template slot-scope="scope">
						<div>
							{{scope.row.productStatus|goodsStatus}}
						</div>
					</template>
				</el-table-column>
			</el-table>
			<div class="flex_r_f_s table_btom">
				<div>
					<el-button round @click="shelveAll">下架</el-button>
					<el-button round @click="deleteTable">删除</el-button>
				</div>
				<el-pagination layout="prev, pager, next" :total="total" :page-size="5" @current-change="getPageData">
				</el-pagination>
			</div>

		</div>
		<div class="modal" v-show="modal">
			<div class="modal_cnt">
				<div class="erweima">
					<div class="title">
						<h3><i class="el-icon-circle-check"></i>商品链接已复制成功！</h3>
						<p>通过微信、QQ、微博分享给好友吧</p>
					</div>
					<div class="goods">
						<img class="goods_pic" src="../assets/share_img.png" alt="">
						<div class="goods_btom flex_r_s_b">
							<div class="goods_l">
								<div class="goods_name">疯狂的小狗博美专用狗粮1.5kg*2包幼犬美毛去泪痕6斤</div>
								<div class="price">￥120.00</div>
							</div>
							<div class="goods_r">

								<img class="erweima_img" id="ewm" src="../assets/erweima.png" alt="">
								<p>扫码查看详情</p>
							</div>
						</div>
						<div class="scanning">
							<div id="qrcode" ref="qrcode"></div>
							<!-- <img class="erweima_max" src="../assets/erweima.png" alt=""> -->
							<p>扫码查看商品详情</p>
							<div class="tx">还可以通过右键保存</br>商品海报进行分享</div>
							<div class="sjx_r"></div>
						</div>
					</div>

				</div>
				<div class="close">
					<i class="el-icon-circle-close" @click="clearShare"></i>
				</div>

			</div>
		</div>

	</div>
</template>

<script>
	import QRCode from 'qrcodejs2'
	export default {
		data() {
			return {
				selectGoodsClass: [], //商品分类选择数据
				goodsNum: '', //商品编码
				goodsName: '', //商品名称
				modal: false,
				goodsClassData: [], //商品分类
				selectNum: 0,
				selectState: '-1',
				xiaoliang: { //销量
					max: '',
					min: ''
				},
				kucun: { //库存
					max: '',
					min: ''
				},
				tableData: [],
				tableNavData: [{
					name: '全部',
					status: '-1'
				}, {
					name: '在售中',
					status: '1'
				}, {
					name: '已售罄',
					status: ''
				}, {
					name: '已下架',
					status: '4'
				}, {
					name: '草稿中',
					status: '3'
				}],
				selectTable: [],
				selectAll: false,
				loading: true,
				page:'1',
				total:10

			};
		},
		mounted: function() {
			this.$store.commit('initialNav', {
				navNum: 1,
				subNum: 1
			});
			this.getGoodsClass();
			this.getAllGoods('-1','1');

		},
		filters:{
			goodsStatus(value){
				if(value == '4'){
					return '已下架'
				}else if(value == '1'){
					return '在售中'
				}else if(value == '3'){
					return '草稿'
				}
			}
		},
		methods: {
			handleSelectionChange(val) {
				this.selectTable = val;
			},
			deleteTable() { //删除下架商品
				let _this = this;
				let self = this;
				let isDelete = true;
				let arr = [];
				if (this.selectTable.length > 0) {
					this.selectTable.forEach((e) => {
						if (e.productStatus == 1) {
							isDelete = false;
							return false;
						}else{
							arr.push(e.productId);
						}
					})
					if (isDelete) {
						this.$confirm('是否继续删除商品?', '提示', {
							confirmButtonText: '确定',
							cancelButtonText: '取消',
							type: 'warning',
							callback: function(action, instance) {
								if (action == 'confirm') {
									self.axios.post('/shop/deleteProduct', self.qs.stringify({
										shopId: JSON.parse(sessionStorage.getItem('user')).shopId,
										productIds:arr.join(',')
									}), {
										headers: { //经营品类
											'Content-Type': 'application/x-www-form-urlencoded',
										}
									}).then((res)=>{
										if(res.data.code == 1){
											self.$router.go(0)
											_this.$message({
												message: '删除成功',
												type: 'success'
											});
										}else{
											self.$message.error(res.data.msg);
										}
									})
									
								}
							}
						})
					}else{
						this.$message('只能删除下架的商品');
					}

				} else {
					this.$message('还没有选择任何数据');
				}

			},
			deleteOne(scope){//删除单个下架或者草稿
				let self = this; 
				this.$confirm('是否继续删除商品?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning',
					callback: function(action, instance) {
						if (action == 'confirm') {
							self.axios.post('/shop/deleteProduct', self.qs.stringify({
								shopId: JSON.parse(sessionStorage.getItem('user')).shopId,
								productIds:scope.productId
							}), {
								headers: { //经营品类
									'Content-Type': 'application/x-www-form-urlencoded',
								}
							}).then((res)=>{
								if(res.data.code == 1){
									self.tableData.forEach((e,i)=>{
										if(e.productId == scope.productId){
											self.tableData.splice(i,1);
										}
									})
									self.$message({
										message: '删除成功',
										type: 'success'
									});
								}else{
									self.$message.error(res.data.msg);
								}
							})
							
						}
					}
				})
			},
			share() { //打开弹出框
				let self = this;
				document.getElementById("qrcode").innerHTML = "";
				self.modal = true;
				setTimeout(() => {
					self.qrcode()
				}, 100)

			},
			clearShare() {
				this.modal = false; //关闭弹出框
			},
			saleNum(xl, val) {
				let a = null;
				let re = /^\d+\.?\d{0,2}$/;
				if (!re.test(xl[val])) {
					xl[val] = '';
				} else {
					if (xl.max != '' && xl.min != '') {

						if (parseInt(xl.max) < parseInt(xl.min)) {

							a = xl.max;
							xl.max = xl.min;
							xl.min = a;

						}
					}
				}

			},
			overhead(e) { //置顶商品


			},
			shelve(scope){//商品下架
				let self = this;
				if(scope.productStatus == 4){
					this.$message('此商品已经下架');
				}else{
					this.$confirm('是否下架此商品?', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning',
						callback: function(action, instance) {
							if (action == 'confirm') {
					
								self.axios.post('/shop/productCancel', self.qs.stringify({
									shopId: JSON.parse(sessionStorage.getItem('user')).shopId,
									productIds:scope.productId
								}), {
									headers: { //经营品类
										'Content-Type': 'application/x-www-form-urlencoded',
									}
								}).then(function(res){
									if(res.data.code == 1){
										self.$message({
											showClose: true,
											message: '商品下架成功',
											type: 'success',
										});
										scope.productStatus = '4';
									}else{
										self.$message.error(res.data.msg);
									}
								})
							}
						}
					})
				}
			},
			shelveAll(){//商品下架
				let arr = [];
				let self = this;
				if(self.selectTable.length>0){
					self.selectTable.forEach((e)=>{
						arr.push(e.productId);
					});
					this.$confirm('是否下架此商品?', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning',
						callback: function(action, instance) {
							if (action == 'confirm') {
					
								self.axios.post('/shop/productCancel', self.qs.stringify({
									shopId: JSON.parse(sessionStorage.getItem('user')).shopId,
									productIds:arr.join(',')
								}), {
									headers: { //经营品类
										'Content-Type': 'application/x-www-form-urlencoded',
									}
								}).then(function(res){
									if(res.data.code == 1){
										self.tableData.forEach((e)=>{
											self.selectTable.forEach((j)=>{
												if(e.productId == j.productId){
													e.productStatus = '4';
												}
											})
										})
										self.$message({
											showClose: true,
											message: '商品下架成功',
											type: 'success',
										});
										
									}else{
										self.$message.error(res.data.msg);
									}
								})
							}
						}
					})
				}else{
					self.$message.error('请选择将要下架的商品');
				}
				
				
			},
			selectSort(index) { //点击排序数字背景变色
				this.sortNum = index;

			},
			cancelSortState() {
				this.sortState = false;
			},
			updateTable(item,index) {
				this.selectNum = index;
				this.selectState = item.status;
				this.loading = true;
				this.getAllGoods(item.status,'1');
			},
			getGoodsClass() { //初始化商品分类

				let self = this;
				this.axios.post('/selectGroupAll', {
					headers: { //经营品类
						'Content-Type': 'application/x-www-form-urlencoded',
					}
				}).then(function(res) {
					if (res.data.code == 1) {
						res.data.data.forEach(function(e) {
							let obj = {
								label: '',
								value: '',
								children: []
							};
							obj.label = e.name;
							obj.value = e.id;
							self.axios.post('/selectGSortOne', self.qs.stringify({
								gIds: obj.value
							}), {
								headers: { //经营品类
									'Content-Type': 'application/x-www-form-urlencoded',
								}
							}).then(function(subres) {

								if (subres.data.code == 1) {


									subres.data.data[0].forEach(function(s) { //二级分类回调

										let childrenObj = {
											lable: '',
											value: '',
											children: []
										};
										childrenObj.label = s.sortName;
										childrenObj.value = s.sortId;
										self.axios.post('/selectSortTwo', self.qs.stringify({
											sortIds: childrenObj.value
										}), {
											headers: { //经营品类
												'Content-Type': 'application/x-www-form-urlencoded',
											}
										}).then(function(gs) {

											if (gs.data.code == 1) { //三级分类回调
												gs.data.data[0].forEach(function(g) {

													childrenObj.children.push({
														label: g.sortName,
														value: g.sortId
													});

												})


											}
										})
										obj.children.push(childrenObj)
									})
								}
							})
							self.goodsClassData.push(obj)

						})
					} else {
						this.$message({
							showClose: true,
							message: res.data.msg,
							type: 'error',
						});
					}
				})
			},
			qrcode(url) { //二维码

				let qrcode = new QRCode('qrcode', {
					width: 136, // 设置宽度，单位像素
					height: 136, // 设置高度，单位像素
					text: 'https://www.baidu.com' // 设置二维码内容或跳转地址
				})

			},
			search() { //搜索
				this.loading = true;
				this.getAllGoods(this.selectState);
			},
			select(val) {
				console.log(val)
			},
			getAllGoods(state,val) { //根据状态查询商品
			
				let self = this;
				this.axios.post('/webShop/selectShopsProduct', this.qs.stringify({
					shopId: JSON.parse(sessionStorage.getItem('user')).shopId,
					status: state,
					pageNo: val,
					pageSize: '5',
					sortId: self.selectGoodsClass[2],
					productCoding: self.goodsNum,
					productName: self.goodsName,
					salesStart: self.xiaoliang.min,
					salesEnd: self.xiaoliang.max,
					numStart: self.kucun.min,
					numEnd: self.kucun.max
				}), {
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					}
				}).then(function(res) {
					if (res.data.code == 1) {
						self.tableData = res.data.data.list;
						self.total = res.data.data.total;
						setTimeout(() => {
							self.loading = false;
						}, 500)

					} else {
						self.$message.error(res.data.msg);
						setTimeout(() => {
							self.loading = false;
						}, 500)
					}
				})
			},
			editLink(scope) { //编辑
				this.$store.commit('initialNav', {
					navNum: 1,
					subNum: 1
				});
				this.$router.push({
					name: 'goodsEdit',
					query: {
						gId: scope.productId
					}
				})

			},
			getPageData(val){//获取当前页数据
				
				this.page = val;
				this.getAllGoods(this.selectState,val);
			}
		}

	}
</script>

<style lang="scss">
	.sell_warp {
		padding: 30px;

		.el-loading-spinner .el-loading-text {
			color: #ff523d;
		}

		.el-loading-spinner i {
			color: #ff523d;
			font-size: 16px;
		}

		.overhead {
			width: 190px;
			height: 190px;
			background: #fff;
			position: fixed;
			padding: 10px;
			box-sizing: border-box;
			left: -200px;
			top: 0;
			z-index: 10000;
			box-shadow: 0px 0px 5px 2px rgba(0, 0, 0, 0.2);

			.el-icon-caret-top {
				position: absolute;
				top: -18px;
				right: 20px;
				font-size: 26px;
				color: #fff;

			}

			h4 {
				font-size: 16px;
				color: #666;
			}

			.seat {
				flex-wrap: wrap;

				div {
					width: 70px;
					height: 24px;
					text-align: center;
					border: 1px solid rgba(221, 221, 221, 1);
					background: #fff;
					border-radius: 12px;
					font-size: 16px;
					line-height: 24px;
					color: #333;
					margin-top: 10px;
					cursor: pointer;
				}

				.active {
					background: #FF523D;
					color: #fff;
				}
			}

			.button {
				margin-top: 20px;
				padding: 0 5px;
				box-sizing: border-box;

				div {
					width: 56px;
					height: 24px;
					line-height: 24px;
					color: #fff;
					text-align: center;
					font-size: 16px;
					border-radius: 12px;
					cursor: pointer;
				}

				.cancel {
					background: #7e7e7e;
				}

				.confirm {
					background: #FF523D;
				}
			}
		}

		.modal {
			height: 100%;
			width: 100%;
			position: fixed;
			left: 0;
			top: 0;
			background: rgba(0, 0, 0, 0.5);
			z-index: 100000;

			.modal_cnt {
				position: absolute;
				left: 50%;
				top: 50%;
				transform: translate(-50%, -50%);
				-webkit-transform: translate(-50%, -50%);
				-moz-transform: translate(-50%, -50%);

				.close {
					margin-top: 20px;
					text-align: center;

					.el-icon-circle-close {
						font-size: 40px;
						color: #fff;
					}
				}

				.erweima {
					width: 730px;
					height: 560px;
					position: relative;
					background: rgba(255, 255, 255, 1);
					border: 1px solid rgba(255, 255, 255, 1);
					border-radius: 6px;
					padding-top: 30px;
					box-szing: border-box;

					.title {
						h3 {
							font-size: 24px;
							color: #FF523D;
							text-align: center;
						}

						p {
							font-size: 18px;
							text-align: center;
							color: #666666;
							margin-top: 20px;
						}
					}

					.goods {
						margin-left: 110px;
						margin-top: 26px;
						width: 272px;
						border-radius: 6px;
						border: 1px solid #ddd;
						box-sizing: border-box;
						position: relative;

						.scanning {
							position: absolute;
							bottom: 15px;
							right: -218px;
							width: 178px;
							height: 265px;
							padding-top: 18px;
							box-sizing: border-box;
							border: 1px solid rgba(225, 225, 225, 1);
							box-shadow: 0px 6px 8px 0px rgba(0, 0, 0, 0.1);

							#qrcode {
								img {
									margin: 0 auto;
									display: block;
								}
							}

							p {
								text-align: center;
								font-size: 12px;
								color: #000;
								margin-top: 10px;
							}

							.tx {
								line-height: 18px;
								font-size: 12px;
								color: #000;
								text-align: center;
								margin-top: 30px;
							}

							.sjx_r {
								width: 28px;
								height: 26px;
								background: url(../assets/erweima_right.png) no-repeat center 0;
								background-size: cover;
								position: absolute;
								left: -27px;
								bottom: 60px;
							}
						}

						.goods_pic {
							width: 270px;
							display: block;

						}

						.goods_btom {
							align-items: flex-start;
							padding: 10px;
							box-sizing: border-box;

							.goods_l {
								width: 140px;

								.goods_name {
									line-height: 18px;
									font-size: 12px;
									color: #000;
								}

								.price {
									font-size: 14px;
									color: #FF523D;
									margin-top: 18px;
								}
							}

							.goods_r {
								width: 80px;

								.erweima_img {
									width: 80px;
									height: 80px;
								}

								p {
									font-size: 10px;
									color: #000;
									text-align: center;
								}
							}
						}
					}
				}
			}
		}

		.el-cascader {
			line-height: 30px;
			width: 260px;

			.el-input__inner {
				height: 30px;
				line-height: 30px;

			}

			.el-input__suffix-inner {
				.el-input__icon {
					line-height: 30px;
				}
			}

			.el-input.is-focus .el-input__inner {
				border-color: #dcdfe6;
			}

			.el-input.is-active .el-input__inner,
			.el-input__inner:focus {
				border-color: #dcdfe6;
			}

			.el-cascader__label {
				font-size: 16px;
			}
		}

		.query_goods_class {
			width: 400px;
			display: inline-block;
			margin-right: 38px;
			margin-bottom: 30px;

			.query_title {
				font-size: 18px;
				color: #333;
				margin-right: 5px;
				width: 76px;
				display: inline-block;
			}

			.el-input__inner {
				height: 30px;
				line-height: 30px;
				outline: none;
			}

			.el-input.is-active .el-input__inner,
			.el-input__inner:focus {
				border-color: #dcdfe6;
			}

			.el-button.is-round {
				padding: 10px 10px;
				background: #FF523D;
				color: #fff;
			}
		}

		.goods_num {
			.el-input {
				width: 260px;
				font-size: 16px;
			}
		}

		.sales {
			.el-input {
				width: 100px;
			}

			.query_line {
				color: #999;
			}

		}

		.sales_table {
			.sales_table_nav {
				margin: 20px 0 20px 0;

				span {
					margin-right: 35px;
					cursor: pointer;
					font-size: 16px;
				}

				.active {
					color: #FF523D;
				}
			}

			.table_btom.flex_r_f_s {
				justify-content: space-between;
			}

			.edite {
				span {
					font-size: 16px;
					color: #FF523D;
					margin-right: 5px;
					cursor: pointer;
					position: relative;
				}
			}

			.table_btom {
				margin-top: 10px;
				padding-left: 14px;

				.el-button {
					width: 56px;
					height: 24px;
					padding: 0;
					line-height: 24px;
					color: #fff;
					background: #ff523d;
					font-size: 16px;
				}


			}

			.table_img {
				width: 74px;
				height: 74px;
			}

			.el-table thead th {
				background: #ff8677;
				padding: 0;
				color: #fff;
			}

			.el-table .ascending .sort-caret.ascending {
				border-bottom-color: #333;
			}

			.el-table .descending .sort-caret.descending {
				border-top-color: #333;
			}
		}
	}
</style>
