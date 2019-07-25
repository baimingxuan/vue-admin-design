import Vue from 'vue'
import Router from 'vue-router'
import Layout from '../components/Layout/index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/404',
      component: () => import('../views/404'),
      hidden: true
    },
    {
      path: '/',
      name: 'Layout',
      component: Layout,
      children: [{
        path: 'home',
        name: 'home',
        component: () => import('../views/home'),
        meta: {
          title: '首页',
          icon: 'el-icon-ali-home'
        }
      }]
    },
    {
      path: '/',
      name: 'Layout',
      component: Layout,
      children: [{
        path: 'document',
        name: 'document',
        component: () => import('../views/document'),
        meta: {
          title: '文档',
          icon: 'el-icon-ali-home'
        }
      }]
    },
    {
      path: '/',
      name: 'Layout',
      component: Layout,
      children: [{
        path: 'package',
        name: 'package',
        component: () => import('../views/package'),
        meta: {
          title: '组件',
          icon: 'el-icon-ali-home'
        }
      }]
    },
    {
      path: '/',
      name: 'Layout',
      component: Layout,
      children: [{
        path: 'icons',
        name: 'icons',
        component: () => import('../views/icons'),
        meta: {
          title: '图标',
          icon: 'el-icon-ali-home'
        }
      }]
    }
  ]
})
