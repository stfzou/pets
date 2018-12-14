<template>
	<div class="seller_eval">
		<div class="eval_nav flex_r_s_b">
			<router-link @click.native="select(index)" 
			:class="{'active':curunt == index}"
			:to="item.link" :key="index" v-for="(item,index) in evalNav">
				<span class="span1">{{item.text}}</span>
				<span class="span2">{{item.num}}</span>
			</router-link>
		</div>
		<div class="line"></div>
		<div class="eval_content">
			<cube-scroll ref="scroll">
				<transition name="fade">
					<router-view></router-view>
				</transition>
			</cube-scroll>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				evalNav:[
					{
						link:{name:'evalConten',query: { userId:1}},
						text:'全部',
						num:453
					},
					{
						link:{name:'evalConten',query: { userId:2}},
						text:'有图',
						num:26
					},
					{
						link:{name:'evalConten',query: { userId:3}},
						text:'好评',
						num:365
					},
					{
						link:{name:'evalConten',query: { userId:4}},
						text:'中评',
						num:35
					},
					{
						link:{name:'evalConten',query: { userId:5}},
						text:'差评',
						num:4
					}
					
				],
				curunt:0
			};
		},
		created(){
			setTimeout(()=>{
				this.$refs.scroll.refresh();
			},100)
		},
		methods:{
			select(index){
				this.curunt = index;
			}
		}
	
	}
</script>

<style lang="scss">
	.seller_eval{
		.eval_nav{
			margin-bottom: 1px;
			padding: 30px 20px 0 20px;
			box-sizing: border-box;
			flex-wrap: wrap;
			background:#fff;
			a{
				width: 149px;
				height: 38px;
				border:1px solid #999;/*no*/
				border-radius: 26px;
				text-align: center;
				line-height: 38px;
				margin-bottom: 32px;
			}
			a.active{
				color: #FF523D;
				border:1px solid #FF523D;/*no*/
			}
		}
		.line{
			height: 10px;
			background: #e8e8e8;
		}
		.eval_content{
			position: absolute;
			width: 100%;
			height: 700px;
			
		}
	}
</style>
