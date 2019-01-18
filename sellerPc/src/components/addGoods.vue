<template>
	<div class="add_goods_warp">
		<ul class="add_goods_list">
			<li>
				<div class="add_goods_title">商品基本信息</div>
			</li>
			<li class="clearfloat">
				<p class="list_l">商品分类<span>*</span></p>
				<div class="list_r">
					<el-cascader class="goodsClass h32" placeholder="请选择商品分类" :options="goodsClassData" v-model="selectedGoodsClass"
					 @change="handleChange" @active-item-change="activeChange" >
					</el-cascader>
				</div>
			</li>
			<li class="clearfloat">
				<p class="list_l">商品品牌<span>*</span></p>
				<div class="list_r">
					<el-select class="h32 goodsBrand" v-model="goodsBrandId" filterable placeholder="请选择">
						<el-option
							v-for="item in goodsBrand"
							:key="item.brandId"
							:label="item.brandName"
							:value="item.brandId">
						</el-option>
					</el-select>
				</div>
			</li>
			<li class="clearfloat" v-if="goodsAttr.goodsAttrData.length>0">
				<p class="list_l">商品属性<span>*</span></p>
				<div class="list_r goods_attr_box">
						
						<el-select class="h32" v-model="goodsAttr.goodsAttrId[index].avId" :placeholder="item[0].avName" :key="index" v-for="(item,index) in goodsAttr.goodsAttrData">
								<el-option
									v-for="(i,j) in item"
									:key="i.avId"
									:label="i.avName"
									:value="i.avId">
								</el-option>
						</el-select>
				</div>
			</li>
			<li class="clearfloat">
				<p class="list_l">商品名称<span>*</span></p>
				<div class="list_r">
					<el-input class="goodsNameInput h32" v-model="goodsNameInput" maxlength="30" placeholder="请输入内容"></el-input>
				</div>
			</li>
			<li class="clearfloat">
				<p class="list_l">商品主图<span>*</span></p>
				<div class="list_r">
					<div class="goods_main_pic">
						<div class="goods_pic">
							<div class="img-box" :key="index" v-for="(item,index) in goodsMainList">
								<img width="100%" :src="item.imgUrl" alt="">
								<i class="el-icon-close pointer" @click="deleteGoodsMain(index)"></i>
							</div>

						</div>
						<el-upload class="avatar-uploader" ref="uploadGoodsMain" action="http://192.168.0.109:8084/updateImg" multiple
						 :on-success="handlePictureCardPreview"  :on-exceed="handleExceed" :limit="5" list-type="picture" name="Img">
							<div class="upload-text"><span>+</span>点击上传商品主图（{{goodsMainList.length}}/5）</div>
						</el-upload>
					</div>
				</div>
			</li>
			<li>
				<div class="add_goods_title">商品规格与库存</div>
			</li>
			<li class="clearfloat">
				<p class="list_l">商品规格</p>
				<div class="list_r specifications">
					<h4>最多添加两个商品规格</h4>
					<div class="specifications-list-warp">
						<div class="specifications-list" :key="index" v-for="(e,index) in specifications">

							<div class="list-top">
								<el-select ref="select" v-model="e.value" :value-key="index+''" placeholder="请选择" @change="function(n){
										return specSelect(n,e)
								}">
									<el-option v-for="item in e.options" :key="item.value" :value="item.value" :label="item.label">
									</el-option>
								</el-select>
								<span class="delete pointer" @click="deleteSpecification($event,index)">删除</span>
							</div>
							<div class="list-bottom">
								<div class="input-guige">
									<el-select
										v-model="e.input"
										@change="function(j){
											return searchChange(j,e)
										}"
										@remove-tag="function(j){
											return removeTag(j,e)
										}"
										multiple
										default-first-option
										placeholder="请选择文章标签">
										<el-option
										  v-for="s in e.sOption"
										  :key="s.value"
										  :label="s.label"
										  :value="s.value">
										</el-option>
									  </el-select>
								 <el-input class="searchOptInput" v-model="e.inputVal" maxlength="10" placeholder="请输入内容"></el-input> 
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
					<div class="stock-nav" style="width: 800px;">
						<el-row :gutter="20">
							<el-col :span="4">
								<el-select v-model="navData[0]" placeholder="请选择">
									<el-option
									v-for="(item,index) in tableNavDataFirst"
									:key="index"
									:label="item.name"
									:value="item.value">
									</el-option>
								</el-select>
							</el-col>
							<el-col :span="4">
								<el-select v-model="navData[1]" placeholder="请选择">
									<el-option
									v-for="(item,index) in tableNavDataLast"
									:key="index"
									:label="item.name"
									:value="item.value">
									</el-option>
								</el-select>
							</el-col>
							<el-col :span="4">
								<el-input maxlength="10" @change="kucunInput(tableDataCs,'kucun','navKuncun')" v-model="navKuncun" placeholder="库存"></el-input>
							</el-col>
							<el-col :span="4">
								<el-input maxlength="10" @change="kucunInput(tableDataCs,'cost','navChengben')" v-model="navChengben" placeholder="成本价"></el-input>
							</el-col>
							<el-col :span="4">
								<el-input maxlength="10" @change="kucunInput(tableDataCs,'sellPrice','navXiaoshou')" v-model="navXiaoshou" placeholder="销售价"></el-input>
							</el-col>
							<el-col :span="4">
								<el-input maxlength="10" @change="kucunInput(tableDataCs,'kg','navKg')" v-model="navKg" placeholder="重量(kg)"></el-input>
							</el-col>
							
						</el-row>
					</div>
					<div class="stock-table" v-show="true">
						<el-table :data="tableDataCs" :span-method="objectSpanMethod" :row-class-name="tableRowClassName"
						 border style="width: 100%" cell-mouse-enter="tableHover">
						    <el-table-column
								v-if="specifications[0]"
							    prop="specOne"
								:label="specifications[0].tableName"
							    width="100">
								
						    </el-table-column>
							<el-table-column
								v-if="specifications[1]"
								prop="specTwo"
								:label="specifications[1].tableName"
								width="100">
							</el-table-column>
							<el-table-column
								prop="kucun"
								label="库存*"
								width="100">
								<template slot-scope="scope">
									<div>{{scope.row.kucun}}</div>
									<input maxlength="10" v-on:keyup="inputChange(scope.row)" type="text"  v-model="scope.row.kucun" />
								</template>
							</el-table-column>
							<el-table-column
								prop="xiaoshoujia"
								label="销售价"
								width="100">
								<template slot-scope="scope">
									<input maxlength="10" type="text" v-model="scope.row.sellPrice" />
									
								</template>
							</el-table-column>
							<el-table-column
								prop="chengbenjia"
								label="成本价"
								width="100">
								<template  slot-scope="scope">
									<input maxlength="10" type="text"   v-model="scope.row.cost" />
								</template>
							</el-table-column>
							<el-table-column
								prop="kg"
								label="重量"
								width="100">
								<template  slot-scope="scope">
									<input maxlength="10" type="text"  v-model="scope.row.kg" />
								</template>
							</el-table-column>
							<el-table-column
								prop="sku"
								label="sku编码"
								width="100">
								<template slot-scope="scope">
									<input maxlength="10" type="text"  v-model="scope.row.sku" />
								</template>
							</el-table-column>
							<el-table-column
								prop="yulan"
								label="预览图"
								width="100">
								<template slot-scope="scope">
									<div class="yulan_img" v-if="scope.row.yulan">
										<img  v-if="scope.row.yulan" :src="scope.row.yulan" class="avatar">
										<i class="el-icon-close pointer" @click="tableImgRemove(scope.row)"></i>
									</div>
									<el-upload
									  v-show="!scope.row.yulan"
									  :limit="1"
									  action="http://192.168.0.109:8084/updateImg"
									  ref="tablePic"
									  class="avatar-uploader"
									  name="Img"
									  list-type="picture"
									  :file-list="scope.row.flieList"
									  :show-file-list="false"
									  :on-exceed="handleTableExceed"
									  :on-success="function(res,file,fileList){return handleTablePic(res,file,fileList,scope.row)}">
									  <i class="el-icon-plus avatar-uploader-icon"></i>
									</el-upload>
								</template>
							</el-table-column>
						</el-table>
					</div>
				
					<div class="stock-table" v-show="false">
						<el-table :data="noSpecifications" :span-method="objectSpanMethod" :row-class-name="tableRowClassName" border style="width: 100%" cell-mouse-enter="tableHover">
							
							<el-table-column
								prop="kucun"
								label="库存*"
								width="160">
								<template slot-scope="scope">
									<input maxlength="10" type="text" @change="inputEvent(scope.row)"  v-model="scope.row.kucun" />
								</template>
							</el-table-column>
							<el-table-column
								prop="xiaoshoujia"
								label="销售价"
								width="160">
								<template slot-scope="scope">
									<input maxlength="10" type="text" @change="xiaoshouReg(scope.row)" v-model="scope.row.xiaoshoujia" />
								</template>
							</el-table-column>
							<el-table-column
								prop="chengbenjia"
								label="成本价"
								width="160">
								<template  slot-scope="scope">
									<input maxlength="10" type="text" @change="chengbenReg(scope.row)"  v-model="scope.row.chengbenjia" />
								</template>
							</el-table-column>
							<el-table-column
								prop="kg"
								label="重量"
								width="160">
								<template  slot-scope="scope">
									<input maxlength="10" type="text" @change="chengbenReg(scope.row)"  v-model="scope.row.kg" />
								</template>
							</el-table-column>
							<el-table-column
								prop="sku"
								label="sku编码"
								width="160">
								<template slot-scope="scope">
									<input @change="validateReg(scope.row)" maxlength="10" type="text"  v-model="scope.row.sku" />
								</template>
							</el-table-column>
							
						</el-table>
						
					</div>
				</div>
			</li>
			<li class="clearfloat">
				<p class="list_l">商品描述<span>*</span></p>
				<div class="list_r editer">
					<el-input
						class="textarea"
						type="textarea"
						resize="none"
						placeholder="请输入内容"
						v-model="editData">
					</el-input>
					<div class="shop_describe_img">
						<el-row :gutter="20">
						  <el-col :span="6" v-for="(item,index) in describeImg" :key="index">
							  <div class="describe_img_box">
							  	<img :src="item.imgUrl" alt="">
							  	<i class="el-icon-close" @click="describeImgRemove(index)"></i>
							  </div>
						  </el-col>		
						  <el-col :span="6">
							  <div class="upload-describe">
							  	<el-upload class="describe-uploader" ref="uploadDescribe" action="http://192.168.0.109:8084/updateImg" multiple
							  	:on-success="handleDescribe" :limit="9" list-type="picture" :on-exceed="handleDescribeExceed" name="Img">
							  	<i class="el-icon-plus"></i>
							  	</el-upload>
							  </div>
						  </el-col>
						
						</el-row>
						
					</div>
				</div>
			</li>
			<li class="clearfloat">
				<p class="list_l">店铺中分类</p>
				<div class="list_r store_class">
					<el-select class="h32" v-model="storeClass.value" placeholder="请选择商品在店铺中的分类">
						<el-option
						  v-for="item in storeClass.storeClassData"
						  :key="item"
						  :label="item"
						  :value="item">
						</el-option>
					  </el-select>
				</div>
			</li>
		
			<li>
				<div class="add_goods_title chengnuo">服务与承诺</div>
			</li>
			<li class="clearfloat">
				<p class="list_l">商品类型<span>*</span></p>
				<div class="list_r goodsType">
					<el-radio v-model="goodsType" label="普通商品">普通商品</el-radio>
					<el-radio v-model="goodsType" label="效期商品">效期商品</el-radio>
					<el-radio v-model="goodsType" label="服务类商品">服务类商品</el-radio>
				</div>
			</li>
			<li class="clearfloat">
				<p class="list_l">退换货服务</p>
				<div class="list_r return_goods">
					<el-select class="h32" v-model="returnGoods.value" placeholder="请选择">
						<el-option
						  v-for="item in returnGoods.returnGoodsData"
						  :key="item"
						  :label="item"
						  :value="item">
						</el-option>
					</el-select>
					<span class="tx">若存在质量问题或与描述不同，本店将主动提供退换货服务并承担来回邮费</span>
				</div>
			</li>
			<li class="clearfloat">
				<p class="list_l">配送方式</p>
				<div class="list_r delivery_mode">
					<div class="delivery_mode_box">
						<el-checkbox v-model="deliveryMode.mianfei">支持免费送货上门</el-checkbox>
						<span class="tx">（客户单次购买达到一定金额即免费送货上门，详见商家设置>配送方式设置）</span>
					</div>
					<div class="delivery_mode_box">
						<el-checkbox v-model="deliveryMode.ziti">支持客户上门自提</el-checkbox>
						<span class="tx">（客户可以在营业时间范围内上门自提，详见商家设置>营业时间设置）</span>
					</div>
					<div class="delivery_mode_box">
						<el-checkbox v-model="deliveryMode.tongcheng">支持同城快递发货</el-checkbox>
						<span class="tx">（请正确设置好物流费用，详见商家设置>配送方式设置）</span>
					</div>
					<div class="delivery_mode_box">
						<el-checkbox v-model="deliveryMode.disanfang">可选第三方配送</el-checkbox>
						<span class="tx">（如蜂鸟配送、闪送等，详见商家设置.配送方式设置）</span>
					</div>
				</div>
			</li>
			<li class="clearfloat">
				<p class="list_l">物流费用</p>
				<div class="list_r logistics flex_r_f_s">
					<div class="logistics_box flex_r_s_b">
						<el-input class="h32" @change="weightReg" v-model="logistics.value" placeholder="请输入物流费用"></el-input>
						<span>元</span>
					</div>
					<el-checkbox v-model="logistics.baoyou">包邮</el-checkbox>
					<span class="tx">（客户下单时选择同城快递是需支付的费用，如果商家包邮金额显示0元）</span>
				</div>
			</li>
			<li class="clearfloat">
				<p class="list_l">发货时间承诺<span>*</span></p>
				<div class="list_r send_goods_time">
					<div>
						<el-radio v-model="sendTime" label="30分钟">30分钟内</el-radio>
						<el-radio v-model="sendTime" label="1小时">1小时内</el-radio>
						<el-radio v-model="sendTime" label="6小时">6小时内</el-radio>
						<el-radio v-model="sendTime" label="12小时">12小时内</el-radio>
						<el-radio v-model="sendTime" label="24小时">24小时内</el-radio>
					</div>
					<span class="tx">（支持送货上门的商品，推荐可以选择更短的发货时间以获得更优的购物体验，也可以获得更多排序优先权）</span>
				</div>
			</li>
			<li>
				<div class="certified_ensure">
					<el-radio v-model="certified" label="正品保证">正品保证，假一赔十，全网商品</el-radio>
					<span class="tx">（必须支持假一赔十服务）</span>
				</div>
			</li>
			<li>
				{{tableDataCs}}
			</li>
		</ul>
		<div class="save_box">
			<el-button round class="save_btn">保存至草稿</el-button>
			<el-button round class="fabu_btn">发布上架</el-button>
		</div>
	</div>

