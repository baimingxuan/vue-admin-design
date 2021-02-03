<template>
  <div class="flow-editor">
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
  </div>
</template>

<script>
import VGEditor, { Flow, RegisterEdge, Minimap } from 'vg-editor'
import FlowToolbar from '../../components/GraphEditorEle/ToolBar'
import { FlowPanelItem } from '../../components/GraphEditorEle/PanelItem'
import { FlowPanelDetail } from '../../components/GraphEditorEle/PanelDetail'
import FlowContextMenu from '../../components/GraphEditorEle/ContextMenu'
import flowData from './flow-data'

export default {
  name: 'FlowEditor',
  components: {
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
.flow-editor {
  display: flex;
  height: 700px;
  flex-direction: column;
  .editor {
    flex: 1;
    &-container {
      position: relative;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      &__header {
        border: 1px solid #e6e9ed;
        padding: 8px;
      }
      &__container {
        flex: 1;
        display: flex;
      }
      &__sidebar {
        width: 150px;
        background-color: #fafafa;
        border-right: 1px solid #e6e9ed;
        display: flex;
        justify-content: center;
      }
      &__panel {
        width: 16.6%;
        background-color: #fafafa;
        border-left: 1px solid #e6e9ed;
      }
      &__main {
        flex: 1;
      }
    }
  }
}
</style>
