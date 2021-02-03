<template>
  <div>
    <form @submit.prevent="handleSubmit">
      <div v-if="type === 'node'">
        <input v-model="formModel.label" @blur.prevent="handleSubmit" />
      </div>
      <div v-else-if="type === 'edge'">
        <input v-model="formModel.label" @blur.prevent="handleSubmit" />
        <select v-model="formModel.shape" @change.prevent="handleSubmit">
          <option value="flow-smooth">Smooth</option>
          <option value="flow-polyline">Polyline</option>
          <option value="custom-polyline">Custom Polyline</option>
          <option value="flow-polyline-round">Polyline Round</option>
        </select>
      </div>
      <div v-else-if="type === 'group'">
        <input v-model="formModel.label" @blur.prevent="handleSubmit" />
      </div>
    </form>
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
          // this is for duplicate node in mind chart
          update(item, { ...omit(formModel, 'children') })
        })
      }, 0)
    }
  }
}
</script>
