<template>
  <div class="transfer-wrapper">
    <Hints>
      <template slot="hintName">Transfer穿梭框</template>
      <template slot="hintInfo">
        <p>element-Transfer：使用elementUI的Transfer组件，可用于对列表数据进行选中、取消等操作</p>
        <p>地址：访问 <el-link type="success" href="https://element.eleme.cn/#/zh-CN/component/transfer" target="_blank">element-Transfer</el-link></p>
      </template>
    </Hints>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card shadow="always">
          <div slot="header" class="title">基础用法</div>
          <div class="content-box">
            <el-transfer v-model="value1" :data="data"></el-transfer>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card shadow="always">
          <div slot="header" class="title">可自定义</div>
          <div class="content-box">
            <el-transfer filterable v-model="value2" :data="data" :titles="['Source', 'Target']" :button-texts="['到左边', '到右边']"
                         :format="{noChecked: '${total}',hasChecked: '${checked}/${total}'}" :left-default-checked="[2, 6]"
                         :right-default-checked="[1]" @change="handleChange"></el-transfer>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Hints from '../../components/Hints'

export default {
  name: 'TransferPage',
  components: { Hints },
  data () {
    const baseData = () => {
      const data = []
      for (let i = 1; i < 10; i++) {
        data.push({
          key: i,
          label: `备选项 ${i}`
        })
      }
      return data
    }
    return {
      data: baseData(),
      value1: [1, 5],
      value2: [1, 5]
    }
  },
  methods: {
    handleChange (value, direction, movedKeys) {
      console.log(value, direction, movedKeys)
    }
  }
}
</script>

<style lang="less">
.transfer-wrapper {
  .title {
    text-align: center;
    font-size: 14px;
    font-weight: bold;
  }
  .content-box {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 360px;
    .el-transfer-panel__body {
      height: 280px;
      .el-transfer-panel__list {
        &.is-filterable {
          height: 230px;
        }
      }
    }
  }
}
</style>
