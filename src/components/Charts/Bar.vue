<template>
  <div class="bar-wrapper">
    <Charts :options="options" :auto-resize="true"/>
  </div>
</template>

<script>
export default {
  name: 'Bar',
  data () {
    return {
      options: {}
    }
  }
}
</script>

<style lang="scss">

</style>
