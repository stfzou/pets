<template>
  <div class="payResWarp">
      <div class="payCnt flex_r_s_c">
           <img src="../../assets/payLoad.gif" alt="">
           <p>点击下方按钮，查询订单状态</p>
           <div class="queryOrder" @click="getOrderState">确定</div>
      </div>
  </div>
</template>

<script>
  import Api from '../common/apj.js'
  export default{
    data(){
      return{
        userId:'',
        payUrl:'',
        backUrl:'',
        out_trade_no:'',
        payStyle:''
      }
    },
    mounted() {
      this.userId = JSON.parse(localStorage.getItem('user')).userId;
      //alert(1)
      if(this.$store.state.orderInfo!=null){
        this.payUrl = this.$store.state.orderInfo.payUrl;
      }
      if(this.$store.state.orderInfo!=null){
        this.payStyle = this.$store.state.orderInfo.payStyle;
      }

      this.backUrl = this.$route.query.backUrl;
      this.out_trade_no = this.$route.query.out_trade_no;
      console.log(this.out_trade_no)
      this.$store.commit('setOrderInfo','')

      // this.getOrderState();
      if(this.payStyle==='wx'){

        this.wxPayWeb();
      }else if(this.payStyle==='ali'){
        // alert(this.payStyle)
        this.aliPayWeb()
      }


    },
    methods:{
      wxPayWeb(){
        window.location.href = this.payUrl
      },
      aliPayWeb(){

        const div = document.createElement('div');
        div.innerHTML = this.payUrl;
        document.body.appendChild(div);
        document.forms.punchout_form.submit();
      },
      getOrderState(){
        let self = this;
        //window.location.href = 'http://app.gutouzu.com/index.html#/paySus?type=a&oderNum=15743261458774899';
        //self.$router.push({name:'paySus',query:{type:'a',oderNum:'15743261458774899'}});
        //self.$router.push({name:'paySus',query:{type:'c',oderNum:'1574320031380'}});
        //self.$router.push({name:'paySus',query:{userId:'55',type:'gmCard'}});
        this.axios.post(Api.userApi + self.$route.query.orderApi, this.qs.stringify({
          out_trade_no: self.$route.query.out_trade_no
        }), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then((res) => {
          if (res.data.code == 1) {
              alert('订单支付成功')
              setTimeout(() => {
                window.location.href = self.$route.query.backUrl
              }, 500)
          }else{
            alert(res.data.msg)
          }
        })
      },
    }
  }
</script>

<style lang="scss">
    .payResWarp{
      height: 100%;
      width: 100%;
      .payCnt{
        height: 100%;
        width: 100%;
        flex-direction:column;
        p{
          padding-top: 50px;
          color: #333;
          font-size: 30px;
        }
        .queryOrder{
          width: 200px;
          background: #ff523d;
          color: #fff;
          font-size: 26px;
          text-align: center;
          line-height: 50px;
          margin-top: 50px;
          border-radius: 8px;
        }
      }
    }
</style>
