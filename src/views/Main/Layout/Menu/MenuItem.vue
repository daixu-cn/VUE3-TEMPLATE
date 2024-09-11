<template>
  <template v-for="menu of $props.menus" :key="menu.path">
    <el-menu-item v-if="!menu.children?.length" :index="menu.path" :level="$props.level">
      <component :is="menu.icon" class="icon" />
      <span>{{ menu.label }}</span>
    </el-menu-item>

    <el-sub-menu v-else :index="menu.path" :level="$props.level">
      <template #title>
        <component :is="menu.icon" class="icon" />
        <span>{{ menu.label }}</span>
      </template>

      <MenuItem :menus="menu.children" :level="$props.level + 1" />
    </el-sub-menu>
  </template>
</template>

<script setup lang="ts">
import MenuItem from "./MenuItem.vue"
import type { Permission } from "@/router/types/permission"

defineProps<{ menus: Permission[]; level: number }>()
</script>
