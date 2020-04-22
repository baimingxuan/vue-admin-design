<template>
  <div class="tag-item">
    <span class="tag-item-dot"></span>
    <slot></slot>
    <SvgIcon @click.native="closeItem()" class="icon" icon-class="vue-sys-icon-quxiao1"/>
  </div>
</template>

<script>
import SvgIcon from '../../../../components/SvgIcon'
export default {
  name: 'TagItem',
  components: {
    SvgIcon
  },
  methods: {
    closeItem () {
      this.$emit('on-close')
    }
  }
}
</script>

<style lang="less">
  .tag-item {
    display: inline-block;
    vertical-align: middle;
    height: 30px;
    margin: 4px 2px;
    padding-left: 10px;
    padding-right: 6px;
    border-radius: 3px;
    line-height: 30px;
    border: 1px solid #e8eaec;
    color: #555;
    background: #fff;
    overflow: hidden;
    cursor: pointer;
    .icon {
      width: 20px;
      height: 20px;
      margin-left: 5px;
      font-size: 50px;
      color: #aeafb1;
      vertical-align: middle;
      cursor: pointer;
      &:hover {
        color: #409eff;
      }
    }
    .tag-item-dot {
      position: relative;
      top: 1px;
      display: inline-block;
      width: 10px;
      height: 10px;
      margin-right: 8px;
      border-radius: 50%;
      background: #e8eaec;
    }
  }
  .tag-item.active {
    .tag-item-dot{
      background: #409eff;
    }
  }
</style>
