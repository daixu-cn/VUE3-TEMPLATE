<template>
  <el-image
    v-bind="$props"
    @load="$emit('load', $event)"
    @error="$emit('error', $event)"
    @switch="$emit('switch', $event)"
    @close="$emit('close')"
    @show="$emit('show')"
  >
    <template #placeholder>
      <el-skeleton animated>
        <template #template>
          <div class="placeholder-template">
            <el-skeleton-item variant="rect" />
            <el-icon class="is-loading"><Loading /></el-icon>
          </div>
        </template>
      </el-skeleton>
    </template>
    <template #error>
      <el-skeleton>
        <template #template>
          <div class="error-template">
            <el-skeleton-item variant="rect" />
            <el-icon><Picture /></el-icon>
          </div>
        </template>
      </el-skeleton>
    </template>
    <template #[name] v-for="(slot, name) in $slots" :key="name">
      <component :is="slot" />
    </template>
  </el-image>
</template>

<script setup lang="ts">
import { ElImage, ElSkeleton, ElSkeletonItem, ElIcon, imageEmits } from "element-plus"
import type { ImageProps } from "element-plus"
import { Picture, Loading } from "@element-plus/icons-vue"

defineSlots<{ placeholder(): void; error(): void; viewer(): void }>()
defineEmits(imageEmits)
withDefaults(defineProps<Partial<ImageProps>>(), {
  fit: "cover",
  loading: "lazy",
  previewTeleported: true,
})
</script>

<style lang="scss">
.#{$ns}-image {
  width: 100%;
  height: 100%;
  color: $font-secondary-color;

  .#{$ns}-skeleton {
    width: 100%;
    height: 100%;

    .placeholder-template,
    .error-template {
      width: 100%;
      height: 100%;
      position: relative;
      @include flex-center;

      .#{$ns}-skeleton__item {
        width: 100%;
        height: 100%;
        position: absolute;
      }
    }
  }
}
</style>
