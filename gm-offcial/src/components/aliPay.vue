<template>
    <div v-html="html"></div>
</template>

<script>
  import Api from '../api/api.js'
  export default {
    data(){
      return{
        html:'',
        couponId:''
      }
    },
    methods:{
      aliPay(){
        let self = this;
        self.axios.post(Api.httpApi + '/couponOrder/ali/pageWebPay', self.qs.stringify({
        	userId:JSON.parse(localStorage.getItem('user')).userId,
        	couponId: self.couponId

        }), {
        	headers: {
        		'Content-Type': 'application/x-www-form-urlencoded'
        	}
        }).then(res=>{
          if(res.data.code==1){
            console.log(res)
            self.html = res.data.data.from;
            self.$nextTick(() => {
              document.forms[0].submit()
            })
          }else{
            alert(res.data.msg)
          }
        })
      }
    },
    mounted(){
      this.couponId = this.$route.query.couponId;
      this.aliPay();
    }
  }
</script>
