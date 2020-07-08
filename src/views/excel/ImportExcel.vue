<template>
  <div class="import-excel-wrapper">
    <Hints>
      <template slot="hintName">JS-xlsx插件</template>
      <template slot="hintInfo">
        <p>JS-xlsx：由SheetJS出品的一款非常方便的只需要纯JS即可读取和导出excel的工具库，功能强大，支持xlsx、csv、txt等格式</p>
        <p>github地址：访问 <el-link type="success" href="https://github.com/SheetJS/sheetjs" target="_blank">JS-xlsx</el-link></p>
      </template>
    </Hints>
    <el-card shadow="always">
      <UploadExcel @on-success="handleSuccess"/>
      <el-table
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        size="medium">
        <el-table-column v-for="item in tableHeader" :key="item" :prop="item" :label="item" align="center"/>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import UploadExcel from '../../components/UploadExcel'
import Hints from '../../components/Hints'

export default {
  name: 'ImportExcel',
  data () {
    return {
      tableHeader: [],
      tableData: []
    }
  },
  components: { UploadExcel, Hints },
  methods: {
    handleSuccess ({ header, results }) {
      this.tableHeader = header
      this.tableData = results
    }
  }
}
</script>

<style lang="less">
.import-excel-wrapper {
  .el-card {
    min-height: 400px;
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
