<template>
  <div class="exchangeWarp">
      <div class="title">兑换商品</div>
      <div class="exchangeCnt flex_r_f_s">
        <ul>
          <li class="flex_r_f_s">
            <div class="item_l">
              商品类型:
            </div>
            <div class="item_r w300">
              <el-select v-model="goodsTypeVal" @change="typeChange" placeholder="请选择">
                  <el-option
                    v-for="item in goodsTypeData"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
            </div>
          </li>
          <li class="flex_r_f_s">
            <div class="item_l">
              商品分类:
            </div>
            <div class="item_r w300">
              <el-select v-model="goodsTipVal" placeholder="请选择">
                  <el-option
                    v-for="item in goodsTipData"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
            </div>
          </li>

          <li class="flex_r_f_s">
            <div class="item_l">
              商品名称:
            </div>
            <div class="item_r w300">
              <el-input v-model="goodsName" placeholder="请输入内容"></el-input>
            </div>
          </li>
          <li class="flex_r_f_s">
            <div class="item_l">
              商品图片:
            </div>
            <div class="item_r goods_main">
              <div class="goods_main_pic">
              	<div class="goods_pic" v-if="goodsMainList.length>0">
              		<draggable v-model="goodsMainList" :options = "{animation:500}">
              			<transition-group>

              					<div class="img-box" :key="item.url" v-for="(item,index) in goodsMainList">
              						<img width="100%" :src="item.url" alt="">
              						<i class="el-icon-close pointer" @click="deleteGoodsMain(index)"></i>
              					</div>
              			</transition-group>
              		</draggable>
              		<!-- <div style="font-size: 12px; color: #ccc;margin-bottom: 10px;">提示:拖动可改变图片顺序</div> -->
              	</div>

              	<el-upload class="avatar-uploader" ref="uploadGoodsMain" action="http://192.168.0.109:8084/updateImg" multiple
              	  :http-request="function(file){return handleDescribe(file)}" :limit="5"  list-type="picture" name="Img">
              		<div class="upload-text"><span>+</span>点击上传商品图片（{{goodsMainList.length}}/5）</div>
              	</el-upload>
              </div>
            </div>
          </li>
          <li class="flex_r_f_s" v-show="goodsTypeVal!=5&&goodsTypeVal!=4">
            <div class="item_l">
              规格属性:
            </div>
            <div class="item_r w300">
              <el-select @change="attrChange" v-model="goodsAttrVal" placeholder="请选择">
                  <el-option
                    v-for="item in goodsAttrData"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
            </div>
          </li>
          <li class="flex_r_f_s" v-if="norms.length>0">
            <div class="item_l">
              规格值:
            </div>
            <div class="item_r w300">
              <el-select v-model="normsVal" @change="normsChange" multiple placeholder="请选择">
                  <el-option
                    v-for="item in norms"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
            </div>
          </li>
          <li class="flex_r_f_s" v-for="item in normsArr" v-if="normsArr.length>0">
            <div class="item_l" style="color:#ff523d;">
              {{item.name}}:
            </div>
            <div class="item_r w300">
              <el-input v-model="item.normsSum" type="text" placeholder="库存"></el-input>
            </div>
          </li>
          <li class="flex_r_f_s" v-if="goodsAttrVal==-1">
            <div class="item_l">
              库存:
            </div>
            <div class="item_r w300">
              <el-input v-model="stock" type="text" @change="inputChange('freight')"  placeholder="库存"></el-input>
            </div>
          </li>

          <li class="flex_r_f_s">
            <div class="item_l">
              成本价:
            </div>
            <div class="item_r w300">
              <el-input v-model="costPrice" type="text" @change="inputChange('freight')"  placeholder="请输入运费"></el-input>
            </div>
          </li>
          <li class="flex_r_f_s">
            <div class="item_l">
              市场价:
            </div>
            <div class="item_r w300">
              <el-input v-model="marketPrice" type="text" @change="inputChange('marketPrice')" placeholder="请输入市场价"></el-input>
            </div>
          </li>
          <li class="flex_r_f_s" v-show="goodsTypeVal!=5&&goodsTypeVal!=4">
            <div class="item_l">
              {{gudouText}}:
            </div>
            <div class="item_r w300">
              <el-input v-model="gdPric" @change="inputChange('gdPric')" type="text" placeholder="请输入价格"></el-input>
            </div>
          </li>
          <li class="flex_r_f_s" v-show="goodsTypeVal!=5">
            <div class="item_l">
              运费:
            </div>
            <div class="item_r w300">
              <el-input v-model="freight" type="text" @change="inputChange('freight')"  placeholder="请输入运费"></el-input>
            </div>
          </li>
        </ul>


      </div>
      <div class="goodsDesc flex_r_f_s">
          <div class="descTitle">商品描述:</div>
          <div class="descWangeditor">
           <!-- <quill-editor
                v-model="descVal"
                ref="myQuillEditor">
            </quill-editor> -->
            <div id="editor" style="height:300px;background: #ffffff;"></div>
          </div>

      </div>
      <div class="commit pointer" @click="commit">确定</div>
  </div>
