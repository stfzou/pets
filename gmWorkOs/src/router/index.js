import Vue from 'vue'
import Router from 'vue-router'

import GmWorkLogin from '@/components/gmWorkOs/gmWorkLogin'
import AddBranch from '@/components/gmWorkOs/addBranch'
import BranchManage from '@/components/gmWorkOs/branchManage'
import AddStaff from '@/components/gmWorkOs/addStaff'
import StaffManage from '@/components/gmWorkOs/staffManage'
import MyArchives from '@/components/gmWorkOs/myArchives'




import WorkOsInfoList from '@/components/gmWorkOs/workOsInfoList'

import WorkOsMap from '@/components/gmWorkOs/workOsMap'
import WorkOsPcMap from '@/components/gmWorkOs/workOsPcMap'

import EditCustomer from '@/components/gmWorkOs/editCustomer'
import WorkOsChangePw from '@/components/gmWorkOs/workOsChangePw'
import StaffInfo from '@/components/gmWorkOs/staffInfo'

import EditStaff from '@/components/gmWorkOs/editStaff'
import VisitRecords from '@/components/gmWorkOs/visitRecords'
import ShopNameVisit from '@/components/gmWorkOs/shopNameVisit'
import AddVisitInfo from '@/components/gmWorkOs/addVisitInfo'
import VisitInfoList from '@/components/gmWorkOs/visitInfoList'
import WorkTable from '@/components/gmWorkOs/workTable'
import AddWorkTable from '@/components/gmWorkOs/addWorkTable'
import WorkTableXq from '@/components/gmWorkOs/workTableXq'

Vue.use(Router)
export default new Router({
	mode: 'hash',
    routes:[
		{
		  path:'',
		  redirect:'/workOsInfoList'
		},
		{
			path:'/gmWorkLogin',
			name:'gmWorkLogin',
			component:GmWorkLogin,
		},
    {
    	path:'/addBranch',
    	name:'addBranch',
    	component:AddBranch
    },
    {
    	path:'/branchManage',
    	name:'branchManage',
    	component:BranchManage

    },
    {
    	path:'/addStaff',
    	name:'addStaff',
    	component:AddStaff,
    },
    {
    	path:'/staffManage',
    	name:'staffManage',
    	component:StaffManage,
    },
    {
    	path:'/myArchives',
    	name:'myArchives',
    	component:MyArchives,
    },

    
    
    
		{
			path:'/staffInfo',
			name:'staffInfo',
			component:StaffInfo,
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
			path:'/editCustomer',
			name:'editCustomer',
			component:EditCustomer
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
