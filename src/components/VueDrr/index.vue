<template>
  <div
    class="z-drr-container"
    :style="style"
    :class="{
      'z-draggable': draggable,
      'z-resizable': resizable,
      'z-rotatable': rotatable,
      'z-active': enabled,
      'z-dragging': dragging,
      'z-resizing': resizing,
      'z-rotating': rotating
    }"
    @mousedown="elmDown"
  >
    <div
      v-if="rotatable"
      class="z-rotateable-handle"
      :style="{ display: enabled ? 'block' : 'none'}"
      @touchstart.prevent.stop="elmDown"
      @mousedown.stop.prevent="rotating = true"
      @dblclick="fillParent"
    />
    <div
      v-for="handle in handles"
      v-if="resizable"
      :key="handle"
      class="z-resizeable-handle"
      :class="'z-handle-' + handle"
      :style="{ display: enabled ? 'block' : 'none'}"
      @touchstart.stop.prevent="handleDown(handle, $event)"
      @mousedown.stop.prevent="handleResizeStart(handle, $event)"
    />
    <slot />
  </div>
</template>

<script>
import { matchesSelectorToParentElements } from './utils/dom'

export default {
  name: 'VueDrr',
  props: {
    active: {
      type: Boolean,
      default: false
    },
    draggable: {
      type: Boolean,
      default: true
    },
    resizable: {
      type: Boolean,
      default: true
    },
    rotatable: {
      type: Boolean,
      default: true
    },
    canDeactive: {
      type: Boolean,
      default: true
    },
    w: {
      type: [Number],
      default: 200
    },
    h: {
      type: [Number, String],
      default: 28,
      validator: function(val) {
        const valid = (typeof val === 'string') ? val === 'auto' : val >= 0
        return valid
      }
    },
    ratio: {
      type: [Number, String]
    },
    contains: {
      type: Boolean,
      default: false
    },
    minw: {
      type: Number,
      default: 28,
      validator(val) {
        return val > 0
      }
    },
    minh: {
      type: Number,
      default: 28,
      validator(val) {
        return val > 0
      }
    },
    angle: {
      type: Number,
      default: 0,
      validator(val) {
        return typeof val === 'number'
      }
    },
    x: {
      type: Number,
      default: 0,
      validator(val) {
        return typeof val === 'number'
      }
    },
    y: {
      type: Number,
      default: 0,
      validator(val) {
        return typeof val === 'number'
      }
    },
    z: {
      type: [String, Number],
      default: 'auto',
      validator: function(val) {
        const valid = (typeof val === 'string') ? val === 'auto' : val >= 0
        return valid
      }
    },
    handles: {
      type: Array,
      default() {
        return ['n', 'e', 's', 'w', 'nw', 'ne', 'se', 'sw']
      },
      validator: function(val) {
        const s = new Set(['n', 'e', 's', 'w', 'nw', 'ne', 'se', 'sw'])

        return new Set(val.filter(h => s.has(h))).size === val.length
      }
    },
    dragHandle: {
      type: String,
      default: null
    },
    dragCancel: {
      type: String,
      default: null
    },
    axis: {
      type: String,
      default: 'both',
      validator(val) {
        return ['x', 'y', 'both'].indexOf(val) !== -1
      }
    },
    grid: {
      type: Array,
      default() {
        return [1, 1]
      }
    },
    parent: {
      type: Boolean,
      default: false
    },
    overflowY: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      top: this.y,
      left: this.x,
      width: this.w,
      height: this.h,
      rotateAngle: this.angle,
      resizing: false,
      dragging: false,
      rotating: false,
      enabled: this.active,
      handle: null,
      zIndex: this.z,
      parentW: 9999,
      parentH: 9999,
      mouseX: 0,
      mouseY: 0,
      lastMouseX: 0,
      lastMouseY: 0,
      mouseOffX: 0,
      mouseOffY: 0,
      elmX: 0,
      elmY: 0,
      elmW: 0,
      elmH: 0
    }
  },
  computed: {
    style() {
      return {
        top: this.top + 'px',
        left: this.left + 'px',
        width: this.width + 'px',
        height: this.height + 'px',
        transform: 'rotate(' + this.rotateAngle + 'deg)',
        zIndex: this.zIndex,
        overflowY: this.overflowY,
        overflowX: ''
      }
    }
  },
  watch: {
    active(val) {
      this.enabled = val
    },
    x(val) {
      this.left = val
      this.elmX = val
    },
    y(val) {
      this.top = val
      this.elmY = val
    },
    z: function(val) {
      if (val >= 0 || val === 'auto') {
        this.zIndex = val
      }
    },
    w(val) {
      this.width = val
      this.elmW = val
    },
    h(val) {
      this.height = val
      this.elmH = val
    },
    angle(val) {
      this.rotateAngle = val
    }
  },
  mounted() {
    const container = document.querySelector('.editor-mask') || document.documentElement
    container.addEventListener('mousedown', this.deselect, false)
    container.addEventListener('mousemove', this.handleMove, false)
    container.addEventListener('mouseup', this.handleUp, false)

    // touch events bindings
    container.addEventListener('touchmove', this.handleMove, false)
    container.addEventListener('touchend touchcancel', this.deselect, false)
    container.addEventListener('touchstart', this.handleUp, false)

    this.elmX = parseInt(this.$el.style.left)
    this.elmY = parseInt(this.$el.style.top)
    this.elmW = this.$el.offsetWidth || this.$el.clientWidth
    this.elmH = this.$el.offsetHeight || this.$el.clientHeight

    this.reviewDimensions()
  },
  beforeDestroy() {
    const container = document.querySelector('.editor-mask') || document.documentElement
    container.removeEventListener('mousedown', this.deselect, false)
    container.removeEventListener('mousemove', this.handleMove, false)
    container.removeEventListener('mouseup', this.handleUp, false)

    // touch events bindings removed
    container.addEventListener('touchmove', this.handleMove, false)
    container.addEventListener('touchend touchcancel', this.deselect, false)
    container.addEventListener('touchstart', this.handleUp, false)
  },
  methods: {
    reviewDimensions() {
      if (this.minw > this.w) {
        this.width = this.minw
      }

      if (this.minh > this.h) {
        this.height = this.minh
      }

      if (this.parent) {
        const parentW = parseInt(this.$el.parentNode.clientWidth, 10)
        const parentH = parseInt(this.$el.parentNode.clientHeight, 10)

        this.parentW = parentW
        this.parentH = parentH

        if (this.w > this.parentW) {
          this.width = parentW
        }

        if (this.h > this.parentH) {
          this.height = parentH
        }

        if ((this.x + this.w) > this.parentW) {
          this.width = parentW - this.x
        }

        if ((this.y + this.h) > this.parentH) {
          this.height = parentH - this.y
        }

        this.elmW = this.width
        this.elmH = this.height
      }

      this.$emit('resizing', this.left, this.top, this.width, this.height)
    },
    elmDown(e) {
      const target = e.target || e.srcElement
      if (this.$el.contains(target)) {
        if (
          (this.dragHandle && !matchesSelectorToParentElements(target, this.dragHandle, this.$el)) ||
          (this.dragCancel && matchesSelectorToParentElements(target, this.dragCancel, this.$el))) {
          return
        }
        this.reviewDimensions()

        if (!this.enabled) {
          this.enabled = true
          this.$emit('activated')
          this.$emit('update:active', true)
        }
        if (this.draggable) {
          this.dragging = true
        }
      }
    },
    deselect(e) {
      if (e.type.indexOf('touch') !== -1) {
        this.mouseX = e.changedTouches[0].clientX
        this.mouseY = e.changedTouches[0].clientY
      } else {
        this.mouseX = e.pageX || e.clientX + document.documentElement.scrollLeft
        this.mouseY = e.pageY || e.clientY + document.documentElement.scrollTop
      }

      this.lastMouseX = this.mouseX
      this.lastMouseY = this.mouseY

      const target = e.target || e.srcElement
      const regex = new RegExp('z-handle-([nesw]{1, 2})', '')
      // 点击在当前组件外，取消active状态
      if (!this.$el.contains(target) && !regex.test(target.className)) {
        if (this.enabled) {
          if (this.canDeactive) {
            this.enabled = false
            this.$emit('deactivated')
            this.$emit('update:active', false)
          }
        }
      }
    },
    handleResizeStart(handle, e) {
      this.handle = handle

      if (e.stopPropagation) e.stopPropagation()
      if (e.preventDefault) e.preventDefault()

      this.resizing = true
    },

    handleDown: function(handle, e) {
      this.handle = handle

      if (e.stopPropagation) e.stopPropagation()
      if (e.preventDefault) e.preventDefault()

      this.resizing = true
    },
    fillParent: function(e) {
      if (!this.parent || !this.resizable || !this.maximize) return

      let done = false

      const animate = () => {
        if (!done) {
          window.requestAnimationFrame(animate)
        }

        if (this.axis === 'x') {
          if (
            this.width === this.parentW && this.left === 0
          ) {
            done = true
          }
        } else if (this.axis === 'y') {
          if (
            this.height === this.parentH && this.top === 0
          ) {
            done = true
          }
        } else if (this.axis === 'both') {
          if (
            this.width === this.parentW &&
            this.height === this.parentH &&
            this.top === 0 &&
            this.left === 0
          ) {
            done = true
          }
        }

        if (this.axis === 'x' || this.axis === 'both') {
          if (this.width < this.parentW) {
            this.width++
            this.elmW++
          }

          if (this.left > 0) {
            this.left--
            this.elmX--
          }
        }

        if (this.axis === 'y' || this.axis === 'both') {
          if (this.height < this.parentH) {
            this.height++
            this.elmH++
          }

          if (this.top > 0) {
            this.top--
            this.elmY--
          }
        }

        this.$emit('resizing', this.left, this.top, this.width, this.height)
      }

      window.requestAnimationFrame(animate)
    },
    getOrigin() {
      const rect = this.$el.getBoundingClientRect()
      return {
        x: (rect.left + rect.right) / 2,
        y: (rect.bottom + rect.top) / 2
      }
    },
    handleMove(e) {
      const lastMouseX = this.lastMouseX
      const lastMouseY = this.lastMouseY
      const isTouchMove = e.type.indexOf('touchmove') !== -1
      this.mouseX = isTouchMove
        ? e.touches[0].clientX
        : e.pageX || e.clientX + document.documentElement.scrollLeft
      this.mouseY = isTouchMove
        ? e.touches[0].clientY
        : e.pageY || e.clientY + document.documentElement.scrollTop

      let diffX = this.mouseX - this.lastMouseX + this.mouseOffX
      let diffY = this.mouseY - this.lastMouseY + this.mouseOffY

      this.mouseOffX = this.mouseOffY = 0

      this.lastMouseX = this.mouseX
      this.lastMouseY = this.mouseY

      const dX = diffX
      const dY = diffY

      if (this.resizing) {
        if (this.handle.indexOf('n') >= 0) {
          if (this.elmH - dY < this.minh) {
            this.mouseOffY = (dY - (diffY = this.elmH - this.minh))
          } else if (this.parent && this.elmY + dY < 0) {
            this.mouseOffY = dY - (diffY = -this.elmY)
          }
          this.elmY += diffY
          this.elmH -= diffY
        }

        if (this.handle.indexOf('s') >= 0) {
          if (this.elmH + dY < this.minh) {
            this.mouseOffY = (dY - (diffY = this.minh - this.elmH))
          } else if (this.parent && this.elmY + this.elmH + dY > this.parentH) {
            this.mouseOffY = (dY - (diffY = this.parentH - this.elmY - this.elmH))
          }
          this.elmH += diffY
        }

        if (this.handle.indexOf('w') >= 0) {
          if (this.elmW - dX < this.minw) {
            this.mouseOffX = (dX - (diffX = this.elmW - this.minw))
          } else if (this.parent && this.elmX + dX < 0) {
            this.mouseOffX = dX - (diffX = -this.elmX)
          }
          this.elmX += diffX
          this.elmW -= diffX
        }

        if (this.handle.indexOf('e') >= 0) {
          if (this.elmW + dX < this.minw) {
            this.mouseOffX = (dX - (diffX = this.minw - this.elmW))
          } else if (this.parent && this.elmX + this.elmW + dX > this.parentW) {
            this.mouseOffX = (dX - (diffX = this.parentW - this.elmX - this.elmW))
          }
          this.elmW += diffX
        }

        this.left = (Math.round(this.elmX / this.grid[0]) * this.grid[0])
        this.top = (Math.round(this.elmY / this.grid[1]) * this.grid[1])

        this.width = (Math.round(this.elmW / this.grid[0]) * this.grid[0])
        this.height = (Math.round(this.elmH / this.grid[1]) * this.grid[1])
        this.$emit('resizing', this.left, this.top, this.width, this.height)
      } else if (this.dragging) {
        if (this.parent) {
          if (this.elmX + dX < 0) {
            this.mouseOffX = dX - (diffX = -this.elmX)
          } else if (this.elmX + this.elmW + dX > this.parentW) {
            this.mouseOffX = (dX - (diffX = this.parentW - this.elmX - this.elmW))
          }
          if (this.elmY + dY < 0) {
            this.mouseOffY = dY - (diffY = -this.elmY)
          } else if (this.elmY + this.elmH + dY > this.parentH) {
            this.mouseOffY = dY - (diffY = this.parentH - this.elmY - this.elmH)
          }
        }

        this.elmX += diffX
        this.elmY += diffY
        if (this.axis === 'x' || this.axis === 'both') {
          // 四舍五入取得当前所在格子数 * 每个格子的单位像素，保证每一个点子在格子上
          this.left = (Math.round(this.elmX / this.grid[0]) * this.grid[0])
        }
        if (this.axis === 'y' || this.axis === 'both') {
          this.top = (Math.round(this.elmY / this.grid[1]) * this.grid[1])
        }

        this.$emit('dragging', this.left, this.top)
      } else if (this.rotating) {
        const origin = this.getOrigin()
        const lastAngle = Math.atan2(lastMouseY - origin.y, lastMouseX - origin.x)
        const currentAngle = Math.atan2(this.mouseY - origin.y, this.mouseX - origin.x)
        this.rotateAngle += Math.round((currentAngle - lastAngle) * 180 / Math.PI)
        this.$emit('rotating', this.rotateAngle)
      }
    },
    handleUp(e) {
      if (e.type.indexOf('touch') !== -1) {
        this.lastMouseX = e.changedTouches[0].clientX
        this.lastMouseY = e.changedTouches[0].clientY
      }
      this.handle = null
      if (this.resizing) {
        this.resizing = false
        this.$emit('resizestop', this.left, this.top, this.width, this.height)
      }
      if (this.dragging) {
        this.dragging = false
        this.$emit('dragstop', this.left, this.top)
      }

      if (this.rotating) {
        this.rotating = false
        this.$emit('rotatestop', this.rotateAngle)
      }

      this.elmX = this.left
      this.elmY = this.top
    }
  }
}
</script>

