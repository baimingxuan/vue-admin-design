<template>
  <div v-if="!item.hidden" class="side-menu-item">
    <el-menu-item index="2">
      <i class="el-icon-menu"></i>
      <span slot="title">导航二</span>
    </el-menu-item>
  </div>
</template>

<script>
export default {
  name: 'SideMenuItem',
  props: {
    item: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>

</style>
