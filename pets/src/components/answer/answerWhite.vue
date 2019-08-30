<template>
  <div></div>
</template>

<script>
  import Api from '../common/apj.js'
  export default {
    data() {
      return {

      }
    },
    mounted() {
      this.getQid();
    },
    methods: {
      getQid() {
        let self = this;
        this.axios.get(Api.userApi + '/tasteTest/selectQuestionSimpleInfoByRandom', {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          }).then(function(res) {
              if(res.data.code==1){
                if(res.data.data.type==2){
                  self.$router.push({
                    name:'questionTwo',
                    query:{
                      qId:res.data.data.questionId
                    }
                  })
                }else{
                  self.$router.push({
                    name:'questionOne',
                    query:{
                      qId:res.data.data.questionId
                    }
                  })
                }
              }

          }).catch(function(error) {
            console.log(error);
          });
      }
    }
  }
</script>

<style>
</style>
