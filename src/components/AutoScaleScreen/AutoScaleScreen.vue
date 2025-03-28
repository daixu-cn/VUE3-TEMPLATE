<template>
  <div id="AutoScaleScreen" ref="AutoScaleScreenRef" :class="{ 'full-screen': $props.fullScreen }">
    <div :style="{ width: `${$props.width}px`, height: `${$props.height}px` }">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTemplateRef, onMounted, onUnmounted } from "vue"
import { debounce } from "radash"
import type { AutoScaleScreenProps } from "./types"

const props = withDefaults(defineProps<AutoScaleScreenProps>(), {
  width: 1920,
  height: 1080,
  delay: 100,
  transformOrigin: "left top",
  fullScreen: false,
})
const instance = useTemplateRef("AutoScaleScreenRef")

function handleScreenAuto() {
  nextTick(() => {
    const $el = instance.value!
    const scaleWidth = $el.clientWidth / props.width
    const scaleHeight = $el.clientHeight / props.height
    const scale = Math.min(scaleWidth, scaleHeight)
    $el.style.transform = `scale(${scale})`
  })
}

const resize = debounce({ delay: props.delay }, handleScreenAuto)
watch(() => props, handleScreenAuto, { deep: true })
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
