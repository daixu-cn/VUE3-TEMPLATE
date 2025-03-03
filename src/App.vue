<template>
  <el-config-provider v-bind="ElementPlusConfig">
    <View />
  </el-config-provider>
</template>

<script setup lang="ts">
import { ElementPlusConfig } from "@/plugins/element-plus"
import View from "@/components/View/View.vue"
import useStore from "@/store"

const { locale } = useStore()
locale.setLanguage(locale.language)
</script>

<style lang="scss">
@use "@/assets/styles/scss/base/_class.scss" as *;
</style>
