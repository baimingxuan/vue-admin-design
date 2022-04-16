<template>
  <div class="rich-text-editor">
    <Hints>
      <template slot="hintName">富文本编辑器</template>
      <template slot="hintInfo">
        <p>wangEditor:基于javascript和css开发的 Web富文本编辑器， 轻量、简洁、易用、开源免费</p>
        <p>该组件是对wangEditor进行Vue版的二次封装，Vue项目可直接拿来使用</p>
        <p>官方地址：访问 <el-link type="success" href="http://www.wangeditor.com/" target="_blank">wangEditor</el-link></p>
      </template>
    </Hints>
    <Editor v-model="content" />
  </div>
</template>

<script>
import Hints from '@/components/Hints'
import Editor from '@/components/Editor'

export default {
  name: 'RichTextEditor',
  components: { Editor, Hints },
  data() {
    return {
      content: '请输入内容...'
    }
  }
}
</script>
