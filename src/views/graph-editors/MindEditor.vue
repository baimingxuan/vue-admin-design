<template>
  <div class="mind-editor">
    <Hints>
      <template slot="hintName">VG-Editor</template>
      <template slot="hintInfo">
        <p>VG-Editor：基于G6和Vue的可视化图形编辑器，是对GG-Editor的Vue组件化封装。</p>
        <p>github地址：访问 <el-link type="success" href="https://github.com/ChrisShen93/VGEditor" target="_blank">VG-Editor</el-link></p>
      </template>
    </Hints>
    <el-card shadow="always">
      <VGEditor class="editor">
        <div class="editor-container">
          <div class="editor-container__header">
            <MindToolbar graph-type="mind" />
          </div>
          <div class="editor-container__container">
            <div class="editor-container__main">
              <Mind :data="mockData" :on-node-click="handleNodeClick" />
            </div>
            <div class="editor-container__panel">
              <MindPanelDetail />
              <Minimap :height="200" />
            </div>
          </div>
        </div>
        <MindContextMenu graph-type="mind" />
      </VGEditor>
    </el-card>
  </div>
</template>

<script>
import VGEditor, { Mind, Minimap } from 'vg-editor'
import MindToolbar from '@/components/GraphEditorEle/ToolBar'
import { MindPanelDetail } from '@/components/GraphEditorEle/PanelDetail'
import MindContextMenu from '@/components/GraphEditorEle/ContextMenu'
import Hints from '@/components/Hints'
import mockData from './mind-data'

export default {
  name: 'MindEditor',
  components: {
    VGEditor,
    Mind,
    Minimap,
    Hints,
    MindToolbar,
    MindPanelDetail,
    MindContextMenu
  },
  data() {
    return {
      mockData
    }
  },
  methods: {
    handleNodeClick(e) {
      console.log(e)
    }
  }
}
</script>

<style lang="less">
@import "../../assets/less/graph-editor";
.mind-editor {
  display: flex;
  flex-direction: column;
  .el-card {
    min-height: 650px;
  }
}
</style>
