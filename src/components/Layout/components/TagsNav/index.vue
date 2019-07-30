<template>
  <div class="tags-nav clear-fix">
    <div class="btn-con" @click="handleMove(300)">
      <SvgIcon class="icon" icon-class="vue-sys-icon-zuoyoujiantou1"/>
    </div>
    <div class="tags-views" ref="tagsViews" @DOMMouseScroll="handlescroll" @mousewheel="handlescroll">
      <div class="tags-cont" ref="tagsCont" :style="{left: tagsContLeft + 'px'}">
        <transition-group>
          <TagItem
            v-for="(tag, index) in tags"
            :key="tag.name"
            @on-close="handleClose(index)">
            {{ tag.title }}
          </TagItem>
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
import SvgIcon from '../../../../components/SvgIcon'
import TagItem from './TagItem'
export default {
  data () {
    return {
      tagsContLeft: 0,
      tags: [{
        title: 'Tab 1',
        name: '1',
        content: 'Tab 1 content'
      }, {
        title: 'Tab 2',
        name: '2',
        content: 'Tab 2 content'
      }, {
        title: 'Tab 3',
        name: '3',
        content: 'Tab 3 content'
      }, {
        title: 'Tab 4',
        name: '4',
        content: 'Tab 4 content'
      }, {
        title: 'Tab 5',
        name: '5',
        content: 'Tab 5 content'
      }, {
        title: 'Tab 6',
        name: '6',
        content: 'Tab 6 content'
      }, {
        title: 'Tab 7',
        name: '7',
        content: 'Tab 7 content'
      }, {
        title: 'Tab 8',
        name: '8',
        content: 'Tab 8 content'
      }, {
        title: 'Tab 9',
        name: '9',
        content: 'Tab 9 content'
      }]
    }
  },
  components: {
    SvgIcon,
    TagItem
  },
  methods: {
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
      this.tags.splice(index, 1)
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

<style lang="scss">
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
