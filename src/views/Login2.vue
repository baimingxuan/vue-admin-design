<template>
  <div class="login-wrapper" :style="'background-image:url('+ Background +')'">
    <div class="form-box clear-fix">
      <div class="form-box-left" />
      <div class="form-box-right">
        <div class="form-title">
          <p>vue admin design管理系统</p>
        </div>
        <el-form ref="loginForm" label-width="0px" class="login-form">
          <el-form-item prop="username">
            <el-input type="text" auto-complete="off" placeholder="请输入用户名" prefix-icon="el-icon-user" />
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password" auto-complete="off" placeholder="请输入密码" prefix-icon="el-icon-lock" />
          </el-form-item>
          <el-form-item prop="code">
            <div class="clear-fix">
              <el-input class="input-code" type="text" auto-complete="off" placeholder="验证码" prefix-icon="el-icon-lock" />
              <div class="login-code">
                <img src="">
              </div>
            </div>
          </el-form-item>
          <el-form-item>
            <el-button size="small" type="primary" style="width:100%;">
              <span v-if="!loading">立即登录</span>
              <span v-else>登 录 中...</span>
            </el-button>
            <el-checkbox>记住密码</el-checkbox>
          </el-form-item>
        </el-form>
        <p class="login-tip">推荐使用最新的谷歌或火狐浏览器（IE升级到IE9以上）</p>
      </div>
    </div>
  </div>
</template>

<script>
import Background from '../assets/img/login-background2.png'

export default {
  name: 'Login2',
  data() {
    return {
      Background
    }
  }
}
</script>

<style lang="less">
.login-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-size: cover;
  .form-box {
    width: 780px;
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 4px 20px 0 rgba(5, 22, 47, 0.07);
    .form-box-left {
      float: left;
      width: 340px;
      height: 500px;
      background: url("../assets/img/login-bg-left.png") center no-repeat;
      background-size: cover;
    }
    .form-box-right {
      float: left;
      width: 440px;
      padding: 16px 70px;
      box-sizing: border-box;
      .form-title {
        height: 40px;
        margin-top: 64px;
        margin-bottom: 32px;
        line-height: 40px;
        text-align: center;
        color: #29304E;
        font-size: 28px;
        font-family: MicrosoftYaHei;
        text-shadow: 0 4px 20px rgba(5, 22, 47, 0.07);
      }
      .login-tip {
        margin-top: 50px;
        font-size: 12px;
        font-family: MicrosoftYaHei;
        color: #999;
        text-align: center;
        line-height: 20px;
      }
      .input-code {
        float: left;
        width: 174px;
      }
      .login-code {
        float: left;
        width: 111px;
        margin-left: 15px;
      }
      .el-input__inner {
        height: 40px;
        line-height: 40px;
        border-radius: 2px;
        border: 1px solid #DCDFE6;
      }
      .el-button--small {
        height: 40px;
        border-radius: 2px;
        background: #2962FF;
      }
      .el-form-item--small.el-form-item {
        margin-bottom: 24px;
      }
    }
  }
}
</style>
