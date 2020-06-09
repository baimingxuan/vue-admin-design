<template>
  <el-menu default-active="1-4-1"
           @open="handleOpen"
           @close="handleClose"
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
  components: {
    SvgIcon,
    SideMenuItem
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

<style lang="less">

</style>
