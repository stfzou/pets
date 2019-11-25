<template>
	<div class="addVisitInfo">
		<div class="login_nav">
			<div class="back" @click="back"></div>
			<div class="title">添加拜访信息</div>
		</div>
		<div class="addCustomer_list">
			<ul>
				<li class="flex_r_f_s">
					<div class="list_l"><b>*</b>拜访对象:</div>
					<div class="list_r">
             <!-- <cube-select v-model="storeVal" title="选择拜访对象" :options="staffNameList" @change="nameChange"> </cube-select> -->

              <i-select :model.sync="storeVal" filterable @on-change="change">
                <i-option v-for="item in staffNameList" :key="item.value" :value="item.value+''">{{ item.text }}</i-option>
              </i-select>
					</div>
				</li>

				<li class="flex_r_f_s">
					<div class="list_l"><b>*</b>签到地点:</div>
					<div class="list_r">
						<div class="addr">{{addr}}</div>
					</div>
				</li>


				<li class="flex_r_f_s">
					<div class="list_l"><b>*</b>现场照片:</div>
					<div class="list_r uploadDiv">
						<div class="flex_r_f_s">
							<div class="uploadBox">

								<cube-upload v-if="imgOne==''" ref="uploadOne":action="action":simultaneous-uploads="1" :max="1"
									:process-file="processFile"@file-submitted="fileSubmitted" @file-success="function(file){return uploadSuccess(file,'imgOne','loadOne')}"
									@files-added="function(file){return filesAdded('loadOne')}" />

								<div class="img-box" v-if="imgOne!=''">
									<img :src="imgOne" alt="" @click="showImagePreview('imgOne')">
									<i class="cubeic-wrong" @click="fileRemove('imgOne')"></i>
								</div>
								<p>
									<cube-loading v-show="loadOne" class="flex_r_s_c" :size="28"></cube-loading>
									<span>门头照片</span>

								</p>
							</div>
							<div class="uploadBox">

								<cube-upload v-if="imgTwo==''" :max="1" ref="uploadTwo":action="action":simultaneous-uploads="1" :process-file="processFile"
								@file-submitted="fileSubmitted" @file-success="function(file){return uploadSuccess(file,'imgTwo','loadTwo')}"
								@files-added="function(file){return filesAdded('loadTwo')}"/>

								<div class="img-box" v-if="imgTwo!=''">
									<img :src="imgTwo" alt="" @click="showImagePreview('imgTwo')">
									<i class="cubeic-wrong" @click="fileRemove('imgTwo')"></i>
								</div>
								<p>
									<cube-loading v-show="loadTwo" class="flex_r_s_c" :size="28"></cube-loading>
									<span>陈列照片</span>
								</p>
							</div>
							<div class="uploadBox">

								<cube-upload v-if="imgThree==''" :max="1" ref="uploadThree":action="action":simultaneous-uploads="1" :process-file="processFile"
								@file-submitted="fileSubmitted" @file-success="function(file){return uploadSuccess(file,'imgThree','loadThree')}" @file-error="fileError"
								 @files-added="function(file){return filesAdded('loadThree')}"/>

								<div class="img-box" v-if="imgThree!=''">
									<img :src="imgThree" alt=""  @click="showImagePreview('imgThree')">
									<i class="cubeic-wrong" @click="fileRemove('imgThree')"></i>
								</div>
								<p>
									<cube-loading v-show="loadThree" class="flex_r_s_c" :size="28"></cube-loading>
									<span>陈列照片</span>
								</p>
							</div>
						</div>

					</div>
				</li>
				<li class="flex_r_f_s">
					<div class="list_l"><b>*</b>拜访备注:</div>
					<div class="list_r">
						<div class="remark">
							<cube-textarea v-model="remark" :maxlength="200" placeholder="请输入客户备注信息"></cube-textarea>
						</div>
					</div>
				</li>
				<li>
					<div class="list_l"><b>*</b>地理位置:</div>
					<div class="list_r">
						<div class="customer_map">
							<el-amap ref="map" vid="amapDemo" :dragEnable="false" :zoomEnable="false" :center="center" :zoom="18" class="amap-demo" :plugin="plugin">

								<el-amap-marker v-if="isMark" :draggable="true" :events="markers" :icon="require('../../assets/icon/map@2x.png')" vid="component-marker"></el-amap-marker>

							</el-amap>
						</div>
					</div>
				</li>
			</ul>
			<div class="confirmBtn flex_r_s_c" @click="commit">提交</div>

		</div>


	</div>
</template>

