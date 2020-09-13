<template>
  <div class="org-tree-wrapper" :style="{ height: displayMode === 'vertical' ? '650px' : '1050px' }">
    <Hints>
      <template slot="hintName">树状组织图</template>
      <template slot="hintInfo">
        <p>v-org-tree：基于vue的树结构组织图，可用于公司组织架构展示</p>
        <p>github地址：访问 <el-link type="success" href="https://github.com/lison16/v-org-tree" target="_blank">v-org-tree</el-link></p>
      </template>
    </Hints>
    <div class="ctrl-box">
      <div class="btn-item">
        <span>排列方式：</span>
        <el-radio-group v-model="displayMode" size="small">
          <el-radio-button label="vertical">竖排</el-radio-button>
          <el-radio-button label="horizontal">横排</el-radio-button>
        </el-radio-group>
      </div>
      <div class="btn-item">
        <span>展开全部：</span>
        <el-switch v-model="expandAll"/>
      </div>
    </div>
    <div class="zoom-box">
      <ZoomController v-model="zoom" :min="80" :max="120" :diff="10"/>
    </div>
    <OrgView :zoomVal="zoomVal" :expandAll="expandAll" :horizontal="horizontal"/>
  </div>
</template>

<script>
import OrgView from '../../components/OrgTree/OrgView'
import ZoomController from '../../components/OrgTree/ZoomController'
import Hints from '../../components/Hints'

export default {
  name: 'OrgTree',
  data () {
    return {
      expandAll: true,
      displayMode: 'vertical',
      zoom: 100
    }
  },
  components: { OrgView, ZoomController, Hints },
  computed: {
    zoomVal () {
      return this.zoom / 100
    },
    horizontal () {
      if (this.displayMode === 'vertical') {
        return false
      } else {
        return true
      }
    }
  }
}
</script>

<style lang="less">
.org-tree-wrapper {
  position: relative;
  min-height: 580px;
  .ctrl-box {
    .btn-item {
      margin-bottom: 10px;
      .el-radio-button--small {
        .el-radio-button__inner {
          padding: 5px 10px;
        }
      }
    }
  }
  .zoom-box {
    position: absolute;
    bottom: 0;
    right: 25px;
  }
}
</style>
