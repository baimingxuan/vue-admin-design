<template>
  <div class="avatar-upload">
    <Hints>
      <template slot="hintName">图片上传组件</template>
      <template slot="hintInfo">
        <p>elementUI-upload：使用elementUI的upload组件，并具有多种列表展示方式</p>
        <p>地址：访问 <el-link type="success" href="https://element.eleme.cn/2.13/#/zh-CN/component/upload" target="_blank">elementUI-upload</el-link></p>
      </template>
    </Hints>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-card shadow="always" :body-style="{padding: '0px'}">
          <div slot="header" class="title">图片拖拽上传</div>
          <div class="content-box">
            <el-upload action="https://jsonplaceholder.typicode.com/posts/" drag multiple>
              <i class="el-icon-upload" />
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
              <div slot="tip" class="el-upload__tip">只能上传jpg、jpeg、gif、png、bmp文件，且不超过500kb</div>
            </el-upload>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="always" :body-style="{padding: '0px'}">
          <div slot="header" class="title">图片列表缩略图</div>
          <div class="content-box">
            <el-upload action="https://jsonplaceholder.typicode.com/posts/" :file-list="fileList" list-type="picture">
              <el-button size="small" type="primary" class="icon-small"><i class="el-icon-upload" />点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg、jpeg、gif、png、bmp文件，且不超过500kb</div>
            </el-upload>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="always" :body-style="{padding: '0px'}">
          <div slot="header" class="title">照片墙展示</div>
          <div class="content-box">
            <el-upload action="https://jsonplaceholder.typicode.com/posts/" list-type="picture-card" :on-preview="handlePreview">
              <i class="el-icon-plus" />
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl">
            </el-dialog>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Hints from '../../components/Hints'

export default {
  name: 'AvatarUpload',
  components: { Hints },
  data() {
    return {
      filesFormat: '.jpg, .jpeg, .gif, .png, .bmp',
      fileList: [
        { name: 'beautiful-girl.jpg', url: 'https://cdn.jsdelivr.net/gh/baimingxuan/media-store/images/img04.jpg' }
      ],
      dialogImageUrl: '',
      dialogVisible: false
    }
  },
  methods: {
    handlePreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    }
  }
}
</script>

<style lang="less">
.avatar-upload {
  .content-box {
    height: 320px;
    .el-upload {
      display: block;
    }
    .icon-small {
      padding: 8px 24px;
      .el-icon-upload {
        font-size: 14px;
        margin-right: 3px;
      }
    }
  }
}
</style>
