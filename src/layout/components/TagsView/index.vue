<template>
  <div class="tags-nav-wrapper clear-fix">
    <el-button type="text" class="btn-con" @click="handleMove(240)">
      <i class="icon el-icon-arrow-left" />
    </el-button>
    <div ref="tagsViews" class="tags-views" @DOMMouseScroll="handleScroll" @mousewheel="handleScroll">
      <div ref="tagsCont" class="tags-cont" :style="{left: tagsContLeft + 'px'}">
        <transition-group>
          <router-link v-for="item in visitedViews" ref="tagsItem" :key="item.name" :to="{ path: item.path }">
            <TagItem :class="{active: isActive(item)}" :fixed="item.meta.fixed" @on-close="handleSelectedClose(item)">{{ item.title }}</TagItem>
          </router-link>
        </transition-group>
      </div>
    </div>
    <el-button type="text" class="btn-con" @click="handleMove(-240)">
      <i class="icon el-icon-arrow-right" />
    </el-button>
    <div class="btn-con btn-close">
      <el-dropdown @command="handleClose">
        <span class="el-dropdown-link">
          <i class="icon el-icon-circle-close" />
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
  components: { TagItem },
  data() {
    return {
      tagsContLeft: 0,
      contPadding: 4,
      selectedTag: {}
    }
  },
  computed: {
    ...mapGetters(['visitedViews']),
    routes() {
      return this.$router.options.routes
    }
  },
  watch: {
    $route(val) {
      this.addTags()
      this.getTagElement(val)
      this.selectedTag = val
    }
  },
  mounted() {
    this.initTags()
    this.addTags()
  },
  methods: {
    ...mapMutations(['addVisitedView', 'delVisitedView', 'delAllVisitedView', 'delOthersVisitedView']),
    isActive(tag) {
      return tag.path === this.$route.path
    },
    filterFixedTags(routes, basePath = '/') {
      let tags = []
      routes.forEach(item => {
        if (item.meta && item.meta.fixed) {
          const tagPath = path.resolve(basePath, item.path)
          tags.push({
            fullPath: tagPath,
            path: tagPath,
            name: item.name,
            meta: { ...item.meta }
          })
        }
        if (item.children) {
          const tempTags = this.filterFixedTags(item.children, item.path)
          if (tempTags.length >= 1) {
            tags = [...tags, ...tempTags]
          }
        }
      })
      return tags
    },
    initTags() {
      const fixedTags = this.filterFixedTags(this.routes)
      for (const tag of fixedTags) {
        if (tag.name) {
          this.addVisitedView(tag)
        }
      }
    },
    addTags() {
      const { name } = this.$route
      if (name) {
        this.addVisitedView(this.$route)
      }
      return false
    },
    handleScroll(e) {
      const type = e.type
      let distance = 0
      // mousewheel非火狐浏览器鼠标滚动事件; DOMMouseScroll火狐浏览器鼠标滚动事件
      if (type === 'mousewheel' || type === 'DOMMouseScroll') {
        // mousewheel 事件中的 event.wheelDelta 属性值：若滚轮是向上滚动，返回值为正，反之为负；且返回的值，均为 120 的倍数，即：幅度大小 = 返回的值 / 120
        // DOMMouseScroll 事件中的 event.detail 属性值：返回的值，与 event.wheelDelta 正好相反，即滚轮是向上滚动，返回值为负，反之为正；返回的值，均为 3 的倍数，即：幅度大小 = 返回的值 / 3
        distance = (e.wheelDelta) ? e.wheelDelta : -(e.detail || 0) * 40
      }
      this.handleMove(distance)
    },
    handleMove(offset) {
      const viewWidth = this.$refs.tagsViews.offsetWidth
      const contWidth = this.$refs.tagsCont.offsetWidth
      if (offset > 0) {
        this.tagsContLeft = Math.min(0, this.tagsContLeft + offset)
      } else {
        if (viewWidth < contWidth) {
          if (this.tagsContLeft < -(contWidth - viewWidth)) {
            // this.tagsContLeft = this.tagsContLeft
          } else {
            this.tagsContLeft = Math.max(this.tagsContLeft + offset, viewWidth - contWidth)
          }
        } else {
          this.tagsContLeft = 0
        }
      }
    },
    getTagElement(route) {
      this.$nextTick(() => {
        const tagsItemArr = this.$refs.tagsItem
        const index = tagsItemArr.findIndex(item => {
          return item.to.path === route.fullPath
        })
        const tag = tagsItemArr[index].$el
        this.moveToCurrentTag(tag)
      })
    },
    moveToCurrentTag(tag) {
      const viewWidth = this.$refs.tagsViews.offsetWidth
      const contWidth = this.$refs.tagsCont.offsetWidth
      if (contWidth < viewWidth) {
        this.tagsContLeft = 0
      } else if (tag.offsetLeft < -this.tagsContLeft) {
        // 标签在可视区域左侧
        this.tagsContLeft = -tag.offsetLeft + this.contPadding
      } else if (tag.offsetLeft > -this.tagsContLeft && tag.offsetLeft + tag.offsetWidth < -this.tagsContLeft + viewWidth) {
        // 标签在可视区域
        this.tagsContLeft = Math.min(0, viewWidth - tag.offsetWidth - tag.offsetLeft - this.contPadding)
      } else {
        // 标签在可视区域右侧
        this.tagsContLeft = -(tag.offsetLeft - (viewWidth - this.contPadding - tag.offsetWidth))
      }
    },
    handleSelectedClose(view) {
      this.delVisitedView(view)
      if (this.isActive(view)) {
        this.showLastView()
      }
    },
    showLastView() {
      const lastView = this.visitedViews.slice(-1)[0]
      if (lastView) {
        this.$router.push(lastView.fullPath)
      }
    },
    handleClose(type) {
      if (type === 'all') {
        this.delAllVisitedView()
        this.showLastView()
      }
      if (type === 'other') {
        if (this.selectedTag) {
          this.delOthersVisitedView(this.selectedTag)
        }
      }
      this.tagsContLeft = 0
    }
  }
}
</script>

<style lang="less">
.tags-nav-wrapper {
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
    .tags-cont {
      position: absolute;
      padding: 0 4px;
      overflow: visible;
      white-space: nowrap;
      transition: left .5s ease;
    }
  }
}
</style>
