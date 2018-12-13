import Vue from 'vue'
import Router from 'vue-router'
import Seller from '@/components/seller/seller'
import SellerGoods from '@/components/seller/sellerGoods.vue'
import SellerEval from '@/components/seller/sellerEvaluate.vue'


Vue.use(Router)
export default new Router({
	mode: 'history',
    routes:[
		{
		  path:'',
		  redirect:'/sellerGoods'
		},
		{
			path:'/seller',
			component:Seller,
			children:[
				{
					name:'sellerGoods',
					path:'sellerGoods',
					component:SellerGoods
				},
				{
					name:"sellerEval",
					path:'sellerEval',
					component:SellerEval
				}
			]
		}
	]
})