<script>
	import Api from '../common/apj.js'
	import compress from '../../data/image'
	export default {
		data(){
			let self = this;
			return{
				isCommit:false,
        addr:'',
				remark:'',
        staffNameList:[],
        storeVal:null,//选择店铺的值
				isMark:true,
				lng:'',
				lat:'',
				//图片上传
				action: {
					target:Api.staffApi+'/business/updateImg',
					prop: 'base64Value',
					max:1
				},
				center:[0,0],
				plugin: [{
					pName: 'Geolocation',
					enableHighAccuracy: true,//是否使用高精度定位，默认:true
					timeout: 10000,          //超过10秒后停止定位，默认：无穷大
					showMarker: false,        //定位成功后在定位到的位置显示点标记，默认：true
					showCircle: false,        //定位成功后用圆圈表示定位精度范围，默认：true
					panToLocation: true,     //定位成功后将定位到的位置作为地图中心点，默认：true
					zoomToAccuracy:false,//定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：f
					useNative:true,
					events: {
					  init(o) {
						// o 是高德地图定位插件实例
						o.getCurrentPosition((status, result) => {
						  if (result && result.position) {
							self.lng = result.position.lng;
							self.lat = result.position.lat;
							self.center = [result.position.lng, result.position.lat];
              // alert(JSON.parse(result));
              // alert(result)
              self.addr = result.formattedAddress;
							// self.$nextTick();
						  }
						});
					  },
					  complete(res){

						 self.isMark = false;

						 setTimeout(()=>{
							  self.isMark = true;
							  self.lng = res.position.lng;
							  self.lat = res.position.lat;
							  self.center = [res.position.lng, res.position.lat];
						 },200)
					  },
            error(){
              alert('定位失败，请刷新页面重新定位')
            }
					}
				 }],
				markers:{
					position:self.center,
					dragend: (e) => {
						// var geocoder = new AMap.Geocoder();
						self.lng = e.lnglat.lng;
						self.lat = e.lnglat.lat;
						// self.center = [lng,lat];

					}
				},
				imgOne:'',
				imgTwo:'',
				imgThree:'',
				loadOne:false,
				loadTwo:false,
				loadThree:false,
			}
		},
		mounted() {
			if(JSON.parse(localStorage.getItem('staff'))== null){

				this.$router.push({
					name:'workOsLogin'
				})

			}else{
				let upLoad = document.querySelectorAll(".uploadBox input");
				upLoad.forEach((e)=>{
					e.setAttribute("capture","camera");
				});
        this.getStaffName();
        console.log(this.staffNameList)
			}
		},
		methods:{
      change(val){
       this.storeVal = val;
      },
			back(){
				this.$router.push({
					name:'workOsInfoList'
				});
			},
			showImagePreview(img) {
			  this.$createImagePreview({
				imgs: [this[img]]
			  }).show()
			},
      commit(){
         let self = this;
         console.log(this.storeVal)
        if(this.storeVal == ''){
          self.erroTost('请选择拜访对象')
        }else if(this.addr == ''){
          self.erroTost('定位失败，请刷新页面重新定位')
        }else if(this.imgOne == ''){
          self.erroTost('请上传门头照片')
        }else if(this.imgTwo == ''||this.imgThree==''){
          self.erroTost('请上传陈列照片')
        }else{
          self.axios.post(Api.staffApi + '/visit/addVisit', this.qs.stringify({
            clientId:self.storeVal,
            staffId:JSON.parse(localStorage.getItem('staff')).staffId,
            currentAddr:self.addr,
            remark:self.remark,
            gateImg:self.imgOne,
            displayImgOne:self.imgTwo,
            displayImgTwo:self.imgThree,
            latitude:self.lat,
            longitude:self.lng,
          }), {
          	headers: {
          		'Content-Type': 'application/x-www-form-urlencoded'
          	}
          }).then((res)=>{
            if(res.data.code == 1){
              setTimeout(()=>{
              	let toast = this.$createToast({
              		txt: '添加成功',
              		type: 'correct'
              	  })
              	toast.show();
                self.$router.push({
                  name:'visitRecords'
                })
              },500)

            }else{
              alert(res.data.msg)
            }

          })

        }
      },
      erroTost(str){
        let toast = this.$createToast({
        	txt:str,
        	type: 'error'
          })
        toast.show()
        return false;
      },
      getStaffName(){//获取拜访客户名字
        let self = this;
        self.axios.post(Api.staffApi + '/visit/selectCompetenceBClient', this.qs.stringify({
          staffId:JSON.parse(localStorage.getItem('staff')).staffId
        }), {
        	headers: {
        		'Content-Type': 'application/x-www-form-urlencoded'
        	}
        }).then((res)=>{
          if(res.data.code==1){
            res.data.data.forEach((e)=>{
              self.staffNameList.push({
                value:e.clientId,
                text:e.shopName
              })
            })
          }else{
            alert(res.data.msg)
          }
        })
       },
			addCustomer(){
				let self = this;
			},

      nameChange() {

      },
			processFile(file, next) {
			  compress(file, {
				compress: {
				  width: 1600,
				  height: 1600,
				  quality: 0.5
				}
			  }, next)
			},
			fileSubmitted(file) {
			  file.base64Value = file.file.base64
			},
			uploadSuccess(file,img,load){
				this[img] = file.response.data;
				this[load] = false;
			},
			fileError(file){
				console.log(file);
			},
			filesAdded(load){
				console.log(this[load])
				this[load] = true;

			},
			fileRemove(img){
				let self = this;
				this.$createDialog({
					type: 'confirm',
					icon: 'cubeic-alert',
					title: '删除',
					content: '是否确定删除该图片？',
					confirmBtn: {
						text: '确定',
						active: true,
						disabled: false,
						href: 'javascript:;'
					},
					cancelBtn: {
						text: '取消',
						active: false,
						disabled: false,
						href: 'javascript:;'
					},
					onConfirm: () => {
						// let self = this;
						this.axios.post(Api.staffApi + '/business/deleteImg', this.qs.stringify({
							imgAddr:self[img]
						}), {
							headers: {
								'Content-Type': 'application/x-www-form-urlencoded'
							}
						}).then((res)=>{
							if(res.data.code == 1){
								let toast = this.$createToast({
									txt: '删除成功',
									type: 'correct'
								 })
								toast.show();
								self[img] = '';
								setTimeout(()=>{
									let upLoad = document.querySelectorAll(".uploadBox input");
									upLoad.forEach((e)=>{
										e.setAttribute("capture","camera");
									});
								},200)

							}else{
								alert(res.data.msg);
							}
						})
					},
					onCancel: () => {

					}
				}).show()
			}

		}
	}
