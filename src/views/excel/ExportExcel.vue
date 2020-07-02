<template>
  <div class="export-excel-wrapper">
    <Hints>
      <template slot="hintName">Table表格组件</template>
      <template slot="hintInfo">
        <p>element-Table：使用elementUI的Table组件，可用于展示多条结构类似的数据，并对其进行相关操作</p>
        <p>地址：访问 <el-link type="success" href="https://element.eleme.cn/2.13/TableClassic.vue#/zh-CN/component/table" target="_blank">element-Table</el-link></p>
      </template>
    </Hints>
    <el-card shadow="always">
      <el-form
        ref="searchForm"
        :inline="true"
        :model="listQuery"
        label-width="100px"
        class="search-form">
        <el-form-item label="文件名:">
          <el-input v-model="listQuery.fileName" placeholder="文件名"></el-input>
        </el-form-item>
        <el-form-item label="自动宽度:">
          <el-radio-group v-model="listQuery.autoWidth">
            <el-radio label="true">自动</el-radio>
            <el-radio label="false">固定</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="文件类型:">
          <el-select v-model="listQuery.type" placeholder="文件类型">
            <el-option value="xlsx" label="xlsx"/>
            <el-option value="csv" label="csv"/>
            <el-option value="txt" label="txt"/>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleExport">导出Excel</el-button>
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
import Hints from '../../components/Hints/index'

export default {
  name: 'ExportExcel',
  data () {
    return {
      listLoading: true,
      listQuery: {
        selectAll: true,
        fileName: '',
        autoWidth: true,
        type: 'xlsx'
      },
      tableData: []
    }
  },
  components: { Hints },
  created () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      this.listLoading = true
      getTableList(this.listQuery).then(res => {
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
    handleSelectionChange () {},
    handleExport () {}
  }
}
</script>

<style lang="less">

</style>
