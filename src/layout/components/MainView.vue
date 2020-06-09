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

<style lang="less">
@import "../../assets/less/scroll-bar";
.main-view {
  position: absolute;
  top: 120px;
  right: 0;
  left: 0;
  bottom: 0;
  padding: 15px 25px;
  overflow-y: auto;
  .scroll-bar
}
</style>
