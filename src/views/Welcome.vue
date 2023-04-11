<template>
  <div class="welcome-container">
    <div class="content">
      <div class="sub-title">欢迎体验</div>
      <div class="title">通用后台管理系统</div>
      <div class="description">Vue3.0+ElementPlus+Koa+MongoDB</div>
    </div>
    <div class="image">
      <img src="../assets/images/bg.png" alt="" />
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss">
.welcome-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  padding: 0 80px;
  background-color: #fff;
  .content {
    display: flex;
    flex-direction: column;
    padding-top: 150px;
    margin: auto;
    max-width: 500px;
    min-height: 85vh;
    .sub-title {
      font-size: 30px;
      line-height: 45px;
      color: #5c5a5a;
    }
    .title {
      font-size: 40px;
      line-height: 70px;
      color: #90a0d3;
    }
    .description {
      font-size: 15px;
      line-height: 20px;
      text-align: left;
      color: #999;
    }
  }
  .image {
    display: flex;
    flex-direction: column;
    margin: auto;
    max-width: 450px;
    // min-height: 35vh;
  }
}
</style>
