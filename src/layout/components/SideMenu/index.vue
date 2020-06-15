<template>
  <div class="side-menu-wrapper">
    <el-scrollbar wrap-class="scrollbar">
      <el-menu :default-active="activeMenu"
        :collapse="isCollapse"
        :unique-opened="true"
        background-color="#304156"
        text-color="#fff"
        active-text-color="#409eff">
        <SideMenuItem
          v-for="route in routes"
          :key="route.path"
          :item="route"
          :base-path="route.path"/>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import SvgIcon from '../../../components/SvgIcon'
import SideMenuItem from './SideMenuItem'
export default {
  name: 'SideMenu',
  data () {
    return {
      isCollapse: false
    }
  },
  components: { SvgIcon, SideMenuItem },
  computed: {
    routes () {
      return this.$router.options.routes
    },
    activeMenu () {
      const route = this.$route
      const { meta, path } = route
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    }
  }
}
</script>

<style lang="less">
@import "../../../assets/less/scroll-bar";
.side-menu-wrapper {
  .el-scrollbar {
    height: 100vh;
    .scroll-bar;
    .scrollbar {
      height: 100%;
      overflow-x: hidden;
      .el-menu {
        border-right: none;
        .side-menu-item {
          .el-submenu__title * {
            vertical-align: top;
          }
        }
      }
    }
  }
}
</style>
