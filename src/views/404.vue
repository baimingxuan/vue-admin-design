<template>
  <div class="error-container">
    <div class="error-content">
      <el-row :gutter="15">
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <div class="pic-error">
            <img class="pic-error-parent" src="../assets/img/error_images/404.png" alt="404">
            <img class="pic-error-child left" src="../assets/img/error_images/404_cloud.png" alt="404">
            <img class="pic-error-child mid" src="../assets/img/error_images/404_cloud.png" alt="404">
            <img class="pic-error-child right" src="../assets/img/error_images/404_cloud.png" alt="404">
          </div>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <div class="bullshit">
            <div class="bullshit__oops">抱歉!</div>
            <div class="bullshit__headline">当前页面不存在...</div>
            <div class="bullshit__info">请检查您输入的路由是否正确，或点击下面的按钮返回首页。</div>
            <a href="#/home" class="bullshit__return-home">{{ jumpTime }}s 返回首页</a>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Page404',
  data () {
    return {
      jumpTime: 5,
      timer: 0
    }
  },
  mounted () {
    this.timeChange()
  },
  beforeDestroy () {
    clearInterval(this.timer)
  },
  methods: {
    timeChange () {
      this.timer = setInterval(() => {
        if (this.jumpTime) {
          this.jumpTime--
        } else {
          this.$router.push('/')
          clearInterval(this.timer)
        }
      }, 1000)
    }
  }
}
</script>

<style lang="less">
@import "../assets/less/404";
</style>
