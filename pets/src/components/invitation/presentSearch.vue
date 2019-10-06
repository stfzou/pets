<template>
  <div class="presentSearch">
    <div class="flex_r_s_b header">
      <img src="../../assets/icon/backColory.png" @click="back" alt="">
      <div class="search flex_r_s_b">
        <input type="text" placeholder="请输入要查找的关键字" v-model="searchVal">
        <i v-if="isClear" @click="clearVal" class="cubeic-wrong"></i>
      </div>
      <div class="searchBtn" @click="search">搜索</div>
    </div>
    <div class="cntWarp" v-if="dataList.length>0">
      <cube-scroll ref="scroll" :options="listOpt" @pulling-up="onPullingUp" @pulling-down="onPullingDown">
        <ul class="flex_r_s_b">
          <li v-for="item in dataList">
            <div class="goodsImgBox">
              <img class="goodsPic" @click="xqLink(item)" :src="item.compressImage" alt="">
              <img class="sxdTip" v-if="deduction>=item.boneBeanPrice" src="../../assets/sxd_tip.png" alt="">
            </div>
            <div class="listBottom">
              <div class="goodsName">{{item.name|descFilter}}</div>
              <div class="exChangePeople">已有{{item.sumSellNum}}人兑换</div>
              <div class="deduction">骨豆直抵¥<span v-if="deduction>=item.boneBeanPrice">{{item.boneBeanPrice}}</span><span v-else>{{deduction}}</span></div>
              <div class="gudouPriceBox flex_r_f_s">
                <div class="gudouPrice flex_r_s_c">骨豆价¥{{item.boneBeanPrice}}</div>
                <div class="oldPrice">原价:¥{{item.price}}</div>
              </div>
            </div>
          </li>
        </ul>
      </cube-scroll>
    </div>
    <div class="cntWarp searchTip" v-else>
      <img src="../../assets/icon_she208@3x.png" alt="">
      <p>暂无搜索结果</p>
    </div>
  </div>
</template>

<script>
  import Api from '../common/apj.js'
  export default{
    data(){
      return{
        searchVal:'',
        isClear:false,
        page:1,
        deduction:0,
        boneBean:0,
        dataList:[],
        listOpt:{
          preventDefault:true,
          pullDownRefresh: {
          	txt: '更新成功',
          	threshold: 40
          },
          pullUpLoad: {
          	txt: {
          		more: '加载更多',
          		noMore: '没有更多数据了',
          	},
          	threshold: 40,

          }
        }
      }
    },
    filters:{
      descFilter(val){
        if(val.length>15){
          return val.substr(0,15)+'...'
        }else{
          return val
        }
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
    mounted() {
      this.boneBean = this.$route.query.boneBean;
      this.deduction = this.$route.query.boneBean/100;
    },
    methods:{
      back() {
      	this.$router.go(-1); //返回上一层
      },
      clearVal(){
        this.searchVal = '';
      },
      search(){
        if(this.searchVal==''){
          alert('请先输入要搜索的关键词')
        }else{
          this.page = 1;
          this.getSearchData();
        }

      },
      xqLink(item){
        let self = this;
        this.$router.push({
          name:'exChangeXq',
          query:{
            cId:item.cId,
            boneBean:self.boneBean
          }

        })
      },
      getSearchData(){
        let self = this;
        this.axios.get(Api.userApi+'/boneBeanShop/selectCommodityBySearch',{
          params:{
            keyword:self.searchVal,
            userId:-1,
            page:self.page,
            rows:6
          }

        }).then(function(res) {

              if(res.data.code==1){

                setTimeout(() => {
                  self.dataList = res.data.data;
                	self.$refs.scroll.forceUpdate();
                	setTimeout(() => {
                		self.$refs.scroll.refresh();
                	}, 200)
                }, 500)

              }else{
                alert(res.data.msg);
                setTimeout(() => {
                	self.$refs.scroll.forceUpdate();
                	self.$refs.scroll.refresh();
                }, 500)
              }
        	}).catch(function(err) {
              alert(err)

        	});
      },
      onPullingDown(){
        this.page = 1;
        this.getSearchData();
      },
      onPullingUp(){
        let self = this;
        self.page++
        this.axios.get(Api.userApi+'/boneBeanShop/selectCommodityBySearch',{
          params:{
            keyword:self.searchVal,
            userId:-1,
            page:self.page,
            rows:6
          }

        }).then(function(res) {

              if(res.data.code==1){
                if(res.data.data.length>0){
                  setTimeout(() => {
                    self.dataList.push(...res.data.data);
                  	self.$refs.scroll.forceUpdate();
                  	setTimeout(() => {
                  		self.$refs.scroll.refresh();
                  	}, 200)
                  }, 500)
                }else{
                  setTimeout(() => {
                  	self.$refs.scroll.forceUpdate();
                  	self.$refs.scroll.refresh();

                  }, 500)
                }


              }else{
                alert(res.data.msg);
                setTimeout(() => {
                	self.$refs.scroll.forceUpdate();
                	self.$refs.scroll.refresh();
                }, 500)
              }
        	}).catch(function(err) {
              alert(err)
        	});
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
          height:65px;
          background:rgba(255,255,255,1);
          border:1px solid #e8e8e8;/*no*/
          border-radius: 35px;
          box-sizing:border-box;
          padding:0 20px;
          i{
            font-size:30px;
            color:#BBBBBB;
          }
          input{
            width:420px;
            font-size:26px;
            line-height:60px;
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
                width:150px;
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
      .searchTip{
        overflow:hidden;
        img{
          display:block;
          margin:100px auto 0 auto;
          width:410px;
          height:260px;
        }
        p{
          text-align: center;
          font-size:24px;
          color:#666;
          padding-top:50px;
        }
      }
    }
</style>
