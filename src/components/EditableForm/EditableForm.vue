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
            autosize
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

      <span class="icon-container" v-if="!disable" v-auto-animate>
        <el-icon v-if="isLoading" class="icon is-loading"><Loading /></el-icon>
        <template v-else>
          <el-icon v-if="!isEdit" class="icon" title="编辑" @click="edit"><Edit /></el-icon>
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
import { ref } from "vue"
import http from "@/server"
import { ElMessage } from "element-plus"
import { Edit, CircleCheck, CircleClose, Loading } from "@element-plus/icons-vue"
import type { EditableFormInstance, EditableFormProps, EditableFormEmits } from "./types.ts"

const props = withDefaults(defineProps<EditableFormProps>(), {
  type: "input",
  labelWidth: "100px",
  format: params => params,
})
const emit = defineEmits<EditableFormEmits>()

const EditableFormRef = ref<EditableFormInstance>()
const active = ref(props.initial)
const isEdit = ref(false)
const isLoading = ref(false)

function edit() {
  if (props.onEdit) return emit("edit")

  isEdit.value = true
  // @ts-ignore
  nextTick(EditableFormRef.value?.togglePopperVisible || EditableFormRef.value?.focus)
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
      padding-right: 11px;
    }

    .form-container {
      flex-grow: 1;

      .el-input,
      .el-input__wrapper,
      .el-textarea__inner,
      .el-select__wrapper,
      .el-cascader,
      [class^="el-input__count"],
      input {
        width: 100%;
        background-color: transparent;
        box-shadow: none;
      }
      .el-select__selected-item {
        user-select: auto;
      }
      .el-input__prefix,
      .el-range__icon,
      .el-range__close-icon,
      .is-disabled .el-select__suffix,
      .is-disabled .el-input__suffix {
        display: none;
      }
      .is-disabled,
      .is-disabled input,
      .el-select__caret,
      .el-input__icon {
        cursor: text;
      }
      .el-input__inner,
      .el-textarea__inner,
      .el-range-input,
      .el-select__placeholder {
        cursor: text;
        color: inherit;
        -webkit-text-fill-color: initial;
      }
    }

    .icon-container {
      flex-shrink: 0;
      padding-right: 5px;
      @include flex-center;

      .icon {
        cursor: pointer;
        color: $primary-color;
        transition: opacity $duration;
        margin-right: 3px;
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
