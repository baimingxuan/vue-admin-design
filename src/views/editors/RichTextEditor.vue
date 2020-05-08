<template>
  <div class="rich-text-editor">
    <Editor></Editor>
  </div>
</template>

<script>
import Editor from '../../components/Editor'

export default {
  name: 'RichTextEditor',
  data () {
    return {
      content: ''
    }
  },
  components: { Editor }
}
</script>

<style lang="less">

</style>
