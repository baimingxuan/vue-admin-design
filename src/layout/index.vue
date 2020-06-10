<template>
  <div class="app-wrapper">
    <div class="side-container">
      <SideMenu/>
    </div>
    <div class="main-container">
      <div class="main-header">
        <HeaderBar/>
        <TagsNav/>
      </div>
      <div class="main-content">
        <el-scrollbar wrap-class="scrollbar">
          <MainView/>
        </el-scrollbar>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderBar from './components/HeaderBar/index'
import SideMenu from './components/SideMenu/index'
import TagsNav from './components/TagsView/index'
import MainView from './components/MainView'
export default {
  name: 'Layout',
  components: { HeaderBar, SideMenu, TagsNav, MainView }
}
</script>

<style lang="less">
@import "../assets/less/scroll-bar";
.app-wrapper{
  width: 100%;
  height: 100%;
  overflow: hidden;
  .side-container{
    float: left;
    width: 260px;
    height: 100vh;
    background-color: #304156;
  }
  .main-container{
    float: left;
    width: calc(100% - 260px);
    height: 100vh;
    .main-content{
      .el-scrollbar{
        height: calc(100vh - 64px - 40px);
        .scroll-bar;
        .scrollbar{
          height: 100%;
          overflow-x: hidden;
        }
      }
    }
  }
}
</style>