</template>

<script>
	
	export default {
		data() {
			return {
				selectedGoodsClass: [],//商家分类数据
				goodsClassData: [],
				goodsNameInput: '',//商店名字数据
				dialogImageUrl: '',//商品主图地址数据
				goodsMainList: [],//商品主图数据
				specifications: [],//商品规格数据
				specOption:[],
				noSpecifications:[{kucun:'',xiaoshoujia:'',chengben:'',kg:'',sku:''}],//无商品规格数据
				navData:['全部','全部'],
				navKuncun:null,
				navChengben:null,
				navXiaoshou:null,
				navSku:null,
				navKg:null,
				editData:'',//商品编辑数据
				describeImg:[],//商品描述图片
				storeClass:{ //店铺分类选择
					storeClassData:['店铺1','店铺2','店铺3'],
					value:''
				},
				goodsType:'普通商品',//商品类型
				returnGoods:{//商品退回数据
					returnGoodsData:['换货1','换货2','换货3'],
					value:''
				},
				deliveryMode:{ //配送方式数据
					mianfei:true,
					ziti:false,
					tongcheng:true,
					disanfang:true
				},
				logistics:{//物流数据
					baoyou:true,
					value:''
				},
				sendTime:'30分钟',//发送时间数据
				certified:'正品保证',//正品保证数据
				goodsBrand:[],//商品品牌
				goodsBrandId:'',//商品品牌Id
				goodsAttr:{	//商品属性
					goodsAttrData:[],
					goodsAttrId:[]//储存当前属性数据
				},
				value:''
			};
		},
		computed: {
			tableDataCs(){
				let arr=[];
				if(this.specifications.length==2){
					if(this.specifications[0].guigeName.length>0&&this.specifications[1].guigeName.length>0){
						this.specifications[0].guigeName.forEach((e)=>{
							if(this.specifications[1].guigeName){
								this.specifications[1].guigeName.forEach((j)=>{
									arr.push({id:e.parentId,idOne:e.subId,idTwo:j.subId,specOne:e.name,specTwo:j.name,kucun:'',sellPrice:'',cost:'',kg:'',sku:'',yulan:'',yulanId:'',flieList:[]})
								})
							}
						})
					
					}else if(this.specifications[0].guigeName.length==0&&this.specifications[1].guigeName.length>0){
						
						this.specifications[1].guigeName.forEach((e)=>{
							arr.push({id:e.parentId,idOne:e.subId,specOne:e.name,kucun:'',sellPrice:'',cost:'',kg:'',sku:'',yulan:'',yulanId:'',flieList:[]})
						})
						
					
						
					}else{
						this.specifications[0].guigeName.forEach((e)=>{
							arr.push({id:e.parentId,idOne:e.subId,specOne:e.name,kucun:'',sellPrice:'',cost:'',kg:'',sku:'',yulan:'',yulanId:'',flieList:[]})
						})
						
					}
					
				}else{
					if(this.specifications.length==1&&this.specifications[0].guigeName){
						this.specifications[0].guigeName.forEach((e)=>{
							arr.push({id:e.parentId,idOne:e.subId,specOne:e.name,kucun:'',sellPrice:'',cost:'',kg:'',sku:'',yulan:'',yulanId:'',flieList:[]})
						})
					}
					
				}
				return arr;
			},
			tableNavDataFirst(){
				let navOneArr = [{name:'全部',value:'全部'}]
				if(this.specifications[0]&&this.specifications[0].guigeName.length>0){
					this.specifications[0].guigeName.forEach((e)=>{
						navOneArr.push({value:e.subId,name:e.name})
					})
					
					return navOneArr
				}else{
					return navOneArr
				}
			},
			tableNavDataLast(){
				let navTwoArr = [{name:'全部',value:'全部'}]
				if(this.specifications[1]&&this.specifications[1].guigeName.length>0){
					this.specifications[1].guigeName.forEach((e)=>{
						navTwoArr.push({value:e.subId,name:e.name})
					})
					return navTwoArr
				}else{
					return navTwoArr
				}
			},
			bNum(){//计算表格合并所用数据
				let num;
				if(this.specifications[1]){
					if(this.specifications[1].guigeName.length>1){
						num = this.specifications[1].guigeName.length;
						return num;
					}else{
						num = 0;
						return num;
					}
				}else{
					num = 0;
					return num;
				}
			},
			goodsAttrId(){
				let arr =[];
				this.goodsAttr.goodsAttrData.forEach((e)=>{
					e.forEach((j)=>{
						if(j.status == 1){
							arr.push(j)
						}
					})
				})
				return arr;
			}

			
		},
		mounted:function(){
			this.getGoodsSpecName();	
			this.getGoodsClass();
		},
		methods: {
			inputChange(value){
				// console.log(this.tableDataCs)
				let reg = /^\d+\.?\d{0,2}$/
				
				if(!reg.test(value['kucun'])){
					value['kucun'] = ''
				}
				
			
			},
			searchChange(j,e){
				  e.guigeName=[];
					
					j.forEach((s)=>{
						e.sOption.forEach((i)=>{
							if(s==i.value){
								e.guigeName.push({subId:s,name:i.label,parentId:e.value})
							}
						})
					})
 			
					// console.log(e.input)
			},
			removeTag(j,e){
				let self = this;
				let isHttp = true;
				e.sOption.forEach((s)=>{
					if(j==s.value&&s.status==1){
						isHttp = false;
					}
				})
				if(isHttp){
					this.axios.post('/webShop/deleteAttrValue', this.qs.stringify({
							attrNameId:e.value,
							avIds:j
					}), {
						headers: {
							'Content-Type': 'application/x-www-form-urlencoded'
						}
					}).then(function(res){
						if(res.data.code==1){
							e.input.forEach((s,i,arr)=>{
								if(j == s){
									arr.splice(i,1)
								}
							});
							e.sOption.forEach((s,i,arr)=>{
								if(j == s.value){
									arr.splice(i,1)
								}
							})
							console.log('删除自定义')
						}else{
							self.$message.error(res.data.msg);
						}
					})
				}else{
					e.input.forEach((s,i,arr)=>{
						if(j == s){
							arr.splice(i,1)
						}
					});
					console.log('删除默认')
				}
				
				
				
				
			},
			getGoodsSpecName(){ //获取规格名字
				let self = this;
				this.axios.post('/webShop/selectAttrNameAll',{
				 	headers: { //经营品类
				 		'Content-Type': 'application/x-www-form-urlencoded',
				 	}
				 }).then(function(res){
					if(res.data.code == 1){
						res.data.data.forEach((e)=>{
							self.specOption.push({value:e.id,label:e.attrName});
						})
					}else{
						self.$message.error(res.data.msg);
					}
				 }).catch(function(res){
					 self.$message.error(res);
				 })
			},
			getGoodsClass(){//初始化商品分类
				
				let self = this;
				this.axios.post('/selectGroupAll',{
					headers: { //经营品类
						'Content-Type': 'application/x-www-form-urlencoded',
					}
				}).then(function(res){
					if(res.data.code == 1){
						res.data.data.forEach(function(e){
							let obj = {label:'',value:'',children:[]};
							obj.label = e.name;
							obj.value = e.id;
							self.axios.post('/selectGSortOne',self.qs.stringify({gIds:obj.value}),{
								headers: { //经营品类
									'Content-Type': 'application/x-www-form-urlencoded',
								}
							}).then(function(subres){
								
								if(subres.data.code == 1){
									
									
									subres.data.data[0].forEach(function(s){//二级分类回调
									
										let childrenObj = {lable:'',value:'',children:[]};
										childrenObj.label = s.sortName;
										childrenObj.value = s.sortId;
										self.axios.post('/selectSortTwo',self.qs.stringify({sortIds:childrenObj.value}),{
											headers: { //经营品类
												'Content-Type': 'application/x-www-form-urlencoded',
											}
										}).then(function(gs){
											
											if(gs.data.code == 1){ //三级分类回调
												gs.data.data[0].forEach(function(g){
													
													childrenObj.children.push({label:g.sortName,value:g.sortId});
													
												})
												
												
											}
										})
										obj.children.push(childrenObj)
									})
								}
							})
							self.goodsClassData.push(obj)
							
						})
					}else{
						this.$message({
							showClose: true,
							message:res.data.msg,
							type: 'error',
						});
					}
				})
			},			
			handleChange(value) { //商品分类回调并
				let self = this;
				console.log(value)
				self.axios.post('/webShop/selectSortBrandAll',self.qs.stringify({//初始化商品品牌数据
					sortId:value[1],
				}), {
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					}
				}).then(function(res){
					if(res.data.code == 1){
						if(res.data.data.length>1){
							self.goodsBrand = res.data.data;
						}else{
							self.goodsBrand = [];
							self.goodsBrandId = '';
						}
					}else{
						self.$message.error(res.data.msg);
					}
				});
				
				self.axios.post('/selectSortAttrNameValues',self.qs.stringify({//初始化商品属性
					sortId:value[2],
				}), {
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					}
				}).then(function(res){
					if(res.data.code == 1){
							res.data.data.forEach((e)=>{
								self.goodsAttr.goodsAttrId.push({anId:e[0].anId,anName:e[0].anName,avId:''});
							})
							self.goodsAttr.goodsAttrData = res.data.data;
						
					}else{
						self.$message.error(res.data.msg);
					}
				});
				
			},
			activeChange(val){
				// console.log(val)
			},
			//商品主图上传回调
			handlePictureCardPreview(response, file, fileList) {
				console.log(this.goodsAttr.goodsAttrId)
				this.goodsMainList.push({
					imgId:file.response.data.imgId,
					imgUrl:file.response.data.imgAddr
				});
				
			},
			handleExceed(files, fileList) {
				this.$message.warning(`当前限制选择 3 个文件`);
			},
			deleteGoodsMain(index) { //商品主图删除
				
				let self = this;
				this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning',
						callback:function(action, instance){
							
							if(action == 'confirm'){
								self.axios.post('/deleteImg', self.qs.stringify({
									imgAddr: self.goodsMainList[index].imgUrl,
								}), {
									headers: {
										'Content-Type': 'application/x-www-form-urlencoded'
									}
								}).then(function(res){
									if(res.data.code == 1){
										self.goodsMainList.splice(index, 1);
										self.$refs.uploadGoodsMain.uploadFiles.splice(index, 1)
									}else{
										self.$message({
											showClose: true,
											message:res.data.msg,
											type: 'error',
										});
									}
								
								}).catch(function(res){
										self.$message({
											showClose: true,
											message:'服务器错误',
											type: 'error',
										});
								})
								
							}
						}
				})
			},
			handleDescribe(response, file, fileList){ //商品描述图片上传
				
				this.describeImg.push({
					imgId:file.response.data.imgId,
					imgUrl:file.response.data.imgAddr
				})
				
			},
			handleDescribeExceed(files, fileList){
				this.$message.warning(`当前限制选择 9 个文件`);
			},
			tableImgRemove(scope){//table图片删除
					
					let self = this;
					this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
							confirmButtonText: '确定',
							cancelButtonText: '取消',
							type: 'warning',
							callback:function(action,instance){
								
								if(action == 'confirm'){
									
									self.axios.post('/deleteImg', self.qs.stringify({
										imgAddr: scope.yulan
									}), {
										headers: {
											'Content-Type': 'application/x-www-form-urlencoded'
										}
									}).then(function(res){
										if(res.data.code == 1){
											scope.yulan = '';
											scope.flieList.splice(0,1)
											
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
					})
			},
			describeImgRemove(index){ //描述图片删除
				let self = this;
				this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning',
						callback:function(action,instance){
							
							if(action == 'confirm'){
								
								self.axios.post('/deleteImg', self.qs.stringify({
									imgAddr: self.describeImg[index].imgUrl
								}), {
									headers: {
										'Content-Type': 'application/x-www-form-urlencoded'
									}
								}).then(function(res){
									if(res.data.code == 1){
										self.describeImg[index].imgUrl = '';
										self.describeImg[index].imgId = '';
										self.describeImg.splice(index,1);
										self.$refs.uploadDescribe.uploadFiles.splice(index,1);
										
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
				})
			},
			//商品规格
			addSpecification() {//添加规格
				let self = this;
				if (this.specifications.length<2) {
					if(this.specifications[0]&&this.specifications[0].value==''){
						this.$message({
							message: '请选择规格',
							type: 'warning'
						});
					}else{
						let obj = {
							options:self.specOption,
							value: '',
							inputVal:'',
							input: [],//添加的规格属性
							guigeName: [],
							sOption:[],
							tableName:'',
							clearAll:0
						}
						
						this.specifications.push(obj);
					}
					
				}else if(this.specifications.length==2){
					this.$message({
						message: '只能添加两个规格',
						type: 'warning'
					});
				}
				
				
			},
			deleteSpecification(event,index) { //删除规格
				this.specifications.splice(index, 1);
				this.navData[0] = '全部';
				this.navData[1] = '全部';
			},
			addGuigeName(e) {
				let self = this;//添加规格名称
				if(e.value==''){
					this.$message({
						message: '请选择规格名称再添加',
						type: 'warning'
					});
				}else{
					
					let isHttp = true;
					e.inputVal = e.inputVal.replace(/\s*/g,"");
					e.sOption.forEach((j)=>{
						if(j.label == e.inputVal){
							isHttp = false;
						}
					})
					if(isHttp){
						this.axios.post('/webShop/addAttrValue', this.qs.stringify({
								anId:e.value,
								avName:e.inputVal,
								
								status:0
						}), {
							headers: {
								'Content-Type': 'application/x-www-form-urlencoded'
							}
						}).then(function(res){
							if(res.data.code == 1){
								e.sOption.push({value:res.data.data.attrValueId,label:res.data.data.attrValueName,status:0});
								e.input.push(res.data.data.attrValueId)
								e.inputVal = '';
								e.guigeName.push({subId:res.data.data.attrValueId,name:res.data.data.attrValueName,parentId:e.value})
								
							}else{
								self.$message({
									showClose: true,
									message:res.data.msg,
									type: 'error',
								});
							}
						})
					}else{
						self.$message({
							showClose: true,
							message:'请选择默认属性或者自定义添加默认不存在的属性',
							type: 'error',
						});
					}
					
				}
				
				
			},
			specSelect(n,e){
				let self = this;
				self.specOption.forEach((m)=>{
					if(m.value == n){
						e.tableName = m.label;
					}
				})
				
				console.log(n)
					if(e.clearAll!=0){
						let arr = [];
						e.sOption.forEach((j)=>{
							if(j.status==0){
								arr.push(j.value)
							}
						})
						this.axios.post('/webShop/selectANV', this.qs.stringify({
							attrNameId:e.n,
							avIds:arr
						}), {
							headers: {
								'Content-Type': 'application/x-www-form-urlencoded'
							}
						}).then(function(res){
							if(res.data.code==1){
									e.input = [];
									e.guigeName = [];
							}else{
								self.$message.error(res.data.msg);
							}
						})
					}		
					e.clearAll = n;		
					this.axios.post('/webShop/selectANV', this.qs.stringify({
						attrNameId:n
					}), {
						headers: {
							'Content-Type': 'application/x-www-form-urlencoded'
						}
					}).then(function(res){
						if(res.data.code == 1){
							e.sOption=[];
							res.data.data.forEach((j)=>{
								e.sOption.push({value:j.attrValueId,label:j.attrValueName,status:j.status})
							})
							
						}
					})
			
		
				
			},
			//table
			tableRowClassName({row, rowIndex}){
				if(rowIndex%2 != 0){
					return 'active-table'
				}
			},
			kucunInput(tbData,attrName,navInput){ //库存输入
				let self = this;
				let re = /^[0-9]+.?[0-9]*/;
				if(!re.test(this.navKuncun)){
					if(this[navInput].length==1)
					{
						this[navInput] = this[navInput].replace(/[^1-9]/g,'')
					}else{
						this[navInput] = this[navInput].replace(/\D/g,'')
					}
				}else if(this.specifications.length>0){
					
					if(this.navData[0] === '全部'&&this.navData[1] !== '全部'){
						
							if(this.specifications[1]){
								if(this.specifications[1].guigeName.length>0){
									this.tableDataCs.forEach((e)=>{
											if(e.idTwo==this.navData[1]){
												e[attrName] = Math.floor(this[navInput] * 100) / 100;
											}
											
									})
								}
							}
					}else if(this.navData[0] === '全部'&&this.navData[1] === '全部'){
						
						if(this.specifications){
							
							this.tableDataCs.forEach((e)=>{
									e[attrName] = Math.floor(this[navInput] * 100) / 100;
							})
							
						}
							
					}else if(this.navData[0]!== '全部'&&this.navData[1] === '全部'){
							
							this.tableDataCs.forEach((e)=>{
									if(e.idOne==this.navData[0]){
										e[attrName] = Math.floor(this[navInput] * 100) / 100;
									}
									
							})
					}else{
						this.tableDataCs.forEach((e)=>{
								if(e.idOne==this.navData[0]&&e.idTwo==this.navData[1]){
									e[attrName] = Math.floor(this[navInput] * 100) / 100;
								}
						})
					}
				}
			
			},
			handleTablePic(res,file,fileList,e){ //表格图片上传
				
				e.yulan = file.response.data.imgAddr
				e.yulanId = file.response.data.imgId
				// e.yulan = file.url
			},
		
			removeTablePic(res,file,fileList){
				
			},
			handleTableExceed(files, fileList){
				this.$message.warning(`当前限制选择1个文件`);
			},
			objectSpanMethod({ row, column, rowIndex, columnIndex }) {//表格合并
				
				if (columnIndex === 0) {
					if(this.bNum == 1){
						return {
							rowspan: 0,
							colspan: 0
						};
						
					}else if(this.bNum > 1){
						if (rowIndex % this.bNum === 0) {
							return {
								rowspan: this.bNum,
								colspan: 1
							};
						}else{
							return {
								rowspan: 0,
								colspan: 0
							};
						}
					}
				}
		
				
				
			},
			inputEvent(e){
				//库存判断
				var re = /^\d+\.?\d{0,2}$/;
				if(!re.test(e.kucun)){
					e.kucun = '';
					alert(1)
				}else{
					e.kucun = Math.floor(e.kucun * 100) / 100;
				}
				
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
				
			},
			validateReg(e){//校验关联交易号
                var reg = /^[A-Za-z0-9\\-_]*$/;
                if(!reg.test(e.sku)){
                    e.sku = ''
				}
			},
			weightReg(){
				var re = /^[0-9]+.?[0-9]*/;
				if(!re.test(this.weight)){
					if(this.weight.length==1)
					{
						this.weight = this.weight.replace(/[^1-9]/g,'')
					}else{
						this.weight = this.weight.replace(/\D/g,'')
					}
				}
			}
		}
	}
</script>

<style lang="scss">
	.add_goods_warp {
		padding: 40px;
		padding-right: 10px;
		.save_box{
			margin-top:68px;
			.el-button{
				height: 36px;
				padding: 0;
				line-height: 36px;
				width: 300px;
				color: #fff;
				font-size: 16px;
			}
			.save_btn{
				background:#434343;
				margin-right: 100px;
			}
			.fabu_btn{
				background: #FF523D;
			}
		}
		.add_goods_list {
			li {
				margin-bottom: 30px;
				.certified_ensure{
					.tx{
						font-size: 14px;
						color: #666;
						margin-left: 45px;
					}
					.el-radio__input.is-checked + .el-radio__label{
						color: #333333;
						font-size: 18px;
					}
				}
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
				.goods_attr_box{
					.el-select{
						margin-right: 10px;
						width: 150px;
					}
				}
				.list_r {
					float: left;
					margin-left: 24px;

					.h32{
						.el-input,.el-input__inner{
							height: 32px;
							line-height: 32px;
						}
						
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
					.goodsBrand{
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

									.add{
										font-size: 14px;
										color:#FF523D;
										margin-left: 5px;
									}
									.searchOptInput{
										margin-top: 10px;
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
					.stock-nav{
						margin-bottom: 10px;
						
						
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
							input{
								background: #f7f7f7;
							}
						}
						.avatar-uploader .el-upload {
							border: 1px dashed #d9d9d9;
							border-radius: 6px;
							cursor: pointer;
							position: relative;
							overflow: hidden;
							height: 60px;
							width: 60px;
							display: block;
							margin: 0 auto;
						  }
						  .avatar-uploader .el-upload:hover {
							border-color: #409EFF;
						  }
						  .avatar-uploader-icon {
							font-size: 28px;
							color: #8c939d;
							width: 60px;
							height: 60px;
							line-height: 60px;
							text-align: center;
						  }
						 
						  .yulan_img{
							  height: 60px;
							  width: 60px;
							  position: relative;
							  margin: 0 auto;
							 .avatar {
								width: 60px;
								height: 60px;
								display: block;
								
							}
							.el-icon-close{
								position: absolute;
								top: 0;
								right:0;
								background: rgba(0, 0, 0, 0.5);
								color: #fff;
								border-radius: 50%;
								z-index: 10000;
							 }
						  }
					}
				}
				.editer{
					width: 800px;
					.el-textarea__inner{
						height: 200px;
					}
					.shop_describe_img{
						.el-col{
							margin-top: 20px;
						}
						.describe_img_box{
							
							height: 200px;
							margin: 0 auto;
							position: relative;
							img{
								width: 100%;
								height: 200px;
							}
							.el-icon-close{
								position: absolute;
								top:-5px;
								right:-5px;
								background: rgba(0, 0, 0, 0.5);
								color: #fff;
								border-radius: 50%;
								
								cursor: pointer;
							}
						}
						.upload-describe{
							
							.describe-uploader{
								height: 200px;
								width: 185px;
								border: 1px dashed #d9d9d9;
								border-radius: 6px;
								cursor: pointer;
								position: relative;
								overflow: hidden;
								.el-icon-plus{
									height: 200px;
									width: 185px;
									line-height:200px;
									font-size: 60px;
									color: gray;
									
								}
							}
							
						}
					}
					
				}
				.store_class{
					.el-input--suffix{
						width: 300px;
						font-size: 16px;
					}
				}
				.weight{
					.weight_box{
						width: 300px;
						padding-right: 5px;
						box-sizing: border-box;
						border: 1px solid #dcdfe6;
						border-radius: 4px;
						.el-input__inner{
							border: none;
							font-size: 16px;
						}
					}
				}
				.weight_p{
					span{
						font-size: 14px;
						color: #666;
						display: block;
						
					}
					
				}
				.chengnuo{
					margin-top: 50px;
				}
				
				.el-radio{
					line-height: 32px;
				}
				.el-radio__input.is-checked+.el-radio__label{
					color:#ff523d;
				}
				.el-radio__input.is-checked .el-radio__inner{
					border-color: #ff523d;
					background: #ff523d;
				}
				.el-radio__inner:hover{
					border-color: #ff523d;
				}
				.return_goods{
					.tx{
						font-size: 14px;
						color: #666;
					}
					.el-input--suffix{
						width: 300px;
					}
				}
				.delivery_mode{
					.delivery_mode_box{
						height: 32px;
						line-height: 32px;
						.tx{
							font-size: 14px;
							color: #666;
							margin-left: 30px;
						}
						
					}
				}
				.el-checkbox__input.is-checked+.el-checkbox__label{
					color:#ff523d;
				}
				.el-checkbox__input.is-checked .el-checkbox__inner{
					border-color: #ff523d;
					background: #ff523d;
				}
				.el-checkbox__input.is-focus .el-checkbox__inner{
					border-color: #ff523d;
				}
				.el-checkbox__inner:hover{
					border-color: #ff523d;
				}
				.logistics{
					width: 900px;
					.logistics_box{
						width:300px;
						
						border: 1px solid #dcdfe6;
						border-radius: 4px;
						box-sizing: border-box;
						padding-right: 5px;
						.el-input__inner{
							border: none;
							font-size: 16px;
						}
					}
					.tx{
						font-size: 14px;
						color: #666;
						margin-left: 30px;
					}
					.el-checkbox{
						margin-left: 8px;
					}
				}
				.send_goods_time{
					.tx{
						font-size: 14px;
						color: #666;
					}
				}
			}
		}
	}
</style>
