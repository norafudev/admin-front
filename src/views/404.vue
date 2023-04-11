<template>
  <div class="not-found">
    <p>404 NOT FOUND</p>
    <img src="../assets/images/404.png" alt="" />
    <el-button @click="backHome" type="primary">返回首页</el-button>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router"
const router = useRouter()
const backHome = () => {
  router.push("/")
}
</script>

<style lang="scss">
.not-found {
  display: flex;
  flex-direction: column;
  padding-top: 96px;
  padding-bottom: 96px;
  margin: auto;
  max-width: 500px;
  min-height: 100vh;
  text-align: center;
  justify-content: center;
  p {
    font-size: 2rem;
    color: #aab9de;
  }
}
</style>
