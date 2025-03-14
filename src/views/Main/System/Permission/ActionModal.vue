<template>
  <ActionModal
    id="System-Permission-ActionModal"
    v-model="show"
    title="权限管理"
    width="500rem"
    top="5vh"
    :loading="loading"
    :destroy-on-close="true"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    @opened="opened"
    @closed="reset"
    @confirm="confirm"
    @cancel="() => (show = false)"
  >
    <el-form ref="FormRef" :model="form" :rules="rules" label-width="auto" status-icon>
      <el-form-item label="权限名称" prop="permissionName">
        <el-input v-model="form.permissionName" placeholder="请输入权限名称" />
      </el-form-item>
      <el-form-item label="权限列表" class="permission-item">
        <el-tree-v2
          ref="TreeRef"
          node-key="path"
          :height="height"
          :props="{ value: 'path' }"
          :data="permissions"
          :default-checked-keys="form.permissions"
          show-checkbox
          check-strictly
          @check="() => handleInvertCheck()"
        >
          <template #default="{ node, data }">
            <span class="tree-node-container">
              <span>{{ node.label }}</span>

              <span
                class="check-all"
                :class="{ checked: data.hasFullSelection }"
                @click.stop="invertClick(data)"
                v-if="data.children?.length"
              >
                <el-tooltip :content="`反选-${node.label}`" placement="right">
                  <el-icon><Share /></el-icon>
                </el-tooltip>
              </span>
            </span>
          </template>
        </el-tree-v2>
      </el-form-item>
    </el-form>
  </ActionModal>
</template>

<script setup lang="ts">
import ActionModal from "@/components/ActionModal/ActionModal.vue"
import _permissions from "@/router/permissions"
import { ElMessage, ElTreeV2, type FormInstance as ElFormInstance } from "element-plus"
import { Share } from "@element-plus/icons-vue"
import { unique } from "radash"
import http from "@/server"
import { assignFields } from "@/tools"
import { updatePermission } from "@/server/api/system/permission"
import type { Permission } from "@/router/types/permission"
import type { Permissions } from "./types"

const emit = defineEmits<{ success: [] }>()
const permissions = ref<Permissions>(JSON.parse(JSON.stringify(_permissions)))
const FormInstance = useTemplateRef<ElFormInstance>("FormRef")
const TreeInstance = useTemplateRef("TreeRef")
const show = defineModel<boolean>()
const loading = ref(false)
const height = ref(0)
const form = reactive<Model.Permission.Params.Action>({
  permissionId: undefined,
  permissionName: "",
  permissions: [],
})
const rules = reactive({
  permissionName: [{ required: true, message: "请输入权限名称", trigger: "blur" }],
})

function opened() {
  const $modal = document.querySelector<HTMLDivElement>("#System-Permission-ActionModal")!
  const marginTop = parseFloat(getComputedStyle($modal).marginTop)
  $modal.style.setProperty("margin-bottom", `${marginTop}px`)
  $modal.style.setProperty("height", `${$modal.parentElement!.clientHeight - marginTop * 2}px`)
  height.value = document.querySelector<HTMLDivElement>(".permission-item")!.clientHeight

  nextTick(() => handleInvertCheck())
}
/** 当选中或取消选中时，更新所有权限的 hasFullSelection 属性 */
function handleInvertCheck(data = permissions.value) {
  for (const permission of data) {
    if (isFullyChecked(permission)) {
      permission.hasFullSelection = true
    } else {
      permission.hasFullSelection = false
    }

    if (permission.children) handleInvertCheck(permission.children)
  }
}
/** 获取指定权限当前及所有后代 path */
function getPermissionPaths(permissions: Permission[]) {
  const result: string[] = []

  for (const permission of permissions) {
    result.push(permission.path)

    if (permission.children?.length) {
      result.push(...getPermissionPaths(permission.children))
    }
  }

  return result
}
/** 判断当前权限及后代是否全部选中 */
function isFullyChecked(permission: Permission) {
  const permissions = getPermissionPaths([permission])
  const checkedPaths = TreeInstance.value!.getCheckedKeys()
  return permissions.every(key => checkedPaths.includes(key))
}
/** 反选当前权限及后代 */
function invertClick(data: Permission) {
  const permissions = getPermissionPaths([data])
  const checkedPaths = TreeInstance.value!.getCheckedKeys()
  const paths = unique([...checkedPaths, ...permissions])

  if (isFullyChecked(data)) {
    TreeInstance.value?.setCheckedKeys(
      checkedPaths.filter(key => !permissions.includes(key as string)),
    )
  } else {
    TreeInstance.value?.setCheckedKeys(paths)
  }
  handleInvertCheck()
}
async function confirm() {
  try {
    await FormInstance.value?.validate()
    form.permissions = TreeInstance.value!.getCheckedKeys() as string[]
    loading.value = true

    await http.post("/action.json", form)
    await updatePermission(form)
    emit("success")
    ElMessage.success("操作成功")
    show.value = false
  } finally {
    loading.value = false
  }
}
function reset() {
  show.value = false
  FormInstance.value?.resetFields()
  Object.keys(form).forEach(key => (form[key] = undefined))
}

defineExpose({
  initial: (params: object) => assignFields(form, params),
})
</script>

<style lang="scss">
#System-Permission-ActionModal {
  display: flex;
  flex-direction: column;

  .#{$ns}-dialog__body {
    height: 100%;

    .#{$ns}-form {
      height: 100%;
      display: flex;
      flex-direction: column;

      .permission-item {
        height: 100%;
      }
    }
  }

  .#{$ns}-tree {
    width: 100%;
    .tree-node-container {
      width: 100%;
      display: flex;
      justify-content: space-between;
      user-select: none;
      padding-right: $space;

      .check-all {
        transition: color $duration;
        font-size: 12rem;
        cursor: pointer;

        &:hover {
          color: $primary-color;
        }

        &.checked {
          color: $primary-color;
          &:hover {
            color: $error-color;
          }
        }
      }
    }
  }
}
</style>
