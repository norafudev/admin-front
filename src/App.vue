<template>
  <router-view></router-view>
</template>

<script setup>
import { onMounted } from "vue"

onMounted(() => {
  document.body.style.setProperty("--el-color-primary", "#96a3eeef")
  document.body.style.setProperty("--el-color-primary-light-9", "#e7ecf9")
  document.body.style.setProperty("--el-color-primary-light-3", "#b8baffef")
  document.body.style.setProperty("--el-menu-active-color", "#6e7ad2c1")
})
</script>

<style lang="scss">
@import "./assets/style/reset.css";
@import "./assets/style/common.scss";

.body {
  color: #96a3eeef;
  color: #e7ecf9;
  color: #b8baffef;
  color: #6e7ad2c1;
  color: #534ab6ef;
}
</style>
