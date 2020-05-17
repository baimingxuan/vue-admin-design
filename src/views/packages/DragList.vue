<template>
  <div class="drag-list-wrapper">
    <el-row :gutter="20">
      <el-col :span="5">
        <div class="list-title">列表1事项</div>
        <div class="list-cont">
          <Draggable v-model="listOne" :move="onMove" group="list" @end="handleChange($event)">
            <div class="list-item" v-for="(item, index) in listOne" :key="index">{{ item.name }}</div>
          </Draggable>
        </div>
      </el-col>
      <el-col :span="5">
        <div class="list-title">列表2事项</div>
        <div class="list-cont">
          <Draggable v-model="listTwo" :move="onMove" group="list" @end="handleChange($event)">
            <div class="list-item" v-for="(item, index) in listTwo" :key="index">{{ item.name }}¬</div>
          </Draggable>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="list-title">操作记录</div>
        <div class="list-cont"></div>
      </el-col>
      <el-col :span="5">
        <div class="list-title">列表1数据</div>
        <pre>{{ listOne }}</pre>
      </el-col>
      <el-col :span="5">
        <div class="list-title">列表2数据</div>
        <pre>{{ listTwo }}</pre>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Draggable from 'vuedraggable'
import Hints from '../../components/Hints'
const message = [
  'vue.draggable',
  'draggable',
  'component',
  'for',
  'vue.js 2.0',
  'based',
  'on',
  'Sortablejs'
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
    handleChange (event) {
      console.log(event)
      // this.handleList.push(`${src} => ${target}, ${oldIndex} => ${newIndex}`)
    }
  }
}
</script>

<style scoped>

</style>
