<template>
  <el-tag class="tag-item-wrapper" :closable="!fixed" @close.prevent.stop="closeItem">
    <span class="tag-item-dot"></span>
    <slot></slot>
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
    closeItem () {
      this.$emit('on-close')
    }
  }
}
</script>

<style lang="less">
  .tag-item-wrapper {
    display: inline-block;
    vertical-align: middle;
    height: 32px;
    margin: 4px 2px;
    padding: 0 10px;
    border-radius: 3px;
    line-height: 32px;
    border: 1px solid #e8eaec;
    color: #555;
    background: #fff;
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
