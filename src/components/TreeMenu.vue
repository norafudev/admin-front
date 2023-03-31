<template>
  <template v-for="menu in menuList" :key="menu._id">
    <!-- 父菜单的children分为子菜单(1)和操作按钮(2)，只有子菜单才渲染 -->
    <el-sub-menu
      v-if="menu.children && menu.children[0].menuType == 1"
      :index="menu.path"
    >
      <template #title>
        <el-icon><component :is="menu.icon" /></el-icon>
        <span>{{ menu.menuName }}</span>
      </template>
      <tree-menu :menuList="menu.children" />
    </el-sub-menu>
    <el-menu-item v-else-if="menu.menuType == 1" :index="menu.path">{{
      menu.menuName
    }}</el-menu-item>
  </template>
</template>

<script setup>
defineProps({
  menuList: {
    type: Array,
    default: [],
  },
})
</script>

<style scoped></style>
