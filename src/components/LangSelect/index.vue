<template>
  <div class="lang-select-wrapper">
    <el-tooltip effect="dark" content="语言切换" placement="bottom">
      <el-dropdown trigger="click" @command="handleSelect">
        <i class="icon vue-dsn-icon-yuyan" />
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item v-for="item in langOptions" :key="item.value" :command="item.value">
            {{ item.label }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-tooltip>
  </div>
</template>

<script>
export default {
  name: 'LangSelect',
  data() {
    return {
      langOptions: [
        { label: '中文简体', value: 'zh' },
        { label: '中文繁体', value: 'zh-hk' },
        { label: '英文', value: 'en' }
      ]
    }
  },
  methods: {
    handleSelect(lang) {}
  }
}
</script>

<style lang="less">
.lang-select-wrapper {
  float: left;
  width: 22px;
  height: 22px;
  padding: 4px;
  margin: 0 10px;
  cursor: pointer;
  .icon {
    font-size: 24px;
    color: #333;
  }
  &:hover {
    .icon {
      color: #409eff;
    }
  }
}
</style>
