<template>
  <div class="video-player-wrapper">
    <Hints>
      <template slot="hintName">视频播放器</template>
      <template slot="hintInfo">
        <p>Vue-Video-Player：一个使用Vue对video.js进行二次封装的视频播放插件，适用于目前主流网络视频的播放</p>
        <p /><p>github地址：访问 <el-link type="success" href="https://github.com/surmon-china/vue-video-player" target="_blank">Vue-Video-Player</el-link></p>
      </template>
    </Hints>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card shadow="always">
          <div slot="header" class="title">传统视频播放器</div>
          <div class="content-box">
            <video src="https://cdn.jsdelivr.net/gh/baimingxuan/media-store/videos/houlang.mp4" controls width="100%" style="outline: none" />
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card shadow="always">
          <div slot="header" class="title">视频播放插件</div>
          <div class="content-item">
            <VueVideoPlayer />
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Hints from '../../components/Hints'
import VueVideoPlayer from '../../components/VueVideoPlayer'

export default {
  name: 'VideoPlayer',
  components: { Hints, VueVideoPlayer }
}
</script>

<style lang="less">
.video-player-wrapper {
  .content-box {
    height: 440px;
  }
  .content-item {
    padding: 8px 0;
    .video-js {
      .vjs-big-play-button {
        top: 45%;
        left: 45%;
        font-size: 2em;
      }
    }
  }
}
</style>
