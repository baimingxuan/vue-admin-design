<template>
  <div class="form-list-wrapper">
    <Hints>
      <template slot="hintName">Form表单组件</template>
      <template slot="hintInfo">
        <p>element-Form：使用elementUI的Form组件，可用以收集、校验和提交数据等操作</p>
        <p>地址：访问 <el-link type="success" href="https://element.eleme.cn/2.13/#/zh-CN/component/form" target="_blank">element-Form</el-link></p>
      </template>
    </Hints>
    <el-card shadow="always">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="230px" class="form-list">
        <el-form-item label="输入框（长度限制）：" prop="inputLimit">
          <el-input v-model="ruleForm.inputLimit" maxlength="15" show-word-limit placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="纯数字（纯数字）：" prop="inputNum">
          <el-input v-model.number="ruleForm.inputNum" maxlength="11" placeholder="请输入数字"></el-input>
        </el-form-item>
        <el-form-item label="输入框（密码隐藏）：" prop="password">
          <el-input v-model="ruleForm.password" placeholder="请输入密码" maxlength="16" show-password></el-input>
        </el-form-item>
        <el-form-item label="select选择器（自定义）：" required>
          <el-col :span="10">
            <el-form-item prop="select1">
              <el-select v-model="ruleForm.select1" placeholder="请选择">
                <el-option v-for="item in selectData" :key="item.value" :label="item.label" :value="item.value">
                  <span style="float: left">{{ item.label }}</span>
                  <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col class="tip-title" :span="4">（可搜索）</el-col>
          <el-col :span="10">
            <el-form-item prop="select2">
              <el-select v-model="ruleForm.select2" filterable placeholder="请选择或输入">
                <el-option v-for="item in selectData" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="日期和时间选择器：" required>
          <el-col :span="11">
            <el-form-item prop="dateVal">
              <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.dateVal" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-form-item prop="timeVal">
              <el-time-picker placeholder="选择时间" v-model="ruleForm.timeVal" style="width: 100%;"></el-time-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="switch开关（隐藏下面表单）：" prop="switch">
          <el-switch v-model="ruleForm.switch"></el-switch>
        </el-form-item>
        <div v-if="ruleForm.switch">
          <el-form-item label="滑块条（初始值）：" prop="slider">
            <el-slider v-model="ruleForm.slider"></el-slider>
          </el-form-item>
          <el-form-item label="级联选择器（自定义）：">
            <el-col :span="10">
              <el-form-item prop="cascader1">
                <el-cascader v-model="ruleForm.cascader1" :options="cascaderData" :props="{ expandTrigger: 'hover' }">
                  <template slot-scope="{ node, data }">
                    <span>{{ data.label }}</span>
                    <span v-if="!node.isLeaf">({{ data.children.length }})</span>
                  </template>
                </el-cascader>
              </el-form-item>
            </el-col>
            <el-col class="tip-title" :span="4">（懒加载）</el-col>
            <el-col :span="10">
              <el-form-item prop="cascader2">
                <el-cascader v-model="ruleForm.cascader2" :props="customProps"></el-cascader>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item label="单选框（带禁止）：" prop="radio">
            <el-radio-group v-model="ruleForm.radio">
              <el-radio label="免费"></el-radio>
              <el-radio label="收费"></el-radio>
              <el-radio label="赞助"></el-radio>
              <el-radio label="线上" disabled></el-radio>
              <el-radio label="线下" disabled></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="多选框（带禁止）：" prop="checkbox">
            <el-checkbox-group v-model="ruleForm.checkbox">
              <el-checkbox label="游泳"></el-checkbox>
              <el-checkbox label="跑步"></el-checkbox>
              <el-checkbox label="健身"></el-checkbox>
              <el-checkbox label="阅读"></el-checkbox>
              <el-checkbox label="电影" disabled></el-checkbox>
              <el-checkbox label="音乐" disabled></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="文本域（长度限制）：" prop="content">
            <el-input type="textarea" v-model="ruleForm.content" :autosize="{ minRows: 3, maxRows: 5 }" placeholder="请输入内容"
              maxlength="50" show-word-limit></el-input>
          </el-form-item>
        </div>
        <el-form-item class="submit-box">
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import Hints from '../../components/Hints'
import { selectData, cascaderData } from './data'

export default {
  name: 'Form',
  components: { Hints },
  data () {
    return {
      ruleForm: {
        inputLimit: '',
        inputNum: '',
        select1: '',
        select2: '',
        dateVal: '',
        timeVal: '',
        switch: true,
        slider: 32,
        cascader1: [],
        cascader2: [],
        radio: '线下',
        checkbox: ['音乐'],
        content: ''
      },
      selectData,
      cascaderData,
      colors: ['#99A9BF', '#F7BA2A', '#FF9900'],
      customProps: {
        lazy: true,
        lazyLoad (node, resolve) {
          let id = 0
          const { level } = node
          setTimeout(() => {
            const nodes = Array.from({ length: level + 1 })
              .map(item => ({
                value: ++id,
                label: `选项${id}`,
                leaf: level >= 2
              }))
            // 通过调用resolve将子节点数据返回，通知组件数据加载完成
            resolve(nodes)
          }, 1000)
        }
      },
      rules: {
        inputLimit: [
          { required: true, message: '内容不能为空', trigger: 'blur' }
        ],
        inputNum: [
          { required: true, message: '内容不能为空', trigger: 'blur' },
          { type: 'number', message: '内容必须为数字值', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '内容不能为空', trigger: 'blur' },
          { min: 6, max: 16, message: '密码长度在 6 到 16 个字符', trigger: ['blur', 'change'] },
          { pattern: /^[a-zA-Z0-9_-]{6,16}$/, message: '密码只支持字母、数字和下划线', trigger: ['blur', 'change'] }
        ],
        select1: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
        select2: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
        dateVal: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ],
        timeVal: [
          { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 此处添加后端接口
          alert('提交成功!')
        } else {
          console.log('提交失败!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style lang="less">
.form-list-wrapper {
  .el-card {
    padding-top: 20px;
  }
  .form-list {
    width: 45%;
    margin: 0 auto;
    .el-rate {
      line-height: 2;
    }
    > .el-form-item {
      margin-bottom: 22px;
      .line {
        text-align: center;
      }
      .tip-title {
        text-align: right;
        color: #606266;
      }
    }
    .submit-box {
      margin-top: 35px;
      margin-left: 0;
      text-align: center;
    }
  }
}
</style>
