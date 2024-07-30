<template>
  <div id="Layout-Header-User">
    <el-dropdown @command="handleCommand">
      <span class="username">
        {{ user.info?.userName }}
        <el-icon class="el-icon--right">
          <user-filled />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="info">用户信息</el-dropdown-item>
          <el-dropdown-item divided command="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router"
import { UserFilled } from "@element-plus/icons-vue"
import { user } from "@/store"

const router = useRouter()

const handleCommand = (command: string) => {
  if (command === "info") {
    console.log("用户信息")
  } else if (command === "logout") {
    user.reset()
    router.replace({ name: "Login" })
  }
}
</script>

<style lang="scss">
#Layout-Header-User {
  .username {
    display: inline-flex;
    outline: none;
  }
}
</style>
