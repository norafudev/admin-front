/**
 * api统一管理
 */

import axios from "./../utils/request"

const api = {
  // 登录
  login(data) {
    return axios.post("/users/login", data)
  },
}

export default api
