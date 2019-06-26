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
			<li class="clearfloat" v-if="goodsBrand.length>0">
				<p class="list_l">商品品牌<span>*</span></p>
				<div class="list_r">
					<el-select class="h32 goodsBrand"  v-model="goodsBrandId" filterable placeholder="请选择">
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
				<p class="list_l">商品属性</p>
				<div class="list_r goods_attr_box">
						
						<el-select class="h32" v-model="goodsAttr.goodsAttrId[index].avId" :placeholder="item[0].anName" :key="index" v-for="(item,index) in goodsAttr.goodsAttrData">
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
					<el-input class="goodsNameInput h32" v-model="goodsNameInput" maxlength="60" placeholder="请输入商品名称"></el-input>
				</div>
			</li>
			<li class="clearfloat">
				<p class="list_l">商品主图<span>*</span></p>
				<div class="list_r">
					<div class="goods_main_pic">
						<div class="goods_pic" v-if="goodsMainList.length>0">
							
							<draggable v-model="goodsMainList" :options = "{animation:500}">
								<transition-group>
										
										<div class="img-box" :key="item.imgId" v-for="(item,index) in goodsMainList">
											<img width="100%" :src="item.imgUrl" alt="">
											<i class="el-icon-close pointer" @click="deleteGoodsMain(index)"></i>
										</div>
										
								</transition-group>
							</draggable>
							<div style="font-size: 12px; color: #ccc;margin-bottom: 10px;">提示:拖动可改变图片顺序</div>
						</div>
						<el-upload class="avatar-uploader" ref="uploadGoodsMain" action="http://192.168.0.109:8084/updateImg" multiple
						 :on-success="handlePictureCardPreview"  :on-exceed="handleExceed" :limit="5" list-type="picture" name="Img" :before-upload="sizeReg">
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
								<el-select ref="select" v-model="e.value" :value-key="index+''" placeholder="请选择规格名称" @change="function(n){
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
										placeholder="请选择规格属性(可多选)">
										<el-option
										  v-for="s in e.sOption"
										  :key="s.value"
										  :label="s.label"
										  :value="s.value">
										</el-option>
									  </el-select>
								 <el-input class="searchOptInput" v-model="e.inputVal" maxlength="10" placeholder="自定义规格属性"></el-input> 
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
								<el-input maxlength="10" @change="kucunInput(guigeList,'kucun','navKuncun')" v-model="navKuncun" placeholder="库存"></el-input>
							</el-col>
							<el-col :span="4">
								<el-input maxlength="10" @change="kucunInput(guigeList,'sellPrice','navXiaoshou')" v-model="navXiaoshou" placeholder="销售价"></el-input>
							</el-col>
							<el-col :span="4">
								<el-input maxlength="10" @change="kucunInput(guigeList,'cost','navChengben')" v-model="navChengben" placeholder="成本价"></el-input>
							</el-col>
							
							<el-col :span="4">
								<el-input maxlength="10" @change="kucunInput(guigeList,'kg','navKg')" v-model="navKg" placeholder="重量(kg)"></el-input>
							</el-col>
							
						</el-row>
					</div>
					<div class="stock-table" v-show="specifications.length>0">
						<el-table :data="guigeList" :span-method="objectSpanMethod" :row-class-name="tableRowClassName"
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
								 <template slot="header" slot-scope="scope">
									<div class="tbHead">库存<span>*</span></div>
								  </template>
								<template slot-scope="scope">
								
									<input maxlength="10" v-on:keyup="inputChange(scope.row,'kucun')" type="text"  v-model="scope.row.kucun" />
								</template>
							</el-table-column>
							<el-table-column
								prop="sellPrice"
								label="销售价"
								width="100">
								<template slot="header" slot-scope="scope">
									<div class="tbHead">销售价<span>*</span></div>
								 </template>
								<template slot-scope="scope">
									<input maxlength="10" v-on:keyup="inputChange(scope.row,'sellPrice')" type="text" v-model="scope.row.sellPrice" />
									
								</template>
							</el-table-column>
							<el-table-column
								prop="cost"
								label="成本价"
								width="100">
								<template slot="header" slot-scope="scope">
									<div class="tbHead">成本价<span>*</span></div>
								 </template>
								<template  slot-scope="scope">
									<input maxlength="10" v-on:keyup="inputChange(scope.row,'cost')" type="text"   v-model="scope.row.cost" />
								</template>
							</el-table-column>
							<el-table-column
								prop="kg"
								label="重量"
								width="100">
								<template slot="header" slot-scope="scope">
									<div class="tbHead">重量<span>*</span></div>
								 </template>
								<template  slot-scope="scope">
									<input maxlength="10" v-on:keyup="inputChange(scope.row,'kg')" type="text"  v-model="scope.row.kg" />
								</template>
							</el-table-column>
							<el-table-column
								prop="sku"
								label="sku编码"
								width="100">
								<template slot-scope="scope">
									<input maxlength="10" v-on:keyup="validateReg(scope.row)" type="text"  v-model="scope.row.sku" />
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
				
					<div class="stock-table" v-show="specifications.length==0">
						<el-table :data="noSpecifications" :span-method="objectSpanMethod" :row-class-name="tableRowClassName" border style="width: 100%" cell-mouse-enter="tableHover">
							
							<el-table-column
								prop="kucun"
								label="库存*"
								width="133.3">
								<template slot="header" slot-scope="scope">
									<div class="tbHead">库存<span>*</span></div>
								 </template>
								<template slot-scope="scope">
									<input maxlength="10" type="text" v-on:keyup="inputChange(scope.row,'kucun')" v-model="scope.row.kucun" />
								</template>
							</el-table-column>
							<el-table-column
								prop="sellPrice"
								label="销售价"
								width="133.3">
								<template slot="header" slot-scope="scope">
									<div class="tbHead">销售价<span>*</span></div>
								 </template>
								<template slot-scope="scope">
									<input maxlength="10" type="text" v-on:keyup="inputChange(scope.row,'sellPrice')" v-model="scope.row.sellPrice" />
								</template>
							</el-table-column>
							<el-table-column
								prop="cost"
								label="成本价"
								width="133.3">
								<template slot="header" slot-scope="scope">
									<div class="tbHead">成本价<span>*</span></div>
								 </template>
								<template  slot-scope="scope">
									<input maxlength="10" type="text" v-on:keyup="inputChange(scope.row,'cost')" v-model="scope.row.cost" />
								</template>
							</el-table-column>
							<el-table-column
								prop="kg"
								label="重量"
								width="133.3">
								<template slot="header" slot-scope="scope">
									<div class="tbHead">重量<span>*</span></div>
								 </template>
								<template  slot-scope="scope">
									<input maxlength="10" type="text" v-on:keyup="inputChange(scope.row,'kg')" v-model="scope.row.kg" />
								</template>
							</el-table-column>
							<el-table-column
								prop="sku"
								label="sku编码"
								width="133.3">
								<template slot-scope="scope">
									<input  maxlength="10" v-on:keyup="validateReg(scope.row)" type="text"  v-model="scope.row.sku" />
								</template>
							</el-table-column>
							<el-table-column
								prop="yulan"
								label="预览图"
								width="133.3">
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
				</div>
			</li>
			<li class="clearfloat">
				<p class="list_l" >商品描述<span>*</span></p>
				<div class="list_r editer">
					<el-input
						class="textarea"
						type="textarea"
						resize="none"
						placeholder="请输入内容"
						v-model="editData">
					</el-input>
				 	<div class="shop_describe_img">
					
							<draggable v-model="describeImg"  :options = "{animation:500}">
								<transition-group>
										
										<div class="describe_img_box" v-for="(element,index) in describeImg" :key="element.imgId">
											<img :src="element.imgUrl" :height="element.height" :width="element.width" alt="">
											<i class="el-icon-close" @click="describeImgRemove(index)"></i>
										</div>
								</transition-group>
							</draggable>
							
								<div class="upload-describe">
									<el-upload class="describe-uploader" ref="uploadDescribe" action="http://192.168.0.109:8084/updateImg" multiple
									:on-success="handleDescribe" :limit="20" list-type="picture" :on-exceed="handleDescribeExceed" name="Img" :before-upload="sizeReg">
									<i class="el-icon-plus"></i>
									</el-upload>
								</div>
								<div style="font-size: 12px; color: #ccc;margin-top: 10px ; float: left;width: 100%;">提示:拖动可改变图片顺序</div>
					</div> 
					
					
				</div>
			</li>
			<li class="clearfloat" v-if="false">
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
					<el-radio @change="goodsTypeChange" v-model="goodsType" label="1">普通商品</el-radio>
					<el-radio @change="goodsTypeChange" v-model="goodsType" label="2">效期商品</el-radio>
					<el-radio @change="goodsTypeChange" v-model="goodsType" label="3">服务类商品</el-radio>
				</div>
			</li>
			<li class="clearfloat" v-if="isQuality">
				<p class="list_l">剩余保质期<span>*</span></p>
				<div class="list_r goodsType">
					<el-radio  v-model="quality" label="1">1个月以内</el-radio>
					<el-radio  v-model="quality" label="2">3个月以内</el-radio>
					<el-radio  v-model="quality" label="3">6个月以内</el-radio>
					<el-radio  v-model="quality" label="4">6个月以上</el-radio>
				</div>
			</li>
			<li class="clearfloat">
				<p class="list_l">退换货服务<span>*</span></p>
				<div class="list_r return_goods">
					<el-select class="h32" v-model="returnGoods.value" placeholder="请选择">
						<el-option
						  v-for="item in returnGoods.returnGoodsData"
						  :key="item.value"
						  :label="item.label"
						  :value="item.value">
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
				<p class="list_l">物流费用<span>*</span></p>
				<div class="list_r logistics flex_r_f_s">
					<div class="logistics_box flex_r_s_b">
						<el-input class="h32" :disabled="logistics.baoyou" @change="inputChange(logistics,'value')" v-model="logistics.value" placeholder="请输入物流费用"></el-input>
						<span>元</span>
					</div>
					<el-checkbox @change="postage" v-model="logistics.baoyou">包邮</el-checkbox>
					<span class="tx">（客户下单时选择同城快递是需支付的费用，如果商家包邮金额显示0元）</span>
				</div>
			</li>
			<li class="clearfloat">
				<p class="list_l">发货时间承诺<span>*</span></p>
				<div class="list_r send_goods_time">
					<div>
						<el-radio v-model="sendTime" label="1">30分钟内</el-radio>
						<el-radio v-model="sendTime" label="2">1小时内</el-radio>
						<el-radio v-model="sendTime" label="3">6小时内</el-radio>
						<el-radio v-model="sendTime" label="4">12小时内</el-radio>
						<el-radio v-model="sendTime" label="5">24小时内</el-radio>
					</div>
					<span class="tx">（支持送货上门的商品，推荐可以选择更短的发货时间以获得更优的购物体验，也可以获得更多排序优先权）</span>
				</div>
			</li>
			<li>
				<div class="certified_ensure">
					<el-checkbox v-model="certified" disabled>正品保证，假一赔十，全网商品</el-checkbox>
					<span class="tx">（必须支持假一赔十服务）</span>
				</div>
			</li>
			
		</ul>
		<div class="save_box">
			<el-button round class="save_btn" @click="commit(0)">保存草稿</el-button>
			<el-button round class="fabu_btn" @click="commit(2)">发布上架</el-button>
		</div>
	</div>

