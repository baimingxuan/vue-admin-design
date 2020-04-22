<template>
  <div v-if="showFullScreenBtn" class="full-screen">
    <el-tooltip effect="dark" :content="IsFullScreen ? '退出全屏' : '全屏'" placement="bottom">
      <SvgIcon class="icon"
               @click.native="handleFullscreen"
               :icon-class="IsFullScreen ? 'vue-sys-icon-un-full-screen' : 'vue-sys-icon-quanping1'">
      </SvgIcon>
    </el-tooltip>
  </div>
</template>

<script>
import SvgIcon from '../../../../components/SvgIcon'
export default {
  name: 'FullScreen',
  data () {
    return {
      IsFullScreen: false
    }
  },
  components: {
    SvgIcon
  },
  computed: {
    showFullScreenBtn () {
      return window.navigator.userAgent.indexOf('MSIE') < 0
    }
  },
  mounted () {
    let isFullscreen = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen
    isFullscreen = !!isFullscreen
    document.addEventListener('fullscreenchange', () => {
      this.$emit('input', !this.value)
      this.$emit('on-change', !this.value)
    })
    document.addEventListener('mozfullscreenchange', () => {
      this.$emit('input', !this.value)
      this.$emit('on-change', !this.value)
    })
    document.addEventListener('webkitfullscreenchange', () => {
      this.$emit('input', !this.value)
      this.$emit('on-change', !this.value)
    })
    document.addEventListener('msfullscreenchange', () => {
      this.$emit('input', !this.value)
      this.$emit('on-change', !this.value)
    })
    this.$emit('input', isFullscreen)
  },
  methods: {
    handleFullscreen () {
      let main = document.body
      if (this.value) {
        if (document.exitFullscreen) {
          document.exitFullscreen()
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen()
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen()
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen()
        }
      } else {
        if (main.requestFullscreen) {
          main.requestFullscreen()
        } else if (main.mozRequestFullScreen) {
          main.mozRequestFullScreen()
        } else if (main.webkitRequestFullScreen) {
          main.webkitRequestFullScreen()
        } else if (main.msRequestFullscreen) {
          main.msRequestFullscreen()
        }
      }
    }
  }
}
</script>

<style lang="less">
  .full-screen {
    float: left;
    width: 22px;
    height: 22px;
    padding: 5px;
    cursor: pointer;
    &:hover{
      color: #409eff;
    }
    .icon {
      width: 22px;
      height: 22px;
      font-size: 100px;
      vertical-align: middle;
    }
  }

</style>
