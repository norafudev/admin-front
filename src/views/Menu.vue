<template>
  <div class="menu-container">
    <!-- 1. 查询栏 -->
    <div class="query-form">
      <el-form ref="form" :inline="true" :model="queryForm">
        <el-form-item label="菜单名称" prop="menuName">
          <el-input v-model="queryForm.menuName" placeholder="请输入菜单名称" />
        </el-form-item>
        <el-form-item label="菜单状态" prop="menuState">
          <el-select v-model="queryForm.menuState">
            <el-option :value="1" label="正常"></el-option>
            <el-option :value="2" label="停用"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleQuery">查询</el-button>
          <el-button @click="handleReset()">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 2. 菜单列表 -->
    <div class="base-table">
      <!-- 2.1 操作栏 -->
      <div class="action">
        <el-button type="primary" @click="handleAdd(1)">创建</el-button>
      </div>
      <!-- 2.2 列表 -->
      <el-table :data="menuList" row-key="_id">
        <el-table-column
          v-for="item in columns"
          :key="item.prop"
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
          :formatter="item.formatter"
        >
        </el-table-column>
        <el-table-column label="操作" width="280" align="center">
          <template #default="scope">
            <el-button @click="handleAdd(2, scope.row)">新增</el-button>
            <el-button @click="handleEdit(scope.row)">编辑</el-button>
            <el-button type="danger" @click="handleDel(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 3. 新增菜单弹窗 -->
    <el-dialog v-model="dialogVisible" title="新增菜单" width="600">
      <el-form
        ref="dialogForm"
        :model="menuForm"
        label-width="100px"
        :rules="rules"
      >
        <el-form-item label="父级菜单" prop="parentId">
          <el-cascader
            v-model="menuForm.parentId"
            :options="menuList"
            :props="{ checkStrictly: true, value: '_id', label: 'menuName' }"
            clearable
            placeholder="不选，则默认创建一级菜单"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="菜单类型" prop="menuType">
          <el-radio-group v-model="menuForm.menuType">
            <el-radio :label="1">菜单</el-radio>
            <el-radio :label="2">按钮</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="菜单名称" prop="menuName">
          <el-input v-model="menuForm.menuName" placeholder="请输入菜单名称" />
        </el-form-item>
        <el-form-item
          label="菜单图标"
          prop="icon"
          v-show="menuForm.menuType == 1"
        >
          <el-input v-model="menuForm.icon" placeholder="请输入菜单图标" />
        </el-form-item>
        <el-form-item
          label="路由地址"
          prop="path"
          v-show="menuForm.menuType == 1"
        >
          <el-input v-model="menuForm.path" placeholder="请输入路由地址" />
        </el-form-item>
        <el-form-item
          label="权限标识"
          prop="menuCode"
          v-show="menuForm.menuType == 2"
        >
          <el-input v-model="menuForm.menuCode" placeholder="请输入权限标识" />
        </el-form-item>
        <el-form-item
          label="组件路径"
          prop="component"
          v-show="menuForm.menuType == 1"
        >
          <el-input v-model="menuForm.component" placeholder="请输入组件路径" />
        </el-form-item>
        <el-form-item
          label="菜单状态"
          prop="menuState"
          v-show="menuForm.menuType == 1"
        >
          <el-radio-group v-model="menuForm.menuState">
            <el-radio :label="1">正常</el-radio>
            <el-radio :label="2">停用</el-radio>
          </el-radio-group>
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
import { reactive, onMounted, ref, nextTick } from "vue"
import api from "../api"
import { ElMessage } from "element-plus"

// 查询表单
const queryForm = reactive({ menuState: 1 })
// 菜单列表
let menuList = ref([])
const columns = [
  {
    label: "菜单名称",
    prop: "menuName",
    width: 150,
  },
  {
    label: "图标",
    prop: "icon",
  },
  {
    label: "菜单类型",
    prop: "menuType",
    formatter(row, column, value) {
      return {
        1: "菜单",
        2: "按钮",
      }[value]
    },
  },
  {
    label: "权限标识",
    prop: "menuCode",
  },
  {
    label: "路由地址",
    prop: "path",
  },
  {
    label: "菜单状态",
    prop: "menuState",
    width: 90,
    formatter(row, column, value) {
      return {
        1: "正常",
        2: "停用",
      }[value]
    },
  },
]
// 控制弹窗的显示隐藏
let dialogVisible = ref(false)
// 弹窗表单
const menuForm = reactive({
  menuType: 1,
  menuState: 1,
  parentId: [null],
})
// 表单操作，add-新增，edit-编辑，delete-删除
let action = ""
// 表单校验规则
const rules = reactive({
  menuName: [
    { required: true, message: "请输入菜单名称", trigger: "blur" },
    { min: 2, max: 8, message: "菜单名称为2-8个字符", trigger: "blur" },
  ],
})
// 查询表单元素
const form = ref(null)
// 弹窗表单元素
const dialogForm = ref(null)

onMounted(() => {
  getMenuList()
})

// 获取菜单列表
const getMenuList = async (params) => {
  try {
    menuList.value = await api.getMenuList(params)
  } catch (e) {
    throw new Error(e)
  }
}

// 查询菜单
const handleQuery = () => {
  getMenuList({ ...queryForm })
}

// 重置表单
const resetForm = (form) => {
  form.value.resetFields()
  getMenuList()
}

const handleReset = () => {
  resetForm(form)
}

// 创建/新增菜单
const handleAdd = (type, row) => {
  dialogVisible.value = true
  action = "add"
  if (type === 2) {
    // 将当前菜单填写到表单中的父级菜单栏
    nextTick(() => {
      //一级菜单的parentId为null，需要过滤掉null
      menuForm.parentId = [...row.parentId, row._id].filter((item) => item)
    })
  }
}

// 提交表单
const handleSubmit = () => {
  dialogForm.value.validate(async (isValid) => {
    if (isValid) {
      let res = await api.submitMenu({ ...menuForm, action })
      dialogVisible.value = false
      ElMessage.success("操作成功")
      resetForm(dialogForm)
      getMenuList()
      return
    }
    ElMessage.error("操作失败，请校验表单")
  })
}

// 取消表单提交
const handleCancle = () => {
  dialogVisible.value = false
  resetForm(dialogForm)
}

// 编辑菜单
const handleEdit = (row) => {
  dialogVisible.value = true
  action = "edit"
  nextTick(() => {
    // 浅拷贝，不改变目标对象的引用，保留响应性
    Object.assign(menuForm, row)
  })
}

// 删除菜单
const handleDel = (row) => {
  action = "delete"
  api.submitMenu({ _id: row._id, action })
  getMenuList()
  ElMessage.success("删除成功")
}
</script>

<style lang="scss"></style>
