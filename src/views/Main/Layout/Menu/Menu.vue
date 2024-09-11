<template>
  <div id="Layout-Menu">
    <el-scrollbar height="100%">
      <el-menu :default-active="active" router>
        <MenuItem :menus="menus" :level="0" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { useRoute } from "vue-router"
import { getMenuPermissions } from "@/tools/permission"
import permissions from "@/router/permissions"
import MenuItem from "./MenuItem.vue"

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
      .icon {
        width: initial;
        margin-right: $space;
        font-size: calc($font-size + 4rem);
      }
    }
  }
}
</style>