<style lang="less" scoped>
  @import '../../assets/less/variables';
  @main-color: #2e95ff;
  @circle-size: 8px;

  .z-drr-container {
    position: absolute;
    border: 1px dashed transparent;
    *, *:before, *:after {
      padding: 0;
      margin: 0;
      box-sizing: border-box;
      -moz-box-sizing: border-box;
    }
  }

  .z-draggable:hover {
    cursor: move;
  }

  .circle(@bgc: #fff) {
    position: absolute;
    width: @circle-size;
    height: @circle-size;
    border: 1px solid @main-color;
    border-radius: 50%;
    background: @bgc;
  }

  .z-rotateable-handle {
    position: absolute;
    left: 50%;
    top: -@circle-size * 3;
    width: 1px;
    height: @circle-size * 3;
    margin-left: -.5px;
    background-color: @main-color;
    cursor: url(../../assets/img/mouse-rotate.png) 8 8, default;
    &:after {
      content: ' ';
      top: 0;
      left: 0;
      margin-left: -(@circle-size - 1)/2;
      .circle(@main-color);
    }
  }

  .z-resizeable-handle {
    display: none;
    position: absolute;
  }

  .z-handle-nw,
  .z-handle-ne,
  .z-handle-sw,
  .z-handle-se {
    .circle;
  }

  .z-handle-nw {
    top: -@circle-size/2;
    left: -@circle-size/2;
    cursor: nw-resize;
  }

  .z-handle-ne {
    top: -@circle-size/2;
    right: -@circle-size/2;
    cursor: ne-resize;
  }

  .z-handle-sw {
    bottom: -@circle-size/2;
    left: -@circle-size/2;
    cursor: sw-resize;
  }

  .z-handle-se {
    bottom: -@circle-size/2;
    right: -@circle-size/2;
    cursor: se-resize;
  }

  .z-handle-n,
  .z-handle-w,
  .z-handle-e,
  .z-handle-s {
    &:after {
      content: ' ';
      .circle;
    }
  }

  .z-handle-n {
    top: 0;
    left: 0;
    width: 100%;
    height: @circle-size/2;
    cursor: n-resize;
    &:after {
      bottom: 0;
      left: 50%;
      margin-left: -@circle-size/2;
    }
  }

  .z-handle-w {
    top: 0;
    left: 0;
    width: @circle-size/2;
    height: 100%;
    cursor: w-resize;
    &:after {
      top: 50%;
      right: 0;
      margin-top: -@circle-size/2;
    }
  }

  .z-handle-e {
    top: 0;
    right: 0;
    width: @circle-size/2;
    height: 100%;
    cursor: e-resize;
    &:after {
      top: 50%;
      left: 0;
      margin-top: -@circle-size/2;
    }
  }

  .z-handle-s {
    bottom: 0;
    left: 0;
    width: 100%;
    height: @circle-size/2;
    cursor: s-resize;
    &:after {
      top: 0;
      left: 50%;
      margin-left: -@circle-size/2;
    }
  }

  .z-active {
    border: 1px dashed @main-color;
    z-index: 999;
  }
</style>
