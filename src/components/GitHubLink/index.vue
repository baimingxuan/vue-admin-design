<template>
  <div class="github-link-wrapper">
    <el-tooltip effect="dark" content="GitHub链接" placement="bottom">
      <a href="https://github.com/baimingxuan/vue-admin-design.git" target="_blank" rel="noopener">
        <i class="icon vue-dsn-icon-git" />
      </a>
    </el-tooltip>
  </div>
</template>

<script>
export default {
  name: 'GitHubLink'
}
</script>

<style lang="less">
.github-link-wrapper {
  float: left;
  width: 22px;
  height: 22px;
  padding: 4px;
  cursor: pointer;
  .icon {
    font-size: 24px;
  }
  &:hover {
    color: #409eff;
  }
}
</style>
