<template>
	<div class="editCoopShop">
    <div class="mapDia flex_r_s_c" v-show="isDia" @click.stop="diaHide">
      <div class="mapBox">
      	<el-amap ref="map" vid="amapDemo" :center="center" :zoom="18" :dragEnable="false" :zoomEnable="false" class="amap-demo">

      		<el-amap-marker v-if="isMark" :position="center" :draggable="true" :events="markers" :icon="require('../../assets/icon/map@2x.png')" vid="component-marker"></el-amap-marker>

      	</el-amap>
      </div>
    </div>
		<div class="login_nav">
			<div class="back" @click="back"></div>
			<div class="title">编辑合作商户</div>
		</div>
		<div class="addCustomer_list">

			<ul>
				<li class="flex_r_f_s">
					<div class="list_l"><b>*</b>骨米号:</div>
					<div class="list_r">
						<input type="text" style="background:#E9E9E9;" readonly="readonly" v-model.number="gmNum" />
					</div>
				</li>
        <li class="flex_r_f_s">
        	<div class="list_l"><b>*</b>用户昵称:</div>
        	<div class="list_r">
        		<input type="text" style="background:#E9E9E9;" readonly="readonly" v-model="userName" />
        	</div>
        </li>
        <li class="flex_r_f_s">
        	<div class="list_l"><b>*</b>店铺名称:</div>
        	<div class="list_r">
        		<input type="text" v-model="shopName" />
        	</div>
        </li>
        <li class="flex_r_f_s">
        	<div class="list_l"><b>*</b>类型:</div>
        	<div class="list_r staffStatus">
        		<cube-select
        		  v-model="typeVal"
        		  :options="typeData">
        		</cube-select>
        	</div>
        </li>
        <li class="flex_r_f_s">
        	<div class="list_l"><b>*</b>性质:</div>
        	<div class="list_r staffStatus">
        		<cube-select
        		  v-model="natureVal"
        		  :options="natureData">
        		</cube-select>
        	</div>
        </li>

        <li class="flex_r_f_s">
        	<div class="list_l"><b>*</b>电话:</div>
        	<div class="list_r">
        		<input type="number" v-model.number="phone" />
        	</div>
        </li>
        <li class="flex_r_f_s">
        	<div class="list_l"><b>*</b>负责人:</div>
        	<div class="list_r">
        		<input type="text" v-model="fzr" />
        	</div>
        </li>
        <li class="flex_r_f_s">
        	<div class="list_l"><b>*</b>区域:</div>
        	<div class="list_r areaBox flex_r_f_s">
            <span>{{sheng}}--{{shi}}--{{qu}}</span>
        	</div>
          <div class="posationBtn flex_r_s_c" @click="diaShow">去定位</div>
        </li>
				<li class="flex_r_f_s">
					<div class="list_l"><b>*</b>门牌地址:</div>
					<div class="list_r">
						<input type="text" v-model="addr" />
					</div>
				</li>

        <li class="flex_r_f_s">
        	<div class="list_l"><b>*</b>照片信息:</div>
        	<div class="list_r uploadDiv">
        		<div class="flex_r_f_s">
        			<div class="uploadBox">

        				<cube-upload v-if="imgOne==''" ref="uploadOne":action="action":simultaneous-uploads="1" :max="1" :process-file="processFile" />

        				<div class="img-box" v-if="imgOne!=''">
        					<img :src="imgOne.url" alt="" @click="showImagePreview(imgOne.url)">
        					<i class="cubeic-wrong" @click="fileRemove('imgOne')"></i>
        				</div>
        			</div>
        			<div class="uploadBox">

        				<cube-upload v-if="imgTwo==''" :max="1" ref="uploadTwo":action="action":simultaneous-uploads="1" :process-file="processFile2"/>

        				<div class="img-box" v-if="imgTwo!=''">
        					<img :src="imgTwo.url" alt="" @click="showImagePreview(imgTwo.url)">
        					<i class="cubeic-wrong" @click="fileRemove('imgTwo')"></i>
        				</div>
        			</div>
              <div class="uploadBox">

              	<cube-upload v-if="imgTherr==''" :max="1" ref="uploadTwo":action="action":simultaneous-uploads="1" :process-file="processFile3"/>

              	<div class="img-box" v-if="imgTherr!=''">
              		<img :src="imgTherr.url" alt="" @click="showImagePreview(imgTherr.url)">
              		<i class="cubeic-wrong" @click="fileRemove('imgTherr')"></i>
              	</div>
              </div>

        		</div>

        	</div>
        </li>
        <li class="flex_r_f_s">
					<div class="list_l"><b style="color:#fff">*</b>备注信息:</div>
					<div class="list_r">
						<div class="remark">
							<cube-textarea v-model="remark" placeholder="请输入备注信息" :maxlength="200"></cube-textarea>
						</div>
					</div>
				</li>
			</ul>
			<div class="confirmBtn flex_r_s_c" @click="addCustomer">确定</div>

    </div>


	</div>
