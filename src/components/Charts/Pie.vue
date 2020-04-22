<template>
  <div ref="dom" class="charts-pie"></div>
</template>

<script>
import echarts from 'echarts'

export default {
  name: 'Pie',
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
          text: '用户访问来源',
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
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        // 图例说明
        legend: {
          show: true,
          orient: 'vertical',
          left: 10,
          top: 20,
          itemWidth: 20,
          itemHeight: 12,
          itemGap: 5,
          data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎'],
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
            radius: '70%',
            center: ['52%', '55%'],
            // 数据配置
            data: [
              { value: 1920, name: '直接访问' },
              { value: 1169, name: '邮件营销' },
              { value: 986, name: '联盟广告' },
              { value: 621, name: '视频广告' },
              { value: 3256, name: '搜索引擎' }
            ]
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
