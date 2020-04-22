<template>
  <div class="app-wrapper">
    <SideMenu class="main-menu"/>
    <div class="main-content">
      <HeaderBar/>
      <TagsNav/>
      <MainView/>
    </div>
  </div>
</template>

<script>
import HeaderBar from './components/HeaderBar/index'
import SideMenu from './components/SideMenu/index'
import TagsNav from './components/TagsNav/index'
import MainView from './components/MainView'
export default {
  name: 'Layout',
  components: {
    HeaderBar,
    SideMenu,
    TagsNav,
    MainView
  }
}
</script>

<style lang="less">
.app-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  .main-menu {
    width: 259px;
    height: 100vh;
  }
  .main-content {
    position: absolute;
    top: 0;
    left: 260px;
    right: 0;
    bottom: 0;
  }
}
</style>
