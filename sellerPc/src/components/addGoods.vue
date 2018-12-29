<template>
	<div class="add_goods_warp">
		<ul class="add_goods_list">
			<li>
				<div class="add_goods_title">商品基本信息</div>
			</li>
			<li class="clearfloat">
				<p class="list_l">商品分类<span>*</span></p>
				<div class="list_r">
					<el-cascader class="goodsClass" placeholder="请选择商品分类" :options="goodsClassData" v-model="selectedGoodsClass"
					 @change="handleChange">
					</el-cascader>
				</div>
			</li>
			<li class="clearfloat">
				<p class="list_l">商品名称的的<span>*</span></p>
				<div class="list_r">
					<el-input class="goodsNameInput" v-model="goodsNameInput" maxlength="30" placeholder="请输入内容"></el-input>
				</div>
			</li>
			<li class="clearfloat">
				<p class="list_l">商品主图<span>*</span></p>
				<div class="list_r">
					<div class="goods_main_pic">
						<div class="goods_pic">
							<div class="img-box" :key="index" v-for="(item,index) in goodsMainList">
								<img width="100%" :src="item" alt="">
								<i class="el-icon-close pointer" @click="deleteGoodsMain(index)"></i>
							</div>

						</div>
						<el-upload class="avatar-uploader" ref="uploadGoodsMain" action="https://jsonplaceholder.typicode.com/posts/"
						 :on-success="handlePictureCardPreview" :on-remove="handleRemove" :on-exceed="handleExceed" :limit="5" list-type="picture">
							<div class="upload-text"><span>+</span>点击上传商品主图（{{goodsMainList.length}}/5）</div>
						</el-upload>
					</div>
				</div>
			</li>
			<li>
				<div class="add_goods_title">商品规格与库存</div>
			</li>
			<li class="clearfloat">
				<p class="list_l">商品规格<span>*</span></p>
				<div class="list_r specifications">
					<h4>最多添加两个商品规格</h4>
					<div class="specifications-list-warp">
						<div class="specifications-list" :key="index" v-for="(e,index) in specifications">

							<div class="list-top">
								<el-select :key="index" v-model="e.value" placeholder="请选择">
									<el-option v-for="item in e.options" :key="item.value" :value="item.value" :label="item.label">
									</el-option>
								</el-select>
								<span class="delete pointer" @click="deleteSpecification(index)">删除</span>
							</div>
							<div class="list-bottom">
								<div class="guige-name">
									<span :key="guigeNameI" v-for="(guigeItem,guigeNameI) in e.guigeName">
										{{guigeItem.name}}
										<i class="el-icon-close pointer" @click="deleteGuigeName(e,guigeNameI)"></i>
									</span>
								</div>
								<div class="input-guige">
									<el-input v-model="e.input" maxlength="10" placeholder="请输入内容"></el-input>
									<span class="add pointer" @click="addGuigeName(e)">添加</span>
								</div>
							</div>


						</div>
					</div>
					<div class="specifications-btn pointer" @click="addSpecification"><span>+</span>点击添加商品规格</div>
				</div>
			</li>
			<li class="clearfloat">
				<p class="list_l">价格及库存<span>*</span></p>
				<div class="list_r stock">
					<h4>批量设置:在下方栏中选择内容进行批量填充</h4>
					<div class="stock-nav"></div>
					<div class="stock-table" v-show="specifications!=''">
						<el-table :data="tableData" :span-method="objectSpanMethod" :row-class-name="tableRowClassName" border style="width: 100%" cell-mouse-enter="tableHover">
						    <el-table-column
							    prop="parentVal"
							    label="一级分类"
							    width="114">
						    </el-table-column>
							<el-table-column
								prop="name"
								label="二级分类"
								width="114">
							</el-table-column>
							<el-table-column
								prop="kucun"
								label="库存*"
								width="114">
								<template slot-scope="scope">
									<input maxlength="10" type="text" @change="inputEvent(scope.row)"  v-model="scope.row.kucun" />
								</template>
							</el-table-column>
							<el-table-column
								prop="xiaoshoujia"
								label="销售价"
								width="114">
								<template slot-scope="scope">
									<input maxlength="10" type="text" @change="xiaoshouReg(scope.row)" v-model="scope.row.xiaoshoujia" />
									
								</template>
							</el-table-column>
							<el-table-column
								prop="chengbenjia"
								label="成本价"
								width="114">
								<template  slot-scope="scope">
									<input maxlength="10" type="text" @change="chengbenReg(scope.row)"  v-model="scope.row.chengbenjia" />
								</template>
							</el-table-column>
							<el-table-column
								prop="sku"
								label="sku编码"
								width="114">
								<template slot-scope="scope">
									<el-input v-model="scope.row.sku"></el-input>
								</template>
							</el-table-column>
							<el-table-column
								prop="yulan"
								label="预览图"
								width="114">
							</el-table-column>
						</el-table>
						
					</div>
				</div>
			</li>
			<li>{{tableData}}</li>
		</ul>
	</div>