</template>

<script>
  import draggable from 'vuedraggable'
  import E from 'wangeditor'
  export default{
    data(){
      return{

        api:'http://app.gutouzu.com',
        goodsName:'',
        goodsAttrVal:'',
        goodsAttrData:[{value:-1,label:'无规格'}],
        goodsTypeVal:'',
        goodsTypeData:[{value:1,label:'普通'},{value:2,label:'推荐'},{value:3,label:'热门'},{value:4,label:'抽奖商品'},{value:5,label:'砍价商品'},{value:6,label:'抢购商品'}],
        goodsTipVal:'',
        goodsTipData:[],
        marketPrice:'',
        gdPric:'',
        costPrice:'',
        freight:'',//运费
        descVal:'',
        goodsMainList:[],
        norms:[],
        normsVal:'',
        normsArr:[],
        normsDataVal:[],
        stock:'',
        editor:'',

        gudouText:'骨豆价'
      }
    },
    computed: {
      // editor() {
      //     return this.$refs.myQuillEditor.quill;
      // },
    },
    components: {
    	draggable
    },
    mounted() {
      let self = this;
      this.editor = new E('#editor');
      this.editor.customConfig.uploadImgMaxLength = 5;
      this.editor.customConfig.customUploadImg = (files, insert) => {
        const formData = new FormData();
        formData.append('Img', files[0]);
        // formData.append('path', 'files/ne-icev3-dashboard/content/content/');
        this.axios.post(self.api+'/upload/uploadImg', formData).then(res => {
          console.log(res)
          // const result = res.data;
          if (res.data.code == 1 ) {
            const data = res.data.data.imgAddr;
            insert(data);
          }
        });
      };

      this.editor.create();
      this.getAttr();
      this.getTip();
    },
    methods:{

      commit(){
        let self = this;
        let formData = new FormData();
        let stockVal = 0;
        let skus = [];

        if(self.goodsName==''){
          this.$message({
          	showClose: true,
          	message: '商品名称不能为空',
          	type: 'error',
          });
        }else if(self.goodsMainList.length<1){
          this.$message({
          	showClose: true,
          	message: '上传商品图片',
          	type: 'error',
          });
        }else if(self.goodsTypeVal==''){
          this.$message({
          	showClose: true,
          	message: '选择商品类型',
          	type: 'error',
          });
        }else if(self.goodsTipVal==''){
          this.$message({
          	showClose: true,
          	message: '请选择商品标签',
          	type: 'error',
          });
        }else if(self.costPrice==''){
          this.$message({
          	showClose: true,
          	message: '请填写成本价',
          	type: 'error',
          });
        }else if(self.goodsTypeVal==6&&self.gdPric>self.marketPrice){
          this.$message({
          	showClose: true,
          	message: '销售价必须小于市场价',
          	type: 'error',
          });
        }else{

          if(this.goodsAttrVal==-1){
            stockVal = self.stock;
          }else{
            this.normsArr.forEach((e)=>{
              stockVal+= parseInt(e.normsSum)
            })
            this.norms.forEach((e)=>{
              this.normsArr.forEach((i)=>{
                if(e.value==i.value){
                  skus.push({
                    skuVId:e.value,
                    stock:i.normsSum
                  })
                }
              })
            })
            formData.append('skus',JSON.stringify(skus))
          }
          //console.log(self.descVal)
          formData.append('pName',self.goodsName)
          formData.append('skuNId',self.goodsAttrVal)
          formData.append('originalPrice',self.marketPrice)
          formData.append('boneBeanPrice',self.gdPric)
          formData.append('fare',self.freight)
          formData.append('pType',self.goodsTypeVal)
          formData.append('pDesc',self.editor.txt.html())
          formData.append('labelId',self.goodsTipVal)
          formData.append('sumStock',stockVal)
          formData.append('costPrice',self.costPrice)

          if(self.goodsMainList.length > 0) {
            self.goodsMainList.forEach((e) => {
              formData.append('pIcon',e.blob,e.name)
            })
          }
          self.axios.post(self.api + '/convertP/m/addConvertProduct',formData, {
          	headers: {
          		'Content-Type': 'multipart/form-data'
          	}
          }).then((res)=>{
          	if(res.data.code == 1){
              //console.log(res)
              this.$message({
                 showClose: true,
                 message: '添加-成功',
                 type: 'success'
               });
              setTimeout(()=>{
                self.$router.go(0)
              },500)
          	}else{
          		alert(res.data.msg)

          	}

          })

        }



      },
      inputChange(inputVal){//表格input
      	// console.log(this.tableDataCs)
      	let reg = /^\d+\.?\d{0,2}$/
      	if(!reg.test(this[inputVal])){
      		this[inputVal] = ''
      	}

      },
      normsChange(val){
        //console.log(val)
        this.normsDataVal = val;
        this.normsArr = [];
        this.norms.forEach((e)=>{
          val.forEach((i)=>{
            if(e.value==i){
              this.normsArr.push({
                normsSum:'',
                name:e.label,
                value:e.value
              })
            }
          })
        })
        console.log(this.normsArr)
      },
      attrChange(val){
        let self = this;
        if(val==-1){
          self.norms = [];
          self.normsArr = [];
          self.normsVal = '';
        }else{
          self.axios.post(self.api + '/convertP/m/selectANV', self.qs.stringify({
          	attrNameId:val
          }), {
          	headers: {
          		'Content-Type': 'application/x-www-form-urlencoded'
          	}
          }).then((res)=>{
          	if(res.data.code == 1){
              //console.log(res)
              self.norms = [];
              res.data.data.forEach((e)=>{
                self.norms.push({
                  label:e.attrValueName,
                  value:e.attrValueId
                })
              })
          	}else{
          		alert(res.data.msg)

          	}

          })
        }

      },
      typeChange(val){
        if(val==4||val==5){
          this.goodsAttrVal = -1;
        }
        if(val==6){
          this.gudouText = '销售价'
        }else{
          this.gudouText = '骨豆价'
        }
      },
      getAttr(){//获取属性
        let self = this;
        self.axios.post(self.api + '/convertP/m/selectAttrNameAll',{
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then((res) => {
          if (res.data.code == 1) {
            console.log(res)
            res.data.data.forEach((e)=>{
              self.goodsAttrData.push({
                label:e.attrName,
                value:e.id
              })
            })

          } else {
            alert(res.data.msg)
          }
        })
      },

      getTip(){//获取标签
        let self = this;
        self.axios.post(self.api + '/convertP/m/selectConvertPLabelAll',{
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then((res) => {
          if (res.data.code == 1) {
            res.data.data.forEach((e)=>{
              self.goodsTipData.push({
                label:e.name,
                value:e.id
              })
            })

          } else {
            alert(res.data.msg)
          }
        })
      },
      deleteGoodsMain(index) { //活动商品图片

        let self = this;
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          callback: function(action, instance) {

            if(action == 'confirm') {
              self.goodsMainList.splice(index, 1);
              // self.postFormData = '';
              // self.postUrl = '';
            }


          }
        })
      },
      uploadIMG(e, imgList) {
            this.picavalue = e.file;
            console.log(this.picavalue.size / 1024);
            if(this.picavalue.size / 1024 > 10000) {
              this.$message({
                message: "图片大小不能超过10M",
                type: "warning"
              });
            } else {
              this.imgPreview(e.file, imgList);
            }
          },
          // 压缩图片
      compress(file, img) {
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
            let ndata = canvas.toDataURL('image/jpeg', 0.7);
            // console.log("*******压缩后的图片大小*******");
            // console.log(ndata)
            // console.log(ndata.length);
            return ndata;
          },
          // base64转成bolb对象
      dataURItoBlob(base64Data) {
            var byteString;
            if(base64Data.split(",")[0].indexOf("base64") >= 0)
              byteString = atob(base64Data.split(",")[1]);
            else byteString = unescape(base64Data.split(",")[1]);
            var mimeString = base64Data
              .split(",")[0]
              .split(":")[1]
              .split(";")[0];
            var ia = new Uint8Array(byteString.length);
            for(var i = 0; i < byteString.length; i++) {
              ia[i] = byteString.charCodeAt(i);
            }
            return new Blob([ia], {
              type: mimeString
            });
          },
          //获取图片
      imgPreview(file, imgList) {
            let self = this;
            //判断支不支持FileReader

            if(!file || !window.FileReader) return;
            if(/^image/.test(file.type)) {
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
                self.option.img = result;
                self.isCropper = true;
                self.fileName = file.name;

              };
            }
          },
          //获取图片
      handleDescribe(e, fileList) { //商品主图上传
            let self = this;
            //判断支不支持FileReader
            let file = e.file;
            console.log(fileList)
            if(!file || !window.FileReader) return;
            console.log(file.type)
            if(/^image/.test(file.type)) {
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
                  let data = self.compress(file, img);
                  // self.postUrl = result;

                  let blob = self.dataURItoBlob(data);

                  // console.log("*******base64转blob对象******");
                  // console.log(blob);

                  // formData.append("Img",blob,file.name);
                  self.goodsMainList.push({
                    blob: blob,
                    url: result,
                    name: file.name,
                  });

                  // console.log("********将blob对象转成formData对象********");

                };
              };
            }

          },
    }
  }
