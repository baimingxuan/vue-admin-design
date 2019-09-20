<template>
  <div v-if="!item.hidden" class="side-menu-item">
    <template v-if="hasOneShowChild(item, item.children) && (onlyOneChild.noShowChildren || !onlyOneChild.children)">
      <ItemLink v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path)">
        <el-menu-item :index="resolvePath(onlyOneChild.path)">
          <Item :icon="onlyOneChild.meta.icon||(item.meta&&item.meta.icon)" :title="onlyOneChild.meta.title"/>
        </el-menu-item>
      </ItemLink>
    </template>

    <el-submenu v-else ref="subMenu" :index="resolvePath(item.path)" popper-append-to-body>
      <template slot="title">
        <Item :icon="item.meta && item.meta.icon" :title="item.meta && item.meta.title"/>
      </template>
      <SideMenuItem
        v-for="child in item.children"
        :key="child.path"
        :item="child"
        :basePath="resolvePath(child.path)"
      />
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
    hasOneShowChild (parent, children = []) {
      const showChildren = children.filter(item => {
        if (item.hidden) {
          return false
        } else {
          this.onlyOneChild = item
          return true
        }
      })
      if (showChildren.length === 1) {
        return true
      }
      if (showChildren.length === 0) {
        this.onlyOneChild = { ...parent, noShowChildren: true }
        return true
      }

      return false
    },
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
