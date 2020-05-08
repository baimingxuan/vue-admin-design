<template>
  <div class="rich-text-editor">
    <quillEditor v-model="content"/>
  </div>
</template>

<script>
import 'quill/dist/quill.snow.css'
import { quillEditor } from 'vue-quill-editor'

export default {
  name: 'RichTextEditor',
  data () {
    return {
      content: ''
    }
  },
  components: { quillEditor }
}
</script>

<style lang="less">

</style>
