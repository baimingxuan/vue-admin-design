<template>
  <div class="bread-crumbs-wrapper">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">
        <i class="icon vue-sys-icon-index"></i>
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
  .bread-crumbs-wrapper {
    float: left;
    width: 35%;
    height: 32px;
    padding: 0 30px;
    .el-breadcrumb {
      line-height: 32px;
    }
    .icon {
      font-size: 14px;
    }
  }
</style>
