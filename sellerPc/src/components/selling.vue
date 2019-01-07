<template>
	<div class="sell_warp">
		
		<div class="query">
			<div class="query_goods_class">
				<span class="query_title">商品分类</span>
				<el-cascader
					:options="goodsClassOption"
					v-model="selectGoodsClass">
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
				<el-input v-model="xiaoliang.min"></el-input>
				<span class="query_line">—</span>
				<el-input v-model="xiaoliang.max"></el-input>
			</div>
			<div class="query_goods_class sales">
				<span class="query_title">库存</span>
				<el-input v-model="kucun.min"></el-input>
				<span class="query_line">—</span>
				<el-input v-model="kucun.max"></el-input>
			</div>
		</div>
		<div class="sales_table">
			<div class="sales_table_nav">
				<span>全部</span>
				<span>在售中</span>
				<span>已售罄</span>
				<span>已下架</span>
				<span>草稿中</span>
			</div>
			<el-table
			    ref="multipleTable"
				:data="tableData"
				style="width: 100%"
				:default-sort = "{prop: 'date', order: 'descending'}"
				@selection-change="handleSelectionChange">
				<el-table-column
					type="selection"
					width="55">
				</el-table-column>
				<el-table-column
				    prop="bianma"
				    label="商品编码"
					width="100">
					
				</el-table-column>
				<el-table-column
				    prop="img"
				    label="商品图片">
					<template slot-scope="scope">
						<img class="table_img" :src="scope.row.img" alt="">
					</template>
				</el-table-column>
				<el-table-column
				    prop="name"
				    label="商品名称"
					width="390">
				</el-table-column>
				<el-table-column
					prop="price"
					width="100"
					label="销售价格"
					sortable>
				</el-table-column>
				<el-table-column
					prop="kucun"
					label="库存数量"
					width="100"
					sortable>
				</el-table-column>
				<el-table-column
					prop="saleCount"
					label="累计销售"
					width="100"
					sortable>
				</el-table-column>
				<el-table-column
					prop="saleState"
					label="销售状态">
				</el-table-column>
				<el-table-column
					label="编辑"
					width="250">
					<template slot-scope="scope">
						<div class="edite">
							<span>编辑</span>
							<span>下架</span>
							<span @click="share">分享商品</span>
							<span @click="overhead">
								置顶商品
							</span>
							
						</div>
					</template>
				</el-table-column>
			</el-table>
			<div class="flex_r_f_s table_btom">
				<div>
					<el-button round>下架</el-button>
					<el-button round @click="deleteTable">删除</el-button>
				</div>
				 <el-pagination
					layout="prev, pager, next"
					:total="55">
				</el-pagination>
			</div>
		</div>
		<div class="modal" v-if="modal">
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
								<img class="erweima_img" src="../assets/erweima.png" alt="">
								<p>扫码查看详情</p>
							</div>
						</div>
						<div class="scanning">
							<img class="erweima_max" src="../assets/erweima.png" alt="">
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
		<div v-if="sortState" class="overhead" ref="overhead">
			<i class="el-icon-caret-top"></i>
			<h4>将商品移动至</h4>
			<div class="seat flex_r_s_b">
				<div @click="selectSort(index)" :class="{active:index == sortNum}" v-for="(item,index) in sort" :key="index">第{{index+1}}位</div>
				
			</div>
			<div class="button flex_r_s_b">
				<div class="cancel" @click="cancelSortState">取消</div>
				<div class="confirm">确定</div>
			</div>
		</div>
	</div>
</template>

