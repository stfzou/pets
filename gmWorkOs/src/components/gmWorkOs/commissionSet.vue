<template>
  <div class="commissionSet">
    <div class="login_nav">
    	<div class="back" @click="back"></div>
    	<div class="title">佣金设置</div>
    </div>
    <div class="setForm">
      <ul>
        <li class="flex_r_f_s">
          <p>商家注册奖励</p>
          <input type="number" @keydown="noNegative" v-model.number="shopRegisterReward">
          <span>元</span>
        </li>
        <li class="flex_r_f_s">
          <p>商家优惠券数量</p>
          <input type="number" @keydown="noNegative" v-model.number="shopCouponNum">
          <span>个</span>
        </li>
        <li class="flex_r_f_s">
          <p>商家优惠券达标奖励(1次)</p>
          <input type="number" @keydown="noNegative" v-model.number="shopCouponNumReward">
          <span>元</span>
        </li>
        <li class="flex_r_f_s">
          <p>商家首单成交金额</p>
          <input type="number" @keydown="noNegative" v-model.number="shopFirstDealMoney">
          <span>元</span>
        </li>
        <li class="flex_r_f_s">
          <p>商家首单成交奖励</p>
          <input type="number" @keydown="noNegative" v-model.number="shopFirstDealReward">
          <span>元</span>
        </li>
        <li class="flex_r_f_s">
          <p>商家交易提成比例</p>
          <input type="number" @change="rateRuler" v-model.number="shopDealCommissionRate">
          <span>%</span>
        </li>
        <li class="flex_r_f_s">
          <p>用户注册奖励</p>
          <input type="number" @keydown="noNegative" v-model.number="userRegisterReward">
          <span>元</span>
        </li>
        <li class="flex_r_f_s">
          <p>用户首单成交金额</p>
          <input type="number" @keydown="noNegative" v-model.number="userFirstDealMoney">
          <span>元</span>
        </li>
        <li class="flex_r_f_s">
          <p>用户首单成交奖励</p>
          <input type="number" @keydown="noNegative" v-model.number="userFirstDealReward">
          <span>元</span>
        </li>

      </ul>
      <div class="commitBox">
        <div class="commit flex_r_s_c" @click="commit">提交</div>
      </div>

    </div>
  </div>
</template>

