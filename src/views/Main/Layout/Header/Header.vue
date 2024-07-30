<template>
  <div id="Layout-Header">
    <Icon href="icon-logo" class="logo" />

    <ul>
      <li>
        <User />
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import {} from "vue"
import { Icon } from "vue-iconify"
import User from "./User.vue"
</script>

<style lang="scss">
#Layout-Header {
  height: var(--header-height);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 $space;
  border-bottom: 1px solid $border-color;

  .logo {
    font-size: calc(var(--header-height) - 5px);
    color: $primary-color;
  }
}
</style>
