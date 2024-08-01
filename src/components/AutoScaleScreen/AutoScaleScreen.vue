<template>
  <div id="AutoScaleScreen" ref="AutoScaleScreenRef" :class="{ 'full-screen': $props.fullScreen }">
    <div :style="{ width: `${$props.width}px`, height: `${$props.height}px` }">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from "vue"
import { debounce } from "lodash-es"
import type { AutoScaleScreenProps } from "./types"

const props = withDefaults(defineProps<AutoScaleScreenProps>(), {
  width: 1920,
  height: 1080,
  wait: 100,
  transformOrigin: "left top",
  fullScreen: false,
})
const AutoScaleScreenRef = ref<HTMLDivElement>()

function handleScreenAuto() {
  const $el = AutoScaleScreenRef.value!
  const scaleWidth = $el.clientWidth / props.width
  const scaleHeight = $el.clientHeight / props.height
  const scale = Math.min(scaleWidth, scaleHeight)
  $el.style.transform = `scale(${scale})`
}

const resize = debounce(handleScreenAuto, props.wait)
onMounted(handleScreenAuto)
onMounted(() => addEventListener("resize", resize))
onUnmounted(() => removeEventListener("resize", resize))
</script>

<style lang="scss">
#AutoScaleScreen {
  transform-origin: v-bind("props.transformOrigin");
  transition: all $duration;

  &.full-screen {
    position: fixed;
    inset: 0;
  }
}
</style>
