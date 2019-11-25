<template>
  <div class="advertisement">

    <div v-html="amCnt"></div>

  </div>
</template>

<script>
  import Api from '../common/apj.js'
  export default{
    data(){
      return{
        amCnt:'',
        amId:''
      }
    },
    mounted() {
      this.amId = this.getUrlKey('amId')
      this.getAm();
    },
    methods:{
      getAm(){
        let self = this;
        this.axios.post(Api.trendApi + '/model/selectAdById', this.qs.stringify({
            adId:self.amId
        }), {
        	headers: {
        		'Content-Type': 'application/x-www-form-urlencoded'
        	}
        }).then((res)=>{
          if(res.data.code==1){
            self.amCnt = res.data.data.content;
          }else{
            alert(res.data.msg)
          }

        })
      },
      getUrlKey(name){
          return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[1].replace(/\+/g, '%20')) || null
      }
    }
  }
</script>

<style lang="scss">
  .advertisement{

  }
</style>