</template>

<script>
	export default {
		data() {
			return {
				selectedGoodsClass: [],
				goodsClassData: [{
					value: '狗狗专区',
					label: '狗狗专区',
					children: [{
						value: '狗狗主粮',
						label: '狗狗主粮',
						children: [{
							value: '国产粮',
							label: '国产粮'
						}, {
							value: '进口粮',
							label: '进口粮'
						}, {
							value: '功能粮',
							label: '功能粮'
						}]
					}, {
						value: '狗狗零食',
						label: '狗狗零食',
						children: [{
							value: '国产粮',
							label: '国产粮'
						}, {
							value: '进口粮',
							label: '进口粮'
						}, {
							value: '功能粮',
							label: '功能粮'
						}]
					}, {
						value: '狗狗玩具',
						label: '狗狗玩具',
						children: [{
							value: '国产粮',
							label: '国产粮'
						}, {
							value: '进口粮',
							label: '进口粮'
						}, {
							value: '功能粮',
							label: '功能粮'
						}]
					}, {
						value: '狗保健品',
						label: '狗保健品',
						children: [{
							value: '国产粮',
							label: '国产粮'
						}, {
							value: '进口粮',
							label: '进口粮'
						}, {
							value: '功能粮',
							label: '功能粮'
						}]
					}, {
						value: '清洁用品',
						label: '清洁用品',
						children: [{
							value: '国产粮',
							label: '国产粮'
						}, {
							value: '进口粮',
							label: '进口粮'
						}, {
							value: '功能粮',
							label: '功能粮'
						}]
					}, {
						value: '狗用香波',
						label: '狗用香波',
						children: [{
							value: '国产粮',
							label: '国产粮'
						}, {
							value: '进口粮',
							label: '进口粮'
						}, {
							value: '功能粮',
							label: '功能粮'
						}]
					}, {
						value: '护理药品',
						label: '护理药品',
						children: [{
							value: '国产粮',
							label: '国产粮'
						}, {
							value: '进口粮',
							label: '进口粮'
						}, {
							value: '功能粮',
							label: '功能粮'
						}]
					}]
				}, {
					value: '猫猫专区',
					label: '猫猫专区',
					children: [{
						value: '猫猫主粮',
						label: '猫猫主粮',
						children: [{
							value: '国产粮',
							label: '国产粮'
						}, {
							value: '进口粮',
							label: '进口粮'
						}, {
							value: '功能粮',
							label: '功能粮'
						}]
					}, {
						value: '猫猫零食',
						label: '猫猫零食',
						children: [{
							value: '国产粮',
							label: '国产粮'
						}, {
							value: '进口粮',
							label: '进口粮'
						}, {
							value: '功能粮',
							label: '功能粮'
						}]
					}, {
						value: '猫猫玩具',
						label: '猫猫玩具',
						children: [{
							value: '国产粮',
							label: '国产粮'
						}, {
							value: '进口粮',
							label: '进口粮'
						}, {
							value: '功能粮',
							label: '功能粮'
						}]
					}, {
						value: '猫猫健品',
						label: '猫猫健品',
						children: [{
							value: '国产粮',
							label: '国产粮'
						}, {
							value: '进口粮',
							label: '进口粮'
						}, {
							value: '功能粮',
							label: '功能粮'
						}]
					}, {
						value: '清洁用品',
						label: '清洁用品',
						children: [{
							value: '国产粮',
							label: '国产粮'
						}, {
							value: '进口粮',
							label: '进口粮'
						}, {
							value: '功能粮',
							label: '功能粮'
						}]
					}, {
						value: '猫用香波',
						label: '猫用香波',
						children: [{
							value: '国产粮',
							label: '国产粮'
						}, {
							value: '进口粮',
							label: '进口粮'
						}, {
							value: '功能粮',
							label: '功能粮'
						}]
					}, {
						value: '护理药品',
						label: '护理药品',
						children: [{
							value: '国产粮',
							label: '国产粮'
						}, {
							value: '进口粮',
							label: '进口粮'
						}, {
							value: '功能粮',
							label: '功能粮'
						}]
					}]
				}],
				goodsNameInput: '',
				//商品主图数据
				dialogImageUrl: '',
				dialogVisible: false,
				goodsMainList: [],
				//商品规格数据
				specifications: [],
				ceshi:''

			};
		},
		computed: {
			tableData() {
				var nameArr = [];
				this.specifications.forEach((e) => {
					e.guigeName.forEach((j)=>{
						j.parentVal = e.value;
						nameArr.push(j);
					})
				})
				
				return nameArr;
				
			}
		},
		methods: {
			//商品分类回调
			handleChange(value) {
				console.log(value);
			},
			//商品主图上传回调
			handleRemove(file, fileList) {
				console.log(file, fileList);
			},
			handlePictureCardPreview(response, file, fileList) {
				this.goodsMainList.push(file.url);
				console.log(fileList)
			},
			handleExceed(files, fileList) {
				this.$message.warning(`当前限制选择 3 个文件`);
			},
			deleteGoodsMain(index) {
				this.goodsMainList.splice(index, 1);
				this.$refs.uploadGoodsMain.uploadFiles.splice(index, 1)
			},
			//商品规格
			addSpecification() { //添加规格
				if (this.specifications.length < 2) {
					let obj = {
						options: [{
							value: '尺寸',
							label: '尺寸'
						}, {
							value: '颜色',
							label: '颜色'
						}],
						value: '',
						input: '',
						guigeName: []
					}
					this.specifications.push(obj)
				} else {
					this.$message({
						message: '只能添加两个规格',
						type: 'warning'
					});
				}
			},
			deleteSpecification(index) { //删除规格
				this.specifications.splice(index, 1);
			},
			addGuigeName(e) { //添加规格名称
				let stockObj = {
					kucun: '',
					xiaoshoujia: '',
					chengbenjia: '',
					sku: '',
					name: '',
					parentVal:'',
					yulan:''
				};

				if (e.input != "") {
					stockObj.name = e.input;
					e.guigeName.push(stockObj);
					e.input = ""
				}


			},
			deleteGuigeName(e, guigeNameI) {
				e.guigeName.splice(guigeNameI, 1);

			},
			//table
			tableRowClassName({row, rowIndex}){
				if(rowIndex%2 != 0){
					return 'active-table'
				}
			},
			objectSpanMethod({ row, column, rowIndex, columnIndex }) {
				let aNum = 0;
				let bNum = 0;
				if(this.specifications[0].guigeName){
					aNum = this.specifications[0].guigeName.length;
					if (columnIndex === 0) {
						if (rowIndex % 2 === 0) {
							return {
							rowspan: aNum,
							colspan: 1
							};
						} else {
							return {
							rowspan: bNum,
							colspan: 1
							};
						}
					}
				}
				if(this.specifications[1].guigeName){
					bNum = this.specifications[1].guigeName.length;
				}
				
				
			},
			inputEvent(e){
				//库存判断
				var re = /^[0-9]+.?[0-9]*/;
				if(!re.test(e.kucun)){
					if(e.kucun.length==1)
					{
						e.kucun=e.kucun.replace(/[^1-9]/g,'')
					}else{
						e.kucun=e.kucun.replace(/\D/g,'')
					}
				}else{
					e.kucun = Math.floor(e.kucun * 100) / 100;
				}
				console.log(e.kucun)
			},
			xiaoshouReg(e){
				var re = /^[0-9]+.?[0-9]*/;//销售价判断
				if(!re.test(e.xiaoshoujia)){
					if(e.xiaoshoujia.length==1)
					{
						e.xiaoshoujia=e.xiaoshoujia.replace(/[^1-9]/g,'')
					}else{
						e.xiaoshoujia=e.xiaoshoujia.replace(/\D/g,'')
					}
				}else{
					e.xiaoshoujia = Math.floor(e.xiaoshoujia * 100) / 100;
				}
				console.log(e.xiaoshoujia)
			},
			chengbenReg(e){
				var re = /^[0-9]+.?[0-9]*/;//成本价判断
				if(!re.test(e.chengbenjia)){
					if(e.chengbenjia.length==1)
					{
						e.chengbenjia=e.chengbenjia.replace(/[^1-9]/g,'')
					}else{
						e.chengbenjia=e.chengbenjia.replace(/\D/g,'')
					}
				}else{
					e.chengbenjia = Math.floor(e.chengbenjia * 100) / 100;
				}
				console.log(e.chengbenjia)
			}
			
		},
	}
