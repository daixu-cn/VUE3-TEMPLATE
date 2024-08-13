<template>
  <div id="System-Permission">
    <el-form class="filter-wrapper" ref="SearchRef" :model="search" inline>
      <el-form-item class="search-item" label="权限名称" prop="permissionName">
        <el-input v-model="search.permissionName" placeholder="请输入" />
      </el-form-item>
      <el-form-item class="search-item">
        <el-button type="primary" :icon="Search" :loading="table.loading" @click="getList(1)">
          查询
        </el-button>
        <el-button :icon="Refresh" :loading="table.loading" plain @click="resetSearch">
          重置
        </el-button>
      </el-form-item>

      <el-form-item class="search-item action-wrapper">
        <el-button type="primary" @click="show = true">创建权限</el-button>
      </el-form-item>
    </el-form>

    <div class="table-wrapper">
      <el-table :data="table.list" v-loading="table.loading">
        <el-table-column prop="permissionName" label="权限名称" align="center" />
        <el-table-column prop="updatedAt" label="更新时间" align="center" />
        <el-table-column label="操作" align="center">
          <template #default="scope">
            <el-button link type="warning" size="small" @click="handleEdit(scope.row)"
              >编辑</el-button
            >
            <el-button link type="danger" size="small" @click="handleDelete(scope.row.permissionId)"
              >删除</el-button
            >
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

    <ActionModal ref="ActionModalRef" v-model="show" @success="getList" />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue"
import { useRoute } from "vue-router"
import { assign } from "radash"
import { assignFields } from "@/tools"
import ActionModal from "./ActionModal.vue"
import { ElMessage, ElMessageBox } from "element-plus"
import { Search, Refresh } from "@element-plus/icons-vue"
import { getPermissionList, deletePermission } from "@/server/api/system/permission"
import type { FormInstance } from "element-plus"

const route = useRoute()
const SearchRef = ref<FormInstance>()
const show = ref(false)
const ActionModalRef = ref<InstanceType<typeof ActionModal>>()
const search = reactive({ permissionName: "" })
const table = reactive({
  loading: false,
  total: 0,
  page: 1,
  size: 10,
  list: [] as Model.Permission[],
})

function initSearch() {
  assignFields(search, assign(route.params, route.query))
  getList()
}
function resetSearch() {
  SearchRef.value?.resetFields()
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
  ActionModalRef.value?.initial(permission)
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

onMounted(initSearch)
</script>
