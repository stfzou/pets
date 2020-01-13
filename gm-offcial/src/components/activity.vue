<template>
  <div class="activityWarp">
    <div class="activityPost">
        <div class="btnBox">
          <p>让宠物活动更有趣</p>
          <div class="btn pointer flex_r_f_e" @click="maskShow">发布宠物活动</div>
        </div>
    </div>
    <div class="activityList">
      <ul class="flex_r_s_b">
        <li v-for="item in activityList" class="pointer" @click="activityXq(item)">
          <div class="activityImg">
            <img :src="item.activityCover" alt="">
          </div>
          <div class="activityName">活动名称: {{item.activityTitel}}</div>
          <div class="time">活动时间: {{item.startTime}}~{{item.endTime}}</div>
          <div class="activityAddr">活动地点: {{item.address}}</div>
        </li>
      </ul>
      <div class="more" @click="maskShow">查看更多圈子活动</div>
    </div>
  </div>
</template>

<script>
  import Api from '../api/api.js'
  export default{
    data(){
      return{
        activityList:[]
      }
    },
    mounted() {
      this.getActivity();
    },
    methods:{
      maskShow(){
        this.$popup();
      },
      activityXq(item){
        this.$router.push({
          name:'activityDetails',
          query:{
            activityId:item.id
          }
        })
      },
      getActivity(){
        let self = this;
        self.axios.post(Api.httpApi + '/ca/selectCommunityActivityList', self.qs.stringify({
        	latitude:0,
          longitude:0,
          pageNo:0,
          pageSize:6
        }), {
        	headers: {
        		'Content-Type': 'application/x-www-form-urlencoded'
        	}
        }).then((res)=>{
        	if(res.data.code == 1){
            //console.log(res)
        		self.activityList = res.data.data;
        	}else{
        		alert(res.data.msg)

        	}

        })
      }
    }
  }
</script>

<style lang="scss" scoped="scoped">
  .activityWarp{
    .activityPost{
       height: 500px;
       position: relative;
       background:url('../assets/activityBg.jpg') no-repeat;
       .btnBox{
         position: absolute;
         right:300px;
         top:150px;
         p{
           font-size:48px;
           color:#000;
           padding-bottom:30px;
         }
         .btn{
           background:#ff523d;
           color:#fff;
           font-size:20px;
           width:150px;
           border-radius:30px;
           width:150px;
           height:50px;

         }
       }
    }
    .activityList{
      width:1100px;
      margin:0 auto;
      ul{
         flex-wrap: wrap;

        li{
          width:500px;
          padding-top:50px;
          text-align:left;
          font-size:18px;
          color:#333;
          .activityImg{
            width:500px;
            height:300px;
            img{
              width: 100%;
              height: 100%;
              object-fit: cover;
              border-radius:10px;
            }
          }
          .activityName{
            padding-top:20px;
          }
          .time{
            padding-top:15px;
          }
          .activityAddr{
            padding-top:15px;
            line-height:20px;
          }
        }
      }
      .more{
        text-align:center;
        font-size:18px;
        padding-top:30px;
        color:#ff523d;

      }
    }
  }
</style>
