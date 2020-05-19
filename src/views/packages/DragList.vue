<template>
  <div class="drag-list-wrapper">
    <el-row :gutter="20">
      <el-col :span="5">
        <div class="list-title">列表1事项</div>
        <Draggable v-model="listOne" :move="onMove" group="list" @end="handleChange($event, '列表1')" class="list-cont">
          <el-card v-for="(item, index) in listOne" :key="index" shadow="hover">{{ item.name }}</el-card>
        </Draggable>
      </el-col>
      <el-col :span="5">
        <div class="list-title">列表2事项</div>
        <Draggable v-model="listTwo" :move="onMove" group="list" @end="handleChange($event, '列表2')" class="list-cont">
          <el-card v-for="(item, index) in listTwo" :key="index" shadow="hover">{{ item.name }}</el-card>
        </Draggable>
      </el-col>
      <el-col :span="4">
        <div class="list-title">操作记录</div>
        <div class="list-cont"></div>
      </el-col>
      <el-col :span="5">
        <div class="list-title">列表1数据</div>
        <pre class="list-cont">{{ listOne }}</pre>
      </el-col>
      <el-col :span="5">
        <div class="list-title">列表2数据</div>
        <pre class="list-cont">{{ listTwo }}</pre>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Draggable from 'vuedraggable'
import Hints from '../../components/Hints'
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
  data () {
    return {
      listOne: message.map((name, index) => {
        return {name, order: index + 1}
      }),
      listTwo: [],
      handleList: []
    }
  },
  components: { Draggable, Hints },
  methods: {
    onMove (obj) {
      console.log(obj)
    },
    handleChange (event, type) {
      console.log(event)
      const srcClassName = (event.srcElement || event.target).classList[0]
      const targetClassName = event.to.classList[0]
      let src = ''
      let target = ''
      if (srcClassName === targetClassName) {
        if (type === '列表1') {
          src = '列表1'
          target = '列表1'
        } else {
          src = '列表2'
          target = '列表2'
        }
      } else {
        if (type === '列表1') {
          src = '列表1'
          target = '列表2'
        } else {
          src = '列表2'
          target = '列表1'
        }
      }
      console.log(src, target)
      // this.handleList.push(`${src} => ${target}, ${oldIndex} => ${newIndex}`)
    }
  }
}
</script>

<style lang="less">
.drag-list-wrapper{
  .list-title{
    height: 40px;
    margin-bottom: 8px;
    line-height: 40px;
    font-size: 15px;
    font-weight: 600;
    text-align: center;
    box-shadow: rgba(0, 0, 0, 0.1) 0 2px 12px 0;
  }
  .list-cont{
    height: 510px;
    padding: 10px;
    box-shadow: rgba(0, 0, 0, 0.1) 0 2px 12px 0;
    .el-card{
      margin-bottom: 10px;
      .el-card__body{
        padding: 14px 20px;
      }
    }
  }
  pre{
    font-family: Consolas,Menlo,Courier,monospace;
  }
}
</style>
