<template>
  <div class="presentSearch">
    <div class="flex_r_s_b header">
      <img src="../../assets/icon/backColory.png" alt="">
      <div class="search flex_r_s_b">
        <input type="text" placeholder="请输入要查找的关键字" v-model="searchVal">
        <i v-if="isClear" @click="clearVal" class="cubeic-wrong"></i>
      </div>
      <div class="searchBtn">搜索</div>
    </div>
    <div class="cntWarp">
      <cube-scroll ref="scroll">
        <ul class="flex_r_s_b">
          <li v-for="item in [1,2,3,4]">
            <div class="goodsImgBox">
              <img class="goodsPic" src="../../assets/product.png" alt="">
              <img class="sxdTip" src="../../assets/sxd_tip.png" alt="">
            </div>
            <div class="listBottom">
              <div class="goodsName">FANKEC狗狗火腿肠狗狗火 腿肠150g</div>
              <div class="exChangePeople">已有180人兑换</div>
              <div class="deduction">骨豆直抵¥10.90</div>
              <div class="gudouPriceBox flex_r_f_s">
                <div class="gudouPrice flex_r_s_c">骨豆价¥18.90</div>
                <div class="oldPrice">¥32.80</div>
              </div>
            </div>
          </li>
        </ul>
      </cube-scroll>
    </div>
  </div>
</template>

<script>
  export default{
    data(){
      return{
        searchVal:'',
        isClear:false
      }
    },
    watch:{
      searchVal(val){

       if(val!=''){
         this.isClear = true;
       }else{
         this.isClear = false;
       }
      }
    },
    methods:{
      clearVal(){
        this.searchVal = '';
      }
    }
  }
</script>

<style lang="scss">
    .presentSearch{
      height:100%;
      .header{
        height:98px;
        padding:0 20px;
        box-sizing:border-box;
        border-bottom:1px solid #e8e8e8;/*no*/
        img{
          width:26px;
        }
        .search{
          width:520px;
          height:60px;
          background:rgba(255,255,255,1);
          border:1px solid rgba(221,221,221,1);
          border-radius: 30px;
          box-sizing:border-box;
          padding:0 20px;
          i{
            font-size:30px;
            color:#BBBBBB;
          }
          input{
            width:420px;
            font-size:26px;
          }
        }
        .searchBtn{
          font-size:26px;
          color:#999;
        }
      }
      .cntWarp{
        height: calc(100% - 98px);
        // margin-top: 98px;
        padding: 0 20px 0 20px;
        box-sizing:border-box;
        ul{
          flex-wrap: wrap;
          padding-bottom:28px;
          li{
            width:330px;
            background:#fff;
            margin-top:28px;
            border-radius:10px;
            box-shadow:0px 0px 20px 0px rgba(0, 0, 0, 0.1);
            .listBottom{
              padding:15px 12px 20px 12px;
            }
            .goodsImgBox{
              width:330px;
              height:330px;
              position:relative;
              .goodsPic{
                width:100%;
                height:100%;
                border-radius:10px;
                object-fit: cover;
              }
              .sxdTip{
                width:76px;
                position:absolute;
                left:14px;
                top:0;
              }
            }
            .goodsName{
              line-height:45px;
              font-size:26px;
              color:#333;
            }
            .exChangePeople{
              padding-top:12px;
              font-size:22px;
              color:#666666;
            }
            .deduction{
              font-size:24px;
              color:#ff523d;
              padding-top:20px;
            }
            .gudouPriceBox{
              padding-top:20px;
              .gudouPrice{
                width:180px;
                height:40px;
                background:rgba(255,82,61,1);
                border-radius:20px;
                color:#fff;
                font-size:24px;
                margin-right:20px;

              }
              .oldPrice{
                text-decoration:line-through;
                color:#999999;
                font-size:24px;
              }
            }
          }
        }
      }
    }
</style>
