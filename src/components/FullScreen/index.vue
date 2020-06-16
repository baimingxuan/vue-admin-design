<template>
  <div class="full-screen-wrapper">
    <el-tooltip effect="dark" :content="isFullscreen ? '退出全屏' : '全屏'" placement="bottom">
      <i :class="['icon', isFullscreen ? 'vue-sys-icon-fullscreen' : 'vue-sys-icon-tuichuquanping']" @click="handleFullscreen"></i>
    </el-tooltip>
  </div>
</template>

<script>
import screenfull from 'screenfull'

export default {
  name: 'FullScreen',
  data () {
    return {
      isFullscreen: false
    }
  },
  mounted () {
    this.init()
  },
  beforeDestroy () {
    this.destroy()
  },
  methods: {
    handleFullscreen () {
      if (!screenfull.enabled) {
        this.$message({
          message: 'you browser can not work',
          type: 'warning'
        })
        return false
      }
      screenfull.toggle()
    },
    change () {
      this.isFullscreen = screenfull.isFullscreen
    },
    init () {
      if (screenfull.enabled) {
        screenfull.on('change', this.change)
      }
    },
    destroy () {
      if (screenfull.enabled) {
        screenfull.off('change', this.change)
      }
    }
  }
}
</script>

<style lang="less">
.full-screen-wrapper {
  float: left;
  width: 22px;
  height: 22px;
  cursor: pointer;
  .icon {
    font-size: 22px;
  }
  &:hover {
    color: #409eff;
  }
}
</style>
