<template>
  <VueDrr
    class="element-drr-wrapper"
    :x="element.x"
    :y="element.y"
    :w="element.w"
    :h="element.h"
    :handles="handles"
    :active="element.active"
    :minw="80"
    :minh="18"
    :parent="true"
    :rotatable="false"
    @dragstop="handleDragStop"
    @resizing="handleResizing"
    @resizestop="handleResizeStop"
    @deactivated="handleDeactivate"
    @activated="handleActivated"
  >
    <slot />
  </VueDrr>
</template>

<script>
import VueDrr from '../../components/VueDrr'

export default {
  name: 'ElementDrr',
  components: { VueDrr },
  props: {
    element: {
      type: Object,
      default: () => {}
    },
    handles: {
      type: Array,
      default: () => ['n', 'e', 's', 'w', 'nw', 'ne', 'se', 'sw']
    }
  },
  watch: {
    element: {
      handler(val) {
        this.$nextTick(() => {
          this.updateHeight()
        })
      },
      deep: true
    }
  },
  methods: {
    // 同步更新容器高度
    updateHeight() {
      if (this.element.type === 'text') {
        const node = this.$el
        this.$nextTick(() => {
          const viewHeight = Math.ceil(node.parentNode.getBoundingClientRect().height)
          const h = Math.ceil(node.querySelector('.image-rich-text').getBoundingClientRect().height)
          if (this.element.y + h >= viewHeight) {
            this.element.y = viewHeight - h
          }
          node.style.height = h + 'px'
          this.element.h = h
        })
      }
    },
    // 处理拖放
    handleDragStop(x, y) {
      if (this.element.x !== x || this.element.y !== y) {
        this.element.x = x
        this.element.y = y
      }
    },
    // 缩放文本时更新高度
    handleResizing() {
      if (this.element.type === 'text') {
        this.updateHeight()
      }
    },
    // 处理缩放
    handleResizeStop(x, y, w, h) {
      if (this.element.x !== x || this.element.y !== y || this.element.w !== w || this.element.h !== h) {
        this.element.x = x
        this.element.y = y
        this.element.w = w
        if (this.element.type === 'text') {
          this.updateHeight()
        } else {
          this.element.h = h
        }
      }
    },
    // 处理失焦
    handleDeactivate() {
      this.element.active = false
    },
    // 处理聚焦
    handleActivated() {
      this.element.active = true
      this.$emit('updateActiveEle', this.element)
    }
  }
}
</script>

<style lang="less">
.element-drr-wrapper {
  .z-handle-nw,
  .z-handle-ne,
  .z-handle-sw,
  .z-handle-se,
  .z-handle-n:after,
  .z-handle-w:after,
  .z-handle-e:after,
  .z-handle-s:after {
    width: 9px;
    height: 9px;
  }
}
</style>
