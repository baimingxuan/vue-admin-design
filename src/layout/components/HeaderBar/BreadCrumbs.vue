<template>
  <div class="bread-crumbs">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">
        <i class="vue-sys-icon-index"></i>
        首页
      </el-breadcrumb-item>
      <el-breadcrumb-item>活动管理</el-breadcrumb-item>
      <el-breadcrumb-item>活动列表</el-breadcrumb-item>
      <el-breadcrumb-item>活动详情</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  name: 'BreadCrumbs'
}
</script>

<style lang="less">
  .bread-crumbs {
    float: left;
    width: 30%;
    height: 32px;
    padding: 0 35px;
    .el-breadcrumb{
      line-height: 32px;
    }
  }
</style>
