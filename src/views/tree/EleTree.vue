<template>
  <div class="ele-tree-wrapper">
    <Hints>
      <template slot="hintName">树状组织图</template>
      <template slot="hintInfo">
        <p>v-org-tree：基于vue的树结构组织图，可用于公司组织架构展示</p>
        <p>github地址：访问 <a href="https://github.com/lison16/v-org-tree" target="_blank">v-org-tree</a></p>
      </template>
    </Hints>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-card shadow="always">
          <div slot="header" class="title">可选择节点</div>
          <div class="content-box"></div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="always">
          <div slot="header" class="title">懒加载节点</div>
          <div class="content-box"></div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="always">
          <div slot="header" class="title">可拖拽节点</div>
          <div class="content-box"></div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Hints from '../../components/Hints'

export default {
  name: 'EleTree',
  components: { Hints }
}
</script>

<style lang="less">
.ele-tree-wrapper{
  .title{
    text-align: center;
    font-size: 14px;
    font-weight: bold;
  }
  .content-box{
    height: 360px;
  }
}
</style>
