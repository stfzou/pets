<template>
  <div class="gmWorkHome">
    <div class="headBox flex_r_s_c">
        <div>
          <div class="headImg"></div>
          <div class="userName">杨洋  [主管]</div>
          <div class="department">运营部</div>
        </div>

    </div>
    <div class="gmWorkHomeList">
      <ul class="flex_r_f_s">
        <li @click="goLink1">
          <img src="../../assets/icon_geren02.png" alt="">
          <p>商户管理</p>
        </li>
        <li  @click="goLink2">
          <img src="../../assets/icon_geren03.png" alt="">
          <p>工作报表</p>
        </li>
        <li  @click="goLink3">
          <img src="../../assets/icon_geren04.png" alt="">
          <p>合作网点</p>
        </li>
        <li  @click="goLink4">
          <img src="../../assets/icon_geren05.png" alt="">
          <p>营销计划</p>
        </li>
        <li  @click="goLink5">
          <img src="../../assets/icon_geren06.png" alt="">
          <p>员工管理</p>
        </li>
        <li  @click="goLink6">
          <img src="../../assets/icon_geren07.png" alt="">
          <p>业务流水</p>
        </li>
        <li  @click="goLink7">
          <img src="../../assets/icon_geren08.png" alt="">
          <p>我的档案</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default{
    data(){
      return{

      }
    },
    methods:{
      goLink1(){
        this.$router.push({
          name:'businessManage'
        })
      },
      goLink2(){
        this.$router.push({
          name:'gmWorkTable'
        })
      },
      goLink3(){
        this.$router.push({
          name:'branchManage'
        })
      },
      goLink4(){
        this.$router.push({
          name:'marketPlanManage'
        })
      },
      goLink5(){
        this.$router.push({
          name:'staffManage'
        })
      },
      goLink6(){
        this.$router.push({
          name:'workBill'
        })
      },
      goLink7(){
        this.$router.push({
          name:'workBill'
        })
      },
    }
  }
</script>

<style lang="scss">
  .gmWorkHome{
    .headBox{
       height:330px;
       background:url('../../assets/icon_geren01.png') no-repeat;
       background-size:100%;
       color:#fff;
       .headImg{
         width:114px;
         height:114px;
         border-radius:50%;
         background:#fff;
         display:block;
         margin:0 auto;
       }
       .userName{
         font-size:28px;
         padding-top:30px;
         text-align: center;
       }
       .department{
         font-size:24px;
         padding-top:30px;
         text-align: center;
       }
     }
    .gmWorkHomeList{
      ul{
        flex-wrap:wrap;
        padding:0 40px;
        box-sizing:border-box;
        li{
          width:104px;
          margin-right:72px;
          padding-top:30px;
          img{
            width:56px;
            height:56px;
            border-radius:50%;
            display:block;
            margin:0 auto;
          }
          p{
            text-align:center;
            padding-top:20px;
          }
        }
        li:nth-child(4){
          margin-right:0;
        }
      }

    }
  }
</style>
