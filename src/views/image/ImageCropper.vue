<template>
  <div class="image-cropper-wrapper">
    <Hints>
      <template slot="hintName">图片裁剪插件</template>
      <template slot="hintInfo">
        <p>Vue-Cropper：一个优雅的图片裁剪插件，可实现图片裁剪、图片生成等功能，并支持生成png、jpeg、webp等图片格式</p>
        <p>github地址：访问 <el-link type="success" href="https://github.com/xyxiao001/vue-cropper" target="_blank">Vue-Cropper</el-link></p>
      </template>
    </Hints>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card shadow="always">
          <div slot="header" class="title">裁剪区域</div>
          <div class="content-box">
            <VueCropper
              ref="cropper"
              :img="configObj.img"
              :outputSize="configObj.size"
              :outputType="configObj.outputType">
            </VueCropper>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card shadow="always">
          <div slot="header" class="title">预览区域</div>
          <div class="content-box"></div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { VueCropper } from 'vue-cropper'
import Hints from '../../components/Hints/index'

export default {
  name: 'ImageCropper',
  data () {
    return {
      configObj: {
        img: '',
        size: 1,
        outputType: 'png'
      }
    }
  },
  components: { Hints, VueCropper }
}
</script>

<style lang="less">
.image-cropper-wrapper{
  .title{
    text-align: center;
    font-size: 14px;
    font-weight: bold;
  }
  .content-box{
    height: 400px;
  }
}
</style>
