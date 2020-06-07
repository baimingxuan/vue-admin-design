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
      <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="form-list">
        <el-form-item label="姓名：" prop="name">
          <el-input v-model="ruleForm.name" maxlength="15" show-word-limit placeholder="请输入名称"></el-input>
        </el-form-item>
        <el-form-item label="手机：" prop="password">
          <el-input v-model.number="ruleForm.mobile" maxlength="11" placeholder="请输入手机号码"></el-input>
        </el-form-item>
        <el-form-item label="密码：" prop="password">
          <el-input v-model="ruleForm.password" placeholder="请输入密码" show-password></el-input>
        </el-form-item>
        <el-form-item label="活动区域" prop="region">
          <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="时间：">
          <el-col :span="11">
            <el-form-item prop="date1">
              <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-form-item prop="date2">
              <el-time-picker placeholder="选择时间" v-model="ruleForm.date2" style="width: 100%;"></el-time-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="即时配送" prop="delivery">
          <el-switch v-model="ruleForm.delivery"></el-switch>
        </el-form-item>
        <el-form-item label="爱好：" prop="hobby">
          <el-checkbox-group v-model="ruleForm.hobby">
            <el-checkbox label="游泳"></el-checkbox>
            <el-checkbox label="跑步"></el-checkbox>
            <el-checkbox label="健身"></el-checkbox>
            <el-checkbox label="阅读"></el-checkbox>
            <el-checkbox label="电影" disabled></el-checkbox>
            <el-checkbox label="音乐" disabled></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="资源：" prop="resource">
          <el-radio-group v-model="ruleForm.resource">
            <el-radio label="赞助"></el-radio>
            <el-radio label="免费"></el-radio>
            <el-radio label="线上" disabled></el-radio>
            <el-radio label="线下" disabled></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="实力：" prop="strength">
          <el-slider v-model="ruleForm.strength"></el-slider>
        </el-form-item>
        <el-form-item label="评级：" prop="rate">
          <el-rate v-model="ruleForm.rate" :colors="colors"></el-rate>
        </el-form-item>
        <el-form-item label="内容：" prop="content">
          <el-input type="textarea" v-model="ruleForm.desc" :autosize="{ minRows: 2, maxRows: 5 }" placeholder="请输入内容"
                    maxlength="50" show-word-limit></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import Hints from '../../components/Hints'

export default {
  name: 'Form',
  components: { Hints },
  data () {
    return {
      ruleForm: {
        name: '',
        mobile: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        hobby: ['音乐'],
        resource: '线下',
        desc: '',
        strength: 30,
        rate: null
      },
      colors: ['#99A9BF', '#F7BA2A', '#FF9900']
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
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
.form-list-wrapper{
  .el-form{
    > .el-form-item{
      width: 45%;
    }
  }
}
</style>
