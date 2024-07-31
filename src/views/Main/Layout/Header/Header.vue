<template>
  <div id="Layout-Header">
    <Icon href="icon-logo" class="logo" />

    <div class="action-wrapper">
      <Theme />
      <User />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from "vue-iconify"
import Theme from "./Theme.vue"
import User from "./User.vue"
</script>

<style lang="scss">
#Layout-Header {
  height: var(#{$prefix}-header-height);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 $space;
  border-bottom: 1px solid $border-color;

  .logo {
    font-size: calc(var(#{$prefix}-header-height) - 5px);
    color: $primary-color;
  }

  .action-wrapper {
    display: flex;
    gap: $space;

    .el-icon,
    [class^="DX-Icon_"] {
      font-size: 20px;
    }

    .el-dropdown {
      outline: none;
      :focus-visible {
        outline: none;
      }

      .el-tooltip__trigger {
        display: inline-flex;
        align-items: center;
      }
    }
  }
}
</style>
