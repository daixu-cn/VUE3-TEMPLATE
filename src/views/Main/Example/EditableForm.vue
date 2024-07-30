<template>
  <div id="Example-EditableForm">
    <el-row>
      <el-col :span="8">
        <EditableForm label="用户ID" :initial="user.info?.userId" disabled />
      </el-col>
      <el-col :span="8">
        <EditableForm label="用户名" :initial="user.info?.userName" :http="http" />
      </el-col>
      <el-col :span="8">
        <EditableForm label="邮箱" :initial="user.info?.email" :http="http" />
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <EditableForm
          label="邮箱服务"
          type="select"
          :initial="user.info?.emailService"
          :select="{ options }"
          :http="http"
        />
      </el-col>
      <el-col :span="8">
        <EditableForm
          label="创建时间"
          type="date"
          :initial="user.info?.createdAt"
          :date="{ type: 'datetime' }"
          :http="http"
        />
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <EditableForm disabled label="头像" background="transparent">
          <el-image style="width: 100px; height: 100px" :src="user.info?.avatar" fit="cover" />
        </EditableForm>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import EditableForm from "@/components/EditableForm/EditableForm.vue"
import { user } from "@/store"

const options = [
  {
    label: "开启",
    value: true,
  },
  {
    label: "关闭",
    value: false,
  },
]
const http = {
  url: "/update/user",
  attr: "attribute",
}
</script>

<style lang="scss">
#Example-EditableForm {
  .el-row {
    margin-bottom: $space;
  }
}
</style>
