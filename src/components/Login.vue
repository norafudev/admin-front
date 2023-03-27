<template>
  <div>登陆页面</div>
  <!-- <router-link to="/welcome">去欢迎界面</router-link> -->
  <el-button @click="goHome">回首页</el-button>
</template>

<script>
import axios from "../utils/request"
export default {
  mounted() {
    // 测试axios
    axios.get("/login")
    // 测试storage
    this.$storage.setItem("name", "孙悟空")
    this.$storage.setItem("age", "18")
  },

  methods: {
    goHome() {
      this.$router.push("./welcome")
    },
  },
  setup() {
    return {}
  },
}
</script>

<style scoped></style>
