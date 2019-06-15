<template>
	<div class="publishActivity">
		<ul class="publishActivity_list">
			<li>
				<div class="add_goods_title">活动基本信息</div>
			</li>
			<li class="clearfloat">
				<p class="list_l">活动封面<span>*</span></p>
				<div class="list_r">
					<div class="goods_main_pic">
						<div class="postImg" v-show="postUrlList.length>0">
							<div class="img-box" v-for="(item,index) in postUrlList">
								<img width="100%" :src="item.url" alt="">
								<i class="el-icon-close pointer" @click="deleteGoodsMain(postUrlList,index)"></i>
							</div>

						</div>
						<div class="postImg" v-show="postUrlList.length==0">
							<el-upload class="avatar-uploader" :before-upload="function(file){return sizeReg(file,800,533)}" :file-list="postUrlList" 
							:http-request="function(file){return uploadIMG(file,postUrlList)}"ref="uploadGoodsMain" action="http://192.168.0.109:8084/updateImg" multiple 
							:limit="1" list-type="picture" name="Img">
								<div class="upload-text flex_c_f_s">
									<i class="el-icon-plus"></i>
									<div><span>+</span>点击上传活动封面 (850*533)</div>
								</div>
							</el-upload>
						</div>
					</div>
				</div>
			</li>
			<li class="clearfloat">
				<p class="list_l">活动标题<span>*</span></p>
				<div class="list_r">
					<el-input class="goodsNameInput h32" :show-word-limit="true" v-model="activeTitle" maxlength="60" placeholder="请输入活动标题(不少于5个字)"></el-input>
				</div>
			</li>
			<li class="clearfloat">
				<p class="list_l">选择主办方<span>*</span></p>
				<div class="list_r">
					<el-select v-model="undertakerVal" placeholder="请选择主办方">
						<el-option v-for="item in undertakerData" :key="item.organizerId" :label="item.organizerName" :value="item.organizerId">
						</el-option>
					</el-select>
				</div>
			</li>

			<li class="clearfloat">
				<p class="list_l">活动时间<span>*</span></p>
				<div class="list_r">
					<el-date-picker v-if="ticketNum>0" readonly v-model="activityData" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="timestamp">
					</el-date-picker>
					<el-date-picker v-else  type="datetimerange" v-model="activityData" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="timestamp">
					</el-date-picker>
				</div>
			</li>
			<li class="clearfloat">
				<p class="list_l">活动地点<span>*</span></p>
				<div class="list_r addr">

					<v-distpicker :province="province" :city="city" :area="dist" @selected="onSelected"></v-distpicker>

				</div>
			</li>
			<li class="clearfloat">
				<p class="list_l">详细地址<span>*</span></p>
				<div class="list_r detailedAddr">
					<div class="street">
						<input id="input_id" v-model="street" class="active_input" type="text" placeholder="请输入详细街道名称和门牌号">
						<span class="map_button pointer">去定位</span>
					</div>
					<div class="amap-page-container">
						<el-amap-search-box class="search-box" :search-option="searchOption" :on-search-result="onSearchResult"></el-amap-search-box>

						<el-amap ref="map" vid="amapDemo" :center="mapCenter" :zoom="15" class="amap-demo" :plugin="plugin">

							<el-amap-marker :icon="require('../../assets/map@2x.png')" :events="markers" draggable="true" vid="component-marker"
							 :position="mapCenter"></el-amap-marker>

						</el-amap>
					</div>
				</div>
			</li>
			<li class="clearfloat">
				<p class="list_l">活动分类<span>*</span></p>
				<div class="list_r">
					<!-- <el-cascader class="goodsClass h32" placeholder="请选择活动分类" :options="activeType" v-model="activeTypeVal"></el-cascader> -->
					<el-select v-model="activeTypeVal" placeholder="请选择活动分类">
						<el-option v-for="item in activeType" :key="item.typeId" :label="item.typeName" :value="item.typeId">
						</el-option>
					</el-select>
				</div>
			</li>
			<li class="clearfloat">
				<p class="list_l">活动详情</p>
				<div class="list_r editer">
					<el-input class="textarea" type="textarea" resize="none" placeholder="请输入内容" v-model="activeText">
					</el-input>
					<div class="shop_describe_img">
						<draggable v-model="activeImg" :options="{animation:500}">
							<transition-group>

								<div class="describe_img_box" v-for="(item,index) in activeImg" :key="item.url">
									<!-- <img :src="element.imgUrl" :height="element.height" :width="element.width" alt=""> -->
									<img :src="item.url" :height="item.height" :width="item.width" alt="">
									<i class="el-icon-close" @click="deleteGoodsMain(activeImg,index)"></i>
								</div>

							</transition-group>
						</draggable>
						<div class="upload-describe">
							<el-upload class="describe-uploader" :before-upload="function(file){return sizeReg(file,10,10)}"  :on-exceed="handleExceed" :file-list="activeImg" ref="uploadDescribe"  
							action="http://192.168.0.109:8084/updateImg" multiple :http-request="function(file){return handleDescribe(file,activeImg)}" :limit="2" list-type="picture"  name="Img">
								<i class="el-icon-plus"></i>
							</el-upload>
						</div>
						<div style="font-size: 12px; color: #ccc;margin-top: 10px ; float: left;width: 100%;">提示:拖动可改变图片顺序</div>
					</div>

				</div>

			</li>
			<li>
				<div class="add_goods_title chengnuo">票券类型及人数限制</div>
			</li>

			<li class="clearfloat">
				<p class="list_l">票劵类型<span>*</span></p>
				<div class="list_r">
					<div class="ticketBox">
						<div class="ticketList" v-for="(item,index) in ticketList">
							<div class="ticketName">{{item.ticketName}}</div>
							<div class="cost"><span>{{item.ticketType|chargeFilter}}</span>【{{item.useType|isOneTicket}}】</div>
							<div class="ticketNum flex_r_f_s">
								<div class="num">数量:{{item.ticketNum}}张</div>
								<div class="limitBuy">限购:{{item.limitNum}}张/人</div>
							</div>
							<div class="isReturn flex_r_f_s">
								<span>{{item.isBearRefund|isReturn}}</span>
								<span>{{item.isCheck|isCheckFilter}}</span>
							</div>
							<div class="makeData">
								使用时间:{{item.validStartTime}} 至 {{item.validEndTime}}
							</div>
							<div class="ticketBtn flex_r_f_s">
								<div class="editTicket pointer" @click="editTicket(item)">编辑</div>
								<div class="delete pointer" @click="deleteTicket(item,index)">删除</div>
							</div>
						</div>
					</div>
					<div class="addTicket pointer" @click="addTicket">
						<span>+</span>添加票劵类型
						<!-- <router-link :to="{name:'ticket'}"></router-link> -->
					</div>
				</div>
			</li>

			<li class="clearfloat">
				<p class="list_l">人数限制<span>*</span></p>
				<div class="list_r">
					<el-input class="goodsNameInput h32" @change="inputChange('limitPeople')" v-model="limitPeople" maxlength="60" placeholder="请输入可参加活动人数"></el-input>

				</div>
			</li>
			<li>
				<div class="add_goods_title chengnuo">活动设置</div>
			</li>
			<li class="clearfloat">
				<p class="list_l">发布方式</p>
				<div class="list_r delivery_mode">
					<div class="delivery_mode_box">
						<el-checkbox v-model="releaseStyle">公开发布</el-checkbox>
						<span class="tx">(仅能通过您分享的链接报名)<span class="spanColor">活动标准审核</span></span>
					</div>

				</div>
			</li>
			<li class="clearfloat">
				<p class="list_l">报名时间</p>
				<div class="list_r delivery_mode">
					<div class="delivery_mode_box">
						<el-checkbox disabled v-model="isEndJoin">活动结束前均可报名</el-checkbox>
					</div>
					<!-- <div v-if="!isEndJoin">
						<el-date-picker v-model="joinDate" @change="effectiveDataChange" type="datetimerange" range-separator="至" start-placeholder="开始日期" 
						end-placeholder="结束日期" value-format="timestamp"> </el-date-picker>
					</div> -->
				</div>
			</li>
		</ul>
		<div class="save_box">

			<el-button round class="fabu_btn" @click="commit">下一步</el-button>
		</div>
	</div>

