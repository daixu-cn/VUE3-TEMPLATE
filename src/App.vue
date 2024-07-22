<template>
  <el-config-provider v-bind="ElementPlusConfig">
    <router-view v-slot="{ Component }">
      <transition name="page" mode="out-in">
        <keep-alive :include="getKeepAliveNames()">
          <component :is="Component" />
        </keep-alive>
      </transition>
    </router-view>
  </el-config-provider>
</template>

<script setup lang="ts">
import { getKeepAliveNames } from "@/router/hooks/routes"
import { ElementPlusConfig } from "@/plugins/element-plus"
</script>
