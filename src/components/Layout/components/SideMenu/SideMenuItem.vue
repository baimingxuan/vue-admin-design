<template>
  <div v-if="!item.hidden" class="side-menu-item">
    <template>
      <router-link to="/doc/document">
        <el-menu-item index="2">
          <SvgIcon class="icon" icon-class="vue-sys-icon-mms"></SvgIcon>
          <span slot="title">文档</span>
        </el-menu-item>
      </router-link>
    </template>
  </div>
</template>

<script>
import SvgIcon from '../../../../components/SvgIcon'
export default {
  name: 'SideMenuItem',
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  components: {
    SvgIcon
  }
}
</script>

<style scoped>

</style>
