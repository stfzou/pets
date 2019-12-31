import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home'
import Index from '@/components/index'
import CouponList from '@/components/couponList'
import Activity from '@/components/activity'
import Cooper from '@/components/cooper'
import WqSelect from '@/components/wqSelect'
import DynamicDetails from '@/components/dynamicDetails'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component:Home
    },
    {
      path: '/home',
      name: 'home',
      component:Home,
      children:[
        {
          path: '/index',
          name: 'index',
          component:Index
        },
        {
          path:'/couponList',
          name:'couponList',
          component:CouponList
        },
        {
          path:'/activity',
          name:'activity',
          component:Activity
        },
        {
          path:'/cooper',
          name:'cooper',
          component:Cooper
        },
        {
          path:'/wqSelect',
          name:'wqSelect',
          component:WqSelect
        },
        {
          path:'/dynamicDetails',
          name:'dynamicDetails',
          component:DynamicDetails
        }
      ]
    }


  ]
})
