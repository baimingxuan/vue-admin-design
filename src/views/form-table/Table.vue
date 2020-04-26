<template>
  <div class="table-wrapper">
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="60"/>
      <el-table-column prop="id" label="编号"/>
      <el-table-column prop="name" label="姓名"/>
      <el-table-column prop="sex" label="性别"/>
<!--      <el-table-column label="日期" sortable width="100">-->
<!--        <template slot-scope="scope">{{ scope.row.date }}</template>-->
<!--      </el-table-column>-->
      <el-table-column prop="phone" label="姓名"/>
      <el-table-column prop="education" label="学历"/>
      <el-table-column prop="married" label="婚姻状况"/>
      <el-table-column prop="hobby" label="爱好" width="300"/>
<!--      <el-table-column prop="address" label="地址" show-overflow-tooltip/>-->
    </el-table>
  </div>
</template>

<script>
import { getTableList } from '../../api'

export default {
  name: 'Table',
  data () {
    return {
      tableData: []
    }
  },
  created () {
    getTableList().then(res => {
      let data = res.data
      if (data.code === 0) {
        this.tableData = data.data
      }
      console.log(res.data)
    })
  },
  methods: {
    handleSelectionChange (val) {
      this.multipleSelection = val
    }
  }
}
</script>

<style lang="less">

</style>
