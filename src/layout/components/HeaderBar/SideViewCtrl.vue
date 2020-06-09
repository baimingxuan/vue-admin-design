<template>
  <div class="side-view-ctrl" :class="{'vertical': collapsed}" @click="SideViewCtrl">
    <SvgIcon class="icon" icon-class="vue-sys-icon-menu"></SvgIcon>
  </div>
</template>

<script>
import SvgIcon from '../../../components/SvgIcon'
export default {
  name: 'SideViewCtrl',
  data () {
    return {
      collapsed: false
    }
  },
  components: {
    SvgIcon
  },
  methods: {
    SideViewCtrl () {
      this.collapsed = !this.collapsed
    }
  }
}
</script>

<style lang="less">
  .side-view-ctrl {
    float: left;
    width: 26px;
    height: 26px;
    padding: 3px;
    cursor: pointer;
    &:hover {
      color: #409eff;
    }
    .icon {
      width: 26px;
      height: 26px;
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
