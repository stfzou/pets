import Vue from 'vue'
import Router from 'vue-router'

import WorkOsLogin from '@/components/workOs/workOsLogin'
import WorkOsInfoList from '@/components/workOs/workOsInfoList'
import WorkOsCustomer from '@/components/workOs/workOsCustomer'
import WorkOsMap from '@/components/workOs/workOsMap'
import WorkOsPcMap from '@/components/workOs/workOsPcMap'
import AddCustomer from '@/components/workOs/AddCustomer'
import EditCustomer from '@/components/workOs/editCustomer'
import WorkOsChangePw from '@/components/workOs/workOsChangePw'
import StaffInfo from '@/components/workOs/staffInfo'
import AddStaff from '@/components/workOs/addStaff'
import EditStaff from '@/components/workOs/editStaff'
import VisitRecords from '@/components/workOs/visitRecords'
import ShopNameVisit from '@/components/workOs/shopNameVisit'
import AddVisitInfo from '@/components/workOs/addVisitInfo'
import VisitInfoList from '@/components/workOs/visitInfoList'
import WorkTable from '@/components/workOs/workTable'
import AddWorkTable from '@/components/workOs/addWorkTable'
import WorkTableXq from '@/components/workOs/workTableXq'

Vue.use(Router)
export default new Router({
	mode: 'history',
    routes:[
		{
		  path:'',
		  redirect:'/workOsInfoList'
		},
		{
			path:'/workOsLogin',
			name:'workOsLogin',
			component:WorkOsLogin,
		},
		{
			path:'/staffInfo',
			name:'staffInfo',
			component:StaffInfo,
		},
		{
			path:'/addStaff',
			name:'addStaff',
			component:AddStaff,
		},
		{
			path:'/editStaff',
			name:'editStaff',
			component:EditStaff
		},
		{
			path:'/workOsChangePw',
			name:'workOsChangePw',
			component:WorkOsChangePw,
		},
    {
      path:'/visitRecords',
      name:'visitRecords',
      component:VisitRecords,
    },
    {
      path:'/shopNameVisit',
      name:'shopNameVisit',
      component:ShopNameVisit,

    },
    {
      path:'/addVisitInfo',
      name:'addVisitInfo',
      component:AddVisitInfo,
    },
    {
      path:'/visitInfoList',
      name:'visitInfoList',
      component:VisitInfoList,
    },
    {
      path:'/workTable',
      name:'workTable',
      component:WorkTable,
      meta:{
        keepAlive:true
      }
    },
    {
      path:'/workTableXq',
      name:'workTableXq',
      component:WorkTableXq
    },
    {
      path:'/addWorkTable',
      name:'addWorkTable',
      component:AddWorkTable,
    },
		{
			path:'/workOsInfoList',
			name:'workOsInfoList',
			component:WorkOsInfoList,

		},
		{
			path:'/addCustomer',
			name:'addCustomer',
			component:AddCustomer
		},
		{
			path:'/editCustomer',
			name:'editCustomer',
			component:EditCustomer
		},
		{
			path:'/workOsCustomer',
			name:'workOsCustomer',
			component:WorkOsCustomer

		},
		{
			path:'/workOsMap',
			name:'workOsMap',
			component:WorkOsMap,

		},
		{
			path:'/workOsPcMap',
			name:'workOsPcMap',
			component:WorkOsPcMap,
		},
	]
})
