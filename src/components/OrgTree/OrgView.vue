<template>
  <div class="org-tree-view-wrapper">
    <div class="tree-wrapper">
      <OrgTree :data="data"
               collapsable
               :node-render="nodeRender"
               :expand-all="expandAll"
               :horizontal="false"
               :props="props"
               @on-expand="onExpand"
               @on-node-click="onNodeClick"/>
    </div>
  </div>
</template>

<script>
import OrgTree from 'v-org-tree'
import 'v-org-tree/dist/v-org-tree.css'
export default {
  name: 'OrgView',
  data () {
    return {
      data: [],
      expandAll: false,
      props: {
        id: 'dep_id',
        label: 'title',
        expand: 'expand',
        children: 'dep_children'
      }
    }
  },
  components: { OrgTree },
  methods: {
    onExpand () {},
    onNodeClick () {}
  }
}
</script>

<style lang="less">

</style>
