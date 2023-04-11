<template>
  <div class="user-container">
    <!-- 1. 查询栏 -->
    <div class="query-form">
      <el-form :inline="true" :model="user" ref="queryForm">
        <el-form-item label="ID" prop="userId">
          <el-input v-model="user.userId" placeholder="请输入用户ID" />
        </el-form-item>
        <el-form-item label="用户名" prop="userName">
          <el-input v-model="user.userName" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item label="状态" prop="state">
          <el-select v-model="user.state">
            <el-option label="所有" :value="0" />
            <el-option label="在职" :value="1" />
            <el-option label="离职" :value="2" />
            <el-option label="试用期" :value="3" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleQuery">查询</el-button>
          <el-button @click="handleReset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 2. 用户列表 -->
    <div class="base-table">
      <!-- 2.1 操作栏 -->
      <div class="action">
        <el-button type="primary" @click="handleCreate" v-has="'user-create'"
          >新增</el-button
        >
        <el-button
          type="danger"
          @click="handleBatchUsers"
          v-has="'user-batch-delete'"
          >批量删除</el-button
        >
      </div>
      <!-- 2.2 列表 -->
      <el-table
        :data="userList"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column
          v-for="item in columns"
          :key="item.prop"
          :prop="item.prop"
          :label="item.label"
          :formatter="item.formatter"
          sortable
        >
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template #default="scope">
            <el-button
              size="small"
              @click="handleEdit(scope.row)"
              v-has="'user-edit'"
              >编辑</el-button
            >
            <el-button
              size="small"
              type="danger"
              @click="handleDelete(scope.row)"
              v-has="'user-delete'"
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
    <!-- 3. 新增用户弹窗 -->
    <el-dialog v-model="dialogVisible" title="新增用户" width="600">
      <el-form
        :model="userForm"
        label-width="80"
        :rules="rules"
        ref="dialogForm"
      >
        <el-form-item label="用户名" prop="userName">
          <el-input
            v-model="userForm.userName"
            placeholder="请输入用户名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="userEmail">
          <el-input
            v-model="userForm.userEmail"
            placeholder="请输入用户邮箱"
          ></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input
            v-model="userForm.mobile"
            placeholder="请输入手机号"
          ></el-input>
        </el-form-item>
        <el-form-item label="岗位" prop="job">
          <el-input v-model="userForm.job" placeholder="请输入岗位"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="state">
          <el-select v-model="userForm.state">
            <el-option :value="1" label="在职"></el-option>
            <el-option :value="2" label="离职"></el-option>
            <el-option :value="3" label="试用期"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="系统角色" prop="roleList">
          <el-select v-model="userForm.roleList" multiple>
            <el-option
              v-for="role in roleList"
              :key="role._id"
              :label="role.roleName"
              :value="role._id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="部门" prop="deptId">
          <el-cascader
            v-model="userForm.deptId"
            placeholder="请选择所属部门"
            :options="deptList"
            :props="{ checkStrictly: true, value: '_id', label: 'deptName' }"
            clearable
          ></el-cascader>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleCancle">取消</el-button>
          <el-button type="primary" @click="handleSubmit"> 确认 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, nextTick } from "vue"
import api from "../api"
import { ElMessage } from "element-plus"
import formatDate from "../utils/formatDate"

const user = reactive({
  userId: "",
  userName: "",
  state: 0,
})
const userList = ref()
// 分页
const pager = reactive({
  pageNum: 1,
  pageSize: 10,
  total: 15,
})
const columns = [
  { label: "用户Id", prop: "userId" },
  { label: "用户名称", prop: "userName" },
  {
    label: "用户角色",
    prop: "role",
    formatter(row, column, cellValue) {
      return { 0: "管理员", 1: "普通用户" }[cellValue]
    },
  },
  {
    label: "用户状态",
    prop: "state",
    formatter(row, column, cellValue) {
      return { 1: "在职", 2: "离职", 3: "试用期" }[cellValue]
    },
  },
  {
    label: "注册时间",
    prop: "createTime",
    formatter: (row, column, cellValue) =>
      formatDate(new Date(cellValue), "yyyy-MM-dd"),
  },
  {
    label: "最后登录",
    prop: "lastLoginTime",
    formatter: (row, column, cellValue) =>
      formatDate(new Date(cellValue), "yyyy-MM-dd"),
  },
]
const queryForm = ref(null)
const dialogVisible = ref(false)
const rules = reactive({
  userName: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  userEmail: [
    { required: true, message: "请输入用户名", trigger: "blur" },
    {
      pattern: /^.+@[a-zA-Z0-9-]+\.([a-zA-Z0-9-]+)$/,
      message: "请输入有效的邮箱",
      trigger: "blur",
    },
  ],
  mobile: [
    {
      pattern:
        /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
      message: "请输入有效的手机号码",
      trigger: "blur",
    },
  ],
  deptId: [{ required: true, message: "请选择用户所属部门", trigger: "blur" }],
})

