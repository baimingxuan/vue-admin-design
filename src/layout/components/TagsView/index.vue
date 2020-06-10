<template>
  <div class="tags-nav clear-fix">
    <div class="btn-con" @click="handleMove(300)">
      <SvgIcon class="icon" icon-class="vue-sys-icon-zuoyoujiantou1"/>
    </div>
    <div class="tags-views" ref="tagsViews" @DOMMouseScroll="handlescroll" @mousewheel="handlescroll">
      <div class="tags-cont" ref="tagsCont" :style="{left: tagsContLeft + 'px'}">
        <transition-group>
          <router-link v-for="(tag, index) in visitedViews"
                       :to="{ path: tag.path }"
                       :key="tag.name">
            <TagItem
              @on-close="handleClose(index)"
              :class="{active: isActive(tag)}">
              {{ tag.title }}
            </TagItem>
          </router-link>
        </transition-group>
      </div>
    </div>
    <div class="btn-con" @click="handleMove(-300)">
      <SvgIcon class="icon" icon-class="vue-sys-icon-zuoyoujiantou"/>
    </div>
    <div class="btn-con btn-close">
      <el-dropdown @command="handleCtrl">
        <span class="el-dropdown-link">
          <SvgIcon class="icon" icon-class="vue-sys-icon-quxiao"/>
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
import { mapMutations } from 'vuex'
import path from 'path'
import SvgIcon from '../../../components/SvgIcon'
import TagItem from './TagItem'

export default {
  name: 'TagsView',
  data () {
    return {
      tagsContLeft: 0,
      affixTags: []
    }
  },
  components: { SvgIcon, TagItem },
  computed: {
    routes () {
      return this.$router.options.routes
    },
    visitedViews () {
      return this.$store.state.tagsView.visitedViews
    }
  },
  watch: {
    $route () {
      this.addTags()
    }
  },
  mounted () {
    this.initTags()
    this.addTags()
  },
  methods: {
    ...mapMutations(['addVisitedView', 'addCachedViews']),
    isActive (tag) {
      return tag.path === this.$route.path
    },
    filterAffixTags (routes, basePath = '/') {
      let tags = []
      routes.forEach(route => {
        if (route.meta && route.meta.affix) {
          const tagPath = path.resolve(basePath, route.path)
          tags.push({
            fullPath: tagPath,
            path: tagPath,
            name: route.name,
            meta: { ...route.meta }
          })
        }
        if (route.children) {
          const tempTags = this.filterAffixTags(route.children, route.path)
          if (tempTags.length >= 1) {
            tags = [...tags, ...tempTags]
          }
        }
      })
      return tags
    },
    initTags () {
      const affixTags = this.affixTags = this.filterAffixTags(this.routes)
      for (const tag of affixTags) {
        // Must have tag name
        if (tag.name) {
          this.$store.dispatch('addDisplayTags', tag)
        }
      }
    },
    addTags () {
      const { name } = this.$route
      if (name) {
        this.addVisitedView(this.$route)
        this.addCachedViews(this.$route)
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
    handleClose (index) {
      this.visitedViews.splice(index, 1)
    },
    handleCtrl (command) {
      if (command === 'all') {
        let len = this.tags.length
        this.tags.splice(1, len)
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
      width: 18px;
      height: 18px;
      font-size: 100px;
      vertical-align: middle;
      cursor: pointer;
    }
    .btn-con {
      float: left;
      width: 28px;
      height: 40px;
      padding: 8px 7px 8px 3px;
      border-top: solid 1px #f0f0f0;
      border-bottom: solid 1px #f0f0f0;
      box-sizing: border-box;
      cursor: pointer;
    }
    .btn-close {
      width: 32px;
    }
    .tags-views {
      position: relative;
      float: left;
      width: calc(100% - 88px);
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
