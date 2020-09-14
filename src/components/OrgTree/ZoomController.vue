<template>
  <div class="zoom-controller">
    <el-button type="text" @click="scale('cut')">
      <i class="icon el-icon-remove" />
    </el-button>
    <span>{{ value }}%</span>
    <el-button type="text" @click="scale('add')">
      <i class="icon el-icon-circle-plus" />
    </el-button>
  </div>
</template>

<script>
export default {
  name: 'ZoomController',
  props: {
    value: {
      type: Number,
      default: 100
    },
    diff: {
      type: Number,
      default: 10
    },
    min: {
      type: Number,
      default: 50
    },
    max: {
      type: Number,
      default: 150
    }
  },
  methods: {
    scale(type) {
      const zoom = this.value + (type === 'cut' ? -this.diff : this.diff)
      if ((zoom < this.min && type === 'cut') || (zoom > this.max && type === 'add')) {
        return false
      }
      this.$emit('input', zoom)
    }
  }
}
</script>

<style lang="less">
.zoom-controller{
  .icon{
    font-size: 20px;
    color: #9da2ac;
    &:hover{
      color: #409eff;
    }
  }
  span{
    display: inline-block;
    vertical-align: middle;
  }
}
</style>
