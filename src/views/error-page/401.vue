<template>
  <div class="error-wrapper">
    <div class="error-content">
      <el-row :gutter="15">
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <div class="pic-error">
            <img src="../../assets/img/error-images/401.png" alt="401">
          </div>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <div class="bullshit">
            <div class="bullshit-oops">抱歉!</div>
            <div class="bullshit-headline">您没有操作权限...</div>
            <div class="bullshit-info">当前帐号没有操作权限,请更换账号重新操作！</div>
            <a class="bullshit-return-home" href="#/home">返回首页</a>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Page401'
}
</script>

<style lang="less">
@import "../../assets/less/error-page";
</style>
