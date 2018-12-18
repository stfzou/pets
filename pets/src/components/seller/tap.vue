<template>
	
	<div class="tap_warp">
		<cube-tab-bar v-model="selectedLabel"
                    show-slider
                    :use-transition="disabled"
                    ref="tabNav"
                    :data="tabLabels">
        </cube-tab-bar>
	    <div class="tab-container">
		   <cube-slide
			  ref="slide"
			  :loop="loop"
			  :initial-index="initialIndex"
			  :auto-play="autoPlay"
			  :show-dots="showDots"
			  :options="slideOptions"
			  @scroll="scroll"
			  @change="changePage"
			>
			
					<cube-slide-item>
						<cube-scroll :options="scrollOptions">
							1</br>1</br>1</br>1</br>1</br>
						</cube-scroll>
					</cube-slide-item>
					<cube-slide-item>
						<cube-scroll :options="scrollOptions">
							2</br>2</br>2</br>2</br>2</br>
						</cube-scroll>
					</cube-slide-item>
					<cube-slide-item>
						<cube-scroll :options="scrollOptions">
							3</br>3</br>3</br>3</br>3</br>
						</cube-scroll>
					</cube-slide-item>
					
		</cube-slide>
	  </div>
	</div>
	
</template>

<script>
	export default {
		data() {
			return {
        selectedLabel: '关注',
        disabled:true,
        tabLabels: [{
          label: '关注'
        }, {
          label: '推荐'
        }, {
          label: '热榜'
        }],
        loop: false,
        autoPlay: false,
        showDots: false,
        slideOptions: {
          listenScroll: true,
          probeType: 3,
          /* lock y-direction when scrolling horizontally and  vertically at the same time */
          directionLockThreshold: 0
        },
        scrollOptions: {
          /* lock x-direction when scrolling horizontally and  vertically at the same time */
          directionLockThreshold: 0
        }
      }
    },
    methods: {
      changePage (current) {
        this.selectedLabel = this.tabLabels[current].label
        
      },
      scroll (pos) {
        const x = Math.abs(pos.x)
        const tabItemWidth = this.$refs.tabNav.$el.clientWidth
        const slideScrollerWidth = this.$refs.slide.slide.scrollerWidth
        const deltaX = x/slideScrollerWidth * tabItemWidth
        this.$refs.tabNav.setSliderTransform(deltaX)
		
      }
    },
    computed: {
      initialIndex () {
         let index = 0
         index = this.tabLabels.findIndex(item => item.label === this.selectedLabel)
         return index;
      }
	  
	  
    },
   	
	}
</script>

<style lang="scss">
	
</style>
