<template>
  <div class="table-inline-edit">
    <Hints>
      <template slot="hintName">Table表格组件(行内编辑)</template>
      <template slot="hintInfo">
        <p>element-Table：使用elementUI的Table组件，可用于展示多条结构类似的数据，并对其进行行内编辑操作</p>
        <p>地址：访问 <el-link type="success" href="https://element.eleme.cn/2.13/TableClassic.vue#/zh-CN/component/table" target="_blank">element-Table</el-link></p>
      </template>
    </Hints>
    <el-card shadow="always">
      <el-table v-loading="listLoading" :data="tableList" tooltip-effect="dark" style="width: 100%" size="medium">
        <el-table-column prop="id" label="编号" align="center" width="120"/>
        <el-table-column prop="name" label="姓名" align="center" />
        <el-table-column label="性别" align="center">
          <template slot-scope="{row}">{{ row.sex }}</template>
        </el-table-column>
        <el-table-column label="爱好" align="center" min-width="300px">
          <template slot-scope="{row}">
            <template v-if="row.editable">
              <el-input v-model="row.hobby" style="width: 300px;" />
              <el-button class="cancel-btn" type="warning" @click="cancelEdit(row)">取消</el-button>
            </template>
            <span v-else>{{ row.hobby }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="education" label="学历" align="center"/>
        <el-table-column align="center" label="操作" width="200">
          <template slot-scope="{row}">
            <el-button v-if="row.editable" type="success" size="small" @click="confirmEdit(row)">保存</el-button>
            <el-button v-else type="primary" size="small" @click="row.editable = !row.editable">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { getTableList } from '../../api'
import Hints from '../../components/Hints'

export default {
  name: 'TableInlineEdit',
  components: { Hints },
  data () {
    return {
      listLoading: true,
      tableList: [],
      listQuery: {
        currentPage: 1,
        pageSize: 10
      }
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    // 获取数据列表
    fetchData () {
      this.listLoading = true
      // 获取数据列表接口
      getTableList(this.listQuery).then(res => {
        let data = res.data
        if (data.code === 0) {
          this.tableList = data.data.list.map(item => {
            this.$set(item, 'editable', false)
            item.originalHobby = item.hobby
            return item
          })
          console.log(this.tableList)
          this.listLoading = false
        }
      }).catch(() => {
        this.listLoading = false
      })
    },
    cancelEdit (row) {
      row.hobby = row.originalHobby
      row.editable = false
    },
    confirmEdit (row) {
      row.editable = false
      row.originalHobby = row.hobby
      // 此处添加 后端保存数据接口
    }
  }
}
</script>

<style lang="less">
.table-inline-edit {
  .el-table thead {
    font-weight: 600;
    th {
      padding: 16px 0 15px!important;
      background-color: #f2f3f7;
    }
  }
}
</style>
