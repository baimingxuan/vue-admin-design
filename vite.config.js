import { defineConfig } from 'vite'
import vue2 from '@vitejs/plugin-vue2'
import vue2Jsx from '@vitejs/plugin-vue2-jsx'
import { resolve } from 'path'
import { viteMockServe } from 'vite-plugin-mock'

export default defineConfig(({ mode, command }) => {
  const isBuild = command === 'build'

  return {
    base: './',
    plugins: [
      vue2(),
      vue2Jsx(),
      viteMockServe({
        mockPath: 'mock',
        ignore: /^\_/,
        localEnabled: !isBuild,
        prodEnabled: isBuild,
        injectCode: `
      import { setupProdMockServer } from '../mock/_createProductionServer'

      setupProdMockServer()
      `
      })
    ],

    server: {
      port: 8000,
      open: true,
      host: true
    },

    build: {
      target: 'es2015',
      cssTarget: 'chrome86',
      minify: 'terser',
      terserOptions: {
        compress: {
          keep_infinity: true,
          drop_console: true
        }
      },
      chunkSizeWarningLimit: 2000
    },

    resolve: {
      alias: [
        {
          find: '@',
          replacement: resolve(__dirname, './src')
        },
        {
          find: 'vue',
          replacement: 'vue/dist/vue.runtime.esm.js'
        }
      ],
      extensions: ['.js', '.vue']
    },

    esBuild: {
      loader: 'jsx'
    },

    optimizeDeps: {
      esbuildOptions: {
        loader: {
          '.js': 'jsx'
        }
      }
    }
  }
})

