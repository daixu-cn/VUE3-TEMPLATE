<template>
  <div id="Layout">
    <Menu />
    <div class="Layout-main">
      <Header />
      <el-scrollbar height="100%" class="Layout-content" view-class="view-container">
        <View />
      </el-scrollbar>
    </div>
  </div>
</template>

<script setup lang="ts">
import Header from "@/views/Main/Layout/Header/Header.vue"
import Menu from "@/views/Main/Layout/Menu/Menu.vue"
import View from "@/components/View/View.vue"
</script>

<style lang="scss">
#Layout {
  --header-height: 40px;
  --menu-width: 200px;

  display: flex;
  height: 100vh;
  .Layout-main {
    flex: 1;
    height: 100%;

    .Layout-content {
      height: calc(100% - var(--header-height));
      padding: $space;

      .view-container {
        height: 100%;
      }
    }
  }
}
</style>
