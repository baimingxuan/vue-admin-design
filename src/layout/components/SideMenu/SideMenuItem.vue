<template>
  <div v-if="!item.hidden" class="side-menu-item">
    <template v-if="hasOnlyOneChild(item, item.children) && (onlyOneChild.noChildren || !onlyOneChild.children)">
      <LinkItem v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path)">
        <el-menu-item :index="resolvePath(onlyOneChild.path)">
          <Item :icon="onlyOneChild.meta.icon||(item.meta&&item.meta.icon)" :title="onlyOneChild.meta.title" />
        </el-menu-item>
      </LinkItem>
    </template>

    <el-submenu v-else ref="subMenu" :index="resolvePath(item.path)" popper-append-to-body>
      <template slot="title">
        <Item :icon="item.meta && item.meta.icon" :title="item.meta && item.meta.title" />
      </template>
      <SideMenuItem
        v-for="child in item.children"
        :key="child.path"
        :item="child"
        :base-path="resolvePath(child.path)"
      />
    </el-submenu>
  </div>
</template>

<script>
import path from 'path'
import { isExternal } from '../../../utils/validate'
import LinkItem from './LinkItem'
import Item from './Item'
export default {
  name: 'SideMenuItem',
  components: { LinkItem, Item },
  props: {
    item: {
      required: true,
      type: Object,
      default: () => {}
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      onlyOneChild: null
    }
  },
  methods: {
    hasOnlyOneChild(parent, children = []) {
      if (children.length === 0) {
        this.onlyOneChild = { ...parent, path: '', noChildren: true }
        return true
      } else if (children.length === 1) {
        this.onlyOneChild = children[0]
        return true
      } else {
        return false
      }
    },
    resolvePath(routePath) {
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

<style lang="less">

</style>
