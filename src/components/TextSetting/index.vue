<template>
  <div class="text-setting-wrapper">
    <el-form>
      <!--文本-->
      <el-form-item label="文本">
        <ImageRichText class="text-editable" v-model="activeEleText.text" :editable="true"/>
      </el-form-item>
      <!--字体-->
      <el-form-item label="字体">
        <el-select v-model="activeEleText.style.fontFamily" size="small">
          <el-option
            v-for="item in fontFamilyData"
            :key="item.value"
            :label="item.value"
            :value="item.value"
            :style="{'fontFamily': item.value}">
          </el-option>
        </el-select>
      </el-form-item>
      <!--字号-->
      <el-form-item label="字号">
        <el-select
          v-model="activeEleText.style.fontSize"
          size="small">
          <el-option
            v-for="item in fontSizeData"
            :key="item.value"
            :label="item.value"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <!--颜色-->
      <el-form-item label="颜色">
        <!-- 字体颜色 -->
        <div class="color-box">
          <i class="vue-sys-icon-wenzise color-icon" :style="{'color': activeEleText.color}"></i>
          <el-color-picker v-model="activeEleText.style.color"/>
        </div>
        <!-- 背景颜色 -->
        <div class="color-box">
          <i class="vue-sys-icon-beijingse color-icon icon-bg" :style="{'color': activeEleText.backgroundColor}"></i>
          <el-color-picker v-model="activeEleText.style.backgroundColor"/>
        </div>
        <div class="style-box">
          <!-- 加粗 -->
          <span :class="['style-item', fontWeight ? 'active' : '']" @click="setFontWeight">
            <i class="vue-sys-icon-jiacu style-icon"></i>
          </span>
          <!-- 对齐 -->
          <div class="style-item">
            <el-dropdown trigger="click" @command="handleCommand">
              <i class="vue-sys-icon-duiqi style-icon"></i>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="left" :style="setAlignActive('left')">左对齐</el-dropdown-item>
                <el-dropdown-item command="center" :style="setAlignActive('center')">居中</el-dropdown-item>
                <el-dropdown-item command="right" :style="setAlignActive('right')">右对齐</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import ImageRichText from '../ImageRichText'

const fontFamilyData = [
  {value: '黑体'},
  {value: '宋体'},
  {value: '仿宋'},
  {value: '楷体'},
  {value: '隶书'},
  {value: '微软雅黑'},
  {value: '方正姚体'}
]
const fontSizeData = [
  {value: '12px'},
  {value: '14px'},
  {value: '16px'},
  {value: '18px'},
  {value: '24px'},
  {value: '32px'},
  {value: '48px'}
]

export default {
  name: 'TextSetting',
  data () {
    return {
      fontFamilyData,
      fontSizeData
    }
  },
  props: {
    activeEleText: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    // 字体是否加粗
    fontWeight () {
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
      handler (val) {
        this.activeEleText.style.lineHeight = val.style.fontSize
      },
      deep: true
    }
  },
  components: { ImageRichText },
  methods: {
    // 设置粗体
    setFontWeight () {
      if (+this.activeEleText.style.fontWeight === 400) {
        this.activeEleText.style.fontWeight = 600
      } else {
        this.activeEleText.style.fontWeight = 400
      }
    },
    // 设置对齐
    handleCommand (command) {
      this.activeEleText.style.textAlign = command
      console.log(this.activeEleText.style.textAlign)
    },
    // 当前对齐方式
    setAlignActive (type) {
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
    }
  }
}
</script>

<style lang="less">
@import "../../assets/less/text-setting";
</style>
