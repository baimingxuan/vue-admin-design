<template>
  <detail-panel>
    <template v-slot="{ status }">
      <node-panel :status="status">
        <detail-form type="node" />
      </node-panel>
      <edge-panel :status="status">
        <detail-form type="edge" />
      </edge-panel>
      <group-panel :status="status">
        <detail-form type="group" />
      </group-panel>
      <multi-panel :status="status" />
      <canvas-panel :status="status" />
    </template>
  </detail-panel>
</template>

<script>
import { NodePanel, EdgePanel, GroupPanel, MultiPanel, CanvasPanel, DetailPanel } from 'vg-editor'
import DetailForm from './DetailForm'

export default {
  name: 'FlowPanelDetail',
  components: {
    NodePanel,
    EdgePanel,
    GroupPanel,
    MultiPanel,
    CanvasPanel,
    DetailPanel,
    DetailForm
  }
}
</script>
