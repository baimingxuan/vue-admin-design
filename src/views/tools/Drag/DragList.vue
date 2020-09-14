<template>
  <div class="drag-list-wrapper">
    <Hints>
      <template slot="hintName">拖拽列表</template>
      <template slot="hintInfo">
        <p>Vue.Draggable：基于Sortable.js的vue组件，用以实现拖拽功能</p>
        <p>github地址：访问 <el-link type="success" href="https://github.com/SortableJS/Vue.Draggable" target="_blank">Vue.Draggable</el-link></p>
      </template>
    </Hints>
    <el-row :gutter="20">
      <el-col :span="5">
        <el-card shadow="always">
          <div slot="header" class="title">列表1事项</div>
          <Draggable v-model="listOne" group="list" class="list-cont list1" @end="handleChange($event, '列表1')">
            <el-card v-for="(item, index) in listOne" :key="index" shadow="hover">{{ item.name }}</el-card>
          </Draggable>
        </el-card>
      </el-col>
      <el-col :span="5">
        <el-card shadow="always">
          <div slot="header" class="title">列表2事项</div>
          <Draggable v-model="listTwo" group="list" class="list-cont list2" @end="handleChange($event, '列表2')">
            <el-card v-for="(item, index) in listTwo" :key="index" shadow="hover">{{ item.name }}</el-card>
          </Draggable>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="always">
          <div slot="header" class="title">操作记录</div>
          <div class="list-cont">
            <p v-for="(item, index) in handleList" :key="index">{{ item }}</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="5">
        <el-card shadow="always">
          <div slot="header" class="title">列表1数据</div>
          <pre class="list-cont">{{ listOne }}</pre>
        </el-card>
      </el-col>
      <el-col :span="5">
        <el-card shadow="always">
          <div slot="header" class="title">列表2数据</div>
          <pre class="list-cont">{{ listTwo }}</pre>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Draggable from 'vuedraggable'
import Hints from '../../../components/Hints'
const message = [
  'ECMAScript6',
  'VueJS',
  'ReactJS',
  'AngularJS',
  'Webpack',
  'NodeJS',
  'TypeScript'
]

export default {
  name: 'DragList',
  components: { Draggable, Hints },
  data() {
    return {
      listOne: message.map((name, index) => {
        return { name, order: index + 1 }
      }),
      listTwo: [],
      handleList: []
    }
  },
  methods: {
    handleChange(event, type) {
      const srcClassName = event.from.classList[1]
      const targetClassName = event.to.classList[1]
      let from = ''
      let to = ''
      if (srcClassName === targetClassName) {
        if (type === '列表1') {
          from = '列表1'
          to = '列表1'
        } else {
          from = '列表2'
          to = '列表2'
        }
      } else {
        if (type === '列表1') {
          from = '列表1'
          to = '列表2'
        } else {
          from = '列表2'
          to = '列表1'
        }
      }
      this.handleList.push(`${from} => ${to}, ${event.oldIndex} => ${event.newIndex}`)
    }
  }
}
</script>

<style lang="less">
.drag-list-wrapper {
  .list-cont {
    height: 510px;
    .el-card {
      margin-bottom: 10px;
      .el-card__body {
        padding: 14px 20px;
      }
    }
  }
}
</style>
