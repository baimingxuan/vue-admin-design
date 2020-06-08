import Vue from 'vue'
import Router from 'vue-router'
import Layout from '../components/Layout/index'

Vue.use(Router)

export default new Router({
  mode: 'history',
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
      redirect: '/Home',
      children: [{
        path: 'Home',
        name: 'Home',
        component: () => import('../views/form-table/FormList'),
        meta: {
          title: '首页',
          icon: 'el-icon-ali-home',
          affix: true
        }
      }]
    },
    {
      path: 'https://github.com/LoveHins/vue-admin-system',
      name: 'doc',
      component: Layout,
      meta: {
        title: '文档',
        icon: 'el-icon-ali-home'
      }
    },
    {
      path: '/ico',
      name: 'ico',
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
    },
    {
      path: '/tools',
      name: 'tools',
      component: Layout,
      meta: {
        title: '组件',
        icon: 'el-icon-ali-home'
      },
      children: [{
        path: 'avatar-upload',
        name: 'tools-avatar-upload',
        component: () => import('../views/tools/ImageUpload'),
        meta: {
          title: '头像上传'
        }
      }]
    },
    {
      path: '/in',
      name: 'in',
      component: Layout,
      children: [{
        path: 'i18n',
        name: 'i18n',
        component: () => import('../views/i18n'),
        meta: {
          title: '文档',
          icon: 'el-icon-ali-home'
        }
      }]
    }
  ]
})
