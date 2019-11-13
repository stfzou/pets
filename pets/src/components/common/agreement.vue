<template>
  <div class="agreement">
    <h1 class="agreementTitle">{{title}}</h1>
    <p v-html="agreementVal"></p>
  </div>
</template>

<script>
  import Api from '../common/apj.js'
  export default{
    data(){
      return{
        agreementVal:'',
        title:'',
        agreementId:''
      }

    },
    mounted() {
      this.agreementId = this.getUrlKey('agreementId');
      this.getAgreement();
    },
    methods:{
      getAgreement(){
        let self = this;
        this.axios.post(Api.userApi + '/protocol/m/selectProtocolById', this.qs.stringify({
          id:self.agreementId
        }), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then((res)=>{
          if(res.data.code==1){
            self.agreementVal = res.data.data.content;
            self.title = res.data.data.title;
          }else{
            alert(res.data.msg);
          }
        })
      },
      getUrlKey(name){
          return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[1].replace(/\+/g, '%20')) || null
      },
    }
  }
</script>

<style lang="scss">
  .agreement{
    padding:20px;
    background:#fff;
    .agreementTitle{
      font-size:36px;
      text-align: center;
      color:#000;
      font-weight:bold;
      padding:30px 0 50px 0;
    }
  }
</style>