// 新增用户
let userForm = reactive({
  userName: "",
  userEmail: "",
  mobile: "",
  job: "",
  state: 3,
})
// action决定add新增还是edit编辑用户
let action = ref("add")

// 角色列表
const roleList = ref([])
// 部门列表
const deptList = ref([])

const dialogForm = ref(null)

onMounted(() => {
  getUserList({ ...pager })
  getRoleName()
  getDeptList()
})

const getUserList = async (params) => {
  try {
    const { page, list } = await api.getUserList(params)
    pager.total = page.total
    userList.value = list
  } catch (error) {
    ElMessage.error("获取用户列表失败：", error)
  }
}
//  查询表单
const handleQuery = () => {
  getUserList({ ...user })
}
// 新增
const handleCreate = () => {
  action.value = "add"
  dialogVisible.value = true
}
// 重置
const handleReset = () => {
  queryForm.value.resetFields()
  getUserList()
}

// 分页
const handleCurrentChange = (current) => {
  getUserList({ pageNum: current })
}

// -------------删除用户--------------
// 用户单个删除
const handleDelete = async (row) => {
  try {
    await api.userDel({ userIds: [row.userId] })
    ElMessage.success("删除成功")
    // 刷新用户列表
    getUserList()
  } catch (error) {
    ElMessage.error("删除失败：", error)
  }
}

// 获取选中行的userId
const checkedUserIds = ref([])
// 当选择项发生变化时会触发该函数，回调参数为选中的行
const handleSelectionChange = (val) => {
  checkedUserIds.value = val.map((row) => row.userId)
}
// 批量删除用户
const handleBatchUsers = async () => {
  if (checkedUserIds.value.length === 0) {
    ElMessage.error("请选择要删除的用户")
    return
  }
  try {
    const res = await api.userDel({ userIds: checkedUserIds.value })
    if (res.nModified > 0) {
      ElMessage.success("删除成功")
      // 刷新列表
      getUserList()
    } else {
      ElMessage.error("删除失败")
    }
  } catch (error) {
    ElMessage.error("删除失败：", error)
  }
}

// ------------新增用户---------------

// 获取角色列表
const getRoleName = async () => {
  try {
    roleList.value = await api.getRoleName()
  } catch (error) {
    ElMessage.error("角色列表获取失败：", error)
  }
}
// 获取部门列表表
const getDeptList = async () => {
  try {
    deptList.value = await api.getDeptList()
  } catch (error) {
    ElMessage.error("角色列表获取失败：", error)
  }
}
// 取消按钮：关闭弹窗，重置表单
const handleCancle = () => {
  dialogVisible.value = false
  dialogForm.value.resetFields()
}
// 提交按钮
const handleSubmit = () => {
  dialogForm.value.validate((isValid) => {
    if (isValid) {
      api
        .submitUser({ ...userForm, action: action.value })
        .then((res) => {
          dialogVisible.value = false
          dialogForm.value.resetFields()
          ElMessage.success(
            action.value === "add" ? "用户创建成功" : "用户修改成功"
          )
          getUserList()
        })
        .catch((err) => ElMessage.error(err))
    } else {
      ElMessage.error("创建失败，请检查表单")
    }
  })
}

// ------------编辑用户---------------
const handleEdit = (row) => {
  action.value = "edit"
  dialogVisible.value = true
  // 在弹窗渲染完成后再浅拷贝，否则表单初始值会被改变
  nextTick(() => {
    //target：userForm；source：row
    userForm = Object.assign(userForm, row)
  })
}
</script>

<style scoped></style>
