<template>
  <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse"
           background-color="#304156"
           text-color="#fff"
           active-text-color="#409eff">
    <template>
      <router-link to="home">
        <el-menu-item index="1">
          <SvgIcon class="icon" icon-class="vue-sys-icon-home"></SvgIcon>
          <span slot="title">首页</span>
        </el-menu-item>
      </router-link>
    </template>
    <template>
      <router-link to="document">
        <el-menu-item index="2">
          <SvgIcon class="icon" icon-class="vue-sys-icon-mms"></SvgIcon>
          <span slot="title">文档</span>
        </el-menu-item>
      </router-link>
    </template>
    <template>
      <router-link to="icons">
        <el-menu-item index="3">
          <SvgIcon class="icon" icon-class="vue-sys-icon-about"></SvgIcon>
          <span slot="title">图标</span>
        </el-menu-item>
      </router-link>
    </template>
    <el-submenu index="4">
      <template slot="title">
        <SvgIcon class="icon" icon-class="vue-sys-icon-mm"></SvgIcon>
        <span slot="title">组件</span>
      </template>
      <template>
        <router-link to="/packages/rich-text">
          <el-menu-item index="4-1">
            <span slot="title">富文本编辑器</span>
          </el-menu-item>
        </router-link>
      </template>
      <template>
        <router-link to="/packages/avatar-upload">
          <el-menu-item index="4-2">
            <span slot="title">头像上传</span>
          </el-menu-item>
        </router-link>
      </template>
      <template>
        <router-link to="/packages/drag-list">
          <el-menu-item index="4-3">
            <span slot="title">拖拽列表</span>
          </el-menu-item>
        </router-link>
      </template>
      <template>
        <router-link to="/packages/tree">
          <el-menu-item index="4-4">
            <span slot="title">树形结构</span>
          </el-menu-item>
        </router-link>
      </template>
      <template>
        <router-link to="/packages/image-crop">
          <el-menu-item index="4-5">
            <span slot="title">图片裁剪</span>
          </el-menu-item>
        </router-link>
      </template>
    </el-submenu>
    <el-menu-item index="5">
      <SvgIcon class="icon" icon-class="vue-sys-icon-mcs"></SvgIcon>
      <span slot="title">国际化</span>
    </el-menu-item>
    <!--<el-submenu index="4">-->
      <!--<template slot="title">-->
        <!--<SvgIcon class="icon" icon-class="vue-sys-icon-mm"></SvgIcon>-->
        <!--<span slot="title">组件</span>-->
      <!--</template>-->
      <!--<el-submenu index="4-1">-->
        <!--<span slot="title">选项4</span>-->
        <!--<el-menu-item index="4-1-1">选项1</el-menu-item>-->
        <!--<el-menu-item index="4-1-2">选项2</el-menu-item>-->
        <!--<el-menu-item index="4-1-3">选项3</el-menu-item>-->
      <!--</el-submenu>-->
      <!--<el-menu-item index="4-2">选项9</el-menu-item>-->
    <!--</el-submenu>-->
  </el-menu>
</template>

<script>
import SvgIcon from '../../../../components/SvgIcon'
export default {
  data () {
    return {
      isCollapse: false
    }
  },
  components: {
    SvgIcon
  },
  computed: {
    routes () {
      return this.$router.options.routes
    }
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style scoped>
  .icon{
    width: 18px;
    height: 18px;
    font-size: 50px;
  }
</style>
