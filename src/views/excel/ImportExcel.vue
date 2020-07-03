<template>
  <div class="import-excel-wrapper">
    <Hints>
      <template slot="hintName">JS-xlsx插件</template>
      <template slot="hintInfo">
        <p>JS-xlsx：由SheetJS出品的一款非常方便的只需要纯JS即可读取和导出excel的工具库，功能强大，支持xlsx、csv、txt等格式</p>
        <p>github地址：访问 <el-link type="success" href="https://github.com/SheetJS/sheetjs" target="_blank">JS-xlsx</el-link></p>
      </template>
    </Hints>
  </div>
</template>

<script>
import Hints from '../../components/Hints/index'

export default {
  name: 'ImportExcel',
  components: { Hints }
}
</script>

<style lang="less">
.import-excel-wrapper {
  .el-card{
    min-height: 500px;
  }
  .search-form {
    padding-top: 18px;
    margin-bottom: 15px;
    background-color: #f7f8fb;
  }
  .el-table thead {
    font-weight: 600;
    th{
      background-color: #f2f3f7;
    }
  }
}
</style>