</script>

<style lang="scss" scoped="scoped">
  .exchangeWarp{
    text-align:left;
    padding-bottom:100px;
    .commit{
      width:200px;
      height:40px;
      border-radius:40px;
      background:#ff523d;
      color:#fff;
      font-size:16px;
      text-align:center;
      line-height:40px;
      margin:10px auto 0 auto;
    }
    .pd-t20{
      padding-top:20px;
    }
    .w300{
      width:300px;
    }
    .title{
      font-size:20px;
      color:#333;
      padding:20px 0 20px 20px;
      border-bottom:1px solid #999;
    }
    .exchangeCnt{
      padding:0 20px;
      box-sizing:border-box;
      align-items:flex-start;

      ul{
        width:800px;
      }
      li{

        padding-top:20px;
        .el-select{
          width:300px;
        }
        .goods_main{
          width:700px;
        }
        .item_l{
          margin-right:10px;
          font-size:16px;
          color:#333;
          width:80px;
          text-align:right;
        }
        .goods_main_pic {

        	.goods_pic {
        		.img-box {
        			margin-bottom: 10px;
        			display: inline-block;
        			margin-right: 10px;
        			padding: 5px;
        			border: 1px solid #ddd;
        			position: relative;
        			i{
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
        			height: 40px;
        			line-height: 40px;
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

    }
    .goodsDesc{
      align-items:flex-start;
      padding:20px 0 20px 20px;
      .descTitle{
        margin-right:10px;
        font-size:16px;
        color:#333;
        width:80px;
        text-align:right;
      }
      .descWangeditor{
        width:800px;
        height:400px;
        .quill-editor{
          height:400px;
        }
      }


    }
  }
</style>