<script>
   import Api from '../common/apj.js'
  export default{
    data(){
      return{
        shopRegisterReward:'',
        shopCouponNum:'',
        shopCouponNumReward:'',
        shopFirstDealMoney:'',
        shopFirstDealReward:'',
        shopDealCommissionRate:'',
        userRegisterReward:'',
        userFirstDealMoney:'',
        userFirstDealReward:'',
        networkRewardRulesId:''
      }
    },
    mounted() {
      this.getCommission();
    },
    methods:{
      back(){
      	this.$router.go(-1); //返回上一层
      },
      noNegative(e){
        //console.log(e)
        if(e.target.value<0){
          e.target.value = '';
        }

      },
      rateRuler(e){

        if(e.target.value<0){
          this.shopDealCommissionRate = '';
        }else if(e.target.value>=100){

          this.shopDealCommissionRate = 100;
          console.log(e.target.value>=100)
        }
      },
      getCommission(){
        let self = this;
        self.axios.get(Api.userApi + '/employee/system/selectNetworkRewardRules', {
          params: {
            networkId: JSON.parse(localStorage.getItem('userInfo')).network
          }
        }, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then((res)=>{
          if(res.data.code==1){
            //console.log(res)
            self.shopRegisterReward = self.valFilter(res.data.data.shopRegisterReward);
            self.shopCouponNum = self.valFilter(res.data.data.shopCouponNum);
            self.shopCouponNumReward = self.valFilter(res.data.data.shopCouponNumReward);
            self.shopFirstDealMoney = self.valFilter(res.data.data.shopFirstDealMoney);
            self.shopFirstDealReward = self.valFilter(res.data.data.shopFirstDealReward);
            self.shopDealCommissionRate = self.valFilter(res.data.data.shopDealCommissionRate);
            self.shopDealCommissionRate = self.floatFilter(self.shopDealCommissionRate*100);
            self.userRegisterReward = self.valFilter(res.data.data.userRegisterReward);
            self.userFirstDealMoney = self.valFilter(res.data.data.userFirstDealMoney);
            self.userFirstDealReward = self.valFilter(res.data.data.userFirstDealReward);
            self.networkRewardRulesId = res.data.data.networkRewardRulesId;
          }
        })
      },
      floatFilter(value,num){
         

        // num = num > 0 && num <= 20 ? num : 2;
        num = 1;
        value = parseFloat((value + "").replace(/[^\d\.-]/g, "")).toFixed(num) + ""; //将金额转成比如 123.45的字符串

        var valueArr = value.split(".")[0].split("") //将字符串的数变成数组

        const valueFloat = value.split(".")[1]; // 取到 小数点后的值

        let valueString = "";

        for (let i = 0; i < valueArr.length; i++) {

        valueString += valueArr[i] + ((i + 1) % 3 == 0 && (i + 1) != valueArr.length ? "," : ""); //循环 取数值并在每三位加个','

        }

        const money = valueString.split("").join("") + "." + valueFloat; //拼接上小数位

        return money


      },
      commit(){
        let self = this;
        self.axios.post(Api.staffApi + '/employee/system/updateNetworkRewardRules', this.qs.stringify({
          networkRewardRulesId:self.networkRewardRulesId,
          shopRegisterReward:self.numFilter(self.shopRegisterReward),
          shopCouponNum:self.numFilter(self.shopCouponNum),
          shopCouponNumReward:self.numFilter(self.shopCouponNumReward),
          shopFirstDealMoney:self.numFilter(self.shopFirstDealMoney),
          shopFirstDealReward:self.numFilter(self.shopFirstDealReward),
          shopDealCommissionRate:self.numFilter(self.shopDealCommissionRate)/100,
          userRegisterReward:self.numFilter(self.userRegisterReward),
          userFirstDealMoney:self.numFilter(self.userFirstDealMoney),
          userFirstDealReward:self.numFilter(self.userFirstDealReward)
        }), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then((res)=>{
          if(res.data.code==1){
            let toast = self.$createToast({
              txt: '编辑成功',
              type: 'correct'
            })
            toast.show()
            setTimeout(() => {
              self.$router.push({
                name: 'gmWorkHome'
              })

            },500)
          }else{
            alert(res.data.msg)
          }
        })
      },
      valFilter(val){
        if(val==0){
          return ''
        }else{
          return val
        }
      },
      numFilter(val){
        if(val==''){
          return 0
        }else{
          return val;
        }
      }
    }
  }
</script>

<style lang="scss">
    .commissionSet{
      .login_nav {
      		height: 42px;
      		padding: 22px 0;
      		position: relative;
      		border-bottom: 1px solid #e8e8e8;
      		.back {
      			background: url("../../assets/icon/backColory.png") no-repeat center 0;
      			background-size: cover;
      			width: 24px;
      			height: 40px;
      			position: absolute;
      			left: 20px;
      			top: 50%;
      			margin-top: -21px;
      		}

      		.title {
      			font-size: 30px;
      			color: #333;
      			line-height: 42px;
      			text-align: center;
      			span{
      				color: #ff523d;
      			}
      		}
      	}
  }
      .setForm{
        ul{
          padding-top:20px;
          li{
            padding:20px;
            box-sizing:border-box;
            input{
              border:1px solid #e8e8e8;/*no*/
              margin-left:30px;
              padding:10px;
              width:200px;
            }
            p{
              width:300px;
              text-align: justify;

            }
            span{
              margin-left:10px;
            }
          }
        }
        .commitBox{
          padding:50px 20px 30px 20px;
        }
        .commit{
          width:500px;
          height:60px;
          background:#ff523d;
          color:#fff;
          margin:0 auto;
          font-size:28px;
          border-radius:50px;
        }
      }
</style>
