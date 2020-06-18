<template>
  <div class="vue-drr-wrapper">
    <Hints>
      <template slot="hintName">VueDRR</template>
      <template slot="hintInfo">
        <p>VueDRR：基于vue-draggable-resizable的vue组件，可以实现拖动、拉伸和旋转功能</p>
        <p>github地址：访问 <el-link type="success" href="https://github.com/Alvin-Liu/vue-drr" target="_blank">VueDRR</el-link></p>
      </template>
    </Hints>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card shadow="always" :body-style="{padding: '0px'}"></el-card>
      </el-col>
      <el-col :span="12">
        <el-card shadow="always" :body-style="{padding: '0px'}"></el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Hints from '../../../components/Hints/index'

export default {
  name: 'VueDrr',
  components: { Hints }
}
</script>

<style lang="less">

</style>
