import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"
import ElementPlus from "element-plus"
import "element-plus/theme-chalk/index.css"
import * as ElementPlusIconsVue from "@element-plus/icons-vue"
import storage from "./utils/storage"
import store from "./store"

const app = createApp(App)

// 自定义全局指令，判断按钮权限
app.directive("has", {
  mounted(el, binding) {
    let actionList = store.state.actionList
    let result = actionList.includes(binding.value)
    if (!result) {
      el.parentNode.removeChild(el)
    }
  },
})

// 注册全局方法
app.config.globalProperties.$storage = storage

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(router).use(ElementPlus).use(store).mount("#app")
