<template>
  <div class="markdown-editor">
    <mavonEditor
      v-model="content"
      ref="markdown"
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
      img_file: {}
    }
  },
  components: { mavonEditor },
  methods: {
    // 绑定@imgAdd event
    imageAdd (pos, $file) {
      // 第一步.将图片上传到服务器.
      var formdata = new FormData()
      formdata.append('image', $file)
      axios({
        url: 'server url',
        method: 'post',
        data: formdata,
        headers: { 'Content-Type': 'multipart/form-data' }
      }).then((url) => {
        // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
        /**
         * $vm 指为mavonEditor实例，可以通过如下两种方式获取
         * 1. 通过引入对象获取: `import {mavonEditor} from ...` 等方式引入后，`$vm`为`mavonEditor`
         * 2. 通过$refs获取: html声明ref : `<mavon-editor ref=md ></mavon-editor>，`$vm`为 `this.$refs.md`
         */
        this.$refs.markdown.$img2Url(pos, url)
      })
    },
    imageDel (pos) {
      delete this.img_file[pos]
    }
  }
}
</script>

<style lang="less">

</style>
