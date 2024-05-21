// 配置文档: https://prettier.nodejs.cn/

/** @type {import('prettier').Config} */
export default {
  // 每行最大宽度，超过换行
  printWidth: 120,
  // 缩进级别的空格数
  tabWidth: 2,
  // 用制表符而不是空格缩进行
  useTabs: false,
  // 语句末尾用分号
  semi: false,
  // 使用单引号而不是双引号
  singleQuote: true,
  // 在 JSX 中使用单引号而不是双引号
  jsxSingleQuote: true,
  // 尾随逗号
  trailingComma: 'none',
  // 对象字面量中括号之间有空格 { foo: bar }
  bracketSpacing: true,
  // 将多行 HTML（HTML、JSX）元素的 > 放在最后一行的末尾，而不是单独放在下一行
  bracketSameLine: false,
  // 在唯一的箭头函数参数周围包含括号(avoid：省略括号, always：不省略括号)
  arrowParens: 'avoid',
  // 换行符使用 lf 结尾 可选值 auto|lf|crlf|cr
  endOfLine: 'lf'
}
