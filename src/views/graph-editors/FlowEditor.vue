<template>
  <div class="flow-editor">
    <Hints>
      <template slot="hintName">VG-Editor</template>
      <template slot="hintInfo">
        <p>VG-Editor：基于G6和Vue的可视化图形编辑器，是对GG-Editor的Vue组件化封装。</p>
        <p>github地址：访问 <el-link type="success" href="https://github.com/ChrisShen93/VGEditor" target="_blank">VG-Editor</el-link></p>
      </template>
    </Hints>
    <el-card shadow="always">
      <VGEditor ref="flowChart" class="editor">
        <div class="editor-container">
          <div class="editor-container__header">
            <FlowToolbar graph-type="flow" />
          </div>
          <div class="editor-container__container">
            <div class="editor-container__sidebar">
              <FlowPanelItem />
            </div>
            <div class="editor-container__main">
              <Flow
                :data="flowData"
                :graph="{ mode: 'readOnly' }"
                :on-node-click="handleNodeClick"
              />
            </div>
            <div class="editor-container__panel">
              <FlowPanelDetail />
              <Minimap :height="200" />
            </div>
          </div>
        </div>
        <FlowContextMenu graph-type="flow" />
        <RegisterEdge
          name="custom-polyline"
          extend="flow-polyline"
          :config="customEdgeConfig"
        />
      </VGEditor>
    </el-card>
  </div>
</template>

<script>
import VGEditor, { Flow, RegisterEdge, Minimap } from 'vg-editor'
import FlowToolbar from '@/components/GraphEditorEle/ToolBar'
import { FlowPanelItem } from '@/components/GraphEditorEle/PanelItem'
import { FlowPanelDetail } from '@/components/GraphEditorEle/PanelDetail'
import FlowContextMenu from '@/components/GraphEditorEle/ContextMenu'
import Hints from '@/components/Hints'
import flowData from './flow-data'

export default {
  name: 'FlowEditor',
  components: {
    Hints,
    VGEditor,
    Flow,
    Minimap,
    FlowToolbar,
    FlowPanelItem,
    FlowPanelDetail,
    FlowContextMenu,
    RegisterEdge
  },
  data() {
    return {
      flowData,
      customEdgeConfig: {
        getActivedStyle(item) {
          return {
            lineWidth: 3
          }
        },
        getSelectedStyle(item) {
          return {
            lineWidth: 3
          }
        }
      }
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
.flow-editor {
  display: flex;
  flex-direction: column;
  .el-card {
    min-height: 650px;
  }
}
</style>
