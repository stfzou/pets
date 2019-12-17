<template>
  <div class="helpCntWarp">
    <div class="top_nav flex_r_s_b">
    	<div class="back" @click="back"></div>
    	<div class="nav_title">随机</div>
    </div>
    <div class="cnt" v-html="value"></div>
  </div>
</template>

<script>
  import Api from '../common/apj.js'
  export default{
    data(){
      return{
        value:''
      }
    },
    mounted() {
      this.getCnt();
    },
    methods:{
      back() {
      	this.$router.go(-1); //返回上一层
      },
      getCnt(){
        let self = this;
        self.axios.get(Api.userApi + '/systemHelp/selectSystemHelpDetails', {
          params: {
            sysHelpId:'15744112169002484'
          }
        }, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then((res)=>{
          if(res.data.code==1){
            //console.log(res)
            this.value = res.data.data;

          }else{
            alert(res.data.msg)
          }
        })
      }
    }
  }
</script>

<style lang="scss">
  .helpCntWarp{
    padding-top:88px;
    .top_nav {
    	padding: 0 20px;
      position: fixed;
      left:0;
      top:0;
    	height: 88px;
    	box-sizing: border-box;
    	z-index: 100;
      background:#fff;
      border-bottom:1px solid #ff523d;/*no*/
      // background: #fdb366;
    	.back {
    		width: 26px;
    		height: 42px;
    		background: url(../../assets/icon/backColory.png) no-repeat center 0;
    		background-size: cover;
    	}
    	.nav_title {
    		font-size: 30px;
    		color: #333;
    		position: absolute;
    		left: 50%;
    		top: 50%;
    		transform: translate(-50%, -50%);
    		font-weight:400;
    	}

    }
    .cnt{
      padding:20px;
    }
  }
</style>
