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
        component: () => import('../views/Home'),
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
      path: '/form-table',
      name: 'FormTable',
      component: Layout,
      redirect: '/form-table/table-classic',
      meta: {
        title: '表格&表单',
        icon: 'el-icon-ali-home'
      },
      children: [
        {
          path: 'table-classic',
          name: 'TableClassic',
          component: () => import('../views/form-table/TableClassic'),
          meta: {
            title: '综合表格'
          }
        },
        {
          path: 'form-list',
          name: 'FormList',
          component: () => import('../views/form-table/FormList'),
          meta: {
            title: '表单列表'
          }
        },
        {
          path: 'table-inline-edit',
          name: 'TableInlineEdit',
          component: () => import('../views/form-table/TableInlineEdit'),
          meta: {
            title: '行内编辑表格'
          }
        }
      ]
    },
    {
      path: '/editors',
      name: 'Editors',
      component: Layout,
      redirect: '/editors/markdown',
      meta: {
        title: '编辑器',
        icon: 'el-icon-ali-home'
      },
      children: [
        {
          path: 'markdown',
          name: 'Markdown',
          component: () => import('../views/editors/MarkdownEditor'),
          meta: {
            title: 'Markdown编辑器'
          }
        },
        {
          path: 'rich-text',
          name: 'RichText',
          component: () => import('../views/editors/RichTextEditor'),
          meta: {
            title: '富文本编辑器'
          }
        }
      ]
    },
    {
      path: '/tools',
      name: 'Tools',
      component: Layout,
      redirect: '/tools/image-upload',
      meta: {
        title: '组件',
        icon: 'el-icon-ali-home'
      },
      children: [
        {
          path: 'image-upload',
          name: 'ImageUpload',
          component: () => import('../views/tools/ImageUpload'),
          meta: {
            title: '图片上传'
          }
        },
        {
          path: 'transfer',
          name: 'Transfer',
          component: () => import('../views/tools/TransferPage'),
          meta: {
            title: '穿梭框'
          }
        },
        {
          path: 'count-to',
          name: 'CountTo',
          component: () => import('../views/tools/CountToPage'),
          meta: {
            title: '数字滚动'
          }
        }
      ]
    },
    {
      path: '/tree',
      name: 'Tree',
      component: Layout,
      redirect: '/tree',
      meta: {
        title: '树形结构',
        icon: 'el-icon-ali-home'
      },
      children: [
        {
          path: 'org-tree',
          name: 'OrgTree',
          component: () => import('../views/tree/OrgTree'),
          meta: {
            title: '组织树'
          }
        },
        {
          path: 'ele-tree',
          name: 'EleTree',
          component: () => import('../views/tree/EleTree'),
          meta: {
            title: '控件树'
          }
        }
      ]
    }
  ]
})
