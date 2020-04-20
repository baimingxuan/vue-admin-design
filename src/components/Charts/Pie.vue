<template>
  <div class="pie-wrapper">
    <Charts :options="options" :auto-resize="true"/>
  </div>
</template>

<script>
export default {
  name: 'Pie',
  data () {
    return {
      options: {}
    }
  },
  mounted () {
    this.options = {
      // 标题
      title: {
        text: '用户访问来源',
        x: 'center',
        textStyle: {
          color: '#516b91',
          fontSize: 18,
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
        x: 'center',
        bottom: 20,
        data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎'],
        textStyle: {
          color: '#a9a9a9',
          fontSize: 20
        }
      },
      // 各个部分的颜色
      color: ['#2d8cf0', '#19be6b', '#ff9900', '#e46cbb', '#9a66e4'],
      // 拖拽的时候重新渲染  默认关闭
      calculable: true,
      // 工具箱
      toolbox: {
        show: true,
        feature: {
          mark: {show: true},
          dataView: {show: true, readOnly: false},
          magicType: {
            show: true,
            type: ['pie', 'funnel'],
            option: {
              funnel: {
                x: '25%',
                width: '50%',
                funnelAlign: 'left',
                max: 1548
              }
            }
          },
          restore: {show: true},
          saveAsImage: {show: true}
        }
      },
      label: {
        show: true,
        fontSize: 20
      },
      series: [
        {
          itemStyle: {
            normal: {
              label: {
                show: true,
                formatter: '{b} : {c} ({d}%)'
              },
              labelLine: {
                show: true
              }
            }
          },
          name: '访问来源',
          // 类型：这里是饼图
          type: 'pie',
          radius: '55%',
          center: ['50%', '60%'],
          // 数据
          data: [
            { name: '直接访问', value: 1920 },
            { name: '邮件营销', value: 1169 },
            { name: '联盟广告', value: 986 },
            { name: '视屏广告', value: 621 },
            { name: '搜索引擎', value: 3256 }
          ]
        }
      ]
    }
  }
}
</script>

<style lang="scss">

</style>
