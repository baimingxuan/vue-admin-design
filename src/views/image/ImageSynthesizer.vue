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
          <div class="content-box">
            <div class="container" :style="containerStyle">
              <div class="drag-container" :style="imageContainerStyle">
                <ElementDrr
                  v-for="(item, index) in elements"
                  :key="index"
                  :element="item"
                  :handles="dragHandles(item.type)"
                  :style="elementZIndex(item.type)">
                  <!-- 图片 -->
                  <img v-if="item.type==='image'" :src="item.src" draggable="false">
                  <!-- 文字 -->
                  <ImageRichText v-if="item.type === 'text'" v-model="item.text" :element="item"/>
                </ElementDrr>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="always">
          <div slot="header" class="title">设置区域</div>
          <div class="content-box">
            <TextSetting :activeEleText="activeEleText"/>
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

export default {
  name: 'ImageSynthesizer',
  components: { Hints, ElementDrr, ImageRichText, TextSetting },
  data () {
    return {
      elements: [],
      activeEle: {},
      activeEleText: {
        text: ''
      }
    }
  },
  computed: {
    // 展示区宽高样式
    containerStyle () {
      return {
        width: 0 + 'px',
        height: 0 + 'px'
      }
    },
    // 图片容器样式
    imageContainerStyle () {
      return {
        backgroundImage: 'url(\'' + this.activeEle.src + '\')',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain'
      }
    }
  },
  methods: {
    // 拖动元素把柄
    dragHandles (type) {
      if (type === 'text') {
        return ['e', 'w']
      } else {
        return ['n', 'e', 's', 'w', 'nw', 'ne', 'se', 'sw']
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
  .content-box {
    height: 520px;
  }
  img {
    width: 100%;
    height: 100%;
  }
}
</style>
