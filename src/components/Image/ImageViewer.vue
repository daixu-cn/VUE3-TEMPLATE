<template>
  <el-image-viewer
    v-if="$props.urlList?.length"
    ref="ImageViewerRef"
    v-bind="$props"
    @close="$emit('close')"
    @switch="$emit('switch', $event)"
    @rotate="$emit('rotate', $event)"
  />
</template>

<script setup lang="ts">
import { useTemplateRef } from "vue"
import { ElImageViewer, imageViewerEmits } from "element-plus"
import type { ImageViewerProps } from "element-plus"

const instance = useTemplateRef("ImageViewerRef")
defineEmits(imageViewerEmits)
withDefaults(defineProps<Partial<ImageViewerProps>>(), { teleported: true })
defineExpose({ instance })
</script>
