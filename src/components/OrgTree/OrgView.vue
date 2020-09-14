<template>
  <div class="org-tree-view-wrapper" :style="orgTreeStyle">
    <OrgTree
      :data="data"
      collapsable
      :node-render="nodeRender"
      :expand-all="expandAll"
      :horizontal="horizontal"
      :props="props"
      @on-expand="onExpand"
      @on-node-click="onNodeClick"
    />
  </div>
</template>

<script>
import OrgTree from 'v-org-tree'
import 'v-org-tree/dist/v-org-tree.css'
import { data } from './tree-data'
export default {
  name: 'OrgView',
  components: { OrgTree },
  props: {
    expandAll: {
      type: Boolean,
      default: true
    },
    horizontal: {
      type: Boolean,
      default: false
    },
    zoomVal: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      data,
      props: {
        id: 'id',
        label: 'label',
        expand: 'expand',
        children: 'children'
      }
    }
  },
  computed: {
    orgTreeStyle() {
      return {
        transform: `scale(${this.zoomVal}, ${this.zoomVal})`
      }
    }
  },
  methods: {
    nodeRender(h, data) {
      return data.label
    },
    onExpand(val, status) {
      console.log(val, status)
    },
    onNodeClick(e, data) {
      console.log(data)
    }
  }
}
</script>

<style lang="less">
.org-tree-view-wrapper{
  margin-top: 30px;
  text-align: center;
}
</style>