</template>

<script>
	import draggable from 'vuedraggable'
	import VDistpicker from 'v-distpicker'
	import Api from '../common/apj.js'
	export default {
		components: {
			draggable,
			VDistpicker
		},
		data() {
			let self = this;
			return {
				ticketNum:0,//票劵数量
				picavalue:'',//file对象
				formData:new FormData(),//封面formData
				postUrlList:[],
				isMark: false,
				activityData:[], //活动时间
				lng: '',
				lat: '',
				imgSize:[],
				mapCenter: [121.59996, 31.197646],
				province: '',
				city: '',
				dist: '',
				street: '', //详细地址
				markers: {
					dragend: (e) => {
						// var geocoder = new AMap.Geocoder();
						self.lng = e.lnglat.lng;
						self.lat = e.lnglat.lat;
						self.mapCenter = [self.lng, self.lat];
						console.log(self.mapCenter)
					}
				},
				searchOption: {
					city: '',
					citylimit: true
				},
				plugin: [{
					enableHighAccuracy: true, //是否使用高精度定位，默认:true
					timeout: 10000, //超过10秒后停止定位，默认：无穷大
					maximumAge: 0, //定位结果缓存0毫秒，默认：0
					convert: false, //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
					showButton: false, //显示定位按钮，默认：true
					buttonPosition: 'RB', //定位按钮停靠位置，默认：'LB'，左下角
					showMarker: false, //定位成功后在定位到的位置显示点标记，默认：true
					showCircle: true, //定位成功后用圆圈表示定位精度范围，默认：true
					panToLocation: true, //定位成功后将定位到的位置作为地图中心点，默认：true
					zoomToAccuracy: true, //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：f
					extensions: 'all',
					pName: 'Geolocation',
					events: {
						init(o) {
							// o 是高德地图定位插件实例
							o.getCurrentPosition((status, result) => {

								if (result && result.position) {


									self.lng = result.position.lng;
									self.lat = result.position.lat;
									self.mapCenter = [self.lng, self.lat];
									self.$nextTick();
									// console.log(result.addressComponent.city)

								}

							});
						}
					}
				}],
				activeTitle: '', //活动标题
				activeType: [], //活动类型数据
				activeTypeVal: '', //活动类型值
				selectedGoodsClass: [], //商家分类数据
				activeText: '', //活动详情文字
				activeImg: [], //活动详情图片
				limitPeople: '', //限制人数,
				releaseStyle: true, //发布方式
				undertakerData: [], //承办方数据
				undertakerVal: '', //承办方值
				ticketList:[],//票劵列表
				isEndJoin:true,//是否报名时间都可以参加
				joinDate:[]
			};
		},
		activated() {
			this.getTicket();
		},
		filters: {
			chargeFilter(val){//是否免费过滤
				if(val == '1'){
					return '收费'
				}else{
					return '免费'
				}
			},
			isCheckFilter(val){//是否审核过滤
				if(val == '1'){
					return '报名需要审核'
				}else{
					return '报名无需审核'
				}
			},
			isOneTicket(val){
				if(val == '2'){
					return '连次票'
				}else{
					return '单次票'
				}
			},
			isReturn(val){
				if(val == '1'){
					return '支持退票'
				}else{
					return '不支持退票'
				}
			}
		},
		mounted () {
			this.getActiveType();
			this.getActiveData();
			this.getTicket();
			this.getSponsor();
			
			this.$store.commit('initialNav', {
				navNum: 1,
				subNum: 0
			});
			setTimeout(() => {
				document.querySelector('.cnt').scrollTop = 0;
			}, 200)
		},
		methods: {
			commit(){
				if(this.postUrlList.length<1){
					this.$message({
						showClose: true,
						message: '请上传封面图片',
						type: 'error',
					});
					return false;
				}else if(this.activeTitle==''){
					this.$message({
						showClose: true,
						message: '请填写活动标题',
						type: 'error',
					});
					return false;
				}else if(this.undertakerVal==''){
					this.$message({
						showClose: true,
						message: '选择主办方',
						type: 'error',
					});
					return false;
				}else if(this.activityData.length<1){
					this.$message({
						showClose: true,
						message: '请选择活动举办时间',
						type: 'error',
					});
					return false;
				}else if(this.province==''||this.city==''||this.dist==''){
					this.$message({
						showClose: true,
						message: '请选择省市区',
						type: 'error',
					});
					return false;
				}else if(this.street==''){
					this.$message({
						showClose: true,
						message: '请填写详细地址',
						type: 'error',
					});
					return false;
				}else if(this.activeTypeVal==''){
					this.$message({
						showClose: true,
						message: '请选择活动分类',
						type: 'error',
					});
					return false;
				}else if(this.ticketList.length==0){
					this.$message({
						showClose: true,
						message: '添加活动票劵',
						type: 'error',
					});
					return false;
				}else if(this.limitPeople==''){
					this.$message({
						showClose: true,
						message: '请输入限制人数',
						type: 'error',
					});
					return false;
				}else if(!this.isEndJoin&&this.joinDate.length<1){
					this.$message({
						showClose: true,
						message: '请填写报名时间',
						type: 'error',
					});
					return false;
				}else{
					
					let self = this;
					let isPublic = null;
					let isEnd = null;
					if(self.releaseStyle){
						isPublic = '1'
					}else{
						isPublic = '0'
					}
					// if(self.isEndJoin){
					// 	isEnd = '1'
					// 	self.formData.append('isEndJoin',isEnd);
					// }else{
					// 	isEnd = '0';
					// 	self.formData.append('joinEndTime',self.capitalize(self.joinDate[1]))
					// }
					if(self.activeImg.length>0){
						self.activeImg.forEach((e)=>{
							self.formData.append('imgs',e.blob,e.name);
						})
					}
					self.formData.append('userId',JSON.parse(sessionStorage.getItem('user')).userId)
					self.formData.append('activityTitel',self.activeTitle)
					self.formData.append('organizerId',self.undertakerVal)
					self.formData.append('startTime',self.capitalize(self.activityData[0]))
					self.formData.append('endTime',self.capitalize(self.activityData[1]))
					self.formData.append('activityAddr',self.province+''+self.city+''+self.dist)
					self.formData.append('address',self.street)
					self.formData.append('latitude',self.mapCenter[1])
					self.formData.append('longitude',self.mapCenter[0])
					self.formData.append('typeId',self.activeTypeVal)
					self.formData.append('limitNum',self.limitPeople)
					self.formData.append('description',self.activeText)
					self.formData.append('isPublic',isPublic)
					self.formData.append('isEndJoin',1);
					self.formData.append('cover',self.postUrlList[0].blob,self.postUrlList[0].name)
					// if(self.activeImg.length>0){
					// 	
					// }
					
					self.axios.post(Api.userApi+'/ca/addCommunityActivity',self.formData, {
						headers: {
							'Content-Type': 'multipart/form-data'
						}
					}).then((res)=>{
						if(res.data.code == 1){
							self.$message({
								showClose: true,
								message:'活动发布成功',
								type: 'success',
							});
						}else{
							alert(res.data.msg)
						}
					})
				}
			},
			inputChange(value){//input数字限制
				// console.log(this.tableDataCs)
				let reg = /^\d+\.?\d{0,2}$/
				if(!reg.test(this[value])){
					this[value] = ''
				}
				
			},
			effectiveDataChange(val){//报名日期限制时间
				if(this.activityData.length<1){
					this.$message({
						showClose: true,
						message: '请先选择活动时间',
						type: 'error',
					});
					return false;
				}else if(val[0]>this.activityData[1]||val[1]>this.activityData[1]){
					this.$message({
						showClose: true,
						message:'报名时间只能在活动结束之前',
						type: 'error',
					});
					this.joinDate = [];
				}
				
			},
			
			getSponsor(){//查询主办方
				let self = this;
				self.axios.post(Api.userApi+'/ca/selectCommunityActivityOrganizerByUserId', self.qs.stringify({
					userId:JSON.parse(sessionStorage.getItem('user')).userId
				}), {
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					}
				}).then((res)=>{
					if(res.data.code == 1){
						self.undertakerData = res.data.data
						console.log(self.sponsorList)
					}else{
						alert(res.data.msg)
					}
				})
			},
			onSelected(data) { //省市区选择回调
				this.province = data.province.value
				this.city = data.city.value
				this.dist = data.area.value
			},
			onSearchResult(pois) { //地图搜索回调

				if (pois.length > 0) {

					this.mapCenter = [pois[0].lng, pois[0].lat];

				}
			},
			getActiveData(){
				let self= this;
				this.axios.get(Api.userApi+'/ca/selectActivityTimeAndTicketNum?userId='+ JSON.parse(sessionStorage.getItem('user')).userId, {
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					}
				}).then(function(res) {
					if(res.data.code == 1){
						
						if(res.data.data.ticketNum>0){
							self.ticketNum = res.data.data.ticketNum;
							self.activityData = [self.capiDate(res.data.data.startTime),self.capiDate(res.data.data.endTime)];
							// console.log()
						}
						
					}	
				})
					
			},
			capitalize (value) {//将时间戳转化为日期
			  var date = new Date(parseInt(value));
			  var tt = [date.getFullYear(), ((date.getMonth()+1)<10?'0'+(date.getMonth()+1):date.getMonth()+1), (date.getDate()<10?'0'+date.getDate():date.getDate())].join('-') + ' ' +[(date.getHours()<10?'0'+date.getHours():date.getHours()), (date.getMinutes()<10?'0'+date.getMinutes():date.getMinutes())].join(':');
			  return tt;
			},
			capiDate(value){//将日期转化为时间戳
				return new Date(value).getTime();
			},
			editTicket(item){//编辑活动票劵页面
				let self = this;
				if(this.activityData.length<1){
					this.$message({
					  message: "请先添加活动时间",
					  type: "warning"
					});
				}else{
					this.$router.push({
						name:'editTicket',
						params:{
							ticketInfo:item,
							activeData:self.activityData
						}
					})
				}
			},
			addTicket(){//添加活动票劵页面
				let self = this;
				if(this.activityData.length<1){
					this.$message({
					  message: "请先添加活动时间",
					  type: "warning"
					});
				}else{
					this.$router.push({
						name:'ticket',
						params:{
							activeData:self.activityData
						}
					})
				}
			},
			getActiveType() { //获取活动类型
				let self = this;
				this.axios.post(Api.userApi + '/ca/selectCommunityActivityType', {
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					}
				}).then((res) => {
					if (res.data.code == 1) {
						self.activeType = res.data.data;
					} else {
						alert(res.data.msg)
					}
				})
			},
			deleteTicket(item,index){//删除票劵
				let self = this;
				this.$confirm('是否确定删除此票劵, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning',
					callback: function(action, instance) {
				
						if (action == 'confirm') {
				
							self.axios.post(Api.userApi+'/ca/deleteCommunityActivityTicket', self.qs.stringify({
								ticketId:item.ticketId
							}), {
								headers: {
									'Content-Type': 'application/x-www-form-urlencoded'
								}
							}).then((res)=>{
								if(res.data.code == 1){
									self.$message({
										showClose: true,
										message:'删除票劵成功',
										type: 'success'
									});
									self.ticketList.splice(index,1);
									self.ticketNum = self.ticketList.le
								}else{
									alert(res.data.msg)
								}
							})
				
						}
					}
				})
				
			},
			releaseStyleHandle() {

			},
			getTicket(){
				let self = this;
				self.axios.post(Api.userApi+'/ca/selectNoUseTicket', self.qs.stringify({
					userId:JSON.parse(sessionStorage.getItem('user')).userId
				}), {
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					}
				}).then((res)=>{
					if(res.data.code == 1){
						self.ticketList = res.data.data;
						console.log(res.data.data)
					}else{
						alert(res.data.msg)
					}
				})
			},
			sizeReg(file,w,h) { //检测上传l图片宽高
				let _this = this;

				return new Promise(function(resolve, reject) {
					var reader = new FileReader();
					reader.onload = function(event) {
						var image = new Image();
						image.onload = function() {
							var width = this.width;
							var height = this.height;
							if (width < w || height<h) {
								_this.$alert('图片宽度必须大于800并且高度大于533', '提示', {
									confirmButtonText: '确定'
								});
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
			
			uploadIMG(e,imgList) {
			  this.picavalue = e.file;
			  console.log(this.picavalue.size / 1024);
			  if (this.picavalue.size / 1024 > 10000) {
				this.$message({
				  message: "图片大小不能超过10M",
				  type: "warning"
				});
			  } else {
				this.imgPreview(e.file,imgList);
			  }
			},
			// 压缩图片
			compress(file,img) {
				let canvas = document.createElement("canvas");
				let ctx = canvas.getContext("2d");
				let initSize = img.src.length;
				let width = img.width;
				let height = img.height;
				canvas.width = width;
				canvas.height = height;
				// 铺底色
				ctx.fillStyle = "#fff";
				ctx.fillRect(0, 0, canvas.width, canvas.height);
				ctx.drawImage(img, 0, 0, width, height);

				//进行最小压缩
				let ndata = canvas.toDataURL('image/jpeg',0.7);
				// console.log("*******压缩后的图片大小*******");
				// console.log(ndata)
				// console.log(ndata.length);
				return ndata;
			},
			// base64转成bolb对象
			dataURItoBlob(base64Data) {
				var byteString;
				if (base64Data.split(",")[0].indexOf("base64") >= 0)
					byteString = atob(base64Data.split(",")[1]);
				else byteString = unescape(base64Data.split(",")[1]);
				var mimeString = base64Data
					.split(",")[0]
					.split(":")[1]
					.split(";")[0];
				var ia = new Uint8Array(byteString.length);
				for (var i = 0; i < byteString.length; i++) {
					ia[i] = byteString.charCodeAt(i);
				}
				return new Blob([ia], {
					type: mimeString
				});
			},
			//获取图片
			imgPreview(file,imgList) {
				let self = this;
				//判断支不支持FileReader
				if (!file || !window.FileReader) return;
				if (/^image/.test(file.type)) {
					//创建一个reader
					let reader = new FileReader();
					
					//将图片转成base64格式
					reader.readAsDataURL(file);
					//读取成功后的回调
					reader.onloadend = function() {
						let result = this.result;
						let img = new Image();
						img.src = result;
						console.log("********未压缩前的图片大小********");
						console.log(result.length);
						
						img.onload = function() {
							let data = self.compress(file,img);
							self.postUrl = result;

							let blob = self.dataURItoBlob(data);
							imgList.push({
								url:result,
								blob:blob,
								name:file.name
							})
							console.log("*******base64转blob对象******");
							console.log(blob);
							// self.formData = new FormData();
							// self.formData.append("Img",blob,file.name);
							console.log("********将blob对象转成formData对象********");
							// console.log(self.formData)
							
						};
					};
				}
			},
			
			inputChange(value) { //表格input
				// console.log(this.tableDataCs)
				let self = this;
				let reg = /^\d+\.?\d{0,2}$/
				if (!reg.test(self[inputVal])) {
					self[inputVal] = ''
				}

			},
			activeChange(val) {
				// console.log(val)
			},
			handleExceed(files, fileList) {
				this.$message.warning(`只能上传20张图片`);
			},
			deleteGoodsMain(imgList,index) { //活动封面图删除

				let self = this;
				this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning',
					callback: function(action, instance) {

						if (action == 'confirm') {
							imgList.splice(index, 1);
							// self.postFormData = '';
							// self.postUrl = '';
						}
					}
				})
			},
			handleDescribe(e,fileList) { //活动详情图片上传
				let self = this;
				//判断支不支持FileReader
				let file = e.file;
				console.log(fileList)
				if (!file || !window.FileReader) return;
					console.log(file.type)
				if (/^image/.test(file.type)) {
					//创建一个reader
					
					let reader = new FileReader();
					
					//将图片转成base64格式
					reader.readAsDataURL(file);
					//读取成功后的回调
					reader.onloadend = function() {
						let result = this.result;
						let img = new Image();
						img.src = result;
						// console.log("********未压缩前的图片大小********");
						// console.log(result.length);
						
						img.onload = function() {
							let data = self.compress(file,img);
							// self.postUrl = result;
				
							let blob = self.dataURItoBlob(data);
				
							// console.log("*******base64转blob对象******");
							// console.log(blob);
				
							// formData.append("Img",blob,file.name);
							self.activeImg.push({
								blob:blob,
								url:result,
								height: '',
								width: '',
								name:file.name,
								
							});
							self.imgSize.forEach((e) => {
								self.activeImg.forEach((j) => {
									if (e.name == j.name) {
										j.height = e.imgH;
										j.width = e.imgW;
									}
								})
							})
							// console.log("********将blob对象转成formData对象********");
							
						};
					};
				}

			},
			handleDescribeExceed(files, fileList) {
				this.$message.warning(`当前限制选择 20 个文件`);
			},
		
		}
	}
</script>

<style lang="scss">
	.publishActivity {
		padding: 40px;
		padding-right: 10px;

		.save_box {
			margin-top: 68px;

			.el-button {
				height: 36px;
				padding: 0;
				line-height: 36px;
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

		.publishActivity_list {
			&>li {
				margin-bottom: 30px;

				.certified_ensure {
					.tx {
						font-size: 14px;
						color: #666;
						margin-left: 45px;
					}

					.el-radio__input.is-checked+.el-radio__label {
						color: #333333;
						font-size: 14px;
					}
				}

				.add_goods_title {
					font-size: 14px;
					color: #FF523D;
					height: 18px;
					line-height: 18px;
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

				.list_r {
					float: left;
					margin-left: 24px;

					.el-input.is-active .el-input__inner,
					.el-input__inner:focus {
						border-color: #dcdfe6;
					}

					.el-cascader .el-input.is-focus .el-input__inner {
						border-color: #dcdfe6;
					}

					.el-input__icon {
						line-height: 32px;
					}

					.goodsClass {
						width: 420px;
					}

					.goodsBrand {
						width: 420px;
					}

					.goodsNameInput {
						width: 420px;
						font-size: 14px;

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
						.postImg{
							width: 400px;
							height: 200px;
							border: 1px solid #ddd;
							border-radius: 4px;
							.img-box {
								position: relative;
								width: 400px;
								height: 200px;
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
									height: 100%;
									width: 100%;
									display: block;
									
								}
							}
							.avatar-uploader {
								.upload-text {
									align-items:center;
									justify-content: center;
									height: 200px;
									box-sizing: border-box;
									width: 400px;
									border-radius: 4px;
									color: #333;
									text-align: left;
									font-size: 14px;
									color: #999;
									i{
										font-size: 60px;
									}
									span {
										color: #FF523D;
										margin-right: 5px;
							
									}
								}
							}
						}
						
					}
				}

				.addr {
					.distpicker-address-wrapper {
						select {
							width: 130px;
							padding: 5px;
							// margin-right: 5px;
						}

						select:last-child {
							width: initial;
						}
					}
				}

				.addTicket {
					width: 300px;
					border-radius: 4px;
					border: 1px solid #ddd;
					padding: 0 15px;
					box-sizing: border-box;
					font-size: 16px;
					height: 32px;
					line-height: 32px;
					color: rgb(204, 204, 204);

					span {
						color: #ff523d;
					}

					a {
						display: block;
					}
				}

				.detailedAddr {
					width: 60%;

					.map_button {
						display: inline-block;
						width: 80px;
						height: 30px;
						background: rgba(255, 82, 61, 1);
						border-radius: 15px;
						color: #fff;
						line-height: 30px;
						font-size: 16px;
						text-align: center;
						margin-left: 12px;
					}

					input {
						line-height: 36px;
						color: #333;
						font-size: 14px;
						width: 280px;
						outline: none;
						border: 1px solid rgba(221, 221, 221, 1);
						border-radius: 6px;
						padding-left: 20px;
						box-sizing: border-box;
						width: 450px;
					}

					.amap-page-container {
						margin-top: 20px;
						height: 400px;
						width: 80%;
						position: relative;

						// overflow: hidden;
						.search-box {
							position: absolute;
							top: 25px;
							left: 20px;
						}

						input {
							height: 45px;
							border: none;
						}
					}

				}

				.ticketBox {
					width: 600px;

					.ticketList {
						padding: 20px;
						font-size: 16px;
						color: #333;
						border: 1px solid #e8e8e8;
						border-radius: 4px;
						margin-bottom: 10px;

						.ticketName {
							color: #333;
							padding-bottom: 20px;
						}

						.cost {
							color: #333;
							padding-bottom: 20px;

							span {
								color: #ff523d;
								margin-right: 20px;
							}
						}

						.ticketNum {
							color: #333;
							padding-bottom: 20px;

							.num {
								margin-right: 100px;
							}
						}

						.isReturn {
							padding-bottom: 20px;
							font-size: 14px;
							color: #666;

							span:first-child {
								margin-right: 100px;
							}
						}

						.makeData {
							padding-bottom: 35px;
							color: #666;
							font-size: 14px;
						}

						.ticketBtn {
							padding-bottom: 10px;

							div {
								width: 150px;
								text-align: center;
								height: 30px;
								line-height: 30px;
								box-sizing: border-box;
								font-size: 14px;
								border-radius: 20px;
								box-shadow: 0px 6px 8px 0px rgba(255, 82, 61, 0.16);
							}

							.editTicket {
								background: #ff523d;
								color: #fff;
								margin-right: 100px;
								
							}

							.delete {
								border: 1px solid #FF523D;
								color: #ff523d;
							}
						}
					}
				}

				.editer {
					width: 800px;

					.el-textarea__inner {
						height: 200px;
					}

					.shop_describe_img {
						padding-top: 20px;

						.describe_img_box {
							float: left;
							width: 130px;
							height: 130px;
							margin: 0 auto;
							position: relative;
							margin-right: 35px;
							margin-bottom: 20px;
							overflow: hidden;

							img {
								display: block;
								position: absolute;
								left: 50%;
								top: 50%;
								transform: translate(-50%, -50%);
								// height: 130px;

							}

							.el-icon-close {
								position: absolute;
								top: 0;
								right: 0;
								background: rgba(0, 0, 0, 0.5);
								color: #fff;
								border-radius: 50%;
								cursor: pointer;
							}
						}

						.describe_img_box:nth-child(5n) {
							margin-right: 0;
						}

						.upload-describe {
							float: left;

							.describe-uploader {

								height: 130px;
								width: 130px;
								border: 1px dashed #d9d9d9;
								border-radius: 6px;
								box-sizing: border-box;
								cursor: pointer;
								position: relative;
								overflow: hidden;

								.el-icon-plus {
									height: 130px;
									width: 130px;
									line-height: 130px;
									font-size: 60px;
									color: gray;

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

				.delivery_mode {
					.delivery_mode_box {
						height: 32px;
						line-height: 32px;

						.tx {
							font-size: 14px;
							color: #666;
							margin-left: 30px;

							span {
								margin-left: 10px;
								color: #ff523d;
							}
						}

					}
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
		}
	}
</style>
