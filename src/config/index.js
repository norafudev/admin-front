const env = import.meta.env.MODE || "production" //获取当前环境模式，如果没有则默认开发模式
const EnvConfig = {
  development: {
    baseApi: "/",
    //真实接口地址
    mockApi:
      "https://www.fastmock.site/mock/599928d074d45ecc0baa8b667949d65c/api",
    //模拟接口的地址
  },
  test: {
    baseApi: "//test.futurefe.com/api",
    mockApi:
      "https://www.fastmock.site/mock/599928d074d45ecc0baa8b667949d65c/api",
  },
  production: {
    baseApi: "//futurefe.com/api",
    mockApi:
      "https://www.fastmock.site/mock/599928d074d45ecc0baa8b667949d65c/api",
  },
}
export default {
  env,
  mock: true,
  ...EnvConfig[env], //根据key：env取对应环境下的配置
}
