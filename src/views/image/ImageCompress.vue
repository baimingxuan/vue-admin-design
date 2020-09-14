<template>
  <div class="image-compress">
    <Hints>
      <template slot="hintName">图片压缩</template>
      <template slot="hintInfo">
        <p>纯JS实现对图片的等比压缩和放大的功能，并对图片进行下载</p>
      </template>
    </Hints>
    <el-row :gutter="20">
      <el-col :span="16">
        <el-card shadow="always">
          <div slot="header" class="title">图片区域</div>
          <div class="box-wrapper">
            <div class="image-container" :style="imageStyle" />
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="always">
          <div slot="header" class="title">设置区域</div>
          <div class="box-content">
            <el-form label-width="82px" label-position="left">
              <el-form-item label="选择图片：">
                <UploadImage class="select-image" btn-name="选择图片" @on-success="handleSuccess" />
              </el-form-item>
              <el-form-item label="图片尺寸：">
                <div class="ratio-size">
                  <el-input v-model.number="imageObj.width" @keyup.native="bindInput('h')" />
                  <i class="vue-dsn-icon-edit-img-size-locking icon-link" />
                  <el-input v-model.number="imageObj.height" @keyup.native="bindInput('w')" />
                  <ul class="ratio-type clearfix">
                    <li>宽</li>
                    <li>高</li>
                  </ul>
                </div>
              </el-form-item>
              <el-form-item label="压缩比例：" class="item-ratio">
                <el-input v-model.number="imageObj.ratio" disabled />
              </el-form-item>
              <el-form-item label="图片质量：">
                <el-select v-model="imageObj.quality" placeholder="请选择">
                  <el-option
                    v-for="item in qualityOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
              <div>
                <el-button class="btn-compress" type="primary" @click="compressImage">压缩图片</el-button>
              </div>
            </el-form>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Hints from '../../components/Hints'
import UploadImage from '../../components/UploadImage'
import { base64toBlob, calcImageSize } from '../../utils'
const qualityOptions = [
  { label: 100, value: 1 },
  { label: 90, value: 0.9 },
  { label: 80, value: 0.8 },
  { label: 70, value: 0.7 },
  { label: 60, value: 0.6 },
  { label: 50, value: 0.5 }
]

export default {
  name: 'ImageCompress',
  components: { Hints, UploadImage },
  data() {
    return {
      // 图片对象
      image: {
        width: 1920,
        height: 1080,
        src: 'https://cdn.jsdelivr.net/gh/baimingxuan/media-store/images/img03.jpg'
      },
      // 图片显示对象
      imageShow: {
        width: 0,
        height: 0,
        imgSrc: ''
      },
      // 图片压缩的值对象
      imageObj: {
        width: 0,
        height: 0,
        ratio: 100 + '%',
        quality: 1
      },
      qualityOptions
    }
  },
  computed: {
    // 图片显示区样式
    imageStyle() {
      return {
        width: this.imageShow.width + 'px',
        height: this.imageShow.height + 'px',
        backgroundImage: 'url(\'' + this.imageShow.imgSrc + '\')'
      }
    },
    // 图片宽高比率
    imageRatio() {
      return this.image.width / this.image.height
    }
  },
  watch: {
    image: {
      handler(val) {
        this.getDragContainerSize(val.width, val.height)
        this.imageShow.imgSrc = val.src
        this.imageObj.width = val.width
        this.imageObj.height = val.height
        this.imageObj.ratio = 100 + '%'
        this.imageObj.quality = 1
      },
      deep: true
    }
  },
  created() {
    this.getDragContainerSize(this.image.width, this.image.height)
    this.imageShow.imgSrc = this.image.src
    this.imageObj.width = this.image.width
    this.imageObj.height = this.image.height
  },
  methods: {
    // 输入宽高关联
    bindInput(type) {
      if (type === 'h') {
        this.imageObj.height = Math.round(this.imageObj.width / this.imageRatio).toFixed(0)
      } else if (type === 'w') {
        this.imageObj.width = Math.round(this.imageObj.height * this.imageRatio).toFixed(0)
      }
      this.imageObj.ratio = (this.imageObj.width / this.image.width * 100).toFixed(2) + '%'
    },
    // 计算图片显示宽高
    getDragContainerSize(imageW, imageH) {
      const [showAreaW, showAreaH] = [850, 550]
      const sizeObj = calcImageSize(imageW, imageH, showAreaW, showAreaH)
      // 更新图片展示区宽高
      this.imageShow.width = sizeObj.width
      this.imageShow.height = sizeObj.height
    },
    handleSuccess(data) {
      this.image.src = data
      const image = new Image()
      image.src = data
      image.onload = () => {
        this.image.width = image.width
        this.image.height = image.height
      }
    },
    // 图片压缩
    compressImage() {
      const width = this.imageObj.width
      const height = this.imageObj.height
      const quality = this.imageObj.quality
      const img = new Image()
      img.src = this.image.src
      img.onload = () => {
        // 创建canvas
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        // 创建属性节点
        const anw = document.createAttribute('width')
        anw.nodeValue = width
        const anh = document.createAttribute('height')
        anh.nodeValue = height
        canvas.setAttributeNode(anw)
        canvas.setAttributeNode(anh)
        // 绘制图片
        ctx.fillRect(0, 0, width, height)
        ctx.drawImage(img, 0, 0, width, height)
        // 生成base64图片
        const imageBase64 = canvas.toDataURL('image/png', quality)
        this.downloadImage(imageBase64)
      }
    },
    // 下载压缩的图片
    downloadImage(imageBase64) {
      const imageBlob = base64toBlob(imageBase64)
      const link = document.createElement('a')
      const event = document.createEvent('HTMLEvents')
      // initEvent 不加后两个参数会在火狐下报错 事件类型，是否冒泡，是否阻止浏览器的默认行为
      event.initEvent('click', true, true)
      link.download = 'image.png'
      link.href = URL.createObjectURL(imageBlob)
      // 兼容火狐
      link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }))
    }
  }
}
</script>

<style lang="less">
@import "../../assets/less/image-compress";
</style>
