<template>
    <div class="amap-page-container">
      <el-amap vid="amap" :zoom="zoom" :center="center" class="amap-demo">
        <el-amap-ground-image :key="index" v-for="(groundimage,index) in groundimages" :url="groundimage.url" :bounds="groundimage.bounds" :events="groundimage.events.click"></el-amap-ground-image>
      </el-amap>
    </div>
  </template>

  <style>
		.amap-page-container{
			height: 500px;
			width: 500px;
		}
    .amap-demo {
      height: 500px;
			width: 500px;
    }
  </style>

  <script>
    module.exports = {
      data () {
        return {
          zoom: 7,
          center: [121.5273285, 31.21515044],
          groundimages: [
            {
              url: 'sellerPc/src/assets/head_icon.png',
              bounds: [[121.5273285, 31.21515044], [122.9273285, 32.31515044]],
              events: {
                click() {
                  alert('click groundimage');
                }
              }
            }
          ]
        }
      }
    };
</script>