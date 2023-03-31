import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"
import ElementPlus from "element-plus"
import "element-plus/theme-chalk/index.css"
import * as ElementPlusIconsVue from "@element-plus/icons-vue"
import storage from "./utils/storage"
import api from "./api"
import store from "./store"

const app = createApp(App)

// 注册全局方法
app.config.globalProperties.$storage = storage

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(router).use(ElementPlus).use(store).mount("#app")
