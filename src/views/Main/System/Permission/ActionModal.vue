<template>
  <ActionModal
    id="System-Permission-ActionModal"
    v-model="show"
    title="权限管理"
    width="500px"
    :loading="loading"
    destroy-on-close
    @closed="reset"
    @confirm="confirm"
    @cancel="() => (show = false)"
  >
    <el-form ref="FormRef" :model="form" :rules="rules" label-width="auto" status-icon>
      <el-form-item label="权限名称" prop="permissionName">
        <el-input v-model="form.permissionName" placeholder="请输入权限名称" />
      </el-form-item>
      <el-form-item label="权限列表">
        <el-tree
          ref="TreeRef"
          node-key="path"
          :data="permissions"
          :default-checked-keys="form.permissions"
          show-checkbox
          check-strictly
        >
          <template #default="{ node, data }">
            <span class="tree-node-container">
              <span>{{ node.label }}</span>

              <span class="check-all" @click.stop="checkAll(data)" v-if="data.children?.length">
                <el-icon><Share /></el-icon>
              </span>
            </span>
          </template>
        </el-tree>
      </el-form-item>
    </el-form>
  </ActionModal>
</template>

<script setup lang="ts">
import { reactive } from "vue"
import ActionModal from "@/components/ActionModal/ActionModal.vue"
import permissions from "@/router/permissions"
import { ElMessage, ElTree } from "element-plus"
import { Share } from "@element-plus/icons-vue"
import { unique } from "radash"
import http from "@/server"
import { assignFields } from "@/tools"
import { updatePermission } from "@/server/api/system/permission"
import type { Permission } from "@/router/types/permission"
import type { FormInstance } from "element-plus"

const emit = defineEmits<{ success: [] }>()
const FormRef = ref<FormInstance>()
const TreeRef = ref<InstanceType<typeof ElTree>>()
const show = defineModel<boolean>()
const loading = ref(false)
const form = reactive<Model.Params.PermissionAction>({
  permissionId: undefined,
  permissionName: "",
  permissions: [],
})
const rules = reactive({
  permissionName: [{ required: true, message: "请输入权限名称", trigger: "blur" }],
})

function reset() {
  show.value = false
  FormRef.value?.resetFields()
  Object.keys(form).forEach(key => (form[key] = undefined))
}
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
function checkAll(data: Permission) {
  const permissions = getPermissionPaths([data])
  const checkedPaths = TreeRef.value!.getCheckedKeys()
  const paths = unique([...checkedPaths, ...permissions])
  const isAllChecked = permissions.every(key => checkedPaths.includes(key))

  if (isAllChecked) {
    TreeRef.value?.setCheckedKeys(checkedPaths.filter(key => !permissions.includes(key as string)))
  } else {
    TreeRef.value?.setCheckedKeys(paths)
  }
}
async function confirm() {
  try {
    await FormRef.value?.validate()
    form.permissions = TreeRef.value!.getCheckedKeys() as string[]
    loading.value = true

    await http.post("/action.json", form)
    await updatePermission(form)
    emit("success")
    ElMessage.success("操作成功")
    show.value = false
  } catch (error) {
    console.log(error)
  } finally {
    loading.value = false
  }
}

defineExpose({
  initial: (params: object) => assignFields(form, params),
})
</script>

<style lang="scss">
#System-Permission-ActionModal {
  .el-tree {
    width: 100%;
    .tree-node-container {
      width: 100%;
      display: flex;
      justify-content: space-between;
      user-select: none;
      padding-right: $space;

      .check-all {
        transition: color $duration;
        font-size: 12px;

        &:hover {
          color: $primary-color;
        }
      }
    }
  }
}
</style>
