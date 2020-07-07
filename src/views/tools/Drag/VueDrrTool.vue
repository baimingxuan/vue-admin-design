<template>
  <div class="vue-drr-wrapper">
    <Hints>
      <template slot="hintName">VueDRR</template>
      <template slot="hintInfo">
        <p>VueDRR：基于vue-draggable-resizable的vue组件，可以实现拖动、拉伸和旋转功能</p>
        <p>github地址：访问 <el-link type="success" href="https://github.com/Alvin-Liu/vue-drr" target="_blank">VueDRR</el-link></p>
      </template>
    </Hints>
    <el-row :gutter="20">
      <el-col :span="16">
        <el-card shadow="always">
          <div slot="header" class="title">拖拽区域</div>
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
              @rotating="handleRotating">
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
      </el-col>
      <el-col :span="8">
        <el-card shadow="always">
          <div slot="header" class="title">设置区域</div>
          <div class="content-box">
            <el-form label-width="80px">
              <el-form-item label="x">
                <el-input v-model="configObj.x"></el-input>
              </el-form-item>
              <el-form-item label="y">
                <el-input v-model="configObj.y"></el-input>
              </el-form-item>
              <el-form-item label="width">
                <el-input v-model="configObj.width"></el-input>
              </el-form-item>
              <el-form-item label="height">
                <el-input v-model="configObj.height"></el-input>
              </el-form-item>
              <el-form-item label="minw">
                <el-input v-model="configObj.minW"></el-input>
              </el-form-item>
              <el-form-item label="minh">
                <el-input v-model="configObj.minH"></el-input>
              </el-form-item>
              <el-form-item label="angle">
                <el-input v-model="configObj.angle"></el-input>
              </el-form-item>
            </el-form>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import VueDrr from 'vue-drr'
import Hints from '../../../components/Hints'

export default {
  name: 'VueDrrTool',
  data () {
    return {
      configObj: {
        x: 430,
        y: 130,
        width: 160,
        height: 160,
        minW: 100,
        minH: 100,
        active: true,
        angle: 0,
        parent: true
      }
    }
  },
  components: { Hints, VueDrr },
  methods: {
    handleResizing (x, y, width, height) {
      this.configObj.x = x
      this.configObj.y = y
      this.configObj.width = width
      this.configObj.height = height
    },
    handleDragging (x, y) {
      this.configObj.x = x
      this.configObj.y = y
    },
    handleRotating (angle) {
      this.configObj.angle = angle
    }
  }
}
</script>

<style lang="less">
.vue-drr-wrapper {
  .title {
    text-align: center;
    font-size: 14px;
    font-weight: bold;
  }
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
    display: flex;
    justify-content: center;
    padding-top: 30px;
    height: 500px;
    box-sizing: border-box;
  }
}
</style>
