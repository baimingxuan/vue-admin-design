<template>
  <div class="header-bar clear-fix">
    <SideViewCtrl></SideViewCtrl>
    <BreadCrumbs></BreadCrumbs>
    <div class="header-right clear-fix">
      <FullScreen></FullScreen>
      <LangSwitch></LangSwitch>
      <GitHubLink></GitHubLink>
    </div>
  </div>
</template>

<script>
import SideViewCtrl from './SideViewCtrl'
import BreadCrumbs from './BreadCrumbs'
import FullScreen from './FullScreen'
import LangSwitch from './LangSwitch'
import GitHubLink from './GitHubLink'
export default {
  components: {
    SideViewCtrl,
    BreadCrumbs,
    FullScreen,
    LangSwitch,
    GitHubLink
  }
}
</script>

<style lang="scss">
  .header-bar{
    height: 32px;
    padding: 16px 20px;
    .header-right{
      float: right;
      width: 130px;
    }
  }
</style>