</template>

<script>
  //province
	import Api from '../common/apj.js'
	import {provinceList,cityList,areaList} from '../../data/area'
	import compress from '../../data/image'
	const addressData = provinceList
	addressData.forEach(province => {
		province.children = cityList[province.value]
		province.children.forEach(city => {
			city.children = areaList[city.value]
		})
	})
	export default {
		data(){
			let self = this;
			return{
        isMark:true,
        isDia:false,
        gmNum:'',
        sheng:'',
        shi:'',
        qu:'',
        id:'',
        userName:'',
        shopName:'',
        phone:'',
        fzr:'',
        addr:'',
        remark:'',
				//图片上传
				action: {
				  target: '//jsonplaceholder.typicode.com/photos/'
				},
        ywyId:'',
        userId:'',
        typeData:[],
        typeVal:'',
        natureData:[],
        natureVal:'',
				imgOne:'',
				imgTwo:'',
        imgTherr:'',
        oldImgOne:'',
        oldImgTwo:'',
        oldImgTherr:'',
				reg: /^1[3456789]\d{9}$/,
        markers:{
        	// position:self.center,
        	dragend: (e) => {
        		// var geocoder = new AMap.Geocoder();
        		self.lng = e.lnglat.lng;
        		self.lat = e.lnglat.lat;
            //console.log(self.lat)

        	}
        },
        center:[104.0658400000,30.6574200000],
        lat:0,
        lng:0

			}
		},
		mounted() {

				this.addressPicker = this.$createCascadePicker({
					title: '城市选择',
					data: addressData,
					onSelect: this.selectHandle,
					onCancel: this.cancelHandle
				});
        this.gmNum = this.$route.query.userNo;
        this.getCooperationTypeAll();
        this.getDeclareAll();
        setTimeout(()=>{
          this.getShopInfo();
          this.getUserNo();
        },500)

        let userInfo = JSON.parse(localStorage.getItem('userInfo'));
        this.ywyId = JSON.parse(localStorage.getItem('userInfo')).employeeId;


		},
		methods:{
			back(){

				this.$router.go(-1); //返回上一层
			},
			showImagePreview(img) {
			  this.$createImagePreview({
				imgs: [img]
			  }).show()
			},
      diaShow(){
        this.isDia = true;
      },
      diaHide(){
        this.isDia = false;
      },
      getShopInfo(){
        let self = this;
        self.axios.post(Api.userApi + '/cooperation/selectCooperationShopsByUserNo',this.qs.stringify({
          userNo:self.gmNum
        }), {
          headers: {
          	'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then((res) => {
          if (res.data.code == 1) {
            self.gmNum = res.data.data.userNo;
            self.userId = res.data.data.userId;
            self.ywyId = res.data.data.employeeId;
            self.shopName = res.data.data.shopName;
            self.phone = res.data.data.phone;
            self.fzr = res.data.data.principal;
            self.sheng = res.data.data.province;
            self.shi = res.data.data.city;
            self.qu = res.data.data.area;
            self.addr = res.data.data.address;
            self.id = res.data.data.id;
            //console.log(res)
            self.typeData.forEach((e)=>{
              if(e.value==res.data.data.typeId){
                self.typeVal = e.value
              }
            });
            self.natureData.forEach((e)=>{

              if(e.value==res.data.data.natureId){
                self.natureVal = e.value;
              }

            })

           self.remark = res.data.data.remark;
           self.lat = res.data.data.latitude;
           self.lng = res.data.data.longitude;
           self.center = [self.lng,self.lat];
           self.imgOne = {url:res.data.data.imgA};
           self.imgTwo = {url:res.data.data.imgB};
           self.imgTherr = {url:res.data.data.imgC};
           self.oldImgOne = res.data.data.imgA;
           self.oldImgTwo = res.data.data.imgB;
           self.oldImgTherr = res.data.data.imgC;
           self.isMark = true;
          } else {
            alert(res.data.msg)
          }
        })
      },
      getDeclareAll(){//查询商户性质
        let self = this;
        self.axios.post(Api.userApi + '/cooperation/selectCooperationNatureAll',{
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then((res) => {
          if (res.data.code == 1) {
            res.data.data.forEach((e)=>{
              self.natureData.push({
                text:e.name,
                value:e.id
              })
            })

          } else {
            alert(res.data.msg)
          }
        })
      },
      getCooperationTypeAll(){//查询类型
        let self = this;
        self.axios.post(Api.userApi + '/cooperation/selectCooperationTypeAll',{
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then((res) => {
          if (res.data.code == 1) {
            res.data.data.forEach((e)=>{
              self.typeData.push({
                text:e.name,
                value:e.id
              })
            })

          } else {
            alert(res.data.msg)
          }
        })
      },
      getUserNo(){//根据骨米号查询信息
        let self = this;
        self.axios.post(Api.userApi + '/cooperation/selectUserInfoByUserNo',this.qs.stringify({
          userNo:self.gmNum
        }), {
          headers: {
          	'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then((res) => {
          if (res.data.code == 1) {
            // self.userId = res.data.data.userId;
            // self.gmNum = res.data.data.userNo;
            self.userName = res.data.data.userName;

          } else {
            alert(res.data.msg)
          }
        })
      },
			addCustomer(){
				let self = this;
				if(this.typeVal == ''){

          this.errTip('请选择商户类型')

        }else if(this.natureVal == ''){

          this.errTip('请选择商户性质')

        }else if(this.phone == '') {

          this.errTip('请填写手机号码')

				}else if(!this.reg.test(this.phone)) {

          this.errTip('手机号码格式不正确')

				}else if(this.fzr == ''){

          this.errTip('请填写负责人')

        }else if(this.sheng == '' ){

          this.errTip('请刷新页面重新进行定位')

				}else if (this.address == '') {

          this.errTip('请填写门牌地址')

				}else if(this.imgOne == ''||this.imgTwo==''||this.imgTherr==''){

					this.errTip('请上传照片信息')

				}else{
          let formData = new FormData();
          if(self.imgOne.name){
            formData.append('imgA',self.imgOne.imgData,self.imgOne.name);
            formData.append('img_A',self.oldImgOne);
          }else{
            formData.append('imgA','');
          }
          if(self.imgTwo.name){
             formData.append('imgB',self.imgTwo.imgData,self.imgTwo.name);
             formData.append('img_B',self.oldImgTwo);
          }else{
            formData.append('imgB','');
          }
          if(self.imgTwo.name){
            formData.append('imgC',self.imgTherr.imgData,self.imgTherr.name);
            formData.append('img_C',self.oldImgTherr);
          }else{
            formData.append('imgC','');
          }
          formData.append('id',self.id);



          // formData.append('userId',self.userId);
          // formData.append('userNo',self.gmNum);
          // formData.append('employeeId',self.ywyId);
          formData.append('shopName',self.shopName);
          formData.append('phone',self.phone);
          formData.append('principal',self.fzr);
          formData.append('typeId',self.typeVal);
          formData.append('natureId',self.natureVal);
          formData.append('province',self.sheng);
          formData.append('city',self.shi);
          formData.append('area',self.qu);
          formData.append('address',self.addr);
          formData.append('latitude',self.lat);
          formData.append('longitude',self.lng);
          formData.append('remark',self.remark);

          self.axios.post(Api.userApi + '/cooperation/updateCooperationShops',formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }).then((res) => {
            if (res.data.code == 1) {
              let toast = self.$createToast({
                txt: '编辑成功',
                type: 'correct'
              })
              toast.show()
              setTimeout(() => {
                self.$router.push({
                  name: 'coopShopManage'
                })

              },500)

            } else {
              alert(res.data.msg)
            }
          })

        }

			},
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
      errTip(msg){
        let toast = this.$createToast({
        	txt: msg,
        	type: 'error'
          })
        toast.show()
      },
			showAddressPicker() {
				this.addressPicker.show()
			},
			selectHandle(selectedVal, selectedIndex, selectedText) {
				this.cityData = selectedText
			},
			cancelHandle() {

			},
			processFile(file,next) {

			  let self = this;
			  compress(file, {
			    compress: {
			      width: 800,
			      height: 800,
			      quality: 0.5
			    }
			  },function(){
			      console.log(file)
			      // self.url = file.base64
			      let blob = self.dataURItoBlob(file.base64)

			      self.imgOne = {name:file.name,imgData:blob,url:file.base64};


			  })
			},
			processFile2(file,next) {

			  let self = this;
			  compress(file, {
			    compress: {
			      width: 800,
			      height: 800,
			      quality: 0.5
			    }
			  },function(){
			      console.log(file)
			      // self.url = file.base64
			      let blob = self.dataURItoBlob(file.base64)
			     self.imgTwo = {name:file.name,imgData:blob,url:file.base64};

			  })
			},
      processFile3(file,next) {

        let self = this;
        compress(file, {
          compress: {
            width: 800,
            height: 800,
            quality: 0.5
          }
        },function(){
            console.log(file)
            // self.url = file.base64
            let blob = self.dataURItoBlob(file.base64)
           self.imgTherr = {name:file.name,imgData:blob,url:file.base64};

        })
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
						this[img] = '';
					},
					onCancel: () => {

					}
				}).show()
			}

		}
	}
</script>

<style lang="scss">
	.editCoopShop{
    background: #fff;
    .mapDia{
      position:fixed;
      left:0;
      top:0;
      height:100%;
      z-index:1000;
      background:rgba(0,0,0,0.6);
      box-sizing:border-box;
      width:100%;
      .mapBox{
        height:600px;
        width:600px;
      }
    }
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
      .cube-textarea-wrapper {

        height: 180px;
      }
      .searchGmNum{
        span{
          font-size: 26px;
          width: 150px;
          color: #333;
        }
        input{
          width:260px;
          height:50px;
          border:1px solid #e8e8e8;
          border-radius:30px;
          margin-left: 20px;
          padding:0 20px;
        }
        .searchBtn{
          width:100px;
          height:40px;
          background:#ff523d;
          color:#fff;
          border-radius:30px;
          margin-left: 30px;
        }
      }
			li{
				padding: 20px 0;
			}
			.list_l{
				font-size: 26px;
				width: 150px;
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
        width:500px;

				&>input{
					border: 1px solid #e8e8e8;
					height: 50px;
					width: 390px;
					padding:0 10px;
					font-size: 26px;
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
            border: 1px solid #999;/*no*/

					}
          .cube-upload-def{
            margin:0;
          }
					.cube-upload-def .cube-upload-btn, .cube-upload-def .cube-upload-file{
						margin:0 ;
					}
					.cube-upload{
						width: 140px;
						height: 140px;
            // border: 1px solid red;
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
			.areaBox{
			  width:300px;
        border: 1px solid #e8e8e8;
        height: 50px;

        padding:0 10px;
        font-size: 26px;
			}
      .posationBtn{
        width:100px;
        height:40px;
        font-size:24px;
        color:#fff;
        border-radius:30px;
        background:#ff523d;
        margin-left:20px;
      }
      .staffStatus{
        .cube-select{
         height: 50px;
         padding:10px 20px 10px 10px;
         width:410px;

        }
      }
      .confirmBtn{
				color: #fff;
				font-size: 30px;
				width: 500px;
				height: 60px;
				background: #ff523d;
				border-radius: 50px;
				margin: 50px auto;

			}
		}
	}
</style>
