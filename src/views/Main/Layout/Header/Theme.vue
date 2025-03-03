<template>
  <div id="Layout-Header-Theme">
    <el-dropdown @command="handleCommand">
      <Icon href="icon-bg-colors" />

      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item
            v-for="item of menus"
            :key="item.command"
            :command="item.command"
            :icon="item.icon"
            :disabled="theme.mode === item.command"
          >
            {{ item.label }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang="ts">
import { Icon } from "vue-iconify"
import { Sunny, Moon, Setting } from "@element-plus/icons-vue"
import useStore from "@/store"
import { Mode } from "@/store/theme/types"

const { theme } = useStore()
const menus = [
  {
    label: "亮色模式",
    command: Mode.LIGHT,
    icon: Sunny,
  },
  {
    label: "暗黑模式",
    command: Mode.DARK,
    icon: Moon,
  },
  {
    label: "跟随系统",
    command: Mode.SYSTEM,
    icon: Setting,
  },
]
theme.init()
const handleCommand = (mode: Mode) => theme.setMode(mode)
</script>
