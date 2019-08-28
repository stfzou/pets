<template>
  <div></div>
</template>

<script>
  export default{
    data(){
      return {

      }
    },
    mounted() {
      window.location.href = this.$route.params.wxPayBackUrl
      console.log(this.$route.params.wxPayBackUrl)
    },
  }
</script>

<style lang="scss">
</style>
