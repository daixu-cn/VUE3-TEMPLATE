<template>
  <el-config-provider v-bind="ElementPlusConfig">
    <View />
  </el-config-provider>
</template>

<script setup lang="ts">
import { ElementPlusConfig } from "@/plugins/element-plus"
import View from "@/components/View/View.vue"
</script>
