<template>
  <div class="header-bar clear-fix">
    <FoldSideMenu/>
    <BreadCrumbs/>
    <div class="header-right clear-fix">
      <FullScreen/>
      <LangSwitch></LangSwitch>
      <GitHubLink/>
    </div>
  </div>
</template>

<script>
import FoldSideMenu from '../../../components/FoldSideMenu'
import BreadCrumbs from '../../../components/BreadCrumbs'
import FullScreen from '../../../components/FullScreen'
import LangSwitch from './LangSwitch'
import GitHubLink from '../../../components/GitHubLink'

export default {
  components: {
    FoldSideMenu,
    BreadCrumbs,
    FullScreen,
    LangSwitch,
    GitHubLink
  }
}
</script>

<style lang="less">
  .header-bar {
    height: 32px;
    padding: 16px 20px;
    .header-right {
      float: right;
      width: 130px;
    }
  }
</style>
