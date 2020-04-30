<template>
  <div class="table-wrapper">
    <el-form
      ref="searchForm"
      :inline="true"
      :model="listQuery"
      label-width="90px"
      class="search-form">
      <el-form-item label="编号">
        <el-input v-model="listQuery.id" placeholder="编号"></el-input>
      </el-form-item>
      <el-form-item label="手机">
        <el-input v-model="listQuery.phone" placeholder="手机"></el-input>
      </el-form-item>
      <el-form-item label="婚姻状况">
        <el-select v-model="listQuery.married" placeholder="婚姻状况">
          <el-option :value="0" label="单身"/>
          <el-option :value="1" label="未婚"/>
          <el-option :value="2" label="已婚"/>
          <el-option :value="3" label="离异"/>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
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
    <Pagination :total="total" :page.sync="listQuery.currentPage" :limit.sync="listQuery.pageSize" @pagination="fetchData"/>
    <el-dialog
      title="编辑"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <el-form ref="dialogForm" :model="dialogForm" label-width="100px">
        <el-form-item label="姓名：" prop="name">
          <el-input v-model="dialogForm.name"></el-input>
        </el-form-item>
        <el-form-item label="手机：" prop="phone">
          <el-input v-model="dialogForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="婚姻状况：" prop="married">
          <el-select v-model="dialogForm.married">
            <el-option :value="0" label="单身"/>
            <el-option :value="1" label="未婚"/>
            <el-option :value="2" label="已婚"/>
            <el-option :value="3" label="离异"/>
          </el-select>
        </el-form-item>
        <el-form-item label="爱好：" prop="hobby">
          <el-checkbox-group v-model="dialogForm.hobby">
            <el-checkbox label="羽毛球" name="hobby"></el-checkbox>
            <el-checkbox label="乒乓球" name="hobby"></el-checkbox>
            <el-checkbox label="篮球" name="hobby"></el-checkbox>
            <el-checkbox label="排球" name="hobby"></el-checkbox>
            <el-checkbox label="网球" name="hobby"></el-checkbox>
            <el-checkbox label="旱冰" name="hobby"></el-checkbox>
            <el-checkbox label="滑雪" name="hobby"></el-checkbox>
            <el-checkbox label="跳高" name="hobby"></el-checkbox>
            <el-checkbox label="冲浪" name="hobby"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getTableList } from '../../api'
import Pagination from '../../components/Pagination'

export default {
  name: 'Table',
  data () {
    return {
      listLoading: true,
      listQuery: {
        id: undefined,
        phone: undefined,
        married: undefined,
        currentPage: 1,
        pageSize: 10
      },
      dialogForm: {
        name: undefined,
        phone: undefined,
        married: undefined,
        hobby: []
      },
      total: 0,
      tableData: [],
      dialogVisible: false
    }
  },
  components: { Pagination },
  created () {
    this.fetchData()
  },
  methods: {
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    handleEdit (index, row) {
      console.log(index, row)
      this.dialogVisible = true
      this.dialogForm.name = row.name
      this.dialogForm.phone = row.phone
      this.dialogForm.married = row.married
      this.dialogForm.hobby = row.hobby.split('、')
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
    },
    fetchData () {
      this.listLoading = true
      getTableList(this.listQuery).then(res => {
        let data = res.data
        if (data.code === 0) {
          this.total = data.data.total
          this.tableData = data.data.list
          this.listLoading = false
        }
      }).catch(() => {
        this.listLoading = false
      })
    },
    onSubmit () {
      this.listQuery.currentPage = 1
      this.fetchData()
    }
  }
}
</script>

<style lang="less">
.table-wrapper{
  .search-form{
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
