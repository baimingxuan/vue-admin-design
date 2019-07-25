<template>
  <div class="main-view">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'MainView'
}
</script>

<style lang="scss">
  .main-view{
    position: absolute;
    top: 120px;
    right: 0;
    bottom: 0;
    width: 100%;
  }
</style>
