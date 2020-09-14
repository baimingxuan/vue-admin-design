<template>
  <el-upload
    ref="uploadImage"
    class="upload-image-wrapper"
    action=""
    accept=".jpg, .png, .bmp, .jpeg, .webp"
    :multiple="false"
    :show-file-list="false"
    :auto-upload="false"
    :on-change="handleChange"
  >
    <el-button size="small" type="primary">{{ btnName }}</el-button>
  </el-upload>
</template>

<script>
export default {
  name: 'UploadImage',
  props: {
    btnName: {
      type: String,
      default: '选择图片'
    }
  },
  methods: {
    handleChange(image) {
      const rawImage = image.raw
      if (!rawImage) return false
      if (!this.isImage(rawImage)) {
        this.$message.warning('图片只支持.jpg, .png, .bmp, .jpeg, .webp格式!')
        return false
      }
      if (this.isLimit5M(rawImage)) {
        this.readImage(rawImage)
      }
    },
    isLimit5M(image) {
      const isLimit5M = image.size / 1024 / 1024 < 5
      if (isLimit5M) {
        return true
      } else {
        this.$message.warning('上传的图片大小不能超过5M!')
        return false
      }
    },
    isImage(image) {
      return /\.(jpg|png|bmp|jpeg|webp)$/.test(image.name)
    },
    readImage(image) {
      const reader = new FileReader()
      reader.onload = e => {
        let data
        if (typeof e.target.result === 'object') {
          // 把Array Buffer转化为blob 如果是base64不需要
          data = window.URL.createObjectURL(new Blob([e.target.result]))
        } else {
          data = e.target.result
        }
        this.$emit('on-success', data)
      }
      // 转化为base64
      reader.readAsDataURL(image)
      // 转化为blob
      // reader.readAsArrayBuffer(image)
      reader.onerror = e => {
        this.$message.error('图片读取出错!')
      }
      this.$refs.uploadImage.clearFiles()
    }
  }
}
</script>
