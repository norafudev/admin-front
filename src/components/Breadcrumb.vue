<template>
  <el-breadcrumb :separator-icon="ArrowRight">
    <!-- 将根路径-首页，单独提取作锚点 -->
    <el-breadcrumb-item :to="{ path: '/' }">主页</el-breadcrumb-item>
    <el-breadcrumb-item v-for="item in pathList">
      {{ item.meta.title }}</el-breadcrumb-item
    >
  </el-breadcrumb>
</template>

<script setup>
import { ArrowRight } from "@element-plus/icons-vue"
import { useRoute } from "vue-router"
import { computed, onMounted } from "vue"

const route = useRoute()
// slice() 方法来移除 pathList 的第一个元素 — ‘/’ 根路径
const pathList = computed(() => route.matched.slice(1))
</script>

<style scoped></style>
