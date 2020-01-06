import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home'
import Index from '@/components/index'
import CouponList from '@/components/couponList'
import Activity from '@/components/activity'
import Cooper from '@/components/cooper'
import WqSelect from '@/components/wqSelect'
import DynamicDetails from '@/components/dynamicDetails'
import Exchange from '@/components/exchange'
import EditExChange from '@/components/editExChange'
import DynamicVido from '@/components/dynamicVido'
import ActivityDetails from '@/components/activityDetails'
import CouponDetails from '@/components/CouponDetails'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component:Home
    },
    {
      path:'/exchange',
      name:'exchange',
      component:Exchange
    },
    {
      path:'/editExChange',
      name:'editExChange',
      component:EditExChange
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
          path:'/couponDetails',
          name:'couponDetails',
          component:CouponDetails
        },
        {
          path:'/activity',
          name:'activity',
          component:Activity
        },
        {
          path:'/activityDetails',
          name:'activityDetails',
          component:ActivityDetails
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
        },
        {
          path:'/dynamicVido',
          name:'dynamicVido',
          component:DynamicVido
        }
      ]
    }


  ]
})