<script>
	
	export default {
		data() {
			return {
				selectGoodsClass:[],//商品分类选择数据
				goodsClassOption:[
					{
						value:'猫猫专区',
						label:'猫猫专区',
						children:[{
							value:'猫猫主粮',
							label:'猫猫零食',
							children:[{
								value:'进口零食',
								label:'进口零食'
							},{
								value:'国产零食',
								label:'国产零食'
							},{
								value:'功能零食',
								label:'功能零食'
							}]
						},{
							value:'猫猫主粮',
							label:'猫猫零食',
							children:[{
								value:'进口零食',
								label:'进口零食'
							},{
								value:'国产零食',
								label:'国产零食'
							},{
								value:'功能零食',
								label:'功能零食'
							}]
						}]
					},{
						value:'狗狗专区',
						label:'狗狗专区',
						children:[{
							value:'狗狗主粮',
							label:'狗狗零食',
							children:[{
								value:'进口零食',
								label:'进口零食'
							},{
								value:'国产零食',
								label:'国产零食'
							},{
								value:'功能零食',
								label:'功能零食'
							}]
						},{
							value:'猫猫主粮',
							label:'猫猫零食',
							children:[{
								value:'进口零食',
								label:'进口零食'
							},{
								value:'国产零食',
								label:'国产零食'
							},{
								value:'功能零食',
								label:'功能零食'
							}]
						}]
					}
					
				],
				goodsNum:'',//商品编码
				goodsName:'',//商品名称
				modal:false,
				xiaoliang:{ //销量
					max:'',
					min:''
				},
				kucun:{ //库存
					max:'',
					min:''
				},
				tableData:[{
					bianma:'1',
					img:require("../assets/table_img1.png"),
					name:'生物链猫用益生菌肉酱化毛膏三文鱼味营养补充调理肠胃',
					price:'80.00',
					kucun:'100',
					saleCount:'100',
					saleState:'在售',
					operation:''
				},{
					bianma:'2',
					img:require("../assets/table_img1.png"),
					name:'生物链猫用益生菌肉酱化毛膏三文鱼味营养补充调理肠胃',
					price:'60.00',
					kucun:'60',
					saleCount:'100',
					saleState:'在售',
					operation:''
				},{
					bianma:'3',
					img:require("../assets/table_img1.png"),
					name:'生物链猫用益生菌肉酱化毛膏三文鱼味营养补充调理肠胃',
					price:'120.00',
					kucun:'300',
					saleCount:'200',
					saleState:'在售',
					operation:''
				}],
				selectTable:[],
				selectAll:false,
				sort:[1,2,3,4,5],
				sortNum:0,//排序数据
				sortState:false,//数据排序状态
			};
		},
		methods: {
			handleSelectionChange(val){
				this.selectTable = val;
				
			},
			deleteTable(){
				if(this.selectTable.length>0){
					let _this = this;
					this.$confirm('是否继续删除文件?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning',
					callback:function(action, instance){
						if(action == 'confirm'){
							
							if(_this.tableData.length === _this.selectTable.length){
								_this.tableData = [];
							}else{
								_this.tableData.forEach((e,index,arr)=>{
									_this.selectTable.forEach((j,i)=>{
										if(e.bianma === j.bianma){
											arr.splice(index,1)
										}
									})
								})
							}
							
							_this.selectTable = [];
							_this.$message({
								message: '删除成功',
								type: 'success'
							});
						}
					}
					})
				}else{
					this.$message('还没有选择任何数据');
				}
				
			},
			share(){ //打开弹出框
				this.modal = true;
			},
			clearShare(){
				this.modal = false;//关闭弹出框
			},
			overhead(e){ //置顶商品出现
				this.sortState = true;
				setTimeout(()=>{
					let left = e.clientX;
					let top = e.clientY;
					let width = this.$refs.overhead.offsetWidth-50;
					this.$refs.overhead.style.left = left - width +'px';
					this.$refs.overhead.style.top = top+20+'px';
				
				},5)
				
			},
			selectSort(index){ //点击排序数字背景变色
				this.sortNum = index;
			},
			cancelSortState(){
				this.sortState = false;
			}
				
		}
	
	}
</script>

