<template>
  <el-upload
    id="Upload"
    ref="UploadRef"
    :disabled="disabled"
    :show-file-list="false"
    :http-request="upload"
    :before-upload="beforeUpload"
    v-bind="$props.upload"
    v-model:file-list="files"
  >
    <div class="upload-container" v-auto-animate>
      <slot name="progress" :percentage="percentage" v-if="isProgress">
        <el-progress :percentage="percentage" class="default-progress" />
      </slot>

      <template v-else>
        <slot name="default" v-if="files.length === 0">
          <span class="select-container">选择文件</span>
        </slot>

        <ul v-else class="preview-container" v-auto-animate>
          <li v-for="file of files" :key="file.name" class="preview-li">
            <slot name="preview" :file="file">
              <span :title="file.name" class="preview-link" @click.stop="preview(file)">
                {{ file.name }}
              </span>
            </slot>

            <slot name="remove" :file="file">
              <el-icon @click.stop="remove(file)" class="delete-icon"><Delete /></el-icon>
            </slot>
          </li>
        </ul>
      </template>
    </div>
  </el-upload>
</template>

<script setup lang="ts">
import { ref, computed } from "vue"
import http from "@/server"
import { isString, isNumber } from "radash"
import { ElMessage } from "element-plus"
import { Delete } from "@element-plus/icons-vue"
import useVirtualProgress from "@/hooks/useVirtualProgress"
import type { UploadSlots, UploadProps, UploadEmits } from "./types"
import type {
  UploadStatus,
  UploadRawFile,
  UploadUserFile,
  UploadInstance,
  UploadRequestOptions,
} from "element-plus"

defineSlots<UploadSlots>()
const props = withDefaults(defineProps<UploadProps>(), {
  progress: true,
  format: (res: Model.Base) => res.data,
})
const emit = defineEmits<UploadEmits>()
const UploadRef = ref<UploadInstance>()
// 文件列表
const files = defineModel<UploadUserFile[]>({ default: [] })
// 文件上传进度
const percentage = ref(0)
// 是否显示滚动条
const isProgress = computed(() => props.progress && percentage.value > 0 && percentage.value < 100)
// 禁用上传
const disabled = computed(() => Boolean(isProgress.value || files.value?.length))
// 上传状态
let status: "loading" | "success" | "error" | "fail"

function setPercentage(value: number) {
  percentage.value = value
  if (props.onProgress) emit("progress", value)
}
function beforeUpload({ type, size }: UploadRawFile) {
  const types = props.validate?.types

  if (types && !types.includes(type)) {
    const mimes = types?.map(item => item.split("/").at(-1))
    const message = `仅支持 ${mimes.join("、")} 类型文件!`
    emit("error", message)
    ElMessage.error(message)

    return false
  } else if (props.validate?.size && size > props.validate.size) {
    const sizeToKB = Math.floor((props.validate.size / 1024) * 100) / 100
    const sizeToMB = Math.floor((props.validate.size / 1024 / 1024) * 100) / 100
    const message = `文件大小不能超过 ${sizeToMB < 1 ? sizeToKB.toFixed(2) : sizeToMB.toFixed(2)} ${sizeToMB < 1 ? "KB" : "MB"}!`
    emit("error", message)
    ElMessage.error(message)

    return false
  }

  return true
}
async function upload({ file }: UploadRequestOptions) {
  if (!props.http) throw new Error("HTTP parameters are not configured")

  const { methods = "post", url, attr = "file", params } = props.http
  const data = new FormData()
  data.append(attr, file)
  for (const key in params) {
    data.append(key, params[key])
  }

  try {
    setPercentage(0)
    emit("loading", true)

    status = "loading"
    const response = await http[methods](url, data, {
      onUploadProgress({ loaded, total }) {
        if (!total) return
        setPercentage(parseFloat(((loaded / total / 2) * 100).toFixed(2)))

        if (percentage.value === 50) {
          const { stop } = useVirtualProgress(percentage.value, value => {
            if (percentage.value === 100 || status === "error") return stop()

            setPercentage(value)
          })
        }
      },
    })

    const result = props.format<string | string[]>(response)
    const list = Array.isArray(result) ? result : [result]
    files.value = list.map(path => ({ name: path }))

    status = "success"
    setPercentage(100)
    emit("success", files.value)
    ElMessage.success("操作成功!")
  } catch (error) {
    status = "error"
    setPercentage(0)
    files.value.pop()
    emit("error", error)
  } finally {
    emit("loading", false)
  }
}
function remove(target: UploadUserFile | string | number) {
  if (isString(target)) files.value = files.value.filter(({ name }) => name !== target)
  else if (isNumber(target)) files.value = files.value.filter(({ uid }) => uid !== target)
  else if (target.raw) UploadRef.value?.handleRemove(target.raw)

  emit("remove", target)
}
function preview(file: UploadUserFile) {
  if (file.raw) return
  window.open(file.name, "_blank")
}
function setStatus(status: UploadStatus = "ready") {
  for (const file of files.value) {
    file.status = status
  }
}

defineExpose({ instance: UploadRef, upload, remove, setStatus })
</script>

<style lang="scss">
#Upload {
  width: 100%;
  .el-upload {
    width: 100%;
    display: flex;
    justify-content: initial;

    .upload-container {
      width: 100%;

      .select-container {
        color: $primary-color;
      }

      .default-progress {
        flex-grow: 1;
      }

      .preview-container {
        width: 100%;
        color: $font-regular-color;

        .preview-li {
          display: flex;
          align-items: center;
          .preview-link,
          .delete-icon {
            text-decoration: none;
            color: $font-regular-color;
            transition: color $duration;
            &:hover {
              color: $primary-color;
            }
          }
          .preview-link {
            @include text-ellipsis;
          }
          .delete-icon {
            margin-left: $space;
            color: $font-placeholder-color;
          }
        }
      }
    }
  }
}
</style>
