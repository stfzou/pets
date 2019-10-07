<template>
	<div class="authorPets">
		<div class="authorPetsList">
			<cube-scroll ref="scroll" :options="options" @pulling-up="onPullingUp" @pulling-down="onPullingDown">
			<div class="authorPetsItem flex_r_s_b" v-for="item in petList">
				<div class="pet-img">
					<img :src="item.petHeadImg" alt="">
				</div>
				<div class="pet-info">
					<div class="petName">{{item.petName}}</div>
					<div class="yanzhi flex_r_f_s">
						<img src="../../assets/footprint.png" alt="">
						<span>颜值  {{item.score}}</span>
					</div>
					<div class="pingzhong flex_r_f_s">
						<div class="pz flex_r_f_s">
							<img src="../../assets/icon_pinzhong.png" alt="">
							<span>{{item.petBreedName}}</span>
						</div>
						<div class="shengri flex_r_f_s" v-if="item.age!=''">
							<img src="../../assets/icon_shengri.png" alt="">
							<span>{{item.age}}岁</span>
						</div>
						<div class="xingbie flex_r_f_s" v-if="item.sex!=''">
							<img src="../../assets/icon_xingbie.png" alt="">
							<span>{{item.sex | sexFilter}}</span>
						</div>
						<div class="kg flex_r_f_s" v-if="item.weight!=''">
							<img src="../../assets/icon_tizhong.png" alt="">
							<span>{{item.weight}}kg</span>
						</div>
					</div>
					<div class="pet-tag flex_r_f_s">
						<img src="../../assets/icon_biaoqian.png" alt="">
						<div class="tagList flex_r_f_s" v-show="item.petLabels.length>0">
							<span v-for="label in item.petLabels">{{label}}</span>
						</div>
					</div>
					<div class="pet-describe" v-if="item.comment!=''">
						<span>
							{{item.comment}}
						</span>
						<div class="triangle-up"></div>
					</div>
				</div>
			</div>
			</cube-scroll>
		</div>
		<div class="authorPetsList flex_r_s_c" v-if="isLoading">
			<cube-loading :size="30"></cube-loading>
		</div>

	</div>
</template>

<script>
	import Api from '../common/apj.js'
	export default{
		data(){
			return{
				arr:[1,2,3,4,5],
        isLoading:true,
        aId:'',
				options: {
					pullDownRefresh: {
						txt: '更新成功',
						threshold: 40
					},
					pullUpLoad: {
						txt: {
							more: '加载更多',
							noMore: '没有更多数据了',
						},
						threshold: 40,

					}
				},
				petList:[],
				page:0
			}
		},
		mounted() {
      this.getUrlData();
			this.getPets();
		},
		methods:{
      showToastType() {
        const toast = this.$createToast({
          txt: 'TA还没有添加宠物',
          type: 'warn'
        })
        toast.show()
      },
      getUrlData() { // 截取url中的数据
      	let tempStr = window.location.href;
      	/**
      	 * tempArr 是一个字符串数组 格式是["key=value", "key=value", ...]
      	 */
      	let returnArr = {};
      	let urlArr = tempStr.split('?');
      	if(urlArr){
      	  urlArr.forEach((e)=>{

      	      if(e.indexOf('=')>-1){

      	        returnArr[e.split('=')[0]] = e.split('=')[1];
      	      }

      	  })
      	}
      	/*输出日志*/
      	if(returnArr.aId!=undefined){
      		//localStorage.setItem('Aid',JSON.stringify(returnArr.aId));
          this.aId = returnArr.aId;
      	}
      },
			getPets(){
				let self = this;
        self.page = 1;
				self.axios.get(Api.trendApi + '/userPet/selectUserPet', {
					params: {
						userId: self.aId,
						page:1,
						rows:5
					}
				}, {
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					}
				}).then((res)=>{
					if(res.data.code == 1){
            if(res.data.data.length<1){
              self.isLoading=false;
              self.showToastType();
            }else{
               setTimeout(()=>{
              	 self.petList = res.data.data;
                 self.$refs.scroll.forceUpdate();
              	 setTimeout(()=>{
              	 	  self.$refs.scroll.refresh();
              	 },100);
              },500);
            }
					}else{
						alert(res.data.msg);
					}
				})
			},
			onPullingDown() {
			// 模拟更新数据
				this.getPets();

			},
			onPullingUp() {
			// 模拟更新数据

				let self = this;
				this.page++;
				self.axios.get(Api.trendApi + '/userPet/selectUserPet', {
					params: {
						userId: self.aId,
						page:self.page,
						rows:5
					}
				}, {
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					}
				}).then((res)=>{
					if(res.data.code == 1){

						if(res.data.data.length>0){

							setTimeout(()=>{
                self.$refs.scroll.forceUpdate();
                self.petList.push(...res.data.data)
								setTimeout(()=>{
									self.$refs.scroll.refresh();
								},500)
							},800)

						}else{
							setTimeout(()=>{
								self.$refs.scroll.forceUpdate();
                self.$refs.scroll.refresh();
							},500)
						}
					}else{
						alert(res.data.msg);
            self.$refs.scroll.forceUpdate();
					}
				})


			},
		},

		filters:{
			sexFilter(val){
				if(val == 1){
					return 'DD'
				}else if(val == 2){
					return 'MM'
				}
			}
		}
	}
