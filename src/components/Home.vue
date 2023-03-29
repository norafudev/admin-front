<template>
  <div class="container">
    <div class="nav-side"></div>
    <div class="main">
      <div class="nav-top">
        <div class="braedcrump">导航</div>
        <div class="user">用户</div>
      </div>
      <div class="wrapper">
        <div class="main-page">
          <!-- 给main-page设置样式，每个渲染在这里的组件都会生效该样式 -->
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  setup() {
    return {}
  },
}
</script>

<style lang="scss">
.container {
  position: relative; //便于子盒绝对定位
  .nav-side {
    position: fixed;
    width: 200px;
    height: 100vh; //视口高度
    background: linear-gradient(-45deg, #c2ceed, #899ae9);
    color: #fff;
    overflow-y: auto; //垂直滚动条
    transition: width 0.5s; //宽度变化（展开、收起侧边栏）有过度的效果
  }
  .main {
    // 实现左右布局，左边固定，右边自适应；右盒子将margin-left设为做盒子的宽度
    margin-left: 200px;
    .nav-top {
      display: flex;
      justify-content: space-between;
      height: 50px;
      line-height: 50px;
      border-bottom: 1px solid #ddd;
      padding: 0 20px;
    }
    .wrapper {
      background-color: rgb(244, 246, 250);
      padding: 20px;
      height: calc(100vh - 50px); //使用计算属性，视口高度-nav_top
      .main-page {
        height: 100%;
        background-color: #fff;
      }
    }
  }
}
</style>
