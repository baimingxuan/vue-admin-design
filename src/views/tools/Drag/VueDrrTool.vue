<template>
  <div class="vue-drr-wrapper">
    <Hints>
      <template slot="hintName">组件拖拽</template>
      <template slot="hintInfo">
        <p>VueDRR：基于vue-draggable-resizable的vue组件，可以实现拖动、拉伸和旋转功能</p>
        <p>github地址：访问 <el-link type="success" href="https://github.com/Alvin-Liu/vue-drr" target="_blank">VueDRR</el-link></p>
      </template>
    </Hints>
    <el-card shadow="always">
      <div slot="header" class="title">组件拖拽</div>
      <div class="drag-area">
        <VueDrr
          :x="configObj.x"
          :y="configObj.y"
          :w="configObj.width"
          :h="configObj.height"
          :minw="configObj.minW"
          :minh="configObj.minH"
          :active="configObj.active"
          :angle="configObj.angle"
          :parent="configObj.parent"
          @dragging="handleDragging"
          @resizing="handleResizing"
          @rotating="handleRotating"
        >
          <div class="drag-box">
            <p>x: {{ configObj.x }}</p>
            <p>y: {{ configObj.y }}</p>
            <p>angle: {{ configObj.angle }}</p>
            <p>width: {{ configObj.width }}</p>
            <p>height: {{ configObj.height }}</p>
          </div>
        </VueDrr>
      </div>
    </el-card>
  </div>
</template>

<script>
import VueDrr from 'vue-drr'
import Hints from '../../../components/Hints'

export default {
  name: 'VueDrrTool',
  components: { Hints, VueDrr },
  data() {
    return {
      configObj: {
        x: 650,
        y: 130,
        width: 180,
        height: 180,
        minW: 100,
        minH: 100,
        active: true,
        angle: 0,
        parent: true
      }
    }
  },
  methods: {
    handleResizing(x, y, width, height) {
      this.configObj.x = x
      this.configObj.y = y
      this.configObj.width = width
      this.configObj.height = height
    },
    handleDragging(x, y) {
      this.configObj.x = x
      this.configObj.y = y
    },
    handleRotating(angle) {
      this.configObj.angle = angle
    }
  }
}
</script>

<style lang="less">
.vue-drr-wrapper {
  .drag-area {
    position: relative;
    width: 100%;
    height: 500px;
    .drag-box {
      padding-top: 10px;
      font-size: 16px;
      color: #fff;
      p {
        width: 60%;
        margin: 5px auto;
      }
    }
    .z-drr-container {
      background: #409eff;
    }
  }
  .content-box {
    padding-top: 30px;
    height: 500px;
  }
}
</style>
