<template>
  <div class="github-link">
    <a href="https://github.com/LoveHins/vue-admin-system" target="_blank" rel="noopener">
      <SvgIcon class="icon" icon-class="vue-sys-icon-git"></SvgIcon>
    </a>
  </div>
</template>

<script>
import SvgIcon from '../../../../components/SvgIcon'
export default {
  name: 'GitHubLink',
  components: {
    SvgIcon
  }
}
</script>

<style lang="less">
  .github-link {
    float: left;
    width: 26px;
    height: 26px;
    padding: 3px;
    cursor: pointer;
    margin-left: 10px;
    .icon {
      width: 26px;
      height: 26px;
      font-size: 100px;
      vertical-align: middle;
    }
  }
</style>
