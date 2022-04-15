<template>
  <div class="editor-wrapper">
    <div style="border: 1px solid #ccc;">
      <Toolbar
        style="border-bottom: 1px solid #ccc"
        :editor="editor"
        :default-config="toolbarConfig"
        :mode="mode"
      />
      <Editor
        v-model="html"
        style="height: 500px; overflow-y: hidden;"
        :default-config="editorConfig"
        :mode="mode"
        @onCreated="onCreated"
      />
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import '@wangeditor/editor/dist/css/style.css'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'

export default Vue.extend({
  components: { Editor, Toolbar },
  data() {
    return {
      editor: null,
      html: '<p>hello</p>',
      toolbarConfig: { },
      editorConfig: { placeholder: '请输入内容...' },
      mode: 'default' // or 'simple'
    }
  },
  mounted() {
    // 模拟 ajax 请求，异步渲染编辑器
    setTimeout(() => {
      this.html = '<p>模拟 Ajax 异步设置内容 HTML</p>'
    }, 1500)
  },
  beforeDestroy() {
    const editor = this.editor
    if (editor == null) return
    editor.destroy() // 组件销毁时，及时销毁编辑器
  },
  methods: {
    onCreated(editor) {
      this.editor = Object.seal(editor) // 一定要用 Object.seal() ，否则会报错
    }
  }
})
</script>

<style lang="less">
  .editor-wrapper{
    .editor-container{
      text-align:left;
      box-shadow: rgba(0, 0, 0, 0.1) 0 2px 12px 0;
      .w-e-toolbar{
        padding: 5px;
        border: none!important;
      }
      .w-e-text-container{
        min-height: 450px !important;
        border: none!important;
        .w-e-text{
          padding: 10px;
          overflow-y: auto;
        }
      }
    }
  }
</style>
