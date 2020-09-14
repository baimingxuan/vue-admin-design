<template>
  <div class="count-to-page">
    <Hints>
      <template slot="hintName">数字滚动组件</template>
      <template slot="hintInfo">
        <p>vue-countTo:一个无依赖、轻量级的vue数字滚动插件，可以通过你自己的方式轻松编写</p>
        <p>github地址：访问 <el-link type="success" href="https://github.com/PanJiaChen/vue-countTo" target="_blank">vue-countTo</el-link></p>
      </template>
    </Hints>
    <el-row class="count-to-box" :gutter="20">
      <el-col :span="6">
        <el-card shadow="always" :body-style="{padding: '0px'}">
          <div slot="header" class="title">正向增加</div>
          <div class="box-cont add">
            <CountTo :start-val="0" :end-val="2020" :duration="4000" />
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card shadow="always" :body-style="{padding: '0px'}">
          <div slot="header" class="title">自定义配置</div>
          <div class="cont-wrapper">
            <div class="cont-set-data">
              <CountTo ref="countBox" :start-val="startVal" :end-val="endVal" :duration="duration" :decimals="decimals" :separator="separator" :prefix="prefix" :suffix="suffix" :autoplay="false" />
            </div>
            <div class="box-cont-set">
              <div class="cont-set-item">
                <label>startVal：</label><el-input v-model="startVal" />
              </div>
              <div class="cont-set-item">
                <label>endVal：</label><el-input v-model="endVal" />
              </div>
              <div class="cont-set-item">
                <label>duration：</label><el-input v-model="duration" />
              </div>
              <div class="cont-set-item">
                <label>decimals：</label><el-input v-model="decimals" />
              </div>
              <div class="cont-set-item">
                <label>separator：</label><el-input v-model="separator" />
              </div>
              <div class="cont-set-item">
                <label>prefix：</label><el-input v-model="prefix" />
              </div>
              <div class="cont-set-item">
                <label>suffix：</label><el-input v-model="suffix" />
              </div>
              <div class="cont-set-item">
                <el-button type="primary" @click="handleStart">开始</el-button>
                <el-button type="danger" @click="handlePause">暂停/恢复</el-button>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="always" :body-style="{padding: '0px'}">
          <div slot="header" class="title">反向减少</div>
          <div class="box-cont">
            <CountTo :start-val="2020" :end-val="0" :duration="4000" />
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Hints from '../../components/Hints'
import CountTo from 'vue-count-to'
export default {
  name: 'CountToPage',
  components: { Hints, CountTo },
  data() {
    return {
      startVal: 0,
      endVal: 2020,
      duration: 4000,
      decimals: 0,
      separator: ',',
      prefix: '￥ ',
      suffix: ' rmb'
    }
  },
  methods: {
    handleStart() {
      this.$refs.countBox.start()
    },
    handlePause() {
      this.$refs.countBox.pauseResume()
    }
  }
}
</script>

<style lang="less">
.count-to-page {
  .box-cont {
    display: flex;
    height: 300px;
    box-sizing: border-box;
    span {
      display: block;
      width: 110px;
      height: 50px;
      margin: 125px auto;
      font-size: 42px;
      text-align: center;
      color: #30B08F;
    }
    &.add {
      span {
        color: #E65D6E;
      }
    }
  }
  .cont-wrapper {
    height: 300px;
    padding: 30px 50px 30px 50px;
    box-sizing: border-box;
    .cont-set-item {
      display: inline-block;
      width: 32%;
      margin-bottom: 10px;
      label {
        display: inline-block;
        vertical-align: middle;
        width: 40%;
      }
      .el-input {
        width: 50%;
      }
    }
    .cont-set-data {
      height: 100px;
      span {
        display: block;
        width: 270px;
        margin: 10px auto 0;
        font-size: 42px;
        text-align: center;
        color: #F6416C;
      }
    }
  }
}
</style>
