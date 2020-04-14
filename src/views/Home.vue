<template>
  <div class="data-panel">
    <el-row class="date-block" :gutter="20">
      <el-col :span="4">
        <el-card shadow="hover" :body-style="{padding: '0px'}">
          <div class="label-box">
            <i class="dp-icon-md-locate icon-box" style="background: #2d8cf0"></i>
            <div class="label-content">
              <p class="count">682</p>
              <p class="title">今日点击</p>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="hover" :body-style="{padding: '0px'}">
          <div class="label-box">
            <i class="dp-icon-md-person-add icon-box" style="background: #19be6b"></i>
            <div class="label-content">
              <p class="count">259</p>
              <p class="title">新增用户</p>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="hover" :body-style="{padding: '0px'}">
          <div class="label-box">
            <i class="dp-icon-md-mail icon-box" style="background: #ff9900"></i>
            <div class="label-content">
              <p class="count">1262</p>
              <p class="title">信息发送</p>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="hover" :body-style="{padding: '0px'}">
          <div class="label-box">
            <i class="dp-icon-md-thumbs-up icon-box" style="background: #e46cbb"></i>
            <div class="label-content">
              <p class="count">508</p>
              <p class="title">点赞统计</p>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="hover" :body-style="{padding: '0px'}">
          <div class="label-box">
            <i class="dp-icon-md-heart icon-box" style="background: #9a66e4"></i>
            <div class="label-content">
              <p class="count">379</p>
              <p class="title">累计收藏</p>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
<!--    <el-row class="date-block" :gutter="20">-->
<!--      <el-col :span="7">-->
<!--        <el-card shadow="hover" :body-style="{padding: '0px'}">-->
<!--          <schart class="item-desc" canvas-id="pie" type="pie" :data="pieData" :options="optionsPie"></schart>-->
<!--        </el-card>-->
<!--      </el-col>-->
<!--      <el-col :span="6">-->
<!--        <el-card shadow="hover" :body-style="{padding: '0px'}">-->
<!--          <div class="item-desc lang-box">-->
<!--            <div class="title">项目语言构成</div>-->
<!--            <div class="lang-item"><label>VUE</label><el-progress :percentage="66" :stroke-width="15"></el-progress></div>-->
<!--            <div class="lang-item"><label>ES6</label><el-progress :percentage="18" :stroke-width="15" color="#19be6b"></el-progress></div>-->
<!--            <div class="lang-item"><label>Less</label><el-progress :percentage="12" :stroke-width="15" color="#ff9900"></el-progress></div>-->
<!--            <div class="lang-item"><label>HTML</label><el-progress :percentage="4" :stroke-width="15" color="#e46cbb"></el-progress></div>-->
<!--          </div>-->
<!--        </el-card>-->
<!--      </el-col>-->
<!--      <el-col :span="7">-->
<!--        <el-card shadow="hover" :body-style="{padding: '0px'}">-->
<!--          <schart class="item-desc" canvas-id="ring" type="ring" :data="pieData" :options="optionsPie"></schart>-->
<!--        </el-card>-->
<!--      </el-col>-->
<!--    </el-row>-->
<!--    <el-row class="date-block" :gutter="20">-->
<!--      <el-col :span="10">-->
<!--        <el-card shadow="hover" :body-style="{padding: '0px'}">-->
<!--          <schart class="schart" canvasId="bar" type="bar" :data="chartData" :options="optionsBar"></schart>-->
<!--        </el-card>-->
<!--      </el-col>-->
<!--      <el-col :span="10">-->
<!--        <el-card shadow="hover" :body-style="{padding: '0px'}">-->
<!--          <schart class="schart"  canvasId="line" type="line" :data="chartData" :options="optionsLine"></schart>-->
<!--        </el-card>-->
<!--      </el-col>-->
<!--    </el-row>-->
  </div>
</template>

<script>
export default {
  name: 'Home',
  components: {
  },
  data () {
    return {
      pieData: [
        {
          name: '直接访问',
          value: 1920
        },
        {
          name: '邮件营销',
          value: 1169
        },
        {
          name: '联盟广告',
          value: 986
        },
        {
          name: '视屏广告',
          value: 621
        },
        {
          name: '搜索引擎',
          value: 3256
        }
      ],
      chartData: [{
        name: '2018/12/12',
        value: 1080
      },
      {
        name: '2018/12/13',
        value: 925
      },
      {
        name: '2018/12/14',
        value: 1166
      },
      {
        name: '2018/12/15',
        value: 812
      },
      {
        name: '2018/12/16',
        value: 328
      },
      {
        name: '2018/12/17',
        value: 222
      },
      {
        name: '2018/12/18',
        value: 1080
      }],
      optionsPie: {
        title: '用户访问来源',
        titleColor: '#516b91',
        legendColor: '#a9a9a9',
        colorList: ['#2d8cf0', '#19be6b', '#ff9900', '#e46cbb', '#9a66e4']
      },
      optionsBar: {
        title: '近七天用户访问量条形图',
        showValue: true,
        fillColor: 'rgb(45, 140, 240)',
        bottomPadding: 30,
        topPadding: 30
      },
      optionsLine: {
        title: '近七天用户访问量趋势图',
        fillColor: '#FC6FA1',
        axisColor: '#008ACD',
        contentColor: '#EEEEEE',
        bgColor: '#F5F8FD',
        bottomPadding: 30,
        topPadding: 30
      }
    }
  }
}
</script>

<style lang="scss">
  .date-block{
    margin-bottom: 20px;
  }
  .label-box{
    display: flex;
    align-items: center;
    height: 100px;
    .icon-box{
      font-size: 40px;
      width: 100px;
      height: 100px;
      text-align: center;
      line-height: 100px;
      color: #fff;
    }
    .label-content{
      flex: 1;
      text-align: center;
      color: #515a6e;
      .count{
        line-height: 50px;
        font-size: 35px;
      }
      .title{
        font-size: 15px;
      }
    }
  }
  .item-desc{
    width: 100%;
    height: 300px;
  }
  .lang-box{
    padding: 10px 25px;
    box-sizing: border-box;
    .title{
      line-height: 32px;
      font-size: 16px;
      text-align: center;
      margin-bottom: 10px;
    }
    .lang-item{
      height: 48px;
      line-height: 20px;
    }
  }
  .schart{
    width: 100%;
    height: 370px;
  }
</style>
