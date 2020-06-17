<template>
  <div class="app-wrapper">
    <div class="side-container" :class="collapsed ? 'folded' : 'unfolded'">
      <SideMenu/>
    </div>
    <div class="main-container" :class="collapsed ? 'wider' : 'normal'">
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
import { mapGetters } from 'vuex'
import HeaderBar from './components/HeaderBar/index'
import SideMenu from './components/SideMenu/index'
import TagsNav from './components/TagsView/index'
import MainView from './components/MainView/index'

export default {
  name: 'Layout',
  components: { HeaderBar, SideMenu, TagsNav, MainView },
  computed: {
    ...mapGetters('app', ['collapsed'])
  }
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
    height: 100vh;
    background-color: #263238;
    &.unfolded {
      width: 260px;
    }
    &.folded {
      width: 64px;
    }
  }
  .main-container{
    float: left;
    height: 100vh;
    &.normal {
      width: calc(100% - 260px);
    }
    &.wider {
      width: calc(100% - 64px);
    }
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
