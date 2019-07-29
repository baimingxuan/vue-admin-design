<template>
  <div class="tags-nav clear-fix">
    <div class="btn-con">
      <button>
        <SvgIcon class="icon" icon-class="vue-sys-icon-zuoyoujiantou1"></SvgIcon>
      </button>
    </div>
    <div class="tags-views">
      <el-tabs v-model="editableTabsValue2" type="card" closable @tab-remove="removeTab">
        <el-tab-pane
          v-for="(item) in editableTabs2"
          :key="item.name"
          :label="item.title"
          :name="item.name">
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="btn-con">
      <button>
        <SvgIcon class="icon" icon-class="vue-sys-icon-zuoyoujiantou"></SvgIcon>
      </button>
    </div>
    <div class="btn-con btn-close">
      <el-dropdown>
        <span class="el-dropdown-link">
          <SvgIcon class="icon" icon-class="vue-sys-icon-quxiao"></SvgIcon>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>关闭所有</el-dropdown-item>
          <el-dropdown-item>关闭其他</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import SvgIcon from '../../../components/SvgIcon'
export default {
  name: 'TagsNav',
  data () {
    return {
      editableTabsValue2: '2',
      editableTabs2: [{
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
      }],
      tabIndex: 2
    }
  },
  components: {
    SvgIcon
  },
  methods: {
    removeTab (targetName) {
      let tabs = this.editableTabs2
      let activeName = this.editableTabsValue2
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1]
            if (nextTab) {
              activeName = nextTab.name
            }
          }
        })
      }

      this.editableTabsValue2 = activeName
      this.editableTabs2 = tabs.filter(tab => tab.name !== targetName)
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
      float: left;
      width: calc(100% - 88px);
      height: 40px;
      background: #f0f0f0;
      box-shadow: inset 0 0 3px 2px #6464641a;
      .el-tabs__nav,
      .el-tabs__item,
      .is-top {
        border: none;
      }
      .el-tabs__item {
        height: 32px;
        margin-right: 4px;
        line-height: 32px;
        background: #fff;
        .el-icon-close {
          right: -12px;
          width: 14px;
        }
      }
      .el-tabs__nav-wrap {
        margin: 4px;
      }
    }
  }
</style>
