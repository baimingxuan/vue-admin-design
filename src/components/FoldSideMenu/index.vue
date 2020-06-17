<template>
  <div class="fold-side-menu" :class="{'vertical': collapsed}" @click="toggle">
    <i class="icon vue-sys-icon-menu"></i>
  </div>
</template>

<script>
export default {
  name: 'FoldSideMenu',
  data () {
    return {
      collapsed: false
    }
  },
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
    font-size: 22px;
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
