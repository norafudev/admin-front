import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"
import ElementPlus from "element-plus"
import request from "./utils/request"

const app = createApp(App)

// 注册全局方法
app.config.globalProperties.$request = request

app.use(router).use(ElementPlus).mount("#app")
