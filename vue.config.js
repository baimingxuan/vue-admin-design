'use strict'

const CompressionWebpackPlugin = require('compression-webpack-plugin')

module.exports = {
  publicPath: './', // 部署应用包时的基本 url
  outputDir: 'dist', // build 构建文件目录
  assetsDir: 'static', // 静态资源目录
  lintOnSave: process.env.NODE_ENV === 'development', // 仅在开发模式下进行 eslint 检测代码
  productionSourceMap: false, // 禁用生产环境的 source map
  runtimeCompiler: true, // 是否运行时组件中使用 template
  devServer: {
    host: '0.0.0.0', // 默认是 localhost,可不配置
    port: 8000, // 配置端口号
    open: true, // 启动是否打开浏览器
    overlay: { // 是否在浏览器上显示编译的 errors 或 warnings
      warnings: false,
      errors: true
    },
    proxy: {
      '/': { // 被代理的接口名
        target: process.env.VUE_APP_BASE_API, // url地址
        changeOrigin: true, // 发送请求头中 host 是否设置成 target
        pathRewrite: { // 重定向
          '^/': ''
        }
      }
    }
  },
  configureWebpack(config) {
    // 生产环境配置 Gzip 压缩
    if (process.env.NODE_ENV === 'production') {
      config.plugins.push(
        new CompressionWebpackPlugin({
          // 正则匹配需要压缩的文件后缀
          test: /\.(js|css|svg|woff|ttf|json|html)$/,
          // 大于20kb的会压缩
          threshold: 20480,
          // 是否删除原文件
          deleteOriginalAssets: false
        })
      )
    }
  }
}