</script>

<style lang="scss">
	.authorPets{
		.authorPetsList{
			padding: 0 20px;
      height: 800px;
      background:#fff;
      overflow: hidden;
      .cube-pullup-wrapper{
        padding-top: 20px;
      }
      .cube-pullup-wrapper .before-trigger{
        padding: 0;
        height: 50px;
        line-height: 50px;
      }
			.authorPetsItem{
				padding: 30px 0;
				align-items:flex-start;
				border-bottom: 1px solid #e8e8e8;
				.pet-img{
					width: 80px;
					height: 80px;
					border-radius: 50%;
					background: #FFDFDF;
					img{
						width: 80px;
						height: 80px;
						border-radius: 50%;
            object-fit: cover;
					}
				}
				.pet-info{
					width: 580px;
					.petName{
						font-size: 28px;
						color: #ff523d;
						height: 42px;
						line-height: 42px;
					}
					.yanzhi{
						margin-top: 20px;
						img{
							width: 22px;
							margin-right: 10px;
						}
						span{
							font-size: 24px;
							color: #000;
						}
					}
					.pingzhong{
						margin-top: 20px;

						div{
							float: left;
							width: initial;
							margin-left: 60px;
							img{
								margin-right: 10px;
							}
						}
						span{
							font-size: 24px;
							color: #000;
						}
						.pz{
							margin: 0;
							img{
								width: 22px;

							}

						}
						.shengri{
							img{
								width: 8px;
							}
						}
						.xingbie{
							img{
								width: 22px;
							}
						}
						.kg{
							img{
								width: 20px;
							}
						}
					}
					.pet-tag{
						margin-top: 20px;
						img{
							width: 22px;
							margin-right: 10px;
						}
						.tagList{
							flex-wrap: wrap;
							span{
								margin-bottom: 10px;
								font-size: 24px;
								color: #333;
								border: 1px solid #e8e8e8;
								border-radius:18px;
								padding: 5px 15px;
								margin-right: 20px;
							}
						}

					}
					.pet-describe{
						margin-top: 10px;
						padding: 10px 20px;
						background: #ff523d;
						color: #fff;
						font-size: 24px;
						line-height: 36px;
						border-radius:6px;
						position: relative;
						.triangle-up{
							width:0;
							height:0;
							border-left:10px solid transparent;
							border-right:10px solid transparent;
							border-bottom:12px solid #ff523d;
							position: absolute;
							top: -8px;
							left: 10px;
						}
					}
				}
			}
		}
	}
</style>
