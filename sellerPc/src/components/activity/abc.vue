<template>
 <div>
         <div class="wrapper">
            <vueCropper
             ref="cropper"
             :img="option.img"
             :outputSize="option.size"
             :outputType="option.outputType"
             :info="false"
             :full="option.full"
             :canMove="option.canMove"
             :canMoveBox="option.canMoveBox"
             :fixedBox="option.fixedBox"
             :original="option.original"
             :autoCrop="option.autoCrop"
             :fixed="option.fixed"
             :fixedNumber="option.fixedNumber"
             @realTime="realTime"
             ></vueCropper>
             <div class="btn">
                 <a>取消</a>
                 <a @click="finish('base64')">确定</a>
             </div>
         </div>
         <!-- 生成预览图片-->
         <div class="show-preview" :style="{'width': previews.w + 'px', 'height': previews.h + 'px',  'overflow': 'hidden', 'margin': '5px'}">
             <div :style="previews.div">
                 <img :src="previews.url" :style="previews.img">
             </div>
         </div>
       </div>


</template>
<script>
import VueCropper from "vue-cropper"


export default {
    data: function () {
        return {
            previews: {},
            option: {
                img: '',//裁切图片的地址
                outputSize: 0.6,//裁剪生成图片的质量 0.1-1
                full: false,//是否输出原图比例的截图
                outputType: 'png',//裁剪生成图片的格式
                canMove: true,//图片是否允许滚轮缩放
                fixedBox: true,//固定截图框大小 不允许改变
                original: false,//上传图片按照原始比例渲染
                canMoveBox: false,//截图框能否拖动
                canMove:true,// 上传图片是否可以移动
//              autoCropWidth: 200,
//              autoCropHeight: 200,
                autoCrop:true,//是否默认生成截图框
                // 开启宽度和高度比例
                fixed: true,
                fixedNumber: [1, 1]
            },
        }
    },
    created(){
        this.option.img ='blob:http://192.168.0.143:8080/20ac8d1b-b508-497e-90f4-81e20de57e6f'
    },
    methods: {
        finish (type) {
            var that =this;
            // 输出
//          var test = window.open('about:blank')
//          test.document.body.innerHTML = '图片生成中..'
            if (type === 'blob') {
                this.$refs.cropper.getCropBlob((data) => {
                    //var test = window.open('')
                    //test.location.href = window.URL.createObjectURL(data)
                })
            } else {
                this.$refs.cropper.getCropData((data) => {
                  //裁切生成的base64图片
                    console.log(data);
                    this.crap=false;
                })
            }
        },
        realTime (data) {
            this.previews = data
        },
    },
    components: {
        VueCropper
    },
}
</script>
<style lang="scss">
    body,html{
        height: 100%;
    }
    .box{
        position: relative;
        height: 100%;
    }
    .wrapper{
        position: fixed;
        width: 100%;
        top: 0;
        height: calc(100% - 50px);
    }
    .vue-cropper{
        background: black;
        background-image: none!important;
    }
    .btn{
        height: 50px;
        background: #565656;
        width: 100%;
        padding: 0 15px;
    }
    .btn a{
        color: white;
        font-size: .16rem;
        display: inline-block;
        line-height: 50px;
    }
    .btn a:nth-of-type(1){
        float: left;
    }
    .btn a:nth-of-type(2){
        float: right;
    }
</style>
