import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

// 主页
import homePage from '@/components/homePage'
import homePageStu from '@/components/homePageStu'

// 主页路由开始
import index from '@/components/index/index'
import repayment from '@/components/repayment/repayment'
import explain from '@/components/explain/explain'
import statistics from '@/components/statistics/statistics'


// 学校端口
import compusIndex from '@/components/compusIndex/compusIndex'
import loanInfo from '@/components/loanInfo/loanInfo'
import questions from '@/components/questions/questions'

// 错误
import qx1 from '@/components/500'
import qx2 from '@/components/501'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '教育局主页',
      component: homePage,
      children : [
        {
        path: 'index',
        name: '主页',
        component: index,
          meta: {
            type: ['教育局'],
          }
      },
        {
          path: 'repayment',
          name: '预约统计',
          component: repayment,
          meta: {
            type: ['教育局'],
          }
        },
        {
          path: 'explain',
          name: '还款提醒',
          component: explain,
          meta: {
            type: ['教育局'],
          }
        },
        {
          path: 'statistics',
          name: '问题解答',
          component: statistics,
          meta: {
            type: ['教育局'],
          }
        },
      ]
    },
    {
      path: '/',
      name: '主页',
      component: homePageStu,
      children : [
        {
          path: 'compusIndex',
          name: 'compusIndex',
          component: compusIndex,
          meta: {
            type: ['学生'],
          }
        },
        {
          path: 'loanInfo',
          name: '还款信息',
          component: loanInfo,
          meta: {
            type: ['学生'],
          }
        },
        {
          path: 'questions',
          name: '提问',
          component: questions,
          meta: {
            type: ['学生'],
          }
        },
      ]
    },
    {
      path: '/500',
      name: '进入系统',
      component: qx1,
    },
    {
      path: '/501',
      name: '访问限制',
      component: qx2,
    }
  ]
})
