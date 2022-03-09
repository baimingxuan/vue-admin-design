<template>
  <div class="image-synthesizer">
    <Hints>
      <template slot="hintName">图片合成</template>
      <template slot="hintInfo">
        <p>基于VueDRR拖拽功能，在其上通过叠加图片、文字等，实现图片的叠加伪合成功能</p>
        <p>VueDRR：基于vue-draggable-resizable的vue组件，可以实现拖动、拉伸和旋转功能</p>
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
                @updateActiveEle="updateActiveEle"
              >
                <!-- 图片 -->
                <img v-if="item.type==='image'" :src="item.src" draggable="false">
                <!-- 文字 -->
                <ImageRichText v-if="item.type === 'text'" v-model="item.text" :element="item" :active-ele-text="activeEleText" />
              </ElementDrr>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="always">
          <div slot="header" class="title">设置区域</div>
          <div class="box-content">
            <el-form class="form-wrapper" label-width="70px">
              <el-form-item label="选择底图">
                <UploadImage btn-name="选择底图" @on-success="handleSuccess" />
              </el-form-item>
              <el-form-item label="添加文本">
                <el-button @click="addText">添加文本</el-button>
              </el-form-item>
              <el-form-item label="添加图片">
                <UploadImage @on-success="handleAddImage" />
              </el-form-item>
              <el-form-item label="删除元素">
                <el-button type="danger" @click="deleteActiveEle">删除元素</el-button>
              </el-form-item>
            </el-form>
            <TextSetting v-if="activeEle.type === 'text'" :active-ele-text="activeEleText" />
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Hints from '@/components/Hints'
import ElementDrr from '@/components/ElementDrr'
import ImageRichText from '@/components/ImageRichText'
import TextSetting from '@/components/TextSetting'
import UploadImage from '@/components/UploadImage'
import { calcImageSize } from '@/utils'

export default {
  name: 'ImageSynthesizer',
  components: { Hints, ElementDrr, ImageRichText, TextSetting, UploadImage },
  data() {
    return {
      container: { // 展示区（可拖拽区）样式
        width: 0,
        height: 0,
        bgImageSrc: 'https://cdn.jsdelivr.net/gh/baimingxuan/media-store/images/img01.jpg' // 底图路径
      },
      elements: [], // 叠加组件数组
      activeEle: {}, // 当前图片上聚焦的叠加组件
      eleNum: 0
    }
  },
  computed: {
    // 展示区（可拖拽区）样式
    containerStyle() {
      return {
        width: this.container.width + 'px',
        height: this.container.height + 'px',
        backgroundImage: 'url(\'' + this.container.bgImageSrc + '\')'
      }
    },
    // 选择的文本
    activeEleText() {
      let active = {}
      if (this.activeEle.type === 'text') {
        active = this.activeEle
      }
      return active
    }
  },
  created() {
    this.getDragContainerSize(1920, 1200)
    this.addText()
    this.addImage({
      active: false,
      src: 'https://cdn.jsdelivr.net/gh/baimingxuan/media-store/images/img05.jpeg',
      size: 53248,
      width: 132,
      height: 132
    })
  },
  methods: {
    // 拖动元素把柄
    dragHandles(type) {
      if (type === 'text') {
        return ['e', 'w']
      }
    },
    // 元素层级排序
    elementZIndex(type) {
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
    // 底图上传成功
    handleSuccess(data) {
      this.container.bgImageSrc = data
      const image = new Image()
      image.src = data
      image.onload = () => {
        this.getDragContainerSize(image.width, image.height)
      }
    },
    // 计算底图展示宽高
    getDragContainerSize(imageW, imageH) {
      const [showAreaW, showAreaH] = [850, 550]
      const sizeObj = calcImageSize(imageW, imageH, showAreaW, showAreaH)
      // 更新图片展示区宽高
      this.container.width = sizeObj.width
      this.container.height = sizeObj.height
    },
    // 添加文本
    addText() {
      const tagNum = ++this.eleNum
      const text = {
        active: true,
        text: '请输入文本',
        type: 'text',
        tag: 'text_' + tagNum,
        x: 300,
        y: 100,
        w: 180,
        h: 36,
        style: {
          textAlign: 'left',
          lineHeight: '24px',
          fontSize: '24px',
          fontFamily: '微软黑体',
          fontWeight: 400,
          color: '#f70707',
          backgroundColor: '#05f8e8',
          overflow: 'hidden'
        }
      }
      if (this.elements.length > 4) {
        this.$message.warning('图片上最多叠加5个元素！')
      } else {
        this.elements.push(text)
        this.updateActiveEle(text)
      }
    },
    // 添加图片
    addImage(imgObj) {
      const tagNum = ++this.eleNum
      const image = {
        active: imgObj.active,
        type: 'image',
        tag: 'image_' + tagNum,
        x: 320,
        y: 300,
        w: parseInt(imgObj.width),
        h: parseInt(imgObj.height),
        src: imgObj.src,
        size: imgObj.size
      }
      if (this.elements.length > 4) {
        this.$message.warning('图片上最多叠加5个元素！')
      } else {
        this.elements.push(image)
        if (imgObj.active) {
          this.updateActiveEle(image)
        }
      }
    },
    // 上传图片成功
    handleAddImage(data) {
      const dataStrLen = data.replace('data:image/jpeg;base64,', '').length
      const dataSize = parseInt(dataStrLen - (dataStrLen / 8) * 2)
      const img = new Image()
      img.src = data
      img.onload = () => {
        const imageSize = calcImageSize(img.width, img.height, parseInt(this.container.width / 4), parseInt(this.container.height / 4))
        this.addImage({
          active: true,
          src: data,
          size: dataSize,
          width: imageSize.width,
          height: imageSize.height
        })
      }
    },
    // 更新当前选中的元素
    updateActiveEle(element) {
      this.activeEle = element
    },
    // 删除图片上当前选择的元素
    deleteActiveEle() {
      const newElements = this.elements.filter(item => {
        return item.tag !== this.activeEle.tag
      })
      this.$nextTick(() => {
        this.elements = newElements
      })
      this.updateActiveEle({})
    }
  }
}
</script>

<style lang="less">
.image-synthesizer {
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
  .box-content {
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
}
</style>
