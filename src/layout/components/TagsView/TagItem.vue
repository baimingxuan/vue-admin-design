<template>
  <el-tag class="tag-item-wrapper" :closable="!fixed" @close.prevent.stop="closeItem">
    <span class="tag-item-dot" />
    <slot />
  </el-tag>
</template>

<script>

export default {
  name: 'TagItem',
  props: {
    fixed: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    closeItem() {
      this.$emit('on-close')
    }
  }
}
</script>

<style lang="less">
.tag-item-wrapper {
  display: inline-block;
  vertical-align: middle;
  height: 32px!important;
  margin: 4px 2px!important;
  padding: 0 10px!important;
  border-radius: 3px!important;
  line-height: 32px!important;
  border: 1px solid #e8eaec!important;
  color: #555!important;
  background: #fff!important;
  overflow: hidden;
  cursor: pointer;
  .tag-item-dot {
    display: inline-block;
    width: 10px;
    height: 10px;
    margin-right: 6px;
    border-radius: 50%;
    background: #e8eaec;
  }
  &.active {
    .tag-item-dot {
      background: #409eff;
    }
  }
}
</style>
