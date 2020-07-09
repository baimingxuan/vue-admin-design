import Vue from 'vue'
import Router from 'vue-router'
import Layout from '../layout'

Vue.use(Router)

/**
 * hidden: true                  如果设置为 true，该项菜单将不会显示在菜单栏中(默认为 false)
 * meta : {
    title: 'title'               菜单名
    icon: 'icon-name'            图标名
    fixed: true                  如果设置为 true，该项 tag 将一直存在 tag 栏中(默认为 false)
  }
 * */

export default new Router({
  routes: [
    {
      path: '/login',
      component: () => import('../views/Login'),
      hidden: true
    },
    {
      path: '/404',
      component: () => import('../views/404'),
      hidden: true
    },
    {
      path: '/',
      name: 'Layout',
      component: Layout,
      redirect: '/home',
      children: [{
        path: 'home',
        name: 'Home',
        component: () => import('../views/Home'),
        meta: {
          title: '首页',
          icon: 'vue-sys-icon-index',
          fixed: true
        }
      }]
    },
    {
      path: 'https://github.com/LoveHins/vue-admin-system',
      name: 'doc',
      component: Layout,
      meta: {
        title: '文档',
        icon: 'vue-sys-icon-wendang'
      }
    },
    {
      path: '/form-table',
      name: 'FormTable',
      component: Layout,
      redirect: '/form-table/table-classic',
      meta: {
        title: '表格&表单',
        icon: 'vue-sys-icon-biaoge'
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
        icon: 'vue-sys-icon-bianjiqi'
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
          name: 'ImageRichText',
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
        icon: 'vue-sys-icon-zujian'
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
          path: 'drag',
          name: 'Drag',
          component: () => import('../views/tools/Drag'),
          redirect: '/tools/drag/drag-list',
          meta: {
            title: '拖拽'
          },
          children: [
            {
              path: 'drag-list',
              name: 'DragList',
              component: () => import('../views/tools/Drag/DragList'),
              meta: {
                title: '列表拖拽'
              }
            },
            {
              path: 'vue-drr',
              name: 'VueDrr',
              component: () => import('../views/tools/Drag/VueDrrTool'),
              meta: {
                title: '组件拖拽'
              }
            }
          ]
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
      path: '/image',
      name: 'Image',
      component: Layout,
      redirect: '',
      meta: {
        title: '图片处理',
        icon: 'vue-sys-icon-picture'
      },
      children: [
        {
          path: 'image-cropper',
          name: 'ImageCropper',
          component: () => import('../views/image/ImageCropper'),
          meta: {
            title: '图片裁剪'
          }
        },
        {
          path: 'image-synthesizer',
          name: 'ImageSynthesizer',
          component: () => import('../views/image/ImageSynthesizer'),
          meta: {
            title: '图片合成'
          }
        }
      ]
    },
    {
      path: '/tree',
      name: 'Tree',
      component: Layout,
      redirect: '/tree/org-tree',
      meta: {
        title: '树形结构',
        icon: 'vue-sys-icon-shuxing'
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
    },
    {
      path: '/excel',
      name: 'Excel',
      component: Layout,
      redirect: '/excel/export-excel',
      meta: {
        title: 'Excel',
        icon: 'vue-sys-icon-excel'
      },
      children: [
        {
          path: 'export-excel',
          name: 'ExportExcel',
          component: () => import('../views/excel/ExportExcel'),
          meta: {
            title: '导出Excel'
          }
        },
        {
          path: 'import-excel',
          name: 'ImportExcel',
          component: () => import('../views/excel/ImportExcel'),
          meta: {
            title: '导入Excel'
          }
        }
      ]
    }
  ]
})
