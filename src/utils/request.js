import axios from "axios"
import globalConfig from "../config/index"
import { ElMessage } from "element-plus"
import router from "../router"

const TOKEN_INVALID = "Token认证失败，请重新登录"
const NETWORK_ERROR = "网络请求异常，请稍后重试"

// 创建axios实例，添加全局配置
const service = axios.create({
  baseURL: globalConfig.baseApi,
  timeout: 8000,
})

// 请求拦截器
service.interceptors.request.use((config) => {
  if (!config.headers.Authorization) {
    config.headers.Authorization = "Bear token"
  }
  return config
})

service.interceptors.response.use((res) => {
  console.log(res)
  const { code, data, msg } = res.data
  if (code === 200) {
    return data
  } else if (code === 40001) {
    ElMessage.error(TOKEN_INVALID)
    setTimeout(() => {
      router.push("./login")
    }, 15000)
    return Promise.reject(TOKEN_INVALID)
  } else {
    return Promise.reject(NETWORK_ERROR)
  }
})

function request(options) {
  options.method = options.method || "get"
  if (options.method.toLowerCase === "get") {
    options.params = options.data
  }

  if (globalConfig.env === "prod") {
    service.defaults.baseURL = globalConfig.baseApi
  } else {
    service.defaults.baseURL = globalConfig.mock
      ? globalConfig.mockApi
      : globalConfig.baseApi
  }

  return service(options)
}

export default request
