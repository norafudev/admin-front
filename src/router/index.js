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
        path: "user",
        meta: {
          title: "用户管理",
        },
        component: () => import("./../views/User.vue"),
        children: [
          {
            name: "info",
            path: "info",
            meta: {
              title: "信息统计",
            },
            component: () => import("./../views/Welcome.vue"),
          },
        ],
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
