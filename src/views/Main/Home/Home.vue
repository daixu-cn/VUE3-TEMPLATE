<template>
  <div id="Home" @click="handleClick">{{ $t("Hello") }}</div>
</template>

<script setup lang="ts">
import { t } from "@/tools/locale"

function handleClick() {
  console.log(t("Hello"))
}
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
