<template>
  <div id="Layout-Header-Language">
    <el-dropdown @command="handleCommand">
      <Icon href="icon-earth" />

      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item
            v-for="item of locales"
            :key="item.language"
            :command="item.language"
            :disabled="locale.language === item.language"
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
import useStore from "@/store"
import locales from "@/locale"
import type { Language } from "@/locale/types"

const { locale } = useStore()
const handleCommand = (language: Language) => locale.setLanguage(language)
</script>
