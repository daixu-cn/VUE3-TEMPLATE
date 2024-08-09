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
  #{$prefix}-header-height: 50px;
  #{$prefix}-menu-width: 200px;

  display: flex;
  height: 100vh;
  .Layout-main {
    width: calc(100% - var(#{$prefix}-menu-width));
    height: 100%;

    .Layout-content {
      height: calc(100% - var(#{$prefix}-header-height));
      padding: $space;

      .view-container {
        height: 100%;

        .filter-wrapper {
          display: flex;
          flex-wrap: wrap;
          row-gap: $space;
          column-gap: calc($space * 2);
          margin-bottom: $space;

          .search-item {
            margin: 0;
          }

          .action-wrapper {
            margin-left: auto;
          }
        }

        .table-wrapper {
          width: 100%;
        }
      }
    }
  }
}
</style>
