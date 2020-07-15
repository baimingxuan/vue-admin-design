<template>
  <div class="image-synthesizer">
    <Hints>
      <template slot="hintName">图片合成</template>
      <template slot="hintInfo">
        <p>基于VueDRR拖拽功能，在其上通过叠加图片、文字等，实现图片的叠加伪合成功能</p>
        <p>VueDRR：基于vue-draggable-resizable的vue组件，可以实现拖动、拉伸和旋转功能</p>
        <p>github地址：访问 <el-link type="success" href="https://github.com/Alvin-Liu/vue-drr" target="_blank">VueDRR</el-link></p>
      </template>
    </Hints>
    <el-row :gutter="20">
      <el-col :span="16">
        <el-card shadow="always">
          <div slot="header" class="title">合成区域</div>
          <div class="box-wrapper">
            <div class="drag-container" :style="containerStyle">
              <ElementDrr
                v-for="(item, index) in elements"
                :key="index"
                :element="item"
                :handles="dragHandles(item.type)"
                :style="elementZIndex(item.type)"
                @updateActiveEle="updateActiveEle">
                <!-- 图片 -->
                <img v-if="item.type==='image'" :src="item.src" draggable="false">
                <!-- 文字 -->
                <ImageRichText v-if="item.type === 'text'" v-model="item.text" :element="item"/>
              </ElementDrr>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="always">
          <div slot="header" class="title">设置区域</div>
          <div class="content-box">
            <el-form class="form-wrapper" label-width="70px">
              <el-form-item label="选择底图">
                <UploadImage btnName="选择底图" @on-success="handleSuccess"/>
              </el-form-item>
              <el-form-item label="添加文本">
                <el-button @click="addText">添加文本</el-button>
              </el-form-item>
              <el-form-item label="添加图片">
                <UploadImage @on-success="handleAddImage"/>
              </el-form-item>
              <el-form-item label="删除元素">
                <el-button type="danger" @click="submit">删除元素</el-button>
              </el-form-item>
            </el-form>
            <TextSetting v-if="activeEle.type === 'text'" :activeEleText="activeEleText"/>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Hints from '../../components/Hints'
import ElementDrr from '../../components/ElementDrr'
import ImageRichText from '../../components/ImageRichText'
import TextSetting from '../../components/TextSetting'
import UploadImage from '../../components/UploadImage'

