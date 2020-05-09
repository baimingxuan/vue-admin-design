<template>
  <div class="markdown-editor">
    <mavonEditor
      v-model="content"
      ref="markdownEle"
      @imgAdd="imageAdd"
      @imgDel="imageDel"
      style="min-height: 500px"/>
  </div>
</template>

<script>
import { axios } from 'axios'
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

export default {
  name: 'MarkdownEditor',
  data () {
    return {
      content: '',
      imageFile: {}
    }
  },
  components: { mavonEditor },
  methods: {
    // 绑定@imgAdd event
    imageAdd (pos, file) {
      // 将图片上传到服务器
      let formData = new FormData()
      formData.append('image', file)
      this.imageFile[pos] = file
      axios({
        url: 'server url',
        method: 'post',
        data: formData,
        headers: { 'Content-Type': 'multipart/form-data' }
      }).then(res => {
        let data = res.data
        this.$refs.markdownEle.$img2Url(pos, data.url)
      })
    },
    // 绑定@imgDel event
    imageDel (pos) {
      delete this.imageFile[pos]
    }
  }
}
</script>

<style lang="less">

</style>
