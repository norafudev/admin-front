const env = import.meta.env.MODE || "production" //获取当前环境模式，如果没有则默认开发模式
const EnvConfig = {
  development: {
    baseApi: "/api",
    //真实接口地址
    mockApi:
      "https://console-mock.apipost.cn/mock/befc349c-0be5-46ad-8304-440fc3f8665b",
    //模拟接口的地址
  },
  test: {
    baseApi: "//test.futurefe.com/api",
    mockApi:
      "https://console-mock.apipost.cn/mock/befc349c-0be5-46ad-8304-440fc3f8665b",
  },
  production: {
    baseApi: "//futurefe.com/api",
    mockApi:
      "https://console-mock.apipost.cn/mock/befc349c-0be5-46ad-8304-440fc3f8665b",
  },
}
export default {
  env,
  mock: false,
  namedSpace: "manager",
  ...EnvConfig[env], //根据key：env取对应环境下的配置
}
