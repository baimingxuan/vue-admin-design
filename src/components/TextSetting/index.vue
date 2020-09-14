<template>
  <div class="text-setting-wrapper">
    <el-form label-width="70px">
      <!--文本-->
      <el-form-item label="文本">
        <ImageRichText v-model="activeEleText.text" class="text-editable" :active-ele-text="activeEleText" />
      </el-form-item>
      <!--字体-->
      <el-form-item label="字体">
        <el-select v-model="activeEleText.style.fontFamily" size="small">
          <el-option
            v-for="item in fontFamilyData"
            :key="item.value"
            :label="item.value"
            :value="item.value"
            :style="{'fontFamily': item.value}"
          />
        </el-select>
      </el-form-item>
      <!--字号-->
      <el-form-item label="字号">
        <el-select
          v-model="activeEleText.style.fontSize"
          size="small"
        >
          <el-option
            v-for="item in fontSizeData"
            :key="item.value"
            :label="item.value"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <!--颜色-->
      <el-form-item label="颜色">
        <!-- 字体颜色 -->
        <div class="color-box">
          <i class="vue-dsn-icon-wenzise color-icon" :style="{'color': activeEleText.style.color}" />
          <el-color-picker v-model="activeEleText.style.color" />
        </div>
        <!-- 背景颜色 -->
        <div class="color-box">
          <i class="vue-dsn-icon-beijingse color-icon icon-bg" :style="{'color': activeEleText.style.backgroundColor}" />
          <el-color-picker v-model="activeEleText.style.backgroundColor" />
        </div>
        <div class="style-box">
          <!-- 加粗 -->
          <span :class="['style-item', fontWeight ? 'active' : '']" @click="setFontWeight">
            <i class="vue-dsn-icon-jiacu style-icon" />
          </span>
          <!-- 对齐 -->
          <div class="style-item">
            <el-dropdown trigger="click" @command="handleCommand">
              <i class="vue-dsn-icon-duiqi style-icon" />
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="left" :style="setAlignActive('left')">左对齐</el-dropdown-item>
                <el-dropdown-item command="center" :style="setAlignActive('center')">居中</el-dropdown-item>
                <el-dropdown-item command="right" :style="setAlignActive('right')">右对齐</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="downloadImage">文本生成图片</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { base64toBlob } from '../../utils'
import ImageRichText from '../ImageRichText'

const fontFamilyData = [
  { value: '黑体' },
  { value: '宋体' },
  { value: '仿宋' },
  { value: '楷体' },
  { value: '隶书' },
  { value: '微软雅黑' },
  { value: '方正姚体' }
]
const fontSizeData = [
  { value: '12px' },
  { value: '14px' },
  { value: '16px' },
  { value: '18px' },
  { value: '24px' },
  { value: '32px' },
  { value: '48px' }
]

export default {
  name: 'TextSetting',
  components: { ImageRichText },
  props: {
    activeEleText: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      fontFamilyData,
      fontSizeData
    }
  },
  computed: {
    // 字体是否加粗
    fontWeight() {
      if (+this.activeEleText.style.fontWeight === 400) {
        return false
      } else {
        return true
      }
    }
  },
  watch: {
    // 文字大小变化时行高一起变化
    activeEleText: {
      handler(val) {
        this.activeEleText.style.lineHeight = val.style.fontSize
      },
      deep: true
    }
  },
  methods: {
    // 设置粗体
    setFontWeight() {
      if (+this.activeEleText.style.fontWeight === 400) {
        this.activeEleText.style.fontWeight = 600
      } else {
        this.activeEleText.style.fontWeight = 400
      }
    },
    // 设置对齐
    handleCommand(command) {
      this.activeEleText.style.textAlign = command
    },
    // 当前对齐方式
    setAlignActive(type) {
      if (this.activeEleText.style.textAlign === type) {
        return {
          backgroundColor: '#409eff',
          color: '#fff'
        }
      } else {
        return {
          backgroundColor: '',
          color: '#333'
        }
      }
    },
    // 文本生成图片
    textBecomeImg(obj) {
      const canvas = document.createElement('canvas')
      canvas.width = obj.w
      canvas.height = obj.h
      const context = canvas.getContext('2d')
      // 绘制字体距离canvas顶部初始的高度
      const initTop = 4
      const initLeft = 8
      // 设置背景色
      context.fillStyle = obj.style.backgroundColor || 'transparent'
      context.fillRect(0, 0, canvas.width, canvas.height)
      // 设置文本样式
      context.fillStyle = obj.style.color
      context.font = obj.style.fontWeight + ' ' + obj.style.fontSize + ' ' + obj.style.fontFamily
      context.textBaseline = 'top'
      // 设置文本对齐方式
      context.textAlign = obj.style.textAlign

      const textArr = obj.text.split('')
      let tempStr = ''
      const rowArr = []
      const maxTextWidth = canvas.width - 2 * initLeft

      for (let i = 0; i < textArr.length; i++) {
        if (context.measureText(tempStr).width < maxTextWidth && context.measureText(tempStr + (textArr[i])).width <= maxTextWidth) {
          tempStr += textArr[i]
        } else {
          rowArr.push(tempStr)
          tempStr = textArr[i]
        }
      }
      rowArr.push(tempStr)

      let drawLeft
      if (context.textAlign === 'left') {
        drawLeft = initLeft
      } else if (context.textAlign === 'center') {
        drawLeft = maxTextWidth / 2
      } else if (context.textAlign === 'right') {
        drawLeft = maxTextWidth
      }

      for (let i = 0; i < rowArr.length; i++) {
        context.fillText(rowArr[i], drawLeft, (parseInt(obj.style.fontSize) * i + initTop), maxTextWidth)
      }

      return canvas.toDataURL('image/png')
    },
    // 下载生成的图片
    downloadImage() {
      const imageBase64 = this.textBecomeImg(this.activeEleText)
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
@import "../../assets/less/text-setting";
</style>
