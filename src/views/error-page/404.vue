<template>
  <div class="error-wrapper">
    <div class="error-content">
      <el-row :gutter="15">
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <div class="pic-error">
            <img src="../../assets/img/error-images/404.png" alt="401">
          </div>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <div class="bullshit">
            <div class="bullshit-oops">抱歉!</div>
            <div class="bullshit-headline">当前页面不存在...</div>
            <div class="bullshit-info">请检查您输入的网址是否正确，或点击下面的按钮返回首页！</div>
            <a class="bullshit-return-home" href="#/home">返回首页</a>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Page404'
}
</script>

<style lang="less">
@import "../../assets/less/error-page";
</style>
