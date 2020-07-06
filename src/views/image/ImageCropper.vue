<template>
  <div class="image-cropper-wrapper">
    <Hints>
      <template slot="hintName">图片裁剪Vue-Cropper</template>
      <template slot="hintInfo">
        <p>Vue-Cropper：一个优雅的图片裁剪插件，可实现裁剪、上传、下载功能，并支持下载PNG、JPG、WEBP等图片格式</p>
        <p>github地址：访问 <el-link type="success" href="https://github.com/xyxiao001/vue-cropper" target="_blank">Vue-Cropper</el-link></p>
      </template>
    </Hints>
    <VueCropper
      ref="cropper"
      :img="configObj.imgSrc"
      :outputSize="configObj.size"
      :outputType="configObj.outputType"
    ></VueCropper>
  </div>
</template>

<script>
import VueCropper  from 'vue-cropper'
import Hints from '../../components/Hints/index'

export default {
  name: 'ImageCropper',
  data () {
    return {
      configObj: {
        imgSrc: ''
      }
    }
  },
  components: { Hints, VueCropper }
}
</script>

<style lang="less">

</style>
