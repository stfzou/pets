<template>
    <div class="popupMask" v-if="show">
        <div class="maskCnt">
            <img src="../assets/ewm.png" alt="">
            <i class="el-icon-error closeMask pointer" @click="closeMask"></i>
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
        width:220px;
        height:220px;
        background:#fff;
        position: absolute;
        left:50%;
        top:50%;
        margin-top:-110px;
        margin-left:-110px;

        img{
          width:100%;
          height:100%;

        }
        .closeMask{
          position: absolute;
          color:#ff523d;
          right:-10px;
          top:-10px;
          font-size:30px;
        }
      }
    }
</style>
