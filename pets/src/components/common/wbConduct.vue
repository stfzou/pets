<template>
  <div class="wbConduct">
    <img class="bg"  src="../../assets/wb_01.png" alt="">
    <img class="bg"  src="../../assets/wb_02.png" alt="">
    <div class="conductFoot">
      <div class="conductFootCnt flex_r_s_b">
        <div class="cnt_l flex_r_f_s">
           <img src="../../assets/gumipetlogo_256.png" alt="">
           <div class="conductTetx">
             <h3>骨米宠物</h3>
             <p>发现身边的养宠乐趣</p>
           </div>
        </div>
        <div class="conductBtn" @click="downLink">
          立即下载 <br><span>下载领取可提现红包</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default{
    data(){
      return{
        
      }
    },
    mounted() {
      
    },
    methods:{
      
      downLink(){
        this.$router.push({
          name:'appShowBtn'
        })
      },
    }
  }
</script>

<style lang="scss">
  .wbConduct{
    .bg{
      width:100%;
      display:block;
    }
    .conductFoot{
      position:fixed;
      bottom:0;
      left:0;
      width:100%;
      padding:0 20px;
      box-sizing:border-box;
      .conductFootCnt{
        height:130px;
        background:#fff;
        border-radius:20px;
        padding:0 30px;
        box-sizing:border-box;
        .cnt_l{
          width:350px;
          img{
            width:90px;
            height:90px;
          }
          .conductTetx{
            margin-left:20px;
            h3{
              font-size:30px;
              color:#333;

            }
            p{
              font-size:24px;
              color:#999;
              padding-top:20px;
            }
          }
        }
        .conductBtn{
          width:230px;
          height:72px;
          border-radius:36px;
          color:#fff;
          background:#FF523D;
          line-height:36px;
          font-size:24px;
          text-align:center;
          span{
            font-size:20px;
          }
        }
      }
    }
  }
</style>
