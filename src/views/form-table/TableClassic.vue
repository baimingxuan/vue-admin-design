<template>
  <div class="table-classic-wrapper">
    <Hints>
      <template slot="hintName">Table表格组件</template>
      <template slot="hintInfo">
        <p>element-Table：使用elementUI的Table组件，可用于展示多条结构类似的数据，并对其进行相关操作</p>
        <p>地址：访问 <el-link type="success" href="https://element.eleme.cn/2.13/TableClassic.vue#/zh-CN/component/table" target="_blank">element-Table</el-link></p>
      </template>
    </Hints>
    <el-card shadow="always">
      <!-- 操作栏 -->
      <div class="control-btns">
        <el-button type="primary" @click="handleCreate">新建数据</el-button>
        <el-button type="primary" @click="handleImport">导入数据</el-button>
        <el-button type="primary" @click="exportVisible = true">导出数据</el-button>
        <el-button type="danger" @click="batchDelete">批量删除</el-button>
      </div>
      <!-- 查询栏 -->
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
      <!-- 表格栏 -->
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
            <el-select v-model="scope.row.married" @change="selectChange(scope.row)" style="width: 80px">
              <el-option :value="0" label="单身"/>
              <el-option :value="1" label="未婚"/>
              <el-option :value="2" label="已婚"/>
              <el-option :value="3" label="离异"/>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="禁止编辑" align="center">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.forbid" @change="stateChange(scope.row)"/>
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
      <!-- 分页栏 -->
      <Pagination :total="total" :page.sync="listQuery.currentPage" :limit.sync="listQuery.pageSize" @pagination="fetchData"/>
      <!-- 新增/编辑 弹出栏 -->
      <el-dialog
        title="编辑"
        :visible.sync="formVisible"
        width="30%"
        class="dialog-form"
        :before-close="handleClose">
        <el-form
          :model="dialogForm"
          :rules="formRules"
          ref="dialogForm"
          label-width="100px">
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
          <div class="footer-item">
            <el-button @click="cancleForm">取 消</el-button>
            <el-button type="primary" :disabled="isSubmit" @click="submitForm('dialogForm')">确 定</el-button>
          </div>
        </el-form>
      </el-dialog>
      <!-- 导入数据 弹出栏 -->
      <el-dialog
        title="导入数据"
        :visible.sync="importVisible"
        width="20%">
        <div class="upload-box">
          <span>选择文件：</span>
          <Upload :filesFormat="filesFormat">
            <i class="vue-sys-icon-upload"></i>上传文件
          </Upload>
        </div>
        <div class="hints">TIP：请选择要导出数据的格式。</div>
        <span slot="footer">
        <el-button @click="cancleImport">取 消</el-button>
        <el-button type="primary" @click="confirmImport">确 定</el-button>
      </span>
      </el-dialog>
      <!-- 导出数据 弹出栏 -->
      <el-dialog
        title="导出数据"
        :visible.sync="exportVisible"
        width="30%">
        <div class="export-data">
          <el-button type="primary" @click="exportExcle">EXCEL格式</el-button>
          <el-button type="primary" @click="exportCsv">CSV格式</el-button>
          <el-button type="primary" @click="exportTxt">TXT格式</el-button>
        </div>
        <div class="hints">TIP：请选择要导出数据的格式。</div>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import { getTableList } from '../../api'
import Pagination from '../../components/Pagination'
import Upload from '../../components/Upload'
import Hints from '../../components/Hints'

