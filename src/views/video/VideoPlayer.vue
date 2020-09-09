<template>
  <div class="video-player-wrapper">
    <Hints>
      <template slot="hintName">视频播放器</template>
      <template slot="hintInfo">
        <p>基于VueDRR拖拽功能，在其上通过叠加图片、文字等，实现图片的叠加伪合成功能</p>
        <p>VueDRR：基于vue-draggable-resizable的vue组件，可以实现拖动、拉伸和旋转功能</p>
      </template>
    </Hints>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card shadow="always">
          <div slot="header" class="title">传统MP4播放器</div>
          <div class="content-box">
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card shadow="always">
          <div slot="header" class="title">视频流M3U8播放器</div>
          <div class="content-box">
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Hints from '../../components/Hints'

export default {
  name: 'VideoPlayer',
  components: { Hints }
}
</script>

<style lang="less">
.video-player-wrapper {
  .title {
    text-align: center;
    font-size: 14px;
    font-weight: bold;
  }
  .content-box {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 360px;
  }
}
</style>
