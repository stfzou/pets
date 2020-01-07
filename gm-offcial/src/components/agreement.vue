<template>
  <div class="agreement">
    <h1 class="agreementTitle">{{title}}</h1>
    <p v-html="agreementVal"></p>
  </div>
</template>

<script>
  import Api from '../api/api.js'
  export default{
    data(){
      return{
        agreementVal:'',
        title:'',
        agreementId:''
      }

    },
    watch: {
      $route( to , from ){
          this.agreementId = to.query.agreementId
          this.$router.go(0);
        }

    },
    mounted() {
      this.agreementId = this.getUrlKey('agreementId');
      this.getAgreement();
    },
    methods:{
      backTop () {
            const that = this
            let timer = setInterval(() => {
              let ispeed = Math.floor(-that.scrollTop / 5)
              document.documentElement.scrollTop = document.body.scrollTop = that.scrollTop + ispeed
              if (that.scrollTop === 0) {
                clearInterval(timer)
              }
       }, 16)
      },
      getAgreement(){
        let self = this;
        this.axios.post(Api.httpApi + '/protocol/m/selectProtocolById', this.qs.stringify({
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
            //alert(res.data.msg);
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
    padding-top:108px;
    background:#fff;
    width:100%;
    overflow:hidden;
    box-sizing:border-box;
    .agreementTitle{
      font-size:36px;
      text-align: center;
      color:#000;
      font-weight:bold;
      padding:30px 0 50px 0;
    }
    p{
      width:960px;
      margin:0 auto;
      text-align:left;
    }
  }
</style>
