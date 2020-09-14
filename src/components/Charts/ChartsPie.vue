<template>
  <div ref="dom" class="charts-pie" />
</template>

<script>
import echarts from 'echarts'

export default {
  name: 'ChartsPie',
  props: {
    title: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'pie'
    },
    data: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      dom: null
    }
  },
  mounted() {
    this.drawing()
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resize)
  },
  methods: {
    resize() {
      this.dom.resize()
    },
    drawing() {
      const legendData = this.data.map(item => item.name)
      const radius = this.type === 'pie' ? '70%' : ['50%', '70%']
      const options = {
        // 标题
        title: {
          text: this.title,
          left: 'center',
          top: 15,
          textStyle: {
            fontSize: 16,
            fontWeight: 'normal'
          }
        },
        // 工具提示
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        // 图例说明
        legend: {
          show: true,
          orient: 'vertical',
          left: 10,
          top: 20,
          itemWidth: 25,
          itemHeight: 15,
          itemGap: 5,
          data: legendData,
          textStyle: {
            color: '#aaa',
            fontSize: 12
          }
        },
        // 颜色配置
        color: ['#2d8cf0', '#19be6b', '#ff9900', '#e46cbb', '#9a66e4'],
        // 类型配置
        series: [
          {
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  fontSize: 14,
                  formatter: '{c} ({d}%)'
                },
                labelLine: {
                  show: true
                }
              }
            },
            name: '访问来源',
            // 类型配置
            type: 'pie',
            radius: radius,
            center: ['52%', '55%'],
            // 数据配置
            data: this.data
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
