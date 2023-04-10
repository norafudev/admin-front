import axios from "axios"
import globalConfig from "../config/index"
import { ElMessage } from "element-plus"
import router from "../router"
import store from "../store"

// 定义响应错误信息
const TOKEN_INVALID = "Token认证失败，请重新登录"
const NETWORK_ERROR = "网络请求异常，请稍后重试"

// 创建axios实例，传入config，将作用于每个使用该axiso对象的请求
const httpRequest = axios.create({
  baseURL: globalConfig.mock ? globalConfig.mockApi : globalConfig.baseApi,
  timeout: 8000,
})

// 请求拦截器
httpRequest.interceptors.request.use((config) => {
  // 待改，后面写JWT时修改
  if (!config.headers.Authorization) {
    config.headers.Authorization = `Bearer ${store.state.userInfo.token}`
  }
  return config
})

httpRequest.interceptors.response.use((res) => {
  const { code, data, message } = res.data
  if (code === 200) {
    return data
  } else if (code === 500001) {
    //约定50001为token无效，跳转到登陆界面
    // 使用ElMesaage向用户提示错误信息
    ElMessage.error(TOKEN_INVALID)
    setTimeout(() => {
      router.push("/login")
    }, 1500)
    return Promise.reject(TOKEN_INVALID)
  } else if (code === 40001) {
    ElMessage.error("账号或密码错误")
    return Promise.reject("账号或密码错误")
  } else {
    return Promise.reject(NETWORK_ERROR)
  }
})

export default httpRequest
