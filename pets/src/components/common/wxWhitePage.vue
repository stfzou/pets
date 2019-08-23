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
      window.location.href = this.$router.query.wxPayBackUrl

    },
  }
</script>

<style lang="scss">
</style>
