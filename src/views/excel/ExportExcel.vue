<template>
  <div class="export-excel-wrapper">
    <Hints>
      <template slot="hintName">JS-xlsx插件</template>
      <template slot="hintInfo">
        <p>JS-xlsx：由SheetJS出品的一款非常方便的只需要纯JS即可读取和导出excel的工具库，功能强大，支持xlsx、csv、txt等格式</p>
        <p>github地址：访问 <el-link type="success" href="https://github.com/SheetJS/sheetjs" target="_blank">JS-xlsx</el-link></p>
      </template>
    </Hints>
    <el-card shadow="always">
      <el-form
        ref="searchForm"
        :inline="true"
        :model="exportParam"
        label-width="100px"
        class="search-form">
        <el-form-item label="文件名:">
          <el-input v-model="exportParam.fileName" placeholder="文件名"></el-input>
        </el-form-item>
        <el-form-item label="自动宽度:">
          <el-radio-group v-model="exportParam.autoWidth">
            <el-radio :label="true">自动</el-radio>
            <el-radio :label="false">固定</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="文件类型:">
          <el-select v-model="exportParam.type" placeholder="文件类型">
            <el-option value="xlsx" label="xlsx"/>
            <el-option value="csv" label="csv"/>
            <el-option value="txt" label="txt"/>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="margin-left: 30px" @click="handleExport">导出Excel</el-button>
        </el-form-item>
      </el-form>
      <el-table
        v-loading="listLoading"
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        size="medium"
        @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="50" align="center"/>
        <el-table-column prop="id" label="编号" align="center"/>
        <el-table-column prop="name" label="姓名" align="center"/>
        <el-table-column prop="sex" label="性别" align="center"/>
        <el-table-column prop="phone" label="手机" align="center"/>
        <el-table-column prop="education" label="学历" align="center"/>
        <el-table-column prop="hobby" label="爱好" align="center" width="300"/>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { getTableList } from '../../api'
import excel from '../../utils/excel'
import Hints from '../../components/Hints/index'

export default {
  name: 'ExportExcel',
  data () {
    return {
      listLoading: true,
      exportParam: {
        fileName: '',
        autoWidth: true,
        type: 'xlsx'
      },
      tableData: [],
      multipleSelection: []
    }
  },
  components: { Hints },
  created () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      this.listLoading = true
      getTableList(this.exportParam).then(res => {
        let data = res.data
        if (data.code === 0) {
          data.data.list.forEach(item => {
            const { id, name, sex, phone, education, hobby } = item
            this.tableData.push({ id, name, sex, phone, education, hobby })
          })
          this.listLoading = false
        }
      }).catch(() => {
        this.listLoading = false
      })
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    handleExport () {
      if (this.multipleSelection.length) {
        const params = {
          header: ['编号', '姓名', '性别', '手机', '学历', '爱好'],
          key: ['id', 'name', 'sex', 'phone', 'education', 'hobby'],
          data: this.multipleSelection,
          autoWidth: this.exportParam.autoWidth,
          fileName: this.exportParam.fileName,
          bookType: this.exportParam.type
        }
        excel.exportDataFromExcel(params)
        this.$refs.multipleTable.clearSelection()
      } else {
        this.$message.warning('请勾选要导出的数据项！')
      }
    }
  }
}
</script>

<style lang="less">
.export-excel-wrapper {
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
