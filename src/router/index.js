import { createRouter, createWebHashHistory } from "vue-router"
import Home from "../components/Home.vue"
import Welcome from "../components/Welcome.vue"
import Login from "../components/Login.vue"

const routes = [
  {
    name: "home",
    path: "/",
    component: Home,
    redirect: "/welcome",
    children: [
      {
        name: "welcome",
        path: "/welcome", //子路由的path，不用再写父路由路径
        meta: {
          title: "欢迎页",
        },
        component: Welcome,
      },
      {
        name: "login",
        path: "/login", //子路由的path，不用再写父路由路径
        meta: {
          title: "登录页",
        },
        component: Login,
      },
    ],
  },
]

const router = createRouter({
  routes,
  history: createWebHashHistory(), //选择history方法改变路径
})

export default router
