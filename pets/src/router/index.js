import Vue from 'vue'
import Router from 'vue-router'
import Seller from '@/components/seller/seller'


Vue.use(Router)
export default new Router({
	mode: 'history',
  routes: [
    {
      path:'',
      component:Seller,
			children: [
				{
					path:'seller',
					component:Seller
				}
			]
    }
	]
})
