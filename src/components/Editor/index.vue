<template>
  <div class="editor-wrapper">
    <Toolbar
      :editor="editor"
      :mode="mode"
      :default-config="toolbarConfig"
    />
    <Editor
      v-model="html"
      :mode="mode"
      :default-config="editorConfig"
      @onCreated="onCreated"
      @onChange="onChange"
    />
  </div>
</template>

<script>
import Vue from 'vue'
import '@wangeditor/editor/dist/css/style.css'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'

export default Vue.extend({
  components: { Editor, Toolbar },
  model: {
    prop: 'value',
    event: 'input'
  },
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      editor: null,
      mode: 'simple', // or 'default'
      html: '请输入内容...',
      toolbarConfig: { },
      editorConfig: {
        placeholder: '请输入内容...'
      }
    }
  },
  watch: {
    value(val) {
      this.html = val
    }
  },
  beforeDestroy() {
    const editor = this.editor
    if (editor == null) return
    editor.destroy() // 组件销毁时，及时销毁编辑器
  },
  methods: {
    onCreated(editor) {
      this.editor = Object.seal(editor) // 一定要用 Object.seal() ，否则会报错
    },
    onChange(editor) {
      this.$emit('input', editor.getHtml())
    }
  }
})
</script>

<style lang="less">
  .editor-wrapper{
    box-shadow: rgba(0, 0, 0, 0.1) 0 2px 12px 0;
    .w-e-toolbar{
      background-color:#f1f1f1;
    }
    .w-e-text-container{
      min-height: 450px !important;
    }
  }
</style>
