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
      // 需要 let 或 const 而不是 var
      'no-var': 'error',
      // 禁止在定义变量之前使用变量
      'no-use-before-define': 'off',
      // 声明后永远不会重新分配的变量需要 const 声明
      'prefer-const': 'error',
      // 禁止不规则空格
      'no-irregular-whitespace': 'off',
      // 禁止使用 debugger
      'no-debugger': 'off',
      // 禁止未使用的变量
      'no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_'
        }
      ],
      // 使用 prettier 插件
      'prettier/prettier': [
        'error',
        {
          endOfLine: 'auto'
        }
      ]
    }
  },
  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: parserVue
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
      // 禁止 v-for 指令或作用域属性的未使用变量定义
      'vue/no-unused-vars': 'off',
      // 禁止使用 V-HTML 来防止 XSS 攻击
      'vue/no-v-html': 'off',
      // 禁止强制执行属性的顺序
      'vue/attributes-order': 'off',
      // 禁止必须设置 props 的默认值
      'vue/require-default-prop': 'off',
      // 禁止强制每个组件都应位于其自己的文件中
      'vue/one-component-per-file': 'off',
      // 禁止计算属性中的副作用
      'vue/no-side-effects-in-computed-properties': 'off',
      // 禁止在组件定义中使用保留名称
      'vue/no-reserved-component-names': 'off',
      // 禁止在模板中的自定义组件上强制实施属性命名样式
      'vue/attribute-hyphenation': 'off',
      // 禁止要求组件名称始终为多个字母
      'vue/multi-word-component-names': 'off',
      // 禁止强制执行每行的最大属性数
      'vue/max-attributes-per-line': 'off',
      // 禁止要求在单行元素的内容之前和之后使用换行符
      'vue/singleline-html-element-content-newline': 'off',
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
      // 强制执行使用速记(#slot) 或长格式的 v-slot 指令样式
      'vue/v-slot-style': ['error', {
        'atComponent': 'v-slot',
        'default': 'shorthand',
        'named': 'shorthand'
      }],
      // 确保在组件中保持声明的属性顺序
      'vue/order-in-components': 'warn',
      // 消除不必要和可能造成混淆 <template>
      'vue/no-lone-template': 'off',
      // 禁止修改组件的 props
      "vue/no-mutating-props": ['error', {
        'shallowOnly': false
      }],
      // 强制组件定义名称使用大驼峰命名
      'vue/component-definition-name-casing': ['error', 'PascalCase'],
      // 多行元素的内容之前和之后强制使用换行符
      'vue/multiline-html-element-content-newline': 'off',
      // 强制执行箭头函数中保持箭头前后一样的间距
      'arrow-spacing': ['error', {
        'before': true,
        'after': true
      }],
      // 强制执行块内的空格
      'block-spacing': ['error', 'always'],
      // 强制执行在<template>中使用驼峰命名
      'vue/camelcase': ['error', {
        'properties': 'always'
      }],
      'comma-style': ['error', 'last'],

      'dot-location': [2, 'property'],
      'eol-last': 2,
      'eqeqeq': ['error', 'always', { 'null': 'ignore' }],
      'generator-star-spacing': [2, {
        'before': true,
        'after': true
      }],
      'jsx-quotes': [2, 'prefer-single'],
      'key-spacing': [2, {
        'beforeColon': false,
        'afterColon': true
      }],
      'keyword-spacing': [2, {
        'before': true,
        'after': true
      }],
      'new-cap': [2, {
        'newIsCap': true,
        'capIsNew': false
      }],
      'new-parens': 2,
      'no-array-constructor': 2,
      'no-caller': 2,
      'no-console': 'off',
      'no-class-assign': 2,
      'no-cond-assign': 2,
      'no-const-assign': 2,
      'no-control-regex': 0,
      'no-delete-var': 2,
      'no-dupe-args': 2,
      'no-dupe-class-members': 2,
      'no-dupe-keys': 2,
      'no-duplicate-case': 2,
      'no-empty-character-class': 2,
      'no-empty-pattern': 2,
      'no-eval': 2,
      'no-ex-assign': 2,
      'no-extend-native': 2,
      'no-extra-bind': 2,
      'no-extra-boolean-cast': 2,
      'no-extra-parens': [2, 'functions'],
      'no-fallthrough': 2,
      'no-floating-decimal': 2,
      'no-func-assign': 2,
      'no-implied-eval': 2,
      'no-inner-declarations': [2, 'functions'],
      'no-invalid-regexp': 2,
      'no-irregular-whitespace': 2,
      'no-iterator': 2,
      'no-label-var': 2,
      'no-labels': [2, {
        'allowLoop': false,
        'allowSwitch': false
      }],
      'no-lone-blocks': 2,
      'no-mixed-spaces-and-tabs': 2,
      'no-multi-spaces': 2,
      'no-multi-str': 2,
      'no-multiple-empty-lines': [2, {
        'max': 1
      }],
      'no-native-reassign': 2,
      'no-negated-in-lhs': 2,
      'no-new-object': 2,
      'no-new-require': 2,
      'no-new-symbol': 2,
      'no-new-wrappers': 2,
      'no-obj-calls': 2,
      'no-octal': 2,
      'no-octal-escape': 2,
      'no-path-concat': 2,
      'no-proto': 2,
      'no-redeclare': 2,
      'no-regex-spaces': 2,
      'no-return-assign': [2, 'except-parens'],
      'no-self-assign': 2,
      'no-self-compare': 2,
      'no-sequences': 2,
      'no-shadow-restricted-names': 2,
      'no-spaced-func': 2,
      'no-sparse-arrays': 2,
      'no-this-before-super': 2,
      'no-throw-literal': 2,
      'no-trailing-spaces': 2,
      'no-undef': 2,
      'no-undef-init': 2,
      'no-unexpected-multiline': 2,
      'no-unmodified-loop-condition': 2,
      'no-unneeded-ternary': [2, {
        'defaultAssignment': false
      }],
      'no-unreachable': 2,
      'no-unsafe-finally': 2,
      'no-unused-vars': [2, {
        'vars': 'all',
        'args': 'none'
      }],
      'no-useless-call': 2,
      'no-useless-computed-key': 2,
      'no-useless-constructor': 2,
      'no-useless-escape': 0,
      'no-whitespace-before-property': 2,
      'no-with': 2,
      'one-var': [2, {
        'initialized': 'never'
      }],
      'operator-linebreak': [2, 'after', {
        'overrides': {
          '?': 'before',
          ':': 'before'
        }
      }],
      'padded-blocks': [2, 'never'],
      'quotes': [2, 'single', {
        'avoidEscape': true,
        'allowTemplateLiterals': true
      }],
      'semi': [2, 'never'],
      'semi-spacing': [2, {
        'before': false,
        'after': true
      }],
      'space-before-blocks': [2, 'always'],
      'space-before-function-paren': [2, 'never'],
      'space-in-parens': [2, 'never'],
      'space-infix-ops': 2,
      'space-unary-ops': [2, {
        'words': true,
        'nonwords': false
      }],
      'spaced-comment': [2, 'always', {
        'markers': ['global', 'globals', 'eslint', 'eslint-disable', '*package', '!', ',']
      }],
      'template-curly-spacing': [2, 'never'],
      'yield-star-spacing': [2, 'both'],
      'yoda': [2, 'never'],
      'prefer-const': 2,
      'no-debugger': 0,
      'object-curly-spacing': [2, 'always', {
        objectsInObjects: false
      }],
      'array-bracket-spacing': [2, 'never']
    }
  }
])