export default {
  name: 'ImageSynthesizer',
  components: { Hints, ElementDrr, ImageRichText, TextSetting, UploadImage },
  data () {
    return {
      container: { // 展示区（可拖拽区）样式
        width: 0,
        height: 0,
        bgImageSrc: '../../../static/img/crop-image.jpg' // 底图路径
      },
      elements: [],
      activeEle: {}, // 当前图片上聚焦的叠加组件
      eleNum: 0
    }
  },
  computed: {
    // 展示区（可拖拽区）样式
    containerStyle () {
      return {
        width: this.container.width + 'px',
        height: this.container.height + 'px',
        backgroundImage: 'url(\'' + this.container.bgImageSrc + '\')'
      }
    },
    // 选择的文本
    activeEleText () {
      if (this.activeEle.type === 'text') {
        return this.activeEle
      }
    }
  },
  created () {
    this.getDragContainerSize(1920, 1200)
    this.addText()
    this.addImage({
      active: false,
      src: '../../../static/img/add-image.jpeg',
      size: 53248,
      width: 132,
      height: 132
    })
  },
  methods: {
    // 拖动元素把柄
    dragHandles (type) {
      if (type === 'text') {
        return ['e', 'w']
      }
    },
    // 元素层级排序
    elementZIndex (type) {
      let zIndex = 1
      switch (type) {
        case 'text':
          zIndex = 3
          break
        case 'image':
          zIndex = 2
          break
      }
      return {
        zIndex: zIndex
      }
    },
    handleSuccess (data) {
      this.container.bgImageSrc = data
      const image = new Image()
      image.src = data
      image.onload = () => {
        this.getDragContainerSize(image.width, image.height)
      }
    },
    // 计算图片展示区宽高
    getDragContainerSize (width, height) {
      let [imageTrueW, imageTrueH, imageShowW, imageShowH] = [+width, +height, 0, 0]
      let [imageMaxW, imageMaxH] = [850, 550]

      // 图片真实宽大于真实高
      if (imageTrueW > imageTrueH) {
        if (imageTrueW >= imageMaxW) { // 真实宽大于或等于最大宽
          const imageRatioH = imageTrueH * (imageMaxW / imageTrueW)
          // 按最大宽与实际宽比率换算后，高度大于显示高度时
          if (imageRatioH >= imageMaxH) {
            imageShowW = imageTrueW * (imageMaxH / imageTrueH)
            imageShowH = imageMaxH
          } else {
            imageShowW = imageMaxW
            imageShowH = imageRatioH
          }
        } else {
          imageShowW = imageTrueW
          imageShowH = imageTrueH
        }
      } else if (imageTrueW <= imageTrueH) { // 图片真实宽小于或等于真实高
        if (imageTrueH >= imageMaxH) { // 真实高大于或等于最大高
          imageShowW = imageTrueW * (imageMaxH / imageTrueH)
          imageShowH = imageMaxH
        } else {
          imageShowW = imageTrueW
          imageShowH = imageTrueH
        }
      }
      // 更新图片展示区宽高
      this.container.width = imageShowW
      this.container.height = imageShowH
    },
    // 添加文本
    addText () {
      let tagNum = ++this.eleNum
      const text = {
        active: true,
        text: '请输入文本',
        type: 'text',
        tag: 'text_' + tagNum,
        x: 160,
        y: 100,
        w: 180,
        h: 26,
        style: {
          textAlign: 'left',
          lineHeight: '14px',
          fontSize: '14px',
          fontFamily: '微软黑体',
          fontWeight: 400,
          color: '#333',
          backgroundColor: '',
          overflowY: 'hidden'
        }
      }
      this.elements.push(text)
      this.updateActiveEle(text)
    },
    // 添加图片
    addImage (imgObj) {
      let tagNum = ++this.eleNum
      const image = {
        active: imgObj.active,
        type: 'image',
        tag: 'image_' + tagNum,
        x: 490,
        y: 100,
        w: parseInt(imgObj.width),
        h: parseInt(imgObj.height),
        src: imgObj.src,
        size: imgObj.size
      }
      this.elements.push(image)
      if (imgObj.active) {
        this.updateActiveEle(image)
      }
    },
    // 上传图片成功
    handleAddImage (data) {
      const dataStrLen = data.replace('data:image/jpeg;base64,', '').length
      const dataSize = parseInt(dataStrLen - (dataStrLen / 8) * 2)
      const img = new Image()
      img.src = data
      img.onload = () => {
        let imageSize = this.getImageSize(img.width, img.height, this.container.width, this.container.height)
        this.addImage({
          active: true,
          src: data,
          size: dataSize,
          width: imageSize.w,
          height: imageSize.h
        })
      }
    },
    // 计算叠加图片的宽和高
    getImageSize (width, height, showAreaW, showAreaH) {
      let [w, h] = [0, 0]
      // 添加的叠加图默认最大为底图的1/4
      let showW = parseInt(showAreaW / 4)
      let showH = parseInt(showAreaH / 4)
      // 图片真实宽大于真实高
      if (width > height) {
        if (width >= showW) { // 真实宽大于或等于最大宽
          const imageRatioH = height * (showW / width)
          // 按最大宽与实际宽比率换算后，高度大于显示高度时
          if (imageRatioH >= showH) {
            w = width * (showH / height)
            h = showH
          } else {
            w = showW
            h = imageRatioH
          }
        } else {
          w = width
          h = height
        }
      } else if (width <= height) { // 图片真实宽小于或等于真实高
        if (height >= showH) { // 真实高大于或等于最大高
          w = width * (showH / height)
          h = showH
        } else {
          w = width
          h = height
        }
      }
      return {
        w,
        h
      }
    },
    updateActiveEle (element) {
      this.activeEle = element
    },
    submit () {
      console.log(this.elements)
    }
  }
}
</script>

<style lang="less">
.image-synthesizer {
  .title {
    text-align: center;
    font-size: 14px;
    font-weight: bold;
  }
  .box-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 550px;
    overflow: hidden;
    .drag-container {
      position: relative;
      background-size: contain;
      background-position: center;
      background-repeat: no-repeat;
      .z-drr-container {
        border: 1px dashed transparent;
        &.z-active {
          border: 1px dashed #2e95ff;
        }
      }
    }
  }
  .content-box {
    height: 550px;
    overflow: hidden;
    .form-wrapper {
      width: 300px;
      margin: 15px auto 0;
    }
    .el-button {
      width: 210px;
    }
  }
  img {
    width: 100%;
    height: 100%;
  }
}
</style>
