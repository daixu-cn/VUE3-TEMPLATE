<template>
  <div id="Example-Upload">
    <el-row>
      <el-col :span="4"> 默认样式(双向绑定): </el-col>
      <el-col :span="20">
        <Upload v-model="files" :http="http" />
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="4">自定义上传样式:</el-col>
      <el-col :span="20">
        <Upload :http="http">
          <template #default> <el-button type="primary" plain>自定义上传样式</el-button> </template>
        </Upload>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="4"> 默认删除样式: </el-col>
      <el-col :span="20">
        <Upload :http="http" @remove="remove" v-model="files2" />
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="4"> 自定义删除样式: </el-col>
      <el-col :span="20">
        <Upload :http="http" v-model="files2">
          <template #remove="{ file }">
            <span style="margin-left: 20px; color: red" @click="remove(file)">自定义删除</span>
          </template>
        </Upload>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="4"> 大小校验(不超过500KB): </el-col>
      <el-col :span="20">
        <Upload :http="http" :validate="{ size: 1024 * 500 }" />
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="4"> 类型校验(png、mp4): </el-col>
      <el-col :span="20">
        <Upload :http="http" :validate="{ types: ['image/png', 'video/mp4'] }" />
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import Upload from "@/components/Upload/Upload.vue"
import { ElMessage, type UploadUserFile } from "element-plus"
import { isString, isNumber } from "lodash-es"

const files = ref()
const files2 = ref([
  {
    name: "https://daixu.oss-cn-hongkong.aliyuncs.com/logo.png",
  },
])
const http = {
  url: "/upload/file",
}

function remove(target: UploadUserFile | string | number) {
  let message = ""
  if (isString(target) || isNumber(target)) message = `${target}`
  else message = target.name

  ElMessage.success(`删除文件: ${message}`)
}
</script>

<style lang="scss">
#Example-Upload {
  .el-row {
    margin-bottom: $space;
  }
}
</style>
