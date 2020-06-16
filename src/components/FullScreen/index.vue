<template>
  <div class="full-screen-wrapper">
    <el-tooltip effect="dark" :content="isFullscreen ? '退出全屏' : '全屏'" placement="bottom">
      <i :class="isFullscreen ? 'vue-sys-icon-un-full-screen' : 'vue-sys-icon-quanping1'" @click="handleFullscreen"></i>
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

</style>
