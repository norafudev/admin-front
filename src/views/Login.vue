<template>
  <div class="login-container">
    <div class="modal">
      <el-form :model="user" :rules="rules" status-icon ref="userForm">
        <div class="title">Admin</div>
        <el-form-item prop="userName">
          <el-input type="text" :prefix-icon="User" v-model="user.userName" />
        </el-form-item>
        <el-form-item prop="userPwd">
          <el-input
            type="password"
            :prefix-icon="View"
            v-model="user.userPwd"
          />
        </el-form-item>
        <el-form-item>
          <el-button class="btn-login" type="primary" @click="login"
            >提交</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { User, View } from "@element-plus/icons-vue"
export default {
  data() {
    return {
      user: { userName: "", userPwd: "" },
      rules: {
        userName: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        userPwd: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
      User,
      View,
    }
  },

  methods: {
    login() {
      this.$refs.userForm.validate((isValid) => {
        if (isValid) {
          this.$api
            .login(this.user)
            .then((res) => this.$store.commit("savaUserInfo", res))
          this.$router.push("./welcome")
        } else {
          console.log("验证出错")
        }
      })
    },
  },
}
</script>

<style lang="scss">
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f9fcff;
  width: 100vw;
  height: 100vh;
  .modal {
    position: relative;
    width: 400px;
    padding: 50px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0px 0px 10px 3px #c7c9cb4d;
    .title {
      font-size: 30px;
      line-height: 1.5;
      color: rgb(17, 24, 39);
      text-align: center;
      margin-bottom: 30px;
    }
    .btn-login {
      width: 100%;
    }
  }
}
</style>
