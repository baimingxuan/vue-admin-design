<template>
  <div ref="dom" class="charts-line"></div>
</template>

<script>
import echarts from 'echarts'

export default {
  name: 'Line',
  data () {
    return {
      dom: null
    }
  },
  props: {},
  mounted () {
    this.drawing()
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.resize)
  },
  methods: {
    resize () {
      this.dom.resize()
    },
    drawing () {
      let options = {
        // 标题
        title: {
          text: '近七天用户访问量条形图',
          x: 'center',
          y: 15,
          textStyle: {
            fontSize: 16,
            fontWeight: 'normal'
          }
        },
        // 工具提示
        tooltip: {
          trigger: 'item',
          formatter: '{b} <br/>{a} : {c}',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        // 颜色配置
        color: ['#2d8cf0'],
        // 类型配置
        series: [
          {
            name: '直接访问',
            // 类型配置
            type: 'line',
            barWidth: '50%',
            // 数据配置
            data: [ 1080, 925, 1166, 812, 328, 222, 1080 ]
          }
        ]
      }
      this.dom = echarts.init(this.$refs.dom)
      this.dom.setOption(options)
      window.addEventListener('resize', this.resize)
    }
  }
}
</script>

<style lang="less">

</style>