export default {
  name: 'Table',
  data () {
    return {
      // 数据列表加载动画
      listLoading: true,
      // 查询列表参数对象
      listQuery: {
        id: undefined,
        phone: undefined,
        married: undefined,
        currentPage: 1,
        pageSize: 10
      },
      // 新增/编辑提交表单对象
      dialogForm: {
        name: undefined,
        phone: undefined,
        married: undefined,
        hobby: []
      },
      // 数据总条数
      total: 0,
      // 表格数据数组
      tableData: [],
      // 多选数据暂存数组
      multipleSelection: [],
      // 新增/编辑 弹出框显示/隐藏
      formVisible: false,
      // 表单校验 trigger: ['blur', 'change'] 为多个事件触发
      formRules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { pattern: /^1[3456789]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur' }
        ]
      },
      // 防止多次连续提交表单
      isSubmit: false,
      // 导入数据 弹出框显示/隐藏
      importVisible: false,
      // 导出文件格式
      filesFormat: '.txt, .csv, .xls, .xlsx',
      // 导出数据 弹出框显示/隐藏
      exportVisible: false
    }
  },
  components: { Pagination, Upload, Hints },
  created () {
    this.fetchData()
  },
  methods: {
    // 多选操作
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    // 新建数据
    handleCreate () {
      this.formVisible = true
      this.dialogForm.name = undefined
      this.dialogForm.phone = undefined
      this.dialogForm.married = undefined
      this.dialogForm.hobby = []
    },
    // 编辑数据
    handleEdit (index, row) {
      console.log(index, row)
      this.formVisible = true
      this.dialogForm.name = row.name
      this.dialogForm.phone = row.phone
      this.dialogForm.married = row.married
      this.dialogForm.hobby = row.hobby.split('、')
    },
    // 删除数据
    handleDelete (index, row) {
      console.log(index, row)
      this.$confirm('此操作将删除选中数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 此处可添加--删除接口
        // 删除成功调用fetchData方法更新列表
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
    // 批量删除
    batchDelete () {
      if (this.multipleSelection.length < 1) {
        this.$message({
          message: '请先选择要删除的数据！',
          type: 'warning'
        })
      } else {
        this.handleDelete()
      }
    },
    // 新增/编辑弹出框 关闭时操作
    handleClose () {
      this.formVisible = false
      this.$refs.dialogForm.resetFields()
    },
    // 获取数据列表
    fetchData () {
      this.listLoading = true
      // 获取数据列表接口
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
    // 查询数据
    onSubmit () {
      this.listQuery.currentPage = 1
      this.fetchData()
    },
    // 导入数据
    handleImport () {
      this.importVisible = true
    },
    // 新增/编辑表单确认提交
    submitForm (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 此处添加 新增/编辑数据的接口 新增成功后调用fetchData方法更新列表
          // 先 this.isSubmit = true 接口返回成功后 再 this.isSubmit = false
          this.formVisible = false
        } else {
          this.isSubmit = false
          return false
        }
      })
    },
    // 新增/编辑表单取消提交
    cancleForm () {
      this.$refs.dialogForm.resetFields()
      this.formVisible = false
    },
    // 导入数据弹出栏 确认操作
    confirmImport () {
      // 此处添加 后台接收的接口，将导入的数据传给后台处理
      this.importVisible = false
    },
    // 导入数据弹出栏 取消操作
    cancleImport () {
      // 将导入的数据清空
      this.importVisible = false
    },
    // 导出数据--excle格式
    exportExcle () {
      // 此处添加 导出excle格式数据接口
      this.exportVisible = false
    },
    // 导出数据--csv格式
    exportCsv () {
      // 此处添加 导出csv格式数据接口
      this.exportVisible = false
    },
    // 导出数据--txt格式
    exportTxt () {
      // 此处添加 导出txt格式数据接口
      this.exportVisible = false
    },
    // 列表中婚姻状况栏，状态值改变时，调用
    selectChange (row) {
      // 此处添加后台接口，成功后调用fetchData方法更新列表
    },
    // 列表中禁止编辑栏，状态值改变时，调用
    stateChange (row) {
      // 此处添加后台接口，成功后调用fetchData方法更新列表
    }
  }
}
</script>

<style lang="less">
.table-classic-wrapper{
  .el-card{
    min-height: 656px;
  }
  .control-btns{
    margin-bottom: 20px;
  }
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
  .dialog-form{
    .el-input{
      width: 380px;
    }
    .footer-item{
      margin-top: 50px;
      text-align: right;
    }
  }
  .upload-box,
  .export-data{
    width: 300px;
    margin: 0 auto 30px;
  }
  .upload-box{
    width: 156px;
    .files-upload{
      color: #20a0ff;
    }
  }
  .hints{
    font-size: 12px;
    color: #aaa;
    text-align: center;
  }
}
</style>
