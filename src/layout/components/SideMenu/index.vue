<template>
  <div class="side-menu-wrapper">
    <el-scrollbar wrap-class="scrollbar">
      <el-menu default-active="1-4-1"
        :collapse="isCollapse"
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
    }
  }
}
</script>

<style lang="less">
@import "../../../assets/less/scroll-bar";
.side-menu-wrapper{
  .el-scrollbar{
    height: 100vh;
    .scroll-bar;
    .scrollbar{
      height: 100%;
      overflow-x: hidden;
      .el-menu{
        border-right: none;
      }
    }
  }
}
</style>
