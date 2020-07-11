<template>
  <div :class="{'editable': editable}"
    class="image-rich-text"
    spellcheck="false"
    :style="element.style"
    v-html="innerText"
    :contenteditable="editable"
    @focus="handleFocus"
    @blur="handleBlur"
    @keydown="$event.stopPropagation()"
    @keyup.stop="emitInput($event.target.innerHTML)"
    @paste="handlePaste"
    @click.stop>
  </div>
</template>

<script>
import { getPlainText } from '../../utils'

export default {
  name: 'ImageRichText',
  data () {
    return {
      innerText: this.value.replace(/\n/g, '<br>') || this.placeholder,
      isLocked: false
    }
  },
  props: {
    value: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: '请输入文本'
    },
    editable: {
      type: Boolean,
      default: false
    },
    element: {
      type: Object,
      default: () => {
        return {
          style: {}
        }
      }
    }
  },
  watch: {
    value (newValue, oldValue) {
      if (!this.isLocked || !newValue) {
        this.innerText = newValue
        // 强行删除参数文本时同步
        this.$el.innerHTML = this.innerText
        this.element.h = Math.ceil(this.$el.getBoundingClientRect().height)
      }
    }
  },
  methods: {
    emitInput (innerText) {
      this.$emit('input', innerText)
    },
    handleFocus (event) {
      this.isLocked = true
      if (event.target.innerHTML === this.placeholder) {
        event.target.innerHTML = ''
        this.emitInput(event.target.innerHTML)
      }
      this.$emit('focus')
    },
    handleBlur (event) {
      this.isLocked = false
      setTimeout(() => {
        if (event.target.innerHTML === '') {
          event.target.innerHTML = this.placeholder
          this.emitInput(event.target.innerHTML)
        }
        this.$emit('blur')
      }, 100)
    },
    handlePaste (event) {
      this.emitInput(getPlainText(event))
    }
  }
}
</script>

<style lang="less">
.image-rich-text {
  min-height: 18px;
  &.editabled {
    padding: 3px 8px;
    box-sizing: border-box;
    line-height: 14px;
    outline: none;
    word-break: break-all;
    user-select: auto;
  }
}
</style>
