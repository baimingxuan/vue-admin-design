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
      // 强制数组括号内间距一致
      'array-bracket-spacing': ['error', 'never'],
      // 强制执行箭头函数中保持箭头前后一样的间距
      'arrow-spacing': ['error', {
        'before': true,
        'after': true
      }],
      // 强制执行块内的空格
      'block-spacing': ['error', 'always'],
      // 禁止在对象和数组字面量中使用尾随逗号
      'comma-dangle': 'error',
      // 强制使用一致的逗号样式(逗号在后面)
      'comma-style': ['error', 'last'],
      // 必须使用 === 和 !==
      'eqeqeq': ['error', 'always'],
      // 强制执行generator函数周围的 * 间距
      'generator-star-spacing': ['error', {
        'before': true,
        'after': true
      }],
      // 强制在 JSX 属性中一致使用双引号或单引号
      'jsx-quotes': ['error', 'prefer-single'],
      // 强制在对象文本属性中键和值之间保持一样的间距
      'key-spacing': ['error', {
        'beforeColon': false,
        'afterColon': true
      }],
      // 强制在关键字前后保持一致的间距
      'keyword-spacing': ['error', {
        'before': true,
        'after': true
      }],
      // 强制构造函数名称以大写字母开头
      'new-cap': ['error', {
        'newIsCap': true,
        'capIsNew': false
      }],
      // 禁止使用console
      'no-console': 'warn',
      // 禁止条件表达式中的赋值运算符
      'no-cond-assign': 'error',
      // 禁止重新分配 const 变量
      'no-const-assign': 'error',
      // 禁止使用 debugger
      'no-debugger': 'warn',
      // 禁止 function 定义中的重复参数
      'no-dupe-args': 'error',
      // 禁止重复的类成员
      'no-dupe-class-members': 'error',
      // 禁止对象字面量中的重复键
      'no-dupe-keys': 'error',
      // 禁止重复的case标签
      'no-duplicate-case': 'error',
      // 禁止空解构模式
      'no-empty-pattern': 'error',
      // 禁止function不必要的括号
      'no-extra-parens': ['error', 'functions'],
      // 禁止数字字面中的前导或尾随小数点
      'no-floating-decimal': 'error',
      // 禁止不规则空格
      'no-irregular-whitespace': 'off',
      // 禁止不必要的嵌套块
      'no-lone-blocks': 'error',
      // 禁止使用混合空格和制表符进行缩进
      'no-mixed-spaces-and-tabs': 'error',
      // 禁止多个空格
      'no-multi-spaces': 'error',
      // 禁止使用多行字符串
      'no-multi-str': 'error',
      // 禁止多行空行
      'no-multiple-empty-lines': ['error', {
        'max': 1
      }],
      // 禁止对 in 表达式中的左操作数求反
      'no-negated-in-lhs': 'error',
      // 禁止使用 __proto__ 属性
      'no-proto': 'error',
      // 禁止变量重新声明
      'no-redeclare': 'error',
      // 禁止在 return 语句中使用赋值运算符
      'no-return-assign': ['error', 'except-parens'],
      // 禁止函数标识符及其应用之间的空格
      'no-spaced-func': 'error',
      // 禁止在构造函数中调用 super() 之前禁止 this/super
      'no-this-before-super': 'error',
      // 禁止将字面作为异常抛出
      'no-throw-literal': 'error',
      // 禁止在行尾尾随空格
      'no-trailing-spaces': 'error',
      // 需要 let 或 const 而不是 var
      'no-var': 'error',
      // 禁止使用未定义的变量
      'no-undef': 'error',
      // 禁止将变量初始化为 undefined
      'no-undef-init': 'error',
      // 禁止在更简单的替代方案中使用三元运算符
      'no-unneeded-ternary': ['error', {
        'defaultAssignment': false
      }],
      // 禁止在 return、throw、continue 和 break 语句后出现无法访问的代码
      'no-unreachable': 'error',
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
      // 禁止属性前有空格
      'no-whitespace-before-property': 'error',
      // 强制大括号内间距一致
      'object-curly-spacing': ['error', 'always'],
      // 强制实施一致的换行符样式
      'operator-linebreak': ['error', 'after', {
        'overrides': {
          '?': 'before',
          ':': 'before'
        }
      }],
      // 禁止在块内有空行
      'padded-blocks': ['error', 'never'],
      // 声明后永远不会重新分配的变量需要 const 声明
      'prefer-const': 'error',
      // 使用 prettier 插件
      'prettier/prettier': [
        'error',
        {
          endOfLine: 'auto'
        }
      ],
      // 强制使用单引号
      'quotes': ['error', 'single', {
        'avoidEscape': true,
        'allowTemplateLiterals': true
      }],
      // 禁止行尾使用分号
      'semi': ['error', 'never'],
      // 强制在分号前后使用一致的间距
      'semi-spacing': ['error', {
        'before': false,
        'after': true
      }],
      // 强制执行在块之前保持一致的间距
      'space-before-blocks': ['error', 'always'],
      // 禁止在function左括号之前有间距
      'space-before-function-paren': ['error', 'never'],
      // 禁止在函数括号内有间距
      'space-in-parens': ['error', 'never'],
      // 强制运算符周围有间距
      'space-infix-ops': 'error',
      // 强制在一元运算符之前或之后有一样的间距
      'space-unary-ops': ['error', {
        'words': true,
        'nonwords': false
      }],
      // 强制在注释中 // or /* 之后有一样的间距
      'spaced-comment': ['error', 'always', {
        'markers': ['global', 'globals', 'eslint', 'eslint-disable', '*package', '!', ',']
      }],
      // 禁止模板字符串的嵌入表达式周围有间距
      'template-curly-spacing': ['error', 'never'],
      // 强制在 yield* 表达式中 * 周围使用空格
      'yield-star-spacing': ['error', 'both'],
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

