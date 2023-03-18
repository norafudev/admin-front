const env = import.meta.env.MODE || "prod" //获取当前环境模式，如果没有则默认开发模式
const EnvConfig = {
  dev: {
    baseApi: "/",
    //真实接口地址
    mockApi:
      "https://www.fastmock.site/mock/c1c302e8baed9894c48c17e4738c092e/api",
    //模拟接口的地址
  },
  test: {
    baseApi: "//test.futurefe.com/api",
    mockApi:
      "https://www.fastmock.site/mock/c1c302e8baed9894c48c17e4738c092e/api",
  },
  prod: {
    baseApi: "//futurefe.com/api",
    mockApi:
      "https://www.fastmock.site/mock/c1c302e8baed9894c48c17e4738c092e/api",
  },
}
export default {
  env,
  mock: true,
  ...EnvConfig[env], //根据key：env取对应环境下的配置
}
