<template>
  <el-upload
    class="files-upload"
    :action="url"
    :accept="filesFormat"
    :multiple="isMultiple"
    :show-file-list="isShowList"
    :on-success="uploadSuccess"
    :on-error="uploadError"
  >
    <slot />
  </el-upload>
</template>

<script>
export default {
  name: 'Upload',
  props: {
    url: {
      type: String,
      default: ''
    },
    filesFormat: {
      type: String,
      default: ''
    },
    isMultiple: {
      type: Boolean,
      default: false
    },
    isShowList: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    uploadSuccess(res, file) {
      if ([200, 0].includes(res.code)) {
        const data = res.data
        this.$emit('on-success', data)
      } else {
        this.$emit('on-error')
        this.$message.error(res.msg)
      }
    },
    uploadError(res, file) {
      this.$emit('on-error')
    }
  }
}
</script>

<style lang="less">
.files-upload{
  display: inline-block;
  vertical-align: top;
}
</style>
