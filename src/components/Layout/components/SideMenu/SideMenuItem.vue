<template>
  <div v-if="!item.hidden" class="side-menu-item">
    <template>
      <ItemLink :to="resolvePath(onlyOneChild.path)">
        <el-menu-item index="2">
          <Item :icon="onlyOneChild.meta.icon||(item.meta&&item.meta.icon)" :title="onlyOneChild.meta.title"></Item>
        </el-menu-item>
      </ItemLink>
    </template>

    <el-submenu index="4" popper-append-to-body>
      <template slot="title">
        <Item :icon="item.meta && item.meta.icon" :title="item.meta && item.meta.title"></Item>
      </template>
    </el-submenu>
  </div>
</template>

<script>
import path from 'path'
import { isExternal } from '../../../../utils/validate'
import SvgIcon from '../../../../components/SvgIcon'
import ItemLink from './ItemLink'
import Item from './Item'
export default {
  name: 'SideMenuItem',
  props: {
    item: {
      type: Object,
      required: true
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      onlyOneChild: null
    }
  },
  components: {
    SvgIcon,
    ItemLink,
    Item
  },
  methods: {
    resolvePath (routePath) {
      if (isExternal(routePath)) {
        return routePath
      }
      if (isExternal(this.basePath)) {
        return this.basePath
      }
      return path.resolve(this.basePath, routePath)
    }
  }
}
</script>

<style scoped>

</style>
