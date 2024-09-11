<template>
  <div id="System-Permission">
    <el-form class="default-search-wrapper" ref="SearchRef" :model="search" inline @submit.prevent>
      <el-form-item class="search-item" label="权限名称" prop="permissionName">
        <el-input v-model="search.permissionName" placeholder="请输入" @keyup.enter="getList(1)" />
      </el-form-item>
      <el-form-item class="search-item">
        <el-button type="primary" :icon="Search" :loading="table.loading" @click="getList(1)">
          查询
        </el-button>
        <el-button :icon="Refresh" :loading="table.loading" plain @click="reset"> 重置 </el-button>
      </el-form-item>

      <el-form-item class="search-item action-wrapper">
        <el-button type="primary" @click="show = true">创建权限</el-button>
      </el-form-item>
    </el-form>

    <div class="default-table-wrapper">
      <el-table :data="table.list" v-loading="table.loading">
        <el-table-column prop="permissionName" label="权限名称" align="center" />
        <el-table-column prop="updatedAt" label="更新时间" align="center" />
        <el-table-column label="操作" align="center" class-name="actions">
          <template #default="scope">
            <el-tooltip content="编辑" placement="top" :hide-after="0">
              <el-button :icon="Edit" circle @click="handleEdit(scope.row)" />
            </el-tooltip>
            <el-tooltip content="删除" placement="top" :hide-after="0">
              <el-button :icon="Delete" circle @click="handleDelete(scope.row.permissionId)" />
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        layout="total, prev, pager, next"
        v-model:current-page="table.page"
        :page-size="table.size"
        :total="table.total"
        @current-change="getList"
      />
    </div>

    <ActionModal ref="ModalRef" v-model="show" @success="getList" />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, useTemplateRef } from "vue"
import { useRoute } from "vue-router"
import { assign } from "radash"
import { assignFields } from "@/tools"
import ActionModal from "./ActionModal.vue"
import { ElMessage, ElMessageBox } from "element-plus"
import { Search, Refresh, Edit, Delete } from "@element-plus/icons-vue"
import { getPermissionList, deletePermission } from "@/server/api/system/permission"

const SearchInstance = useTemplateRef("SearchRef")
const ModalInstance = useTemplateRef("ModalRef")
const route = useRoute()
const show = ref(false)
const search = reactive({ permissionName: "" })
const table = reactive({
  loading: false,
  total: 0,
  page: 1,
  size: 10,
  list: [] as Model.Permission[],
})

function reset() {
  SearchInstance.value?.resetFields()
  assignFields(search, assign(route.params, route.query))
  getList(1)
}
async function getList(page = table.page) {
  table.loading = true
  try {
    const res = await getPermissionList({ ...search, page, size: table.size })
    table.list = res.data.list
    table.total = res.data.total
  } catch (error) {
    console.log(error)
  } finally {
    table.loading = false
  }
}
function handleEdit(permission: Model.Permission) {
  ModalInstance.value?.initial(permission)
  show.value = true
}
function handleDelete(permissionId: string) {
  ElMessageBox.confirm("此操作将永久删除该记录,是否继续?", "Tips", {
    type: "warning",
    beforeClose: async (action, instance, done) => {
      if (action !== "confirm") return done()
      try {
        instance.confirmButtonLoading = true
        await deletePermission(permissionId)
        ElMessage.success("操作成功")
        getList(table.page > 1 && table.list.length === 1 ? --table.page : table.page)
      } finally {
        done()
      }
    },
  })
}

reset()
</script>