</template>

<script>
	import draggable from 'vuedraggable'
	import Api from './common/apj.js'
	export default {
		components: {
			draggable
		},
		data() {
			return {
				selectedGoodsClass: [],//商家分类数据
				goodsClassData: [],
				goodsNameInput: '',//商店名字数据
				dialogImageUrl: '',//商品主图地址数据
				goodsMainList: [],//商品主图数据
				specifications: [],//商品规格数据
				specOption:[],
				noSpecifications:[{kucun:'',sellPrice:'',cost:'',kg:'',sku:'',yulan:'',yulanId:'-1',flieList:[]}],//无商品规格数据
				navData:['全部','全部'],
				navKuncun:null,
				navChengben:null,
				navXiaoshou:null,
				navSku:null,
				navKg:null,
				editData:'',//商品描述数据
				describeImg:[],//商品描述图片
				storeClass:{ //店铺分类选择
					storeClassData:['店铺1','店铺2','店铺3'],
					value:''
				},
				goodsType:'1',//商品类型
				returnGoods:{//商品退回数据
					returnGoodsData:[{value:'1',label:'3天'},{value:'2',label:'七天'},{value:'3',label:'不支持'}],
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
				sendTime:'3',//发送时间数据
				certified:true,//正品保证数据
				goodsBrand:[],//商品品牌
				goodsBrandId:'',//商品品牌Id
				goodsAttr:{	//商品属性
					goodsAttrData:[],
					goodsAttrId:[]//储存当前属性数据
				},
				specStatus:'1',
				quality:'1',//保质期
				isQuality:false,
				guigeList:[],
				productId:'',//商品Id
				imgSize:[]
			};
		},
		computed: {
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
			
		},
		mounted:function(){
			
			this.getGoodsSpecName();	
			this.getGoodsClass();
			
			//获取商品Id
			this.productId = this.$route.query.gId;
			this.getEditGoodsType()
			setTimeout(()=>{
				document.querySelector('.cnt').scrollTop = 0;
				
			},200)
		},
	
		methods: {
			getEditGoodsType(){
				
				let self = this;
				let isPush = true;
				let pId = this.productId;
				
				this.axios.post(Api.shopApi+'/selectShopsProductTips',self.qs.stringify({productId:pId}),{
					headers: { //经营品类
						'Content-Type': 'application/x-www-form-urlencoded',
					}
				}).then(function(res){
					if(res.data.code == 1){
						let re = res.data.data;
						console.log(res)
						//获取已选择商品分类
						if(re.sort){
							self.selectedGoodsClass.push(re.sort.gId);
							self.selectedGoodsClass.push(re.sort.parentId);
							self.selectedGoodsClass.push(re.sort.sortId);
						}
						
						//获取已选取商品名称
						if(re.productName!=''){
							self.goodsNameInput = re.productName;
						}
						if(re.pImgs.length>0){
							re.pImgs.forEach((e)=>{
								self.goodsMainList.push({
									imgId:e.imgId,
									imgUrl:e.imgAddr
								})
							})
						}
						
						//获取商品规格
						re.skus[0].anvs.forEach((e)=>{
							let id = e.anId
							let obj = {
								options:self.specOption,
								value:id,
								inputVal:'',
								input: [],//添加的规格属性
								guigeName: [],
								sOption:[],
								tableName:e.anName,
								clearAll:0,
							}
							
							self.axios.post(Api.shopApi+'/webShop/selectANV', self.qs.stringify({
								attrNameId:id
							}), {
								headers: {
									'Content-Type': 'application/x-www-form-urlencoded'
								}
							}).then(function(res){
								if(res.data.code == 1){
									
									res.data.data.forEach((j)=>{
										obj.sOption.push({value:j.attrValueId,label:j.attrValueName,status:j.status})
									})
								}
							})
							self.specifications.push(obj)
							
						});
						
						if(self.specifications.length>0){
							re.skus.forEach((e)=>{
								e.anvs.forEach((j)=>{
									self.specifications.forEach((s)=>{
										// s.value = j.anId
										if(j.anId == s.value&&s.input.indexOf(j.avId)<0){
											s.input.push(j.avId);
											if(j.avStatus == 0){
												s.sOption.push({value:j.avId,label:j.avName,status:j.avStatus})
											}
										}
										
									})
									
								})
								
								if(self.specifications.length==2){
									self.guigeList.push({
										idS1:e.anvs[0].anId,idS2:e.anvs[1].anId,idOne:e.anvs[0].avId,idTwo:e.anvs[1].avId,
										specOne:e.anvs[0].avName,specTwo:e.anvs[1].avName,kucun:e.skuPNum,sellPrice:e.original,
										cost:e.costPrice,kg:e.productWeight,sku:e.skuCode,yulan:e.skuImgAddr,yulanId:e.skuImgId,flieList:[]
									})
								}else if(self.specifications.length==1){
									self.guigeList.push({
										idS1:e.anvs[0].anId,idOne:e.anvs[0].avId,
										specOne:e.anvs[0].avName,kucun:e.skuPNum,sellPrice:e.original,
										cost:e.costPrice,kg:e.productWeight,sku:e.skuCode,yulan:e.skuImgAddr,yulanId:e.skuImgId,flieList:[]
									})
								}
									
							})
							setTimeout(()=>{
								self.specifications.forEach((e)=>{
								//{subId:res.data.data.attrValueId,name:res.data.data.attrValueName,parentId:e.value}
									e.input.forEach((i)=>{
										let obj = {parentId:e.value,subId:i,name:''}
										e.sOption.forEach((n)=>{
											
											if(n.value == i){
												obj.name = n.label;
											}
										})
										e.guigeName.push(obj);
									})
									
								})
								
							},100)
						}else{
							self.noSpecifications = [];
							self.noSpecifications.push({
								kucun:re.skus[0].skuPNum,sellPrice:re.skus[0].original,cost:re.skus[0].costPrice,kg:re.skus[0].productWeight,
								sku:re.skus[0].skuCode,yulan:re.skus[0].skuImgAddr,yulanId:re.skus[0].skuImgId,flieList:[]
							})
						}
						
						
						//获取商品品牌
						if(re.sort){
							self.axios.post(Api.shopApi+'/webShop/selectSortBrandAll',self.qs.stringify({//初始化商品品牌数据
								sortId:re.sort.parentId,
							}), {
								headers: {
									'Content-Type': 'application/x-www-form-urlencoded'
								}
							}).then(function(response){
								if(response.data.code == 1){
									if(response.data.data.length>1){
										self.goodsBrand = response.data.data;
									}else{
										self.goodsBrand = [];
										self.goodsBrandId = '';
									}
								}else{
									self.$message.error(response.data.msg);
								}
							});
							
						}
						// console
						if(re.brand!=null){
							self.goodsBrandId = re.brand.brandId
						}
						
						//获取商品属性
						if(re.sort){
							
							self.axios.post(Api.shopApi+'/selectSortAttrNameValues',self.qs.stringify({//初始化商品属性
								sortId:re.sort.sortId,
							}), {
								headers: {
									'Content-Type': 'application/x-www-form-urlencoded'
								}
							}).then(function(response){
								if(response.data.code == 1){
										self.goodsAttr.goodsAttrData = response.data.data;
										self.goodsAttr.goodsAttrData.forEach((e,i)=>{
											self.goodsAttr.goodsAttrId.push({anId:e[0].anId,avId:''});
											
										})
										if(re.sanv.length>0){
											re.sanv.forEach((e)=>{
												self.goodsAttr.goodsAttrId.forEach((j)=>{
													if(e.anId == j.anId){
														j.avId = e.avId;
													}
												})
											})
										}else{
											console.log(1111)
										}
										//
										
										
										
								}else{
									self.$message.error(response.data.msg);
								}
								
							});
						}
						
						
						//获取描述商品内容
						if(re.productDesc!=''){
							self.editData = re.productDesc;
						}
						if(re.descImgs.length>0){
							re.descImgs.forEach((e)=>{
								self.describeImg.push({
									imgId:e.imgId,
									imgUrl:e.imgAddr,
									height:'',
									width:'',
									name:''
								})
							})
							setTimeout(()=>{
								let imgs = document.querySelectorAll('.describe_img_box img');
								self.describeImg.forEach((e,i)=>{
									if(imgs[i].height>imgs[i].width){
										
										e.height = 130;
									}else{
										e.width = 130;
									}
									
								})
								console.log(self.describeImg)
							},300)
						}
						//获取商品类型
						if(re.productType!=''){
							self.goodsType = re.productType+'';
						}
						
						if(re.productType=='2'){
							self.isQuality = true;
							self.quality = re.productTips.keepTime+''
						}
						//获取退换货服务
						if(re.productTips.returnService){
							self.returnGoods.value = re.productTips.returnService+''
						}
						
						
						//物流费用
						if(re.productTips.productFare!=''){
							self.logistics.value = re.productTips.productFare;
						}
						if(re.productTips.isShipping == 1){
							self.logistics.baoyou = true;
						}else{
							self.logistics.baoyou = false;
						}
						
						//发货时间承诺
						if(re.productTips.shipTime!=''){
							self.sendTime = re.productTips.shipTime+''
						}
						
					}else{
						self.$message.error(res.data.msg)
					}
				})
				
				
			},
			
			sizeReg(file){//检测上传l图片宽高
				
				let _this = this; 
				return new Promise(function(resolve, reject) { 
					var reader = new FileReader(); 
					reader.onload = function(event) { 
						var image = new Image(); 
						image.onload = function () { 
							var width = this.width; 
							var height = this.height; 
							if (width<10){ 
								_this.$alert('图片宽度必须大于500!', '提示', {confirmButtonText: '确定'}); 
								reject(); 
							}
							 if(width<=height){
							 	_this.imgSize.push({name:file.name,imgH:130,imgW:''});
							 }else{
							 	_this.imgSize.push({name:file.name,imgW:130,imgH:''});
							 }
							resolve(); 
						}; 
						image.src = event.target.result; 
					} 
					reader.readAsDataURL(file); 
				}); 
			},
			goodsTypeChange(e){
				if(e=='2'){
					this.isQuality = true;
				}else{
					this.isQuality = false;
					this.quality = '';
				}
			},
			commit(num){//提交
				
				let self = this;
				let arr = [];
				let arr2 = [];
				let mainImg = [];
				let describePic = [];
				let guigeS = null;
				let postage = '';
				let status = null;
			
				if(num == 2){
						// this.commitReg();
					if(this.selectedGoodsClass.length==0){
						this.$message.error('请选择商品分类');
						return false;
					}else if(!this.goodsNameInput){
						this.$message.error('请填写商品名称');
						return false;
					}else if(this.goodsMainList.length==0){
						this.$message.error('请填上传商品主图');
						return false;
					}else if(this.editData==''){
						this.$message.error('请填写商品描述文字');
						return false;
					}else if(this.describeImg.length==0){
						this.$message.error('上传商品描述图片');
						return false;
					}else if(!this.returnGoods.value){
						this.$message.error('请选择退换货服务');
						return false;
					}else if(!this.deliveryMode.mianfei&&!this.deliveryMode.ziti&&!this.deliveryMode.tongcheng&&!this.deliveryMode.disanfang){
						this.$message.error('请选择配送方式');
						return false;
					}else if(this.logistics.baoyou==false&&this.logistics.value==''){
						this.$message.error('请输入物流费用');
						return false;
					}
					
					if(this.specifications.length>0){
						guigeS = 1;
						let isHttp = true;
						this.guigeList.forEach((e)=>{
							if(e.kucun==''||e.sellPrice==''||e.cost==''||e.kg==''){
							  isHttp = false;
								return false;
							}
						})
						if(isHttp==false){
							this.$message.error('请完善规格信息');
							return false;
						}
						if(this.specifications.length==2){
							// skus:[{num:1,anvs[{anid:1,avid:1}{anid:2,avid:2}]}, {}, {}]
							if(this.specifications[0].value == this.specifications[1].value){
								this.$message.error('不能选择相同的规格属性');
								return false;
							}else if(this.specifications[0].guigeName.length==0||this.specifications[1].guigeName.length==0){
								this.$message.error('请完善规格信息');
								return false;
							}else{
								this.guigeList.forEach((e)=>{
									arr.push({anvs:[{anId:e.idS1,avId:e.idOne},{anId:e.idS2,avId:e.idTwo}],skuPNum:e.kucun,skuImgId:e.yulanId,skuImgAddr:e.yulan,skuCode:e.sku,productWeight:e.kg,costPrice:e.cost,original:e.sellPrice})
								
								})
							
							}
							
						}else if(this.specifications.length==1){
								if(this.specifications[0].guigeName.length==0){
									this.$message.error('请完善规格信息');
									return false;
								}else{
									this.guigeList.forEach((e)=>{
										arr.push({anvs:[{anId:e.idS1,avId:e.idOne}],skuPNum:e.kucun,skuImgId:e.yulanId,skuImgAddr:e.yulan,skuCode:e.sku,productWeight:e.kg,costPrice:e.cost,original:e.sellPrice})
									})
								}
						}
						

					}else{
						guigeS = 0;
						let  nospec = this.noSpecifications[0]
						if(nospec.kucun==''||nospec.sellPrice==''||nospec.cost==''||nospec.kg==''){
							this.$message.error('请完善规格信息');
							return false;
						}else{
							arr = [{skuPNum:nospec.kucun,skuImgId:nospec.yulanId,skuImgAddr:nospec.yulan,skuCode:nospec.sku,productWeight:nospec.kg,costPrice:nospec.cost,original:nospec.sellPrice}]
						}
						
					}
					
					
				}else{
					
					if(this.specifications.length>0){
						guigeS = 1;
						if(this.specifications.length==2){
							// skus:[{num:1,anvs[{anid:1,avid:1}{anid:2,avid:2}]}, {}, {}]
							if(this.specifications[0].value == this.specifications[1].value){
								this.$message.error('不能选择相同的规格属性');
								return false;
							}else{
								this.guigeList.forEach((e)=>{
									arr.push({anvs:[{anId:e.idS1,avId:e.idOne},{anId:e.idS2,avId:e.idTwo}],skuPNum:e.kucun,skuImgId:e.yulanId,skuImgAddr:e.yulan,skuCode:e.sku,productWeight:e.kg,costPrice:e.cost,original:e.sellPrice})
								
								})
								
							}
							
						}else if(this.specifications.length==1){
								this.guigeList.forEach((e)=>{
									arr.push({anvs:[{anId:e.idS1,avId:e.idOne}],skuPNum:e.kucun,skuImgId:e.yulanId,skuImgAddr:e.yulan,skuCode:e.sku,productWeight:e.kg,costPrice:e.cost,original:e.sellPrice})
								})
							
						}
					}else{
						guigeS = 0;
						let  nospec = this.noSpecifications[0]
						if(nospec.kucun==''||nospec.sellPrice==''||nospec.cost==''||nospec.kg==''){
							this.$message.error('请完善规格信息');
							return false;
						}else{
							arr = [{skuPNum:nospec.kucun,skuImgId:nospec.yulanId,skuImgAddr:nospec.yulan,skuCode:nospec.sku,productWeight:nospec.kg,costPrice:nospec.cost,original:nospec.sellPrice}]
						}
						
					}
				}
				
				if(this.goodsAttr.goodsAttrData.length>0){
					this.goodsAttr.goodsAttrData.forEach((e)=>{
						
						e.forEach((s)=>{
							this.goodsAttr.goodsAttrId.forEach((j)=>{
								if(s.avId == j.avId&&s.anId == j.anId){
									arr2.push({anId:s.anId,avId:s.avId})
								}
							})
						})
						
					})
				}
				
				
				if(this.logistics.baoyou == true){
					postage = 1;
				}else{
					postage = 0;
				}
				
				this.goodsMainList.forEach((e)=>{
					mainImg.push(e.imgId)
				});
				
				
				this.describeImg.forEach((e)=>{
					describePic.push(e.imgId)
				})
				
				this.axios.post(Api.shopApi+'/webShop/editProduct', this.qs.stringify({
					productId:self.productId,
					shopId: JSON.parse(sessionStorage.getItem('user')).shopId,
					sortIds: self.selectedGoodsClass[2],
					sanv:JSON.stringify(arr2),
					imgs:mainImg.join(','),
					product_name:self.goodsNameInput,
					brand_id:self.goodsBrandId,
					productType:self.goodsType,
					keepTime:self.quality,
					returnService:self.returnGoods.value,
					isAuthentic:1,
					shipTime:self.sendTime,
					isShipping:postage,
					productFare:self.logistics.value,
					tips_desc_text:self.editData,
					descImgs:describePic.join(','),
					isSpec:guigeS,
					skus:JSON.stringify(arr),
					status:num
					
				}), {
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					}
				}).then(function(res){
					if(res.data.code == 1){
						self.$message({
							showClose: true,
							message:'提交成功',
							type: 'success',
						});
						self.$router.push({name:'sell'});
						
						
					}else{
						self.$message.error(res.data.msg);
					}
				})
				
			},
			postage(e){//物流费用
				if(e){
					this.logistics.value ='';
				}
			},
			inputChange(value,inputVal){//表格input
				// console.log(this.tableDataCs)
				let reg = /^\d+\.?\d{0,2}$/
				if(!reg.test(value[inputVal])){
					value[inputVal] = ''
				}
				
			},
			searchChange(j,e){
				e.guigeName=[];
				j.forEach((s)=>{
					e.sOption.forEach((i)=>{
						if(s==i.value){
							e.guigeName.push({subId:s,name:i.label,parentId:e.value})
							this.tbData()
							
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
					this.axios.post(Api.shopApi+'/webShop/deleteAttrValue', this.qs.stringify({
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
									e.guigeName.splice(i,1)
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
				this.axios.post(Api.shopApi+'/webShop/selectAttrNameAll',{
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
				this.axios.post(Api.shopApi+'/selectGroupAll',{
					headers: { //经营品类
						'Content-Type': 'application/x-www-form-urlencoded',
					}
				}).then(function(res){
					if(res.data.code == 1){
						res.data.data.forEach(function(e){
							let obj = {label:'',value:'',children:[]};
							obj.label = e.name;
							obj.value = e.id;
							self.axios.post(Api.shopApi+'/selectGSortOne',self.qs.stringify({gIds:obj.value}),{
								headers: { //经营品类
									'Content-Type': 'application/x-www-form-urlencoded',
								}
							}).then(function(subres){
								
								if(subres.data.code == 1){
									
									
									subres.data.data[0].forEach(function(s){//二级分类回调
									
										let childrenObj = {lable:'',value:'',children:[]};
										childrenObj.label = s.sortName;
										childrenObj.value = s.sortId;
										self.axios.post(Api.shopApi+'/selectSortTwo',self.qs.stringify({sortIds:childrenObj.value}),{
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
				
				self.axios.post(Api.shopApi+'/webShop/selectSortBrandAll',self.qs.stringify({//初始化商品品牌数据
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
				
				self.axios.post(Api.shopApi+'/selectSortAttrNameValues',self.qs.stringify({//初始化商品属性
					sortId:value[2],
				}), {
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					}
				}).then(function(res){
					if(res.data.code == 1){
						self.goodsAttr.goodsAttrId = [];
							res.data.data.forEach((e)=>{
								self.goodsAttr.goodsAttrId.push({anId:e[0].anId,avId:''});
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
								self.axios.post(Api.shopApi+'/deleteImg', self.qs.stringify({
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
					imgUrl:file.response.data.imgAddr,
					height:'',
					width:'',
					name:file.name
				})
				this.imgSize.forEach((e)=>{
					this.describeImg.forEach((j)=>{
						if(e.name == j.name){
							j.height = e.imgH;
							j.width = e.imgW;
						}
					})
				})
			},
			handleDescribeExceed(files, fileList){
				this.$message.warning(`当前限制选择 20 个文件`);
			},
			tableImgRemove(scope){//table图片删除
					
					let self = this;
					this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
							confirmButtonText: '确定',
							cancelButtonText: '取消',
							type: 'warning',
							callback:function(action,instance){
								
								if(action == 'confirm'){
									
									self.axios.post(Api.shopApi+'/deleteImg', self.qs.stringify({
										imgAddr: scope.yulan
									}), {
										headers: {
											'Content-Type': 'application/x-www-form-urlencoded'
										}
									}).then(function(res){
										if(res.data.code == 1){
											scope.yulan = '';
											scope.yulanId = '';
											scope.flieList.splice(0,1);
											
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
								
								self.axios.post(Api.shopApi+'/deleteImg', self.qs.stringify({
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
				this.tbData();
				this.navData[0] = '全部';
				this.navData[1] = '全部';
			},
			addGuigeName(e) {//添加规格名称
				let self = this;
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
						this.axios.post(Api.shopApi+'/webShop/addAttrValue', this.qs.stringify({
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
								e.guigeName.push({subId:res.data.data.attrValueId,name:res.data.data.attrValueName,parentId:e.value});
								
								self.tbData()
								
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
				
			
					if(e.clearAll!=0){
						let arr = [];
						e.sOption.forEach((j)=>{
							if(j.status==0){
								arr.push(j.value)
							}
						})
						this.axios.post(Api.shopApi+'/webShop/selectANV', this.qs.stringify({
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
					this.axios.post(Api.shopApi+'/webShop/selectANV', this.qs.stringify({
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
				let re = /^\d+\.?\d{0,2}$/
				if(!re.test(this[navInput])){
					
						this[navInput] = '';
					
				}else if(this.specifications.length>0){
					
					if(this.navData[0] === '全部'&&this.navData[1] !== '全部'){
						
							if(this.specifications[1]){
								if(this.specifications[1].guigeName.length>0){
									this.guigeList.forEach((e)=>{
											if(e.idTwo==this.navData[1]){
												e[attrName] = Math.floor(this[navInput] * 100) / 100;
											}
											
									})
								}
							}
					}else if(this.navData[0] === '全部'&&this.navData[1] === '全部'){
						
						if(this.specifications){
							
							this.guigeList.forEach((e)=>{
									e[attrName] = Math.floor(this[navInput] * 100) / 100;
							})
							
						}
							
					}else if(this.navData[0]!== '全部'&&this.navData[1] === '全部'){
							
							this.guigeList.forEach((e)=>{
									if(e.idOne==this.navData[0]){
										e[attrName] = Math.floor(this[navInput] * 100) / 100;
									}
									
							})
					}else{
						this.guigeList.forEach((e)=>{
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
				console.log(this.tableDataCs)
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
					
				}else{
					e.kucun = Math.floor(e.kucun * 100) / 100;
				}
				
			},
			validateReg(e){//校验sku
                var reg = /^[A-Za-z0-9\\-_]*$/;
                if(!reg.test(e.sku)){
                    e.sku = ''
				}
			},
			tbData(){
				//备用TABLE数据
				let self = this;
				this.guigeList = [];
				if(self.specifications.length>1){
					self.specifications[0].guigeName.forEach((p)=>{
						
						if(self.specifications[1].guigeName){
							self.specifications[1].guigeName.forEach((s)=>{
								self.guigeList.push({
									idS1:p.parentId,idS2:s.parentId,idOne:p.subId,idTwo:s.subId,specOne:p.name,specTwo:s.name,
									kucun:'',sellPrice:'',cost:'',kg:'',sku:'',yulan:'',yulanId:'-1',flieList:[]
								})
								
							})
						}
					})
				}else if(self.specifications.length == 1){
					self.specifications[0].guigeName.forEach((s)=>{
						self.guigeList.push({
							idS1:s.parentId,idOne:s.subId,specOne:s.name,
							kucun:'',sellPrice:'',cost:'',kg:'',sku:'',yulan:'',yulanId:'-1',flieList:[]
						})
						
					})
				}
			},
			
		
			
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
					font-size: 16px;
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
					font-size: 14px;
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
							font-size: 14px;
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
						font-size: 14px;
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
						width: 420px;
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
									z-index: 100;
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
								font-size: 14px;
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
						font-size: 14px;
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
								margin-top: 5px;
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
						.tbHead{
							span{
								color: #FF523D;
								font-size: 16px;
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
								z-index: 100;
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
						padding-top: 20px;
						.describe_img_box{
							float: left;
							width: 130px;
							height: 130px;
							margin: 0 auto;
							position: relative;
							margin-right: 35px;
							margin-bottom: 20px;
							overflow: hidden;
							img{
								display: block;
								position:absolute;
								left: 50%;
								top: 50%;
								transform: translate(-50%,-50%);
								// height: 130px;
								
							}
							.el-icon-close{
								position: absolute;
								top:0px;
								right:0px;
								background: rgba(0, 0, 0, 0.5);
								color: #fff;
								border-radius: 50%;
								cursor: pointer;
							}
						}
						.describe_img_box:nth-child(5n){
							margin-right: 0;
						}
						.upload-describe{
							float: left;
							
							.describe-uploader{
								
								height: 130px;
								width: 130px;
								border: 1px dashed #d9d9d9;
								border-radius: 6px;
								box-sizing: border-box;
								cursor: pointer;
								position: relative;
								overflow: hidden;
								.el-icon-plus{
									height: 130px;
									width: 130px;
									line-height:130px;
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
							font-size: 14px;
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
