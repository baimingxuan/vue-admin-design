<template>
  <!-- eslint-disable vue/require-component-is -->
  <component v-bind="renderTag(to)">
    <slot />
  </component>
</template>

<script>
import { isExternal } from '../../../utils/validate'
export default {
  props: {
    to: {
      type: String,
      required: true
    }
  },
  methods: {
    renderTag(url) {
      if (isExternal(url)) {
        return {
          is: 'a',
          href: url,
          target: '_blank',
          rel: 'noopener'
        }
      }
      return {
        is: 'router-link',
        to: url
      }
    }
  }
}
</script>
