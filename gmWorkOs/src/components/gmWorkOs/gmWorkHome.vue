<template>
  <div class="gmWorkHome">
    <div class="headBox flex_r_s_c">
        <div>
         <!-- <div class="headImg"></div> -->
          <div class="userName">{{userInfo.name}}
            <span v-if="userInfo.post!=0">[{{post}}]</span>
            <span v-if="userInfo.manager">[网点管理员]</span>
          </div>
          <div class="department" v-if="!userInfo.root">{{department}}</div>
        </div>

    </div>
    <div class="gmWorkHomeList">
      <ul class="flex_r_f_s">
        <li @click="goLink1" v-if="userInfo.root!=true">
          <img src="../../assets/icon_geren02.png" alt="">
          <p>商户管理</p>
        </li>
       <!-- <li  @click="goLink2" v-if="userInfo.root!=true">
          <img src="../../assets/icon_geren03.png" alt="">
          <p>工作报表</p>
        </li> -->
        <li  @click="goLink3" v-if="userInfo.root==true">
          <img src="../../assets/icon_geren04.png" alt="">
          <p>合作网点</p>
        </li>
       <!-- <li  @click="goLink4" v-if="userInfo.root!=true">
          <img src="../../assets/icon_geren05.png" alt="">
          <p>营销计划</p>
        </li> -->
        <li  @click="goLink5" v-if="userInfo.root!=true&&userInfo.post<5">
          <img src="../../assets/icon_geren06.png" alt="">
          <p>员工管理</p>
        </li>
        <li  @click="goLink6" v-if="userInfo.root!=true">
          <img src="../../assets/icon_geren07.png" alt="">
          <p>业务流水</p>
        </li>
        <li  @click="goLink7" v-if="userInfo.root!=true">
          <img src="../../assets/icon_geren08.png" alt="">
          <p>我的档案</p>
        </li>
        <li  @click="goLink9" v-if="userInfo.root!=true">
          <img src="../../assets/icon_geren08.png" alt="">
          <p>合作商户管理</p>
        </li>
        <li  @click="goLink10" v-if="userInfo.root!=true">
          <img src="../../assets/icon_geren08.png" alt="">
          <p>添加费用申报</p>
        </li>
        <li  v-if="userInfo.manager" @click="goLink8">
          <img src="../../assets/icon_geren08.png" alt="">
          <p>佣金设置</p>
        </li>
      </ul>
      <div class="cancellation flex_r_s_c" @click="cancellation">注销</div>
    </div>
  </div>
</template>

<script>
  export default{
    data(){
      return{
        userInfo:'',
        department:'',
        post:'',
        departmentOptions:[{value:1,text:'办公室'},{value:2,text:'运营部'},{value:3,text:'客服部'},{value:4,text:'内勤部'}],
        postOptions:[{value:1,text:'经理'},{value:2,text:'主管'},{value:3,text:'区长'},{value:4,text:'组长'},{value:5,text:'职员'}],
      }
    },
    mounted() {
      this.userInfo = JSON.parse(localStorage.getItem('userInfo'));

      //console.log(this.userInfo)
      if(this.userInfo.root!=true && this.userInfo.manager!=true){
        this.departmentOptions.forEach((e)=>{
          if(e.value==this.userInfo.department){
            this.department = e.text;
          }
        });
        this.postOptions.forEach((e)=>{
          if(e.value==this.userInfo.post){
            this.post = e.text;
          }
        });

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
          name:'myArchives'
        })
      },
      goLink8(){
        this.$router.push({
          name:'commissionSet'
        })
      },
      goLink9(){
        this.$router.push({
          name:'coopShopManage'
        })
      },
      goLink10(){
        this.$router.push({
          name:'moneyDeclareManage'
        })
      },
      cancellation(){
        localStorage.removeItem('userInfo');
        this.$router.push({
          name:'gmWorkLogin'
        })
      }
    }
  }
</script>

<style lang="scss">
  .gmWorkHome{
    .cancellation{
      position: fixed;
      bottom:50px;
      width:300px;
      height:50px;
      background:#ff523d;
      border-radius:30px;
      color:#fff;
      left:50%;
      margin-left:-150px;
    }
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
          width:110px;
          margin-right:64px;
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
