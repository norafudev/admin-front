<template>
  <div class="user-container">
    <!-- 1. 查询栏 -->
    <div class="query-form">
      <el-form :inline="true" :model="user" ref="formRef">
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
        <el-button type="primary">新增</el-button>
        <el-button type="danger" @click="handleBatchUsers">批量删除</el-button>
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
        >
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template #default="scope">
            <el-button size="small" @click="handleEdit(scope.row)"
              >编辑</el-button
            >
            <el-button
              size="small"
              type="danger"
              @click="handleDelete(scope.row)"
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
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue"
import api from "../api"
import { ElMessage } from "element-plus"

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
  total: 0,
})
const formRef = ref(null)

onMounted(() => {
  getUserList({ ...pager })
})

const getUserList = async (params) => {
  try {
    const { page, list } = await api.getUserList(params)
    pager.total = page.total
    userList.value = list
  } catch (error) {
    console.log(error)
  }
}
//  查询表单
const handleQuery = () => {
  getUserList({ ...user })
}
// 重置
const handleReset = () => {
  formRef.value.resetFields()
}

const columns = [
  { label: "用户Id", prop: "userId" },
  { label: "用户名称", prop: "userName" },
  { label: "用户角色", prop: "role" },
  { label: "用户状态", prop: "state" },
  { label: "注册时间", prop: "createTime" },
  { label: "最后登录", prop: "lastLoginTime" },
]

// 分页
const handleCurrentChange = (current) => {
  getUserList({ pageNum: current })
}

// 用户单个删除
const handleDelete = async (row) => {
  try {
    await api.userDel([row.userId])
    ElMessage.success("删除成功")
    // 刷新用户列表
    getUserList()
  } catch (error) {
    console.log(error)
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
  const res = await api.userDel(checkedUserIds.value)
  if (res.nModified > 0) {
    ElMessage.success("删除成功")
    // 刷新列表
    getUserList()
  } else {
    ElMessage.error("删除失败")
  }
}

const handleEdit = (row) => {
  console.log(index, row)
}
</script>

<style scoped></style>
