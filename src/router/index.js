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
      {
        name: "role",
        path: "/system/role",
        meta: {
          title: "角色管理",
        },
        component: () => import("./../views/Role.vue"),
      },
      {
        name: "dept",
        path: "/system/dept",
        meta: {
          title: "部门管理",
        },
        component: () => import("./../views/Dept.vue"),
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
  {
    name: "404",
    path: "/404",
    meta: {
      title: "页面不存在",
    },
    component: () => import("../views/404.vue"),
  },
]

const router = createRouter({
  routes,
  history: createWebHistory(),
})

// 导航守卫
router.beforeEach((to, from, next) => {
  // 检查即将跳转的路径在不在动态路由的路径中
  let permission = router.getRoutes().find((route) => route.path == to.path)
  if (permission) {
    document.title = to.meta.title //修改网页标题
    next() //路由放行
  } else {
    next("/404")
  }
})

export default router
