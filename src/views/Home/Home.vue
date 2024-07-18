<template>
  <div id="Home">Hello World</div>
</template>

<script setup lang="ts">
import {} from "vue"
</script>

<style lang="scss">
#Home {
  width: 100vw;
  height: 100vh;
  font-size: 5vw;
  font-weight: bold;
  color: $primary-color;

  @include flex-center;
}
</style>
