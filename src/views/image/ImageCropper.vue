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
      <el-col :span="10">
        <el-card shadow="always">
          <div slot="header" class="title">裁剪区域</div>
          <div class="content-box" style=" height: 400px;">
            <VueCropper
              ref="cropper"
              :img="configObj.imgSrc"
              :can-move="configObj.canMove"
              :auto-crop="configObj.autoCrop"
              :center-box="configObj.centerBox"
              :info-true="configObj.infoTrue"
              :full="configObj.full"
              :auto-crop-width="configObj.autoCropWidth"
              :auto-crop-height="configObj.autoCropHeight"
              :output-type="configObj.outputType"
              @realTime="realTime"
            />
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="always">
          <div slot="header" class="title">设置区域</div>
          <div class="content-box" style=" height: 400px;">
            <div style="height: 100px;">
              <UploadImage @on-success="handleSuccess" />
              <el-button size="small" type="primary" style="margin-top: 20px">
                <a @click="downloadImage">生成图片</a>
              </el-button>
              <a ref="downloadDom" :href="downImg" download="demo.png" />
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="10">
        <el-card shadow="always">
          <div slot="header" class="title">预览区域</div>
          <div class="content-box" style="height: 400px;">
            <div class="show-preview" :style="{'width': previews.w + 'px', 'height': previews.h + 'px', 'overflow': 'hidden', 'zoom': (400 / previews.h)}">
              <div :style="previews.div">
                <img :src="previews.url" :style="previews.img" alt="预览">
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { VueCropper } from 'vue-cropper'
import Hints from '@/components/Hints'
import UploadImage from '@/components/UploadImage'

export default {
  name: 'ImageCropper',
  components: { Hints, VueCropper, UploadImage },
  data() {
    return {
      configObj: {
        imgSrc: 'https://cdn.jsdelivr.net/gh/baimingxuan/media-store/images/img02.jpg',
        canMove: false,
        autoCrop: true,
        centerBox: true,
        infoTrue: true,
        full: true,
        autoCropWidth: 300,
        autoCropHeight: 200,
        outputType: 'png'
      },
      downImg: '#',
      previews: {}
    }
  },
  methods: {
    handleSuccess(data) {
      this.configObj.imgSrc = data
    },
    realTime(data) {
      this.previews = data
    },
    downloadImage() {
      this.$refs.cropper.getCropBlob(data => {
        this.downImg = window.URL.createObjectURL(data)
        if (window.navigator.msSaveBlob) {
          const blobObject = new Blob([data])
          window.navigator.msSaveBlob(blobObject, 'demo.png')
        } else {
          this.$nextTick(() => {
            this.$refs.downloadDom.click()
          })
        }
      })
    }
  }
}
</script>
