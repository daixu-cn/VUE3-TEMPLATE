<template>
  <el-dialog class="ActionModal" v-bind="$props" v-model="show">
    <template #default>
      <div style="text-align: center">Action Modal</div>
    </template>

    <template #footer>
      <el-button @click="$emit('cancel')">取消</el-button>
      <el-button type="primary" :loading="$props.loading" @click="$emit('confirm')">确认</el-button>
    </template>

    <template #[name] v-for="(slot, name) in $slots" :key="name">
      <component :is="slot" />
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import type { ActionModalProps, ActionModalEmits } from "./types"

defineSlots<{ default(): void; header(): void; footer(): void }>()
defineEmits<ActionModalEmits>()
withDefaults(defineProps<ActionModalProps>(), {
  width: "450px",
  title: "操作弹窗",
  center: true,
  modal: true,
  showClose: true,
  appendToBody: true,
  lockScroll: true,
  closeOnClickModal: true,
  closeOnPressEscape: true,
})

const show = defineModel<boolean>()
</script>

<style lang="scss">
.ActionModal {
  padding: 0;
  border-radius: $border-radius;

  .el-dialog__header {
    padding: $space;
    border-bottom: 1px solid $border-color;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: calc($font-size + 1px);
    font-weight: bold;

    .el-dialog__headerbtn {
      position: static;
      width: initial;
      height: initial;
      @include flex-center;
    }
  }

  .el-dialog__body {
    padding: $space;
  }

  .el-dialog__footer {
    padding: 0 $space $space $space;
    display: flex;
    .el-button {
      flex: 1;
    }
  }
}
</style>
