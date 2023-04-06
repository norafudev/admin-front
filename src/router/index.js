import { createRouter, createWebHistory } from "vue-router"
import Home from "../components/Home.vue"

const routes = [
  {
    name: "home",
    path: "/",
    component: Home,
    redirect: "/welcome",
    children: [
      {
        name: "welcome",
        path: "welcome", //子路由路径不用再写父路由路径
        meta: {
          title: "欢迎页",
        },
        component: () => import("./../views/Welcome.vue"),
      },
      {
        name: "user",
        path: "/system/user",
        meta: {
          title: "用户管理",
        },
        component: () => import("./../views/User.vue"),
      },
      {
        name: "menu",
        path: "/system/menu",
        meta: {
          title: "菜单管理",
        },
        component: () => import("./../views/Menu.vue"),
      },
    ],
  },
  {
    name: "login",
    path: "/login",
    meta: {
      title: "登录页",
    },
    component: () => import("../views/Login.vue"),
  },
]

const router = createRouter({
  routes,
  history: createWebHistory(),
})

export default router
