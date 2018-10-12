import Vue from 'vue'
import Router from 'vue-router'

import Guide from '@/components/view/guide'   //引导页
import Home from '@/components/view/home'     //Home页
import Index from '@/components/view/index'   //首页
import EducationNews from '@/components/view/educationNews'   //教育新闻
import educationNewsDetails from '@/components/view/educationNews-details'   //教育新闻详情
import educationUse from '@/components/view/educationUse'   //教育应用





Vue.use(Router)

export default new Router({
	// mode: 'history',	
	routes: [{
		path: '/',
		name: '引导页',
		component: Guide
	},{
		path: '/home',
		redirect: '/index',
		name: 'home',
		component: Home,
		children: [{
			path: '/index',
			name: '首页',
			component: Index
		},{
			path: '/educationNews',
			name: '教育新闻',
			component: EducationNews
		},{
			path: '/educationNews-details',
			name: '教育新闻详情',
			component: educationNewsDetails
		},{
			path: '/educationUse',
			name: '教育应用',
			component: educationUse
		}]
	}]
})