<template>
  <div class="role-container">
    <!-- 1. 查询栏 -->
    <el-form class="query-form" :model="queryForm" :inline="true" ref="formRef">
      <el-form-item label="角色名称" prop="roleName">
        <el-input
          v-model="queryForm.roleName"
          placeholder="请输入角色名称"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleQuery">查询</el-button>
        <el-button @click="handleReset">重置</el-button>
      </el-form-item>
    </el-form>
    <!-- 2. 角色列表 -->
    <div class="base-table">
      <!-- 2.1 操作栏 -->
      <div class="action">
        <el-button type="primary" @click="handleAdd()">创建</el-button>
      </div>
      <!-- 2.2 角色列表 -->
      <el-table :data="roleList">
        <el-table-column type="selection" width="30"></el-table-column>
        <el-table-column
          v-for="item in columns"
          :key="item.prop"
          :label="item.label"
          :prop="item.prop"
          :formatter="item.formatter"
        >
        </el-table-column>
        <el-table-column width="280" align="center" label="操作">
          <template #default="scope">
            <el-button @click="handleEdit(scope.row)">编辑</el-button>
            <el-button type="primary" @click="handlePermisson(scope.row)"
              >设置权限</el-button
            >
            <el-button type="danger" @click="handleDelete(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        layout="prev, pager, next, jumper"
        :total="pager.total"
        class="pagination"
        @current-change="handleCurrentChange"
      />
    </div>
    <!-- 3. 新增角色弹窗 -->
    <el-dialog v-model="dialogVisible" title="创建角色">
      <el-form
        :model="roleForm"
        ref="dialogForm"
        label-width="100"
        :rules="rules"
      >
        <el-form-item label="角色名称" prop="roleName">
          <el-input
            v-model="roleForm.roleName"
            placeholder="请输入角色名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input
            v-model="roleForm.remark"
            placeholder="请输入备注"
            type="textarea"
            :rows="3"
          ></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleCancle">取消</el-button>
          <el-button type="primary" @click="handleSubmit"> 确认 </el-button>
        </span>
      </template>
    </el-dialog>
    <!-- 4. 权限控制弹窗 -->
    <el-dialog v-model="permissionVisible" title="权限控制" width="500">
      <el-form label-width="100">
        <el-form-item label="角色名称：">
          {{ currentRoleName }}
        </el-form-item>
        <el-form-item label="选择权限：">
          <el-tree
            :data="menuList"
            ref="treeRef"
            show-checkbox
            default-expand-all
            node-key="_id"
            :props="{ label: 'menuName' }"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="permissionVisible = false">取消</el-button>
          <el-button type="primary" @click="handlePermissonSubmit">
            确认
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted, nextTick, onUpdated } from "vue"
import api from "../api"
import formatDate from "../utils/formatDate"
import { ElMessage } from "element-plus"

const queryForm = reactive({ roleName: "" })
const formRef = ref(null)
const roleList = ref([])
const columns = [
  { label: "角色名称", prop: "roleName" },
  { label: "备注", prop: "remark" },
  {
    label: "权限列表",
    prop: "permissionList",
    formatter: (row, column, value) => {
      let names = []
      let list = value.halfCheckedKeys || []
      list.map((key) => {
        let name = actionMap[key]
        if (key && name) names.push(name)
      })
      return names.join(" ")
    },
  },
  {
    label: "创建时间",
    prop: "createTime",
    formatter: (row, column, cellValue) =>
      formatDate(new Date(cellValue), "yyyy-MM-dd"),
  },
]
const dialogVisible = ref(false)
const roleForm = reactive({ roleName: "", remark: "" })
const dialogForm = ref(null)
const pager = reactive({
  pageNum: 1,
  pageSize: 10,
  total: 15,
})
const rules = reactive({
  roleName: [{ required: true, message: "请输入用户名称", trigger: "blur" }],
})
let action = ""
let _id
const permissionVisible = ref(false)
let currentRoleName = ref()
let menuList = []
const treeRef = ref(null)
let currentId = ""

const handleQuery = () => {
  getRoleList({ ...pager, ...queryForm })
}
const handleReset = () => {
  resetForm(formRef)
  getRoleList()
}

const resetForm = (form) => {
  form.value.resetFields()
}

onMounted(() => {
  getRoleList()
  getMenuList()
})

const getRoleList = async (params) => {
  try {
    const { page, list } = await api.getRoleList(params)
    roleList.value = list
    pager.total = page.total
  } catch (err) {
    throw new Error(err)
  }
}

const getMenuList = async () => {
  try {
    menuList = await api.getMenuList()
    getActionMap(menuList)
  } catch (err) {
    throw new Error(err)
  }
}

const handleAdd = () => {
  dialogVisible.value = true
  action = "create"
}
const handleEdit = (row) => {
  dialogVisible.value = true
  action = "edit"
  _id = row._id
  nextTick(() => {
    Object.assign(roleForm, row)
  })
}
const handleDelete = (row) => {
  action = "delete"
  _id = row._id
  api
    .submitRole({ _id, action })
    .then((res) => ElMessage.success("删除成功"))
    .catch((err) => {
      ElMessage.error("删除失败")
      throw new Error(err)
    })
}
// 分页
const handleCurrentChange = (current) => {
  getRoleList({ pageNum: current })
}

// 角色创建、编辑、删除
const handleSubmit = () => {
  dialogForm.value.validate((isValid) => {
    if (isValid) {
      api
        .submitRole({ _id, action, ...roleForm })
        .then(() => {
          dialogVisible.value = false
          getRoleList()
          resetForm(dialogForm)
          ElMessage.success("操作成功")
        })
        .catch((err) => {
          ElMessage.error("操作失败")
          throw new Error(err)
        })
    }
  })
}
const handleCancle = () => {
  resetForm(dialogForm)
  dialogVisible.value = false
}

const handlePermisson = (row) => {
  permissionVisible.value = true
  currentRoleName.value = row.roleName
  currentId = row._id
  setTimeout(() => {
    treeRef.value.setCheckedKeys(row.permissionList.checkedKeys)
  })
}

const handlePermissonSubmit = () => {
  let nodes = treeRef.value.getCheckedNodes()
  let halfKeys = treeRef.value.getHalfCheckedKeys()
  let checkedKeys = []
  let parentKeys = []
  nodes.map((node) => {
    if (!node.children) {
      checkedKeys.push(node._id)
    } else {
      parentKeys.push(node._id)
    }
  })
  let data = {
    _id: currentId,
    permissionList: {
      checkedKeys,
      halfCheckedKeys: [...halfKeys, ...parentKeys],
    },
  }
  api
    .updateRolePermission(data)
    .then((res) => {
      getMenuList()
      ElMessage.success("权限设置成功")
    })
    .catch((err) => {
      ElMessage.error("权限设置失败：" + err)
    })
  permissionVisible.value = false
}
// 菜单映射表
let actionMap = reactive({})
// 获得key值与menuName的映射
const getActionMap = (menuList) => {
  const deep = (menuList) => {
    menuList.map((item) => {
      // 不显示顶级菜单，只有二级菜单才有action
      if (item.action) {
        actionMap[item._id] = item.menuName
      }
      if (item.children) {
        deep(item.children)
      }
    })
  }
  deep(menuList)
}
</script>

<style scoped></style>
