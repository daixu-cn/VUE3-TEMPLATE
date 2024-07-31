<template>
  <div id="Layout-Menu">
    <el-scrollbar height="100%">
      <el-menu :default-active="active" router>
        <template v-for="menu of menus" :key="menu.path">
          <el-sub-menu v-if="menu.children?.length" :index="menu.path">
            <template #title>
              <component :is="menu.icon" />
              <span>{{ menu.label }}</span>
            </template>
            <el-menu-item v-for="child of menu.children" :key="child.path" :index="child.path">
              <component :is="child.icon" />
              <span>{{ child.label }}</span>
            </el-menu-item>
          </el-sub-menu>

          <el-menu-item v-else :index="menu.path">
            <component :is="menu.icon" />
            <span>{{ menu.label }}</span>
          </el-menu-item>
        </template>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { useRoute } from "vue-router"
import { getMenuPermissions } from "@/tools/permission"
import permissions from "@/router/permissions"

const menus = getMenuPermissions(permissions)
const route = useRoute()
const active = ref(route.path)
</script>

<style lang="scss">
#Layout-Menu {
  width: var(#{$prefix}-menu-width);
  height: 100%;
  border-right: 1px solid $border-color;

  .el-menu {
    height: 100%;
    border: none;
    background-color: transparent;

    .el-menu-item,
    .el-sub-menu {
      [class^="DX-Icon_"] {
        margin-right: $space;
      }
    }
  }
}
</style>
