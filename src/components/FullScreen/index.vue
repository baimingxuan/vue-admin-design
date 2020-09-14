<template>
  <div class="full-screen-wrapper" @click="handleFullscreen">
    <el-tooltip effect="dark" :content="isFullscreen ? '退出全屏' : '全屏'" placement="bottom">
      <i :class="['icon', !isFullscreen ? 'vue-dsn-icon-fullscreen' : 'vue-dsn-icon-tuichuquanping']" />
    </el-tooltip>
  </div>
</template>

<script>
import screenfull from 'screenfull'

export default {
  name: 'FullScreen',
  data() {
    return {
      isFullscreen: false
    }
  },
  mounted() {
    this.init()
  },
  beforeDestroy() {
    this.destroy()
  },
  methods: {
    handleFullscreen() {
      if (screenfull.enabled) {
        this.$message({
          message: '不支持全屏!',
          type: 'warning'
        })
        return false
      }
      screenfull.toggle()
    },
    change() {
      this.isFullscreen = screenfull.isFullscreen
    },
    init() {
      if (!screenfull.enabled) {
        screenfull.on('change', this.change)
      }
    },
    destroy() {
      if (!screenfull.enabled) {
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
  padding: 4px;
  cursor: pointer;
  .icon {
    font-size: 24px;
  }
  &:hover {
    color: #409eff;
  }
}
</style>
