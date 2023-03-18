<template>
  <div>登陆页面</div>
  <!-- <router-link to="/welcome">去欢迎界面</router-link> -->
  <el-button @click="goHome">回首页</el-button>
</template>

<script>
export default {
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