<style lang="scss">
	.sell_warp{
		padding: 30px;
		.overhead{
			width: 190px;
			height: 190px;
			background:#fff;
			position:fixed;
			padding: 10px;
			box-sizing: border-box;
			left:-200px;
			top: 0;
			z-index: 10000;
			box-shadow: 0px 0px 5px 2px rgba(0,0,0,0.2);
			.el-icon-caret-top{
				position: absolute;
				top: -18px;
				right: 20px;
				font-size:26px;
				color: #fff;
				
			}
			h4{
				font-size: 16px;
				color: #666;
			}
			.seat{
				flex-wrap: wrap;
				div{
					width:70px;
					height:24px;
					text-align: center;
					border:1px solid rgba(221,221,221,1);
					background:#fff;
					border-radius:12px;
					font-size: 16px;
					line-height: 24px;
					color: #333;
					margin-top: 10px;
					cursor: pointer;
				}
				.active{
					background: #FF523D;
					color: #fff;
				}
			}
			.button{
				margin-top: 20px;
				padding: 0 5px;
				box-sizing: border-box;
				div{
					width: 56px;
					height: 24px;
					line-height: 24px;
					color: #fff;
					text-align: center;
					font-size: 16px;
					border-radius:12px;
					cursor: pointer;
				}
				.cancel{
					background: #7e7e7e;
				}
				.confirm{
					background: #FF523D;
				}
			}
		}
		.modal{
			height: 100%;
			width: 100%;
			position: fixed;
			left:0;
			top: 0;
			background:rgba(0,0,0,0.5);
			z-index: 100000;
			
			.modal_cnt{
				position: absolute;
				left: 50%;
				top: 50%;
				transform: translate(-50%,-50%);
				-webkit-transform: translate(-50%,-50%);
				-moz-transform: translate(-50%,-50%);
				.close{
					margin-top: 20px;
					text-align: center;
					.el-icon-circle-close{
						font-size: 40px;
						color: #fff;
					}
				}
				
				.erweima{
					width:730px;
					height:560px;
					position: relative;
					background:rgba(255,255,255,1);
					border:1px solid rgba(255,255,255,1);
					border-radius:6px;
					padding-top:30px;
					box-szing:border-box;
					
					.title{
						h3{
							font-size: 24px;
							color: #FF523D;
							text-align: center;
						}
						p{
							font-size: 18px;
							text-align: center;
							color: #666666;
							margin-top: 20px;
						}
					}
					.goods{
						margin-left: 110px;
						margin-top: 26px;
						width: 272px;
						border-radius: 6px;
						border: 1px solid #ddd;
						box-sizing: border-box;
						position: relative;
						.scanning{
							position: absolute;
							bottom: 15px;
							right:-218px;
							width: 178px;
							height: 265px;
							padding-top: 18px;
							box-sizing: border-box;
							border:1px solid rgba(225,225,225,1);
							box-shadow:0px 6px 8px 0px rgba(0, 0, 0, 0.1);
							.erweima_max{
								margin: 0 auto;
								display: block;
							}
							p{
								text-align: center;
								font-size: 12px;
								color: #000;
								margin-top: 10px;
							}
							.tx{
								line-height: 18px;
								font-size: 12px;
								color: #000;
								text-align: center;
								margin-top: 30px;
							}
							.sjx_r{
								width: 28px;
								height: 26px;
								background: url(../assets/erweima_right.png) no-repeat center 0;
								background-size: cover;
								position: absolute;
								left: -27px;
								bottom: 60px;
							}
						}
						.goods_pic{
							width:270px;
							display: block;
							
						}
						.goods_btom{
							align-items: flex-start;
							padding: 10px;
							box-sizing: border-box;
							.goods_l{
								width: 140px;
								.goods_name{
									line-height: 18px;
									font-size: 12px;
									color:#000;
								}
								.price{
									font-size: 14px;
									color: #FF523D;
									margin-top: 18px;
								}
							}
							.goods_r{
								width: 80px;
								.erweima_img{
									width:80px;
									height:80px;
								}
								p{
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
		.el-cascader{
			line-height: 30px;
			width:260px;
			.el-input__inner{
				height: 30px;
				line-height: 30px;
				
			}
			.el-input__suffix-inner{
				.el-input__icon{
					line-height: 30px;
				}
			}
			.el-input.is-focus .el-input__inner{
				border-color:#dcdfe6;
			}
			.el-input.is-active .el-input__inner, .el-input__inner:focus{
				border-color:#dcdfe6;
			}
			.el-cascader__label{
				font-size: 16px;
			}
		}
		
		.query_goods_class{
			width: 400px;
			display: inline-block;
			margin-right:38px;
			margin-bottom: 30px;
			.query_title{
				font-size: 18px;
				color: #333;
				margin-right: 5px;
				width: 76px;
				display: inline-block;
			}
			.el-input__inner{
				height:30px;
				line-height: 30px;
				outline: none;
			}
			.el-input.is-active .el-input__inner, .el-input__inner:focus{
				border-color: #dcdfe6;
			}
		}
		.goods_num{
			.el-input{
				width: 260px;
				font-size: 16px;
			}
		}
		.sales{
			.el-input{
				width: 100px;
			}
			.query_line{
				color:#999;
			}
			
		}
		.sales_table{
			.sales_table_nav{
				margin:20px 0 20px 0;
				span{
					margin-right: 35px;
					cursor:pointer;
					font-size: 16px;
				}
				
			}
			.table_btom.flex_r_f_s{
				justify-content: space-between;
			}
			.edite{
				span{
					font-size: 16px;
					color: #FF523D;
					margin-right: 5px;
					cursor: pointer;
					position:relative;
				}
			}
			.table_btom{
				margin-top: 10px;
				padding-left: 14px;
				
				.el-button{
					width: 56px;
					height: 24px;
					padding: 0;
					line-height: 24px;
					color: #fff;
					background: #ff523d;
					font-size: 16px;
				}
				
				
			}
			.table_img{
				width: 74px;
				height: 74px;
			}
			.el-table thead th{
				background: #ff8677;
				padding: 0;
				color: #fff;
			}
			.el-table .ascending .sort-caret.ascending{
				border-bottom-color:#333;
			}
			.el-table .descending .sort-caret.descending{
				border-top-color:#333;
			}
		}
	}
</style>
