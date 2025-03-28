<template>
  <div id="EditableForm">
    <label class="label" :title="$props.label">
      <span>{{ $props.label }}</span>
      <span v-if="$props.colon">:</span>
    </label>
    <div class="form-wrapper" :style="{ backgroundColor: props.background }">
      <template v-if="$slots.default">
        <div class="custom-container">
          <slot />
        </div>
      </template>

      <template v-else>
        <div class="form-container">
          <el-input
            v-if="$props.type === 'input'"
            ref="EditableFormRef"
            :autosize="{ minRows: 1 }"
            v-bind="$props.input"
            v-model="active"
            :disabled="isLoading || !isEdit"
          />
          <el-autocomplete
            v-if="$props.type === 'autocomplete'"
            ref="EditableFormRef"
            v-bind="$props.autocomplete"
            v-model="active"
            :disabled="isLoading || !isEdit"
          />
          <el-select-v2
            v-if="$props.type === 'select'"
            ref="EditableFormRef"
            placeholder=""
            automatic-dropdown
            v-bind="$props.select"
            :options="$props.select!.options"
            v-model="active"
            :disabled="isLoading || !isEdit"
          />
          <el-time-picker
            v-if="$props.type === 'time'"
            ref="EditableFormRef"
            :clearable="false"
            v-bind="$props.time"
            v-model="active"
            :disabled="isLoading || !isEdit"
          />
          <el-date-picker
            v-if="$props.type === 'date'"
            ref="EditableFormRef"
            :clearable="false"
            v-bind="$props.date"
            v-model="active"
            :disabled="isLoading || !isEdit"
          />
          <el-cascader
            v-if="$props.type === 'cascade'"
            ref="EditableFormRef"
            :props="{ checkStrictly: true }"
            placeholder=" "
            v-bind="$props.cascade"
            v-model="active"
            :disabled="isLoading || !isEdit"
          />
        </div>
      </template>

      <span class="icon-container" v-if="!$props.disabled" v-auto-animate>
        <el-icon v-if="isLoading" class="icon is-loading"><Loading /></el-icon>
        <template v-else>
          <template v-if="!isEdit">
            <el-icon class="icon" title="编辑" @click.stop="edit"><Edit /></el-icon>
            <slot name="suffix" />
          </template>
          <template v-else>
            <el-icon class="icon" title="保存" @click="save"><CircleCheck /></el-icon>
            <el-icon class="icon" title="取消" @click="cancel"><CircleClose /></el-icon>
          </template>
        </template>
      </span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, useTemplateRef } from "vue"
import http from "@/server"
import { ElMessage } from "element-plus"
import { Edit, CircleCheck, CircleClose, Loading } from "@element-plus/icons-vue"
import type { EditableFormInstance, EditableFormProps, EditableFormEmits } from "./types.ts"

const props = withDefaults(defineProps<EditableFormProps>(), {
  type: "input",
  labelWidth: "100rem",
  format: params => params,
})
const emit = defineEmits<EditableFormEmits>()

const instance = useTemplateRef<EditableFormInstance>("EditableFormRef")
const active = ref(props.initial)
const isEdit = ref(false)
const isLoading = ref(false)

function edit() {
  if (props.onEdit) return emit("edit")

  isEdit.value = true
  // @ts-ignore
  nextTick(instance.value?.togglePopperVisible || instance.value?.focus)
}
async function save() {
  if (!props.http) throw new Error("HTTP parameters are not configured")

  try {
    isLoading.value = true

    const { methods = "post", url, attr, params } = props.http
    const response = await http[methods](url, {
      ...(attr && { [attr]: props.format(active.value) }),
      ...params,
    })
    emit("success", response)
    ElMessage.success("操作成功!")
    isEdit.value = false
  } catch (err) {
    emit("error", err)
  } finally {
    isLoading.value = false
  }
}
function cancel() {
  isEdit.value = false
  active.value = props.initial
}

watch(
  () => props.initial,
  value => (active.value = value),
)
</script>

<style lang="scss">
#EditableForm {
  display: flex;
  align-items: center;

  .label {
    flex-shrink: 0;
    width: v-bind("props.labelWidth");
    margin-right: $space;
    color: $font-regular-color;
    text-align: right;
    cursor: text;
    @include text-ellipsis;
  }

  .form-wrapper {
    flex-grow: 1;
    background-color: $bg-color-component;
    caret-color: $primary-color;
    display: flex;
    align-items: center;
    color: $font-secondary-color;

    .custom-container {
      padding-right: 11rem;
    }

    .form-container {
      flex-grow: 1;

      .#{$ns}-input,
      .#{$ns}-input__wrapper,
      .#{$ns}-textarea__inner,
      .#{$ns}-select__wrapper,
      .#{$ns}-cascader,
      [class^="el-input__count"],
      input {
        width: 100%;
        background-color: transparent;
        box-shadow: none;
      }
      .#{$ns}-select__selected-item {
        user-select: auto;
      }
      .#{$ns}-input__prefix,
      .#{$ns}-range__icon,
      .#{$ns}-range__close-icon,
      .is-disabled .#{$ns}-select__suffix,
      .is-disabled .#{$ns}-input__suffix {
        display: none;
      }
      .is-disabled,
      .is-disabled input,
      .#{$ns}-select__caret,
      .#{$ns}-input__icon {
        cursor: text;
      }
      .#{$ns}-input__inner,
      .#{$ns}-textarea__inner,
      .#{$ns}-range-input,
      .#{$ns}-select__placeholder {
        cursor: text;
        color: inherit;
        -webkit-text-fill-color: initial;
      }

      .#{$ns}-textarea__inner {
        min-height: $component-size !important;
      }
    }

    .icon-container {
      flex-shrink: 0;
      padding-right: 5rem;
      @include flex-center;

      .icon {
        cursor: pointer;
        color: $primary-color;
        transition: opacity $duration;
        margin-right: 3rem;
        &:last-child {
          margin-right: 0;
        }

        &:hover {
          opacity: 0.6;
        }
      }
      .is-loading {
        cursor: not-allowed;
        &:hover {
          opacity: 1;
        }
      }
    }
  }
}
</style>
