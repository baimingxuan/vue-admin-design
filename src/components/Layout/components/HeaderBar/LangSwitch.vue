<template>
  <div class="lang-switch">
    <SvgIcon class="icon" icon-class="vue-sys-icon-yuyanqiehuan"></SvgIcon>
  </div>
</template>

<script>
import SvgIcon from '../../../../components/SvgIcon'
export default {
  name: 'LangSwitch',
  components: {
    SvgIcon
  }
}
</script>

<style lang="scss">
  .lang-switch {
    float: left;
    width: 26px;
    height: 26px;
    padding: 3px;
    cursor: pointer;
    margin-left: 10px;
    .icon {
      width: 26px;
      height: 26px;
      font-size: 100px;
      vertical-align: middle;
    }
  }
</style>