</script>

<style lang="scss">

	.addVisitInfo{
		.amap-logo{
			opacity:0;
		}
		.amap-copyright{
			opacity:0;
		}
		.cube-upload-file{
			display: none;
		}
		.login_nav{
			height: 42px;
			padding: 22px 0;
			position: relative;
			border-bottom: 1px solid #e8e8e8;
			.back{
				background: url("../../assets/icon/backColory.png") no-repeat center 0;
				background-size: cover;
				width: 24px;
				height: 40px;
				position: absolute;
				left: 20px;
				top: 50%;
				margin-top: -21px;
			}
			.title{
				font-size: 30px;
				color: #333;
				line-height: 42px;
				text-align: center;
			}
		}
		.addCustomer_list{
			padding: 20px;
			li{
				padding: 20px 0;
			}
			.list_l{
				font-size: 26px;
				width: 160px;
				color: #333;
				b{
					color: #ff523d;
				}
			}
			.uploadDiv{
				width: 80%;
			}
			.list_r{
				margin-left: 20px;
				flex-wrap:wrap;
        .ivu-select-item{
          padding-left: 15px;
          .ivu-select-single .ivu-select-input{
            font-size: 28px;
          }
         }
				&>input{
					border: 1px solid #e8e8e8;
					height: 50px;
					width: 390px;
					padding:0 10px;
					font-size: 26px;
				}
        .addr{

          line-height: 30px;
          color: #999;
          font-size: 24px;
        }
        .cube-select{
          width: 200px;
          height: 65px;
          padding: 15px 10px 5px 20px;
         }
				.remark{
					width: 430px;
					.cube-textarea-wrapper{
						font-size: 24px;
					}
				}
				.img-box{
					width: 140px;
					height: 140px;
					// margin: 0 10px 10px 0;
					box-sizing: border-box;
					background-color: #fff;
					box-shadow: 0 0 6px 2px rgba(0,0,0,.08);
					border-radius: 2px;
					position: relative;
					.cubeic-wrong{
						position: absolute;
						top: -10px;
						right: -10px;
						font-size: 36px;
						color: #000;
					}
					img{
						width: 100%;
						height: 100%;

					}
				}
				.region {
					div {
						padding: 3px 20px 3px 10px;
						/*no*/
						margin-right: 20px;
						border: 1px solid #e8e8e8;
						/*no*/
						text-align: center;
						border-radius: 2px;
						/*no*/
						width: initial;

						span {
							font-size: 26px;
							color: #333;
						}

						img {
							width: 30px;
						}
					}

				}
				.customerType {

					.cube-select {
						padding-top: 2px;
						padding-bottom: 2px;
						font-size: 26px;
						margin-right: 20px;
					}
				}
				.uploadBox{
					margin-right: 15px;
					.cube-upload-input{
						width: 100%;
						height: 100%
					}
					.cube-upload-btn-def{
						width: 140px;
						height: 140px;

					}
					.cube-upload-def .cube-upload-btn, .cube-upload-def .cube-upload-file{
						margin:0 ;
					}
					.cube-upload{
						width: 140px;
						height: 140px;
						// overflow: auto;
					}
					p{
						text-align: center;
						padding-top: 10px;
						div{
							text-align: center;
							font-size: 28px;
							color: 999;

						}
					}
				}
				.customer_map{
					height: 350px;
					padding-top: 20px;
				}

			}
			.confirmBtn{
				color: #fff;
				font-size: 30px;
				width: 500px;
				height: 60px;
				background: #ff523d;
				border-radius: 50px;
				margin: 0 auto;
        margin-top: 30px;
			}
		}
	}
</style>