</script>

<style lang="scss">
	.add_goods_warp {
		padding: 40px;

		.add_goods_list {
			li {

				margin-bottom: 30px;

				.add_goods_title {
					font-size: 18px;
					color: #FF523D;
					height: 22px;
					line-height: 22px;
					border-left: 2px solid #FF523D;
					padding-left: 6px;
				}

				.list_l {
					width: 125px;
					float: left;
					height: 32px;
					line-height: 32px;
					font-size: 18px;
					color: #333;

					span {
						color: #FF523D;
					}

				}

				.list_r {
					float: left;
					margin-left: 24px;

					.el-input,
					.el-input__inner {
						height: 32px;
						line-height: 32px;
						color: #333;
					}

					.el-input.is-active .el-input__inner,
					.el-input__inner:focus {
						border-color: #dcdfe6;
					}

					.el-cascader .el-input.is-focus .el-input__inner {
						border-color: #dcdfe6;
					}

					.el-cascader {
						line-height: 32px;
						font-size: 16px;
						color: #333;
					}

					.el-cascader__label {
						color: #333;
					}

					.el-input__icon {
						line-height: 32px;
					}

					.goodsClass {
						width: 420px;
					}

					.goodsNameInput {
						width: 600px;
						font-size: 16px;

					}

					.el-upload-list--picture .el-upload-list__item {
						display: none;
					}

					.goods_main_pic {
						.goods_pic {
							.img-box {
								margin-bottom: 10px;
								display: inline-block;
								margin-right: 25px;
								padding: 5px;
								border: 1px solid #ddd;
								position: relative;

								i {
									position: absolute;
									top: -5px;
									right: -5px;
									background: rgba(0, 0, 0, 0.5);
									color: #fff;
									border-radius: 50%;
									z-index: 10000;
								}

								img {
									height: 100px;
									width: 100px;
								}
							}
						}

						.el-upload--picture-card {
							border: none;
						}

						.avatar-uploader {
							.upload-text {
								height: 32px;
								line-height: 32px;
								border: 1px solid #ddd;
								box-sizing: border-box;
								width: 300px;
								border-radius: 4px;
								color: #333;
								text-align: left;
								padding-left: 15px;
								font-size: 16px;
								color: #999;

								span {
									color: #FF523D;
									margin-right: 5px;

								}
							}
						}
					}
				}

				.specifications {
					h4 {
						font-size: 14px;
						line-height: 32px;
						color: #999;
					}

					.specifications-btn {
						height: 32px;
						line-height: 32px;
						border: 1px solid #ddd;
						box-sizing: border-box;
						width: 300px;
						border-radius: 4px;
						color: #333;
						text-align: left;
						padding-left: 15px;
						font-size: 16px;
						color: #999;

						span {
							color: #FF523D;
							margin-right: 5px;

						}
					}

					.specifications-list-warp {
						.specifications-list {
							margin-bottom: 20px;

							.list-top {
								.delete {
									color: #FF523D;
									font-size: 14px;
									margin-left: 10px;
								}

								.el-input {
									width: 300px;
								}
							}

							.list-bottom {
								width: 300px;
								padding: 11px 22px;
								box-sizing: border-box;
								border: 1px solid #ddd;
								border-radius: 6px;

								.el-input {
									width: 200px;
								}

								.input-guige {

									span {
										color: #FF523D;
										font-size: 14px;
										margin-left: 10px;
									}
								}

								.guige-name {
									margin-bottom: 20px;

									span {
										display: inline-block;
										padding: 0 10px;
										height: 30px;
										line-height: 30px;
										border: 1px solid rgba(221, 221, 221, 1);
										border-radius: 15px;
										font-size: 16px;
										color: #333;
										margin-right: 5px;
										margin-bottom: 5px;
										position: relative;

										i {
											position: absolute;
											right: -5px;
											top: -5px;
											color: #fff;
											border-radius: 50%;
											background: rgba(0, 0, 0, 0.5);
											font-size: 12px;
											display: none;
										}

										&:hover i {
											display: block;
										}
									}

								}
							}
						}
					}
				}

				.stock {
					h4 {
						font-size: 14px;
						line-height: 32px;
						color: #999;
					}

					.stock-table {
						.el-table--enable-row-transition .el-table__body td{
							height: 80px;
							input{
								outline: none;
								height: 80px;
								width: 100%;
								
							}
						}
						.el-table--enable-row-hover .el-table__body tr:hover>td{
							background: none;
						}
						.active-table{
							background: #f7f7f7;
							.input{
								background: #f7f7f7;
							}
						}
					}
				}
			}
		}
	}
</style>
