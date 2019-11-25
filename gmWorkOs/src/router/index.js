import Vue from 'vue'
import Router from 'vue-router'

import GmWorkLogin from '@/components/gmWorkOs/gmWorkLogin'
import AddBranch from '@/components/gmWorkOs/addBranch'
import BranchManage from '@/components/gmWorkOs/branchManage'
import AddStaff from '@/components/gmWorkOs/addStaff'
import StaffManage from '@/components/gmWorkOs/staffManage'
import MyArchives from '@/components/gmWorkOs/myArchives'
import AddMarketingPlan from '@/components/gmWorkOs/addMarketingPlan'
import AddGmVisitInfo from '@/components/gmWorkOs/addGmVisitInfo'
import SelectAddr from '@/components/gmWorkOs/selectAddr'
import GmWorkTable from '@/components/gmWorkOs/gmWorkTable'
import GmWorkTableXq from '@/components/gmWorkOs/gmWorkTableXq'
import VisitXq from '@/components/gmWorkOs/visitXq'
import GmVisitRecords from '@/components/gmWorkOs/gmVisitRecords'
import AddGmWorkTable from '@/components/gmWorkOs/addGmWorkTable'
import BusinessManage from '@/components/gmWorkOs/businessManage'
import MarketPlanManage from '@/components/gmWorkOs/marketPlanManage'
import WorkBill from '@/components/gmWorkOs/workBill'
import GmWorkHome from '@/components/gmWorkOs/gmWorkHome'


import WorkOsInfoList from '@/components/gmWorkOs/workOsInfoList'
import WorkOsMap from '@/components/gmWorkOs/workOsMap'
import WorkOsPcMap from '@/components/gmWorkOs/workOsPcMap'
import EditCustomer from '@/components/gmWorkOs/editCustomer'
import WorkOsChangePw from '@/components/gmWorkOs/workOsChangePw'
import StaffInfo from '@/components/gmWorkOs/staffInfo'
import EditStaff from '@/components/gmWorkOs/editStaff'
import ShopNameVisit from '@/components/gmWorkOs/shopNameVisit'



Vue.use(Router)
export default new Router({
	mode: 'hash',
    routes:[
		{
		  path:'',
		  redirect:'/gmWorkHome'
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
      path:'/addMarketingPlan',
      name:'addMarketingPlan',
      component:AddMarketingPlan,
    },
    {
      path:'/addGmVisitInfo',
      name:'addGmVisitInfo',
      component:AddGmVisitInfo,
    },
    {
      path:'/selectAddr',
      name:'selectAddr',
      component:SelectAddr,
    },
    {
      path:'/gmWorkTable',
      name:'gmWorkTable',
      component:GmWorkTable,
    },
    {
      path:'/gmWorkTableXq',
      name:'gmWorkTableXq',
      component:GmWorkTableXq,
    },
    {
      path:'/visitXq',
      name:'visitXq',
      component:VisitXq,
    },
    {
      path:'/gmVisitRecords',
      name:'gmVisitRecords',
      component:GmVisitRecords,
    },
    {
      path:'/addGmWorkTable',
      name:'addGmWorkTable',
      component:AddGmWorkTable,
    },
    {
      path:'/businessManage',
      name:'businessManage',
      component:BusinessManage,
    },
    {
      path:'/marketPlanManage',
      name:'marketPlanManage',
      component:MarketPlanManage,
    },
    {
     path:'/workBill',
     name:'workBill',
     component:WorkBill
    },
    {
      path:'/gmWorkHome',
      name:'gmWorkHome',
      component:GmWorkHome
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
      path:'/shopNameVisit',
      name:'shopNameVisit',
      component:ShopNameVisit,

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
