<template>
  <div class="helpList">
    <div class="top_nav flex_r_s_b">
    	<div class="back" @click="back"></div>
    	<div class="nav_title">{{title}}</div>
    </div>
    <div class="helpListCnt">
      <ul>
        <li class="flex_r_s_b" v-for="item in listData" @click="goCntLink(item)">
          <span>{{item.title}}</span>
          <img src="../../assets/icon/right_sjx.png" alt="">
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import Api from '../common/apj.js'
  export default{
    data(){
      return{
        title:'',
        typeId:'',
        listData:[]
      }
    },
    mounted() {
      this.title = this.$route.query.title;
      this.typeId = this.$route.query.typeId;
      this.getList();
    },
    methods:{
      back() {
      	this.$router.go(-1); //返回上一层
      },
      getList(){
        let self = this;
        self.axios.get(Api.userApi + '/systemHelp/selectSystemHelpByType', {
          params: {
            type:self.typeId
          }
        }, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then((res)=>{
          if(res.data.code==1){
            //console.log(res)
            self.listData = res.data.data;

          }else{
            alert(res.data.msg)
          }
        })
      },
      goCntLink(item){
        this.$router.push({
          name:'helpCnt',
          query:{
            sysHelpId:item.sysHelpId,
            title:item.title
          }
        })
      }
    }
  }
</script>

<style lang="scss">
  .helpList{
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
    .helpListCnt{
      ul{
        padding:0 20px;
      }
      li{
        border-bottom:1px solid #e8e8e8;/*no*/
        padding:30px 10px;
        box-sizing:border-box;
        img{
          width:14px;
        }
        span{
          font-size:26px;
          color:#000;
        }
      }
    }
  }
</style>
