<template>
  <div class="org-tree-view-wrapper">
    <OrgTree :data="data"
             collapsable
             :node-render="nodeRender"
             :expand-all="expandAll"
             :horizontal="false"
             :props="props"
             @on-expand="onExpand"
             @on-node-click="onNodeClick"/>
  </div>
</template>

<script>
import OrgTree from 'v-org-tree'
import 'v-org-tree/dist/v-org-tree.css'
import { data } from '../data/tree-data'
export default {
  name: 'OrgView',
  data () {
    return {
      data,
      expandAll: false,
      props: {
        id: 'id',
        label: 'label',
        expand: 'expand',
        children: 'children'
      }
    }
  },
  components: { OrgTree },
  methods: {
    nodeRender (h, data) {
      return data.label
    },
    onExpand (val, status) {
      console.log(val, status)
    },
    onNodeClick (e, data) {
      console.log(data)
    }
  }
}
</script>

<style lang="less">

</style>
