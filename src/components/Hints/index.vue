<template>
  <div class="hints-wrapper">
    <div class="hint-title">
      <i class="vue-dsn-icon-tishi"></i>
      <span><slot name="hintName"></slot></span>
    </div>
    <div class="hint-info">
      <slot name="hintInfo"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Hints'
}
</script>

<style lang="less">
.hints-wrapper{
  width: 100%;
  min-height: 50px;
  padding: 8px 15px;
  margin-bottom: 20px;
  background: #eef1f6;
  box-sizing: border-box;
  .hint-title{
    line-height: 30px;
    font-size: 16px;
    color: #409eff;
    i{
      font-size: 18px;
    }
  }
  .hint-info{
    padding-left: 24px;
    line-height: 24px;
  }
}
</style>
