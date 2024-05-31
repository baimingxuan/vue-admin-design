// 配置文档: https://eslint.nodejs.cn/
import { defineFlatConfig } from 'eslint-define-config'
import * as parserVue from 'vue-eslint-parser'
import pluginVue from 'eslint-plugin-vue'
import configPrettier from 'eslint-config-prettier'
import pluginPrettier from 'eslint-plugin-prettier'
import js from '@eslint/js'

/** @type {import('eslint-define-config').FlatESLintConfig} */
export default defineFlatConfig([
  {
    ...js.configs.recommended,
    ignores: ['src/assets/**'],
    plugins: {
      prettier: pluginPrettier
    },
    rules: {
      ...configPrettier.rules,
      ...pluginPrettier.configs.recommended.rules,
      /*
       * Eslint规则配置
       * 配置文档: https://eslint.nodejs.cn/docs/latest/rules/
       */
      // 必须使用 === 和 !==
      'eqeqeq': ['error', 'always'],
      // 强制构造函数名称以大写字母开头
      'new-cap': ['error', {
        'newIsCap': true,
        'capIsNew': false
      }],
      // 禁止使用console
      'no-console': 'warn',
      // 禁止不必要的嵌套块
      'no-lone-blocks': 'error',
      // 禁止使用多行字符串
      'no-multi-str': 'error',
      // 禁止使用 __proto__ 属性
      'no-proto': 'error',
      // 禁止在 return 语句中使用赋值运算符
      'no-return-assign': ['error', 'except-parens'],
      // 禁止将字面作为异常抛出
      'no-throw-literal': 'error',
      // 需要 let 或 const 而不是 var
      'no-var': 'error',
      // 禁止将变量初始化为 undefined
      'no-undef-init': 'error',
      // 禁止在更简单的替代方案中使用三元运算符
      'no-unneeded-ternary': ['error', {
        'defaultAssignment': false
      }],
      // 禁止在定义变量之前使用变量
      'no-use-before-define': 'off',
      // 禁止未使用的变量
      'no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_'
        }
      ],
      // 声明后永远不会重新分配的变量需要 const 声明
      'prefer-const': 'error',
      // 使用 prettier 插件
      'prettier/prettier': [
        'error',
        {
          endOfLine: 'auto'
        }
      ],
      // 禁止使用 Yoda 条件
      'yoda': ['error', 'never']
    }
  },
  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: parserVue,
      globals: {
        window: 'readonly',
        document: 'readonly',
        location: 'readonly',
        navigator: 'readonly',
        setImmediate: 'readonly',
        setTimeout: 'readonly',
        setInterval: 'readonly',
        alert: 'readonly',
        console: 'readonly'
      }
    },
    plugins: {
      vue: pluginVue
    },
    processor: pluginVue.processors['.vue'],
    rules: {
      ...pluginVue.configs.base.rules,
      /*
       * Vue规则配置
       * 配置文档: https://eslint.vuejs.org/rules/)
       */
      // 禁止在模板中的自定义组件上强制实施属性命名样式
      'vue/attribute-hyphenation': 'off',
      // 强制执行属性的顺序
      'vue/attributes-order': 'warn',
      // 强制执行在<template>中使用驼峰命名
      'vue/camelcase': ['error', {
        'properties': 'always'
      }],
      // 强制组件定义名称使用大驼峰命名
      'vue/component-definition-name-casing': ['error', 'PascalCase'],
      // 强制执行元素自闭合
      'vue/html-self-closing': [
        'error',
        {
          html: {
            void: 'always',
            normal: 'always',
            component: 'always'
          },
          svg: 'always',
          math: 'always'
        }
      ],
      // 禁止强制执行每行的最大属性数
      'vue/max-attributes-per-line': 'off',
      // 禁止要求组件名称始终为多个字母
      'vue/multi-word-component-names': 'off',
      // 多行元素的内容之前和之后强制使用换行符
      'vue/multiline-html-element-content-newline': 'off',
      // 消除不必要和可能造成混淆 <template>
      'vue/no-lone-template': 'off',
      // 禁止修改组件的 props
      'vue/no-mutating-props': ['error', {
        'shallowOnly': false
      }],
      // 禁止计算属性中的副作用
      'vue/no-side-effects-in-computed-properties': 'off',
      // 禁止在组件定义中使用保留名称
      'vue/no-reserved-component-names': 'off',
      // 禁止 v-for 指令或作用域属性的未使用变量定义
      'vue/no-unused-vars': 'off',
      // 禁止使用 V-HTML 来防止 XSS 攻击
      'vue/no-v-html': 'off',
      // 禁止强制每个组件都应位于其自己的文件中
      'vue/one-component-per-file': 'off',
      // 确保在组件中保持声明的属性顺序
      'vue/order-in-components': 'warn',
      // 禁止必须设置 props 的默认值
      'vue/require-default-prop': 'off',
      // 禁止要求在单行元素的内容之前和之后使用换行符
      'vue/singleline-html-element-content-newline': 'off',
      // 强制执行使用速记(#slot) 或长格式的 v-slot 指令样式
      'vue/v-slot-style': ['error', {
        'atComponent': 'v-slot',
        'default': 'shorthand',
        'named': 'shorthand'
      }]
    }
  }
])

