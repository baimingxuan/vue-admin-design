<template>
  <div class="detail-form">
    <el-form @submit.prevent="handleSubmit">
      <el-form-item v-if="type === 'node'">
        <el-input v-model="formModel.label" @blur.prevent="handleSubmit" />
      </el-form-item>
      <el-form-item v-else-if="type === 'edge'">
        <el-input v-model="formModel.label" @blur.prevent="handleSubmit" />
        <el-select v-model="formModel.shape" @change.prevent="handleSubmit">
          <option value="flow-smooth">Smooth</option>
          <option value="flow-polyline">Polyline</option>
          <option value="custom-polyline">Custom Polyline</option>
          <option value="flow-polyline-round">Polyline Round</option>
        </el-select>
      </el-form-item>
      <el-form-item v-else-if="type === 'group'">
        <el-input v-model="formModel.label" @blur.prevent="handleSubmit" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { omit } from 'lodash'

export default {
  name: 'DetailForm',
  inject: ['root'],
  props: ['type'],
  data() {
    return {
      formModel: {}
    }
  },
  created() {
    const formModel = this.root.propsAPI.getSelected()[0].getModel()
    this.formModel = Object.assign({}, { shape: 'flow-smooth' }, formModel)
  },
  methods: {
    handleSubmit(e) {
      const { getSelected, executeCommand, update } = this.root.propsAPI
      const { formModel } = this
      setTimeout(() => {
        const item = getSelected()[0]
        if (!item) return
        executeCommand(() => {
          update(item, { ...omit(formModel, 'children') })
        })
      }, 0)
    }
  }
}
</script>
