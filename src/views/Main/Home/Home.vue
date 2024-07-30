<template>
  <div id="Home">Hello World</div>
</template>

<script setup lang="ts">
import {} from "vue"
</script>

<style lang="scss">
#Home {
  width: 100%;
  height: 100%;
  font-size: 5vw;
  font-weight: bold;
  color: $primary-color;

  @include flex-center;
}
</style>
