<template>
  <div class="container">
    <!-- 1. 左侧菜单栏 -->
    <div :class="['nav-side', isCollapse ? 'fold' : 'unfold']">
      <!-- 1.1 系统logo -->
      <div class="logo">
        <img src="../assets/images/logo.png" class="avatar" />
        <div>
          <div class="username">{{ userInfo.userName || "游客" }}</div>
          <div class="role">
            {{ userInfo.role == 0 ? "管理员" : "用户" }}
          </div>
        </div>
      </div>
      <!-- 1.2 菜单 -->
      <el-menu
        router
        class="nav-menu"
        text-color="#4f4d4d"
        :collapse="isCollapse"
        style="background: transparent"
        :default-active="route.path"
      >
        <tree-menu :menuList="menuList" />
      </el-menu>
    </div>
    <div :class="['main', isCollapse ? 'fold' : 'unfold']">
      <!-- 2. 顶部导航栏 -->
      <div class="nav-top">
        <!-- 2.1 折叠按钮，面包屑-->
        <div class="nav-top-left">
          <!-- 折叠按钮 -->
          <div class="menu-fold" @click="toggle">
            <el-icon size="25" color="#90a0d3"><Fold /></el-icon>
          </div>
          <!-- 面包屑 -->
          <breadcrumb class="breadcrumb" @backHome="resetMenu" />
        </div>
        <!-- 2.2 消息提醒，下拉菜单 -->
        <div class="user-info">
          <!-- 消息提醒 -->
          <!-- <el-badge :is-dot="noticeCount != 0" class="notice"> -->
          <el-badge class="notice">
            <el-icon size="25" color="#90a0d3"><Bell /></el-icon>
          </el-badge>
          <!-- 下拉菜单 -->
          <el-dropdown trigger="click" class="dropdown">
            <span class="el-dropdown-link">
              {{ userInfo.userName }}
              <el-icon class="el-icon--right">
                <arrow-down />
              </el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item :icon="Avatar"
                  >{{ userInfo.userEmail }}
                </el-dropdown-item>
                <el-dropdown-item :icon="SwitchButton" @click="logout">
                  退出登录
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
      <!-- 3. 内容区 -->
      <div class="wrapper">
        <!-- wrapper的样式，会作用于每个渲染在这里的组件 -->
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { useStore } from "vuex"
import { useRouter, useRoute } from "vue-router"
import api from "../api"
import TreeMenu from "./TreeMenu.vue"
import { Avatar, SwitchButton } from "@element-plus/icons-vue"
import Breadcrumb from "./Breadcrumb.vue"

const store = useStore()
const router = useRouter()
const route = useRoute()

let userInfo = store.state.userInfo
const logout = () => {
  store.commit("saveUserInfo", {})
  router.push("/login")
}
// 折叠展开侧边栏
const isCollapse = ref(false)
const toggle = () => {
  isCollapse.value = !isCollapse.value
}

onMounted(() => {
  // getNoticeCount()
  getMenuList()
})
// 通知数量
// const noticeCount = ref()
// const getNoticeCount = async () => {
//   try {
//     noticeCount.value = await api.getNoticeCount()
//   } catch (error) {
//     console.log(error)
//   }
// }
// 菜单列表
const menuList = ref([])
const getMenuList = async () => {
  try {
    const { treeMenu, actionList } = await api.getPermissionList()
    store.commit("saveMenuList", treeMenu)
    store.commit("saveActionList", actionList)
    menuList.value = store.state.menuList
  } catch (error) {
    console.log(error)
  }
}
</script>

<style lang="scss">
.container {
  position: relative; //便于子盒绝对定位
  .nav-side {
    position: fixed;
    // width: 200px;
    height: 100vh; //视口高度
    background: linear-gradient(-45deg, #c2ceed, #d2dcf5);
    color: #fff;
    overflow-y: auto; //垂直滚动条
    transition: width 0.5s; //宽度变化（展开、收起侧边栏）有过度的效果
    // 折叠
    &.fold {
      width: 85px;
    }
    // 展开
    &.unfold {
      width: 200px;
    }
    .logo {
      display: flex;
      align-items: center;
      height: 60px;
      margin: 12px;
      background-color: #f5f9fc;
      border-radius: 10px;
      .avatar {
        width: 42px;
        height: 42px;
        margin: 0 21px 0 10px;
        background-color: #dfe3e7;
        border-radius: 40px;
      }
      .username {
        font-size: 15px;
        font-weight: 600;
        margin-bottom: 5px;
        color: #4f4d4d;
      }
      .role {
        font-size: 12px;
        color: #7a7d80;
      }
    }
    .el-menu {
      // background: transparent;
      border-right: none;
    }
  }
  .main {
    // 实现左右布局，左边固定，右边自适应；右盒子将margin-left设为做盒子的宽度
    // margin-left: 200px;
    &.fold {
      margin-left: 85px;
    }
    &.unfold {
      margin-left: 200px;
    }
    transition: margin-left 0.5s;
    .nav-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 50px;
      line-height: 50px;
      border-bottom: 1px solid #ddd;
      padding: 0 20px;
      .nav-top-left {
        display: flex;
        align-items: center;
        .menu-fold {
          line-height: 0px;
          cursor: pointer;
        }
        .breadcrumb {
          margin-left: 20px;
          font-size: 16px;
          // font-weight: bold;
        }
      }
      .user-info {
        display: flex;
        align-items: center;
        .notice {
          margin-top: 18px;
          // line-height: 0px;
          margin-right: 20px;
        }
        .dropdown {
          font-size: 15px;
          cursor: pointer;
        }
      }
    }
    .wrapper {
      background-color: rgb(244, 246, 250);
      padding: 20px;
      height: calc(100vh - 50px); //使用计算属性，视口高度-nav_top
    }
  }
}
</style>
