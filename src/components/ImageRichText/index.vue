<template>
  <div class="image-rich-text"
    spellcheck="false"
    contenteditable="true"
    :style="element.style"
    v-html="innerText"
    @focus="handleFocus"
    @keydown="$event.stopPropagation()"
    @keyup.stop="emitInput($event)"
    @paste="handlePaste($event)"
    @click.stop>
  </div>
</template>

<script>
import { getPlainText, keepCursorEnd } from '../../utils'

export default {
  name: 'ImageRichText',
  data () {
    return {
      innerText: this.value.replace(/\n/g, '<br>')
    }
  },
  props: {
    value: {
      type: String,
      default: '请输入文本'
    },
    element: {
      type: Object,
      default: () => {
        return {
          style: {}
        }
      }
    },
    activeEleText: {
      type: Object,
      default: () => {}
    }
  },
  watch: {
    value (val) {
      this.innerText = val
    }
  },
  methods: {
    // 输入文本
    emitInput (event) {
      this.$emit('input', event.target.innerHTML)
      this.keepCursorLast(event)
    },
    // 粘贴文本
    handlePaste (event) {
      this.$emit('input', getPlainText(event))
      this.keepCursorLast(event)
    },
    // 光标定位到最后
    keepCursorLast (event) {
      this.$nextTick(() => {
        keepCursorEnd(event.target)
      })
    },
    // 光标聚焦
    handleFocus () {
      this.activeEleText.active = true
    }
  }
}
</script>

<style lang="less">
.image-rich-text {
  min-height: 18px;
  padding: 6px 8px!important;
  outline: none;
  word-break: break-all;
}
</style>
