import { createRouter, createWebHistory } from "vue-router"
import Home from "../components/Home.vue"
import api from "../api"
import generateRoutes from "../utils/generateRoutes"
import storage from "../utils/storage"

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

// 动态添加路由
async function loadAsyncRoutes() {
  let userInfo = storage.getItem("userInfo") || {}
  if (userInfo.token) {
    //是否已经登录
    try {
      // 动态拉取菜单，不用storage中的菜单，防止被更改
      const { treeMenu } = await api.getPermissionList()
      let routes = generateRoutes(treeMenu)
      const modules = import.meta.glob("../views/*.vue")
      routes.map((route) => {
        let url = `../views/${route.name}.vue`
        route.component = modules[url]
        router.addRoute("home", route)
      })
    } catch (error) {}
  }
}
loadAsyncRoutes()

// 导航守卫
router.beforeEach(async (to, from, next) => {
  if (to.name) {
    if (router.hasRoute(to.name)) {
      document.title = to.meta.title
      next()
    } else {
      next("/404")
    }
  } else {
    await loadAsyncRoutes()
    // 检查即将跳转的路径在不在动态路由的路径中
    let permission = router.getRoutes().find((route) => {
      return route.path == to.path
    })
    if (permission) {
      document.title = to.meta.title //修改网页标题
      next({ ...to, replace: true }) //路由放行
    } else {
      next("/404")
    }
  }
})

export default router
