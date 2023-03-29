import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"
import ElementPlus from "element-plus"
import "element-plus/theme-chalk/index.css"
import storage from "./utils/storage"

const app = createApp(App)

// 注册全局方法
app.config.globalProperties.$storage = storage

app.use(router).use(ElementPlus).mount("#app")
