<template>
  <div class="tags-nav clear-fix">
    <el-button type="text" class="btn-con" @click="handleMove(240)">
      <i class="icon el-icon-arrow-left"></i>
    </el-button>
    <div class="tags-views" ref="tagsViews" @DOMMouseScroll="handlescroll" @mousewheel="handlescroll">
      <div class="tags-cont" ref="tagsCont" :style="{left: tagsContLeft + 'px'}">
        <transition-group>
          <router-link v-for="item in visitedViews"
                       :to="{ path: item.path }"
                       :key="item.name">
            <TagItem :class="{active: isActive(item)}" :fixed="item.meta.fixed" @on-close="handleSelectedClose(item)">{{ item.title }}</TagItem>
          </router-link>
        </transition-group>
      </div>
    </div>
    <el-button type="text" class="btn-con" @click="handleMove(-240)">
      <i class="icon el-icon-arrow-right"></i>
    </el-button>
    <div class="btn-con btn-close">
      <el-dropdown @command="handleCloseCtrl">
        <span class="el-dropdown-link">
          <i class="icon el-icon-circle-close"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="all">关闭所有</el-dropdown-item>
          <el-dropdown-item command="other">关闭其他</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import path from 'path'
import { mapGetters, mapMutations } from 'vuex'
import TagItem from './TagItem'

export default {
  name: 'TagsView',
  data () {
    return {
      tagsContLeft: 0,
      fixedTags: [],
      selectedTag: {}
    }
  },
  components: { TagItem },
  computed: {
    ...mapGetters(['visitedViews']),
    routes () {
      return this.$router.options.routes
    }
  },
  watch: {
    $route (val) {
      this.addTags()
      this.selectedTag = val
    }
  },
  mounted () {
    this.initTags()
    this.addTags()
  },
  methods: {
    ...mapMutations(['addVisitedView', 'delVisitedView', 'delAllVisitedView', 'delOthersVisitedView']),
    isActive (tag) {
      return tag.path === this.$route.path
    },
    filterFixedTags (routes, basePath = '/') {
      let tags = []
      routes.forEach(route => {
        if (route.meta && route.meta.fixed) {
          const tagPath = path.resolve(basePath, route.path)
          tags.push({
            fullPath: tagPath,
            path: tagPath,
            name: route.name,
            meta: { ...route.meta }
          })
        }
        if (route.children) {
          const tempTags = this.filterFixedTags(route.children, route.path)
          if (tempTags.length >= 1) {
            tags = [...tags, ...tempTags]
          }
        }
      })
      return tags
    },
    initTags () {
      const fixedTags = this.fixedTags = this.filterFixedTags(this.routes)
      for (const tag of fixedTags) {
        // Must have tag name
        if (tag.name) {
          this.addVisitedView(tag)
        }
      }
    },
    addTags () {
      const { name } = this.$route
      if (name) {
        this.addVisitedView(this.$route)
      }
      return false
    },
    handlescroll (e) {
      let type = e.type
      let distance = 0
      if (type === 'DOMMouseScroll' || type === 'mousewheel') {
        distance = (e.wheelDelta) ? e.wheelDelta : -(e.detail || 0) * 40
      }
      this.handleMove(distance)
    },
    handleMove (offset) {
      const viewWidth = this.$refs.tagsViews.offsetWidth
      const contWidth = this.$refs.tagsCont.offsetWidth
      if (offset > 0) {
        this.tagsContLeft = Math.min(0, this.tagsContLeft + offset)
      } else {
        if (viewWidth < contWidth) {
          if (this.tagsContLeft < -(contWidth - viewWidth)) {
            this.tagsContLeft = this.tagsContLeft
          } else {
            this.tagsContLeft = Math.max(this.tagsContLeft + offset, viewWidth - contWidth)
          }
        } else {
          this.tagsContLeft = 0
        }
      }
    },
    handleSelectedClose (view) {
      this.delVisitedView(view)
      if (this.isActive(view)) {
        this.showLastView()
      }
    },
    showLastView () {
      const lastView = this.visitedViews.slice(-1)[0]
      if (lastView) {
        this.$router.push(lastView.fullPath)
      }
    },
    handleCloseCtrl (type) {
      if (type === 'all') {
        this.delAllVisitedView()
        this.showLastView()
      }
      if (type === 'other') {
        if (this.selectedTag) {
          this.delOthersVisitedView(this.selectedTag)
        }
      }
    }
  }
}
</script>

<style lang="less">
  .tags-nav {
    width: 100%;
    height: 40px;
    .icon {
      font-size: 18px;
    }
    .btn-con {
      float: left;
      width: 28px;
      height: 40px;
      padding: 8px 7px 8px 3px;
      border-top: solid 1px #f0f0f0;
      border-bottom: solid 1px #f0f0f0;
      box-sizing: border-box;
    }
    .btn-close {
      width: 40px;
      padding-top: 10px;
      padding-left: 11px;
      border-left: solid 1px #f0f0f0;
      cursor: pointer;
    }
    .tags-views {
      position: relative;
      float: left;
      width: calc(100% - 96px);
      height: 40px;
      background: #f0f0f0;
      box-shadow: inset 0 0 3px 2px #6464641a;
      overflow: hidden;
      .tags-cont{
        position: absolute;
        padding: 0 4px;
        overflow: visible;
        white-space: nowrap;
        transition: left .5s ease;
      }
    }
  }
</style>
