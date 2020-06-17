<template>
  <div class="fold-side-menu" :class="{'vertical': collapsed}" @click="toggle">
    <SvgIcon class="icon" icon-class="vue-sys-icon-menu"></SvgIcon>
  </div>
</template>

<script>
import SvgIcon from '../SvgIcon'

export default {
  name: 'FoldSideMenu',
  data () {
    return {
      collapsed: false
    }
  },
  components: { SvgIcon },
  methods: {
    toggle () {
      this.collapsed = !this.collapsed
    }
  }
}
</script>

<style lang="less">
.fold-side-menu {
  float: left;
  width: 22px;
  height: 22px;
  padding: 5px;
  cursor: pointer;
  &:hover {
    color: #409eff;
  }
  .icon {
    width: 22px;
    height: 22px;
    font-size: 100px;
    vertical-align: middle;
    transition: transform .2s ease;
  }
  &.vertical {
    .icon {
      transform: rotateZ(90deg);
      transition: transform .2s ease;
    }
  }
}
</style>
