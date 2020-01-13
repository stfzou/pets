<template>
    <div class="popupMask" v-if="show">
        <div class="maskCnt">
          <div class="maskImg">
            <img src="../assets/pupEwm.png" alt="">
          </div>
          <div class="maskTip">扫码下载骨米宠物APP <br>养宠上骨米  生活更有趣</div>
          <div class="closeMask pointer" @click="closeMask">关闭</div>
        </div>
    </div>
</template>

<script>
  export default{
    data(){
      return{
        show:false
      }
    },
    methods:{
      closeMask(){
        this.show = false;
      }
    }
  }
</script>

<style lang="scss" scoped="scoped">
    .popupMask{
      position: fixed;
      left:0;
      width:100%;
      height:100%;
      top:0;
      z-index:10000;
      background:rgba(0,0,0,0.5);
      .maskCnt{
        width:280px;
        height:280px;
        background:#fff;
        position: absolute;
        left:50%;
        top:50%;
        margin-top:-175px;
        margin-left:-150px;
        box-sizing:border-box;
        padding-top:20px;
        border-radius:10px;
        .maskImg{
          width:130px;
          height:130px;
          margin:0 auto;
          img{
            width:100%;
            height:100%;

          }

        }
        .maskTip{
          text-align:center;
          line-height:30px;
          font-size: 14px;
          color: #555;
          padding-top:20px;
        }
        .closeMask{
          padding: 10px 0;
          color: #5b92e1;
          text-align:center;
        }
      }
    }
</style>
