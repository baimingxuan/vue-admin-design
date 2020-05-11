<template>
  <div class="rich-text-editor">
    <Hints>
      <template v-slot:hintName>富文本编辑器</template>
      <template v-slot:hintInfo>
        <p></p>
        <p></p>
      </template>
    </Hints>
    <Editor></Editor>
  </div>
</template>

<script>
import Editor from '../../components/Editor'
import Hints from '../../components/Hints'

export default {
  name: 'RichTextEditor',
  data () {
    return {
      content: ''
    }
  },
  components: { Editor, Hints }
}
</script>

<style lang="less">

</style>
