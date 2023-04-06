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
          <el-button @click="handleReset('form')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 2. 菜单列表 -->
    <div class="base-table">
      <!-- 2.1 操作栏 -->
      <div class="action">
        <el-button type="primary" @click="handleAdd">新增</el-button>
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
            <el-button @click="handleAdd(scope.row)" size="mini"
              >新增</el-button
            >
            <el-button @click="handleEdit(scope.row)" size="mini"
              >编辑</el-button
            >
            <el-button type="danger" size="mini" @click="handleDel(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script setup>
import { reactive, onMounted, ref } from "vue"
import api from "../api"

const queryForm = reactive({ menuState: 1 })

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

onMounted(() => {
  getMenuList()
})

const getMenuList = async () => {
  try {
    menuList.value = await api.getMenuList(queryForm)
  } catch (e) {
    throw new Error(e)
  }
}
const handleQuery = () => {}
const handleReset = () => {}
const handleAdd = () => {}
const handleEdit = () => {}
const handleDel = () => {}
</script>

<style lang="scss"></style>
