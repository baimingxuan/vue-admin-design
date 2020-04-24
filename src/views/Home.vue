<template>
  <div class="home-wrapper">
    <div class="date-row">
      <div v-for="(item, index) in cardInfoData" :key="index" class="data-col">
        <el-card shadow="always" :body-style="{padding: '0px'}">
          <div class="date-block">
            <i :class="[ item.icon ]" :style="{ background: item.color }" class="icon-box"></i>
            <div class="date-cont">
              <p class="count">{{ item.count }}</p>
              <p class="title">{{ item.title }}</p>
            </div>
          </div>
        </el-card>
      </div>
    </div>
    <el-row class="date-box" :gutter="20">
      <el-col :span="8">
        <el-card shadow="always" :body-style="{padding: '0px'}">
          <ChartsPie :title=text type="pie" :data="chartsPieData" class="item-desc"/>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="always" :body-style="{padding: '0px'}">
          <div class="item-desc lang-box">
            <div class="title">项目语言构成</div>
            <div class="lang-item"><label>VUE</label><el-progress :percentage="45" :stroke-width="15"></el-progress></div>
            <div class="lang-item"><label>ES6</label><el-progress :percentage="32" :stroke-width="15" color="#19be6b"></el-progress></div>
            <div class="lang-item"><label>TS</label><el-progress :percentage="4" :stroke-width="15" color="#ff9900"></el-progress></div>
            <div class="lang-item"><label>Less</label><el-progress :percentage="13" :stroke-width="15" color="#e46cbb"></el-progress></div>
            <div class="lang-item"><label>HTML</label><el-progress :percentage="6" :stroke-width="15" color="#9a66e4"></el-progress></div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="always" :body-style="{padding: '0px'}">
          <ChartsPie :title=text type="ring" :data="chartsPieData" class="item-desc"/>
        </el-card>
      </el-col>
    </el-row>
    <el-row class="date-box" :gutter="20">
      <el-col :span="12">
        <el-card shadow="always" :body-style="{padding: '0px'}">
          <ChartsBar :title=title :data=commonChartsData class="schart"/>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card shadow="always" :body-style="{padding: '0px'}">
          <ChartsLine :title=title :data=commonChartsData class="schart"/>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import ChartsPie from '../components/Charts/ChartsPie'
import ChartsBar from '../components/Charts/ChartsBar'
import ChartsLine from '../components/Charts/ChartsLine'
export default {
  name: 'Home',
  components: { ChartsPie, ChartsBar, ChartsLine },
  data () {
    return {
      text: '用户访问来源',
      title: '近七天用户访问量条形图',
      cardInfoData: [
        { title: '今日点击', icon: 'vue-sys-icon-dianji', count: 682, color: '#2d8cf0' },
        { title: '新增用户', icon: 'vue-sys-icon-xinzeng', count: 259, color: '#19be6b' },
        { title: '信息发送', icon: 'vue-sys-icon-xinfeng', count: 1262, color: '#ff9900' },
        { title: '点赞统计', icon: 'vue-sys-icon-dianzan', count: 508, color: '#e46cbb' },
        { title: '累计收藏', icon: 'vue-sys-icon-heart', count: 379, color: '#9a66e4' }
      ],
      chartsPieData: [
        { value: 1920, name: '直接访问' },
        { value: 1169, name: '邮件营销' },
        { value: 986, name: '联盟广告' },
        { value: 621, name: '视频广告' },
        { value: 3256, name: '搜索引擎' }
      ],
      commonChartsData: {
        Mon: 782,
        Tue: 925,
        Wed: 1196,
        Thu: 812,
        Fri: 328,
        Sat: 222,
        Sun: 1080
      }
    }
  }
}
</script>

<style lang="less">
@import "../assets/less/home";
</style>
