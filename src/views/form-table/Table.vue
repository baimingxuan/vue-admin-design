<template>
  <div class="table-wrapper">
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      size="medium"
      @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="60"/>
      <el-table-column prop="id" label="编号" align="center" width="120" sortable/>
      <el-table-column prop="name" label="姓名" align="center">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>姓名: {{ scope.row.name }}</p>
            <p>手机: {{ scope.row.phone }}</p>
            <p>爱好: {{ scope.row.hobby }}</p>
            <div slot="reference">
              <el-tag size="medium">{{ scope.row.name }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="性别" align="center">
        <template slot-scope="scope">{{ scope.row.sex }}</template>
      </el-table-column>
      <el-table-column prop="phone" label="手机" align="center"/>
      <el-table-column prop="education" label="学历" align="center"/>
      <el-table-column label="婚姻状况" align="center">
        <template slot-scope="scope">
          <el-select v-model="scope.row.married" style="width: 80px">
            <el-option :value="0" label="单身"/>
            <el-option :value="1" label="未婚"/>
            <el-option :value="2" label="已婚"/>
            <el-option :value="3" label="离异"/>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column label="禁止编辑" align="center">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.forbid"/>
        </template>
      </el-table-column>
      <el-table-column prop="hobby" label="爱好" align="center" width="300" show-overflow-tooltip/>
      <el-table-column label="操作" align="center" width="200">
        <template slot-scope="scope">
          <el-button size="mini" :disabled="scope.row.forbid" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="编辑"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getTableList } from '../../api'

export default {
  name: 'Table',
  data () {
    return {
      tableData: [],
      dialogVisible: false
    }
  },
  created () {
    getTableList().then(res => {
      let data = res.data
      if (data.code === 0) {
        this.tableData = data.data
      }
    })
  },
  methods: {
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    handleEdit (index, row) {
      console.log(index, row)
      this.dialogVisible = true
    },
    handleDelete (index, row) {
      console.log(index, row)
      this.$confirm('此操作将删除该条数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    handleClose () {
      this.dialogVisible = false
    }
  }
}
</script>

<style lang="less">
.table-wrapper{
  .el-table thead {
    font-weight: 600;
    th{
      background-color: #f2f3f7;
    }
  }
}
</style>
